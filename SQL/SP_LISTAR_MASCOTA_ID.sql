CREATE OR ALTER PROCEDURE [dbo].[SP_LISTAR_MASCOTAS_ID]
(@ID_Mascota INT)
AS
BEGIN
    IF @@NESTLEVEL > 30 
    BEGIN
        SELECT ''
        SELECT 'error' AS msj_tipo, 'Maximum nesting level exceeded. Potential infinite loop detected.' AS msj_texto;
        RETURN;
    END

    BEGIN TRY
        IF @ID_Mascota <= 0
        BEGIN
            SELECT ''
            SELECT 'warning' AS msj_tipo, 'Debes ingresar un id valido.' AS msj_texto;
        END
        ELSE IF EXISTS (SELECT 1 FROM Mascotas WHERE ID_Mascota = @ID_Mascota)
        BEGIN
            SELECT * FROM Mascotas WHERE ID_Mascota = @ID_Mascota
            SELECT 'success' AS msj_tipo, 'Exito al realizar la acción.' AS msj_texto;
        END
        ELSE
        BEGIN
            SELECT ''
            SELECT 'warning' AS msj_tipo, 'Actualmente, no hay datos con el id proporcionado.' AS msj_texto;
        END
    END TRY
    BEGIN CATCH
        SELECT ''
        SELECT 'error' AS msj_tipo, ERROR_MESSAGE() AS msj_texto;
    END CATCH
END;


EXEC SP_LISTAR_MASCOTAS_ID 5

SELECT * FROM Mascotas