const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('My Next Js portfolio server is Running');
});


/* ---------------------------------- MongoDB code Here ----------------------------------- */


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bjkyc58.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}
});


async function run() {
    try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // COLLECTIONS
    const projectsCollection = client.db('emamDb').collection('projects');
    const blogsCollection = client.db('emamDb').collection('blogs');
    const experienceCollection = client.db('emamDb').collection('experience');
    const aboutCollection = client.db('emamDb').collection('about');
    const skillsCollection = client.db('emamDb').collection('skills');

    /* ------------------------------------- Crud Opereation code Here -------------------------------- */
    
    // Project 
    app.get('/projects', async(req, res) => {
        const result = await projectsCollection.find().toArray();
        res.send(result);
    });

    app.post('/projects', async(req, res) => {
        const project = req.body;
        const result = await projectsCollection.insertOne(project);
        res.send(result);
    });
    
    
    // Blogs
    app.get('/blogs', async(req, res) => {
        const result = await blogsCollection.find().toArray();
        res.send(result);
    });

    app.get('/blogs/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await blogsCollection.findOne(query);
        res.send(result);
    })

    app.post('/blogs', async(req, res) => {
        const blog = req.body;
        const result = await blogsCollection.insertOne(blog);
        res.send(result);
    });


    // Skills
    app.get('/skills', async(req, res) => {
        const result = await skillsCollection.find().toArray();
        res.send(result);
    });

    app.post('/skills', async(req, res) => {
        const skill = req.body;
        const result = await skillsCollection.insertOne(skill);
        res.send(result);
    });

    // Experience
    app.get('/experiences', async(req, res) => {
     const result = await experienceCollection.find().toArray();
     res.send(result);
    });

    app.post('/experiences', async(req, res) => {
        const exp = req.body;
        const result = await experienceCollection.insertOne(exp);
        res.send(result);
    });


    // About
    app.get('/about', async(req, res) => {
     const result = await aboutCollection.find().toArray();
     res.send(result);
    });

    app.post('/about', async(req, res) => {
        const ab = req.body;
        const result = await aboutCollection.insertOne(ab);
        res.send(result);
    });

    /* ------------------------------------- Crud Opereation code Here -------------------------------- */







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
}
}
run().catch(console.dir);


/* ---------------------------------- MongoDB code Here ----------------------------------- */




app.listen(port, () => {
    console.log(`My Next Js portfolio server is running on port: ${port}`);
});