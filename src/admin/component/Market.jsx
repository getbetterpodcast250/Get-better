import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Market() {
  const [productName, setProductName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const addProduct = async () => {
    if (!productName || !imageLink || !price || !contactInfo) {
      alert("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "products"), {
      ProductName: productName,
      ImageLink: imageLink,
      Price: price,
      ContactInfo: contactInfo,
    });

    setProductName("");
    setImageLink("");
    setPrice("");
    setContactInfo("");

    alert("Product Added!");
  };

  return (
    <div className="pageBox">
      <h2>Add Product</h2>

      <input
        className="inputField"
        placeholder="Product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <input
        className="inputField"
        placeholder="Link to image"
        value={imageLink}
        onChange={(e) => setImageLink(e.target.value)}
      />

      <input
        className="inputField"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="inputField"
        placeholder="Contact info (Whatsapp Number)"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
      />

      <button className="submitBtn" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
}
