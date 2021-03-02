import { readFileSync } from 'fs'

import { sanitizeHtml } from './sanitizer'
import { ParsedRequest } from './types'

const twemoji = require('twemoji')
const twOptions = { folder: 'svg', ext: '.svg' }
const emojify = (text: string) => twemoji.parse(text, twOptions)

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString('base64')
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  'base64'
)
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  'base64'
)

function getCss(theme: string, fontSize: string) {
  let background = 'white'
  let foreground = 'white'

  if (theme === 'dark') {
    background = 'black'
    foreground = 'white'
  }
  return `
    @import url('https://fonts.googleapis.com/css?family=M+PLUS+1p');

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {http://localhost:3000/%E4%B8%80%E7%B7%92%E3%81%AB%E3%81%A7%E3%82%88%E3%83%BC%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%E3%81%86%E3%81%8A%E3%83%BC%EF%BC%81%EF%BC%81.png?theme=light&md=1&fontSize=60px&title=hack%20u%20&tag=%23react%20%23vercel
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        height: 100vh;
        display: flex;
        // text-align: center;
        align-items: center;
        justify-content: center;
        // padding: 12px;
        // margin-bottom: 10px;
        background-image: linear-gradient(315deg, #f9c5d1 0%, #9795ef 74%);
    }

    code {
        color: #D400FF;
        font-family: 'Vera', 'M PLUS 1p';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }


    .spacer {
        margin: 75px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'M PLUS 1p', 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        font-weight: 400;
        color: ${foreground};
        line-height: 1.3;
    }`
}

export function getHtml(parsedReq: ParsedRequest) {
  const {
    text,
    title,
    theme = 'light',

    fontSize = '60px',
    tag,
  } = parsedReq
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div>

            
    <div
    style="
    /*margin: 20px;*/
    border: 4px white solid;
    
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    padding: 8px 8px 4px 30px;
    margin-right: 66px;
    margin-left: 66px;
    font-weight: bold;
    
    "
    >
              <div class="heading" style="font-weight: 700;font-size: 66px">${emojify(
                sanitizeHtml(title[0])
              )}</div>
            
            <div class="heading" style="padding: 20px 0 20px 0;font-weight: 600;font-size: 58px">${emojify(
              sanitizeHtml(text)
            )}
            </div>
            
            
            <div class="heading" style="font-weight: 500;;font-size: 50px" >${emojify(
              sanitizeHtml(tag[0])
            )}</div>
            
            
                   <img 
                    src="https://images.microcms-assets.io/protected/ap-northeast-1:7b46820b-9e1b-4aab-ba38-e994b4176f3c/service/marina/media/nyan.jpg"

                    style="border-radius: 50%;"
                     width="110px"
                     
                />
            
                        

            
<!--            http://localhost:3000/%E4%B8%80%E7%B7%92%E3%81%AB%E3%81%A7%E3%82%88%E3%83%BC%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%E3%81%86%E3%81%8A%E3%83%BC%EF%BC%81%EF%BC%81.png?theme=light&md=1&fontSize=60px&title=hack%20u%20&tag=%23react%20%23vercel-->
            
            
            </div>
        </div>
    </body>
</html>`
}
