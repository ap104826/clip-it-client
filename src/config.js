export default {
  API_ENDPOINT: process.env.NODE_ENV === 'production' ?
    'https://desolate-dawn-57125.herokuapp.com/api' : 'http://localhost:8000/api'
}
