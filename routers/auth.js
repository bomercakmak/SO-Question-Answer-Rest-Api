const express = require('express');
const router = express.Router();
const { getAccessToRoute } = require('../middlewares/authorization/auth')
const profileImageUpload = require('../middlewares/libraries/profileImageUpload')
const { register, getUser, login,logout,imageUpload,forgotPassword,editDetails} = require('../controllers/auth') 

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getAccessToRoute, getUser);
router.get('/logout',getAccessToRoute,logout);
router.post("/forgotpassword", forgotPassword);
router.put("/edit",getAccessToRoute,editDetails);
router.post('/upload', [getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload);
module.exports = router;