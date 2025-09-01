import { getConnection, querys, sql } from "../models/index.js";

//CRUD

//GET LISTAR TODOS
export const ListarMascotas = async (req, res) => {

    try{

        const pool  = await getConnection();
        const result = await pool.request().query(querys.ListarMascotas);
        const descripcion = "Endpoint que lista a mis mascotas";

        if (result.recordsets[1][0].msj_tipo === "success") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[1][0].msj_tipo,
                "respuesta_detalle": result.recordsets[1][0].msj_texto,
                "datos": result.recordset,
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);

        } 
        else if (result.recordsets[1][0].msj_tipo === "warning") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[1][0].msj_tipo,
                "respuesta_detalle": result.recordsets[1][0].msj_texto,
                "datos": [],
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);

        } 
        else if (result.recordsets[1][0].msj_tipo === "error") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[1][0].msj_tipo,
                "respuesta_detalle": result.recordsets[1][0].msj_texto,
                "datos": [],
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);
        }

    } catch (error){
        res.status(500);
        res.send(error.message);
    }
};

//GET LISTAR POR ID

export const ListarMascotaID = async (req, res) => {

    try {
        const ID_Mascota = req.params.id;
        const pool = await getConnection();
        const result = await 
            pool
            .request()
            .input("ID_Mascota", sql.Int, ID_Mascota)
            .query(querys.ListarMascotaID);
        const descripcion = `Endpoint que lista a mi mascota con ID: ${ID_Mascota}`;

        if (result.recordsets[1][0].msj_tipo === "success") {
            const resultadoCompleto = {
                 "resultado_tipo": result.recordsets[1][0].msj_tipo,
                "respuesta_detalle": result.recordsets[1][0].msj_texto,
                "datos": result.recordset,
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);

        } 
        else if (result.recordsets[1][0].msj_tipo === "warning") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[1][0].msj_tipo,
                "respuesta_detalle": result.recordsets[1][0].msj_texto,
                "datos": [],
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);

        } 
        else if (result.recordsets[1][0].msj_tipo === "error") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[1][0].msj_tipo,
                "respuesta_detalle": result.recordsets[1][0].msj_texto,
                "datos": [],
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);
        }

    } catch (error) {
        console.error("Error en ListarMascotaID:", error);
        return res.status(500).json({
            "resultado_tipo": "error",
            "respuesta_detalle": "Error interno del servidor",
            "datos": [],
            "descripcion": "No se pudo listar la mascota por ID"
        });
    }
};

//POST CREAR REGISTRO

export const CrearMascota = async (req, res) => {
    try {
        const {Especie, Nombre, Raza_Variedad, FechaNacimiento, Sexo, Peso, Ubicacion} = req.body;
        
        const pool = await getConnection();
        
        const result = await 
        pool
            .request()
            .input("Especie", sql.NVarChar(50), Especie)
            .input("Nombre", sql.NVarChar(120), Nombre)
            .input("Raza_Variedad", sql.NVarChar(50), Raza_Variedad)
            .input("FechaNacimiento", sql.Date, FechaNacimiento)
            .input("Sexo", sql.NVarChar(20), Sexo)
            .input("Peso", sql.Decimal(5,2), Peso)
            .input("Ubicacion", sql.NVarChar(150), Ubicacion)
            .query(querys.CrearMascota);

        const respuestaSP = result.recordsets[0][0];

        const descripcion = `Endpoint que crea una nueva mascota`;

        const resultadoCompleto = {
            "resultado_tipo": respuestaSP.msj_tipo,
            "respuesta_detalle": respuestaSP.msj_texto,
            "datos": (respuestaSP.msj_tipo === "success") ? result.recordsets[0] : [],
            "descripcion": descripcion
        };
        
        return res.json(resultadoCompleto);

    } 
    catch (error) {
        console.error("Error en la función CrearMascota:", error);
        res.status(500).json({
            "error_tipo": "internal_server_error",
            "error_detalle": error.message,
            "descripcion": "Ocurrió un error inesperado al procesar la solicitud."
        });
    }
};

//PUT ACTUALIZAR REGISTRO POR ID

export const ActualizarMascota = async (req, res) => {

    try {

        const ID_Mascota = req.params.id;
        const {Especie, Nombre, Raza_Variedad, FechaNacimiento, Sexo, Peso, Ubicacion} = req.body;
        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Mascota", sql.Int, ID_Mascota)
            .input("Nombre", sql.VarChar, Nombre)
            .input("Especie", sql.VarChar, Especie)
            .input("Raza_Variedad", sql.VarChar, Raza_Variedad)
            .input("FechaNacimiento", sql.Date, FechaNacimiento)
            .input("Sexo", sql.VarChar, Sexo)
            .input("Peso", sql.Float, Peso)
            .input("Ubicacion", sql.VarChar, Ubicacion)
            .query(querys.ActualizarMascota);
        const descripcion = `Endpoint que actualiza a mi mascota con ID: ${ID_Mascota}`;
        if (result.recordsets[1][0].msj_tipo === "success") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[1][0].msj_tipo,
                "respuesta_detalle": result.recordsets[1][0].msj_texto,
                "datos": result.recordset,
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);

        } else if (result.recordsets[1][0].msj_tipo === "warning") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[1][0].msj_tipo,
                "respuesta_detalle": result.recordsets[1][0].msj_texto,
                "datos": [],
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);

        } else if (result.recordsets[1][0].msj_tipo === "error") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[1][0].msj_tipo,
                "respuesta_detalle": result.recordsets[1][0].msj_texto,
                "datos": [],
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);
        }
    } catch (error) {
        const descripcion = "No se pudo actualizar la mascota";
        console.error("Error en ActualizarMascota:", error);
        return res.status(500).json({
            "resultado_tipo": "error",
            "respuesta_detalle": "Error interno del servidor",
            "datos": [],
            "descripcion": descripcion
        });
    }
}

//PATCH ACTUALIZAR PARCIALMENTE REGISTRO POR ID

export const ActualizarMascotaParcial = async (req, res) => {

    const descripcion = `Endpoint que actualiza parcialmente a la mascota con ID: ${req.params.id}`;

    try {

        const ID_Mascota = req.params.id;
        const {Peso, Ubicacion } = req.body;

        const pool = await getConnection();
        const resultado = await pool.request()
            .input("ID_Mascota", sql.Int, ID_Mascota)
            .input("Peso", sql.Float, Peso)
            .input("Ubicacion", sql.VarChar, Ubicacion)
            .query(querys.ActualizarMascotaParcial);


    if (resultado.recordsets[1][0].msj_tipo === "success") {
        const resultadoCompleto = {
            "resultado_tipo": resultado.recordsets[1][0].msj_tipo,
            "respuesta_detalle": resultado.recordsets[1][0].msj_texto,
            "datos": resultado.recordset,
            "descripcion": descripcion
        };
        return res.json(resultadoCompleto);
    }

    else if (resultado.recordsets[1][0].msj_tipo === "warning") {
        const resultadoCompleto = {
            "resultado_tipo": resultado.recordsets[1][0].msj_tipo,
            "respuesta_detalle": resultado.recordsets[1][0].msj_texto,
            "datos": [],
            "descripcion": descripcion
        };
        return res.json(resultadoCompleto);
    }

    else if (resultado.recordsets[1][0].msj_tipo === "error") {
        const resultadoCompleto = {
            "resultado_tipo": resultado.recordsets[1][0].msj_tipo,
            "respuesta_detalle": resultado.recordsets[1][0].msj_texto,
            "datos": [],
            "descripcion": descripcion
        };
        return res.json(resultadoCompleto);
    }
} catch (error) {
    res.status(500);
    const resultadoCompleto = {
        "resultado_tipo": "error",
        "respuesta_detalle": error.message,
        "datos": [],
        "descripcion": descripcion
    };
    return res.json(resultadoCompleto);
    }
};

//DELETE ELIMINAR REGISTRO POR ID
export const EliminarMascota = async (request, res) => {
    const descripcion = `Endpoint que elimina a la mascota con ID: ${request.params.id}`;

    try {
        console.log("Intentando eliminar la mascota con ID:", request.params.id);
        const ID_Mascota = request.params.id;
        const pool = await getConnection();

        const result = await 
        pool
            .request()
            .input("ID_Mascota", sql.Int, ID_Mascota)
            .query(querys.EliminarMascota);

        const respuestaSP = result.recordsets[0][0];

        const resultadoCompleto = {
            "resultado_tipo": respuestaSP.msj_tipo,
            "respuesta_detalle": respuestaSP.msj_texto,
            "datos": (respuestaSP.msj_tipo === "success") ? result.recordsets[0] : [],
            "descripcion": descripcion
        };
        
        res.status(200).json(resultadoCompleto);

    } catch (error) {
        console.error("Error en la función EliminarMascota:", error);
        res.status(500).json({
            "error_tipo": "internal_server_error",
            "error_detalle": error.message,
            "descripcion": descripcion
        });
    }
};

//PATCH ACTIVAR O INACTIVAR REGISTRO O CAMBIAR DE ESTADO

export const BorrarMascotaLogico = async (req, res) => {

    const descripcion = `Endpoint que activa o inactiva a la mascota`;

    try {

        const {id,estado} = req.body;
        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Mascota", sql.Int, id)
            .input("Estado", sql.Bit, estado)
            .query(querys.BorrarMascotaLogico);
        if (result.recordsets[0][0].msj_tipo === "success") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[0][0].msj_tipo,
                "respuesta_detalle": result.recordsets[0][0].msj_texto,
                "datos": result.recordset,
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);
        }

        else if (result.recordsets[0][0].msj_tipo === "warning") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[0][0].msj_tipo,
                "respuesta_detalle": result.recordsets[0][0].msj_texto,
                "datos": [],
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);
        }

        else if (result.recordsets[0][0].msj_tipo === "error") {
            const resultadoCompleto = {
                "resultado_tipo": result.recordsets[0][0].msj_tipo,
                "respuesta_detalle": result.recordsets[0][0].msj_texto,
                "datos": [],
                "descripcion": descripcion
            };
            return res.json(resultadoCompleto);
        }

    } catch (error) {
        res.status(500);
        const resultadoCompleto = {
            "resultado_tipo": "error",
            "respuesta_detalle": error.message,
            "datos": [],
            "descripcion": descripcion
        };
        return res.json(resultadoCompleto);
    }
};