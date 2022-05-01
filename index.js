const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());
// db connection

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://DB_USER:DB_PASS@gadget-world.ntkhc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("gadget").collection("gadgets");
    // perform actions on the collection object
    console.log('db connected')
    client.close();
});


require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Running my node CRUD server')
})
