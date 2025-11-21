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
        auth: state
