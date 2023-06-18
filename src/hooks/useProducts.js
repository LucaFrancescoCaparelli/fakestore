import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useApp";
import { setProducts } from "../store/features/productsSlice.js";
import { PRODUCTS_URL } from "../utils";

const productsTexts = {
  errorFetching: "Somenthing went wrong with fetching products",
};

export function useProducts() {
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.products);

  function handlePreviousPage() {
    setOffset((offset) => offset - 10);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleNextPage() {
    setOffset((offset) => offset + 10);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const controller = new AbortController();

    async function getProducts() {
      try {
        setError("");
        setIsLoading(true);

        const response = await fetch(
          `${PRODUCTS_URL}?offset=${offset}&limit=12`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(productsTexts.errorFetching);
        }

        const data = await response.json();
        dispatch(setProducts(data));
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();

    return function () {
      controller.abort();
    };
  }, [offset, dispatch]);

  return {
    products,
    isLoading,
    error,
    offset,
    handlePreviousPage,
    handleNextPage,
  };
}
