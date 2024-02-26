import {useState} from "react";
import axios, {AxiosResponse} from "axios";
import {EMPTY_STRING, Product} from "src/utils/constants/constants";

axios.defaults.baseURL = "http://localhost:3001";

type Axios = {
    url: string;
    method: "post" | "put" | "delete";
    body?: Product;
}

const useAxios = () => {
    const [response, setResponse] = useState<AxiosResponse<any, any> | null>(null);
    const [error, setError] = useState(EMPTY_STRING);
    const [loading, setLoading] = useState(true);

    const executeHttpRequest = ({url, method, body}: Axios) => {
        axios[method](url, body)
            .then((response) => {
                setResponse(response);
            })
            .catch((error: Error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return {response, error, loading, executeHttpRequest};
};

export default useAxios;
