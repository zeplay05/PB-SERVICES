import { useState, useEffect, useRef } from 'react'

// --------------------------------------------------------------------------
// Default Databases Seed
// --------------------------------------------------------------------------
const DEFAULT_PRODUCTS = [
    // Discord Category
    {
        id: "discord-new",
        name: "แอคเปล่าสมัครใหม่",
        price: 10,
        category: "discord",
        tag: "new",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 10,
        stockItems: ["discord_acc_new_1:pass123", "discord_acc_new_2:pass123", "discord_acc_new_3:pass123"]
    },
    {
        id: "discord-1-7d",
        name: "แอคเปล่า 1-7 วัน",
        price: 15,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 5,
        stockItems: ["discord_acc_1-7d_1:pass123", "discord_acc_1-7d_2:pass123"]
    },
    {
        id: "discord-month",
        name: "แอคเปล่าเกินเดือน",
        price: 25,
        category: "discord",
        tag: "popular",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 7,
        stockItems: ["discord_acc_1m_1:pass123", "discord_acc_1m_2:pass123"]
    },
    {
        id: "discord-2025",
        name: "แอคปี 2025",
        price: 35,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 5,
        stockItems: ["discord_acc_2025_1:pass123", "discord_acc_2025_2:pass123"]
    },
    {
        id: "discord-2024",
        name: "แอคปี 2024",
        price: 43,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 4,
        stockItems: ["discord_acc_2024_1:pass123", "discord_acc_2024_2:pass123"]
    },
    {
        id: "discord-2023",
        name: "แอคปี 2023",
        price: 50,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 3,
        stockItems: ["discord_acc_2023_1:pass123", "discord_acc_2023_2:pass123"]
    },
    {
        id: "discord-2022",
        name: "แอคปี 2022",
        price: 65,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 3,
        stockItems: ["discord_acc_2022_1:pass123", "discord_acc_2022_2:pass123"]
    },
    {
        id: "discord-2021",
        name: "แอคปี 2021",
        price: 75,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 3,
        stockItems: ["discord_acc_2021_1:pass123", "discord_acc_2021_2:pass123"]
    },
    {
        id: "discord-2020",
        name: "แอคปี 2020",
        price: 78,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 2,
        stockItems: ["discord_acc_2020_1:pass123", "discord_acc_2020_2:pass123"]
    },
    {
        id: "discord-2019",
        name: "แอคปี 2019",
        price: 100,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 2,
        stockItems: ["discord_acc_2019_1:pass123", "discord_acc_2019_2:pass123"]
    },
    {
        id: "discord-2018",
        name: "แอคปี 2018",
        price: 150,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 2,
        stockItems: ["discord_acc_2018_1:pass123", "discord_acc_2018_2:pass123"]
    },
    {
        id: "discord-2017",
        name: "แอคปี 2017",
        price: 190,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 2,
        stockItems: ["discord_acc_2017_1:pass123", "discord_acc_2017_2:pass123"]
    },
    {
        id: "discord-2016",
        name: "แอคปี 2016",
        price: 300,
        category: "discord",
        tag: "",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 1,
        stockItems: ["discord_acc_2016_1:pass123"]
    },
    {
        id: "discord-2015",
        name: "แอคปี 2015",
        price: 2500,
        category: "discord",
        tag: "hot",
        description: "รายละเอียด: แอคเปล่า ไม่เคยใช้งานมาก่อน เปลี่ยนข้อมูลได้ เช่น เมล/รหัส + เบอร์ ซื้อไปเป็นแอคหลัก ควรเปลี่ยนเมล",
        svgType: "discord",
        imageUrl: "",
        stock: 1,
        stockItems: ["discord_acc_2015_1:pass123"]
    },
    {
        id: "discord-emoji",
        name: "ไฟล์อิโมจิ 7 สี",
        price: 59,
        category: "discord",
        tag: "",
        description: "รายละเอียด: จะได้เป็นไดร์ฟทุกสี สามารถเอาลงเชิร์ฟได้แบบไม่ลังเล",
        svgType: "others",
        imageUrl: "",
        stock: 99,
        stockItems: ["https://drive.google.com/drive/folders/mock-emoji-link"]
    },
    // FiveM Category
    {
        id: "fivem-steam-empty",
        name: "สตรีมเปล่า",
        price: 5,
        category: "fivem",
        tag: "",
        description: "รายละเอียด: เป็นสตรีมเปล่า ไม่เคยเชื่อมมาก่อน สะอาด ไม่เคยใช้งาน",
        svgType: "steam",
        imageUrl: "",
        stock: 5,
        stockItems: ["steam_empty_1:pass123", "steam_empty_2:pass123"]
    },
    {
        id: "fivem-rockstar-empty",
        name: "ร็อกสตาร์เปล่า",
        price: 20,
        category: "fivem",
        tag: "",
        description: "รายละเอียด: ไม่เคยใช้งานมาก่อน เป็นแอคเปล่า ยังไม่มีการเชื่อมใดๆทั้งสิ้น",
        svgType: "fivem",
        imageUrl: "",
        stock: 5,
        stockItems: ["rockstar_empty_1:pass123", "rockstar_empty_2:pass123"]
    },
    {
        id: "fivem-ready-to-play",
        name: "เซ็ทพร้อมเล่น",
        price: 99,
        category: "fivem",
        tag: "hot",
        description: "รายละเอียด: จะได้รับแบบครบเซ็ต พร้อมเล่น FIVEM ทันที",
        svgType: "fivem",
        imageUrl: "",
        stock: 3,
        stockItems: ["fivem_ready_set_1:pass123", "fivem_ready_set_2:pass123"]
    },
    {
        id: "fivem-gta-download",
        name: "สตรีมยืมดาวน์โหลด GTA",
        price: 25,
        category: "fivem",
        tag: "",
        description: "รายละเอียด: ไว้สำหรับดาวน์โหลดเท่านั้น สอบถามสอบถามเพิ่มเติมก่อนซื้อได้",
        svgType: "steam",
        imageUrl: "",
        stock: 2,
        stockItems: ["steam_gta_dl_1:pass123", "steam_gta_dl_2:pass123"]
    }
];

const DEFAULT_USERS = [
    {
        userId: "USR-82739",
        username: "user",
        password: "password",
        email: "user@x24store.com",
        balance: 500.00,
        role: "member",
        registeredAt: Date.now()
    },
    {
        userId: "USR-00001",
        username: "admin",
        password: "admin123",
        email: "admin@x24store.com",
        balance: 999999.00,
        role: "admin",
        registeredAt: Date.now()
    }
];

const DEFAULT_CHATS = {
    "user": [
        { sender: "system", text: "ยินดีต้อนรับเข้าสู่ PB SERVICES Live Chat! กรุณาฝากคำถามไว้ได้เลย แอดมินจะตอบกลับโดยเร็วที่สุดค่ะ", timestamp: Date.now() - 3600000 * 2 },
        { sender: "user", text: "สวัสดีครับ สอบถามเรื่องการเติมเงิน PromptPay ยอดเข้าทันทีไหมครับ", timestamp: Date.now() - 1800000 },
        { sender: "admin", text: "สวัสดีค่ะคุณ user ยอดเติมเงินผ่านระบบ PromptPay QR Code จะเช็กอัตโนมัติและเข้ากระเป๋าทันทีใน 5 วินาทีค่ะ!", timestamp: Date.now() - 1700000 }
    ]
};

const DEFAULT_ORDERS = [
    {
        orderId: "X24-92837",
        username: "user",
        items: [
            { id: "prod-robux-1", name: "Robux 500 Package (แถมฟรี VIP Pass)", price: 150, qty: 1 }
        ],
        totalPrice: 150,
        date: Date.now() - 3600000 * 24,
        status: "Completed"
    },
    {
        orderId: "X24-18239",
        username: "user",
        items: [
            { id: "prod-discord-1", name: "Discord Nitro Classic (1 เดือน)", price: 99, qty: 2 }
        ],
        totalPrice: 198,
        date: Date.now() - 3600000 * 12,
        status: "Completed"
    }
];

// Helper to escape HTML characters
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

const CP1252_REVERSE_MAP = {
    0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84,
    0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88,
    0x2030: 0x89, 0x0160: 0x8A, 0x2039: 0x8B, 0x0152: 0x8C,
    0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92, 0x201C: 0x93,
    0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
    0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B,
    0x0153: 0x9C, 0x017E: 0x9E, 0x0178: 0x9F
};

const looksMojibake = (text) => /à[¸¹]|â€¢|Â|ï¿½/.test(text);

const repairMojibakeText = (text) => {
    if (!looksMojibake(text) || typeof TextDecoder === 'undefined') return text;

    const bytes = [];
    for (const char of text) {
        const code = char.codePointAt(0);
        if (CP1252_REVERSE_MAP[code] !== undefined) {
            bytes.push(CP1252_REVERSE_MAP[code]);
        } else if (code <= 255) {
            bytes.push(code);
        } else {
            return text;
        }
    }

    try {
        const repaired = new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(bytes));
        return repaired.includes('\uFFFD') ? text : repaired;
    } catch {
        return text;
    }
};

const repairStoredText = (value) => {
    if (typeof value === 'string') return repairMojibakeText(value);
    if (Array.isArray(value)) return value.map(repairStoredText);
    if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, repairStoredText(item)]));
    }
    return value;
};

const loadStoredJson = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        return repairStoredText(JSON.parse(raw));
    } catch {
        return fallback;
    }
};

// --------------------------------------------------------------------------
// SVG Vector Icons Renderer Components
// --------------------------------------------------------------------------
function ProductSVG({ type }) {
    switch (type) {
        case 'fivem':
            return (
                <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="fivemBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a81141" />
                            <stop offset="50%" stopColor="#8a0e35" />
                            <stop offset="100%" stopColor="#5c0923" />
                        </linearGradient>
                        <filter id="fivemShadow" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.15"/>
                        </filter>
                    </defs>
                    <rect width="80" height="80" x="10" y="10" rx="12" fill="url(#fivemBg)" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" />
                    <g filter="url(#fivemShadow)" transform="translate(20, 20) scale(2.5)" fill="#ffffff">
                        <path d="M22.4 24h-5.225c-.117 0-.455-1.127-1.026-3.375-1.982-6.909-3.124-10.946-3.417-12.12l3.37-3.325h.099c.454 1.42 2.554 7.676 6.299 18.768ZM12.342 7.084h-.048a3.382 3.385 0 0 1-.098-.492v-.098a102.619 102.715 0 0 1 3.272-3.275c.13.196.196.356.196.491v.05a140.694 140.826 0 0 1-3.322 3.324ZM5.994 10.9h-.05c.67-2.12 1.076-3.209 1.223-3.275L14.492.343c.08 0 .258.524.533 1.562zm1.37-4.014h-.05C8.813 2.342 9.612.048 9.71 0h4.495v.05a664.971 664.971 0 0 1-6.841 6.839Zm-2.69 7.874h-.05c.166-.798.554-1.418 1.174-1.855a312.918 313.213 0 0 1 5.71-5.717h.05c-.117.672-.375 1.175-.781 1.52zM1.598 24l-.098-.05c1.399-4.172 2.148-6.322 2.248-6.45l6.74-6.694v.05C10.232 11.88 8.974 16.263 6.73 24Z"/>
                    </g>
                </svg>
            );
        case 'robux':
            return (
                <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="rbGradient" cx="50%" cy="40%" r="50%">
                            <stop offset="0%" stopColor="#fbc02d" />
                            <stop offset="70%" stopColor="#f57f17" />
                            <stop offset="100%" stopColor="#e65100" />
                        </radialGradient>
                        <filter id="rbShadow" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#e65100" floodOpacity="0.3" />
                        </filter>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="rgba(251, 192, 45, 0.15)" stroke="rgba(251, 192, 45, 0.3)" strokeWidth="1" />
                    <g filter="url(#rbShadow)">
                        <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="url(#rbGradient)" />
                        <polygon points="50,30 68,40 68,60 50,70 32,60 32,40" fill="#ffffff" opacity="0.9" />
                        <polygon points="50,38 59,44 59,56 50,62 41,56 41,44" fill="url(#rbGradient)" />
                    </g>
                </svg>
            );
        case 'steam':
            return (
                <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="steamBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#171a21" />
                            <stop offset="50%" stopColor="#1b2838" />
                            <stop offset="100%" stopColor="#2a475e" />
                        </linearGradient>
                        <linearGradient id="steamBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#66c0f4" />
                            <stop offset="100%" stopColor="#1b2838" />
                        </linearGradient>
                        <filter id="steamGlow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <rect width="90" height="90" x="5" y="5" rx="14" fill="url(#steamBg)" stroke="rgba(102, 192, 244, 0.2)" strokeWidth="2" />
                    <g transform="translate(10, 10) scale(0.8)">
                        <path d="M49.9 8.2c-22.3 0-40.4 17.5-41.5 39.4l24.4 9.9c2.3-1.6 5.1-2.5 8.1-2.5 2.6 0 5 .7 7.1 1.8L69.8 44c.1-.8.2-1.7.2-2.5 0-14.7-11.9-26.6-26.6-26.6S16.8 26.8 16.8 41.5c0 5 1.4 9.6 3.8 13.5L3.8 47.9C4.8 24.3 24.1 5.3 48.2 5.3c24.7 0 44.8 20.1 44.8 44.8S72.9 94.9 48.2 94.9c-16.7 0-31.2-9.1-38.9-22.7L25 66.8c2.4 3.7 6.6 6.1 11.4 6.1 7.6 0 13.8-6.2 13.8-13.8 0-.8-.1-1.6-.2-2.4l21.2-12.7c1.7 1.1 3.7 1.7 5.9 1.7 6 0 10.9-4.9 10.9-10.9s-4.9-10.9-10.9-10.9-10.9 4.9-10.9 10.9c0 .7.1 1.4.2 2l-21.2 12.7c-2.3-1.8-5.3-2.9-8.5-2.9z"
                            fill="url(#steamBlue)" filter="url(#steamGlow)" />
                    </g>
                </svg>
            );
        case 'discord':
            return (
                <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="dcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7289da" />
                            <stop offset="100%" stopColor="#5865f2" />
                        </linearGradient>
                        <filter id="dcGlow">
                            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#5865f2" floodOpacity="0.3" />
                        </filter>
                    </defs>
                    <rect width="80" height="80" x="10" y="10" rx="12" fill="url(#dcGrad)" stroke="rgba(88, 101, 242, 0.15)" strokeWidth="2" />
                    <g filter="url(#dcGlow)" transform="translate(28, 28) scale(1.83)">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" fill="#ffffff" />
                    </g>
                </svg>
            );
        case 'netflix':
            return (
                <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="nfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#141414" />
                            <stop offset="100%" stopColor="#000000" />
                        </linearGradient>
                        <linearGradient id="nRedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#e50914" />
                            <stop offset="100%" stopColor="#b81d24" />
                        </linearGradient>
                        <filter id="nfShadow">
                            <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.6" />
                        </filter>
                    </defs>
                    <rect width="80" height="80" x="10" y="10" rx="12" fill="url(#nfGrad)" stroke="rgba(229, 9, 20, 0.15)" strokeWidth="2" />
                    <g filter="url(#nfShadow)" transform="translate(20, 20) scale(2.5)">
                        {/* Left vertical bar */}
                        <path d="M5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z" fill="#b81d24" />
                        {/* Right vertical bar */}
                        <path d="M13.887 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95z" fill="#b81d24" />
                        {/* Diagonal bar on top */}
                        <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24z" fill="url(#nRedGrad)" />
                    </g>
                </svg>
            );
        default:
            return (
                <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2" />
                    <text x="50" y="54" fontSize="9" textAnchor="middle" fill="var(--primary)" fontWeight="bold">PB SERVICES</text>
                </svg>
            );
    }
}

// --------------------------------------------------------------------------
// App Core Component
// --------------------------------------------------------------------------
export default function App() {
    // 1. Storage Synced States
    const [users, setUsers] = useState(() => {
        const stored = loadStoredJson("x24_users", DEFAULT_USERS);
        let updated = false;
        const mapped = stored.map((u, index) => {
            let changed = false;
            if (!u.userId) {
                u.userId = u.role === 'admin' ? "USR-00001" : (u.username === 'user' ? "USR-82739" : `USR-${Math.floor(10000 + Math.random() * 90000)}`);
                changed = true;
            }
            if (!u.registeredAt || u.registeredAt === 1735689600000 || u.registeredAt === 1739984400000) {
                u.registeredAt = Date.now();
                changed = true;
            }
            if (changed) updated = true;
            return u;
        });
        if (updated) {
            localStorage.setItem("x24_users", JSON.stringify(mapped));
        }
        return mapped;
    });
    const [products, setProducts] = useState(() => {
        let stored = loadStoredJson("x24_products", null);
        // Force refresh / overwrite if no products or old defaults are loaded
        if (!stored || stored.some(p => p.id === 'prod-fivem-1' || p.id === 'prod-discord-1')) {
            stored = DEFAULT_PRODUCTS;
            localStorage.setItem("x24_products", JSON.stringify(stored));
        }
        return stored;
    });
    const [orders, setOrders] = useState(() => {
        const stored = loadStoredJson("x24_orders", DEFAULT_ORDERS);
        return stored.map(order => {
            if (order.orderId && !order.orderId.startsWith("X24-")) {
                const match = order.orderId.match(/[a-zA-Z]+-(.+)/);
                const suffix = match ? match[1] : order.orderId;
                return { ...order, orderId: "X24-" + suffix };
            }
            return order;
        });
    });
    const [chats, setChats] = useState(() => {
        const stored = loadStoredJson("x24_chats", DEFAULT_CHATS);
        let migrated = false;
        const updatedChats = {};
        Object.keys(stored).forEach(key => {
            updatedChats[key] = stored[key].map(msg => {
                if (msg.text && msg.text.includes("X24 Store")) {
                    migrated = true;
                    return { ...msg, text: msg.text.replace(/X24 Store/g, "X24 SERVICES") };
                }
                return msg;
            });
        });
        if (migrated) {
            localStorage.setItem("x24_chats", JSON.stringify(updatedChats));
            return updatedChats;
        }
        return stored;
    });
    const [currentUser, setCurrentUser] = useState(() => {
        const cur = loadStoredJson("x24_current_user", null);
        if (cur) {
            let changed = false;
            if (!cur.userId) {
                cur.userId = cur.role === 'admin' ? "USR-00001" : (cur.username === 'user' ? "USR-82739" : `USR-${Math.floor(10000 + Math.random() * 90000)}`);
                changed = true;
            }
            if (!cur.registeredAt || cur.registeredAt === 1735689600000 || cur.registeredAt === 1739984400000) {
                cur.registeredAt = Date.now();
                changed = true;
            }
            if (changed) {
                localStorage.setItem("x24_current_user", JSON.stringify(cur));
            }
        }
        return cur;
    });

    // 2. UI Control States
    const [route, setRoute] = useState(window.location.hash || '#/');
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null
    const [toasts, setToasts] = useState([]);

    // Admin Dashboard States
    const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
    const [activeChatThread, setActiveChatThread] = useState('');

    // Donation States
    const [donateChannel, setDonateChannel] = useState('promptpay');
    const [selectedDonateAmount, setSelectedDonateAmount] = useState(100);
    const [slipFile, setSlipFile] = useState(null);
    const [slipPreviewUrl, setSlipPreviewUrl] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);

    // Search filter category
    const [productsCategory, setProductsCategory] = useState('all');
    const [productsSort, setProductsSort] = useState('default');

    // Active Detail Modal Product
    const [activeDetailProduct, setActiveDetailProduct] = useState(null);

    // Admin Custom Product Logo States
    const [adminImageUrl, setAdminImageUrl] = useState("");
    const [adminImagePreview, setAdminImagePreview] = useState("");
    const [adminProdSvg, setAdminProdSvg] = useState("discord");

    // Chat client bubble toggle
    const [chatOpen, setChatOpen] = useState(false);
    const [unreadClient, setUnreadClient] = useState(false);

    // Delivery Notification States
    const [deliveryNotifications, setDeliveryNotifications] = useState(() => {
        try {
            const stored = localStorage.getItem("x24_delivery_notifications");
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    });
    const [deliveryPopupOpen, setDeliveryPopupOpen] = useState(false);

    // Mobile Nav links toggle
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Refs
    const chatFeedRef = useRef(null);
    const adminChatFeedRef = useRef(null);
    const cartOwnerRef = useRef(null);

    // --------------------------------------------------------------------------
    // Side Effects & Synchronizations
    // --------------------------------------------------------------------------

    // Save DB state to LocalStorage whenever they change
    useEffect(() => {
        localStorage.setItem("x24_users", JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem("x24_products", JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem("x24_orders", JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        localStorage.setItem("x24_chats", JSON.stringify(chats));
    }, [chats]);

    useEffect(() => {
        localStorage.setItem("x24_delivery_notifications", JSON.stringify(deliveryNotifications));
    }, [deliveryNotifications]);

    // Update admin custom image states on product edit modal load
    useEffect(() => {
        if (activeDetailProduct && activeDetailProduct.isAdminEdit) {
            setAdminImageUrl(activeDetailProduct.imageUrl || "");
            setAdminImagePreview(activeDetailProduct.imageUrl || "");
            setAdminProdSvg(activeDetailProduct.svgType || "discord");
        }
    }, [activeDetailProduct]);

    useEffect(() => {
        localStorage.setItem("x24_current_user", JSON.stringify(currentUser));

        // Sync user list balance when currentUser balance is updated
        if (currentUser) {
            setUsers(prev => prev.map(u => u.username === currentUser.username ? { ...u, balance: currentUser.balance } : u));

            // Load user specific cart only when the account changes.
            // Balance updates also change currentUser, so reloading every time can restore an older cart.
            if (cartOwnerRef.current !== currentUser.username) {
                const savedCart = loadStoredJson(`x24_cart_${currentUser.username}`, []);
                setCart(savedCart);
                cartOwnerRef.current = currentUser.username;
            }
        } else {
            setCart([]);
            cartOwnerRef.current = null;
        }
    }, [currentUser]);

    // Save cart state per user
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`x24_cart_${currentUser.username}`, JSON.stringify(cart));
        }
    }, [cart, currentUser]);

    // Hash Router Listener
    useEffect(() => {
        const handleHashChange = () => {
            const rawHash = window.location.hash || '#/';
            setRoute(rawHash);
            setMobileMenuOpen(false);

            // Parse category from URL parameter if hash has it
            const paramIndex = rawHash.indexOf("?");
            if (paramIndex !== -1) {
                const query = rawHash.substring(paramIndex + 1);
                const params = new URLSearchParams(query);
                setProductsCategory(params.get("category") || "all");
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Run once on startup

    }, []);

    // Countdown Timer Effect for PromptPay payments
    useEffect(() => {
        const path = route.split('?')[0];
        if (path === '#/donate' && donateChannel === 'promptpay') {
            setTimeLeft(600); // Reset to 10 minutes (600 seconds)
            
            const interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [route, donateChannel, selectedDonateAmount]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Multi-tab Storage events synchronization listener
    useEffect(() => {
        const handleStorageEvent = (e) => {
            if (e.key === "x24_chats" || e.key === "x24_chat_update_time") {
                const data = loadStoredJson("x24_chats", DEFAULT_CHATS);
                setChats(data);

                // Alert client of new messages
                if (localStorage.getItem("x24_unread_client") === "1" && !chatOpen) {
                    setUnreadClient(true);
                }
            }
            if (e.key === "x24_current_user") {
                setCurrentUser(loadStoredJson("x24_current_user", null));
            }
            if (e.key === "x24_users") {
                setUsers(loadStoredJson("x24_users", DEFAULT_USERS));
            }
            if (e.key === "x24_products") {
                setProducts(loadStoredJson("x24_products", DEFAULT_PRODUCTS));
            }
        };

        window.addEventListener('storage', handleStorageEvent);
        return () => window.removeEventListener('storage', handleStorageEvent);
    }, [chatOpen]);

    // Scroll chat feeds to bottom when messages list updates
    useEffect(() => {
        if (chatOpen && chatFeedRef.current) {
            chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
        }
    }, [chatOpen, chats, currentUser]);

    useEffect(() => {
        if (activeAdminTab === "chats" && adminChatFeedRef.current) {
            adminChatFeedRef.current.scrollTop = adminChatFeedRef.current.scrollHeight;
        }
    }, [activeAdminTab, chats, activeChatThread]);

    // --------------------------------------------------------------------------
    // Global Helper Actions
    // --------------------------------------------------------------------------
    const showToast = (message, type = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    const readImageAttachment = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                resolve(null);
                return;
            }

            if (!file.type.startsWith("image/")) {
                reject(new Error("กรุณาเลือกไฟล์รูปภาพเท่านั้น"));
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                reject(new Error("ไฟล์รูปภาพต้องมีขนาดไม่เกิน 2MB"));
                return;
            }

            const reader = new FileReader();
            reader.onload = () => resolve({
                type: file.type,
                name: file.name,
                size: file.size,
                dataUrl: reader.result
            });
            reader.onerror = () => reject(new Error("อ่านไฟล์รูปภาพไม่สำเร็จ"));
            reader.readAsDataURL(file);
        });
    };

    const getProductStock = (product) => {
        if (product && Array.isArray(product.stockItems)) {
            return product.stockItems.length;
        }
        return Number.isFinite(Number(product?.stock)) ? Number(product.stock) : 99;
    };

    const getCurrentProduct = (product) => {
        return products.find(p => p.id === product?.id) || product;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("x24_current_user");
        showToast("ออกจากระบบเรียบร้อยแล้วค่ะ");
        window.location.hash = "#/";
    };

    // Add to Cart Action
    const handleAddToCart = (product) => {
        if (!currentUser) {
            showToast("กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าในตะกร้า", "warning");
            setAuthModal('login');
            return;
        }

        const latestProduct = getCurrentProduct(product);
        const stock = getProductStock(latestProduct);
        const currentQty = cart.find(i => i.product.id === product.id)?.qty || 0;
        if (stock <= 0 || currentQty >= stock) {
            showToast("สินค้าชิ้นนี้มีจำนวนในสต็อกไม่พอ", "warning");
            return;
        }

        setCart(prev => {
            const item = prev.find(i => i.product.id === product.id);
            if (item) {
                return prev.map(i => i.product.id === product.id ? { ...i, product: latestProduct, qty: i.qty + 1 } : i);
            } else {
                return [...prev, { product: latestProduct, qty: 1 }];
            }
        });

        setCartOpen(true);

        showToast(`เพิ่ม ${product.name} ในตะกร้าแล้ว`);
    };

    // Update Quantity inside Drawer
    const handleUpdateCartQty = (productId, delta) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.product.id === productId) {
                    const latestProduct = getCurrentProduct(item.product);
                    const stock = getProductStock(latestProduct);
                    const newQty = item.qty + delta;
                    if (newQty > stock) {
                        showToast("เพิ่มจำนวนเกินสต็อกสินค้าไม่ได้", "warning");
                        return item;
                    }
                    return newQty <= 0 ? null : { ...item, product: latestProduct, qty: newQty };
                }
                return item;
            }).filter(Boolean);
        });
    };

    const handleRemoveCartItem = (productId) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };

    const getCartTotal = () => {
        return cart.reduce((sum, item) => {
            const product = getCurrentProduct(item.product);
            return sum + product.price * item.qty;
        }, 0);
    };

    const getCartCount = () => {
        return cart.reduce((sum, item) => sum + item.qty, 0);
    };

    // Checkout processing
    const handleCheckout = () => {
        if (!currentUser) return;
        if (cart.length === 0) return;

        const total = getCartTotal();
        if (currentUser.balance < total) {
            showToast("ยอดเงินคงเหลือของคุณไม่เพียงพอ กรุณาเติมเงินค่ะ", "error");
            window.location.hash = "#/donate";
            setCartOpen(false);
            return;
        }

        if (window.confirm(`ยืนยันการซื้อสินค้าทั้งหมด ยอดรวม ${total.toFixed(2)} บาท ใช่หรือไม่?`)) {
            // Deduct User balance
            setCurrentUser(prev => ({ ...prev, balance: prev.balance - total }));

            // Log new Order
            const newOrder = {
                orderId: "X24-" + Math.floor(10000 + Math.random() * 90000),
                username: currentUser.username,
                items: cart.map(i => {
                    const prodInDb = products.find(p => p.id === i.product.id);
                    let deliveredItems = [];
                    if (prodInDb && Array.isArray(prodInDb.stockItems) && prodInDb.stockItems.length > 0) {
                        deliveredItems = prodInDb.stockItems.slice(0, i.qty);
                    }
                    return {
                        id: i.product.id,
                        name: i.product.name,
                        price: i.product.price,
                        qty: i.qty,
                        deliveredItems
                    };
                }),
                totalPrice: total,
                date: Date.now(),
                status: "Completed"
            };

            setOrders(prev => [...prev, newOrder]);
            setProducts(prev => prev.map(product => {
                const boughtItem = cart.find(item => item.product.id === product.id);
                if (!boughtItem) return product;

                let newStockItems = Array.isArray(product.stockItems) ? [...product.stockItems] : [];
                if (newStockItems.length > 0) {
                    newStockItems = newStockItems.slice(boughtItem.qty);
                }
                const newStock = newStockItems.length > 0 ? newStockItems.length : Math.max(0, getProductStock(product) - boughtItem.qty);

                return {
                    ...product,
                    stockItems: newStockItems,
                    stock: newStock
                };
            }));
            const newDelivered = newOrder.items.filter(it => it.deliveredItems && it.deliveredItems.length > 0);
            if (newDelivered.length > 0) {
                setDeliveryNotifications(newDelivered);
                setDeliveryPopupOpen(true);
            }

            setCart([]);
            setCartOpen(false);
            showToast(`สั่งซื้อสินค้าสำเร็จ! เลขใบเสร็จ: ${newOrder.orderId}`, "success");
            window.location.hash = "#/history";
        }
    };

    const handleDismissDelivery = () => {
        setDeliveryNotifications([]);
        setDeliveryPopupOpen(false);
    };

    // Mock Topup Donation & Bank Slip Verification
    const handleDonateSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const checkBtn = e.target.querySelector("button[type='submit']");

        // Handle PromptPay slip verification via Backend if a file is selected
        if (donateChannel === 'promptpay' && slipFile) {
            if (checkBtn) {
                checkBtn.disabled = true;
                checkBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังตรวจสอบสลิปการโอน...`;
            }
            setIsVerifying(true);

            try {
                const formData = new FormData();
                formData.append("slip", slipFile);
                formData.append("amount", selectedDonateAmount);
                formData.append("username", currentUser.username);

                const response = await fetch("/api/verify-slip", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    const addAmt = result.amount || selectedDonateAmount;
                    let successMsg = `เติมเงินสำเร็จ ${addAmt} บาท ผ่าน PromptPay QR!`;
                    if (result.savedToDb) {
                        successMsg += ` (บันทึกข้อมูลลง Supabase สำเร็จ)`;
                    } else if (result.dbError) {
                        console.warn("[Database Info] Slip verified but DB save warning:", result.dbError);
                        successMsg += ` (บันทึก DB จำลองสำเร็จ)`;
                    }

                    // Update user balance (this also triggers localStorage sync through useEffect)
                    setCurrentUser(prev => ({ ...prev, balance: prev.balance + addAmt }));

                    // Add Refill log to orders
                    const topupOrder = {
                        orderId: "X24-" + Math.floor(10000 + Math.random() * 90000),
                        username: currentUser.username,
                        items: [
                            { id: "refill", name: `เติมเงินผ่าน ${donateChannel.toUpperCase()} (สลิปจริง)`, price: addAmt, qty: 1 }
                        ],
                        totalPrice: addAmt,
                        date: Date.now(),
                        status: "Completed",
                        details: result.details
                    };
                    setOrders(prev => [...prev, topupOrder]);

                    showToast(successMsg, "success");

                    // Reset upload state
                    setSlipFile(null);
                    setSlipPreviewUrl('');

                    // Redirect to profile
                    window.location.hash = "#/profile";
                } else {
                    showToast(result.message || "การตรวจสอบสลิปล้มเหลว", "error");
                }
            } catch (error) {
                console.error("Error verifying slip:", error);
                showToast("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่าได้รัน backend (server.js) หรือยัง", "error");
            } finally {
                setIsVerifying(false);
                if (checkBtn) {
                    checkBtn.disabled = false;
                    checkBtn.innerHTML = `<i class="fa-solid fa-square-check"></i> ตรวจสอบยอดเงิน (สแกนสลิปจริง)`;
                }
            }
            return;
        }

        // Original fallback flow (Simulated/Mock Check)
        if (checkBtn) {
            checkBtn.disabled = true;
            checkBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังตรวจสอบยอดโอนจำลอง...`;
        }

        setTimeout(() => {
            let addAmt = selectedDonateAmount;
            let successMsg = '';

            if (donateChannel === 'promptpay') {
                successMsg = `เติมเงินสำเร็จ ${selectedDonateAmount} บาท ผ่าน PromptPay QR! (โหมดจำลอง)`;
            } else if (donateChannel === 'truewallet') {
                const phone = document.getElementById("wallet-phone")?.value || '08x-xxx-xxxx';
                successMsg = `เติมเงินสำเร็จ ${selectedDonateAmount} บาท ผ่าน TrueWallet โทร ${phone}!`;
            } else if (donateChannel === 'cashcard') {
                const pin = document.getElementById("cashcard-pin")?.value || '';
                if (pin.length !== 14) {
                    showToast("กรุณากรอกรหัสบัตรเงินสด 14 หลักให้ครบถ้วน", "error");
                    if (checkBtn) {
                        checkBtn.disabled = false;
                        checkBtn.innerHTML = `<i class="fa-solid fa-wallet"></i> เติมเงินทันที`;
                    }
                    return;
                }
                addAmt = 85.00; // Deduct 15% mockup fee
                successMsg = `เติมเงินสำเร็จ! บัตรทรูมันนี่มูลค่า 100 บาท (หักค่าธรรมเนียม เหลือเครดิต ${addAmt} บาท)`;
            }

            setCurrentUser(prev => ({ ...prev, balance: prev.balance + addAmt }));

            // Add Refill log to orders
            const topupOrder = {
                orderId: "X24-" + Math.floor(10000 + Math.random() * 90000),
                username: currentUser.username,
                items: [
                    { id: "refill", name: `เติมเงินผ่าน ${donateChannel.toUpperCase()} (จำลอง)`, price: addAmt, qty: 1 }
                ],
                totalPrice: addAmt,
                date: Date.now(),
                status: "Completed"
            };
            setOrders(prev => [...prev, topupOrder]);

            showToast(successMsg);
            window.location.hash = "#/profile";

            if (checkBtn) {
                checkBtn.disabled = false;
                checkBtn.innerHTML = donateChannel === 'promptpay' ? `<i class="fa-solid fa-square-check"></i> ตรวจสอบยอดเงิน (จำลองการโอน)` : `<i class="fa-solid fa-wallet"></i> เติมเงินทันที`;
            }
        }, 1500);
    };

    // Client Chat Message Submission
    const handleClientSendMsg = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const input = document.getElementById("chat-message-input");
        const fileInput = document.getElementById("chat-image-input");
        const text = input?.value.trim();
        const imageFile = fileInput?.files?.[0];
        if (!text && !imageFile) return;

        let attachment = null;
        try {
            attachment = await readImageAttachment(imageFile);
        } catch (error) {
            showToast(error.message, "warning");
            return;
        }

        const user = currentUser.username;
        const thread = chats[user] || [];

        const newMsg = {
            sender: "user",
            text: text,
            attachment,
            timestamp: Date.now()
        };

        setChats(prev => {
            const updated = { ...prev, [user]: [...thread, newMsg] };
            localStorage.setItem("x24_chats", JSON.stringify(updated));
            return updated;
        });

        // Storage notification
        localStorage.setItem("x24_chat_update_time", Date.now().toString());
        localStorage.setItem("x24_unread_admin_" + user, "1");

        if (input) input.value = '';
        if (fileInput) fileInput.value = '';

        // Mock assistant auto reply in 6 seconds if admin tab isn't open
        simulateBotReply(user, text || "ส่งรูปภาพประกอบ");
    };

    const simulateBotReply = (username, text) => {
        setTimeout(() => {
            const currentChats = loadStoredJson("x24_chats", {});
            const thread = currentChats[username] || [];
            const last = thread[thread.length - 1];

            if (last && last.sender === "user") {
                const auto = {
                    sender: "admin",
                    text: `[ระบบตอบกลับอัตโนมัติ] ขอบคุณสำหรับข้อความ: "${text}" ขณะนี้เจ้าหน้าที่ได้รับเรื่องแล้ว จะรีบเข้ามาตอบแชทโดยเร็วที่สุดค่ะ`,
                    timestamp: Date.now()
                };

                setChats(prev => {
                    const updated = { ...prev, [username]: [...(prev[username] || []), auto] };
                    localStorage.setItem("x24_chats", JSON.stringify(updated));
                    localStorage.setItem("x24_unread_client", "1");
                    return updated;
                });
                localStorage.setItem("x24_chat_update_time", Date.now().toString());
            }
        }, 6000);
    };

    // Client Chat ticket creation
    const handleClientCreateTicket = () => {
        if (!currentUser) return;
        const user = currentUser.username;
        const welcomeMsg = {
            sender: "system",
            text: "ยินดีต้อนรับเข้าสู่ PB SERVICES Live Support! เจ้าหน้าที่ได้รับตั๋วสนทนาของท่านแล้ว กรุณาพิมพ์ทิ้งคำถามหรือข้อสงสัยไว้ได้เลยค่ะ",
            timestamp: Date.now()
        };
        setChats(prev => {
            const updated = { ...prev, [user]: [welcomeMsg] };
            localStorage.setItem("x24_chats", JSON.stringify(updated));
            return updated;
        });
        localStorage.setItem("x24_chat_update_time", Date.now().toString());
        localStorage.setItem("x24_unread_admin_" + user, "1");
        showToast("เปิดตั๋วติดต่อแอดมินสำเร็จแล้วค่ะ");
    };

    // Client Chat ticket close/delete
    const handleClientCloseChat = () => {
        if (!currentUser) return;
        const user = currentUser.username;
        if (window.confirm("คุณต้องการปิดแชทนี้และลบประวัติการสนทนาทั้งหมดในระบบหรือไม่? (ข้อมูลจะหายไปทั้งหมด)")) {
            setChats(prev => {
                const updated = { ...prev };
                delete updated[user];
                localStorage.setItem("x24_chats", JSON.stringify(updated));
                return updated;
            });
            localStorage.removeItem("x24_unread_client");
            localStorage.removeItem("x24_unread_admin_" + user);
            localStorage.setItem("x24_chat_update_time", Date.now().toString());
            showToast("ปิดห้องสนทนาสำเร็จและลบข้อมูลเรียบร้อยแล้วค่ะ");
        }
    };

    // Admin Chat ticket close/delete
    const handleAdminCloseChat = (username) => {
        if (!username) return;
        if (window.confirm(`ยืนยันการปิดตั๋วสนทนากับคุณ ${username} และลบประวัติทั้งหมดออกจากระบบ?`)) {
            setChats(prev => {
                const updated = { ...prev };
                delete updated[username];
                localStorage.setItem("x24_chats", JSON.stringify(updated));
                return updated;
            });
            localStorage.removeItem("x24_unread_client");
            localStorage.removeItem("x24_unread_admin_" + username);
            localStorage.setItem("x24_chat_update_time", Date.now().toString());
            setActiveChatThread('');
            showToast(`ปิดตั๋วสนทนาของ ${username} และลบประวัติสำเร็จ`);
        }
    };

    // Admin reply Submission
    const handleAdminSendMsg = async (e) => {
        e.preventDefault();
        if (!activeChatThread) return;

        const input = document.getElementById("admin-message-input");
        const fileInput = document.getElementById("admin-image-input");
        const text = input?.value.trim();
        const imageFile = fileInput?.files?.[0];
        if (!text && !imageFile) return;

        let attachment = null;
        try {
            attachment = await readImageAttachment(imageFile);
        } catch (error) {
            showToast(error.message, "warning");
            return;
        }

        const thread = chats[activeChatThread] || [];

        const newMsg = {
            sender: "admin",
            text: text,
            attachment,
            timestamp: Date.now()
        };

        setChats(prev => {
            const updated = { ...prev, [activeChatThread]: [...thread, newMsg] };
            localStorage.setItem("x24_chats", JSON.stringify(updated));
            return updated;
        });

        localStorage.setItem("x24_chat_update_time", Date.now().toString());
        localStorage.setItem("x24_unread_client", "1");
        if (input) input.value = '';
        if (fileInput) fileInput.value = '';
    };

    // Clean admin chat history
    const handleAdminClearChat = (username) => {
        if (window.confirm(`ยืนยันการล้างบทสนทนากับคุณ ${username}?`)) {
            setChats(prev => {
                const updated = {
                    ...prev,
                    [username]: [{ sender: "system", text: "ลบประวัติการแชทโดยผู้ดูแลระบบ", timestamp: Date.now() }]
                };
                localStorage.setItem("x24_chats", JSON.stringify(updated));
                return updated;
            });
            localStorage.setItem("x24_chat_update_time", Date.now().toString());
        }
    };

    // Admin inventory edit/add submit
    const handleAdminProductSave = (e) => {
        e.preventDefault();
        const id = document.getElementById("admin-prod-id")?.value || "";
        const name = document.getElementById("admin-prod-name")?.value;
        const price = parseFloat(document.getElementById("admin-prod-price")?.value) || 0;
        const category = document.getElementById("admin-prod-cat")?.value;
        const tag = document.getElementById("admin-prod-tag")?.value;

        const stockItemsInput = document.getElementById("admin-prod-stock-items")?.value || "";
        const stockItems = stockItemsInput.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        let stock = 0;
        if (stockItems.length > 0) {
            stock = stockItems.length;
        } else {
            const stockInput = document.getElementById("admin-prod-stock")?.value;
            stock = Math.max(0, stockInput === undefined ? getProductStock(activeDetailProduct) : (parseInt(stockInput, 10) || 0));
        }

        const description = document.getElementById("admin-prod-desc")?.value;
        const status = document.getElementById("admin-prod-status")?.value || 'active';

        const isEdit = !!activeDetailProduct.id;

        const savedProd = {
            id: id || "prod-" + Math.floor(10000 + Math.random() * 90000),
            name, price, category, tag, 
            svgType: adminProdSvg,
            imageUrl: adminImageUrl,
            stock, description, status, stockItems
        };

        if (isEdit) {
            setProducts(prev => prev.map(p => p.id === activeDetailProduct.id ? savedProd : p));
            showToast("แก้ไขข้อมูลสินค้าเรียบร้อยค่ะ");
        } else {
            setProducts(prev => [...prev, savedProd]);
            showToast("เพิ่มสินค้าชิ้นใหม่สำเร็จ!");
        }

        setActiveDetailProduct(null); // Close modal
    };

    const handleAdminImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const attached = await readImageAttachment(file);
            if (attached && attached.dataUrl) {
                setAdminImagePreview(attached.dataUrl);
                setAdminImageUrl(attached.dataUrl);
            }
        } catch (err) {
            showToast(err.message, "warning");
        }
    };

    const handleAdminProductDelete = (id) => {
        if (window.confirm("ยืนยันการลบสินค้าชิ้นนี้ออกจากคลัง?")) {
            setProducts(prev => prev.filter(p => p.id !== id));
            showToast("ลบสินค้าชิ้นนี้เรียบร้อยค่ะ");
        }
    };

    // --------------------------------------------------------------------------
    // Page View Renderers
    // --------------------------------------------------------------------------

    // 0. LANDING SPLASH VIEW (Arzenshop Style)
    const LandingView = () => {
        return (
            <div className="landing-page">
                {/* Outline animated stars in background */}
                <div className="landing-stars-bg">
                    <i className="fa-regular fa-star landing-star-svg" style={{ top: '15%', left: '10%', fontSize: '3rem' }}></i>
                    <i className="fa-regular fa-star landing-star-svg" style={{ top: '35%', right: '15%', fontSize: '4.5rem' }}></i>
                    <i className="fa-regular fa-star landing-star-svg" style={{ bottom: '20%', left: '20%', fontSize: '2.5rem' }}></i>
                    <i className="fa-regular fa-star landing-star-svg" style={{ bottom: '15%', right: '25%', fontSize: '3.5rem' }}></i>
                    <i className="fa-regular fa-star landing-star-svg" style={{ top: '70%', left: '8%', fontSize: '3.8rem' }}></i>
                    <i className="fa-regular fa-star landing-star-svg" style={{ top: '50%', left: '75%', fontSize: '2.2rem' }}></i>
                </div>

                <div className="landing-container">
                    <div className="landing-avatar-container">
                        <img src="/Logo X24.png" alt="PB SERVICES Logo" style={{ width: "140px", height: "140px", objectFit: "contain" }} />
                    </div>
                    <h1 className="landing-title">PB SERVICES</h1>
                    <p className="landing-subtitle">ร้านค้าดิจิทัล บัตรเติมเงิน คีย์แท้ และบริการต่างๆ ราคาประหยัด ปลอดภัย 24 ชม.</p>

                    <div className="landing-buttons">
                        <button className="landing-btn" onClick={() => { window.location.hash = "#/home"; }}>
                            <i className="fa-solid fa-bag-shopping"></i>
                            <span>ร้านค้า</span>
                        </button>
                        <button className="landing-btn" onClick={() => setAuthModal('login')}>
                            <i className="fa-solid fa-right-to-bracket"></i>
                            <span>เข้าสู่ระบบ</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // 1. HOME VIEW
    const HomeView = () => {
        const featured = products.filter(p => p.status !== 'inactive' && (p.tag === 'hot' || p.tag === 'popular')).slice(0, 4);

        return (
            <>
                <section className="hero-section">
                    <div className="hero-content">
                        <div className="hero-tagline"><i className="fa-solid fa-bolt"></i> บริการรวดเร็วทันใจ 24 ชั่วโมง</div>
                        <h1>ยินดีต้อนรับสู่ <span>PB SERVICES</span></h1>
                        <p>แหล่งรวมสินค้า จบครบที่เดียว แอดมินพร้อมตอบ 24 ชั่วโมง ดูแลตลอดชีพ ให้ PB SERVICES ได้ดูแลลูกค้าทุกคน</p>
                        <div class="hero-cta">
                            <a href="#/products" className="btn btn-primary btn-lg"><i className="fa-solid fa-basket-shopping"></i> เริ่มช้อปเลย</a>
                            <a href="#/donate" className="btn btn-outline btn-lg"><i className="fa-solid fa-wallet"></i> เติมเงินเข้าระบบ</a>
                        </div>
                    </div>
                    <div className="hero-graphics">
                        <div className="floating-cards-container">
                            <div className="f-card c1">
                                <div className="f-card-header">
                                    <span>DISCORD Promotion</span>
                                    <i className="fa-brands fa-discord f-card-icon" style={{ color: "#5865f2" }}></i>
                                </div>
                                <strong>Nitro Boost (1 ปี)</strong>
                                <div className="f-card-price" style={{ color: "#5865f2" }}>1,290 ฿ <span style={{fontSize: "0.75rem", textDecoration: "line-through", color: "var(--text-light)"}}>1,490 ฿</span></div>
                            </div>
                            <div className="f-card c2">
                                <div className="f-card-header">
                                    <span>FIVEM Promotion</span>
                                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.4rem", height: "1.4rem", fill: "#f40552" }}><path d="M22.4 24h-5.225c-.117 0-.455-1.127-1.026-3.375-1.982-6.909-3.124-10.946-3.417-12.12l3.37-3.325h.099c.454 1.42 2.554 7.676 6.299 18.768ZM12.342 7.084h-.048a3.382 3.385 0 0 1-.098-.492v-.098a102.619 102.715 0 0 1 3.272-3.275c.13.196.196.356.196.491v.05a140.694 140.826 0 0 1-3.322 3.324ZM5.994 10.9h-.05c.67-2.12 1.076-3.209 1.223-3.275L14.492.343c.08 0 .258.524.533 1.562zm1.37-4.014h-.05C8.813 2.342 9.612.048 9.71 0h4.495v.05a664.971 664.971 0 0 1-6.841 6.839Zm-2.69 7.874h-.05c.166-.798.554-1.418 1.174-1.855a312.918 313.213 0 0 1 5.71-5.717h.05c-.117.672-.375 1.175-.781 1.52zM1.598 24l-.098-.05c1.399-4.172 2.148-6.322 2.248-6.45l6.74-6.694v.05C10.232 11.88 8.974 16.263 6.73 24Z"/></svg>
                                </div>
                                <strong>FiveM</strong>
                                <div className="f-card-price" style={{ color: "#f40552" }}>290 ฿ <span style={{fontSize: "0.75rem", textDecoration: "line-through", color: "var(--text-light)"}}>340 ฿</span></div>
                            </div>
                            <div className="f-card c3">
                                <i className="fa-solid fa-shield-halved" style={{ display: "block", fontSize: "1.4rem", marginBottom: "6px" }}></i>
                                <span>รับประกันปลอดภัย 100%</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: "50px" }}>
                    <div className="section-header">
                        <h2>หมวดหมู่สินค้ายอดฮิต</h2>
                        <a href="#/products" className="view-all-link">ดูทั้งหมด <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div className="categories-grid">
                        <div className="category-card" onClick={() => { window.location.hash = "#/products?category=discord"; }}>
                            <i className="fa-brands fa-discord" style={{ color: "#5865f2" }}></i>
                            <h3>DISCORD</h3>
                            <p>ไนโตรบูสต์และกิ๊ฟการ์ดราคาถูก</p>
                        </div>
                        <div className="category-card" onClick={() => { window.location.hash = "#/products?category=fivem"; }}>
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: "#f40552" }}>
                                <title>FiveM</title>
                                <path d="M22.4 24h-5.225c-.117 0-.455-1.127-1.026-3.375-1.982-6.909-3.124-10.946-3.417-12.12l3.37-3.325h.099c.454 1.42 2.554 7.676 6.299 18.768ZM12.342 7.084h-.048a3.382 3.385 0 0 1-.098-.492v-.098a102.619 102.715 0 0 1 3.272-3.275c.13.196.196.356.196.491v.05a140.694 140.826 0 0 1-3.322 3.324ZM5.994 10.9h-.05c.67-2.12 1.076-3.209 1.223-3.275L14.492.343c.08 0 .258.524.533 1.562zm1.37-4.014h-.05C8.813 2.342 9.612.048 9.71 0h4.495v.05a664.971 664.971 0 0 1-6.841 6.839Zm-2.69 7.874h-.05c.166-.798.554-1.418 1.174-1.855a312.918 313.213 0 0 1 5.71-5.717h.05c-.117.672-.375 1.175-.781 1.52zM1.598 24l-.098-.05c1.399-4.172 2.148-6.322 2.248-6.45l6.74-6.694v.05C10.232 11.88 8.974 16.263 6.73 24Z"/>
                            </svg>
                            <h3>FIVEM</h3>
                            <p>เงินในเกม บริการต่างๆ และบัตรของขวัญ</p>
                        </div>
                        <div className="category-card" onClick={() => { window.location.hash = "#/products?category=app-premium"; }}>
                            <i className="fa-solid fa-tv" style={{ color: "#e50914" }}></i>
                            <h3>APP PREMIUM</h3>
                            <p>แอปพลิเคชันสตรีมมิ่งและบัญชีพรีเมียม</p>
                        </div>
                        <div className="category-card" onClick={() => { window.location.hash = "#/products?category=others"; }}>
                            <i className="fa-solid fa-boxes-stacked" style={{ color: "#2a475e" }}></i>
                            <h3>และสินค้าอื่นๆ</h3>
                            <p>คีย์เกม บัตรเติมเงิน และบริการอื่นๆ</p>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: "50px" }}>
                    <div className="section-header">
                        <h2>สินค้าแนะนำยอดนิยม</h2>
                        <a href="#/products" className="view-all-link">ดูสินค้าทั้งหมด <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div className="products-grid">
                        {featured.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: "30px" }}>
                    <div className="section-header">
                        <h2>สถิติความเชื่อมั่น</h2>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon"><i className="fa-solid fa-users"></i></div>
                            <div className="stat-info">
                                <h3>{users.length + 342} +</h3>
                                <p>ผู้ใช้ออนไลน์ลงทะเบียน</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ color: "var(--secondary)", backgroundColor: "rgba(49, 151, 149, 0.1)" }}><i className="fa-solid fa-cart-flatbed-suitcases"></i></div>
                            <div className="stat-info">
                                <h3>{orders.length + 1583} +</h3>
                                <p>คำสั่งซื้อที่ทำรายการสำเร็จ</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ color: "var(--success)", backgroundColor: "var(--success-light)" }}><i className="fa-solid fa-shield-halved"></i></div>
                            <div className="stat-info">
                                <h3>100%</h3>
                                <p>ระบบเสถียร ปลอดภัย เชื่อถือได้</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    };

    // Product Card Sub-Component
    const ProductCard = ({ product }) => {
        const stock = getProductStock(product);
        const openProductDetail = () => setActiveDetailProduct(product);
        const [btnHover, setBtnHover] = useState(false);
        const originalPrice = product.originalPrice || Math.round(product.price / 0.7);

        return (
            <div
                className="product-card"
                role="button"
                tabIndex="0"
                onClick={openProductDetail}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openProductDetail();
                    }
                }}
            >
                {product.tag && (
                    <span className={`product-tag ${product.tag === 'hot' ? 'tag-hot' : product.tag === 'new' ? 'tag-new' : ''}`}>
                        {product.tag.toUpperCase()}
                    </span>
                )}
                <div className="product-thumb">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                    ) : (
                        <ProductSVG type={product.svgType} />
                    )}
                </div>
                <div className="product-body">
                    <span className="product-category">
                        {product.category === 'discord' ? 'DISCORD' :
                            product.category === 'fivem' ? 'FIVEM' :
                                product.category === 'app-premium' ? 'APP PREMIUM' :
                                    product.category === 'others' ? 'สินค้าอื่นๆ' :
                                        (product.category ? product.category.toUpperCase() : '')}
                    </span>
                    <h3 className="product-title" style={{ height: "auto", minHeight: "22px", marginBottom: "4px" }}>{product.name}</h3>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "8px 0 12px 0" }}>
                        <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "#ef4444" }}>{product.price}฿</span>
                        <span style={{ fontSize: "0.85rem", textDecoration: "line-through", color: "var(--text-muted)" }}>{originalPrice} ฿</span>
                        <span style={{ fontSize: "0.72rem", backgroundColor: "#ef4444", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>-30%</span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                        }}
                        disabled={stock <= 0}
                        style={{
                            backgroundColor: btnHover ? "rgba(6, 182, 212, 0.2)" : "rgba(6, 182, 212, 0.1)",
                            color: "var(--primary)",
                            border: "none",
                            width: "100%",
                            padding: "10px",
                            borderRadius: "8px",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            cursor: stock <= 0 ? "not-allowed" : "pointer",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={() => setBtnHover(true)}
                        onMouseLeave={() => setBtnHover(false)}
                    >
                        <span>สั่งซื้อ</span>
                        <i className="fa-solid fa-cart-plus"></i>
                    </button>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "12px", borderTop: "1px dashed var(--border)", paddingTop: "8px" }}>
                        <i className="fa-solid fa-box" style={{ fontSize: "0.85rem" }}></i>
                        <span>คงเหลือ {stock} ชิ้น</span>
                    </div>
                </div>
            </div>
        );
    };

    // 2. PRODUCTS LIST VIEW
    const ProductsView = () => {
        let list = products.filter(p => p.status !== 'inactive');
        if (productsCategory !== 'all') {
            list = list.filter(p => p.category === productsCategory);
        }

        if (searchQuery) {
            list = list.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sorting logic
        if (productsSort === 'low-high') {
            list.sort((a, b) => a.price - b.price);
        } else if (productsSort === 'high-low') {
            list.sort((a, b) => b.price - a.price);
        }

        return (
            <>
                <div style={{ marginBottom: "24px" }}>
                    <ul style={{ display: "flex", gap: "10px", listStyle: "none", fontSize: "0.9rem", color: "var(--text-muted)", padding: 0 }}>
                        <li><a href="#/">หน้าแรก</a></li>
                        <li>/</li>
                        <li style={{ color: "var(--text-main)", fontWeight: 500 }}>สินค้าทั้งหมด</li>
                    </ul>
                </div>

                <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                    <div className="search-box" style={{ display: "flex", maxWidth: "none", flexGrow: 1, backgroundColor: "var(--surface)" }}>
                        <input
                            type="text"
                            placeholder="พิมพ์ชื่อสินค้า คีย์เวิร์ด เพื่อค้นหา..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>

                <div className="products-layout">
                    <div className="filter-sidebar">
                        <div className="filter-group">
                            <h3>ประเภทสินค้า</h3>
                            <div className="filter-list">
                                <div className={`filter-item ${productsCategory === 'all' ? 'active' : ''}`} onClick={() => { window.location.hash = "#/products?category=all"; }}>
                                    <i className="fa-solid fa-border-all"></i> ทั้งหมด ({products.length})
                                </div>
                                <div className={`filter-item ${productsCategory === 'discord' ? 'active' : ''}`} onClick={() => { window.location.hash = "#/products?category=discord"; }}>
                                    <i className="fa-brands fa-discord"></i> DISCORD ({products.filter(p => p.category === 'discord').length})
                                </div>
                                <div className={`filter-item ${productsCategory === 'fivem' ? 'active' : ''}`} onClick={() => { window.location.hash = "#/products?category=fivem"; }}>
                                    <i className="fa-solid fa-car"></i> FIVEM ({products.filter(p => p.category === 'fivem').length})
                                </div>
                                <div className={`filter-item ${productsCategory === 'app-premium' ? 'active' : ''}`} onClick={() => { window.location.hash = "#/products?category=app-premium"; }}>
                                    <i className="fa-solid fa-tv"></i> APP PREMIUM ({products.filter(p => p.category === 'app-premium').length})
                                </div>
                                <div className={`filter-item ${productsCategory === 'others' ? 'active' : ''}`} onClick={() => { window.location.hash = "#/products?category=others"; }}>
                                    <i className="fa-solid fa-boxes-stacked"></i> สินค้าอื่นๆ ({products.filter(p => p.category === 'others').length})
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="products-content">
                        <div className="products-bar">
                            <span className="products-count">พบสินค้าทั้งหมด <strong>{list.length}</strong> รายการ</span>
                            <div className="products-sorting">
                                <label htmlFor="product-sort">เรียงลำดับ:</label>
                                <select id="product-sort" value={productsSort} onChange={(e) => setProductsSort(e.target.value)}>
                                    <option value="default">ค่าเริ่มต้น</option>
                                    <option value="low-high">ราคา: ต่ำ - สูง</option>
                                    <option value="high-low">ราคา: สูง - ต่ำ</option>
                                </select>
                            </div>
                        </div>

                        {list.length === 0 ? (
                            <div className="empty-results">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <h3>ไม่พบสินค้าที่ตรงกับคำค้นหา</h3>
                                <p>ลองเปลี่ยนคีย์เวิร์ด หรือล้างฟิลเตอร์ดูนะคะ</p>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {list.map(p => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    };

    // 3. PURCHASE HISTORY VIEW
    const HistoryView = () => {
        if (!currentUser) {
            return (
                <div className="history-layout" style={{ textAlign: "center", padding: "60px 20px" }}>
                    <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: "3.5rem", color: "var(--text-light)", marginBottom: "16px" }}></i>
                    <h2>ประวัติการสั่งซื้อของคุณ</h2>
                    <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>กรุณาเข้าสู่ระบบก่อนเพื่อตรวจสอบประวัติคำสั่งซื้อรายการบัตรเติมเกม/ของรางวัลต่างๆ</p>
                    <button className="btn btn-primary" onClick={() => setAuthModal('login')}>เข้าสู่ระบบ / สมัครสมาชิก</button>
                </div>
            );
        }

        const userOrders = orders.filter(o => o.username === currentUser.username);
        const [visibleCodes, setVisibleCodes] = useState({});

        return (
            <div className="history-layout">
                <div className="history-header">
                    <h2><i className="fa-solid fa-receipt" style={{ color: "var(--primary)" }}></i> ประวัติการสั่งซื้อสินค้า</h2>
                    <p>ตรวจสอบและยืนยันข้อมูลรายการสั่งซื้อ/ประวัติบิลชำระเงินของบัญชีคุณ</p>
                </div>

                {userOrders.length === 0 ? (
                    <div className="no-history-state">
                        <i className="fa-solid fa-receipt"></i>
                        <h3>ยังไม่มีประวัติการซื้อสินค้า</h3>
                        <p>คุณยังไม่ได้เลือกสั่งซื้อรายการสินค้าใดๆ บนร้านค้าเลย</p>
                        <a href="#/products" className="btn btn-primary btn-sm" style={{ marginTop: "16px" }}>ไปเลือกช้อปสินค้ากันเลย</a>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="invoice-table">
                            <thead>
                                <tr>
                                    <th>เลขใบเสร็จ</th>
                                    <th>รายการสินค้า</th>
                                    <th>ยอดชำระ</th>
                                    <th>วันที่สั่งซื้อ</th>
                                    <th>สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map(ord => (
                                    <tr key={ord.orderId}>
                                        <td className="invoice-id">{ord.orderId}</td>
                                        <td className="invoice-items">
                                            {ord.items.map((it, idx) => {
                                                const hasCodes = it.deliveredItems && it.deliveredItems.length > 0;
                                                const toggleKey = `${ord.orderId}-${idx}`;
                                                const isVisible = !!visibleCodes[toggleKey];

                                                return (
                                                    <div key={idx} style={{ marginBottom: "8px" }}>
                                                        <div style={{ fontWeight: "500", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                                            <span>{it.name} ({it.qty} ชิ้น)</span>
                                                            {hasCodes && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setVisibleCodes(prev => ({ ...prev, [toggleKey]: !prev[toggleKey] }))}
                                                                    style={{
                                                                        background: "none",
                                                                        border: "none",
                                                                        color: "var(--primary)",
                                                                        fontSize: "0.75rem",
                                                                        cursor: "pointer",
                                                                        padding: "2px 6px",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: "rgba(6, 182, 212, 0.1)",
                                                                        display: "inline-flex",
                                                                        alignItems: "center",
                                                                        gap: "4px"
                                                                    }}
                                                                >
                                                                    <i className={`fa-solid ${isVisible ? 'fa-eye-slash' : 'fa-key'}`}></i>
                                                                    {isVisible ? 'ซ่อนรหัส' : 'ดูรหัสสินค้า'}
                                                                </button>
                                                            )}
                                                        </div>

                                                        {hasCodes && isVisible && (
                                                            <div style={{ marginTop: "6px" }}>
                                                                <div style={{ color: "var(--primary)", fontWeight: "600", fontSize: "0.74rem", marginBottom: "4px", paddingLeft: "2px" }}>ข้อมูลจัดส่งสินค้า:</div>
                                                                {it.deliveredItems.map((code, cidx) => {
                                                                    const isUrl = code.startsWith('http://') || code.startsWith('https://');
                                                                    const parts = !isUrl ? code.split(':') : [];

                                                                    if (parts.length >= 2) {
                                                                        return (
                                                                            <div key={cidx} style={{ padding: "10px 12px", backgroundColor: "rgba(0,0,0,0.25)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.82rem", marginBottom: cidx < it.deliveredItems.length - 1 ? "8px" : 0 }}>
                                                                                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                                        <span style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>1. อีเมลสินค้า:</span>
                                                                                        <strong style={{ fontFamily: "monospace", color: "var(--text-main)", userSelect: "all", cursor: "pointer" }} title="คลิกเพื่อคัดลอก">{parts[0]}</strong>
                                                                                    </div>
                                                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                                        <span style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>2. รหัสผ่านสินค้า:</span>
                                                                                        <strong style={{ fontFamily: "monospace", color: "var(--secondary)", userSelect: "all", cursor: "pointer" }} title="คลิกเพื่อคัดลอก">{parts.slice(1).join(':')}</strong>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <div key={cidx} style={{ padding: "10px 12px", backgroundColor: "rgba(0,0,0,0.25)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.82rem", marginBottom: cidx < it.deliveredItems.length - 1 ? "8px" : 0 }}>
                                                                                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                                        <span style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>{isUrl ? "1. ลิงก์รับสินค้า:" : "1. อีเมลสินค้า (หรือคีย์):"}</span>
                                                                                        <strong style={{ fontFamily: "monospace", color: "var(--text-main)", userSelect: "all", cursor: "pointer", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={code}>{code}</strong>
                                                                                    </div>
                                                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                                        <span style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>2. รหัสผ่านของสินค้า:</span>
                                                                                        <strong style={{ fontFamily: "monospace", color: "var(--text-light)" }}>-</strong>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </td>
                                        <td>{ord.totalPrice.toFixed(2)} ฿</td>
                                        <td>{new Date(ord.date).toLocaleString('th-TH')}</td>
                                        <td>
                                            <span className="status-badge completed"><i className="fa-solid fa-circle-check"></i> สำเร็จ</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    };

    // 4. DONATE & TOPUP VIEW
    const DonateView = () => {
        if (!currentUser) {
            return (
                <div className="donate-card" style={{ textAlign: "center", padding: "60px 20px" }}>
                    <i className="fa-solid fa-wallet" style={{ fontSize: "3.5rem", color: "var(--text-light)", marginBottom: "16px" }}></i>
                    <h2>โดเนท / เติมเงินเข้าระบบ</h2>
                    <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>กรุณาเข้าสู่ระบบก่อนเริ่มทำรายการเติมเงินเข้าระบบ</p>
                    <button className="btn btn-primary" onClick={() => setAuthModal('login')}>เข้าสู่ระบบ / สมัครสมาชิก</button>
                </div>
            );
        }

        return (
            <div className="donate-layout">
                <div className="donate-card">
                    <h2>โดเนทสนับสนุน & เติมเครดิต</h2>
                    <p>ระบบเติมเงินจำลอง รองรับช่องทาง PromptPay QR code, ทรูมันนี่วอลเล็ท และบัตรเงินสด</p>

                    <div className="payment-tabs">
                        <button className={`payment-tab-btn ${donateChannel === 'promptpay' ? 'active' : ''}`} onClick={() => setDonateChannel('promptpay')}>
                            <i class="fa-solid fa-qrcode"></i>
                            <span>PromptPay QR</span>
                        </button>
                        <button className={`payment-tab-btn ${donateChannel === 'truewallet' ? 'active' : ''}`} onClick={() => setDonateChannel('truewallet')}>
                            <i class="fa-solid fa-mobile-screen-button"></i>
                            <span>TrueMoney Wallet</span>
                        </button>
                        <button className={`payment-tab-btn ${donateChannel === 'cashcard' ? 'active' : ''}`} onClick={() => setDonateChannel('cashcard')}>
                            <i class="fa-solid fa-credit-card"></i>
                            <span>บัตรเงินสดทรูมันนี่</span>
                        </button>
                    </div>

                    {donateChannel !== 'cashcard' && (
                        <div className="form-group">
                            <label>เลือกจำนวนเงินโดเนท (บาท)</label>
                            <div className="amount-preset-grid">
                                {[50, 100, 300, 500, 1000].map(amt => (
                                    <div
                                        key={amt}
                                        className={`amount-chip ${selectedDonateAmount === amt ? 'active' : ''}`}
                                        onClick={() => setSelectedDonateAmount(amt)}
                                    >
                                        {amt} ฿
                                    </div>
                                ))}
                            </div>
                            <input
                                type="number"
                                placeholder="ระบุจำนวนเงินอื่นๆ..."
                                min="20"
                                value={selectedDonateAmount}
                                onChange={(e) => setSelectedDonateAmount(parseInt(e.target.value) || 0)}
                            />
                        </div>
                    )}

                    <form className="payment-instruction-panel" onSubmit={handleDonateSubmit}>
                        {donateChannel === 'promptpay' && (
                            <div className="qr-code-display-frame">
                                <div className="qr-image-wrapper" style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    backgroundColor: "transparent"
                                }}>
                                    <img
                                        src="/promptpay-qr.png"
                                        alt="PromptPay QR Code"
                                        style={{
                                            maxWidth: "240px",
                                            width: "100%",
                                            borderRadius: "16px",
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                                        }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const fallback = e.target.parentElement.querySelector('.qr-fallback');
                                            if (fallback) fallback.style.display = 'block';
                                        }}
                                    />
                                    <div className="qr-fallback" style={{ display: 'none', textAlign: 'center', padding: '20px', border: '1px dashed var(--border)', borderRadius: '12px' }}>
                                        <i className="fa-solid fa-qrcode" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '10px' }}></i>
                                        <p style={{ margin: 0, fontSize: '0.85rem' }}>รูปภาพ QR Code พร้อมเพย์จริง</p>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>กรุณาสตาร์ท backend เพื่อดึงรูปภาพ</span>
                                    </div>
                                </div>
                                <div className="payment-details-box">
                                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>สแกนจ่ายผ่านแอปธนาคารใดก็ได้ฟรีค่าธรรมเนียม</p>
                                    <div className="pay-amount">{(selectedDonateAmount || 0).toFixed(2)} ฿</div>
                                    <div className="countdown-timer">
                                        <i className="fa-solid fa-clock"></i> สแกนจ่ายภายใน {formatTime(timeLeft)} นาที
                                    </div>
                                </div>
                                <div className="slip-upload-container" style={{
                                    width: "100%",
                                    marginTop: "16px",
                                    marginBottom: "16px",
                                    textAlign: "center"
                                }}>
                                    <label
                                        htmlFor="slip-file-input"
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                            fontWeight: "600",
                                            fontSize: "0.95rem",
                                            color: "var(--text-light)",
                                            cursor: "pointer"
                                        }}
                                    >
                                        อัปโหลดภาพสลิปเพื่อตรวจสอบยอดโอนจริง
                                    </label>

                                    <input
                                        type="file"
                                        id="slip-file-input"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (slipPreviewUrl) {
                                                    URL.revokeObjectURL(slipPreviewUrl);
                                                }
                                                setSlipFile(file);
                                                setSlipPreviewUrl(URL.createObjectURL(file));
                                            }
                                            e.target.value = '';
                                        }}
                                    />

                                    <label
                                        htmlFor="slip-file-input"
                                        className="slip-dropzone"
                                        style={{
                                            border: "2px dashed rgba(251, 192, 45, 0.4)",
                                            borderRadius: "12px",
                                            padding: "20px",
                                            backgroundColor: "rgba(251, 192, 45, 0.03)",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            position: "relative",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            minHeight: "120px",
                                            width: "100%",
                                            boxSizing: "border-box"
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onDragEnter={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const file = e.dataTransfer.files[0];
                                            if (file && file.type.startsWith('image/')) {
                                                if (slipPreviewUrl) URL.revokeObjectURL(slipPreviewUrl);
                                                setSlipFile(file);
                                                setSlipPreviewUrl(URL.createObjectURL(file));
                                            }
                                        }}
                                    >

                                        {slipPreviewUrl ? (
                                            <div
                                                style={{
                                                    position: "relative",
                                                    width: "100%",
                                                    textAlign: "center"
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <img
                                                    src={slipPreviewUrl}
                                                    alt="Slip Preview"
                                                    style={{
                                                        display: "block",
                                                        width: "100%",
                                                        maxWidth: "280px",
                                                        maxHeight: "200px",
                                                        margin: "0 auto 8px auto",
                                                        borderRadius: "10px",
                                                        objectFit: "contain",
                                                        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                                                        border: "1px solid rgba(251,192,45,0.3)"
                                                    }}
                                                />
                                                <div style={{
                                                    fontSize: "0.8rem",
                                                    color: "var(--text-muted)",
                                                    wordBreak: "break-all",
                                                    marginBottom: "4px"
                                                }}>
                                                    {slipFile?.name} ({(slipFile ? (slipFile.size / 1024).toFixed(1) : 0)} KB)
                                                </div>
                                                <button
                                                    type="button"
                                                    style={{
                                                        marginTop: "6px",
                                                        padding: "4px 12px",
                                                        borderRadius: "20px",
                                                        backgroundColor: "var(--danger)",
                                                        color: "white",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        fontSize: "0.75rem",
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSlipFile(null);
                                                        setSlipPreviewUrl('');
                                                        document.getElementById('slip-file-input').value = '';
                                                    }}
                                                >
                                                    <i className="fa-solid fa-xmark" style={{ marginRight: "4px" }}></i>ลบรูป
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-cloud-arrow-up" style={{
                                                    fontSize: "2rem",
                                                    color: "var(--primary)",
                                                    marginBottom: "10px"
                                                }}></i>
                                                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                                    คลิกเพื่อเลือกไฟล์ หรือลากสลิปมาวางที่นี่
                                                </p>
                                                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>
                                                    รองรับเฉพาะไฟล์รูปภาพ (PNG, JPG, JPEG)
                                                </span>
                                            </>
                                        )}
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-success btn-block btn-lg" disabled={isVerifying}>
                                    {isVerifying ? (
                                        <>
                                            <i className="fa-solid fa-spinner fa-spin"></i> กำลังตรวจสอบสลิป...
                                        </>
                                    ) : slipFile ? (
                                        <>
                                            <i className="fa-solid fa-square-check"></i> ตรวจสอบยอดเงิน (ระบบสลิปจริง)
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-square-check"></i> ตรวจสอบยอดเงิน (จำลองการโอน)
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {donateChannel === 'truewallet' && (
                            <div style={{ maxWidth: "400px", margin: "0 auto", padding: "10px 0" }}>
                                <h3 style={{ marginBottom: "12px", fontSize: "1.1rem" }}><i className="fa-solid fa-mobile-screen-button"></i> โอนผ่านบัญชี TrueMoney Wallet</h3>
                                <div className="form-group">
                                    <label>เบอร์โทรศัพท์ทรูวอลเล็ทของท่าน</label>
                                    <input type="text" id="wallet-phone" placeholder="08x-xxx-xxxx" maxLength="10" required />
                                </div>
                                <div className="form-group">
                                    <label>จำนวนเงินโอน</label>
                                    <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--primary)", margin: "6px 0" }}>{(selectedDonateAmount || 0).toFixed(2)} ฿</div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    <i className="fa-solid fa-paper-plane"></i> ยืนยันทำรายการ & เติมเงิน
                                </button>
                            </div>
                        )}

                        {donateChannel === 'cashcard' && (
                            <div style={{ maxWidth: "400px", margin: "0 auto", padding: "10px 0" }}>
                                <h3 style={{ marginBottom: "12px", fontSize: "1.1rem" }}><i className="fa-solid fa-credit-card"></i> เติมเงินด้วยบัตรเงินสด ทรูมันนี่</h3>
                                <div className="form-group">
                                    <label>รหัสบัตรเงินสด 14 หลัก</label>
                                    <input
                                        type="text"
                                        id="cashcard-pin"
                                        placeholder="กรอกรหัสพิน 14 หลัก..."
                                        maxLength="14"
                                        required
                                        onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
                                    />
                                </div>
                                <div className="info-widget" style={{ padding: "12px", backgroundColor: "var(--warning-light)", borderColor: "rgba(221, 107, 32, 0.2)", marginBottom: "16px" }}>
                                    <p style={{ fontSize: "0.8rem", color: "var(--warning)", margin: 0 }}><i className="fa-solid fa-circle-exclamation"></i> การเติมเงินด้วยบัตรเงินสดจะมีระบบหักค่าบริการ 15% (จำลอง)</p>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    <i className="fa-solid fa-wallet"></i> เติมเงินทันที
                                </button>
                            </div>
                        )}
                    </form>
                </div>

                <div className="donate-sidebar">
                    <div className="info-widget">
                        <h3><i className="fa-solid fa-info-circle"></i> คำอธิบายการเติมเงิน</h3>
                        <ul>
                            <li><i className="fa-solid fa-circle-check"></i> ระบบเติมเงินนี้เป็น <strong>ระบบจำลองเพื่อการทดสอบ</strong></li>
                            <li><i className="fa-solid fa-circle-check"></i> หลังกดปุ่มเติมเงิน ยอดจะแอดเข้าบัญชีใน LocalStorage ทันที</li>
                            <li><i className="fa-solid fa-circle-check"></i> อัตราแลกเปลี่ยน 1 บาท = 1 เครดิตในร้านค้า</li>
                            <li><i className="fa-solid fa-circle-check"></i> ไม่มีการเก็บค่าธรรมเนียมจริงใดๆ ทั้งสิ้น</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    // 5. CONTACT VIEW
    const ContactView = () => {
        const handleContactSubmit = (e) => {
            e.preventDefault();
            showToast("ส่งแบบฟอร์มสำเร็จแล้วค่ะ เจ้าหน้าที่จะรีบตอบกลับทางอีเมล");
            e.target.reset();
        };

        return (
            <div className="contact-layout">
                <div className="contact-info-cards">
                    <h2>ข้อมูลติดต่อเรา</h2>
                    <p style={{ color: "var(--text-muted)", marginBottom: "10px" }}>สามารถติดต่อแอดมินหรือร่วมชุมชนเกณฑ์ของเราเพื่อการสนับสนุนที่ดีที่สุด</p>

                    <div className="contact-card-box">
                        <div className="contact-card-icon" style={{ color: "#5865f2", backgroundColor: "rgba(88, 101, 242, 0.1)" }}><i className="fa-brands fa-discord"></i></div>
                        <div className="contact-card-details">
                            <h3>เข้าร่วมกลุ่ม Discord</h3>
                            <p>ร่วมพูดคุย สอบถามข้อมูลในชุมชนของเราตลอด 24 ชม.</p>
                            <a href="https://discord.gg/gzhSpMBgr" className="btn btn-outline btn-sm">Join Server</a>
                        </div>
                    </div>

                    <div className="contact-card-box">
                        <div className="contact-card-icon" style={{ color: "#e53e3e", backgroundColor: "var(--danger-light)" }}><i className="fa-solid fa-comments"></i></div>
                        <div className="contact-card-details">
                            <h3>แชทติดต่อแอดมินหลังบ้าน</h3>
                            <p>แชทสดโดยตรง พิมพ์คุยรับข่าวสารตอบกลับทันที</p>
                            <button className="btn btn-primary btn-sm" onClick={() => setChatOpen(true)}>คุยกับแอดมินสด</button>
                        </div>
                    </div>
                </div>

                <div className="contact-form-panel">
                    <h2>ส่งข้อความคำถาม / ข้อเสนอแนะ</h2>
                    <p>กรอกแบบฟอร์มด้านล่างเพื่อแจ้งปัญหาทั่วไป ทีมงานจะตอบกลับผ่านอีเมลของคุณภายใน 24 ชม.</p>

                    <form onSubmit={handleContactSubmit}>
                        <div className="form-group">
                            <label htmlFor="contact-name">ชื่อของคุณ</label>
                            <input type="text" id="contact-name" placeholder="กรอกชื่อของคุณ..." required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-email">ที่อยู่อีเมล</label>
                            <input type="email" id="contact-email" placeholder="example@email.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-subject">เรื่องที่ติดต่อ</label>
                            <input type="text" id="contact-subject" placeholder="ระบุหัวข้อคำถาม..." required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-msg">รายละเอียดข้อความ</label>
                            <textarea id="contact-msg" rows="4" placeholder="กรอกรายละเอียดปัญหา หรือข้อร้องเรียน..." required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">ส่งข้อความติดต่อ</button>
                    </form>
                </div>
            </div>
        );
    };

    // 6. PROFILE VIEW
    const ProfileView = () => {
        if (!currentUser) return null;

        const handlePassChange = (e) => {
            e.preventDefault();
            const oldPass = document.getElementById("old-pass")?.value;
            const newPass = document.getElementById("new-pass")?.value;

            if (currentUser.password === oldPass) {
                if (newPass.length < 6) {
                    showToast("รหัสผ่านใหม่ต้องมี 6 ตัวขึ้นไป", "warning");
                    return;
                }

                setUsers(prev => prev.map(u => u.username === currentUser.username ? { ...u, password: newPass } : u));
                setCurrentUser(prev => ({ ...prev, password: newPass }));
                showToast("เปลี่ยนรหัสผ่านสำเร็จ!");
                e.target.reset();
            } else {
                showToast("รหัสผ่านเดิมไม่ถูกต้อง", "error");
            }
        };

        return (
            <div className="profile-layout">
                <div className="profile-sidebar">
                    <div className="profile-sidebar-avatar">
                        {currentUser.username[0].toUpperCase()}
                    </div>
                    <h2>{currentUser.username}</h2>
                    <div className={`profile-role-tag ${currentUser.role === 'admin' ? 'admin-role' : ''}`}>
                        {currentUser.role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : 'สมาชิก (Member)'}
                    </div>

                    <div className="profile-nav-menu">
                        <a href="#/profile" className="profile-nav-item active"><i className="fa-solid fa-circle-user"></i> บัญชีทั่วไป</a>
                        <a href="#/history" className="profile-nav-item"><i className="fa-solid fa-clock-rotate-left"></i> ประวัติการซื้อ</a>
                        <a href="#/donate" className="profile-nav-item"><i className="fa-solid fa-money-bill-transfer"></i> เติมเงินสะสม</a>
                        <a href="#" className="profile-nav-item logout" onClick={(e) => { e.preventDefault(); logout(); }}><i className="fa-solid fa-right-from-bracket"></i> ออกจากระบบ</a>
                    </div>
                </div>

                <div className="profile-content">
                    <h2>ข้อมูลผู้ใช้งานทั่วไป</h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "24px" }}>รายละเอียดความเคลื่อนไหวและกระเป๋าเงินจำลองของคุณ</p>

                    <div className="profile-details-grid">
                        <div className="detail-item-box">
                            <label>รหัสผ่านผู้ใช้งาน</label>
                            <p style={{ color: "var(--primary)" }}>{currentUser.password}</p>
                        </div>
                        <div className="detail-item-box">
                            <label>ชื่อผู้ใช้งาน</label>
                            <p>{currentUser.username}</p>
                        </div>
                        <div className="detail-item-box">
                            <label>อีเมลติดต่อ</label>
                            <p>{currentUser.email}</p>
                        </div>
                        <div className="detail-item-box">
                            <label>ประเภทบัญชี</label>
                            <p>{currentUser.role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : 'สมาชิกทั่วไป (Member)'}</p>
                        </div>
                        <div className="detail-item-box" style={{ backgroundColor: "var(--primary-light)" }}>
                            <label style={{ color: "var(--primary)" }}>ยอดเงินในระบบ</label>
                            <p style={{ color: "var(--primary)", fontSize: "1.4rem" }}>{currentUser.balance.toFixed(2)} ฿</p>
                        </div>
                        <div className="detail-item-box">
                            <label>วันที่สมัครสมาชิก</label>
                            <p>{new Date(currentUser.registeredAt || Date.now()).toLocaleDateString('th-TH')}</p>
                        </div>
                    </div>

                    <div style={{ marginTop: "30px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
                        <h3>เปลี่ยนรหัสผ่านใหม่</h3>
                        <form onSubmit={handlePassChange} style={{ marginTop: "16px", maxWidth: "400px" }}>
                            <div className="form-group">
                                <label htmlFor="old-pass">รหัสผ่านปัจจุบัน</label>
                                <input type="password" id="old-pass" required placeholder="รหัสผ่านปัจจุบัน..." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="new-pass">รหัสผ่านใหม่</label>
                                <input type="password" id="new-pass" required placeholder="รหัสผ่านใหม่อย่างน้อย 6 ตัวอักษร..." />
                            </div>
                            <button type="submit" className="btn btn-primary">ยืนยันเปลี่ยนรหัสผ่าน</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    // 7. ADMIN PANEL DASHBOARD VIEW
    const AdminView = () => {
        const totalSales = orders.filter(o => !o.orderId.startsWith("TOPUP")).reduce((sum, o) => sum + o.totalPrice, 0);
        const totalOrdersCount = orders.filter(o => !o.orderId.startsWith("TOPUP")).length;
        const totalUsersCount = users.filter(u => u.role !== 'admin').length;

        // Chat threads
        const threads = Object.keys(chats).sort((a, b) => {
            const aThread = chats[a] || [];
            const bThread = chats[b] || [];
            return (bThread[bThread.length - 1]?.timestamp || 0) - (aThread[aThread.length - 1]?.timestamp || 0);
        });
        const unreadThreads = threads.filter(t => localStorage.getItem("x24_unread_admin_" + t) === "1");
        const unreadCount = unreadThreads.length;

        if (!currentUser || currentUser.role !== 'admin') {
            return (
                <div className="admin-auth-panel">
                    <div className="admin-auth-icon"><i className="fa-solid fa-user-shield"></i></div>
                    <h2>เข้าสู่ระบบหลังบ้าน</h2>
                    <p>เมนูนี้สำหรับผู้ดูแลระบบเท่านั้น กรุณาเข้าสู่ระบบด้วยบัญชีแอดมินเพื่อจัดการสินค้าและตอบแชทลูกค้า</p>
                    <div className="admin-demo-credentials">
                        <div><span>ชื่อแอดมิน</span><strong>admin</strong></div>
                        <div><span>รหัสผ่าน</span><strong>admin123</strong></div>
                    </div>
                    <button className="btn btn-primary" onClick={() => setAuthModal('login')}>
                        <i className="fa-solid fa-right-to-bracket"></i> ล็อกอินแอดมิน
                    </button>
                </div>
            );
        }

        return (
            <div className="admin-layout">
                <div className="admin-sidebar">
                    <div className="admin-menu-header">ตัวเลือกจัดการ</div>
                    <div className={`admin-menu-item ${activeAdminTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveAdminTab('dashboard')}>
                        <span><i className="fa-solid fa-chart-line"></i> ภาพรวมระบบ</span>
                    </div>
                    <div className={`admin-menu-item ${activeAdminTab === 'products' ? 'active' : ''}`} onClick={() => setActiveAdminTab('products')}>
                        <span><i className="fa-solid fa-boxes-stacked"></i> คลังสินค้า</span>
                        <span className="admin-badge" style={{ backgroundColor: "var(--primary)", color: "#090d16" }}>{products.length}</span>
                    </div>
                    <div className={`admin-menu-item ${activeAdminTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveAdminTab('orders')}>
                        <span><i className="fa-solid fa-receipt"></i> บิลคำสั่งซื้อ</span>
                        <span className="admin-badge" style={{ backgroundColor: "var(--secondary)", color: "#090d16" }}>{orders.length}</span>
                    </div>
                    <div className={`admin-menu-item ${activeAdminTab === 'chats' ? 'active' : ''}`} onClick={() => setActiveAdminTab('chats')}>
                        <span><i className="fa-solid fa-comments"></i> โต๊ะสนทนาแชท</span>
                        {unreadCount > 0 && <span className="admin-badge">{unreadCount}</span>}
                    </div>
                    <div className="dropdown-divider"></div>
                    <a href="#/" className="admin-menu-item" style={{ color: "var(--text-muted)" }}>
                        <span><i className="fa-solid fa-store"></i> กลับหน้าร้านค้า</span>
                    </a>
                </div>

                <div className="admin-content">
                    {activeAdminTab === 'dashboard' && (
                        <>
                            <h2 style={{ marginBottom: "20px" }}>แดชบอร์ดสรุปผลภาพรวม</h2>
                            <div className="admin-stats-row">
                                <div className="admin-stat-card">
                                    <div>
                                        <span className="admin-stat-label">ยอดขายทั้งหมด</span>
                                        <div className="admin-stat-num">{totalSales.toFixed(2)} ฿</div>
                                    </div>
                                    <div className="admin-stat-icon"><i className="fa-solid fa-sack-dollar"></i></div>
                                </div>
                                <div className="admin-stat-card">
                                    <div>
                                        <span className="admin-stat-label">รายการซื้อสำเร็จ</span>
                                        <div className="admin-stat-num">{totalOrdersCount} บิล</div>
                                    </div>
                                    <div className="admin-stat-icon"><i className="fa-solid fa-box"></i></div>
                                </div>
                                <div className="admin-stat-card">
                                    <div>
                                        <span className="admin-stat-label">สมาชิกที่สมัคร</span>
                                        <div className="admin-stat-num">{totalUsersCount} คน</div>
                                    </div>
                                    <div className="admin-stat-icon"><i className="fa-solid fa-users"></i></div>
                                </div>
                                <div className="admin-stat-card">
                                    <div>
                                        <span className="admin-stat-label">สินค้าในระบบ</span>
                                        <div className="admin-stat-num">{products.length} รายการ</div>
                                    </div>
                                    <div className="admin-stat-icon"><i className="fa-solid fa-cubes"></i></div>
                                </div>
                            </div>

                            {unreadCount > 0 && (
                                <div className="admin-chat-alert" onClick={() => setActiveAdminTab('chats')}>
                                    <div>
                                        <strong><i className="fa-solid fa-bell"></i> มีแชทลูกค้ารอการตอบกลับ {unreadCount} ห้อง</strong>
                                        <p>ล่าสุดจาก {unreadThreads.slice(0, 3).join(', ')}{unreadCount > 3 ? ` และอีก ${unreadCount - 3} ห้อง` : ''}</p>
                                    </div>
                                    <button className="btn btn-primary btn-sm">เปิดโต๊ะแชท</button>
                                </div>
                            )}

                            <h3 style={{ marginBottom: "12px", marginTop: "20px" }}>ประวัติทำรายการล่าสุด 5 รายการ</h3>
                            <div className="table-responsive">
                                <table className="invoice-table">
                                    <thead>
                                        <tr>
                                            <th>เลขบิล</th>
                                            <th>ผู้ใช้งาน</th>
                                            <th>ยอดชำระ</th>
                                            <th>วัน-เวลาทำรายการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.slice(-5).reverse().map((ord, idx) => (
                                            <tr key={idx}>
                                                <td style={{ fontFamily: "monospace", fontWeight: "600" }}>{ord.orderId}</td>
                                                <td>{ord.username}</td>
                                                <td>{ord.totalPrice.toFixed(2)} ฿</td>
                                                <td>{new Date(ord.date).toLocaleString('th-TH')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeAdminTab === 'products' && (
                        <>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
                                <h2 style={{ margin: 0 }}>คลังสินค้าหน้าร้าน ({products.length})</h2>
                                <button className="btn btn-primary btn-sm" onClick={() => setActiveDetailProduct({ id: '', name: '', price: 0, category: 'discord', tag: '', svgType: 'discord', description: '', isAdminEdit: true })}><i className="fa-solid fa-plus-circle"></i> เพิ่มสินค้าใหม่</button>
                            </div>
                            <div className="table-responsive">
                                <table className="invoice-table">
                                    <thead>
                                        <tr>
                                            <th>ชื่อสินค้า</th>
                                            <th>หมวดหมู่</th>
                                            <th>ราคาขาย</th>
                                            <th>ป้ายแท็ก</th>
                                            <th>การจัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p.id}>
                                                <td style={{ fontWeight: "600" }}>{p.name}</td>
                                                <td>
                                                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", background: "var(--bg-app)", padding: "3px 6px", borderRadius: "4px" }}>
                                                        {p.category === 'discord' ? 'DISCORD' :
                                                            p.category === 'fivem' ? 'FIVEM' :
                                                                p.category === 'app-premium' ? 'APP PREMIUM' :
                                                                    p.category === 'others' ? 'สินค้าอื่นๆ' : p.category}
                                                    </span>
                                                </td>
                                                <td><strong>{p.price}</strong> ฿</td>
                                                <td>{p.tag ? <span className="status-badge pending" style={{ padding: "2px 6px", fontSize: "0.7rem" }}>{p.tag.toUpperCase()}</span> : '-'}</td>
                                                <td>
                                                    <button className="btn btn-outline btn-xs" style={{ marginRight: "6px" }} onClick={() => setActiveDetailProduct({ ...p, isAdminEdit: true })}><i className="fa-solid fa-pen"></i></button>
                                                    <button className="btn btn-danger btn-xs" onClick={() => handleAdminProductDelete(p.id)}><i className="fa-solid fa-trash-can"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeAdminTab === 'orders' && (
                        <>
                            <h2 style={{ marginBottom: "20px" }}>ประวัติบิลการซื้อและการเติมเงินทั้งหมด</h2>
                            <div className="table-responsive">
                                <table className="invoice-table">
                                    <thead>
                                        <tr>
                                            <th>เลขบิล</th>
                                            <th>ผู้ซื้อ</th>
                                            <th>สินค้าทำรายการ</th>
                                            <th>ยอดสุทธิ</th>
                                            <th>วัน-เวลาที่สั่งซื้อ</th>
                                            <th>สถานะ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(o => (
                                            <tr key={o.orderId}>
                                                <td style={{ fontFamily: "monospace", fontWeight: "600" }}>{o.orderId}</td>
                                                <td><strong>{o.username}</strong></td>
                                                <td style={{ fontSize: "0.85rem", maxWidth: "250px" }}>
                                                    {o.items.map((it, idx) => (
                                                        <div key={idx} style={{ marginBottom: "4px" }}>
                                                            <div>{it.name} ({it.qty} ชิ้น)</div>
                                                            {it.deliveredItems && it.deliveredItems.length > 0 && (
                                                                <div style={{ fontFamily: "monospace", color: "var(--primary)", fontSize: "0.75rem", paddingLeft: "10px", marginTop: "2px" }}>
                                                                    {it.deliveredItems.join(', ')}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>{o.totalPrice.toFixed(2)} ฿</td>
                                                <td>{new Date(o.date).toLocaleString('th-TH')}</td>
                                                <td><span className="status-badge completed"><i className="fa-solid fa-circle-check"></i> สำเร็จ</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeAdminTab === 'chats' && (
                        <>
                            <div className="admin-section-title">
                                <div>
                                    <h2>ห้องแชทสื่อสารกับลูกค้า (หลังบ้าน)</h2>
                                    <p>รองรับหลายห้องพร้อมกัน เลือกรายชื่อลูกค้าด้านซ้ายเพื่ออ่านและตอบกลับได้ตลอดเวลา</p>
                                </div>
                                {unreadCount > 0 && <span className="admin-live-alert"><i className="fa-solid fa-bell"></i> ใหม่ {unreadCount}</span>}
                            </div>
                            <div className={`admin-chat-desk ${activeChatThread ? 'chat-active' : 'list-active'}`}>
                                <div className="admin-chat-threads">
                                    <div className="threads-header">
                                        <span>รายชื่อลูกค้าติดต่อ</span>
                                        <small>{threads.length} ห้อง</small>
                                    </div>
                                    <div className="threads-list">
                                        {threads.length === 0 ? (
                                            <div className="no-threads">ไม่มีประวัติการแชต</div>
                                        ) : (
                                            threads.map(u => {
                                                const hasUnread = localStorage.getItem("x24_unread_admin_" + u) === "1";
                                                const thread = chats[u] || [];
                                                const lastMessage = thread[thread.length - 1];
                                                const last = lastMessage?.text || (lastMessage?.attachment ? 'ส่งรูปภาพ' : 'ไม่มีข้อความ');
                                                const unreadMessages = hasUnread ? thread.filter(msg => msg.sender === 'user').length : 0;

                                                return (
                                                    <div
                                                        key={u}
                                                        className={`thread-item ${activeChatThread === u ? 'active' : ''}`}
                                                        onClick={() => {
                                                            setActiveChatThread(u);
                                                            localStorage.removeItem("x24_unread_admin_" + u);
                                                        }}
                                                    >
                                                        <div className="thread-avatar">{u[0].toUpperCase()}</div>
                                                        <div className="thread-info">
                                                            <div className="thread-name">
                                                                <span>{u}</span>
                                                                {hasUnread && <em>{unreadMessages}</em>}
                                                            </div>
                                                            <div className="thread-last-msg">{last}</div>
                                                        </div>
                                                        {hasUnread && <span className="thread-unread-dot"></span>}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                                <div className="admin-chat-content-wrapper">
                                    {activeChatThread ? (
                                        <div className="admin-chat-window">
                                            <div className="admin-chat-header">
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline btn-xs admin-chat-back-btn"
                                                        onClick={() => setActiveChatThread('')}
                                                        style={{ marginRight: "10px", padding: "4px 8px" }}
                                                    >
                                                        <i className="fa-solid fa-chevron-left"></i> กลับ
                                                    </button>
                                                    <span>คุยกับลูกค้า: <strong>{activeChatThread}</strong></span>
                                                </div>
                                                <div style={{ display: "flex", gap: "8px" }}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline btn-xs"
                                                        onClick={() => handleAdminClearChat(activeChatThread)}
                                                        style={{ color: "var(--text-light)", borderColor: "var(--border)" }}
                                                    >
                                                        <i className="fa-solid fa-eraser"></i> ล้างหน้าจอ
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-xs"
                                                        onClick={() => handleAdminCloseChat(activeChatThread)}
                                                        style={{
                                                            backgroundColor: "var(--danger)",
                                                            color: "#fff",
                                                            border: "none",
                                                            padding: "6px 10px",
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: "4px",
                                                            borderRadius: "var(--radius-sm)",
                                                            cursor: "pointer",
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-lock"></i> ปิดตั๋ว (Close Ticket)
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="admin-chat-body" ref={adminChatFeedRef}>
                                                {(chats[activeChatThread] || []).map((msg, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`chat-bubble-msg ${msg.sender === 'user' ? 'support' : msg.sender === 'admin' ? 'user' : 'system'}`}
                                                        style={msg.sender === 'user' ? { alignSelf: 'flex-start', backgroundColor: '#e2e8f0', color: '#0f172a' } : msg.sender === 'admin' ? { alignSelf: 'flex-end', backgroundColor: 'var(--primary)', color: '#fff' } : {}}
                                                    >
                                                        <strong>{msg.sender === 'user' ? activeChatThread : msg.sender === 'admin' ? 'Admin' : ''}:</strong>
                                                        {msg.text && <p>{msg.text}</p>}
                                                        {msg.attachment?.dataUrl && (
                                                            <a href={msg.attachment.dataUrl} target="_blank" rel="noreferrer" className="chat-image-link">
                                                                <img src={msg.attachment.dataUrl} alt={msg.attachment.name || "รูปภาพแนบในแชท"} className="chat-attachment-image" />
                                                            </a>
                                                        )}
                                                        <span className="msg-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <form className="admin-chat-input" onSubmit={handleAdminSendMsg}>
                                                <label className="chat-file-btn" title="แนบรูปภาพ">
                                                    <i className="fa-solid fa-image"></i>
                                                    <input type="file" id="admin-image-input" accept="image/*" />
                                                </label>
                                                <input type="text" id="admin-message-input" placeholder="พิมพ์ข้อความตอบกลับลูกค้า..." autoComplete="off" />
                                                <button type="submit" className="btn btn-primary"><i className="fa-solid fa-paper-plane"></i></button>
                                            </form>
                                        </div>
                                    ) : (
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexGrow: 1, color: "var(--text-light)", textAlign: "center" }}>
                                            <i className="fa-solid fa-comments" style={{ fontSize: "3.5rem", marginBottom: "16px" }}></i>
                                            <h3>กรุณาเลือกห้องแชทของลูกค้า</h3>
                                            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>คลิกรายชื่อด้านซ้ายเพื่อเปิดสนทนา</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    };

    const renderActiveView = () => {
        const path = route.split('?')[0];
        switch (path) {
            case "#/home":
                return <HomeView />;
            case "#/products":
                return <ProductsView />;
            case "#/history":
                return <HistoryView />;
            case "#/donate":
                return <DonateView />;
            case "#/contact":
                return <ContactView />;
            case "#/profile":
                return <ProfileView />;
            case "#/admin":
                return <AdminView />;
            default:
                return <HomeView />;
        }
    };

    // --------------------------------------------------------------------------
    // Main HTML Rendering output (JSX mapping)
    // --------------------------------------------------------------------------
    const isLanding = route === '#/' || route === '';

    if (isLanding) {
        return (
            <div style={{ minHeight: "100vh" }}>
                <LandingView />

                {/* Login / Register popup modal */}
                {authModal && (
                    <div className="modal-overlay active" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setAuthModal(null); }}>
                        <div className="modal-card">
                            <button className="modal-close-btn" onClick={() => setAuthModal(null)}><i className="fa-solid fa-xmark"></i></button>
                            <div className="modal-tabs">
                                <button className={`modal-tab ${authModal === 'login' ? 'active' : ''}`} onClick={() => setAuthModal('login')}>เข้าสู่ระบบ</button>
                                <button className={`modal-tab ${authModal === 'register' ? 'active' : ''}`} onClick={() => setAuthModal('register')}>สมัครสมาชิก</button>
                            </div>

                            {authModal === 'login' ? (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const u = document.getElementById("log-user")?.value.trim().toLowerCase();
                                    const p = document.getElementById("log-pass")?.value;

                                    const match = users.find(x => x.username === u && x.password === p);
                                    if (match) {
                                        setCurrentUser(match);
                                        setAuthModal(null);
                                        showToast(`ยินดีต้อนรับกลับมาคุณ ${match.username}!`);
                                        if (match.role === 'admin') {
                                            window.location.hash = "#/admin";
                                        } else {
                                            window.location.hash = "#/home";
                                        }
                                    } else {
                                        showToast("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง", "error");
                                    }
                                }}>
                                    <div className="form-group">
                                        <label><i className="fa-solid fa-user"></i> ชื่อผู้ใช้</label>
                                        <input type="text" id="log-user" required placeholder="กรอกชื่อผู้ใช้..." />
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa-solid fa-lock"></i> รหัสผ่าน</label>
                                        <input type="password" id="log-pass" required placeholder="กรอกรหัสผ่าน..." />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">เข้าสู่ระบบ</button>
                                    <p className="form-switch-text">ยังไม่มีบัญชีใช่หรือไม่? <a href="#" onClick={(e) => { e.preventDefault(); setAuthModal('register'); }}>สมัครสมาชิกที่นี่</a></p>
                                </form>
                            ) : (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const u = document.getElementById("reg-user")?.value.trim().toLowerCase();
                                    const em = document.getElementById("reg-email")?.value.trim();
                                    const p = document.getElementById("reg-pass")?.value;
                                    const pc = document.getElementById("reg-pass-confirm")?.value;

                                    if (!/^[a-zA-Z0-9]{4,15}$/.test(u)) {
                                        showToast("ชื่อผู้ใช้ต้องเป็นตัวอักษรภาษาอังกฤษ/ตัวเลข 4-15 ตัว", "warning");
                                        return;
                                    }
                                    if (p.length < 6) {
                                        showToast("รหัสผ่านอย่างน้อย 6 ตัวอักษรขึ้นไป", "warning");
                                        return;
                                    }
                                    if (p !== pc) {
                                        showToast("การยืนยันรหัสผ่านไม่ตรงกัน", "error");
                                        return;
                                    }

                                    if (users.some(x => x.username === u)) {
                                        showToast("ชื่อผู้ใช้นี้มีคนใช้แล้วค่ะ", "error");
                                        return;
                                    }

                                    const reg = {
                                        userId: "USR-" + Math.floor(10000 + Math.random() * 90000),
                                        username: u,
                                        email: em,
                                        password: p,
                                        balance: 0.00,
                                        role: "member",
                                        registeredAt: Date.now()
                                    };
                                    setUsers(prev => [...prev, reg]);
                                    setCurrentUser(reg);
                                    setAuthModal(null);
                                    showToast("สมัครสมาชิกและเข้าสู่ระบบสำเร็จ!");
                                    window.location.hash = "#/home";
                                }}>
                                    <div className="form-group">
                                        <label><i className="fa-solid fa-user"></i> ชื่อผู้ใช้</label>
                                        <input type="text" id="reg-user" required placeholder="อักษรภาษาอังกฤษหรือตัวเลข 4-15 ตัว..." />
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa-solid fa-envelope"></i> อีเมล</label>
                                        <input type="email" id="reg-email" required placeholder="example@email.com..." />
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa-solid fa-lock"></i> รหัสผ่าน</label>
                                        <input type="password" id="reg-pass" required placeholder="รหัสผ่านอย่างน้อย 6 ตัวอักษร..." />
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa-solid fa-lock"></i> ยืนยันรหัสผ่าน</label>
                                        <input type="password" id="reg-pass-confirm" required placeholder="กรอกยืนยันรหัสผ่านอีกครั้ง..." />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">สมัครสมาชิก</button>
                                    <p className="form-switch-text">มีบัญชีอยู่แล้วใช่หรือไม่? <a href="#" onClick={(e) => { e.preventDefault(); setAuthModal('login'); }}>เข้าสู่ระบบที่นี่</a></p>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                {/* Dynamic Toast Notifications */}
                <div className="toast-container">
                    {toasts.map(t => (
                        <div key={t.id} className={`toast toast-${t.type}`}>
                            <i className={`fa-solid ${t.type === 'error' ? 'fa-circle-xmark' : t.type === 'warning' ? 'fa-triangle-exclamation' : t.type === 'info' ? 'fa-circle-info' : 'fa-circle-check'}`}></i>
                            <div className="toast-content">{t.message}</div>
                            <button className="toast-close" onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

            {/* Sticky Navigation bar */}
            <header className="navbar">
                <div className="nav-container">
                    <a href="#/home" className="nav-logo">
                        <img src="/Logo X24.png" alt="PB SERVICES Logo" style={{ width: "28px", height: "28px", objectFit: "contain", marginRight: "6px", filter: "drop-shadow(0 0 4px rgba(6, 182, 212, 0.4))" }} />
                        <span className="logo-bold">PB</span><span className="logo-light"> SERVICES</span>
                    </a>

                    <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <i className="fa-solid fa-bars"></i>
                    </button>

                    <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                        <a href="#/home" className={`nav-link ${route.split('?')[0] === '#/home' ? 'active' : ''}`}>หน้าแรก</a>
                        <a href="#/products" className={`nav-link ${route.startsWith('#/products') ? 'active' : ''}`}>สินค้า</a>
                        <a href="#/history" className={`nav-link ${route === '#/history' ? 'active' : ''}`}>ประวัติการซื้อ</a>
                        <a href="#/donate" className={`nav-link ${route === '#/donate' ? 'active' : ''}`}>โดเนท (เติมเงิน)</a>
                        <a href="#/contact" className={`nav-link ${route === '#/contact' ? 'active' : ''}`}>ติดต่อเรา</a>
                    </nav>

                    <div className="nav-actions">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="ค้นหา..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => { if (!route.startsWith('#/products')) window.location.hash = "#/products"; }}
                            />
                            <button><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>

                        {currentUser && (
                            <div className="user-wallet">
                                <i className="fa-solid fa-wallet"></i>
                                <span>{currentUser.balance.toFixed(2)}</span> ฿
                            </div>
                        )}

                        <button className="cart-trigger-btn" onClick={() => setCartOpen(true)} aria-label="Open Cart">
                            <i className="fa-solid fa-shopping-cart"></i>
                            {cart.length > 0 && <span className="cart-badge">{getCartCount()}</span>}
                        </button>

                        <div className="auth-wrapper">
                            {currentUser ? (
                                <div className="profile-dropdown-wrapper" id="profile-dropdown-wrapper">
                                    <button className="profile-trigger" onClick={() => { window.location.hash = "#/profile"; }}>
                                        <div className="profile-avatar">{currentUser.username[0].toUpperCase()}</div>
                                        <span className="profile-username">{currentUser.username}</span>
                                        <i className="fa-solid fa-chevron-down" style={{ fontSize: "0.75rem", color: "#94a3b8" }}></i>
                                    </button>
                                    <div className="dropdown-menu" id="profile-dropdown-menu">
                                        <a href="#/profile" className="dropdown-item" onClick={() => document.getElementById("profile-dropdown-menu")?.classList.remove("active")}><i className="fa-solid fa-user"></i> บัญชีของฉัน</a>
                                        <a href="#/history" className="dropdown-item" onClick={() => document.getElementById("profile-dropdown-menu")?.classList.remove("active")}><i className="fa-solid fa-clock-rotate-left"></i> ประวัติการซื้อ</a>
                                        {currentUser.role === 'admin' && (
                                            <a href="#/admin" className="dropdown-item" onClick={() => document.getElementById("profile-dropdown-menu")?.classList.remove("active")}><i className="fa-solid fa-gears"></i> จัดการระบบ</a>
                                        )}
                                        <div className="dropdown-divider"></div>
                                        <a href="#" className="dropdown-item logout-btn" onClick={(e) => { e.preventDefault(); document.getElementById("profile-dropdown-menu")?.classList.remove("active"); logout(); }}><i className="fa-solid fa-right-from-bracket"></i> ออกจากระบบ</a>
                                    </div>
                                </div>
                            ) : (
                                <button className="btn btn-primary" onClick={() => setAuthModal('login')}>
                                    <i className="fa-solid fa-user-circle"></i> เข้าสู่ระบบ
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main App Section Router */}
            <main className="app-view-wrapper">
                <div className="container">
                    {renderActiveView()}
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-info">
                        <div className="footer-logo" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <img src="/Logo X24.png" alt="PB SERVICES Logo" style={{ width: "24px", height: "24px", objectFit: "contain", filter: "drop-shadow(0 0 3px rgba(6, 182, 212, 0.3))" }} /> PB SERVICES
                        </div>
                        <p>ร้านค้าจำหน่ายสินค้าดิจิทัล บัตรเติมเกม และบริการต่างๆ ปลอดภัย รวดเร็ว ตลอด 24 ชั่วโมง</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" aria-label="Discord"><i className="fa-brands fa-discord"></i></a>
                            <a href="#" aria-label="Line"><i className="fa-brands fa-line"></i></a>
                            <a href="#" aria-label="Youtube"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                    <div className="footer-nav">
                        <h3>ลิงก์ด่วน</h3>
                        <ul>
                            <li><a href="#/home">หน้าแรก</a></li>
                            <li><a href="#/products">สินค้าทั้งหมด</a></li>
                            <li><a href="#/donate">ช่องทางการเติมเงิน</a></li>
                            <li><a href="#/contact">ติดต่อเรา</a></li>
                        </ul>
                    </div>
                    <div className="footer-admin">
                        <h3>ระบบหลังบ้าน</h3>
                        <p>สำหรับผู้ดูแลระบบ เข้าจัดการหลังบ้านที่นี่</p>
                        <a href="#/admin" className="btn btn-outline btn-sm">
                            <i className="fa-solid fa-gears"></i> จัดการระบบ (Admin)
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; 2026 PB SERVICES. All Rights Reserved. Built with React & LocalStorage.
                </div>
            </footer>

            {/* Cart sliding drawer drawer */}
            <div className={`cart-drawer-overlay ${cartOpen ? 'active' : ''}`} onClick={() => setCartOpen(false)}></div>
            <div className={`cart-drawer ${cartOpen ? 'active' : ''}`}>
                <div className="cart-drawer-header">
                    <h3><i className="fa-solid fa-shopping-cart"></i> ตะกร้าสินค้า</h3>
                    <button className="cart-close-btn" onClick={() => setCartOpen(false)} aria-label="Close cart"><i className="fa-solid fa-xmark"></i></button>
                </div>

                <div className="cart-drawer-body">
                    {cart.length === 0 ? (
                        <div className="cart-empty-state">
                            <i className="fa-solid fa-basket-shopping"></i>
                            <p>ไม่มีสินค้าในตะกร้า</p>
                            <button className="btn btn-primary btn-sm" onClick={() => { setCartOpen(false); window.location.hash = "#/products"; }}>เลือกช้อปสินค้าเลย</button>
                        </div>
                    ) : (
                        cart.map(item => {
                            const product = getCurrentProduct(item.product);
                            const stock = getProductStock(product);
                            const lineTotal = product.price * item.qty;

                            return (
                                <div className="cart-item" key={product.id}>
                                    <div className="cart-item-image">
                                        {product.imageUrl ? (
                                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                                        ) : (
                                            <ProductSVG type={product.svgType} />
                                        )}
                                    </div>
                                    <div className="cart-item-info">
                                        <h4>{product.name}</h4>
                                        <div className="cart-item-code">รหัสสินค้า: {product.id}</div>
                                        <div className="cart-item-code">คงเหลือในสต็อก: {stock} ชิ้น</div>
                                        <div className="cart-item-price">ราคา/ชิ้น {Number(product.price).toFixed(2)} ฿</div>
                                        <div className="cart-item-subtotal">รวมรายการนี้ {lineTotal.toFixed(2)} ฿</div>
                                        <div className="cart-item-actions">
                                            <div className="quantity-controls">
                                                <button className="qty-btn" onClick={() => handleUpdateCartQty(product.id, -1)}><i className="fa-solid fa-minus"></i></button>
                                                <span className="qty-val">{item.qty}</span>
                                                <button className="qty-btn" onClick={() => handleUpdateCartQty(product.id, 1)} disabled={item.qty >= stock}><i className="fa-solid fa-plus"></i></button>
                                            </div>
                                            <button className="cart-item-delete" onClick={() => handleRemoveCartItem(product.id)}><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-drawer-footer">
                        <div className="cart-summary">
                            <div className="summary-line summary-line-muted">
                                <span>จำนวนสินค้า:</span>
                                <span>{getCartCount()} ชิ้น</span>
                            </div>
                            <div className="summary-line">
                                <span>ยอดรวมทั้งหมด:</span>
                                <span className="total-price">{getCartTotal().toFixed(2)} ฿</span>
                            </div>
                        </div>
                        <button className="btn btn-success btn-block" onClick={handleCheckout}>
                            <i className="fa-solid fa-credit-card"></i> ชำระเงิน
                        </button>
                    </div>
                )}
            </div>

            {/* Login / Register popup modal */}
            {authModal && (
                <div className="modal-overlay active" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setAuthModal(null); }}>
                    <div className="modal-card">
                        <button className="modal-close-btn" onClick={() => setAuthModal(null)}><i className="fa-solid fa-xmark"></i></button>
                        <div className="modal-tabs">
                            <button className={`modal-tab ${authModal === 'login' ? 'active' : ''}`} onClick={() => setAuthModal('login')}>เข้าสู่ระบบ</button>
                            <button className={`modal-tab ${authModal === 'register' ? 'active' : ''}`} onClick={() => setAuthModal('register')}>สมัครสมาชิก</button>
                        </div>

                        {authModal === 'login' ? (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const u = document.getElementById("log-user")?.value.trim().toLowerCase();
                                const p = document.getElementById("log-pass")?.value;

                                const match = users.find(x => x.username === u && x.password === p);
                                if (match) {
                                    setCurrentUser(match);
                                    setAuthModal(null);
                                    showToast(`ยินดีต้อนรับกลับมาคุณ ${match.username}!`);
                                    if (match.role === 'admin') window.location.hash = "#/admin";
                                } else {
                                    showToast("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง", "error");
                                }
                            }}>
                                <div className="form-group">
                                    <label><i className="fa-solid fa-user"></i> ชื่อผู้ใช้</label>
                                    <input type="text" id="log-user" required placeholder="กรอกชื่อผู้ใช้..." />
                                </div>
                                <div className="form-group">
                                    <label><i className="fa-solid fa-lock"></i> รหัสผ่าน</label>
                                    <input type="password" id="log-pass" required placeholder="กรอกรหัสผ่าน..." />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">เข้าสู่ระบบ</button>
                                <p className="form-switch-text">ยังไม่มีบัญชีใช่หรือไม่? <a href="#" onClick={(e) => { e.preventDefault(); setAuthModal('register'); }}>สมัครสมาชิกที่นี่</a></p>
                            </form>
                        ) : (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const u = document.getElementById("reg-user")?.value.trim().toLowerCase();
                                const em = document.getElementById("reg-email")?.value.trim();
                                const p = document.getElementById("reg-pass")?.value;
                                const pc = document.getElementById("reg-pass-confirm")?.value;

                                if (!/^[a-zA-Z0-9]{4,15}$/.test(u)) {
                                    showToast("ชื่อผู้ใช้ต้องเป็นตัวอักษรภาษาอังกฤษ/ตัวเลข 4-15 ตัว", "warning");
                                    return;
                                }
                                if (p.length < 6) {
                                    showToast("รหัสผ่านอย่างน้อย 6 ตัวอักษรขึ้นไป", "warning");
                                    return;
                                }
                                if (p !== pc) {
                                    showToast("การยืนยันรหัสผ่านไม่ตรงกัน", "error");
                                    return;
                                }

                                if (users.some(x => x.username === u)) {
                                    showToast("ชื่อผู้ใช้นี้มีคนใช้แล้วค่ะ", "error");
                                    return;
                                }

                                const reg = {
                                    userId: "USR-" + Math.floor(10000 + Math.random() * 90000),
                                    username: u,
                                    email: em,
                                    password: p,
                                    balance: 0.00,
                                    role: "member",
                                    registeredAt: Date.now()
                                };
                                setUsers(prev => [...prev, reg]);
                                setCurrentUser(reg);
                                setAuthModal(null);
                                showToast("สมัครสมาชิกและเข้าสู่ระบบสำเร็จ!");
                            }}>
                                <div className="form-group">
                                    <label><i className="fa-solid fa-user"></i> ชื่อผู้ใช้</label>
                                    <input type="text" id="reg-user" required placeholder="อักษรภาษาอังกฤษหรือตัวเลข 4-15 ตัว..." />
                                </div>
                                <div className="form-group">
                                    <label><i className="fa-solid fa-envelope"></i> อีเมล</label>
                                    <input type="email" id="reg-email" required placeholder="example@email.com..." />
                                </div>
                                <div className="form-group">
                                    <label><i className="fa-solid fa-lock"></i> รหัสผ่าน</label>
                                    <input type="password" id="reg-pass" required placeholder="รหัสผ่านอย่างน้อย 6 ตัวอักษร..." />
                                </div>
                                <div className="form-group">
                                    <label><i className="fa-solid fa-lock"></i> ยืนยันรหัสผ่าน</label>
                                    <input type="password" id="reg-pass-confirm" required placeholder="กรอกยืนยันรหัสผ่านอีกครั้ง..." />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">สมัครสมาชิก</button>
                                <p className="form-switch-text">มีบัญชีอยู่แล้วใช่หรือไม่? <a href="#" onClick={(e) => { e.preventDefault(); setAuthModal('login'); }}>เข้าสู่ระบบที่นี่</a></p>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* FLOATING DELIVERY NOTIFICATION WIDGET */}
            {deliveryNotifications.length > 0 && (
                <div className="delivery-widget">
                    <button className="delivery-bubble" onClick={() => setDeliveryPopupOpen(!deliveryPopupOpen)} aria-label="Delivery Notification">
                        <i className="fa-solid fa-gift"></i>
                        <span className="delivery-unread-badge">
                            {deliveryNotifications.reduce((sum, item) => sum + item.qty, 0)}
                        </span>
                    </button>

                    <div className={`delivery-panel ${deliveryPopupOpen ? 'open' : ''}`}>
                        <div className="delivery-header">
                            <h3><i className="fa-solid fa-gift"></i> จัดส่งสินค้าอัตโนมัติสำเร็จ!</h3>
                            <button type="button" className="delivery-close-btn" onClick={() => setDeliveryPopupOpen(false)}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="delivery-body">
                            {deliveryNotifications.map((it, idx) => (
                                <div key={idx} className="delivery-item">
                                    <div className="delivery-item-title">{it.name} ({it.qty} ชิ้น)</div>
                                    <div style={{ marginTop: "6px" }}>
                                        <div style={{ color: "var(--primary)", fontWeight: "600", fontSize: "0.74rem", marginBottom: "4px", paddingLeft: "2px" }}>ข้อมูลจัดส่งสินค้า:</div>
                                        {it.deliveredItems.map((code, cidx) => {
                                            const isUrl = code.startsWith('http://') || code.startsWith('https://');
                                            const parts = !isUrl ? code.split(':') : [];

                                            if (parts.length >= 2) {
                                                return (
                                                    <div key={cidx} style={{ padding: "10px 12px", backgroundColor: "rgba(0,0,0,0.25)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.82rem", marginBottom: cidx < it.deliveredItems.length - 1 ? "8px" : 0 }}>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                <span style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>1. อีเมลสินค้า:</span>
                                                                <strong style={{ fontFamily: "monospace", color: "var(--text-main)", userSelect: "all", cursor: "pointer" }} title="คลิกเพื่อคัดลอก">{parts[0]}</strong>
                                                            </div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                <span style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>2. รหัสผ่านสินค้า:</span>
                                                                <strong style={{ fontFamily: "monospace", color: "var(--secondary)", userSelect: "all", cursor: "pointer" }} title="คลิกเพื่อคัดลอก">{parts.slice(1).join(':')}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div key={cidx} style={{ padding: "10px 12px", backgroundColor: "rgba(0,0,0,0.25)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.82rem", marginBottom: cidx < it.deliveredItems.length - 1 ? "8px" : 0 }}>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                <span style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>{isUrl ? "1. ลิงก์รับสินค้า:" : "1. อีเมลสินค้า (หรือคีย์):"}</span>
                                                                <strong style={{ fontFamily: "monospace", color: "var(--text-main)", userSelect: "all", cursor: "pointer", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={code}>{code}</strong>
                                                            </div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                <span style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>2. รหัสผ่านของสินค้า:</span>
                                                                <strong style={{ fontFamily: "monospace", color: "var(--text-light)" }}>-</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="delivery-footer" style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                            <button type="button" className="btn btn-outline btn-xs" onClick={() => setDeliveryPopupOpen(false)} style={{ borderColor: "rgba(100, 116, 139, 0.4)", color: "var(--text-muted)", padding: "4px 10px", fontSize: "0.75rem" }}>ปิดหน้าต่างนี้</button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={handleDismissDelivery} style={{ padding: "6px 12px", fontSize: "0.8rem" }}>รับทราบ (ล้างแจ้งเตือน)</button>
                        </div>
                    </div>
                </div>
            )}

            {/* FLOATING ADMIN CONTACT LIVE CHAT CLIENT WIDGET */}
            <div className={`chat-widget ${chatOpen ? 'open' : ''}`}>
                <button className="chat-bubble" onClick={() => { setChatOpen(!chatOpen); setUnreadClient(false); localStorage.setItem("x24_unread_client", "0"); }} aria-label="Support Chat">
                    <span className="chat-pulse"></span>
                    <i className="fa-solid fa-comments"></i>
                    {unreadClient && <span className="chat-unread-badge">1</span>}
                </button>

                <div className="chat-panel">
                    <div className="chat-panel-header">
                        <div className="chat-admin-info">
                            <div className="admin-avatar-wrapper">
                                <i className="fa-solid fa-user-tie"></i>
                                <span className="admin-status-dot online"></span>
                            </div>
                            <div className="admin-title">
                                <h4>ติดต่อฝ่ายสนับสนุน (แอดมิน)</h4>
                                <p>ออนไลน์ • พร้อมช่วยเหลือตลอด 24 ชม.</p>
                            </div>
                        </div>
                        <button className="chat-panel-close" onClick={() => setChatOpen(false)}><i className="fa-solid fa-chevron-down"></i></button>
                    </div>

                    {currentUser && chats[currentUser.username] && (
                        <div className="ticket-info-banner">
                            <span><i className="fa-solid fa-ticket"></i> รหัสตั๋ว: <strong>{currentUser.username}</strong></span>
                            <button className="btn-close-ticket" onClick={handleClientCloseChat}>
                                <i className="fa-solid fa-lock"></i> ปิดแชท
                            </button>
                        </div>
                    )}

                    <div className="chat-panel-body" ref={chatFeedRef}>
                        <div className="chat-bubble-msg system">
                            <p>สวัสดีค่ะ! PB SERVICES ยินดีให้บริการ หากคุณมีคำถามใดๆ สามารถแชทคุยกับแอดมินตรงนี้ได้เลยค่ะ</p>
                            <span className="msg-time">ระบบอัตโนมัติ</span>
                        </div>

                        {!currentUser ? (
                            <div className="chat-bubble-msg system register-prompt">
                                <p>กรุณา <strong>เข้าสู่ระบบ</strong> ก่อนเริ่มการสนทนา เพื่อบันทึกประวัติการแชทและให้เจ้าหน้าที่ช่วยเหลืออย่างตรงจุด</p>
                                <button className="btn btn-primary btn-xs" onClick={() => setAuthModal('login')}>เข้าสู่ระบบ / สมัครสมาชิก</button>
                            </div>
                        ) : !chats[currentUser.username] ? (
                            <div className="ticket-create-panel">
                                <i className="fa-solid fa-comments ticket-main-icon"></i>
                                <h3>ติดต่อฝ่ายสนับสนุน (Live Support)</h3>
                                <p>หากต้องการติดต่อสอบถามหรือแจ้งปัญหา กรุณาสร้างห้องสนทนาเพื่อติดต่อทีมงานแอดมิน</p>
                                <button className="create-ticket-btn" onClick={handleClientCreateTicket}>
                                    <i className="fa-solid fa-ticket"></i> สร้างตั๋วสนทนา (Create Ticket)
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="chat-bubble-msg system">
                                    <p>ตั๋วติดต่อแอดมินเปิดอยู่ แชทนี้เชื่อมโยงกับแอดมินโดยตรงแล้วค่ะ</p>
                                    <span className="msg-time">เริ่มการสนทนา</span>
                                </div>
                                {(chats[currentUser.username] || []).map((msg, idx) => (
                                    <div key={idx} className={`chat-bubble-msg ${msg.sender === 'user' ? 'user' : msg.sender === 'admin' ? 'support' : 'system'}`}>
                                        {msg.text && <p>{msg.text}</p>}
                                        {msg.attachment?.dataUrl && (
                                            <a href={msg.attachment.dataUrl} target="_blank" rel="noreferrer" className="chat-image-link">
                                                <img src={msg.attachment.dataUrl} alt={msg.attachment.name || "รูปภาพแนบในแชท"} className="chat-attachment-image" />
                                            </a>
                                        )}
                                        <span className="msg-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    {currentUser && chats[currentUser.username] && (
                        <form className="chat-panel-input" onSubmit={handleClientSendMsg}>
                            <label className="chat-file-btn" title="แนบรูปภาพ">
                                <i className="fa-solid fa-image"></i>
                                <input type="file" id="chat-image-input" accept="image/*" />
                            </label>
                            <input
                                type="text"
                                id="chat-message-input"
                                placeholder="พิมพ์ข้อความที่นี่..."
                                autoComplete="off"
                            />
                            <button type="submit" id="chat-send-btn"><i className="fa-solid fa-paper-plane"></i></button>
                        </form>
                    )}
                </div>
            </div>

            {/* Product Detail Modal Popup */}
            {activeDetailProduct && !activeDetailProduct.id.startsWith("modal-") && (
                activeDetailProduct.isAdminEdit ? (
                    // This is the Admin Add/Edit Modal
                    <div className="modal-overlay active" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setActiveDetailProduct(null); }}>
                        <div className="modal-card" style={{ maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", textAlign: "left" }}>
                            <button type="button" className="modal-close-btn" onClick={() => setActiveDetailProduct(null)}><i className="fa-solid fa-xmark"></i></button>

                            <form onSubmit={handleAdminProductSave}>
                                {/* Top Image/SVG Selector Box */}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px", backgroundColor: "var(--bg-app)", borderRadius: "var(--radius-md)", marginBottom: "16px", gap: "10px", border: "1px solid var(--border)" }}>
                                    <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {adminImagePreview ? (
                                            <img src={adminImagePreview} alt="Preview" className="product-image" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                                        ) : (
                                            <ProductSVG type={adminProdSvg} />
                                        )}
                                    </div>
                                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <div>
                                            <label style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginBottom: "4px", textTransform: "uppercase", fontWeight: 600 }}>แนบไฟล์รูปภาพโลโก้สินค้า</label>
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                onChange={handleAdminImageUpload} 
                                                style={{ fontSize: "0.75rem", width: "100%", color: "var(--text-muted)", cursor: "pointer" }} 
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginBottom: "4px", textTransform: "uppercase", fontWeight: 600 }}>หรือระบุ URL รูปภาพสินค้า</label>
                                            <input 
                                                type="text" 
                                                value={adminImageUrl}
                                                onChange={(e) => {
                                                    setAdminImageUrl(e.target.value);
                                                    setAdminImagePreview(e.target.value);
                                                }}
                                                placeholder="https://example.com/image.png" 
                                                style={{ width: "100%", padding: "6px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", backgroundColor: "var(--surface)", color: "var(--text-main)", fontSize: "0.8rem", outline: "none" }}
                                            />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginBottom: "4px", textTransform: "uppercase", fontWeight: 600 }}>ใช้ไอคอนเวกเตอร์แทน (Fallback)</label>
                                                <select 
                                                    value={adminProdSvg} 
                                                    onChange={(e) => {
                                                        setAdminProdSvg(e.target.value);
                                                        if (!adminImageUrl) {
                                                            setAdminImagePreview("");
                                                        }
                                                    }} 
                                                    style={{ width: "100%", padding: "6px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", backgroundColor: "var(--surface)", color: "var(--text-main)", fontSize: "0.8rem", outline: "none", cursor: "pointer" }}
                                                >
                                                    <option value="fivem">ไอคอนห้าเอ็ม (FiveM)</option>
                                                    <option value="steam">ไอคอนสตีม (Steam)</option>
                                                    <option value="discord">ไอคอนดิสคอร์ด (Discord)</option>
                                                    <option value="netflix">ไอคอนเน็ตฟลิกซ์ (Netflix)</option>
                                                    <option value="others">ไอคอนทั่วไป (Others)</option>
                                                </select>
                                            </div>
                                            {(adminImageUrl || adminImagePreview) && (
                                                <button 
                                                    type="button" 
                                                    className="btn btn-outline btn-xs" 
                                                    onClick={() => {
                                                        setAdminImageUrl("");
                                                        setAdminImagePreview("");
                                                    }}
                                                    style={{ marginTop: "18px", padding: "6px 10px", fontSize: "0.75rem", color: "var(--danger)", borderColor: "rgba(229, 62, 62, 0.3)" }}
                                                >
                                                    ล้างรูปภาพ
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <span className="product-category" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--primary)" }}>
                                    {activeDetailProduct.id ? 'แก้ไขข้อมูลสินค้า' : 'เพิ่มสินค้าชิ้นใหม่'}
                                </span>
                                <h3 style={{ fontSize: "1.3rem", margin: "6px 0 12px 0", lineHeight: 1.4 }}>
                                    {activeDetailProduct.name || "ชื่อสินค้าใหม่..."}
                                </h3>

                                <div className="product-detail-meta">
                                    <div>
                                        <span>รหัสสินค้า</span>
                                        <input
                                            type="text"
                                            id="admin-prod-id"
                                            defaultValue={activeDetailProduct.id}
                                            placeholder="เช่น prod-robux-1"
                                            style={{ width: "100%", border: "none", background: "none", outline: "none", color: "var(--text-main)", fontSize: "0.86rem", fontWeight: 600, padding: 0 }}
                                        />
                                    </div>
                                    <div>
                                        <span>ชื่อสินค้า</span>
                                        <input
                                            type="text"
                                            id="admin-prod-name"
                                            defaultValue={activeDetailProduct.name}
                                            required
                                            placeholder="ชื่อสินค้า..."
                                            style={{ width: "100%", border: "none", background: "none", outline: "none", color: "var(--text-main)", fontSize: "0.86rem", fontWeight: 600, padding: 0 }}
                                        />
                                    </div>
                                    <div>
                                        <span>สต็อกคงเหลือ (ชิ้น)</span>
                                        <input
                                            type="number"
                                            id="admin-prod-stock"
                                            min="0"
                                            defaultValue={getProductStock(activeDetailProduct)}
                                            required
                                            placeholder="เช่น 99"
                                            style={{ width: "100%", border: "none", background: "none", outline: "none", color: "var(--text-main)", fontSize: "0.86rem", fontWeight: 600, padding: 0 }}
                                        />
                                    </div>
                                    <div>
                                        <span>หมวดหมู่</span>
                                        <select
                                            id="admin-prod-cat"
                                            defaultValue={activeDetailProduct.category}
                                            style={{ width: "100%", border: "none", background: "none", outline: "none", color: "var(--text-main)", fontSize: "0.86rem", fontWeight: 600, padding: 0, cursor: "pointer" }}
                                        >
                                            <option value="discord">DISCORD</option>
                                            <option value="fivem">FIVEM</option>
                                            <option value="app-premium">APP PREMIUM</option>
                                            <option value="others">สินค้าอื่นๆ</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span>แท็กแนะนำ</span>
                                        <select
                                            id="admin-prod-tag"
                                            defaultValue={activeDetailProduct.tag}
                                            style={{ width: "100%", border: "none", background: "none", outline: "none", color: "var(--text-main)", fontSize: "0.86rem", fontWeight: 600, padding: 0, cursor: "pointer" }}
                                        >
                                            <option value="">ไม่มีแท็ก</option>
                                            <option value="hot">Hot (ร้อนแรง)</option>
                                            <option value="new">New (ใหม่ล่าสุด)</option>
                                            <option value="popular">Popular (ยอดนิยม)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span>สถานะสินค้า</span>
                                        <select
                                            id="admin-prod-status"
                                            defaultValue={activeDetailProduct.status || 'active'}
                                            style={{ width: "100%", border: "none", background: "none", outline: "none", color: "var(--text-main)", fontSize: "0.86rem", fontWeight: 600, padding: 0, cursor: "pointer" }}
                                        >
                                            <option value="active" style={{ color: "#10b981", backgroundColor: "#111b2e" }}>เปิดการจำหน่าย</option>
                                            <option value="inactive" style={{ color: "#ef4444", backgroundColor: "#111b2e" }}>ปิดการจำหน่าย</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginTop: "8px", marginBottom: "12px" }}>
                                    <label style={{ fontSize: "0.75rem", color: "var(--text-light)", textTransform: "uppercase", fontWeight: 600 }}>รายละเอียดอธิบายสินค้า</label>
                                    <textarea
                                        id="admin-prod-desc"
                                        rows="2"
                                        defaultValue={activeDetailProduct.description}
                                        required
                                        placeholder="ใส่ข้อมูลอธิบายบริการ..."
                                        style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", backgroundColor: "var(--bg-app)", color: "var(--text-main)", fontSize: "0.85rem", outline: "none", marginTop: "6px", fontFamily: "inherit", resize: "vertical" }}
                                    ></textarea>
                                </div>

                                <div className="form-group" style={{ marginTop: "8px", marginBottom: "12px" }}>
                                    <label style={{ fontSize: "0.75rem", color: "var(--text-light)", textTransform: "uppercase", fontWeight: 600 }}>ข้อมูลสต็อกสินค้าดิจิทัล (ใส่โค้ด/บัญชี แถวละ 1 รายการ)</label>
                                    <textarea
                                        id="admin-prod-stock-items"
                                        rows="3"
                                        defaultValue={activeDetailProduct.stockItems ? activeDetailProduct.stockItems.join('\n') : ''}
                                        placeholder="ตัวอย่างเช่น:&#10;netflix1@mail.com:pass123&#10;netflix2@mail.com:pass456"
                                        style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", backgroundColor: "var(--bg-app)", color: "var(--text-main)", fontSize: "0.85rem", outline: "none", marginTop: "6px", fontFamily: "monospace", resize: "vertical" }}
                                    ></textarea>
                                    <small style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>* หากใส่ข้อมูลในช่องนี้ จำนวนสต็อกสินค้าจะคำนวณจากจำนวนบรรทัดโดยอัตโนมัติ</small>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                                    <div>
                                        <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>ราคาขาย</span>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                                            <input
                                                type="number"
                                                id="admin-prod-price"
                                                defaultValue={activeDetailProduct.price || ''}
                                                required
                                                placeholder="ราคา..."
                                                style={{ fontSize: "1.4rem", color: "var(--primary)", fontWeight: 700, width: "100px", background: "none", border: "none", borderBottom: "1px solid var(--border-focus)", outline: "none", padding: "0 4px" }}
                                            />
                                            <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--text-muted)" }}>฿</span>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <button type="button" className="btn btn-outline" onClick={() => setActiveDetailProduct(null)} style={{ borderColor: "var(--border-focus)", color: "var(--text-muted)" }}>ยกเลิก</button>
                                        <button type="submit" className="btn btn-primary">บันทึกข้อมูล</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    // This is the Client Product Detail Modal
                    <div className="modal-overlay active" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setActiveDetailProduct(null); }}>
                        <div className="modal-card" style={{ maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", textAlign: "left" }}>
                            <button className="modal-close-btn" onClick={() => setActiveDetailProduct(null)}><i className="fa-solid fa-xmark"></i></button>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px 0", backgroundColor: "var(--bg-app)", borderRadius: "var(--radius-md)", marginBottom: "20px", height: "160px" }}>
                                {activeDetailProduct.imageUrl ? (
                                    <img src={activeDetailProduct.imageUrl} alt={activeDetailProduct.name} className="product-image" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                                ) : (
                                    <ProductSVG type={activeDetailProduct.svgType} />
                                )}
                            </div>
                            <span className="product-category" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--primary)" }}>{activeDetailProduct.category.toUpperCase()}</span>
                            <h3 style={{ fontSize: "1.3rem", margin: "6px 0 12px 0", lineHeight: 1.4 }}>{activeDetailProduct.name}</h3>
                            <div className="product-detail-meta">
                                <div>
                                    <span>รหัสสินค้า</span>
                                    <strong>{activeDetailProduct.id}</strong>
                                </div>
                                <div>
                                    <span>ชื่อสินค้า</span>
                                    <strong>{activeDetailProduct.name}</strong>
                                </div>
                                <div>
                                    <span>สต็อกคงเหลือ</span>
                                    <strong>{getProductStock(activeDetailProduct)} ชิ้น</strong>
                                </div>
                                <div>
                                    <span>หมวดหมู่</span>
                                    <strong>
                                        {activeDetailProduct.category === 'discord' ? 'DISCORD' :
                                            activeDetailProduct.category === 'fivem' ? 'FIVEM' :
                                                activeDetailProduct.category === 'app-premium' ? 'APP PREMIUM' :
                                                    activeDetailProduct.category === 'others' ? 'สินค้าอื่นๆ' : activeDetailProduct.category}
                                    </strong>
                                </div>
                            </div>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "20px" }}>{activeDetailProduct.description}</p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                                <div>
                                    <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>ราคาขาย</span>
                                    <h2 style={{ fontSize: "1.6rem", color: "var(--text-main)", fontWeight: 700 }}>{activeDetailProduct.price} <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-muted)" }}>฿</span></h2>
                                </div>
                                <button className="btn btn-primary" disabled={getProductStock(activeDetailProduct) <= 0} onClick={() => { handleAddToCart(activeDetailProduct); setActiveDetailProduct(null); }}><i className="fa-solid fa-cart-plus"></i> หยิบใส่ตะกร้า</button>
                            </div>
                        </div>
                    </div>
                )
            )}

            {/* Dynamic Toast Notifications */}
            <div className="toast-container">
                {toasts.map(t => (
                    <div key={t.id} className={`toast toast-${t.type}`}>
                        <i className={`fa-solid ${t.type === 'error' ? 'fa-circle-xmark' : t.type === 'warning' ? 'fa-triangle-exclamation' : t.type === 'info' ? 'fa-circle-info' : 'fa-circle-check'}`}></i>
                        <div className="toast-content">{t.message}</div>
                        <button className="toast-close" onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                ))}
            </div>

        </div>
    );
}
