require('dotenv').config()
const { Telegraf } = require('telegraf')
const api = require('covid19-api')
const Markup = require('telegraf/markup')
const countries = require('./constants')


const bot = new Telegraf(process.env['BOT_TOKEN'])
bot.start((ctx) => ctx.reply('привет ' + ctx.message.from.first_name + 'получить весь сисок стран можно командой /help',
    Markup.keyboard([
        ['US', 'Russia'],
        ['Ukraine', 'Kazakhstan']
    ])
        .resize()
        .extra()
));

bot.help((ctx) => ctx.reply(countries))
bot.on('text',
    async (ctx) => {
        let data = {};
        try {
            data = await api.getReportsByCountries(ctx.message.text)
            let formatData = `
            Страна: ${data[0][0].country}
            Случаи: ${data[0][0].cases}
            Смертей: ${data[0][0].deaths}
            Вылечилось: ${data[0][0].recovered}
        `
            ctx.reply(formatData)
        } catch {
            console.log('error');
            ctx.reply('такой страны нет((')
        }
    })
bot.hears('hi', (ctx) => ctx.reply('Hey there asd'))
bot.launch()
