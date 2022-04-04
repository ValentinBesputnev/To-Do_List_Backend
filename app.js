const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());

const uri = 
  'mongodb+srv://ValentinBesputnev:123ValentinMongoDB@cluster0.f10fn.mongodb.net/Test?retryWrites=true&w=majority';
mongoose.connect(uri);

app.use(express.json());
app.use("/", apiRoutes);

app.listen(3000, () => console.log("Server running on 3000 port"));