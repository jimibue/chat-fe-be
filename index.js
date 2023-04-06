import express from 'express'
import cors from 'cors'
import apiRoutes from './api/index.js'
import basicRoutes from './api/openAI/basic.routes.js';
import path from 'path';

const app = express()

app.use(express.json())
app.use(cors()) 

app.use("/api", apiRoutes);
const dirname = path.dirname(new URL(import.meta.url).pathname); 
app.use(express.static(path.join(dirname, 'public')));


// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(dirname, 'public', 'index.html'));
});
  

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})