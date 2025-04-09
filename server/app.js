import express from "express";
import cors from "cors";
import productRouter from "./apps/products.js";
import { client } from "./utils/db.js";

async function init() {
  const app = express();
  const port = 4001;

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // หยุดเซิร์ฟเวอร์หากเชื่อมต่อ MongoDB ไม่ได้
  }

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/products", productRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`🚀 Server is running at port ${port}`);
  });
}

init();
