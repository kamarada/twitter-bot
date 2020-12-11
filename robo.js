const Cron = require('node-cron');

const Twit = require('twit');

require('dotenv').config();

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
    tuitar('Olá, Twitter!');
}

// main();

Cron.schedule('*/2 * * * * *', () => {
    console.log('Esse agendamento roda segundo sim, segundo não');
});
