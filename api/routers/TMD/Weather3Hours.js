const express = require('express')
const request = require('ajax-request')
const router = express.Router()
  

const Weather3HoursController = require('../../controllers/TMD/Controller_Weather3Hours')


//GET
router.get('/get_all', Weather3HoursController.get_all)

//POST
router.post('/get_col',Weather3HoursController.get_col)  // body {	"column" :["StationNameTh",...] }

router.post('/get_row',Weather3HoursController.get_row)  // body    {	"row" :["พะเยา",....]  }









module.exports =router