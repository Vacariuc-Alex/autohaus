import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/utils/redux/store";
import {decryptText} from "src/utils/helpers/encryption";
import {AUTHENTICATED_USER, EMPTY_STRING, Product} from "src/utils/constants/constants";
import {fetchProductDataRequest} from "src/utils/redux/productsReducer";
import useAxios from "src/utils/hooks/useAxios";
import Navbar from "src/components/navbar/Navbar";
import FormDialog from "src/components/navbar/FormDialog";
import {
    FAILED_REQUEST,
    PRODUCT_DELETED_SUCCESSFULLY,
    PRODUCT_UPDATED_SUCCESSFULLY,
    UNKNOWN_REQUEST_TYPE
} from "src/utils/constants/alertMessages";
import ImageCarousel from "src/pages/elementDetails/ImageCarousel";
import PageNotFound from "src/pages/PageNotFound";
import ElementControls from "src/pages/elementDetails/ElementControls";
import ElementProperties from "src/pages/elementDetails/ElementProperties";
import {ElementDetailsContainer} from "src/utils/styledComponents/elementDetails/ElementDetailsContainer";
import {ElementDetailsPropertyList} from "src/utils/styledComponents/elementDetails/ElementDetailsPropertyList";
import {
    APP_BAR,
    DIALOG,
    ELEMENT_CONTROLS_CONTAINER,
    ELEMENT_DETAILS_CONTAINER,
    ELEMENT_DETAILS_PROPERTY_LIST,
    ELEMENT_PROPERTIES_CONTAINER
} from "src/utils/constants/dataTestIds";
import {createSelector} from "@reduxjs/toolkit";
import {removeItem} from "src/utils/redux/wishListReducer";
import {getItemFromLocalStorageWithExpiration} from "src/utils/helpers/sessionStorageWithExpiration";
import {areObjectsEqual} from "src/utils/helpers/areObjectsEqual";

const ElementDetails = () => {

    // Globals
    const authenticatedUser = getItemFromLocalStorageWithExpiration(AUTHENTICATED_USER);

    // Redux hooks
    const dispatch = useDispatch();
    const productsStoreSelector = (state: RootState) => state.productsStore;
    const wishListStoreSelector = (state: RootState) => state.wishListStore;
    const selectorCombiner = (productsStoreSelector: any, wishListStoreSelector: any) => {
        return {productsStoreSelector, wishListStoreSelector}
    }
    const combinedSelector = createSelector(productsStoreSelector, wishListStoreSelector, selectorCombiner);
    const selector = useSelector(combinedSelector);

    //Redux Simplified variable names
    const productResponseData: Product[] = selector.productsStoreSelector.responseData;
    const wishlistIds: string[] = selector.wishListStoreSelector.ids;

    // Other hooks
    const {id} = useParams();
    const {response, error, executeHttpRequest} = useAxios();

    // useState hooks
    const [elementId, setElementId] = useState<string>(EMPTY_STRING);
    const [product, setProduct] = useState<Product>();
    const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
    const [isDialogShown, setIsDialogShown] = useState<boolean>(false);

    // useEffect hook used for finding product by id in order to display
    const findElementByPassedIdFromEndpoint = () => {
        // Preventing undefined
        const elementId = id ? decryptText(id) : EMPTY_STRING;
        setElementId(elementId);

        const foundProduct = productResponseData.find((e: any) => {
            return elementId !== EMPTY_STRING && elementId === e.id;
        });
        setProduct(foundProduct);
    }

    useEffect(() => {
        if (productResponseData.length === 0) {
            dispatch(fetchProductDataRequest());
            return;
        }
        setIsPageLoaded(true);
        findElementByPassedIdFromEndpoint();
    }, [productResponseData, id]);

    // useEffect hook used to inform user about success or failure of http request
    const removeIdFromWishlistStore = () => {
        if (wishlistIds.includes(elementId)) {
            dispatch(removeItem(elementId));
        }
    }

    useEffect(() => {
        if (response && response.config.method) {
            switch (response.config.method.toLocaleLowerCase()) {
                case "put": {
                    alert(PRODUCT_UPDATED_SUCCESSFULLY);
                    window.location.reload();
                    break;
                }
                case "delete": {
                    alert(PRODUCT_DELETED_SUCCESSFULLY);
                    removeIdFromWishlistStore();
                    window.close();
                    break;
                }
                default: {
                    alert(UNKNOWN_REQUEST_TYPE);
                    window.location.reload();
                }
            }
        } else if (error) {
            alert(`${FAILED_REQUEST} ${error}`);
            window.location.reload();
        }
    }, [response, error]);

    // Handlers used for "put" http requests, which require form submission
    const handleFormSubmit = async (editedProduct: any, initialProduct: Product) => {
        executeHttpRequest({
            url: `/products/${elementId}`,
            method: "put",
            body: {
                id: `${elementId}`,
                company: editedProduct.company,
                model: editedProduct.model,
                year: editedProduct.year,
                vin: editedProduct.vin,
                color: editedProduct.color,
                price: editedProduct.price,
                owner: initialProduct.owner,
                images: editedProduct.images
            }
        });
    }

    const handleOnUpdateClick = () => {
        setIsDialogShown(true);
    }

    const handleCloseDialog = () => {
        setIsDialogShown(false);
    }

    //Handler used for "delete" http request
    const handleOnDeleteClick = () => {
        executeHttpRequest({
            url: `/products/${elementId}`,
            method: "delete"
        });
    }

    // Render
    if (product && isPageLoaded) {
        return (
            <>
                <Navbar data-testid={APP_BAR}/>
                <ElementDetailsContainer data-testid={ELEMENT_DETAILS_CONTAINER}>
                    <ImageCarousel product={product}/>
                    <ElementDetailsPropertyList data-testid={ELEMENT_DETAILS_PROPERTY_LIST}>
                        <ElementProperties data-testid={ELEMENT_PROPERTIES_CONTAINER} product={product}/>
                        {authenticatedUser && areObjectsEqual(product.owner, authenticatedUser.value) &&
                            <ElementControls
                                data-testid={ELEMENT_CONTROLS_CONTAINER}
                                handleOnDeleteClick={handleOnDeleteClick}
                                handleOnUpdateClick={handleOnUpdateClick}
                            />
                        }
                    </ElementDetailsPropertyList>
                </ElementDetailsContainer>

                {isDialogShown && product &&
                    <FormDialog
                        data-testid={DIALOG}
                        action="EDIT"
                        closeDialog={handleCloseDialog}
                        formSubmission={(editedProduct) => handleFormSubmit(editedProduct, product)}
                        product={product}
                    />
                }
            </>
        );
    } else if (isPageLoaded) {
        return (
            <>
                <PageNotFound/>
            </>
        );
    }
}

export default ElementDetails;
