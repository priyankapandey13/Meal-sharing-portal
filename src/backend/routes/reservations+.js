const express = require('express')
const router = express.Router()

const db = require('../database')

router.get('/', (req, res) => {
    console.log("Im inside routes/reservations.js It should Returns all reservations with GET request");
    
    db.query('select * from reservations', function(error, results, fields) {
        if (error) {
          console.log(error);    // throw error;
        }
      return res.json(results);
    });

})

router.get('/:id', (req, res) => {
    const idval= parseInt(req.params.id);
    console.log(idval);
    db.query('select meal.*, mealpics.url from meal join mealpics on mealpics.id = meal.id where meal.id = ?;', idval, function(error, results, fields) {
        if (error) {
          console.log(error);    // throw error;
        }
        console.log(results);
        
      return res.json(results);
    });
})

router.post('/:id', (req, res) => { // Add a new contact
  const mealidval= parseInt(req.params.id);
    const {name, phone, email} = req.body;
    const setvalues={
      meal_id:mealidval,
      name,
      phone,
      email
    };
    db.query('INSERT INTO reservations SET ?',[setvalues] ,function(error,results, fields){
        if (error) {
            console.log(error);    // throw error;
          }
        //   affectedRows
        // console.log(`Total rows affected : ${results.affectedRows}`);
        
        return res.json(results);
    });
})

module.exports = router
