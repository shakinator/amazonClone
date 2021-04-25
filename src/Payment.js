import React, { useState, useEffect } from 'react';
import './Payment.css';
import {useStateValue} from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import {CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
function Payment() {
    const [{ basket ,user} ,dispatch] =useStateValue();
    const history = useHistory();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const stripe =useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    // useEffect will load when any of the payment component loads or there is any change in the variables in the bracket 
    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)
    //this useEffect function doing that whenever the basket
    // changes  it will make the request and it will update the special stripe secrete which allows us to charge the customer the correct amount 


    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload =await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation
            // this db code below is kind of like a line of process where we go to users then to their id then to their orders then we create a document with payment intent id 
            // and then we just add the .set information in it 


            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type:'EMPTY_BASKET'
            })


            history.replace('/orders')
        })

    }


    const handleChange = e => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details 
        setDisabled(Event.empty);
        setError(Event.error ? Event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>

                {/* Payemnt section - delivery address*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 react lane </p>
                        <p> adddress example </p>
                    </div>

                </div>

                {/* Payment section - Payment method*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery </h3>
                    </div>
                    <div className="payment__titles">
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

                {/* Paymment section - Payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* stripe will go here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            
                            <div className="payment__priceContainer">
                                 <CurrencyFormat renderText={(value) => (
                                     <h3> Order Total : {value}</h3>
                                 )}
                                 decimalScale = {2}
                                 value={getBasketTotal(basket)} 
                                 displayType= {"text"}
                                 thousandSeperator={true}
                                 prefix={"$"}
                                 />
                                 <button disabled= {processing ||disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                 </button>
                            </div>

                            {/* Error */}
                            {error &&<div>{error}</div>}
                        </form>


                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default Payment
