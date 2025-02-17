import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import {
  addProduct,
  AddProduct,
  getProductList,
  updateProduct,
} from "../Api call";
import { useEffect, useReducer, useState } from "react";
// import { Product } from "../Interface";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { initialState, productReducer } from "../reducers/productReducer";
import ProductModal from "../Components/ProductModal";
import { Product } from "../Interface";
const ProductList = () => {
  // const [productListData, setProductListData] = useState<Product[]>([]);

  const [productListData, dispatch] = useReducer(productReducer, initialState);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "add" | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const productList = async () => {
    try {
      const response = await getProductList();
      console.log("response", response);
      if (response) {
        dispatch({ type: "SET_PRODUCTS", payload: response });
      }
      // setProductListData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    productList();
  }, []);

  const handleDelete = (id: number) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id });
  };

  const openAddProductModal = () => {
    setModalMode("add");
    setProductToEdit(null);
    setModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    console.log("tte", product);
    setModalMode("edit");
    setProductToEdit(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setProductToEdit(null);
    setModalMode(null);
  };

  const handleSubmitProduct = async (product: Product) => {
    if (modalMode === "add") {
      try {
        // Make an API call to update the product
        const newProduct = await addProduct(product);
        console.log("newProduct", newProduct);
        // Dispatch action to update the product in local state
        dispatch({ type: "ADD_PRODUCT", payload: newProduct });
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else if (modalMode === "edit" && productToEdit) {
      try {
        // Make an API call to update the product
        const updatedProduct = await updateProduct(product.id, product);
        console.log("updatedProduct", updatedProduct);

        // Dispatch action to update the product in local state
        dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };
  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "space-around" }}>
        <Typography>Product List</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={openAddProductModal}
          sx={{ mb: 2 }}
        >
          Add New Product
        </Button>
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          pt: 1,
          gap: 2,
        }}
      >
        {productListData.length > 0 &&
          productListData.map((productItem) => {
            return (
              <Card sx={{ width: 350 }} key={productItem?.id}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <DeleteOutlineIcon
                        sx={{ fontSize: "20px" }}
                        onClick={() => {
                          handleDelete(productItem.id);
                        }}
                      />
                      <EditOutlinedIcon
                        sx={{ fontSize: "20px" }}
                        onClick={() => openEditProductModal(productItem)}
                      />
                    </IconButton>
                  }
                  title={
                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                      {productItem.title}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
                      {productItem.category}
                    </Typography>
                  }
                />

                <CardMedia
                  component="img"
                  height="194"
                  image={productItem.image}
                  alt="Paella dish"
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {productItem.description}
                  </Typography>
                </CardContent>
                <Stack direction="row" sx={{ justifyContent: "space-around" }}>
                  <Rating
                    name="read-only"
                    value={productItem.rating.rate}
                    readOnly
                  />
                  <Typography>Price: {productItem.price}</Typography>
                </Stack>
              </Card>
            );
          })}
      </Box>
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitProduct}
        productToEdit={productToEdit}
      />
    </Box>
  );
};

export default ProductList;
