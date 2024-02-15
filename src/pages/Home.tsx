import {useEffect, useState} from "react";
import CompanyFilter from "../components/CompanyFilter";
import InfoCard from "../components/InfoCard";
import ContentCanvas from "../utils/styledComponents/ContentCanvas";
import Flex from "../utils/styledComponents/Flex";
import PageSelector from "../components/PageSelector";
import BasicPagination from "../components/BasicPagination";
import Navbar from "../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {fetchDataRequest} from "../utils/redux/productsReducer";
import {RootState} from "../utils/redux/store";
import {Product} from "../utils/constants/constants";
import Loading from "../components/Loading";

const Home = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state: RootState) => {
        return state.productsStore;
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [companies, setCompanies] = useState<string[]>([]);
    const [elementsPerPage, setElementsPerPage] = useState<number>(10);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {responseData, error, loading, isRequestExecuted} = selector;

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
        let sortedProducts: Product[] = filterProductsByCompanies(responseData, companies);
        const calculatedPages = calculateNumberOfPages(sortedProducts, elementsPerPage);
        let pagedProducts: Product[][] = [];

        setNumberOfPages(calculatedPages);
        for (let i = 0; i < calculatedPages; i++) {
            pagedProducts[i] = [];
            for (let j = 0; limitSortedProducts(i, j, sortedProducts, elementsPerPage); j++) {
                pagedProducts[i][j] = sortedProducts[i * elementsPerPage + j];
            }
        }

        // Ensures that the products will be set only after all variables are loaded
        setProducts((prev) => {
            return pagedProducts.length !== 0 ? pagedProducts[currentPage - 1] : prev;
        });
    }

    useEffect(() => {
        displayElements();
    }, [companies, currentPage, elementsPerPage, responseData]);

    useEffect(() => {
        if (!isRequestExecuted) {
            dispatch(fetchDataRequest());
        }
    }, [isRequestExecuted]);

    const handleElementsPerPageChange = (e: number) => {
        setCurrentPage(1);
        setElementsPerPage(e);
    };

    const handleCurrentPage = (e: number) => {
        setCurrentPage(e);
    };

    const handleCompanies = (e: string[]) => {
        setCurrentPage(1);
        setCompanies(e);
    }

    if (error) {
        return (
            <h1 data-testid="error">Error: {error}</h1>
        );
    } else if (loading) {
        return (
            <Loading data-testid="q"/>
        );
    }

    return (
        <>
            <Navbar data-testid="app-bar"/>
            <Flex data-testid="flex">
                <ContentCanvas data-testid="content-canvas">
                    {
                        products.map((e, i) => (
                            <InfoCard data-testid="card" productProps={e} key={i}/>
                        ))
                    }
                </ContentCanvas>
                <CompanyFilter data-testid="right-panel" companiesProps={handleCompanies}/>
            </Flex>
            <PageSelector data-testid="box-component" onElementsPerPageChangeProp={handleElementsPerPageChange}/>
            <BasicPagination
                data-testid="pagination-stack"
                numberOfPagesProp={numberOfPages}
                currentPageProp={handleCurrentPage}
            />
        </>
    );
}

export default Home;
