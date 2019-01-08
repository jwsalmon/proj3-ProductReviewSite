import axios from 'axios';

export default {
  searchProducts: () => axios.get('/api/products'),
  getProduct: id => axios.get(`/api/products/${id}`),
  getReviews: id => axios.get(`/api/reviews/${id}`),
  addReview: () => axios.post('/api/reviews')
};

// https://api.shop.com/AffiliatePublisherNetwork/v1/products?publisherID=TEST&locale=en_US&perPage=15&apikey=l7xx7b8fbbd51f7f4965ab8b3a55d2469d4b
// https://api.shop.com/AffiliatePublisherNetwork/v1/products/1711420896?publisherID=TEST&locale=en_US&perPage=15&apikey=l7xx7b8fbbd51f7f4965ab8b3a55d2469d4b