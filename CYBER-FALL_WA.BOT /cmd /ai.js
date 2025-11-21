module.exports = async (sock, from, message) => {
    await sock.sendMessage(from, { 
        text: `پیام شما دریافت شد:\n${message}`
    });
};
