const TelegramBot = require('node-telegram-bot-api')
const axios = require("axios");
const fs = require('fs')
const TELEGRAM_BOT_TOKEN = '8152393354:AAFnxdyIIBXnyPSVju3heLWTJHT3oreMDDU'
const API_URL = "https://instagram-downloader-api.milancodess.repl.co/";
const {videoDownloader} = require('./request')

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params:{
            timeout: 10
        }
    }
})
console.log("Бот запущен...");


bot.on('message',  async (msg) =>{
  if(msg.text === '/instagram'){
      const chatId = msg.chat.id
      try {
          await bot.sendMessage(chatId, "👋 Привет! Отправьте мне ссылку на видео из Instagram, и я загружу его для вас.");
          if(msg.text && msg.text.includes('instagram.com')){
              const loadingMessage = await bot.sendMessage(chatId, "⏳ Подождите, загружаю ваше видео...");
              const getVideoUrl = await videoDownloader(msg.text)
              await bot.sendVideo(chatId, getVideoUrl.videoUrl, {
                  caption: getVideoUrl.caption + `\n Разработчик: @ecosyst_uz`
              })
              await bot.deleteMessage(chatId, loadingMessage.message_id);
          }
      }
      catch (error){
          console.log(error)
          bot.sendMessage(chatId, "⚠ Произошла ошибка при загрузке видео. Попробуйте позже.");
      }
  }

})

bot.on('message', msg =>{
    const chatId = msg.chat.id
    const userName = msg.chat.first_name
    const htmlText = `
<b>Привет ${userName}! 👋</b>
<b>Добро пожаловать на наш бот для скачивания видео из Инстаграма</b>

<i>Отправьте мне ссылку на видео из Instagram, и я загружу для вас за один клик."</i>
    `
    if(msg.text === '/start'){
        bot.sendPhoto(chatId, './images/banner.jpg', {
            caption: htmlText,
            parse_mode: 'HTML',
            reply_markup:{
                inline_keyboard: [
                    [
                        {
                            text: 'Скачать видео из Инстаграма 📲',
                            callback_data: 'insta_download'
                        }
                    ]
                ]
            }
        })
    }
})

bot.on('callback_query', async (query)=>{
    const chatId = query.message.chat.id
        const data = query.data
   try{
       if(data === 'insta_download'){
           await bot.sendMessage(chatId, "Отправьте мне ссылку на видео из Instagram, и я загружу его для вас.")
          bot.on('message', async function (msg){
              if(msg.text && msg.text.includes('instagram.com')) {
                  const loadingMessage = await bot.sendMessage(chatId, "⏳ Подождите, загружаю ваше видео...");
                  const getVideoUrl = await videoDownloader(msg.text)
                  await bot.sendVideo(chatId, getVideoUrl.videoUrl, {
                      caption: getVideoUrl.caption + `\n Разработчик: @ecosyst_uz`
                  })
                  await bot.deleteMessage(chatId, loadingMessage.message_id);
              }
          })
       }
       bot.answerCallbackQuery(query.id);
   }
   catch (error){
        console.log(error + 'xaminmi')
   }
})


bot.onText(/\/audio/,  async (msg) =>{
   await bot.sendMessage(msg.chat.id, "Sending mp3...")
    await bot.sendAudio(msg.chat.id, './audoi/mp4.m4a')
    await bot.sendMessage(msg.chat.id, "Successfully received")
    await bot.deleteMessage(msg.chat.id, audioText.message_id)
   //  fs.readFile(__dirname + './audoi/mp4.m4a', (err, data)=>{
   //      console.log(data + "test")
   //      bot.sendAudio(msg.chat.id, data).then(()=>{
   //          bot.sendMessage(msg.chat.id, 'updated finished')
   //      })
   //  })
})


// bot.onText(/\/location/, msg=>{
//     bot.sendLocation(msg.chat.id, 39.772177, 64.409579)
// })
// 39.772177, 64.409579

//send contact to user
// bot.onText(/\/contact/, msg=>{
//     bot.sendContact(msg.chat.id, "998336602121", "Karimov Temur")
// })



// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, "👋 Привет! Отправьте мне ссылку на видео из Instagram, и я загружу его для вас.");
// });
//
// bot.on("message", async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;
//
//     // Проверяем, является ли сообщение ссылкой на Instagram
//     if (text && text.includes("instagram.com")) {
//         bot.sendMessage(chatId, "⏳ Подождите, загружаю ваше видео...");
//
//         try {
//             // Отправляем запрос к API
//             const response = await axios.get(`${API_URL}?url=${text}`);
//
//             if (response.data && response.data.link) {
//                 const videoUrl = response.data.link;
//
//                 // Отправляем видео пользователю
//                 await bot.sendVideo(chatId, videoUrl, { caption: "🎥 Вот ваше видео!" });
//             } else {
//                 bot.sendMessage(chatId, "❌ Не удалось найти видео по данной ссылке. Попробуйте еще раз.");
//             }
//         } catch (error) {
//             console.error("Ошибка при загрузке видео:", error);
//             bot.sendMessage(chatId, "⚠ Произошла ошибка при загрузке видео. Попробуйте позже.");
//         }
//     } else if (text !== "/start") {
//         bot.sendMessage(chatId, "❓ Пожалуйста, отправьте ссылку на видео из Instagram.");
//     }
// });


//398062629:TEST:999999999_F91D8F69C042267444B74CC0B3C747757EB0E065

bot.onText(/\/payment/, msg=>{
    const chatId = msg.chat.id
    bot.sendInvoice(
        chatId,
        "Instagram Video Downloader pro",
        "Download videos unlimited time and faster",
        'payload',
        "398062629:TEST:999999999_F91D8F69C042267444B74CC0B3C747757EB0E065",
        "UZS",
        [
            {
                label: "Subscribe for month",
                amount: 10000000
            }
        ],
        {
            photo_url: "https://www.iphones.ru/wp-content/uploads/2024/03/telegram-mods.jpg",
            need_name: true,
            is_flexible: true

        }

    )
})

bot.on("shipping_query", query=>{
    bot.answerShippingQuery(query.id, true, [
        {
            id: "Delivery standart",
            title: "Стандартная доставка",
        }
    ])
})

bot.on("pre_checkout_query", (query)=>{
    bot.answerPreCheckoutQuery(query.id, true).catch(console.error)
})

bot.on("successful_payment", (msg)=>{
    console.log("Успешный платеж:", msg.successful_payment);
    bot.sendMessage(msg.chat.id, "Спасибо за покупку! Ваш заказ обработан.");
})