import React, { Component } from "react";
import "./NewsItem.css";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt,sourceName} =
      this.props;
    return (
      <>
        <div
          className={`card bg-${
            this.props.mode === "dark" ? "primary-subtle" : "light"
          }`}
        >
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'88%',zIndex:1}} >
            {sourceName}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                Author:{" "}
                <span className="fw-bold">{author ? author : "unknown"}</span>{" "}
                Published At:{" "}
                <span className="fw-bold">
                  {publishedAt
                    ? new Date(publishedAt).toGMTString()
                    : "Recently"}{" "}
                </span>{" "}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Know More...
            </a>
          </div>
        </div>
      </>
    );
  }
}
