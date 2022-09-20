// instalamos un modulo 'sdk (https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html)', es una biblioteca de npm para ayudarnos con la comunicación a s3 de aws (la nube) 
import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import {AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY} from './config.js'
import fs from 'fs'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const client = new S3Client ({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})

// Función para subir archivos ... stream es de filesystem, para dividir el archivo en partes pequeñas

export async function uploadFile(file){
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    return await client.send(command)
}

export async function getFiles(){
    const command = new ListObjectsCommand({
         Bucket: AWS_BUCKET_NAME
    })
    return await client.send(command)
}

export async function getFile(filename){
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: filename
    })
    return await client.send(command)

}

export async function downloadFile(filename){
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: filename
    })
    const result = await client.send(command)
    console.log(result)
    result.Body.pipe(fs.createWriteStream(`./images/${filename}`))           //escribiendo el archivo

}

// para usar getSignedUrl
export async function getFileUrl(filename){
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: filename
    })
    return await getSignedUrl(client, command, { expiresIn:3600 })

}