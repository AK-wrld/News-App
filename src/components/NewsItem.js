import React, { Component } from 'react'
import defImg from "./images/no-img.jpg"

export class NewsItem extends Component {
   changeDate = (date)=> {
    let getdate = new Date(date);

    return getdate.toDateString()
  }
 
  render() {
    let {title,description,img,imgurl,author,date,sourceName}=this.props //ab this.title likhne ke jagah bas title likhne se chalega
     
    
    return (
      <div>
        <div className="card my-3 mx-auto" style={{width: "18rem"}}>
       
  
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{'zIndex' : '1', }}>
    {sourceName}
    
  </span>

  <img src={img?img:defImg} className="card-img-top" alt="..." style={{maxHeight : "150px"}}/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <a href={imgurl} className="btn btn-primary">Read More</a>
    <p className="card-text"><small className="text-muted">By {author} on</small></p>
    <p className="card-text"><small className="text-muted">{this.changeDate(date)} </small></p>
    {/* in date what we were getting was a iso date we needed to to cahnge that date into GMT date */}
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
