CREATE OR ALTER PROCEDURE SP_Eliminar_Mascotas
    @ID_Mascota INT
AS
BEGIN
    IF @@NESTLEVEL > 30 -- Adjust this number as needed
    BEGIN
        SELECT ''
        SELECT 'error' AS msj_tipo, 'Maximum nesting level exceeded. Potential infinite loop detected.' AS msj_texto;
        RETURN;
    END
    SET NOCOUNT ON;

    BEGIN TRY
        IF @ID_Mascota IS NULL OR @ID_Mascota <= 0
        BEGIN
            SELECT 
                'warning' AS msj_tipo,
                'Debes ingresar el dato obligatorio (Id).' AS msj_texto;
        END
        ELSE IF EXISTS (SELECT 1 FROM Mascotas WHERE ID_Mascota = @ID_Mascota)
        BEGIN
            DELETE FROM Mascotas
            WHERE ID_Mascota = @ID_Mascota;

            SELECT 
                'success' AS msj_tipo,
                'Mascota eliminada correctamente.' AS msj_texto;
        END
        ELSE
        BEGIN
            SELECT 
                'warning' AS msj_tipo, 
                'Actualmente, no hay datos con el id proporcionado.' AS msj_texto; 
        END
    END TRY
    BEGIN CATCH
        SELECT 
            'error' AS msj_tipo, 
            ERROR_MESSAGE() AS msj_texto;
    END CATCH
END;

SELECT * FROM Mascotas

EXEC SP_Eliminar_Mascotas 1

EXEC SP_Eliminar_Mascotas 5

DROP PROCEDURE SP_Eliminar_Mascotas

