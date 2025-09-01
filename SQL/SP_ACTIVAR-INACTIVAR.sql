CREATE OR ALTER PROCEDURE SP_BorrarMascotaLogico
    @ID_Mascota INT,
    @Estado BIT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF @ID_Mascota IS NULL OR @ID_Mascota <= 0 OR @Estado IS NULL
        BEGIN
            SELECT 
                'warning' AS msj_tipo,
                'Debes ingresar los datos obligatorios (Id, Estado).' AS msj_texto;
        END
        ELSE IF EXISTS (SELECT 1 FROM Mascotas WHERE ID_Mascota = @ID_Mascota)
        BEGIN
            UPDATE Mascotas
            SET Estado = @Estado
            WHERE ID_Mascota = @ID_Mascota;
            SELECT 
                'success' AS msj_tipo,
                'Mascota actualizada correctamente.' AS msj_texto;
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

DROP PROCEDURE SP_BorrarMascotaLogico

SELECT * FROM Mascotas

EXEC SP_BorrarMascotaLogico 2, 0;

EXEC SP_BorrarMascotaLogico 4, 0;