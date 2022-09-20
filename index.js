import express from 'express'
import fileupload from 'express-fileupload'
import { uploadFile, getFiles, getFile, downloadFile, getFileUrl } from './s3.js'

const app = express()

app.use(fileupload({
    useTempFiles: true,             //pidiendo que ubique los archivos dentro del proyexto
    tempFileDir: './uploads'        //nombrando en que dirección guardar los archivos
}))

app.get('/files', async (req, res) => {
    const result = await getFiles()
    res.json(result.Contents)
})

app.get('/files/:fileName', async (req, res) => {
    const result = await getFileUrl(req.params.fileName)
    res.json({
        url: result
    })
})

app.get('/downloadfile/:fileName', async (req, res) => {
    await downloadFile(req.params.fileName)
    res.json({message:"archivo descargado"})
})

// instalamos una extension llamada thunder client ((icono de rayo <<)que es algo similar a postman, para probar url y peticiones? get,post, etc)
app.post('/files', async (req, res) => {
    const result = await uploadFile(req.files.file)
    res.json({ result })
})

app.use(express.static('images'))

app.listen(3000)
console.log(`Server on in port ${3000}`)