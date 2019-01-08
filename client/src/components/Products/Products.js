import React, { Component } from 'react';
import ProductsCard from './ProductsCard';
import API from '../../utils/API';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.searchProducts();
  }

  searchProducts = () => {
    API.searchProducts()
      .then((response) => {
        this.setState({
          products: response.data.products
        });
      })
      .catch(error => console.log(error));
  }

  renderItems() {
    const { products } = this.state;
    return products.map(item => (
      <ProductsCard key={item.id} item={item} />
    ));
  }

  render() {
    return (
      <div className="row">
        {this.renderItems()}
      </div>
    );
  }
}

export default Products;
