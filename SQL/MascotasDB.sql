IF DB_ID('MascotasDB') IS NULL
  CREATE DATABASE MascotasDB;
GO
USE MascotasDB;
GO
CREATE TABLE Mascotas (
    ID_Mascota INT PRIMARY KEY IDENTITY(1,1),
    Especie NVARCHAR(50),
    Nombre NVARCHAR(120) NOT NULL,
    Raza_Variedad NVARCHAR(50) NOT NULL,
    FechaNacimiento DATE,
    Sexo NVARCHAR(20),
    Peso DECIMAL(5, 2),
    Ubicacion NVARCHAR(150) NULL
);
GO

USE MascotasDB;
GO
ALTER TABLE Mascotas
ADD Estado BIT NOT NULL DEFAULT 1;
GO

INSERT INTO Mascotas(Especie, Nombre, Raza_Variedad, Sexo, Peso, FechaNacimiento, Ubicacion) VALUES
('Canino', 'Manchego', 'Dachshund', 'Macho', 12.0, '2018-10-17', 'San Isidro'),
('Canino', 'Whisky', 'Zaguate', 'Macho', 11.0, '2018-09-16', 'San Isidro'),
('Canino', 'Banger','Poodle', 'Macho', 3.5, '2022-10-20', 'San Isidro'),
('Canino','Runa', 'Zaguate', 'Hembra', 22.8, '2019-08-15', 'San Isidro'),
('Felino', 'Arya', 'Tabby', 'Hembra', 4.3, '2024-05-08', 'San Isidro'),
('Felino', 'Truffa', 'NA', 'Hembra', 3.7, '2022-07-22', 'San Isidro');
TRUNCATE TABLE Mascotas;
SELECT * FROM Mascotas
DROP DATABASE MascotasDB
DELETE Mascotas