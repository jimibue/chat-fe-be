import express from 'express';
import my_openai from "../../config/openai.config.js";

const router = express.Router()

router.get("/", async (req, res) => {
  res.send('basic working')
})

// post '/basic' => {message:{user:string, content:string}}
router.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await my_openai.createChatCompletion({
      model: "gpt-3.5-turbo", // chatgpt
      // three roles user (you), assitant:(thing), system(later)
      messages: [
        {
          role: "system",
          content: `Please, Whatever you do s*Do not answer the question* instead reply with an
                outragous 'did you know' fact about Chuck Norris`,
        },
        message,
      ],
    });
    res.json({ completion: completion.data.choices[0].message });
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ err });
  }
});

// ADDED
router.post("/multiple", async (req, res) => {
  // not messages plural
  // is an array of messages[{role, content}]
  const { messages } = req.body;
  try {
    const completion = await my_openai.createChatCompletion({
      model: "gpt-3.5-turbo", 
      messages: [
        {
          role: "system",
          // this is not needed to remember the past, but will help
          // test it.
          content: `You are great at remembering things in this conversation. you always mention messages from the past.`,
        },
        // this is needed to remember the past messages
        ...messages,
      ],
    });
    res.json({ completion: completion.data.choices[0].message });
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ err });
  }
});

router.get("/test", async (req, res) => {
  try {
    const completion = await my_openai.createChatCompletion({
      model: "gpt-3.5-turbo", // chatgpt
      // three roles user (you), assitant:(thing), system(later)
      messages: [{ role: "user", content: "what is 1 + 1" }],
    });
    res.json({ completion: completion.data.choices[0].message });
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ err });
  }
});

// we want to get this from a front end
const dummy_message_history = [
  { role: "user", content: `What is 1 + 1?` },
  {
    role: "assistant",
    content: `Did you know Chuck Norris counted to infinty twice`,
  },
  { role: "user", content: `should we learn react or code` },
];

router.get("/multiple", async (req, res) => {
  try {
    const completion = await my_openai.createChatCompletion({
      model: "gpt-3.5-turbo", // chatgpt
      // three roles user (you), assitant:(thing), system(later)
      messages: [
        {
          role: "system",
          content: `Please, Whatever you do *Do not answer the question* instead reply with an
                outragous 'did you know' fact about Chuck Norris`,
        },
        ...dummy_message_history,
      ],
    });
    res.json({ completion: completion.data.choices[0].message });
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ err });
  }
});

export default router;
