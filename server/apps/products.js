import { Router } from "express";
import { client } from "../utils/db.js"; 
import { ObjectId } from "mongodb";


const productRouter = Router();

productRouter.get("/", async (req, res) => {
    try {
      const db = client.db("practice-mongo");
      const collection = db.collection("products");
      const products = await collection.find().toArray();
  
      res.status(200).json({
        data: products
         
         });
    } catch (error) {
      console.error("❌ Error retrieving products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  try {
    const db = client.db("practice-mongo"); 
    const collection = db.collection("products");

    const productData = { ...req.body };
    const result = await collection.insertOne(productData);

    res.status(201).json({
      message: "Product has been created successfully",
      productId: result.insertedId,
    });
  } catch (error) {
    console.error("❌ Error inserting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
 
});

productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;

  
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const db = client.db("practice-mongo");
    const collection = db.collection("products");

    const { name, price, image, description } = req.body;
    const updateData = { name, price, image, description };

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product has been updated successfully"
    });

  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const db = client.db("practice-mongo");
    const collection = db.collection("products");

    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product has been deleted successfully"
    });

  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default productRouter;