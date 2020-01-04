import React from 'react';

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem: {imageUrl, name, quantity, price}}) => (
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt="item"/>
        </div>
        <span className="name">{name}</span>
        <span className="quantity">{quantity}x</span>
        <span className="price">${price * quantity}</span>
        <div className="remove-button">&#10006;</div>
    </div>
);

export default CheckoutItem;