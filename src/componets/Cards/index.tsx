import { useEffect, useState } from "react";
import "./Cards.css";
import getCovidData from "../../services/getCovidInfo";
import getNewsInfo from "../../services/getNewsInfo";
import Card from '../Card';

export default function Cards() {

    const [covidData, setCovidData] = useState({cases: 0});
    const [covidLoading, setCovidLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(true);
    const [state, setState] = useState('RJ');
    const [country, setCountry] = useState('BR');
    const [newsData, setNewsData] = useState({articles: []});
    const [covidError, setCovidError] = useState(false);
    const [newsError, setNewsError] = useState(false);


    type newsType = {
        url: string,
        title: string,
    }

    const allUF = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    function handleUfChange (e:React.ChangeEvent<HTMLSelectElement>) {
        setState(e.target.value);
        setCovidLoading(true);
        getCovidData(e.target.value, setCovidData, setCovidError, setCovidLoading)
    }

    function handleContryChange(e:React.ChangeEvent<HTMLSelectElement>) {
        setCountry(e.target.value);
        setNewsLoading(true);
        getNewsInfo(e.target.value, setNewsData, setNewsLoading, setNewsError);
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
        getCovidData(state, setCovidData, setCovidError, setCovidLoading)
    }

    useEffect(() => {
        setCovidLoading(true);
        getCovidData(state,setCovidData, setCovidError, setCovidLoading)
        getNewsInfo(country, setNewsData, setNewsLoading, setNewsError);
    },[])

    return (
        <div className='cardsContainer'>
            <div className="covidInfoContainer card">

                <Card
                    title={'Confirmed cases'}
                    loading={covidLoading}
                    error={covidError}
                    onReload={handleCovidReload}
                    handleChange={handleUfChange}
                    defaultValue={state}
                    options={allUF}
                >

                <div className="numberOfCases">
                    <h2 className="numberOfInfecteds">{covidData.cases}</h2>
                </div>

                <div className="infoAboutCases">
                    <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html#:~:text=In%20those%20situations%2C%20use%20as,sick%20or%20who%20tested%20positive.">Learn how to prevent infections</a>
                </div>

                </Card>

               
            </div>
            <div className="newsContainer card">
                
                <Card
                    title="Top posts"
                    loading={newsLoading}
                    error={newsError}
                    onReload={handleNewsReload}
                    handleChange={handleContryChange}
                    defaultValue={country}
                    options={["BR","US"]}
                    >
                    <div className="numberOfNews">
                        <ul>
                        {returnNews()}
                        </ul>
                    </div>
                    <div className="contact">
                        <p>Do you want more visits? Contact us!</p>
                    </div>
                </Card>
            </div>
            <div className="reviewContainer card">
                <h1>Trustpilot</h1>
                <p className="reviewText">Show us your love by leaving a <span className="highlight">positive</span> review on trust pilot and recieve the extension of 50 additional products</p>
                <p><span className="highlight">Write a review on Trustpilot</span></p>
            </div>
        </div>
    )
}