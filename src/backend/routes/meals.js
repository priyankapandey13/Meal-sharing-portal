const express = require('express')
const router = express.Router()

const db = require('../database')


router.get('/', (req, res) => {
    // console.log("Returns all meals with GET request");
    console.log("I am here");
    db.query('SELECT * FROM meal JOIN (select * from mealpics GROUP BY meal_id) as duplicatedmeals on meal_id = meal.id;', function(error, results, fields) {
        if (error) {
          console.log(error);    // throw error;
        }
      return res.json(results);
    });

})

router.get('/:id', (req, res) => {
    const idval= parseInt(req.params.id);
    console.log(idval);
    db.query('select meal.*, mealpics.url,review.title as review_title, review.description as review_description, review.stars, review.created_date as review_created_date from meal join mealpics on meal_id = meal.id join review on review.id = meal.id where meal.id = ?;', idval, function(error, results, fields) { 
        if (error) {
          console.log(error);    // throw error;
        }
        console.log(results);
        
      return res.json(results);
    });
})

router.post('/', (req, res) => { // Add a new contact
    const {title, description, location, when, max_reservations, price, created_date} = req.body;
    const setvalues={
      title,
      description,
      location,
      when,
      max_reservations,
      price,
      created_date
    };
    db.query('INSERT INTO meal SET ? ',setvalues ,function(error,results, fields){
        if (error) {
            console.log(error);    // throw error;
          }
        //   affectedRows
        console.log(`Total rows affected : ${results.affectedRows}`);
        
        return res.json(results);
    });
})

router.put('/:id', (req, res) => {
  const {title, description, location, when, max_reservations, price} =  req.body;
  const values = {title,
    description,
    location,
    when,
    max_reservations,
    price
  };
  const idval = req.params.id;
  db.query('UPDATE meal SET ? WHERE id = ?', [values, idval], function(error,results, fields){
  if(error){
    console.log(error);
  }
  console.log(`Total updated rows : ${results.affectedRows}`);
  
return res.send(results);
})

})

router.delete('/:id', (req, res) => {
  const idval = req.params.id;
  db.query('DELETE FROM meal where id=?',idval,function(error, results, fields){
    if(error){
      console.log(error);
    }
    console.log(`Total deleted contacts : ${results.affectedRows}`);
    return res.json(results)
  })
})


// router.get('/featuredmeals', (req, res) => {
//   console.log("Returns all meals with GET request");
  
//   db.query('select meal.*, mealpics.url, review.title , review.description, review.stars, review.created_date as review_created_date from meal join mealpics on meal_id = meal.id join review on review.meal_id = meal.id;', function(error, results, fields) {
    
//       if (error) {
//         console.log(error);    // throw error;
//       }
//     return res.json(results);
//   });

// })



module.exports = router
