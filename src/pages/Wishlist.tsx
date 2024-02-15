import React from "react";
import Navbar from "../components/Navbar";
import {useSelector} from "react-redux";
import {RootState} from "../utils/redux/store";
import ContentCanvas from "../utils/styledComponents/ContentCanvas";
import {Product} from "../utils/constants/constants";
import InfoCard from "../components/InfoCard";
import {createSelector} from "@reduxjs/toolkit";
import NoItems from "../components/NoItems";

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
            <Navbar data-testid="app-bar"/>
            <ContentCanvas data-testid="content-canvas" style={{width: "100%"}}>
                {selector.wishListIds.length !== 0
                    ? selector.wishListIds.map((e, i) => (
                        <InfoCard data-testid="card" productProps={getElement(e)} key={i}/>
                    ))
                    : <NoItems data-testid="no-item-container"/>
                }
            </ContentCanvas>
        </>
    );
}

export default Wishlist;
