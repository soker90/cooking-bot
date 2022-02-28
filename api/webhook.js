// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';

const TelegramBot = require('node-telegram-bot-api');

module.exports = async (request, response) => {
    try {
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

        bot.onText(/\/start/, (msg) => {
            bot.sendMessage(msg.chat.id, "Welcome");
            
        });

        const { body } = request;

        if (body.message) {
            const { chat: { id }, text } = body.message;

            const message = `✅ Este es el mensaje: *"${text}"*\¡Adios! 👋🏻`;

            await bot.sendMessage(id, message, {parse_mode: 'Markdown'});
        }
    }
    catch(error) {
        console.error('Error');
        console.log(error.toString());
    }
    
    response.send('OK');
};