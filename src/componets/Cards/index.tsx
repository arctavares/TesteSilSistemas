import { useEffect, useState } from "react";
import "./Cards.css";
import axios from 'axios';

export default function Cards() {

    const [covidData, setCovidData] = useState({cases: 0});
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState('RJ');
    const [country, setCountry] = useState('BR');
    const [newsData, setNewsData] = useState({articles: []});

    const NEWS_API_KEY = '59f7bcd85f2c4ff7a912594ae830d2a2'; 
    // a key ficará aqui para que todos possam acessar
    const NEWS_URL = (country : string) => `https://newsapi.org/v2/top-headlines?country=${country}&category=business&apiKey=${NEWS_API_KEY}`

    type newsType = {
        url: string,
        title: string,
    }

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
            return <option key={uf}>{uf}</option>
        })
    }

    function handleUfCHange (e:React.ChangeEvent<HTMLSelectElement>) {
        setState(e.target.value);
        setLoading(true);
        axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${e.target.value}`)
            .then((res) => {
                const data = res.data;
                setCovidData(data);
            })
            .then(() => setLoading(false))
    }

    function handleContryChange(e:React.ChangeEvent<HTMLSelectElement>) {
        setCountry(e.target.value);
        setLoading(true);
        axios.get(NEWS_URL(e.target.value))
            .then((res) => {
                const data = res.data;
                setNewsData(data)
            })
            .then(() => setLoading(false))
    }

    function returnNews () {
        const {articles} = newsData;
        return articles.map((news:newsType) => {
            return (<li key={news.title}><a href={news.url}>{news.title}</a></li>)
        }
        )

    }

    useEffect(() => {
        setLoading(true);
        axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${state}`)
            .then((res) => {
                const data = res.data;
                setCovidData(data);
            })
        axios.get(NEWS_URL(country))
            .then((res) => {
                const data = res.data;
                setNewsData(data)
            })
            .then(() => setLoading(false))
    },[])

    return (
        <div className='cardsContainer'>
            <div className="covidInfoContainer card">
                {loading ? 'Loading...' : (
                    <>
                    <div className="selectRegion">
                        <h2 className="confirmedCasesTitle">Confirmed cases</h2>
                        <select onChange={handleUfCHange} value={state}>
                            {returnAllUF()}
                        </select>
                </div>
                <div className="numberOfCases">
                    <h2 className="numberOfInfecteds">{covidData.cases}</h2>
                </div>
                </>
                )}
                <div className="infoAboutCases">
                    <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html#:~:text=In%20those%20situations%2C%20use%20as,sick%20or%20who%20tested%20positive.">Learn how to prevent infections</a>
                </div>
            </div>
            <div className="newsContainer card">
            {loading ? 'Loading...' : (
                    <>
                    <div className="selectRegion">
                    <h2>Top posts</h2>
                    <div className="newsContainer">
                    <select onChange={(e) => handleContryChange(e)} value={country}>
                        <option value='BR'>BR</option>
                        <option value='US'>US</option>
                    </select>
                    </div>
                </div>
                <div className="numberOfNews">
                    <ul>
                        {returnNews()}
                    </ul>   
                </div>
                </>
                )}
                <div className="contact">
                   <p>Do you want more visits? Contact us!</p>
                </div>
            </div>
            <div className="reviewContainer card">
                <h1>Trustpilot</h1>
                <p className="reviewText">Show us your love by leaving a <span className="highlight">positive</span> review on trust pilot and recieve the extension of 50 additional products</p>
                <p><span className="highlight">Write a review on Trustpilot</span></p>
            </div>
        </div>
    )
}