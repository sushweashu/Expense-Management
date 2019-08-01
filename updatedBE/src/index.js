const http = require('http');
const mongoose = require('mongoose');

const app = require('./server');
const constant = require('./utils/constant')

// Creating server with express app;
const server = http.createServer(app);
server.listen(constant.PORT);

server.on('listening', () => {
    console.log(`server is running at ${constant.PORT}`);
});

server.on('error', (e) => {
    console.error('Something went wrong!', e);
});

// Connect mongo db 
mongoose.connect(constant.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true }, (error) => {
    if (error) {
        console.log('MongoDB connection error', error);
    } else {
        console.log(`MongoDB connected successfully.`);
    }
});

process.on('uncaughtException', function (err) {
    console.log('Fatal Error', err);
    console.log('Caught exception:', err.stack);
});