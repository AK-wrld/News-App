import React, { Component } from 'react'
import Spinner from './Spinner'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    static defaultProps = {
        //default props occur when no props are passed
        country: 'in',
        pageSize: 5,
        category: 'general'
        
      }
      static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
      }
    constructor(props) {
        super(props);
        this.state = {
            // articles: this.articles,
            // initially this.articles null hoga kyuki constructore pahle call hota fir render fir componentdidmount
            //to pahle fetch kr hi ni rkha hoga islie kuch hoga hinhi daalne ke lie to ye undefined hoga.
            //to is initial state me hume articles : [] dena chahie 
            articles: [],
            loading: true,
            page: 0,
           totalResults : 0

        }
        document.title = `${this.props.category} - News-App`
    }
    async updateNews() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url) //now if the promise is succeeded then data will have the status of the promise. if promise resolved then we will see a object
        this.props.setProgress(30)
        // console.log(data)
        let parsedData = await data.json()
        // console.log(parsedData.articles)
        let articles = parsedData.articles
        this.props.setProgress(50)

        this.setState({
            articles: articles,
            loading: false,
            totalResults : parsedData.totalResults
        })
        this.props.setProgress(100)
        this.setState({page :this.state.page + 1 })
    }
    async componentDidMount() {
        if(this.hasMore == false) {
            this.setState({
                loading:false
            })
        }
        this.updateNews();

    }
    // nextPg = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=d2f13c446c3442a5bacc7dff6cabd553&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
    //     this.setState({ loading: true })
    //     let data = await fetch(url)
    //     let parsedData = await data.json()

    //     let articles = parsedData.articles
    //     // console.log(articles.length)

    //     this.setState({
    //         articles: articles,
    //         page: this.state.page + 1,
    //         loading: false
    //     })


    // }
    // prevPage = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=d2f13c446c3442a5bacc7dff6cabd553&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`
    //     this.setState({ loading: true })
    //     let data = await fetch(url)
    //     let parsedData = await data.json()

    //     let articles = parsedData.articles

    //     this.setState({
    //         articles: articles,
    //         page: this.state.page - 1,
    //         loading: false
    //     })
    // }
    // prev and next pg fn were used when we were using next and prev buttons insted of infinite scroll
    
    fetchMoreData =  async() => {

        this.setState({page : this.state.page + 1,})
        console.log(this.state.page)
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url) //now if the promise is succeeded then data will have the status of the promise. if promise resolved then we will see a object
        // console.log(data)
        let parsedData = await data.json()
        console.log(parsedData)
        // console.log(parsedData.articles)
        let articles = this.state.articles.concat(parsedData.articles) 
        console.log(this.state.articles)
        
        this.setState({
            
            articles: articles,
            loading: false,
            totalResults : parsedData.totalResults
        })
    };
    render() {
        return (
            <div>
                <h2 className='text-center my-5'>News Now- Top Headlines</h2>
                {this.state.loading == true ? <Spinner /> : ""}
                <div className="container">
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className="container-fluid">
            <div className="row my-3" >
                        {this.state.articles.map((el) => {
                            //    console.log(el)   
                            //above syntax is loading agar false hai to hi map kro
                            return <div className="col-sm-12 col-md-6 col-lg-4  " key={el.url}>
                                {/* {console.log(el.title)} */}
                                {/* a key is something which is unique and is given to the first div which is returned    */}
                                <NewsItem title={el.title ? el.title.slice(0, 44) : ""} description={el.description ? el.description.slice(0, 88) : ""} img={el.urlToImage} imgurl={el.url} author = {el.author? el.author:"Unknown" } date = {el.publishedAt}
                                sourceName= {el.source.name} />
                                {/* in some news the description or title of the news was not set. in that case we cannot slice the properties of null array 
                         so we set the value to "" whenever desc or title of a =n article is null   */}
                            </div>




                        })}
                        
            </div>
                    
                    </div>
                    </InfiniteScroll>
                </div>
                {/* <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.prevPage}>Previous</button>
                    <button disabled={this.state.articles.length == 0} type="button" className="btn btn-dark" onClick={this.nextPg}>Next</button>

                </div> */}
                {/* this prev and next were used when we were not using infinite scroll */}
                {/* This is a news component */}
            </div>
        )
    }

}

export default News
