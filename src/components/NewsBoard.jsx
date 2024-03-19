import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

function NewsBoard({category}) {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const apiKey = "70204eae711b4838b1261e9d954a2a4a";
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data); // Log response data for debugging
                if (data.articles) {
                    setArticles(data.articles);
                } else {
                    throw new Error('Response does not contain articles');
                }
            })
            .catch(error => console.error('Error fetching articles:', error));
    }, [category]);
    
    

    return (
        <>
            <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
            {articles.map((news, index) => (
                <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
            ))}
        </>
    );
}

export default NewsBoard;
