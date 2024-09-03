const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Rota para gerar o PDF
app.get('/api/generate-pdf', async (req, res) => {
    const url = req.query.url; // URL da página a ser convertida
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    await browser.close();

    // Define o cabeçalho para download do PDF
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="download.pdf"',
    });

    res.send(pdfBuffer);
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
