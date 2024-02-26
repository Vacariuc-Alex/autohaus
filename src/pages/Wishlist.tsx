import React from "react";
import Navbar from "src/components/Navbar";
import {useSelector} from "react-redux";
import {RootState} from "src/utils/redux/store";
import ContentCanvas from "src/utils/styledComponents/ContentCanvas";
import {Product} from "src/utils/constants/constants";
import InfoCard from "src/components/InfoCard";
import {createSelector} from "@reduxjs/toolkit";
import NoFavouriteItems from "src/components/NoFavouriteItems";
import {APP_BAR, CARD, CONTENT_CANVAS, NO_ITEMS_CONTAINER} from "src/utils/constants/dataTestIds";

const Wishlist = () => {

    const selectWishListIds = (state: RootState) => state.wishListStore.ids;
    const selectResponseData = (state: RootState) => state.productsStore.responseData;
    const selectorCombiner = (wishListIds: number[], responseData: Product[]) => {
        return {
            wishListIds,
            responseData
        };
    }
    const combinedSelector = createSelector(selectWishListIds, selectResponseData, selectorCombiner);
    const selector = useSelector(combinedSelector);

    const getElement = (e: number): Product => {
        return selector.responseData[--e];
    }

    return (
        <>
            <Navbar data-testid={APP_BAR}/>
            <ContentCanvas data-testid={CONTENT_CANVAS} style={{width: "100%"}}>
                {selector.wishListIds.length !== 0
                    ? selector.wishListIds.map((e, i) => (
                        <InfoCard data-testid={CARD} productProps={getElement(e)} key={i}/>
                    ))
                    : <NoFavouriteItems data-testid={NO_ITEMS_CONTAINER}/>
                }
            </ContentCanvas>
        </>
    );
}

export default Wishlist;
