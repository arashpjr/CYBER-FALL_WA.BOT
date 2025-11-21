module.exports = async (sock, from) => {
    await sock.sendMessage(from, {
        text: "دستورات CYBER-FALL_WA.BOT:\n\n.pair [code]\n.ai [متن]\n.info\n.help"
    });
};
