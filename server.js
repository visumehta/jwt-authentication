const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const JWT_SECRET = "your-secret-key"; // For learning purposes only

// Add CORS headers
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Login endpoint
server.post("/components/login", (req, res) => {
  console.log("Login request received:", req.body);

  const { username, password } = req.body;
  const user = router.db.get("users").find({ username, password }).value();

  if (user) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Generated token:", token);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } else {
    console.log("Invalid credentials for:", username);
    res.status(401).json({ error: "Invalid credentials" });
  }
});

server.use(router);
server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
  console.log("Available endpoints:");
  console.log("- POST /components/login");
  console.log("- Other json-server routes");
});
