const express = require('express');
const router = express.Router(); 
router.use(express.static('public'));
router.use(express.json());
const fs = require('fs');

var hospitals;
/*****read*******/
function readHospitalData() {
  const data = fs.readFileSync('public/files/hospital_data.json', 'utf8');
  return JSON.parse(data);
}
/***********write********/
function writeHospitalData(data) {
    fs.writeFile('public/files/hospital_data.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error('Error writing file :', err);
        } else {
            console.log('ADDED');
        }
    });
}

/****************************CRUD *********************/
router.get('/data',(req,res)=>{
        hospitals = readHospitalData();
          res.send(hospitals);
      
  });


router.post('/write',(req,res)=>{
    hospitals = readHospitalData();
    const contentToWrite = req.body;
    hospitals.push(contentToWrite);
    console.log(hospitals);
    fs.writeFile('public/files/hospital_data.json', JSON.stringify(hospitals), (err) => {
        if (err) {
            console.error('Error writing file :', err);
        } else {
            console.log('ADDED',contentToWrite);
            res.send(hospitals);
        }
    });
      
}) ;

router.put('/update/:id', (req, res) => {
    const hospitals = readHospitalData();
    console.log(hospitals);
    const hospitalIndex = hospitals.findIndex(h => h.id == Number(req.params.id));
    if (hospitalIndex !== -1) {
        // console.log('inside lp',req.body);
      hospitals[hospitalIndex] = req.body;
      writeHospitalData(hospitals);
    //   console.log(hospitals);
      res.send(hospitals);
    } else {
      res.send('Hospital not found');
    }
});

router.delete('/delete/:id', (req, res) => {
    const hospitals = readHospitalData();
    const hospitalIndex = hospitals.findIndex(h => h.id == Number(req.params.id));
    if (hospitalIndex !== -1) {
      const deletedHospital = hospitals.splice(hospitalIndex, 1);
      writeHospitalData(hospitals);
      res.send(deletedHospital);
    } else {
      res.send('Hospital not found');
    }
});

module.exports = router ;