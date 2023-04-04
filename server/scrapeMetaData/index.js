const https = require('https');

const scrapeMetaData = async (url) => {
  let response = { statusCode: 500, error: 'Error' };

  try {
    const origin = new URL(url).origin;

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
    
    const returnObj = { title, ogTitle, imgUrl };
    
    response = {
      statusCode: 200,
      data: returnObj
    };
  } catch (err) {
    response = {
      statusCode: 500,
      error: err.message
    }
  }

  return response;
}

module.exports = {
  scrapeMetaData
};
