import * as http from 'http'; //ES 6

const server = http.createServer((req, res) => {
    // Sending the response 
    res.write("This is the response from the server")
    res.end();
})

server.listen((5555), () => {
    console.log("Server is Running");
})