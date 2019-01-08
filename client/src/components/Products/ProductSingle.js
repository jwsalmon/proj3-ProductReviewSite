import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import API from '../../utils/API';

class ProductSingle extends Component {
  state = {
    product: {},
    reviews: [],
    text: ''
  };

  componentDidMount() {
    this.getProduct();
    this.getReviews();
  }

  getProduct = () => {
    // const { match } = this.props;
    API.getProduct(this.props.match.params.id)
      .then(res => this.setState({ product: res.data }))
      .catch(err => console.log(err));
  }

  getReviews = () => {
    // const { match } = this.props;
    API.getReviews(this.props.match.params.id)
      .then(res => this.setState({ reviews: res.data }))
      .catch(err => console.log(err));
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    // const { match } = this.props;
    // const { text } = this.state;
    event.preventDefault();
    if (this.state.text) {
      API.addReview({
        text: this.state.text,
        productId: this.props.match.params.id
      })
        .then(res => this.getReviews())
        .catch(err => console.log(err));
    }
  };

  render() {
    const { product, reviews, text } = this.state;
    return (
      <div className="col s4">
        <div className="card">
          <div className="card-image">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className="card-content">
            <p><b>{product.name}</b></p>
            <p>{product.description}</p>
            <p>{product.minimumPrice}</p>
          </div>
          <div className="card-action">
            <a href={product.referralUrl} target="_blank" rel="noopener noreferrer">Full article</a>
          </div>
        </div>

        <div>Review List:</div>
        <div>
          {!reviews.length ? (<div>No Reviews!</div>) : (
            reviews.map(review => (
              <div key={review._id}>
                <p>{review.text}</p>
              </div>
            ))
          )}
        </div>

        <div>
          <div>Add New Review:</div>
          <form>
            <input
              value={text}
              onChange={this.handleInputChange}
              name="text"
              type="text"
              className="form-control"
              placeholder="Your Review here (required)"
            />
            <button
              type="button"
              disabled={!(text)}
              onClick={this.handleFormSubmit}
            >
              Submit Book
            </button>
          </form>
        </div>

        <Link to="/">Go back</Link>
      </div>
    );
  }
}

export default ProductSingle;
