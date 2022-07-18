import React from "react";

const NewsItem = (props) => {
  let { title, description, imgUrl, newUrl, date, author, source } = props;

  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "fles",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          style={{ height: "150px" }}
          src={imgUrl}
          className="card-img-top"
          alt={title}
        />

        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By: {!author ? "Unknow" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newUrl} className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
