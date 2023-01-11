const app = require('./app')
const port = 3000;
app.listen(process.env.port || port, ()=> {
    console.log(`Server listening at port ${port}`);
})