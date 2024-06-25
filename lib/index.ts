#!/usr/bin/env node

import axios from "axios";
import { CosenseData } from "./cosenseData";
import { openai } from "./openai";

async function completion(prompt: string): Promise<string | null> {
  const chatCompletion = openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const message = (await chatCompletion).choices[0].message;
  return message.content;
}

async function fetchCosense(projectName: string): Promise<CosenseData> {
  const url = `https://scrapbox.io/api/pages/${projectName}?limit=1000`;
  const res = await axios.get(url);
  return res.data;
}

const main = async () => {
  const data = await fetchCosense(process.argv[2]);
  const texts = data.pages.map((page) => page.title);
  const res = await completion(`
    次のリストはあるWikiですでに書かれたページのタイトルとサマリーです。次に新しく書くとよさそうなページのタイトルをカンマ(,)区切りで16個出しなさい。
    すでにあるタイトルは絶対に含めないでください。
    ${texts.map((text) => text).join("\n")}
  `);

  res
    .replaceAll(/\s/g, "")
    .split(",")
    .forEach((title) => {
      console.log(`https://scrapbox.io/${process.argv[2]}/${title}`);
    });
};

main();
