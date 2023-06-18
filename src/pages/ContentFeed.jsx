import { useProducts } from "../hooks/useProducts";
import { Col, Row } from "react-bootstrap";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

import { ProductsList } from "../components/ProductsList";
import { SkeletonsContainer } from "../components/SkeletonsContainer";
import { SelectPageButtons } from "../components/SelectPageButtons";
import { ErrorMessage } from "../components/ErrorMessage";

import { ButtonPage } from "../components/ButtonPage";

const pageTexts = {
  title: "product list",
  subtitle: "Find the product of your dreams",
  buttonPrevPage: "previous page",
  buttonNextPage: "next page",
};

export function ContentFeed() {
  const {
    products,
    isLoading,
    error,
    offset,
    handlePreviousPage,
    handleNextPage,
  } = useProducts();

  return (
    <>
      <h2 className='text-uppercase text-center my-5'>{pageTexts.title}</h2>
      <Row className='text-center mb-3'>
        <Col xs={12}>
          <p>{pageTexts.subtitle}</p>
        </Col>
      </Row>
      {isLoading && <SkeletonsContainer />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <ProductsList products={products} isWhishList={false} />

          <SelectPageButtons>
            <ButtonPage
              content={pageTexts.buttonPrevPage}
              icon={<FaRegArrowAltCircleLeft />}
              disabled={offset < 10}
              position='left'
              callback={handlePreviousPage}
            />

            <ButtonPage
              content={pageTexts.buttonNextPage}
              icon={<FaRegArrowAltCircleRight />}
              callback={handleNextPage}
            />
          </SelectPageButtons>
        </>
      )}
    </>
  );
}
