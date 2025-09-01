CREATE OR ALTER PROCEDURE SP_Mascotas_Actualizacion_Parcial
    (
     @ID_Mascota INT,
     @Peso DECIMAL(5,2),
     @Ubicacion NVARCHAR(150)
   )
AS
BEGIN

	SET NOCOUNT ON;

	 BEGIN TRY
         IF @ID_Mascota <= 0
         BEGIN
			SELECT ''
             SELECT 
                 'warning' AS msj_tipo, 
                 'Debes ingresar un ID válido para la mascota.' AS msj_texto;
         END
         ELSE IF EXISTS (SELECT 1 FROM Mascotas WHERE ID_Mascota = @ID_Mascota)
         BEGIN
			UPDATE Mascotas
			SET 
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
 
				SELECT 'warning' AS msj_tipo, 'Actualmente, no hay datos con el ID proporcionado.' AS msj_texto; 
			END	

     END TRY

     BEGIN CATCH
		SELECT ''
         SELECT 
             'error' AS msj_tipo, 
             ERROR_MESSAGE() AS msj_texto;
     END CATCH

END

EXEC SP_Mascotas_Actualizacion_Parcial 40, 11.50, 'Miramar';

EXEC SP_Mascotas_Actualizacion_Parcial 41, 12.00, 'Miramar';

SELECT * FROM Mascotas