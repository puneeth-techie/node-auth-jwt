const app = require('./startup/app');
const http = require('http');

const server = http.createServer(app);

const port = process.env.PORT || 5000;

//startup database
require('./startup/db')();

//startup server
server.listen(port, () => {
    console.log('----------------------------------------------');
    console.log(`Server started listening on port ${port}`);
});