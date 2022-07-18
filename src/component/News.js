import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import ImgHolder from "../assets/image/newsHolder.jpg";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const cpitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6cc566874b944e3ea72be0beddd17ea0&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    document.title = `${cpitalFirstLetter(props.category)} - News`;
  }, []);

  //next back btn
  // handleNextClick = async () => {
  //    setState({ page:    page + 1 });
  //    updateNews();
  // };

  // handleBackClick = async () => {
  //    setState({ page:    page - 1 });
  //    updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=6cc566874b944e3ea72be0beddd17ea0&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h2 className="text-center" style={{ marginTop: "90px" }}>
        News Top {`${cpitalFirstLetter(props.category)} `}
        Headlines
      </h2>
      {loading && <Loader />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loader />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imgUrl={element.imgUrl ? ImgHolder : element.urlToImage}
                    newUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={   page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={ handleBackClick}
          >
            &larr; Back
          </button>
          <button
            disabled={
                 page + 1 >
              Math.ceil(   totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={ handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};
News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
