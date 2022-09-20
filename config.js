// primero instalamos el modulo dotenv que es para que desde aca leamos el archivo .env

import {
    config
} from 'dotenv'
// la funcion que lee el archivo se llama config

config()

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
export const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

