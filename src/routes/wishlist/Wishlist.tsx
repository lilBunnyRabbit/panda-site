import React from 'react';
import { useWishlistStyle } from "./WishlistStyle";

export function Wishlist() {
    const classes = useWishlistStyle();

    return (
        <div className={classes.root}>
            Template
        </div>
    )
}