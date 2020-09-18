// require("dotenv/config");
const server = require("./server");

const port = 3000;

server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
