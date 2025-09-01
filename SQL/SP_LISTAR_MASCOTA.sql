CREATE OR ALTER PROCEDURE [dbo].[SP_LISTAR_MASCOTAS]     
AS
BEGIN  

		BEGIN TRY
		
			IF EXISTS (SELECT 1 FROM Mascotas)
			BEGIN
				SELECT * FROM Mascotas
 
				SELECT 'success' AS msj_tipo, 'Exito al realizar la acción.' AS msj_texto;  
			END

			ELSE
			BEGIN
				SELECT ''
 
				SELECT 'warning' AS msj_tipo, 'Actualmente, no hay registros de cursos.' AS msj_texto; 
			END	

		END TRY

		BEGIN CATCH

			SELECT ''

			SELECT 'error' AS msj_tipo, ERROR_MESSAGE() AS msj_texto; 

		END CATCH

END

EXEC SP_LISTAR_MASCOTAS
