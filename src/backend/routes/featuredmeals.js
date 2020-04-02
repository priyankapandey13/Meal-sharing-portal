const express = require('express')
const router = express.Router()

const db = require('../database')





router.get('/', (req, res) => {
  console.log("Returns all meals with GET request");
  
  db.query('select meal.*, mealpics.url, review.title , review.description, review.stars, review.created_date as review_created_date from meal join mealpics on meal_id = meal.id join review on review.meal_id = meal.id where review.stars > 2 order by review.stars desc;', function(error, results, fields) {
    
      if (error) {
        console.log(error);    // throw error;
      }
    return res.json(results);
  });

})

module.exports = router
