const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());
// db connection

// Replace the uri string with your MongoDB deployment's connection string.
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@gadget-world.ntkhc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const database = client.db("gadget").collection("gadgets");
        const stockCollection = client.db("gadget").collection("stockChart");
        app.get('/gadgets/filter', async (req, res) => {
            const filter = req.query.gadget
            console.log(filter)
            const query = { category: filter };
            const cursor = database.find(query);
            const hi = await cursor.toArray();
            res.send(hi)
        });
        app.get('/gadgets/:id', async (req, res) => {
            const filter = req.params.id
            console.log(filter)
            const query = { _id: ObjectId(filter) };
            const gadget = await database.findOne(query);
            res.send(gadget)
        });
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = database.find(query);
            const services = await cursor.limit(6).toArray();
            res.send(services);
        });
        app.put('/gadgets/:id', async (req, res) => {
            const filter = req.params.id
            console.log(req.body)
            console.log(filter)
            const query = { _id: ObjectId(filter) };
            // updating number
            const updateDoc = {
                $set: {
                    quantity: `${req.body.quantity}`
                },
            };
            const result = await database.updateOne(query, updateDoc);
            res.send(result);
        });
        app.get('/stockChart', async (req, res) => {
            const query = {};
            const cursor = stockCollection.find(query);
            const stockChart = await cursor.toArray();
            res.send(stockChart)
        });
        app.get('/gadgets', async (req, res) => {
            const query = {};
            const cursor = database.find(query);
            const stockChart = await cursor.toArray();
            res.send(stockChart)
        });
        app.delete('/gadgets/:id', async (req, res) => {
            const filter = req.params.id
            console.log(req.body)
            console.log(filter)
            const query = { _id: ObjectId(filter) };
            const result = await movies.deleteOne(query);
            res.send(result)
        });

    } finally {
        // await client.close();
    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my node CRUD server')
})
app.listen(port, () => {
    console.log('crud server is running ');
})
