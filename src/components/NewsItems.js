import React, { Component } from 'react'

export default class NewsItems extends Component {
   
  render() {
    let {title,description,imgUrl,newsUrl}=this.props;
    return (
        
      <div >
        <div className="card mt-5" >
  <img src={!imgUrl ? "https://media.cnn.com/api/v1/images/stellar/prod/231015101839-01-madonna-tour-opening-night-london-1014.jpg?c=16x9&q=w_800,c_fill " : imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} target='_blank' className="btn btn-primary">Read More</a>
  </div>
</div>
      </div>
      
    )
  }
}
