import React from "react";
import Navbar from "../components/Navbar";
import {useSelector} from "react-redux";
import {RootState} from "../utils/redux/store";
import ContentCanvas from "../utils/styledComponents/ContentCanvas";
import {Product} from "../utils/constants/constants";
import InfoCard from "../components/InfoCard";
import {createSelector} from "@reduxjs/toolkit";

const Wishlist = () => {

    const selectWishListIds = (state: RootState) => state.wishListStore.ids;
    const selectResponseData = (state: RootState) => state.productsStore.responseData;
    const selectorOptions = (wishListIds: number[], responseData: Product[]) => {
        return {
            wishListIds,
            responseData
        };
    }

    const combinedSelector = createSelector(selectWishListIds, selectResponseData, selectorOptions);
    const selector = useSelector(combinedSelector);

    const getElement = (e: number): Product => {
        return selector.responseData[--e];
    }

    return (
        <>
            <Navbar/>
            <ContentCanvas style={{width: "100%"}}>
                {
                    selector.wishListIds.map((e, i) => (
                        <InfoCard productProps={getElement(e)} key={i}/>
                    ))
                }
            </ContentCanvas>
        </>
    );
}

export default Wishlist;
