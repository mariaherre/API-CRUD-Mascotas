
export const querys = {

//CRUD

//GET LISTAR TODOS
ListarMascotas : "SP_LISTAR_MASCOTAS",

//GET LISTAR POR ID
ListarMascotaID : "SP_LISTAR_MASCOTAS_ID @ID_Mascota",

//POST CREAR REGISTRO
CrearMascota: `SP_Crear_Mascota @Especie, @Nombre, @Raza_Variedad, @FechaNacimiento, @Sexo, @Peso, @Ubicacion`,

//PUT ACTUALIZAR REGISTRO POR ID
ActualizarMascota : `SP_ACTUALIZAR_MASCOTA @ID_Mascota, @Especie, @Nombre, @Raza_Variedad, @FechaNacimiento, @Sexo, @Peso, @Ubicacion`,

//PATCH ACTUALIZAR PARCIALMENTE REGISTRO POR ID
ActualizarMascotaParcial : `SP_Mascotas_Actualizacion_Parcial @ID_Mascota, @Peso, @Ubicacion`,

//DELETE ELIMINAR REGISTRO POR ID

EliminarMascota: `SP_Eliminar_Mascotas @ID_Mascota = @ID_Mascota;`,

//PATCH ACTIVAR O INACTIVAR REGISTRO O CAMBIAR DE ESTADO
BorrarMascotaLogico : `SP_BorrarMascotaLogico @ID_Mascota, @Estado`,

}