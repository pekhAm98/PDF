import { Queue } from "bullmq";
import { redis } from "../lib/redis";

const queue = new Queue("pdf-processing", {
  connection: redis,
});

async function clear() {
  await queue.obliterate({
    force: true,
  });

  console.log("Queue cleared");

  await queue.close();
}

clear();