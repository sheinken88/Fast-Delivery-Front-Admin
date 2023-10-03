import { Cloudinary } from '@cloudinary/url-gen'

const cld = new Cloudinary({ cloud: { cloudName: 'db3pcwsrm' } })

const API_URL = 'http://localhost:8080'

export { API_URL, cld }
