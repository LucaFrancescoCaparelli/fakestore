import { useAppDispatch } from "./useApp";
import { addProduct, removeProduct } from "../store/features/whistListSlice";

export function useWhishListActions() {
  const dispatch = useAppDispatch();

  const addToWhishList = (product) => dispatch(addProduct(product));

  const removeFromWhisList = (id) => dispatch(removeProduct(id));

  return { addToWhishList, removeFromWhisList };
}
