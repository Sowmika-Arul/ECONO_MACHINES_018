const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(cors());

let db;
let usersCollection;
let entriesCollection;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to the database');
    db = client.db('WT');
    usersCollection = db.collection('RoleLogin');
    entriesCollection = db.collection('add');

    app.post('/login', async (req, res) => {
      const { role, email, password } = req.body;

      if (!role || !email || !password) {
        return res.status(400).json({ message: 'Role, email, and password are required' });
      }

      try {
        const user = await usersCollection.findOne({ role, email, password });

        if (user) {
          return res.status(200).json({ message: 'Login successful', role: user.role });
        } else {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });

    // Add entry endpoint
    app.post('/add', async (req, res) => {
      const { machineType, treatmentType } = req.body;

      if (!machineType || !treatmentType) {
        return res.status(400).json({ message: 'Machine type and treatment type are required' });
      }

      try {
        const result = await entriesCollection.insertOne({ machineType, treatmentType });
        return res.status(200).json({ message: 'Entry added successfully', id: result.insertedId });
      } catch (error) {
        console.error('Error adding entry:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });

    // Update entry endpoint
    app.put('/update/:id', async (req, res) => {
      const { machineType, treatmentType } = req.body;
      const entryId = req.params.id;

      if (!machineType || !treatmentType) {
        return res.status(400).json({ message: 'Machine type and treatment type are required' });
      }

      try {
        const filter = { _id: new ObjectId(entryId) };
        const updateDoc = {
          $set: {
            machineType,
            treatmentType
          }
        };

        const result = await entriesCollection.updateOne(filter, updateDoc);

        if (result.modifiedCount === 1) {
          return res.status(200).json({ message: 'Entry updated successfully' });
        } else {
          return res.status(404).json({ message: 'Entry not found' });
        }
      } catch (error) {
        console.error('Error updating entry:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });

    // Delete entry endpoint
    app.delete('/delete/:id', async (req, res) => {
      const entryId = req.params.id;

      try {
        const result = await entriesCollection.deleteOne({ _id: new ObjectId(entryId) });

        if (result.deletedCount === 1) {
          return res.status(200).json({ message: 'Entry deleted successfully' });
        } else {
          return res.status(404).json({ message: 'Entry not found' });
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });

    // Fetch entries endpoint
    app.get('/entries', async (req, res) => {
      try {
        const entries = await entriesCollection.find().toArray();
        return res.status(200).json(entries);
      } catch (error) {
        console.error('Error fetching entries:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });
