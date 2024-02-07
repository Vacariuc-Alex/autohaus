import {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

type Axios = {
    url: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete'
}

const useAxios = ({url, method}: Axios) => {
    const [response, setResponse] = useState<AxiosResponse<any, any> | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);


    const fetchData = () => {
        axios[method](url)
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

    useEffect(() => {
        fetchData();
    }, []);

    return {response, error, loading};
};

export default useAxios;
