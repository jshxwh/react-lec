import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

const Home = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = useParams();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <div
                    keys={product._id}
                    className="col-sm-12 col-md-6 col-lg-3 my-3"
                  >
                    <div className="card p-3 rounded">
                      <img
                        className="card-img-top mx-auto"
                        src={product.images[0].url}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                          <a href="">{product.name}</a>
                        </h5>
                        <div className="ratings mt-auto">
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{
                                width: `${(product.ratings / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span id="no_of_reviews">
                            ({product.numOfReviews} reviews)
                          </span>
                        </div>
                        <p className="card-text">${product.price}</p>
                        {/* <a href="#" id="view_btn" className="btn btn-block">View Details</a> */}
                        <Link
                          to={`/product/${product._id}`}
                          id="view_btn"
                          className="btn btn-block"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
