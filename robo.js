const Cron = require('node-cron');

const puppeteer = require('puppeteer');

const Twit = require('twit');

require('dotenv').config();

async function obterNumeroDeRecuperados() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1024,
        height: 768,
    });
    await page.goto('https://covid.saude.gov.br/', {
        timeout: 60*1000,
        waitUntil: 'networkidle2'
    });
    var recuperados = await page.evaluate(() => {
        var numeroNaPagina = document.getElementsByClassName('lb-total')[0].lastChild.data.trim();
        return numeroNaPagina
    });
    await browser.close();
    return recuperados;
}

function tuitar(mensagem) {
    var twitter = new Twit({
        consumer_key:         process.env.CONSUMER_KEY,
        consumer_secret:      process.env.CONSUMER_SECRET,
        access_token:         process.env.ACCESS_TOKEN,
        access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
        timeout_ms:           60*1000,
        strictSSL:            true
    });
    twitter.post('statuses/update',
    {
        status: mensagem
    },
    function(err, data, response) {
        console.log(data)
    });
}

async function main() {
    var recuperados = await obterNumeroDeRecuperados();
    console.log(recuperados);
}

main();
