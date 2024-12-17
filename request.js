const axios = require('axios')
const {request} = require("axios");
async function videoDownloader (insta_url){

  try {
      // const options = {
      //     method: 'GET',
      //     url: 'https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/convert',
      //     params: {
      //         url: 'https://www.instagram.com/reel/DDoOK73MPQk/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      //     },
      //     headers: {
      //         'x-rapidapi-key': '804fb327c7msh275739fcb904e89p1b3e4fjsnf980a59a659a',
      //         'x-rapidapi-host': 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com'
      //     }
      // };

      const options = {
          method: 'GET',
          url: 'https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi',
          params: {
              url: insta_url
          },
          headers: {
              'x-rapidapi-key': '804fb327c7msh275739fcb904e89p1b3e4fjsnf980a59a659a',
              'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
          }
      };
      const response = await request(options)
        const result = {
            videoUrl: response.data.download_url,
            caption: response.data.caption
        }
        return result
  }catch (error){
      console.log(error)
  }
}
// videoDownloader()
module.exports={
    videoDownloader
}