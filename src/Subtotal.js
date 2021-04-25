import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
    const history = useHistory();
    const [{ basket }, dispatch] = useStateValue();  
    return (
        <div className="subtotal">
            <CurrencyFormat 
             renderText={(value) =>(
                <>
                  <p>
                      Subtotal({basket.length} items): <strong>{value}</strong>
                  </p>
                  <small className="subtotal__gift">
                      <input type="checkbox" />This order contains a gift
                  </small>
                </>   
             )}
             decimalScale={2}
             value={getBasketTotal(basket)}
             displayType={"text"}
             thousandSeparator={true}
             prefix={"$"}
            /> 
            <button onClick={e => history.push('/payment')}>Proceed to Checkout</button> {/* this onClick={e => history.push('/payment')} is kind of like redireccting the page to the payment page  */}
            {/* this history.push will work according to its function without affeccting the styling of the button */}
        </div>
    );
}

export default Subtotal;
 