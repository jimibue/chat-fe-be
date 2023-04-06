const router = require("express").Router();
const my_openai = require("../config/openai.config");

router.post("/", async (req, res) => {
  // not messages plural
  // is an array of messages[{role, content}]
  const { messages } = req.body;
  console.log('messages: ', messages)
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

module.exports = router;
