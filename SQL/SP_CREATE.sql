CREATE PROCEDURE SP_Crear_Mascota
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
        IF LEN(@Nombre) = 0 OR @Nombre IS NULL
        BEGIN
            SELECT 
                'warning' AS msj_tipo, 
                'Debes ingresar un nombre para la mascota.' AS msj_texto;
        END
        ELSE
    BEGIN
       
    INSERT INTO Mascotas (
        Especie, 
        Nombre, 
        Raza_Variedad, 
        FechaNacimiento, 
        Sexo,
        Peso,
        Ubicacion
    )
    VALUES (
        @Especie,
        @Nombre, 
        @Raza_Variedad, 
        @FechaNacimiento, 
        @Sexo,
        @Peso,
        @Ubicacion
    );
    SELECT 
                'success' AS msj_tipo, 
                'Éxito al realizar la acción.' AS msj_texto;
        END

    END TRY

    BEGIN CATCH
        SELECT 
            'error' AS msj_tipo, 
            ERROR_MESSAGE() AS msj_texto;
    END CATCH
END

EXEC SP_Crear_Mascota
    
        @Especie = 'Canino',
        @Nombre = 'Bruno', 
        @Raza_Variedad = 'Zaguate', 
        @FechaNacimiento = '2020-05-26', 
        @Sexo = 'Macho',
        @Peso = 12.0,
        @Ubicacion = 'San Isidro';

EXEC SP_Crear_Mascota
        @Especie = 'Felino',
        @Nombre = 'Dexter', 
        @Raza_Variedad = 'NA', 
        @FechaNacimiento = '2020-07-03', 
        @Sexo = 'Macho',
        @Peso = 5.00,
        @Ubicacion = 'San Isidro';

SELECT * FROM Mis_Mascotas
