import { config } from 'dotenv';
config();

console.log(process.env.SERVER_PORT);

export default{
    serverPort: process.env.SERVER_PORT || 3000,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbServer: process.env.DB_SERVER || '',
    dbDatabase: process.env.DB_DATABASE || '',
}