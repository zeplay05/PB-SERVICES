import multer from 'multer';
import fetch, { FormData, Blob } from 'node-fetch';

// Disable Vercel's default body parser so multer can parse the multipart data
export const config = {
  api: {
    bodyParser: false,
  },
};

const SUPABASE_URL = process.env.SUPABASE_URL || "https://eguwkutijgqxaosjshgn.supabase.co/rest/v1/";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "sb_publishable_bhwPJpSNONc34HH7Z6s3Bw_N2dZERMd";
const SLIP2GO_SECRET_KEY = process.env.SLIP2GO_SECRET_KEY || "CwHcJy4qbtGCRgw3McQMHdAUgFTbpoXb2tKTfrPm2qM=";
const SLIP2GO_API_URL = process.env.SLIP2GO_API_URL || "https://connect.slip2go.com/api/verify-slip/qr-image/info";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit 5MB
});

// Helper to run Express middleware in Serverless environment
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Caching detected tables across warm lambda invocations
let detectedTables = null;

async function probeSupabase() {
  if (detectedTables) return detectedTables;
  try {
    console.log("[Supabase] Probing database connection...");
    const res = await fetch(`${SUPABASE_URL}slips?limit=1`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (res.ok) {
      console.log("[Supabase] Connection Successful! Table 'slips' is ready.");
      detectedTables = ["slips"];
    } else if (res.status === 404) {
      console.log("[Supabase Info] Table 'slips' does not exist yet.");
      detectedTables = [];
    } else {
      console.error("[Supabase Error] Connection probe status:", res.status);
      detectedTables = [];
    }
  } catch (err) {
    console.error("[Supabase Error] Connection failed:", err.message);
    detectedTables = [];
  }
  return detectedTables;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Run Multer to parse files
    await runMiddleware(req, res, upload.single('slip'));

    const file = req.file;
    const username = req.body.username || "anonymous";
    const amount = parseFloat(req.body.amount) || 0;
    const isTester = username === "mewie" || username === "admin";

    console.log(`\n--- Vercel Serverless Function: verify-slip ---`);
    console.log(`User: ${username}`);
    console.log(`Expected Amount: ${amount} THB`);

    if (!file) {
      console.log("Error: No file uploaded");
      return res.status(400).json({
        success: false,
        message: "ไม่พบไฟล์สลิป กรุณาอัปโหลดสลิปธนาคาร",
      });
    }

    console.log(`Uploaded File: ${file.originalname} (${(file.size / 1024).toFixed(2)} KB)`);
    console.log("Processing slip image via Slip2Go API Connect...");

    // Payload configuration
    const payloadData = {
      checkDuplicate: true,
      checkReceiver: [
        {
          accountType: "01014",
          accountNameEN: "Kotchakorn Prasit",
          accountNameTH: "กชกร ประสิทธิ์",
          accountNumber: "4112158028",
        },
      ],
      checkAmount: {
        type: "eq",
        amount: amount,
      },
    };

    const formData = new FormData();
    const fileBlob = new Blob([file.buffer], { type: file.mimetype });
    formData.append("file", fileBlob, file.originalname);
    formData.append("payload", JSON.stringify(payloadData));

    let slipResult;
    let responseText = "";
    let succeeded = false;

    try {
      console.log(`Calling Slip2Go Connect API (User: ${username}, Tester: ${isTester})...`);
      const slip2goResponse = await fetch(SLIP2GO_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SLIP2GO_SECRET_KEY}`,
        },
        body: formData,
      });

      responseText = await slip2goResponse.text();
      console.log("Slip2Go raw responseText:", responseText);

      if (slip2goResponse.status === 200) {
        slipResult = JSON.parse(responseText);
        succeeded = true;
      } else {
        console.error(`Slip2Go returned HTTP ${slip2goResponse.status}:`, responseText);

        if (isTester) {
          console.log(`[TEST MODE ACTIVE] Owner/Admin '${username}' bypasses verification block. Simulating successful topup...`);
          slipResult = {
            success: true,
            data: {
              amount: amount,
              trans_date: new Date().toISOString(),
              ref_number: "SIM-" + Math.floor(1000000000 + Math.random() * 9000000000),
              sender: `นายทดสอบ จำลอง (${username})`,
              receiver: "PB SERVICES",
            },
          };
          succeeded = true;
        } else {
          return res.status(slip2goResponse.status === 404 ? 404 : 400).json({
            success: false,
            message: `บริการตรวจสอบสลิปปฏิเสธคำขอ (HTTP ${slip2goResponse.status})`,
          });
        }
      }
    } catch (apiErr) {
      console.error("Failed to connect to Slip2Go:", apiErr);
      if (isTester) {
        console.log(`[TEST MODE ACTIVE] Owner/Admin '${username}' bypasses connection failure. Simulating successful topup...`);
        slipResult = {
          success: true,
          data: {
            amount: amount,
            trans_date: new Date().toISOString(),
            ref_number: "SIM-" + Math.floor(1000000000 + Math.random() * 9000000000),
            sender: `นายทดสอบ จำลอง (Offline - ${username})`,
            receiver: "PB SERVICES",
          },
        };
        succeeded = true;
      } else {
        return res.status(500).json({
          success: false,
          message: `ไม่สามารถเชื่อมต่อกับ Slip2Go ได้: ${apiErr.message}`,
        });
      }
    }

    console.log("Slip2Go Response:", JSON.stringify(slipResult));

    if (!slipResult || !slipResult.success) {
      return res.status(400).json({
        success: false,
        message: slipResult?.message || "ไม่สามารถตรวจสอบสลิปนี้ได้ หรือเป็นสลิปที่ไม่ถูกต้อง",
      });
    }

    const resData = slipResult.data || {};
    const transDate = resData.trans_date || resData.transDate || new Date().toISOString();
    const refNumber = resData.ref_number || resData.refNumber || resData.transRef;

    if (!refNumber) {
      return res.status(400).json({
        success: false,
        message: "ไม่พบหมายเลขอ้างอิงสลิปจากข้อมูลการตรวจสอบ",
      });
    }

    const verifiedAmount = parseFloat(resData.amount) || 0;
    console.log(`Verified Amount: ${verifiedAmount} THB (Expected: ${amount} THB)`);

    if (verifiedAmount < amount - 0.01) {
      return res.status(400).json({
        success: false,
        message: `ยอดเงินในสลิป (${verifiedAmount} ฿) น้อยกว่ายอดเงินที่ต้องการเติม (${amount} ฿)`,
      });
    }

    const senderName = typeof resData.sender === "object"
      ? resData.sender.displayName || resData.sender.name || "ไม่ทราบชื่อผู้โอน"
      : resData.sender || "ไม่ทราบชื่อผู้โอน";

    const receiverName = typeof resData.receiver === "object"
      ? resData.receiver.displayName || resData.receiver.name || "PB SERVICES"
      : resData.receiver || "PB SERVICES";

    // Probing database
    const dbTables = await probeSupabase();
    let targetTable = "slips";
    if (dbTables && dbTables.length > 0 && !dbTables.includes("slips")) {
      targetTable = dbTables.includes("transactions") ? "transactions" : (dbTables[0] || "slips");
    }

    // Duplicate check in database (Only for normal customers, skip for testers)
    if (!isTester) {
      try {
        console.log(`Checking for duplicate ref_number: ${refNumber} in table '${targetTable}'...`);
        const dupCheckResponse = await fetch(
          `${SUPABASE_URL}${targetTable}?ref_number=eq.${refNumber}`,
          {
            method: "GET",
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        );

        if (dupCheckResponse.ok) {
          const dupCheckData = await dupCheckResponse.json();
          if (dupCheckData && dupCheckData.length > 0) {
            console.warn(`[DUPLICATE REJECTED] Ref: ${refNumber} has already been used.`);
            return res.status(400).json({
              success: false,
              message: "สลิปนี้ถูกนำไปใช้เติมเงินเข้าร้านค้าไปแล้ว ไม่สามารถใช้ซ้ำได้",
            });
          }
        }
      } catch (dbErr) {
        console.warn("Database duplicate check skipped due to error:", dbErr.message);
      }
    }

    console.log(`Slip2Go Result: Verified successfully! Ref: ${refNumber}, Amount: ${verifiedAmount} THB`);

    // Save transaction to Supabase
    const dbData = {
      username: username,
      amount: verifiedAmount,
      sender: senderName,
      receiver: receiverName,
      ref_number: refNumber,
      trans_date: transDate,
      status: "success",
    };

    console.log(`Saving slip details to Supabase table: '${targetTable}'...`);

    let savedToDb = false;
    let dbError = null;

    try {
      const dbResponse = await fetch(`${SUPABASE_URL}${targetTable}`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(dbData),
      });

      if (dbResponse.ok) {
        const insertedData = await dbResponse.json();
        console.log("[Supabase] Row successfully saved to database!", insertedData);
        savedToDb = true;
      } else {
        const errText = await dbResponse.text();
        console.error(`[Supabase Database Error] Status: ${dbResponse.status}, Details:`, errText);
        dbError = `Database status ${dbResponse.status}: ${errText}`;
      }
    } catch (dbErr) {
      console.error(`[Supabase Connection Error] Failed to write:`, dbErr.message);
      dbError = dbErr.message;
    }

    return res.json({
      success: true,
      message: "ชำระเงินสำเร็จ",
      amount: amount,
      savedToDb: savedToDb,
      dbError: dbError,
      details: slipResult.data,
    });
  } catch (err) {
    console.error("[Server Error]", err);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการตรวจสอบสลิปของเซิร์ฟเวอร์",
      error: err.message,
    });
  }
}
