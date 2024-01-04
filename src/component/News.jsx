import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export default class News extends Component {
  
  constructor() {
    // It's mandatory to include super(); for call the parent class constructor in js.
    // It always will be first statement.
    super();
    // hooks when using class component.
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      currPageSize: 20,
    };
  }

  static defaultValueOfProps = {
    pageSize: 12,
    country: 'us',
    category: 'sports',
  };
  static propsTypesAssignment = {
    pageSize: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  };

  // Default mounted news articles...
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c2bc751cc45a41efbed5f449fa0a47bb&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalAvilableResult: parsedData.totalResults,
      loading: false,
    });
  }

  // Article mounted after clicking the previous button (If exist...)
  handlePrevPageClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c2bc751cc45a41efbed5f449fa0a47bb&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      currPageSize: this.state.currPageSize - 20,
      loading: false,
    });
  };

  // Article mounted after clicking the next button (If exists....)
  handleNextPageClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c2bc751cc45a41efbed5f449fa0a47bb&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      currPageSize: this.state.currPageSize + 20,
      loading: false,
    });

    // console.log(this.state.totalAvilableResult);
    // console.log(this.state.currPageSize);
  };

  render() {
    // Default image variable... (If image is not specified in the API)
    let img =
      "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg";

    return (
      <div>
        <div className="container my-2">
          {this.state.loading && <Spinner />}
          {!this.state.loading && (
            <div className="container d-flex justify-content-between">
              <button
                disabled={this.state.page <= 1}
                onClick={this.handlePrevPageClick}
                className="btn btn-danger"
              >
                &larr;Prev
              </button>
              <h3 className="text-center">Samachar top headlines</h3>

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
          )}
          <div className="row">
            {/* if loading of article is happening then don't show the article */}
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem
                      title={
                        element.title
                          ? element.title.slice(0, 61)
                          : "Title Missing"
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 115)
                          : "Description Unavilable"
                      }
                      imageUrl={element.urlToImage ? element.urlToImage : img}
                      newsUrl={element.url}
                    />
                  </div>
                );
              })}
          </div>
          {/* If loading is happening hide the buttons otherwise show it on */}
          {!this.state.loading && (
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
          )}
        </div>
      </div>
    );
  }
}
