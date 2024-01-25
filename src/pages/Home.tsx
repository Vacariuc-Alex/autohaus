import {useEffect, useState} from "react";

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

    type PagedProduct = {
        first: number,
        next: number,
        prev: number,
        last: number,
        pages: number,
        items: number,
        data: Product[]
    };

    const [pagedProducts, setPpagedProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [elementsPerPage, setElementsPerPage] = useState<number>(5);
    const [page, setPage] = useState<number>(3);

    useEffect(() => {

        const fetchAllPagedProducts = async (): Promise<PagedProduct> => {
            const response = await fetch(`http://localhost:3001/products?_page=${page}&_per_page=${elementsPerPage}`);
            return await response.json();
        }

        const fetchAllProducts = async (): Promise<Product[]> => {
            return await fetchAllPagedProducts().then(e => e.data);
        }

        const fetchData = async () => {
            try {
                const products = await fetchAllProducts();
                setProducts(products);
            } catch (error: any) {
                setError(error.message);
            }
        }

        fetchData();
    });

    if(error) {
        return (
            <div>Error: {error}</div>
        );
    }

    return (
        <>
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
                        <br/><hr/>
                    </>
                ))
            }
        </>
    );
}

export default Home;