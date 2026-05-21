const https = require('https');
https.get('https://vinothqaacademy.com/alert-and-popup/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
