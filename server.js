import express from "express";
import cors from "cors";
import multer from "multer";
import fetch, { FormData, Blob } from "node-fetch";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;

// Supabase Credentials provided by user
const SUPABASE_URL = "https://eguwkutijgqxaosjshgn.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_bhwPJpSNONc34HH7Z6s3Bw_N2dZERMd";

// Express Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer storage configuration (Keep in memory for simplicity)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit 5MB
});

// Probe Supabase database tables on startup
let detectedTables = [];
async function probeSupabase() {
  try {
    console.log(
      "\x1b[36m[Supabase] Probing database connection (table: 'slips')...\x1b[0m",
    );
    const res = await fetch(`${SUPABASE_URL}slips?limit=1`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (res.ok) {
      console.log(
        "\x1b[32m[Supabase] Connection Successful! Table 'slips' is ready in your database.\x1b[0m",
      );
      detectedTables = ["slips"];
    } else if (res.status === 404) {
      console.log(
        "\x1b[33m[Supabase Info] Connected to Supabase, but table 'slips' does not exist yet (404).\x1b[0m",
      );
      console.log(
        "\x1b[31m[Supabase Warning] Please run the SQL command in the SQL Editor to create the 'slips' table.\x1b[0m",
      );
      detectedTables = [];
    } else {
      console.error(
        "\x1b[31m[Supabase Error] Connection probe failed with status:\x1b[0m",
        res.status,
        res.statusText,
      );
      const text = await res.text();
      console.error("Details:", text);
      detectedTables = [];
    }
  } catch (err) {
    console.error(
      "\x1b[31m[Supabase Error] Connection failed:\x1b[0m",
      err.message,
    );
    detectedTables = [];
  }
}

// Simulated Slip2Go & Supabase Verification Endpoint
app.post("/api/verify-slip", upload.single("slip"), async (req, res) => {
  try {
    const file = req.file;
    const username = req.body.username || "anonymous";
    const amount = parseFloat(req.body.amount) || 0;
    const isTester = username === "mewie" || username === "admin";

    console.log(`\n\x1b[36m--- New Verification Request ---\x1b[0m`);
    console.log(`User: ${username}`);
    console.log(`Expected Amount: ${amount} THB`);

    if (!file) {
      console.log("Error: No file uploaded");
      return res.status(400).json({
        success: false,
        message: "ไม่พบไฟล์สลิป กรุณาอัปโหลดสลิปธนาคาร",
      });
    }

    console.log(
      `Uploaded File: ${file.originalname} (${(file.size / 1024).toFixed(2)} KB)`,
    );
    console.log("Processing slip image via Slip2Go API Connect...");

    // Call Slip2Go verification API
    let slipResult;
    let responseText = "";
    let succeeded = false;

    // ==========================================
    // 🛠️ ส่วนที่แก้ไข: ปรับปรุงเพื่อยิงเข้า Slip2Go Connect
    // ==========================================

    // 1. จัดโครงสร้าง Payload JSON เงื่อนไขการตรวจสอบตามที่คุณบอลกำหนด
    const payloadData = {
      checkDuplicate: true,
      checkReceiver: [
        {
          accountType: "01014", // แก้ไขเป็นข้อมูลบัญชีปลายทางของระบบคุณบอล
          accountNameEN: "Kotchakorn Prasit",
          accountNameTH: "กชกร ประสิทธิ์",
          accountNumber: "4112158028",
        },
      ],
      checkAmount: {
        type: "eq",
        amount: amount, // ดึงจากยอดโอนที่ลูกค้ากรอกเข้ามาเช็ค
      },
    };

    // 2. ประกอบร่างเป็น Multipart/Form-data (ใช้ Native FormData ของ Node.js 18+)
    const formData = new FormData();

    // แปลง Buffer ที่ได้จาก Multer ไปเป็น Blob เพื่อส่งแบบ Binary File Stream
    const fileBlob = new Blob([file.buffer], { type: file.mimetype });
    formData.append("file", fileBlob, file.originalname); // คีย์ 'file' ตาม Doc

    // แนบเงื่อนไขการตรวจเช็คในรูปแบบ JSON String
    formData.append("payload", JSON.stringify(payloadData)); // คีย์ 'payload' ตาม Doc

    // Call Slip2Go verification API
    try {
      console.log(
        `Calling Slip2Go Connect API endpoint (User: ${username}, Tester: ${isTester})...`,
      );
      const slip2goResponse = await fetch(
        "https://connect.slip2go.com/api/verify-slip/qr-image/info",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer CwHcJy4qbtGCRgw3McQMHdAUgFTbpoXb2tKTfrPm2qM=",
            // สังเกต: เอา "Content-Type": "application/json" ออก เพื่อให้ Fetch ตัวจัดการ Multipart Boundary เอง
          },
          body: formData,
        },
      );

      responseText = await slip2goResponse.text();
      console.log("Slip2Go raw responseText:", responseText);

      if (slip2goResponse.status === 200) {
        slipResult = JSON.parse(responseText);
        succeeded = true;
      } else {
        console.error(
          `Slip2Go returned HTTP ${slip2goResponse.status}:`,
          responseText,
        );

        if (isTester) {
          console.log(
            `[TEST MODE ACTIVE] Owner/Admin '${username}' bypasses verification block. Simulating successful topup...`,
          );
          slipResult = {
            success: true,
            data: {
              amount: amount,
              trans_date: new Date().toISOString(),
              ref_number:
                "SIM-" + Math.floor(1000000000 + Math.random() * 9000000000),
              sender: `นายทดสอบ จำลอง (${username})`,
              receiver: "DUCKDUCK STORE",
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
        console.log(
          `[TEST MODE ACTIVE] Owner/Admin '${username}' bypasses connection failure. Simulating successful topup...`,
        );
        slipResult = {
          success: true,
          data: {
            amount: amount,
            trans_date: new Date().toISOString(),
            ref_number:
              "SIM-" + Math.floor(1000000000 + Math.random() * 9000000000),
            sender: `นายทดสอบ จำลอง (Offline - ${username})`,
            receiver: "DUCKDUCK STORE",
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

    // ==========================================
    // 🔄 ส่วนโครงสร้างเดิมด้านล่างคงไว้เหมือนเดิม
    // ==========================================
    console.log("Slip2Go Response:", JSON.stringify(slipResult));

    if (!slipResult || !slipResult.success) {
      return res.status(400).json({
        success: false,
        message:
          slipResult?.message ||
          "ไม่สามารถตรวจสอบสลิปนี้ได้ หรือเป็นสลิปที่ไม่ถูกต้อง",
      });
    }

    const resData = slipResult.data || {};
    const transDate =
      resData.trans_date || resData.transDate || new Date().toISOString();
    const refNumber =
      resData.ref_number || resData.refNumber || resData.transRef;

    if (!refNumber) {
      return res.status(400).json({
        success: false,
        message: "ไม่พบหมายเลขอ้างอิงสลิปจากข้อมูลการตรวจสอบ",
      });
    }

    // Amount verification: compare expected amount with verified amount
    const verifiedAmount = parseFloat(resData.amount) || 0;
    console.log(
      `Verified Amount: ${verifiedAmount} THB (Expected: ${amount} THB)`,
    );

    if (verifiedAmount < amount - 0.01) {
      return res.status(400).json({
        success: false,
        message: `ยอดเงินในสลิป (${verifiedAmount} ฿) น้อยกว่ายอดเงินที่ต้องการเติม (${amount} ฿)`,
      });
    }

    const senderName =
      typeof resData.sender === "object"
        ? resData.sender.displayName ||
          resData.sender.name ||
          "ไม่ทราบชื่อผู้โอน"
        : resData.sender || "ไม่ทราบชื่อผู้โอน";

    const receiverName =
      typeof resData.receiver === "object"
        ? resData.receiver.displayName || resData.receiver.name || "PB SERVICES"
        : resData.receiver || "PB SERVICES";

    // Determine Supabase target table first to check for duplicates
    let targetTable = "slips";
    if (
      typeof detectedTables !== "undefined" &&
      detectedTables.length > 0 &&
      !detectedTables.includes("slips")
    ) {
      targetTable = detectedTables.includes("transactions")
        ? "transactions"
        : detectedTables[0] || "slips";
    }

    // Duplicate check in database (Only for normal customers, skip for testers)
    if (!isTester) {
      try {
        console.log(
          `Checking for duplicate ref_number: ${refNumber} in table '${targetTable}'...`,
        );
        const dupCheckResponse = await fetch(
          `${SUPABASE_URL}${targetTable}?ref_number=eq.${refNumber}`,
          {
            method: "GET",
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          },
        );

        if (dupCheckResponse.ok) {
          const dupCheckData = await dupCheckResponse.json();
          if (dupCheckData && dupCheckData.length > 0) {
            console.warn(
              `[DUPLICATE REJECTED] Ref: ${refNumber} has already been used.`,
            );
            return res.status(400).json({
              success: false,
              message:
                "สลิปนี้ถูกนำไปใช้เติมเงินเข้าร้านค้าไปแล้ว ไม่สามารถใช้ซ้ำได้",
            });
          }
        }
      } catch (dbErr) {
        console.warn(
          "Database duplicate check skipped due to error:",
          dbErr.message,
        );
      }
    }

    console.log(
      `Slip2Go Result: Verified successfully! Ref: ${refNumber}, Amount: ${verifiedAmount} THB`,
    );

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
        console.log(
          "\x1b[32m[Supabase] Row successfully saved to database!\x1b[0m",
          insertedData,
        );
        savedToDb = true;
      } else {
        const errText = await dbResponse.text();
        console.error(
          `\x1b[31m[Supabase Database Error]\x1b[0m Status: ${dbResponse.status}, Details:`,
          errText,
        );
        dbError = `Database status ${dbResponse.status}: ${errText}`;
      }
    } catch (dbErr) {
      console.error(
        `\x1b[31m[Supabase Connection Error] Failed to write:\x1b[0m`,
        dbErr.message,
      );
      dbError = dbErr.message;
    }

    // Return combined result to the React client
    return res.json({
      success: true,
      message: "ชำระเงินสำเร็จ",
      amount: amount,
      savedToDb: savedToDb,
      dbError: dbError,
      details: slipResult.data,
    });
  } catch (err) {
    console.error("\x1b[31m[Server Error]\x1b[0m", err);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการตรวจสอบสลิปของเซิร์ฟเวอร์",
      error: err.message,
    });
  }
});

// Run server and probe Supabase
app.listen(PORT, async () => {
  console.log(
    `\x1b[32m[Server] Express Backend is running on http://localhost:${PORT}\x1b[0m`,
  );

  // Copy real PromptPay QR image on startup
  try {
    const qrSrc =
      "c:\\Users\\Mewie\\Downloads\\6d37a346-fc05-4148-8302-e78f32a1cf2e.png";
    const qrDest = path.resolve("public/promptpay-qr.png");
    // Ensure public directory exists
    if (!fs.existsSync(path.resolve("public"))) {
      fs.mkdirSync(path.resolve("public"));
    }
    if (fs.existsSync(qrSrc)) {
      fs.copyFileSync(qrSrc, qrDest);
      console.log(
        "\x1b[32m[Server] Successfully copied real QR code to public/promptpay-qr.png\x1b[0m",
      );
    } else {
      console.warn(
        "\x1b[33m[Server Warning] Real QR code source file not found at:\x1b[0m",
        qrSrc,
      );
    }
  } catch (err) {
    console.error("[Server Error] Failed to copy real QR code:", err.message);
  }

  await probeSupabase();
});
