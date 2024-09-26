import express from 'express';

const app = express();
const port = 3003;

app.use(express.json())
app.get('/',(request,response) => {
    response.send('Hello World!');
})

app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port)
})
