import React, { Fragment, useEffect } from 'react'
import MetaData from './layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import {Link} from 'react-router-dom';



    const Home = () => {
	
        const dispatch = useDispatch();
        
        const {loading,products,error, productsCount } = useSelector(state => state.products);
        
        useEffect( () => { 
            dispatch(getProducts())
        }, [dispatch] );
    

        return (
            <Fragment>
            <MetaData title={'Buy Best Products Online'} />
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                  <div className="row">
                      {products && products.map(product => (
                      <div keys={product._id }className="col-sm-12 col-md-6 col-lg-3 my-3">
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
                              <div className="rating-inner" style={ {width: `${(product.ratings / 5) * 100}%`}}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} reviews)</span>
                          </div>
                          <p className="card-text">${product.price}</p>
                          {/* <a href="#" id="view_btn" className="btn btn-block">View Details</a> */}
                          <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                        </div>
                      </div>
                    </div>
                          ))}
                    
                    </div>
                    </section>

                    
            </Fragment>
            );
        }
        

export default Home
