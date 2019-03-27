import express = require("express");

const app  = express();
app.use(express.json());
app.set("port", process.env.PORT || 3001);

// export out app
export default app;

