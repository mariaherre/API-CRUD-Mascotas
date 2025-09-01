import { Router } from "express";
import { getConnection } from "../models/connectionSqlServer.js";
import {sql} from "../models/connectionSqlServer.js";
import {ListarMascotas} from "../controllers/mascotas.controller.js";
import {ListarMascotaID} from "../controllers/mascotas.controller.js";
import {CrearMascota} from "../controllers/mascotas.controller.js";
import {ActualizarMascota} from "../controllers/mascotas.controller.js";
import {ActualizarMascotaParcial} from "../controllers/mascotas.controller.js";
import {EliminarMascota} from "../controllers/mascotas.controller.js";
import {BorrarMascotaLogico} from "../controllers/mascotas.controller.js";

const router = Router();

//CRUD
router.get("/ListarMascotas", ListarMascotas); //DONE

router.get("/ListarMascotaID/:id", ListarMascotaID); //DONE

router.post("/CrearMascota", CrearMascota); //DONE

router.put("/ActualizarMascota/:id", ActualizarMascota);//DONE

router.patch("/ActualizarMascotaParcial/:id", ActualizarMascotaParcial);//DONE

router.delete("/EliminarMascotas/:id", EliminarMascota);//DONE

router.patch("/BorrarMascotaLogico", BorrarMascotaLogico);//DONE

export default router;
