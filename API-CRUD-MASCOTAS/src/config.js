import { config } from "dotenv";
config();

export default {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || "Mis_Mascotas",
    dbPassword: process.env.DB_PASSWORD || "chego123",
    dbServer: process.env.DB_SERVER || "localhost",
    dbDatabase: process.env.DB_DATABASE || "MascotasDB",
}