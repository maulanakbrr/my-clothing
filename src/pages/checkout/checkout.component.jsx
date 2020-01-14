import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';

const CheckoutPage = ({cartItems, cartTotal}) => {
    console.log(cartItems);
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.length 
                    ? cartItems.map(cartItem => (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                    ))
                    : (
                        <div className="empty-cart">
                            <span>Your cart is empty</span>
                        </div>
                    )
            }
            <div className="total">TOTAL: ${cartTotal}</div>
            <div className="test-warning">
                *Please use the following test for credit card for payments*
                <br/>
                4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
            </div>
            <StripeCheckoutButton price={cartTotal}/>
        </div>
    )
}
    

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);