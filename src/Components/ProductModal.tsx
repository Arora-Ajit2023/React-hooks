import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Product } from "../Interface";
const ProductModal = ({ isOpen, onClose, onSubmit, productToEdit }) => {
  console.log("productToEdit", productToEdit);
  const [productData, setProductData] = useState<Product>({
    id: productToEdit?.id || Math.random(),
    title: productToEdit?.title || "",
    price: productToEdit?.price || 0,
    description: productToEdit?.description || "",
    category: productToEdit?.category || "",
    image: productToEdit?.image || "",
    rating: productToEdit?.rating || { rate: 0, count: 0 },
  });

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(productData);
    onClose(); // Close the modal after submitting
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {productToEdit ? "Edit Product" : "Add Product"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Product Title"
            variant="outlined"
            fullWidth
            name="title"
            value={productData.title}
            onChange={handleInputChange}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            name="price"
            type="number"
            value={productData.price}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            name="category"
            value={productData.category}
            onChange={handleInputChange}
          />
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            name="image"
            value={productData.image}
            onChange={handleInputChange}
          />
          <TextField
            label="rating"
            variant="outlined"
            fullWidth
            name="image"
            value={productData.rating.rate}
            onChange={handleInputChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {productToEdit ? "Update Product" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
