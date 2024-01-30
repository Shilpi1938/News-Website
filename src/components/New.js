import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Loading from "./Loading";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class New extends Component {
  static defaultProps={
    country:'us',
    pageSize:12,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  constructor(props) {
    super();
    this.state = {
      articles: [],
      page: 1,
      totalResults:0,
      loading:true
    };
  }
  async updateNews(){
    this.setState({ loading: true });
    this.props.setProgress(10);
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ea1f7714619948e0be365f7359cbba22&page=${this.state.page}&pageSize=12`;
    const data = await fetch(url);
    this.props.setProgress(30);
    const parseData = await data.json();
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
   this.updateNews()
  }
 
fetchMoreData = async () =>{
    this.setState({page: this.state.page+1})
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ea1f7714619948e0be365f7359cbba22&page=${this.state.page}&pageSize=12`;
    // this.setState({loading:true});
  const data = await fetch(url);
  const parseData = await data.json();
  console.log(parseData);
  this.setState({
    articles: this.state.articles.concat(parseData.articles),
    totalResults: parseData.totalResults,
    loading:false
  });
  if (this.state.articles.length >= this.state.totalResults) {
    return;
  }

  this.setState({ page: this.state.page + 1 });
  }
  prevPage = async () => {
    this.updateNews();
    this.setState({ page: this.state.page - 1, 
     
     });
     
  };
  // nextPage = async () => {
  //   // console.log("next")
  //   if (this.state.page + 1 > Math.ceil(this.state.totalResults / 12)) {
  //   } else {
  //    this.updateNews();
  //     this.setState({
  //       page: this.state.page + 1,
        
  //     });
  //   }
  // };
  render() {
    return (
      <div>
        <div className="container my-3">
          <h2>Headings</h2>
          {this.state.loading && <Loading/>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading/>}
        >
          
          <div className="container">
          <div className="row">
            { this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems title={element.title ? element.title.slice(0, 45) : " "} description={ element.description ? element.description.slice(0, 80) : " "  } imgUrl={element.urlToImage} newsUrl={element.url} />
                </div>
              );
            })}
          </div>
          </div>
          </InfiniteScroll>
          {/* <div className=" container d-flex justify-content-between">
            <button type="button" disabled={this.state.page <= 1} onClick={this.prevPage} className="btn btn-dark"> &larr; Previous</button>
            <button type="button" disabled={ this.state.page + 1 > Math.ceil(this.state.totalResults / 12)} onClick={this.nextPage} className="btn btn-dark">Next &rarr;</button>
          </div> */}
        </div>
      </div>
    );
  }
}
