const express = require('express');
const User = require('./database/data');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/alluser', async (req, res) => {
    try {
        const users = await User.find();
        const userData = users.map(user => ({
            name: user.name,
            noOfEmail: user.noOfEmail,
            co2Saved: user.noOfEmail * 4 
        }));
        res.json(userData);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

app.post('/store', async (req, res) => {
    const { name, noOfEmail } = req.body;

    if (!name || !noOfEmail) {
        return res.status(400).send('Name and email count are required');
    }

    try {
        let user = await User.findOne({ name });

        if (user) {
            user.noOfEmail += noOfEmail; 
            await user.save();
            res.send('User updated successfully');
        } else {
            const newUser = new User({ name, noOfEmail });
            await newUser.save();
            res.status(201).send('User saved successfully');
        }
    } catch (error) {
        res.status(500).send('Error saving/updating user');
    }
});

app.post('/update', async (req, res) => {
    const { name, noOfEmail } = req.body;

    if (!name || !noOfEmail) {
        return res.status(400).send('Name and email count are required');
    }

    try {
        const user = await User.findOneAndUpdate(
            { name },
            { $inc: { noOfEmail } }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send('User updated successfully');
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

app.delete('/admin/delete',async (req,res) => {

    try {
        await User.deleteMany(); 
        res.send('Deleted all data!');
    } catch (error) {
        res.status(500).send('Error deleting data');
    }
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});