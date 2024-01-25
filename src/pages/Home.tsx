import {useEffect, useState} from "react";
import PageSelector from "../components/PageSelector";
import BasicPagination from "../components/BasicPagination";

const Home = () => {

    type UnparsedProduct = {
        first: number,
        next: number,
        prev: number,
        last: number,
        pages: number,
        items: number,
        data: Product[]
    };

    type Product = {
        id: string,
        company: string,
        model: string,
        year: number,
        vin: string,
        color: string,
        price: number
    };

    const [unparsedProducts, setUnparsedProducts] = useState<UnparsedProduct | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [elementsPerPage, setElementsPerPage] = useState<number>(10);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchUnparsedProducts = async (): Promise<UnparsedProduct> => {
            const response = await fetch(`http://localhost:3001/products?_page=${currentPage}&_per_page=${elementsPerPage}`);
            return await response.json();
        }

        const fetchProducts = async () => {
            const unparsedProducts = await fetchUnparsedProducts();
            setUnparsedProducts(unparsedProducts);
            setNumberOfPages(unparsedProducts.pages);
            setProducts(unparsedProducts.data);
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

    if (error) {
        return (
            <div>Error: {error}</div>
        );
    }

    return (
        <>
            <PageSelector onElementsPerPageChange={handleElementsPerPageChange} />
            <BasicPagination numberOfPages={numberOfPages} currentPage={handleCurrentPage}/>
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
