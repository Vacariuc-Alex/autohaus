import {useEffect, useState} from "react";
import CompanyFilter from "src/components/CompanyFilter";
import InfoCard from "src/components/InfoCard";
import {ContentCanvas} from "src/utils/styledComponents/common/ContentCanvas";
import {Flex} from "src/utils/styledComponents/home/Flex";
import PageSelector from "src/components/PageSelector";
import BasicPagination from "src/components/BasicPagination";
import Navbar from "src/components/navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {fetchDataRequest} from "src/utils/redux/productsReducer";
import {RootState} from "src/utils/redux/store";
import {Product} from "src/utils/constants/constants";
import Loading from "src/components/Loading";
import ItemNotFound from "src/components/ItemNotFound";
import {createSelector} from "@reduxjs/toolkit";
import {setNumberOfPages} from "src/utils/redux/userSelectionReducer";
import {
    APP_BAR,
    BOX,
    BOX_COMPONENT,
    CARD,
    CONTENT_CANVAS,
    ERROR,
    FLEX,
    PAGINATION_STACK,
    RIGHT_PANEL
} from "src/utils/constants/dataTestIds";

const Home = () => {

    //Globals
    const LOADING_CONDITION = () => products?.length && searchedProducts?.length !== 0;

    // Redux hooks
    const dispatch = useDispatch();
    const productsStoreSelector = (state: RootState) => state.productsStore;
    const userSelectionStoreSelector = (state: RootState) => state.userSelectionStore;
    const selectorCombiner = (productsStoreSelector: any, userSelectionStoreSelector: any) => {
        return {productsStoreSelector, userSelectionStoreSelector}
    }
    const combinedSelector = createSelector(productsStoreSelector, userSelectionStoreSelector, selectorCombiner);
    const selector = useSelector(combinedSelector);

    //Redux Simplified variable names
    const companies = selector.userSelectionStoreSelector.selectedCompanies;
    const currentPage = selector.userSelectionStoreSelector.currentPage;
    const elementsPerPage = selector.userSelectionStoreSelector.elementsPerPage;

    //useState hooks
    const [products, setProducts] = useState<Product[]>([]); //Products to be displayed
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]); // Products that were found by searchbar text
    const [isHomePageLoaded, setIsHomePageLoaded] = useState<boolean>(false); //This variable is used for verifying that all other states are loaded correctly (only for Home page)

    //Saga destructor
    const {responseData, error, loading, isRequestExecuted} = selector.productsStoreSelector;

    //useEffect helpers
    const filterProductsByCompanies = (responseData: Product[], companies: string[]) => {
        return companies.length !== 0
            ? responseData.filter((e: Product) => companies.includes(e.company))
            : responseData;
    }

    const calculateNumberOfPages = (sortedProducts: Product[], elementsPerPage: number) => {
        return Math.ceil(sortedProducts.length / elementsPerPage)
    };

    const limitSortedProducts = (i: number, j: number, sortedProducts: Product[], elementsPerPage: number) => {
        return j < elementsPerPage && j < sortedProducts.length - (i * elementsPerPage)
    };

    const displayElements = () => {
        let sortedProducts: Product[] = filterProductsByCompanies(searchedProducts, companies);
        const calculatedPages = calculateNumberOfPages(sortedProducts, elementsPerPage);
        let pagedProducts: Product[][] = [];

        dispatch(setNumberOfPages(calculatedPages));
        for (let i = 0; i < calculatedPages; i++) {
            pagedProducts[i] = [];
            for (let j = 0; limitSortedProducts(i, j, sortedProducts, elementsPerPage); j++) {
                pagedProducts[i][j] = sortedProducts[i * elementsPerPage + j];
            }
        }
        setProducts(pagedProducts[currentPage - 1]);
    }

    //useEffects
    useEffect(() => {
        // By default, searchedProducts contains all fetched products
        if (searchedProducts.length !== 0) {
            setIsHomePageLoaded(true);
            displayElements();
        }
    }, [companies, currentPage, elementsPerPage, responseData, searchedProducts]);

    useEffect(() => {
        //To avoid fetching each time useNavigate is triggered
        if (!isRequestExecuted) {
            dispatch(fetchDataRequest());
        }
    }, [isRequestExecuted]);

    // Callback for searchbar in navbar
    const handleResultingData = (e: Product[]) => {
        setSearchedProducts(e);
    }

    //Pre-executed render block
    if (error) {
        return (
            <h1 data-testid={ERROR}>Error: {error}</h1>
        );
    } else if (loading) {
        return (
            <Loading data-testid={BOX}/>
        );
    }

    //Render
    const renderProductListOrNotFound = (() => {
        if (LOADING_CONDITION()) {
            return products.map((e, i) => (
                <InfoCard data-testid={CARD} productProps={e} key={i}/>
            ));
        } else if (isHomePageLoaded) {
            return (
                <ItemNotFound/>
            );
        }
    })();

    const renderPagination = (() => {
        if (LOADING_CONDITION() && isHomePageLoaded) {
            return (
                <>
                    <PageSelector data-testid={BOX_COMPONENT}/>
                    <BasicPagination data-testid={PAGINATION_STACK}/>
                </>
            );
        }
    })();


    return (
        <>
            <Navbar data-testid={APP_BAR} initialData={responseData} resultingData={handleResultingData}/>
            <Flex data-testid={FLEX}>
                <ContentCanvas data-testid={CONTENT_CANVAS}>
                    {renderProductListOrNotFound}
                </ContentCanvas>
                {LOADING_CONDITION() && <CompanyFilter data-testid={RIGHT_PANEL}/>}
            </Flex>
            {renderPagination}
        </>
    );
}

export default Home;
