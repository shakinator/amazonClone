import React from 'react';
import "./Checkout.css";
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from "./Subtotal";

function Checkout() {
    const[ { basket,user},dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg" alt=""></img>

                <div>
                    <h3>Hello, {user?.email}</h3> {/* this ? is  used to remove the bug where if we are not logged in it will not show us an error of email being null */ }
                    <h2 className="checkout__title">
                        Your Shopping Basket
                    </h2>

                    {basket.map(item =>(
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        rating={item.rating}
                        price={item.price}
                        image={item.image} 
                        
                        />
                    ))}

                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
