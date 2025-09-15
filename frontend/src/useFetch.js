import { useEffect, useState } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return;

        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => {
                console.error("Error fetching data:", error);
                setData(null);
            })
            .finally(() => setLoading(false));
    }, [url]);

    return { data };
}