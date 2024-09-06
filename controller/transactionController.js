const express = require('express')
require('dotenv').config
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const transactionService = require('../service/transactionService')
const { credential, url } = require('../config.json')
const crypto = require('crypto')
const axios = require('axios')

//router.get('/index', indexPage)
router.post('/initiate', initiate)
//router.get('/pay/:id', pay)
router.post('/return', returnFunc)
router.get('/fieldtrips', getAllFieldTrips)
router.get('/asaactivity', getAllAsaActivity)
router.get('/idcard',getAllIdCard)
router.get('/rental', getAllLaptopRental)


// function checkStatus(req, res, next) {
//     transactionService.statusCheck(req.params.id)
//         .then((response) => response ? (res.status(200).send(response)) : (res.status(404).send()))
//         .catch(next)
// }

// function returnFunc(req, res, next) {
//     try {
//         transactionService.returnCall(req.body)
//     res.sendStatus(200)
//     } catch (error) {
//         next(error)
//     }
    
//     //transactionService.returnCall(req.body)
//     // .then((response => {
//     //     switch (response) {
//     //         case "success":
//     //             //res.render('success')
//     //             res.redirect("https://trustremit.africa/user/transaction")
//     //             break;
//     //         default:
//     //             res.redirect("https://trustremit.africa/user/transaction")
//     //             // axios post to the return url of the shopping cart
//     //             break;
//     //     }
//     //  }
//     //  .catch(next)
// }

function getInitiateSchema(req, res, next) {
    const schema = Joi.object({
        merchantName: Joi.string().required(),
        //merchantRef: Joi.string().required(),
        amount: Joi.string().required()
    })
    validateRequest(req, next, schema)
}

// function pay(req, res, next) {
//     const return_url = process.env.RETURN_URL
//     transactionService.pay(req.params.id)
//         .then((response) => response ? res.render('pay', {
//             data: response.dataValues,
//             transactionService,
//             url,
//             crypto,
//             credential,
//             req,
//             return_url
//         }) : res.status(404).render('404'))
//         .catch(next)
// }

// function indexPage(req, res, next) {
//     res.render('index', (err, html) => {
//         if (err) {
//             return next(err);
//         }
//         res.send(html);
//     });
// }



/** PAYSTACK PAYMENT CODE ********************************************************************/

async function getAllFieldTrips(req, res, next) {
    try {
        const menu = await transactionService.getFieldTrip();
        res.json(menu);
    } catch (error) {
        next(error); 
    }
}

async function getAllAsaActivity(req, res, next){
    try {
        const activities =  await transactionService.getAsaActivity()
        res.json(activities)
    } catch (error) {
        next(error)
    }
}

async function getAllLaptopRental (req, res, next){
    try {
        const laptopRental = await transactionService.getLaptopRental()
        res.json(laptopRental)
    } catch (error) {
        next(error)
    }
}

async function getAllIdCard(req, res, next){
    try {
        const idCards = await transactionService.getIdcards()
        res.json(idCards)
    } catch (error) {
        next(error)
    }
}

 
async function InitiatePaystack(data) {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.PAYMENT_URL}}/transaction/initialize`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Cookie': '__cf_bm=cws5mmhgeAp.pnOvXpVZBcHKmP6PHNOYg3qXUiczOlQ-1713778760-1.0.1.1-q2U5IoO5Y4gOeV5hhESAbARif39h_sMkLiJ1yHYTAByJ3luLff2kiCJzUHvC94JWzk2I5GGwHowJsEKXpniWQA; sails.sid=s%3A1ak4-VjKQ30KCksqudQcNvQKjKj55RqJ.xnt7oFVaKQ%2BifY24MnqATcAdknh9mgyzzuCrjRsgB%2F8'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

function initiate(req, res, next) {
    console.log(req.body)
    InitiatePaystack(req.body)
        .then((response) => {
            transactionService.initiate(req.body, response)
                .then((response) => response ? res.send(response) : res.status(404).send())
                .catch(next)
        })
}

function returnFunc(req, res, next) {
    try {
        transactionService.returnCall(req.body)
    res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}



module.exports = router

