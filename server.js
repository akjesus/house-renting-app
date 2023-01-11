const app = require('./app')
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const port = process.env.PORT;


app.listen(port, ()=> {
    console.log(`Ultra Homes APP listening at port ${port}`);
})