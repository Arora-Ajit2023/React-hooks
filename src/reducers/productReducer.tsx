import { Product } from "../Interface";

export const initialState: Product[] = [];

type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "REMOVE_PRODUCT"; payload: number }
  | { type: "UPDATE_PRODUCT"; payload: Product };

export const productReducer = (state: Product[], action: Action): Product[] => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return action.payload;
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "REMOVE_PRODUCT":
      return state.filter((product) => product.id !== action.payload);
    case "UPDATE_PRODUCT":
      return state.map((product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product
      );
    default:
      return state;
  }
};
