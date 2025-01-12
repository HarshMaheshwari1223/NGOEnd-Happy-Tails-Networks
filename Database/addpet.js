const mongoose=require('mongoose');

const addpet = new mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true
        },
        gender:{
            type: 'string',
            required: true
        },
        location: {
            type: 'string',
            required: true
        },
        age: {
            type: 'number',
            required: true
        },
        vacinated: {
            type: 'boolean',
            required: true
        },
        breed:{
            type: 'string',
            required: true
        },
        category:{
            type: 'string',
            required: true
        },
        description:{
            type: 'string',
            required: true
        },
        image:{
            type: 'string',
            required: true
        },
    }
);

module.exports = mongoose.model('Addpet', addpet);