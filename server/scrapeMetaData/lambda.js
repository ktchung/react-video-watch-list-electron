/**
 * Lambda version
 * 
 * Paste content of this into AWS Lambda with Node.js 12.x
 */

const https = require('https');

exports.handler = async (event) => {
    let response = { statusCode: 500 };

    try {
        // TODO: Handle invalid query
        const url = new URL(event.queryStringParameters.url);
        
        const origin = url.origin;

        let pageText = '';

        pageText = await new Promise((resolve, reject) => {
            https.get(url, (res) => {
                res.on('data', (stream) => {
                  pageText += stream.toString();
                });
                res.on('end', () => resolve(pageText));
            }).on('error', (e) => {
                reject(Error(e));
            });
        });
    
        const headTag = pageText.substring(pageText.indexOf('<head>'), pageText.indexOf('</head>'));
    
        if (!headTag) {
            throw new Error('Unable to locate head tag');
        }
    
        let title = '';
        let ogTitle = '';
        let imgUrl = '';
    
        // TODO: Handle YouTube
        const titleTag = /<title>(.|\n)*<\/title>/.exec(headTag);
        const ogTitleTag = /<meta [^<]*property="og:title"[^>]*>/.exec(headTag);
        const ogImageTag = /<meta [^<]*property="og:image"[^>]*>/.exec(headTag);
    
        if (titleTag && titleTag[0]) {
            title = titleTag[0].replace('<title>', '').replace('</title>', '') || '';
        }
    
        if (ogTitleTag && ogTitleTag[0]) {
            ogTitle = /content="(.*)"/.exec(ogTitleTag[0])[1] || '';
        }
    
        if (ogImageTag && ogImageTag[0]) {
            imgUrl = /content="(.*)"/.exec(ogImageTag[0])[1] || '';
    
            if (!imgUrl.startsWith('http')) {
                imgUrl = `${origin}/${(imgUrl.startsWith('./') ? imgUrl.substring(2) : imgUrl)}`;
            }
        }
        
        const returnObj = {
            title, ogTitle, imgUrl  
        };
        
        response = {
            statusCode: 200,
            body: JSON.stringify(returnObj)
        };
    } catch (err) {
        response = {
            statusCode: 500,
            body: err.message
        };
    }

    return response;
};
