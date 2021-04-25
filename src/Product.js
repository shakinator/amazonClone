import React from 'react';
import "./Products.css";
import { useStateValue } from './StateProvider';

function Product({title,image,price,rating,id}) {
    const [{basket},dispatch] = useStateValue();


    const addToBasket = () => {
        //dispatch the item in data layer 
        dispatch({
            type:"ADD_TO_BASKET",
            item: {
                title:title,
                id:id,
                image:image,
                price:price,
                rating:rating,
            },
        
        });

    }

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i)=> (
                        <p>🌟</p>
                    ))}
                </div>
            </div>
            <img src={image} className="" alt=""></img>
            <button onClick={addToBasket}>Add to basket</button>
        </div>
    )
}

export default Product
