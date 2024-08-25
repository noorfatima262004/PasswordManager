
import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import 'dotenv/config'
const app = express()
const port = 3000


// connecting to Mongodb
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// dataBase name
const dbName = process.env.DB_NAME;

app.use(cors())
app.use(bodyParser.json())

await client.connect(); // sab se pahly await karwana

// get passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.send(findResult)
})

//save passwords
app.post('/',async (req, res) => {
  let data = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(data);
  res.send({success: true, result : findResult})
  })

  // delete passwords
  app.delete('/',async (req, res) => {
    let data = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(data);
    res.send({success: true, result : findResult})
    })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})