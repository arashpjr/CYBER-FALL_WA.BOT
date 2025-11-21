module.exports = {
    createSessionDir: (code) => {
        const fs = require("fs");
        const dir = `./sessions/${code}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        return dir;
    }
};
