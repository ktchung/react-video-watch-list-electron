/**
 * Simple implementation of scraper server
 * 
 * TODO: Implement in TypeScript
 */

const http = require('http');

const hostname = '0.0.0.0';
const port = 3001;

const { scrapeMetaData } = require('./scrapeMetaData');

const server = http.createServer(async (req, res) => {
  let errorMsg = '';

  try {
    const url = new URL(req.url, `https://${req.headers.host}`);

    // Accept /?url=<target URL>
    if (url.pathname === '/') {
      const {
        statusCode, data, error
      } = await scrapeMetaData(url.searchParams.get('url'));

      // Pass everything from scrapeMetaData into response
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.write(JSON.stringify({ status: statusCode, ...(data || {}), error }));
      res.end();
    } else {
      res.statusCode = 501;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Supported');
    }

    return;
  } catch (err) {
    errorMsg = err.message;
  }

  res.statusCode = 500;
  res.setHeader('Content-Type', 'text/plain');
  res.end(errorMsg || 'Internal Server Error');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const closeServer = () => {
  console.log('Server closing');

  server.close();
}

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
