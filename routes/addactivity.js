
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router(); 
const Addpet = mongoose.model('Addpet'); 


router.post('/addpet', async (req, res) => {
    try {
        
        const { name, gender, location, age, vacinated, breed, category, description, image } = req.body;


        if (!name || !gender || !location || !age || vacinated === undefined || !breed || !category || !description || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const newPet = new Addpet({
            name,
            gender,
            location,
            age,
            vacinated,
            breed,
            category,
            description,
            image
        });

       
        await newPet.save();

        
        res.status(201).json({
            message: 'Pet added successfully',
            pet: newPet
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add pet' });
    }
});


// ----------------------------------------------------------------------------------------------------------------------------------------------------


// api for fetching data 



router.get('/getpets', async (req, res) =>{
    Addpet.find()
    .then((pets)=>{
        res.json(pets);
    })
    

})

module.exports = router;
