
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

let codes = JSON.parse(fs.readFileSync('./codes.json'));

app.get('/invite', (req, res) => {
    const code = req.query.code;
    if (!code || !codes[code]) {
        return res.send("رمز غير صالح.");
    }

    if (codes[code].used) {
        return res.send("تم استخدام هذا الرابط من قبل.");
    }

    codes[code].used = true;
    codes[code].usedAt = new Date().toISOString();
    fs.writeFileSync('./codes.json', JSON.stringify(codes, null, 2));
    return res.send("تم تأكيد حضورك، نشوفك على خير!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
