import axios from "axios";

const NEWS_API_KEY = '59f7bcd85f2c4ff7a912594ae830d2a2'; 
const NEWS_URL = (country : string) => `https://newsapi.org/v2/top-headlines?country=${country}&category=business&apiKey=${NEWS_API_KEY}`

export default function getNewsInfo (
    country: string,
    setNewsData: Function,
    setNewsLoading: Function,
    setNewsError: Function
    ) {
    return (
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
    )
}