import { useEffect, useState } from "react";
import "./Cards.css";
import axios from 'axios';

export default function Cards() {

    const [covidData, setCovidData] = useState({cases: 0});
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState('RJ');

    const allUF = [
            'AC',
            'AL' ,
            'AP' ,
            'AM' ,
            'BA' ,
            'CE' ,
            'DF' ,
            'ES' ,
            'GO' ,
            'MA' ,
            'MT' ,
            'MS' ,
            'MG' ,
            'PA' ,
            'PB' ,
            'PR' ,
            'PE' ,
            'PI' ,
            'RJ' ,
            'RN' ,
            'RS' ,
            'RO' ,
            'RR' ,
            'SC' ,
            'SP' ,
            'SE' ,
            'TO'
    ]

    function returnAllUF () {
        return allUF.map(uf => {
            return <option>{uf}</option>
        })
    }

    function handleChange (e:any) {
        setState(e.target.value);
        setLoading(true);
        axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${e.target.value}`)
            .then((res) => {
                const data = res.data;
                setCovidData(data);
            })
            .then(() => setLoading(false))
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${state}`)
            .then((res) => {
                const data = res.data;
                setCovidData(data);
            })
            .then(() => setLoading(false))
    },[])

    return (
        <div className='cardsContainer'>
            <div className="covidInfoContainer card">
                {loading ? 'Loading...' : (
                    <>
                    <div className="selectRegion">
                    <p>Confirmed cases</p>
                    <select onChange={handleChange} value={state}>
                        {returnAllUF()}
                    </select>
                </div>
                <div className="numberOfCases">
                    <h1>{covidData.cases}</h1>
                </div>
                </>
                )}
                <div className="infoAboutCases">
                    <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html#:~:text=In%20those%20situations%2C%20use%20as,sick%20or%20who%20tested%20positive.">Learn how to prevent infections</a>
                </div>
            </div>
            <div className="newsContainer card">
                news
            </div>
            <div className="reviewContainer card">
                review
            </div>
        </div>
    )
}