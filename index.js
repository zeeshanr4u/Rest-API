import express from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import rootrouter from './routes/user.js'

const app = express();

dotenv.config({ path: 'config/config.env' })
app.use(bodyparser.json())


const port = process.env.PORT || 3000;

app.use('/users', rootrouter)

app.get('/', (req, res) => {
    res.send('Hello Home')
})


app.listen(port, () => {
    console.log(`Server Listening on Domain: http://localhost:${port}`);
})