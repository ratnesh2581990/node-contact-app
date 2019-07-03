const express       = require('express');
const { check, validationResult } = require('express-validator');
const router        = express.Router();
const db            = require('../config/database');
const Contact       = db.Contact;

router.get('/add', function(req, res){
  res.render('add_contact.hbs', {
    pageTitle: 'Add Contact'
  });
});

router.post('/add', [
    check('email').not().isEmpty(),
    check('email').isEmail(),
    check('name').not().isEmpty()
  ],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ 'success': false, 'message': 'Validation error', errors: errors });
    } else {
      Contact.findOne({email: req.body.email}, function(err,contact) {
          if (err) {
              res.json({ 'success': false, 'message': 'Error in Running Query', errors: err });
          }
          if(!contact) {
              let contact = new Contact();
              contact.name           = req.body.name;
              contact.email          = req.body.email;
              contact.phonenumber    = req.body.phonenumber;
              contact.info           = req.body.info;
              contact.save(function (err) {
                  if (err) {
                      res.json({ 'success': false, 'message': 'Error in Saving Contact', errors: err });
                  } else {
                      res.json({ 'success': true, 'message': 'Contact Added'});
                  }
              });
          } else {
              res.json({ 'success': false, 'message': 'Contact Already Exist'});
          }
      });  
    }
});

router.get('/all', function (req, res) {
    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log(err);
        } else {
            res.render('all_contacts.hbs', {
                pageTitle: 'All Contacts',
                contacts: contacts
            });
        }
    });
});

router.get('/:id', function(req, res){
    Contact.findById(req.params.id, function(err, contact){
        if (err) {
            res.json({ 'success': false, 'message': 'error in fetching Contact details' });
        } else {
            res.render('single_contacts.hbs', {
                pageTitle: 'Contact Single',
                contact: contact
            });
        }
    });
});

router.get('/edit/:id', function(req, res){
    Contact.findById(req.params.id, function(err, contact){
        if (err) {
            res.json({ 'success': false, 'message': 'error in fetching Contact details' });
        } else {
            res.render('edit_contact.hbs', {
                pageTitle: 'Edit Contact',
                contact: contact
            });
        }
    });
});

router.post('/edit/:id', [
    check('email').not().isEmpty(),
    check('email').isEmail(),
    check('name').not().isEmpty()
  ],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ 'success': false, 'message': 'Validation error', errors: errors });
    } else {
      let contact = {};
      contact.name           = req.body.name;
      contact.email          = req.body.email;
      contact.phonenumber    = req.body.phonenumber;
      contact.info           = req.body.info;
      let query = {_id:req.params.id}
      Contact.update(query, contact, function(err){
          if(err){
              res.json({ 'success': false, 'message': 'Error in Updating Contact', errors: err });
          } else {
              res.json({ 'success': true, 'message': 'Contact Updated'});
          }
      });
    }
});

router.delete('/:id', function(req, res){
    let query = {_id:req.params.id}
    Contact.findById(req.params.id, function(err, contact){
        Contact.remove(query, function(err){
          if(err){
            console.log(err);
          } else {
            res.send('Success');
          }
        });
    });
});


module.exports = router;