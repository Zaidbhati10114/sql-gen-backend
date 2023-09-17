const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
dotenv.config();

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
});

app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/completions", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Create a SQL request to" + req.body.message },
      ],
    });

    res.send(completion.choices[0].message);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
