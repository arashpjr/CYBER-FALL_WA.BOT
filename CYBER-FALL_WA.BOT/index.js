const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers } = require("@whiskeysockets/baileys");
const fs = require("fs");

// وارد کردن دستورات
const aiCmd = require("./cmd/ai");
const helpCmd = require("./cmd/help");
const infoCmd = require("./cmd/info");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./sessions/master");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true,
        browser: Browsers.macOS("CYBER-FALL_WA.BOT")
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        const text = msg.message?.conversation;
        if (!text) return;

        const from = msg.key.remoteJid;

        // دستور .pair
        if (text.startsWith(".pair ")) {
            const code = text.split(" ")[1];
            const sessionDir = `./sessions/${code}`;
            if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir);
            await sock.sendMessage(from, { text: `Pair Code ساخته شد: ${code}\nربات شما فعال شد ✅` });
            return;
        }

        // دستورات پایه
        if (text === ".help") return helpCmd(sock, from);
        if (text === ".info") return infoCmd(sock, from);
        if (text.startsWith(".ai ")) return aiCmd(sock, from, text.slice(4));
    });
}

startBot();
