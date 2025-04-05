
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.text());

app.post('/append-storage', (req, res) => {
    fs.appendFile('siteStorage.txt', req.body + '\n\n', (err) => {
        if (err) {
            res.status(500).send('Dosya kaydedilemedi');
            return;
        }
        res.send('Başarıyla kaydedildi');
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server çalışıyor...');
});
