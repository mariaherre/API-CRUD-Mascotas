CREATE OR ALTER PROCEDURE SP_Actualizar_Mascota
    @ID_Mascota INT,
    @Especie NVARCHAR(50), 
    @Nombre NVARCHAR(120),
    @Raza_Variedad NVARCHAR(50),
    @FechaNacimiento DATE,
    @Sexo NVARCHAR(20),
    @Peso DECIMAL(5,2),
    @Ubicacion NVARCHAR(150)
AS
BEGIN

	SET NOCOUNT ON;

	 BEGIN TRY
        IF @ID_Mascota <= 0 OR LEN(@Nombre) = 0 OR @Nombre IS NULL
         BEGIN
			SELECT ''
             SELECT 
                 'warning' AS msj_tipo, 
                 'Debes ingresar todos los datos obligatorios (Id y Nombre).' AS msj_texto;
         END
        ELSE IF EXISTS (SELECT 1 FROM Mascotas WHERE ID_Mascota = @ID_Mascota)
         BEGIN
			UPDATE Mascotas
			SET 
			Especie = @Especie,
			Nombre = @Nombre,
			Raza_Variedad = @Raza_Variedad,
			FechaNacimiento = @FechaNacimiento,
			Sexo = @Sexo,
			Peso = @Peso,
			Ubicacion = @Ubicacion
			WHERE
			ID_Mascota = @ID_Mascota

			SELECT ''

             SELECT 
                 'success' AS msj_tipo, 
                 'Mascota actualizada correctamente.' AS msj_texto;
         END
        ELSE
			BEGIN
				SELECT ''
 
				SELECT 'warning' AS msj_tipo, 'Actualmente, no hay datos con el id proporcionado.' AS msj_texto; 
			END	

    END TRY

    BEGIN CATCH
		SELECT ''
         SELECT 
             'error' AS msj_tipo, 
             ERROR_MESSAGE() AS msj_texto;
     END CATCH

END

EXEC SP_Actualizar_Mascota 12, 'Felino', 'Truffa','Negro','2022-07-22', 'Hembra', '4.00','San Isidro';

SELECT*FROM Mascotas