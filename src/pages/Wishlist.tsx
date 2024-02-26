import React from "react";
import Navbar from "src/components/navbar/Navbar";
import {useSelector} from "react-redux";
import {RootState} from "src/utils/redux/store";
import {ContentCanvas} from "src/utils/styledComponents/common/ContentCanvas";
import {Product} from "src/utils/constants/constants";
import InfoCard from "src/components/InfoCard";
import {createSelector} from "@reduxjs/toolkit";
import NoFavouriteItems from "src/components/NoFavouriteItems";
import {APP_BAR, CARD, CONTENT_CANVAS, NO_ITEMS_CONTAINER} from "src/utils/constants/dataTestIds";

const Wishlist = () => {

    const selectWishListIds = (state: RootState) => state.wishListStore.ids;
    const selectResponseData = (state: RootState) => state.productsStore.responseData;
    const selectorCombiner = (wishListIds: string[], responseData: Product[]) => {
        return {
            wishListIds,
            responseData
        };
    }
    const combinedSelector = createSelector(selectWishListIds, selectResponseData, selectorCombiner);
    const selector = useSelector(combinedSelector);

    const getElement = (e: string): Product | undefined => {
        return selector.responseData.find((responseDataElement) => responseDataElement.id === e);
    }

    const renderProductsInWishList = (() => {
        if (selector.wishListIds.length !== 0) {
            return selector.wishListIds.map((e, i) => {
                const product = getElement(e);
                if (product) {
                    return <InfoCard data-testid={CARD} productProps={product} key={i}/>;
                }
                return <NoFavouriteItems data-testid={NO_ITEMS_CONTAINER}/>
            })
        }
        return <NoFavouriteItems data-testid={NO_ITEMS_CONTAINER}/>
    })();

    return (
        <>
            <Navbar data-testid={APP_BAR}/>
            <ContentCanvas data-testid={CONTENT_CANVAS}>
                {renderProductsInWishList}
            </ContentCanvas>
        </>
    );
}

export default Wishlist;
