const express = require('express');
const validator = require('validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = new express.Router();
var db = require('../models/');
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

/*
 * Validate New Client
 *≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠*/

function validateNewClientForm(payload) {

  const errors = {};
  let isFormValid = true;
  let message = '';

 if (!payload || typeof payload.first_name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your first name.';
  }

  if (!payload || typeof payload.last_name !== 'string' || payload.lname.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your ARGH name.';
  }

  if (!payload || typeof payload.street_address !== 'string' || payload.address.trim().length === 0) {
    isFormValid = false;
    errors.address = 'Please provide a valid address.';
  }

  if (!payload || typeof payload.city !== 'string' || payload.city.trim().length === 0) {
    isFormValid = false;
    errors.city = 'Please provide a city.';
  }

  if (!payload || typeof payload.zip_code !== 'string' || payload.zip_code.trim().length < 5) {
    isFormValid = false;
    errors.zip_code = 'Please provide a valid zip code.';
  }
  
  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }  

  if (!payload || typeof payload.phone !== 'string' || payload.phone.trim().length < 10) {
    isFormValid = false;
    errors.phone = 'Please provide a valid phone number';
  } 

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/* Service Form validation */

function validateNewServiceForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your full name.';
    }

    if (!payload || typeof payload.pet_name !== 'string' || payload.pet_name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your pet name.';
    }

    if (!payload || typeof payload.calendar !== 'string' || payload.calendar.trim().length === 0) {
        isFormValid = false;
        errors.calendar = 'Please provide a date range.';
    }

    if (!payload || typeof payload.options !== 'string' || payload.options.trim().length === 0) {
        isFormValid = false;
        errors.zip = 'Please provide a valid pet option.';
    }


    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

/*
**  ROUTES 
≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠
≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠**/
/*
 * Client Dashboard
 *≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠*/
router.post('/client', (req, res, next) => {
        /*  Decoded Token
        ≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠*/    
        let split = req.headers.authorization.split(' ');
        let token = split[1];
        let decoded = jwt.decode(token,{complete:true});
        console.log(decoded.payload);
        /*  DB Call
        ≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠*/
    db.Client.findOne({ where: { email: req.body.email } }).then(function(user) {
        return res.status(200).json({
            message: `How's this for a secret message `,
            name: user.name,
            email: user.email,
            registered: user.registered,
            employee: user.employee,
            payload: decoded.payload
        });
    });

});
/*
 * New Client
 *≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠*/
router.post('/newclient', (req, res, next) => {
    const validationResult = validateNewClientForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

});
/*
 * Signup
 *≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠*/
router.post('/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }


    return passport.authenticate('local-signup', (err) => {
        if (err) {
            console.log(err);
            if (err.name === 'MongoError' && err.code === 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                    success: false,
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken.'
                    }
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
});
/*
 * Login
 *≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠*/
router.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }


    return passport.authenticate('local-login', (err, token, userData) => {

        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }

        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
        });
    })(req, res, next);
});

/*Service Routes
*******************************/
router.post('/client/service', (req, res, next) => {
    const validationResult = validateNewServiceForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

});




module.exports = router;