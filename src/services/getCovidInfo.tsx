import axios from "axios";

function getCovidData(
        uf:string, 
        setCovidData: Function,
        setCovidError: Function,
        setCovidLoading: Function,
    ) {
    return (
        axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`)
            .then((res) => {
                const data = res.data;
                setCovidData(data);
            })
            .catch(() => setCovidError(true))
            .then(() => setCovidLoading(false))
    )
}

export default getCovidData;