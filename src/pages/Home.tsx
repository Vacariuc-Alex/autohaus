import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import PageSelector from "../components/PageSelector";
import BasicPagination from "../components/BasicPagination";
import CompanyFilter from "../components/CompanyFilter";

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
            <PageSelector onElementsPerPageChangeProp={handleElementsPerPageChange}/>
            <BasicPagination numberOfPagesProp={numberOfPages} currentPageProp={handleCurrentPage}/>
            <CompanyFilter companyProp={handleCompany}/>
            {
                products.map(e => (
                    <>
                        <p>{e.id}</p>
                        <p>{e.company}</p>
                        <p>{e.model}</p>
                        <p>{e.year}</p>
                        <p>{e.vin}</p>
                        <p>{e.color}</p>
                        <p>{e.price}</p>
                        <br/>
                        <hr/>
                    </>
                ))
            }
        </>
    );
}

export default Home;
