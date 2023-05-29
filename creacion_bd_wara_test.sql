--usar master
use master

go

--crear login
CREATE LOGIN elipinto
WITH PASSWORD='elipinto'

go

--crear base de datos
create database wara_test_elipinto

go

--decir que base de datos usara
use wara_test_elipinto;

go

--crear usuario
CREATE USER elipinto 
FOR LOGIN elipinto

go

--permisos usuario elipinto

--asociar schema dbo al usuario elipinto
GRANT ALTER ON SCHEMA::dbo TO elipinto

go

--permisos de modificacion en el schema dbo para elipnto
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA :: [dbo] TO elipinto

go

--permiso para crear tablas
grant create table to elipinto

go 

--permiso para conectarse
grant connect to elipinto

go

--permiso para ejecutar procedures
GRANT EXECUTE TO elipinto


go


CREATE TABLE empleados (
	[id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[nombre] [nvarchar](255) NOT NULL,
	[apellido] [nvarchar](255) NOT NULL,
	[puesto] [nvarchar](255) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL
)

go


CREATE OR ALTER PROCEDURE agregarEmpleado
@nombre [nvarchar](255),
@apellido [nvarchar](255),
@puesto [nvarchar](255)
AS
BEGIN
	DECLARE @empleado_id [bigint];
	INSERT INTO empleados
		(
			nombre,
			apellido,
			puesto,
			created_at
		)
    VALUES
		(
			@nombre,
			@apellido,
			@puesto,
			CURRENT_TIMESTAMP
		)
	SET @empleado_id = SCOPE_IDENTITY()
	select id, nombre, apellido, puesto, created_at, updated_at from empleados where id = @empleado_id
END

GO

CREATE OR ALTER PROCEDURE modificarEmpleado
@id [bigint],
@nombre [nvarchar](255),
@apellido [nvarchar](255),
@puesto [nvarchar](255)
AS
BEGIN
	update 
		empleados
	set 
		nombre = @nombre,
		apellido = @apellido,
		puesto = @puesto,
		updated_at = CURRENT_TIMESTAMP
	where 
		id = @id

	select id, nombre, apellido, puesto, created_at, updated_at from empleados where id = @id
END

go


--instalamos php
--configuraos el php.ini para activar las exntesiones requeridas por composer
--configuramos el driver de sql server y activamos su extension
--instalamos composer
--configuramos el proyecto laravel
--dio error
--configuramos la extension filesystem
--creamos proyecto laravel
--migramos las tablas
--creamos el front con react, axios y bootstrp
--proyecto c# con entity framework netcore