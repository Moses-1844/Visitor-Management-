const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS with specific options
server.use(cors({
  origin: 'http://localhost:4200', // Allow requests from localhost:4200
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
