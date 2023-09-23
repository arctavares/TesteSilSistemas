import { useEffect, useState } from "react";
import "./Cards.css";
import axios from 'axios';
import loadingSpinner from '../../icons/1494.gif';
import getCovidData from "../../services/getCovidInfo";

export default function Cards() {

    const [covidData, setCovidData] = useState({cases: 0});
    const [covidLoading, setCovidLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(true);
    const [state, setState] = useState('RJ');
    const [country, setCountry] = useState('BR');
    const [newsData, setNewsData] = useState({articles: []});
    const [covidError, setCovidError] = useState(false);
    const [newsError, setNewsError] = useState(false);

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
        setCovidLoading(true);
        getCovidData(e.target.value, setCovidData, setCovidError, setCovidLoading)
    }

    function handleContryChange(e:React.ChangeEvent<HTMLSelectElement>) {
        setCountry(e.target.value);
        setNewsLoading(true);
        axios.get(NEWS_URL(e.target.value))
            .then((res) => {
                const data = res.data;
                setNewsData(data)
            })
            .then(() => setNewsLoading(false))
    }

    function returnNews () {
        const {articles} = newsData;
        return articles.map((news:newsType) => {
            return (<li key={news.title}><a href={news.url}>{news.title}</a></li>)
        }
        )

    }

    function handleCovidReload () {
        setCovidLoading(true)
        getCovidData(state, setCovidData, setCovidError, setCovidLoading)
    }

    function handleNewsReload () {
        setNewsLoading(true)
        axios.get(NEWS_URL(country))
            .then((res) => {
                const data = res.data;
                setNewsData(data);
                setNewsError(false);
                setNewsLoading(false)
            })
            .catch(() => setNewsError(true))
    }

    useEffect(() => {
        setCovidLoading(true);
        getCovidData(state,setCovidData, setCovidError, setCovidLoading)
        
            axios.get(NEWS_URL(country))
            .then((res) => {
                const data = res.data;
                setNewsData(data)
                setNewsLoading(false);
            })
            .catch(() => {
                setNewsLoading(false)
                setNewsError(true)
            })
        
    },[])

    return (
        <div className='cardsContainer'>
            <div className="covidInfoContainer card">

                {covidLoading ? <img src={loadingSpinner}/> : (
                    <>
                    <div className="selectRegion">
                        <h2 className="confirmedCasesTitle">Confirmed cases</h2>
                        <select onChange={handleUfCHange} value={state}>
                            {returnAllUF()}
                        </select>
                        </div>
                    {covidError ? (
                        <div className="errorContainer">
                            <h1>Request failed!</h1>
                            <button type="button" onClick={handleCovidReload}>Reload!</button>
                        </div>
                    ) : (
                        <>
                        
                <div className="numberOfCases">
                    <h2 className="numberOfInfecteds">{covidData.cases}</h2>
                </div>
                        </>
                    )}
                    
                    </>
                )}

                <div className="infoAboutCases">
                    <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html#:~:text=In%20those%20situations%2C%20use%20as,sick%20or%20who%20tested%20positive.">Learn how to prevent infections</a>
                </div>
            </div>
            <div className="newsContainer card">
            {newsLoading ? <div className="loadingContainer"><img src={loadingSpinner}/></div> : (
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
                {newsError ? (
                    <div className="errorContainer">
                        <h1>Request failed!</h1>
                        <button type="button" onClick={handleNewsReload}>Reload!</button>
                    </div>
                ) : (
                <div className="numberOfNews">
                    <ul>
                        {returnNews()}
                    </ul>   
                </div>
                )}
                
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