import React from 'react';
import { Link } from 'react-router-dom';

const ProductsCard = ({item}) => (
  <div className="col s4">
    <div className="card">
      <div className="card-image">
        <img src={item.imageUrl} alt={item.name}/>
      </div>
      <div className="card-content">
        <p><b>{item.name}</b></p>
        <p>{item.description}</p>
        <p>{item.minimumPrice}</p>
      </div>
      <div className="card-action">
        <a href={item.referralUrl} target="_blank" rel="noopener noreferrer">Full article</a>
      </div>
    </div>
    <Link to={`/product/${item.id}`} item={item}>See Reviews</Link>
  </div>
);

export default ProductsCard;
