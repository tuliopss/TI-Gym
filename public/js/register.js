const express = require('express');
const router = express.Router();
const User = require('../models/User');
const registerBtn = document.querySelector('#btn-register');

console.log('register js')


const handleSubmit = registerBtn.onclick = (e) => {
    e.preventDefault();
    const username = document.querySelector('#inputUsername').value;
    const password = document.querySelector('#inputPassword').value
    const user = {
        username,
        password,   
    }
    console.log(user)

}