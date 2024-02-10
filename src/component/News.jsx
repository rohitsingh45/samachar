import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor() {
    // It's mandatory to include super(); for call the parent class constructor in js.
    // It always will be first statement.
    super();
    // hooks when using class component.
    this.state = {
      // articles for our webpage
      articles: [],
      // Loading variable for keeping track wheter page is loading or not for adding spinner...
      loading: false,
      // Page variable representing page number default value is 1, when button clicked on next then autoincrement and autodecrement for prev button.
      page: 1,
      // curr number of a
      currPageSize: 12,

      totalAvilableResult: 0,
    };
  }

  static defaultValueOfProps = {
    pageSize: 12,
    country: "us",
    category: "sports",
  };

  // Declaring the constraints on the proptypes we are getting for news api...
  static propsTypesAssignment = {
    pageSize: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  };

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c2bc751cc45a41efbed5f449fa0a47bb&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page,
      currPageSize: this.state.currPageSize,
      totalAvilableResult: parsedData.totalResults,
      loading: false,
    });
  }

  // Default mounted news articles...
  async componentDidMount() {
    this.updateNews();
  }

  // Article mounted after clicking the previous button (If exist...)
  handlePrevPageClick = async () => {
    this.setState({
      page: this.state.page - 1,
      currPageSize: this.state.currPageSize - 12,
    });
    this.updateNews();
  };

  // Article mounted after clicking the next button (If exists....)
  handleNextPageClick = async () => {
    this.setState({
      page: this.state.page + 1,
      currPageSize: this.state.currPageSize + 12,
    });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c2bc751cc45a41efbed5f449fa0a47bb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: this.state.page,
      currPageSize: this.state.currPageSize,
      totalAvilableResult: parsedData.totalResults,
    });
  };

  render() {
    // Default image variable... (If image is not specified in the API)
    let img =
      "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg";

    let descriptionMissingString =
      "Description Unavilable, Missing from API (Application Program Interface) Press know more for detail";
    return (
      <>
        {
          this.state.loading && <Spinner />
          /* In JS && and || work different than in other programming languages.
          
          Here in our case if this.state.loading is true then it return the RHS item which is spinner. */
        }

        {!this.state.loading && (
          <div className="container d-flex justify-content-center">
            {/* <button
                  disabled={this.state.page <= 1}
                  onClick={this.handlePrevPageClick}
                  className="btn btn-danger mb-3"
                >
                  &larr;Prev
                </button> */}
            <h3
              className={`text-center text-${
                this.props.mode === "light" ? "dark" : "light"
              }`}
            >
              Samachar top headlines
            </h3>

            {/* <button
                  disabled={
                    this.state.currPageSize >= this.state.totalAvilableResult
                  }
                  onClick={this.handleNextPageClick}
                  className="btn btn-warning mb-3"
                >
                  Next&rarr;
                </button> */}
          </div>
        )}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalAvilableResult}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* if loading of article is happening then don't show the article */}
              {!this.state.loading &&
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4 my-2" key={element.url}>
                      <NewsItem
                        mode={this.props.mode}
                        title={
                          element.title
                            ? element.title.slice(0, 80)
                            : "Title Missing"
                        }
                        description={
                          element.description
                            ? element.description.slice(0, 50)
                            : descriptionMissingString.slice(0, 50)
                        }
                        imageUrl={element.urlToImage ? element.urlToImage : img}
                        newsUrl={element.url}
                        author={element.author}
                        publishedAt={element.publishedAt}
                        sourceName={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        {/* If loading is happening hide the buttons otherwise show it on */}

        {/* {!this.state.loading && (
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              onClick={this.handlePrevPageClick}
              className="btn btn-danger"
            >
              &larr;Prev
            </button>
            <button
              disabled={
                this.state.currPageSize >= this.state.totalAvilableResult
              }
              onClick={this.handleNextPageClick}
              className="btn btn-warning"
            >
              Next&rarr;
            </button>
          </div>
        )} */}
      </>
    );
  }
}
