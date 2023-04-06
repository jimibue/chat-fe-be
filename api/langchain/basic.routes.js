import { OpenAI } from "langchain";
import express from 'express';
const router = express.Router()

export const basic_call = async () => {
  // temperature controls how random/creative the response is. It 
  const model = new OpenAI({
    temperature: 0.9,
  });

  const res = await model.call(
    "What would be a good company name a company that makes colorful socks?"
  );
  return res

};

router.get("/", async (req, res) => {
  let data = await basic_call()
  res.send({data})
})

export default router;

