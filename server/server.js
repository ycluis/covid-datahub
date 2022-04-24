const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const startServer = async () => {
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

startServer();
