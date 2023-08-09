@echo off

REM Cambia las siguientes variables según tu configuración
set "serverName=DESKTOP-GHP6TE8"  REM Nombre o dirección IP del servidor SQL
set "dbName=DB_Test"              REM Nombre de la base de datos que deseas crear
set "tableName=tb_tareas"          REM Nombre de la tabla que deseas crear
set "sqlAuthUser=tester"          REM Usuario con permisos para crear bases de datos y tablas
set "sqlAuthPass=user@test2023"   REM Contraseña del usuario

REM Comando SQL para crear la base de datos
sqlcmd -S %serverName% -U %sqlAuthUser% -P %sqlAuthPass% -Q "CREATE DATABASE %dbName%;"

REM Comando SQL para cambiar a la base de datos recién creada
sqlcmd -S %serverName% -d %dbName% -U %sqlAuthUser% -P %sqlAuthPass% -Q "USE %dbName%;"

REM Comando SQL para crear la tabla en la base de datos
sqlcmd -S %serverName% -d %dbName% -U %sqlAuthUser% -P %sqlAuthPass% -Q "CREATE TABLE %tableName% (ID INT IDENTITY(1,1) PRIMARY KEY, Nombre VARCHAR(50), DescripcionTarea VARCHAR(250), FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FechaModificacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, Prioridad VARCHAR(50), Estado BIT );"

REM Comando SQL para crear el disparador para actualizar FechaModificacion
sqlcmd -S %serverName% -d %dbName% -U %sqlAuthUser% -P %sqlAuthPass% -Q "CREATE TRIGGER UpdateFechaModificacion ON %tableName% AFTER UPDATE AS BEGIN UPDATE %tableName% SET FechaModificacion = CURRENT_TIMESTAMP FROM %tableName% t JOIN inserted i ON t.ID = i.ID; END;"

echo Base de datos, tabla, columna calculada, índice y disparador creados exitosamente.

pause
