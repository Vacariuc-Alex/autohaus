import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import PageSelector from "../components/PageSelector";
import BasicPagination from "../components/BasicPagination";
import CompanyFilter from "../components/CompanyFilter";
import InfoCard from "../components/InfoCard";
import ContentCanvas from "../utils/styledComponents/ContentCanvas";
import Flex from "../utils/styledComponents/Flex";

const Home = () => {

    type Product = {
        id: string,
        company: string,
        model: string,
        year: number,
        vin: string,
        color: string,
        price: number
    };

    const [unparsedProducts, setUnparsedProducts] = useState<AxiosResponse<any, any> | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [elementsPerPage, setElementsPerPage] = useState<number>(10);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [company, setCompany] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchUnparsedProducts = async (): Promise<AxiosResponse<any>> => {
            console.log(company)
            return await axios.get(`http://localhost:3001/products`, {
                params: {
                    _page: currentPage,
                    _per_page: elementsPerPage,
                    company: company //ToDo: Blocker, cannot pass more companies (see: CompanyFilter)
                }
            });
        }

        const fetchProducts = async () => {
            const unparsedProducts = await fetchUnparsedProducts();
            setUnparsedProducts(unparsedProducts);
            setNumberOfPages(unparsedProducts.data.pages);
            setProducts(unparsedProducts.data.data);
        }

        const fetchData = async () => {
            try {
                await fetchProducts();
            } catch (error: any) {
                setError(error.message);
            }
        }

        fetchData();
        //console.log('Hello'); //ToDo: Blocker, if i uncomment the console.log, there will be an infinite loop
    });

    const handleElementsPerPageChange = (e: number) => {
        setElementsPerPage(e);
    };

    const handleCurrentPage = (e: number) => {
        setCurrentPage(e);
    };

    const handleCompany = (e: string) => {
        setCompany(e);
    }

    if (error) {
        return (
            <div>Error: {error}</div>
        );
    }

    return (
        <>
            <Flex>
                <ContentCanvas>
                    {
                        products.map(e => (
                            <InfoCard elementProperties={e}/>
                        ))
                    }
                </ContentCanvas>
                <CompanyFilter companyProp={handleCompany}/>
            </Flex>
            <PageSelector onElementsPerPageChangeProp={handleElementsPerPageChange}/>
            <BasicPagination numberOfPagesProp={numberOfPages} currentPageProp={handleCurrentPage}/>
        </>
    );
}

export default Home;
