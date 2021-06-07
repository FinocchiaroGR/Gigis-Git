
#--=======================================================================--
#--============================  Crear Tablas ============================--
#--=======================================================================--

CREATE TABLE `ciclos` 
(
    `idCiclo` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fechaInicial` DATE NOT NULL , 
    `fechaFinal` DATE NOT NULL
)
ENGINE = InnoDB;

CREATE TABLE `programas` 
( 
    `idPrograma` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `nombrePrograma` VARCHAR(50) NOT NULL , 
    `puntajeMaximo` INT NOT NULL , 
    `dirImagen` VARCHAR(100) NULL
) 
ENGINE = InnoDB;

CREATE TABLE `niveles` 
(
    `idNivel` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `nombreNivel` VARCHAR(50) NOT NULL , 
    `idPrograma` INT NOT NULL
) 
ENGINE = InnoDB;

CREATE TABLE `objetivos` ( 
    `idNivel` INT NOT NULL , 
    `idObjetivo` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `descripcion` VARCHAR(400) NOT NULL ,
    `fechaRegistroObj` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `status` BOOLEAN NOT NULL DEFAULT TRUE
    ) 
ENGINE = InnoDB;


CREATE TABLE `funciones` 
( 
    `idFuncion` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `requisitoFuncional` VARCHAR(50) NOT NULL
) 
ENGINE = InnoDB;

CREATE TABLE `roles` 
( 
    `idRol` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `nombre` VARCHAR(30) NOT NULL
) 
ENGINE = InnoDB;

CREATE TABLE `usuarios` 
( 
    `login` VARCHAR(50) NOT NULL PRIMARY KEY, 
    `password` VARCHAR(250) NOT NULL , 
    `nombreUsuario` VARCHAR(50) NULL , 
    `apellidoPaterno` VARCHAR(50) NULL , 
    `apellidoMaterno` VARCHAR(50) NULL
) 
ENGINE = InnoDB;

CREATE TABLE `terapeutas` 
( 
    `login` VARCHAR(50) NOT NULL PRIMARY KEY, 
    `titulo` VARCHAR(50) NULL , 
    `cv` VARCHAR(200) NULL , 
    `estatus` CHAR(1) NOT NULL
) 
ENGINE = InnoDB;

CREATE TABLE `participantes` 
( 
    `login` VARCHAR(50) NOT NULL PRIMARY KEY, 
    `estatus` CHAR(1) NOT NULL DEFAULT 'A',
    `sexo` CHAR(1) NOT NULL , 
    `fechaNacimiento` DATE NOT NULL , 
    `telefonoPadre` VARCHAR(12) NULL
) 
ENGINE = InnoDB;

CREATE TABLE `grupos` 
(
    `idGrupo` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `numeroGrupo` INT NOT NULL , 
    `idPrograma` INT NOT NULL , 
    `idCiclo` INT NOT NULL
) 
ENGINE = InnoDB;

CREATE TABLE `roles_funciones` 
( 
    `idRol` INT NOT NULL , 
    `idfuncion` INT NOT NULL , 
    `fechaRF` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY  (`idRol`, `idfuncion`)
) 
ENGINE = InnoDB;

CREATE TABLE `usuarios_roles`  
( 
    `login` VARCHAR(50) NOT NULL , 
    `idRol` INT NOT NULL , 
    `fechaUR` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY  (`login`, `idRol`)
) 
ENGINE = InnoDB;

CREATE TABLE `grupos_terapeutas` 
( 
    `idGrupo` INT NOT NULL , 
    `login` VARCHAR(50) NOT NULL , 
    `fechaAsignacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`idGrupo`, `login`)
) 
ENGINE = InnoDB;

CREATE TABLE `participantes_grupos_objetivo` 
( 
    `login` VARCHAR(50) NOT NULL , 
    `idGrupo` INT NOT NULL , 
    `idNivel` INT NOT NULL , 
    `idObjetivo` INT NOT NULL , 
    `puntajeInicial` INT NULL , 
    `puntajeFinal` INT NULL,
    PRIMARY KEY  (`login`, `idGrupo`, `idNivel`, `idObjetivo`)
) 
ENGINE = InnoDB;



#--=======================================================================--
#--========================== Crear Constraints ==========================--
#--=======================================================================--

#---------------------------------------------------------------------------
#-------------------------  Crear Llaves foraneas --------------------------
#---------------------------------------------------------------------------

ALTER TABLE `niveles` 
ADD CONSTRAINT `cfniveles_idprograma_programas` 
FOREIGN KEY (`idPrograma`) 
REFERENCES `programas`(`idPrograma`) 
ON DELETE CASCADE 
ON UPDATE CASCADE;

ALTER TABLE `objetivos` 
ADD CONSTRAINT `cfobjetivos_idNivel_niveles` 
FOREIGN KEY (`idNivel`) 
REFERENCES `niveles`(`idNivel`) 
ON DELETE CASCADE 
ON UPDATE CASCADE;

ALTER TABLE `roles_funciones` 
ADD CONSTRAINT `cfroles_funciones_idFuncion_funciones` 
FOREIGN KEY (`idFuncion`) 
REFERENCES `funciones`(`idFuncion`) 
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `roles_funciones` 
ADD CONSTRAINT `cfroles_funciones_idRol_roles` 
FOREIGN KEY (`idRol`) 
REFERENCES `roles`(`idRol`) 
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `usuarios_roles` 
ADD CONSTRAINT `cfusuarios_roles_login_usuarios` 
FOREIGN KEY (`login`) 
REFERENCES `usuarios`(`login`) 
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `usuarios_roles` 
ADD CONSTRAINT `cfusuarios_roles_idRol_roles` 
FOREIGN KEY (`idRol`) 
REFERENCES `roles`(`idRol`) 
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `terapeutas` 
ADD CONSTRAINT `cfterapeutas_login_usuarios` 
FOREIGN KEY (`login`) 
REFERENCES `usuarios`(`login`) 
ON DELETE RESTRICT 
ON UPDATE CASCADE;

ALTER TABLE `participantes` 
ADD CONSTRAINT `cfparticipantes_login_usuarios` 
FOREIGN KEY (`login`) 
REFERENCES `usuarios`(`login`) 
ON DELETE RESTRICT
ON UPDATE CASCADE;

ALTER TABLE `grupos` 
ADD CONSTRAINT `cfgrupos_idprograma_programas` 
FOREIGN KEY (`idPrograma`) 
REFERENCES `programas`(`idPrograma`) 
ON DELETE CASCADE 
ON UPDATE CASCADE;

ALTER TABLE `grupos` 
ADD CONSTRAINT `cfgrupos_idciclo_cicloss` 
FOREIGN KEY (`idCiclo`) 
REFERENCES `ciclos`(`idCiclo`) 
ON DELETE CASCADE 
ON UPDATE CASCADE;

ALTER TABLE `grupos_terapeutas` 
ADD CONSTRAINT `cfgrupos_terapeutas_idGrupo_grupos` 
FOREIGN KEY (`idGrupo`) 
REFERENCES `grupos`(`idGrupo`) 
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `grupos_terapeutas` 
ADD CONSTRAINT `cfgrupos_terapeutas_login_terapeutas` 
FOREIGN KEY (`login`) 
REFERENCES `terapeutas`(`login`) 
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `participantes_grupos_objetivo` 
ADD CONSTRAINT `cfpuntajes_login_participantes` 
FOREIGN KEY (`login`) 
REFERENCES `participantes`(`login`) 
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `participantes_grupos_objetivo` 
ADD CONSTRAINT `cfpuntajes_idGrupo_grupos` 
FOREIGN KEY (`idGrupo`) 
REFERENCES `grupos`(`idGrupo`) 
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `participantes_grupos_objetivo` 
ADD CONSTRAINT `cfpuntajes_idObjetivo_objetivos` 
FOREIGN KEY (`idNivel`, `idObjetivo`) 
REFERENCES `objetivos`(`idNivel`, `idObjetivo`) 
ON DELETE RESTRICT 
ON UPDATE RESTRICT;

#---------------------------------------------------------------------------
#------------------------ Crear uniques & checks ---------------------------
#---------------------------------------------------------------------------

ALTER TABLE `ciclos`
ADD CONSTRAINT `CK_fechaInicial_vs_fechaFinal`
CHECK (fechaInicial < fechaFinal);

ALTER TABLE programas 
ADD UNIQUE `nombre_unico` (`nombrePrograma`);

ALTER TABLE roles 
ADD UNIQUE `nombreRol_unico` (`nombre`);



#--=========================================================================
#--============================  Crear Vistas  =============================
#--=========================================================================

CREATE VIEW CalifDatos AS (SELECT
    Punt.login,
    U.nombreUsuario,
    U.apellidoPaterno,
    U.apellidoMaterno,
    Part.sexo,
    TIMESTAMPDIFF(YEAR,Part.`fechaNacimiento`, CURRENT_TIMESTAMP()) AS `Edad_Actual`,
    TIMESTAMPDIFF(YEAR,Part.`fechaNacimiento`, C.fechaFinal) AS `Edad_Matriculacion`,
	G.idGrupo,
    G.idCiclo,
    G.idPrograma,
    P.puntajeMaximo,
    Punt.idNivel,
    AVG(Punt.puntajeInicial) AS `CalifInicial`,
    AVG(Punt.puntajeFinal) AS `CalifFinal`,
    ((AVG(Punt.puntajeFinal) - AVG(Punt.puntajeInicial)) / (P.puntajeMaximo-1)) * 100 AS `Avance`
FROM
    participantes_grupos_objetivo Punt,
    grupos G,
    programas P,
    usuarios U,
    participantes Part,
    ciclos C
WHERE
    Punt.idGrupo = G.idGrupo 
    AND G.idPrograma = P.idPrograma 
    AND U.login = Punt.login
    AND U.login = Part.login
    AND C.idCiclo = G.idCiclo
GROUP BY
    Punt.login,
    Punt.idGrupo,
    Punt.idNivel);

#---------------------------------------------------------------------------

CREATE VIEW grupos_programas_ciclos AS 
(SELECT 
    P.nombrePrograma, 
    P.idPrograma, 
    G.idCiclo, 
    G.idGrupo,
    GT.login
FROM 
    programas P, 
    grupos G,
    grupos_terapeutas GT 
WHERE 
    P.idPrograma = G.idPrograma AND
    G.idGrupo = GT.idGrupo 
GROUP BY 
    (idGrupo));



#--=========================================================================
#--==========================  Inserts Iniciales  ==========================
#--=========================================================================

INSERT INTO usuarios (login, password, nombreUsuario, apellidoPaterno, apellidoMaterno) 
    VALUES ('sandra@hotmail.com','$2a$12$opSzIUOqyS1hlYR5CPXvWOBoDUYG6AXjlHr3weEV3E1DMl0JE9PE2','Sandra','Tello','Del Valle');
#-- Usuario: sandra@hotmail.com  Password: sandra525&

INSERT INTO funciones (idFuncion, requisitoFuncional) 
    VALUES 
       (1,'Registrar Programa'), 
       (2,'Modificar Datos de Programas'), 
       (3,'Inscribir Participantes'), 
       (4,'Agregar Ciclo'), 
       (5,'Consultar Programas'), 
       (6,'Editar Participante'), 
       (7,'Generar Archivo de Descarga'), 
       (8,'Registrar Usuario'), 
       (9,'Modificar Usuario'), 
       (10,'Modificar Funciones Del Rol'), 
       (11,'Modificar Ciclo'), 
       (12,'Crear Rol'), 
       (13,'Cambiar Rol De Usuarios'), 
       (14,'Consultar Historial de Participantes'), 
       (15,'Registrar Puntaje de Participante'), 
       (16,'Modificar Objetivos de Niveles'), 
       (17,'Eliminar Usuario'), 
       (18,'Agregar Objetivos'), 
       (19,'Eliminar Objetivos'), 
       (20,'Registrar Participante'), 
       (21,'Inscribir Participantes por Grupo Asignado');

INSERT INTO roles (`idRol`, `nombre`) VALUES (null,'Participante'), (null,'Terapeuta'), (null,'Gestor'), (null,'Administrador');

INSERT INTO `roles_funciones` (`idRol`, `idfuncion`) 
    VALUES 
        ('4', '1'),
        ('4', '2'),
        ('4', '3'),
        ('4', '4'),
        ('4', '5'),
        ('4', '6'),
        ('4', '7'),
        ('4', '8'),
        ('4', '9'),
        ('4', '10'),
        ('4', '11'),
        ('4', '12'),
        ('4', '13'),
        ('4', '14'),
        ('4', '15'),
        ('4', '16'),
        ('4', '17'),
        ('4', '18'),
        ('4', '19'),
        ('4', '20'),
        ('4', '21');

INSERT INTO `usuarios_roles` (`login`, `idRol`) VALUES ('sandra@hotmail.com', '4');

#--=========================================================================
#--=========================== Stored Procedures ===========================
#--=========================================================================

#---------------------------------------------------------------------------
#-------------------------------- Consultas --------------------------------
#---------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE crearConsultaCalif (
    IN `Filtrar_edad` BOOLEAN, 
    IN `Filtrar_sexo` BOOLEAN,
    IN `Calif_Ava` BOOLEAN,
    IN `Ciclo_ini` INT, 
    IN `Ciclo_fin` INT, 
    IN `Edad_ini` INT, 
    IN `Edad_fin` INT,
    IN `Sexo` VARCHAR(1),
    IN `numProg` INT, 
    In `Programas` VARCHAR(255) 
)
BEGIN
    #Crear tabla de programas TEMP
    CALL getProgs(Programas);

    #Crear tabla temporal de datos
    SET @edIni = 0; 
    SET @edFin = 200; 
    IF Filtrar_edad = TRUE THEN
        IF Filtrar_sexo = TRUE THEN
            CALL crearTablaTempDatos1(Ciclo_ini, Ciclo_fin, Edad_ini, Edad_fin, Sexo);
        ELSE
            CALL crearTablaTempDatos2(Ciclo_ini, Ciclo_fin, Edad_ini, Edad_fin);
        END IF;
        SET @edIni = Edad_ini; 
        SET @edFin = Edad_fin; 
    ELSE
        IF Filtrar_sexo = TRUE THEN
            CALL crearTablaTempDatos3(Ciclo_ini, Ciclo_fin, Sexo);
        ELSE
            CALL crearTablaTempDatos4(Ciclo_ini, Ciclo_fin);
        END IF;
    END IF;

    #Asignar login como llave primaria
    ALTER TABLE datosPart_temp
    ADD CONSTRAINT pk_login_partTemp
    PRIMARY KEY (login);

    #Merge de la tabla de datos con las calificaciones

    SET @progCont := 0; 
    SET @cicloCont := 0;
    SET @x = 0; 
    REPEAT 
        SET @x = @x + 1; 
        IF Calif_Ava = TRUE THEN
            CALL mergeTablaCalif_datos ((Ciclo_ini + @cicloCont), (SELECT idPrograma FROM listProg_temp WHERE contProg = @progCont+1), @x, @edIni, @edFin);
        ELSE
            CALL mergeTablaAva_datos ((Ciclo_ini + @cicloCont), (SELECT idPrograma FROM listProg_temp WHERE contProg = @progCont+1), @x, @edIni, @edFin);
        END IF;

        if(((@progCont+1) % numProg) = 0) THEN 
            SET @progCont := 0; 
            SET @cicloCont := @cicloCont +1;
        ELSE
            SET @progCont := @progCont +1;
        END IF;
    UNTIL @x >= ((Ciclo_fin-Ciclo_ini+1)*numProg) 
    END REPEAT;

    DROP TABLE IF EXISTS ultimaConsulta;

    SET @sql = CONCAT('CREATE TABLE `ultimaConsulta` AS SELECT * FROM datosPart_temp',CAST(@x AS CHAR)); 
    PREPARE stmt FROM @sql; 
    EXECUTE stmt; 
    DEALLOCATE PREPARE stmt; 
END
$$

DELIMITER ;              

#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE getProgs ( IN arrayProg VARCHAR(255) ) 
BEGIN 
    DROP TEMPORARY TABLE IF EXISTS listProg_temp;

    SET @sql = CONCAT('CREATE TEMPORARY TABLE `listProg_temp` AS SELECT * FROM programas WHERE idPrograma IN (',CAST(arrayProg AS CHAR), ')'); 
    PREPARE stmt FROM @sql; 
    EXECUTE stmt; 
    DEALLOCATE PREPARE stmt; 

    ALTER TABLE `listProg_temp` ADD `contProg` INT NOT NULL AUTO_INCREMENT AFTER `idPrograma`, ADD PRIMARY KEY (`contProg`);
END
$$

DELIMITER ;

#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE crearTablaTempDatos1 (
    IN `Ciclo_ini` INT, 
    IN `Ciclo_fin` INT, 
    IN `Edad_ini` INT, 
    IN `Edad_fin` INT,
    IN `Sexo` VARCHAR(1) 
) 
BEGIN
    DROP TEMPORARY TABLE IF EXISTS datosPart_temp;
    
    CREATE TEMPORARY TABLE datosPart_temp AS
    SELECT C.login, C.nombreUsuario, C.apellidoPaterno, C.apellidoMaterno, C.sexo, GROUP_CONCAT(DISTINCT C.Edad_Matriculacion SEPARATOR ',') AS `Edad`, C.idPrograma, C.idCiclo, C.idGrupo
    FROM CalifDatos C 
    WHERE C.idCiclo >= Ciclo_ini AND C.idCiclo <= Ciclo_fin 
      AND C.Edad_Matriculacion >= Edad_ini AND C.Edad_Matriculacion <= Edad_fin
      AND C.sexo = Sexo
      AND C.idPrograma IN (SELECT idPrograma FROM listProg_temp)
    GROUP BY C.login;
END
$$

DELIMITER ;

#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE crearTablaTempDatos2 (
    IN `Ciclo_ini` INT, 
    IN `Ciclo_fin` INT, 
    IN `Edad_ini` INT, 
    IN `Edad_fin` INT
)
BEGIN
    DROP TEMPORARY TABLE IF EXISTS datosPart_temp;

    CREATE TEMPORARY TABLE `datosPart_temp` AS
    SELECT C.login, C.nombreUsuario, C.apellidoPaterno, C.apellidoMaterno, C.sexo, GROUP_CONCAT(DISTINCT C.Edad_Matriculacion SEPARATOR ',') AS `Edad`, C.idPrograma, C.idCiclo, C.idGrupo
    FROM CalifDatos C 
    WHERE C.idCiclo >= Ciclo_ini AND C.idCiclo <= Ciclo_fin 
      AND C.Edad_Matriculacion >= Edad_ini AND C.Edad_Matriculacion <= Edad_fin
      AND C.idPrograma IN (SELECT idPrograma FROM listProg_temp)
    GROUP BY C.login;
END
$$

DELIMITER ;

#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE crearTablaTempDatos3 (
    IN `Ciclo_ini` INT, 
    IN `Ciclo_fin` INT,
    IN `Sexo` VARCHAR(1)
) 
BEGIN
    DROP TEMPORARY TABLE IF EXISTS datosPart_temp;

    CREATE TEMPORARY TABLE `datosPart_temp` AS
    SELECT C.login, C.nombreUsuario, C.apellidoPaterno, C.apellidoMaterno, C.sexo, GROUP_CONCAT(DISTINCT C.Edad_Matriculacion SEPARATOR ',') AS `Edad`, C.idPrograma, C.idCiclo, C.idGrupo
    FROM CalifDatos C 
    WHERE C.idCiclo >= Ciclo_ini AND C.idCiclo <= Ciclo_fin
      AND C.sexo = Sexo
      AND C.idPrograma IN (SELECT idPrograma FROM listProg_temp)
    GROUP BY C.login;
END
$$

DELIMITER ;

#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE crearTablaTempDatos4 (
    IN `Ciclo_ini` INT, 
    IN `Ciclo_fin` INT
)  
BEGIN
    DROP TEMPORARY TABLE IF EXISTS datosPart_temp;

    CREATE TEMPORARY TABLE `datosPart_temp` AS
    SELECT C.login, C.nombreUsuario, C.apellidoPaterno, C.apellidoMaterno, C.sexo, GROUP_CONCAT(DISTINCT C.Edad_Matriculacion SEPARATOR ',') AS `Edad`, C.idPrograma, C.idCiclo, C.idGrupo
    FROM CalifDatos C 
    WHERE C.idCiclo >= Ciclo_ini AND C.idCiclo <= Ciclo_fin
      AND C.idPrograma IN (SELECT idPrograma FROM listProg_temp)
    GROUP BY C.login;
END
$$

DELIMITER ;

#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE mergeTablaCalif_datos(IN `Ciclo` INT, IN `Programa` INT, IN `Num` INT,IN `Edad_ini` INT,IN `Edad_fin` INT)
BEGIN
    SET @droptable = CONCAT ('DROP TEMPORARY TABLE IF EXISTS `datosPart_temp', CAST(Num AS CHAR), '`');
    
    SET @sql = CONCAT(
            'CREATE TEMPORARY TABLE `datosPart_temp', CAST(Num AS CHAR), '` AS',
            ' SELECT t1.*, t2.CalifInicial_P',CAST(Programa AS CHAR),'_C',CAST(Ciclo AS CHAR),', t2.CalifFinal_P',CAST(Programa AS CHAR),'_C',CAST(Ciclo AS CHAR),' FROM',
            ' (SELECT * FROM  datosPart_temp', IF(Num=1,'',Num-1), ') t1',
            ' LEFT OUTER JOIN',
            ' (SELECT login, CalifInicial AS `CalifInicial_P',CAST(Programa AS CHAR),'_C',CAST(Ciclo AS CHAR),'`, CalifFinal AS `CalifFinal_P',CAST(Programa AS CHAR),'_C',CAST(Ciclo AS CHAR),'`',
            ' FROM CalifDatos WHERE idCiclo = ',CAST(Ciclo AS CHAR),' AND idPrograma = ',CAST(Programa AS CHAR),' AND Edad_Matriculacion >= ',CAST(Edad_ini AS CHAR),' AND Edad_Matriculacion <= ',CAST(Edad_fin AS CHAR),')',
            ' t2 ON (t1.login = t2.login)'
        );
    PREPARE deletetb FROM @droptable;
    PREPARE createtb FROM @sql ;

    EXECUTE deletetb ; 
    EXECUTE createtb; 

    DEALLOCATE PREPARE createtb ;
    DEALLOCATE PREPARE deletetb ;
END 
$$

DELIMITER ;

#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE mergeTablaAva_datos(IN `Ciclo` INT, IN `Programa` INT, IN `Num` INT,IN `Edad_ini` INT,IN `Edad_fin` INT)
BEGIN
    SET @droptable = CONCAT ('DROP TEMPORARY TABLE IF EXISTS `datosPart_temp', CAST(Num AS CHAR), '`');
    SET @sql = CONCAT(
            'CREATE TEMPORARY TABLE `datosPart_temp', CAST(Num AS CHAR), '` AS',
            ' SELECT t1.*, t2.Avance_P', CAST(Programa AS CHAR), '_C', CAST(Ciclo AS CHAR),' FROM',
            ' (SELECT * FROM  datosPart_temp', IF(Num=1,'',Num-1), ') t1',
            ' LEFT OUTER JOIN',
            ' (SELECT login, Avance AS `Avance_P', CAST(Programa AS CHAR),'_C', CAST(Ciclo AS CHAR),'`',
            ' FROM CalifDatos WHERE idCiclo = ',CAST(Ciclo AS CHAR),' AND idPrograma = ',CAST(Programa AS CHAR),' AND Edad_Matriculacion >= ',CAST(Edad_ini AS CHAR),' AND Edad_Matriculacion <= ',CAST(Edad_fin AS CHAR),')',
            ' t2 ON (t1.login = t2.login)'
        ) ;
    PREPARE deletetb FROM @droptable;
    PREPARE createtb FROM @sql ;

    EXECUTE deletetb ; 
    EXECUTE createtb; 

    DEALLOCATE PREPARE createtb ;
    DEALLOCATE PREPARE deletetb ;
END 
$$

DELIMITER ;

#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE cosultaGeneral(
    IN `Ciclo_ini` INT, 
    IN `Num` INT,
    IN `Calif_Ava` BOOLEAN,
    In `Programas` VARCHAR(255)
)
BEGIN
    #Crear tabla de programas TEMP
    CALL getProgs(Programas);
    
    SET @progCont := 0; 
    SET @cicloCont := 0;
    SET @sql = 'SELECT COUNT(*) AS `ContTotal`'; 
    SET @numProg = 'SELECT COUNT(*) FROM listProg_temp';
    SET @x = 0;
    REPEAT
        SET @x = @x + 1;
        IF Calif_Ava = TRUE THEN 
            SET @sql = CONCAT(@sql,
                            ', AVG(CalifFinal_P',
                            CAST((SELECT idPrograma FROM listProg_temp WHERE contProg = @progCont+1) AS CHAR),
                            '_C',
                            CAST((Ciclo_ini + @cicloCont) AS CHAR),
                            ') AS `Prom_Calif_P',
                            CAST((SELECT idPrograma FROM listProg_temp WHERE contProg = @progCont+1) AS CHAR),
                            '_C',
                            CAST((Ciclo_ini + @cicloCont) AS CHAR),
                            '`');
        ELSE
            SET @sql = CONCAT(@sql,
                            ', AVG(Avance_P',
                            CAST((SELECT idPrograma FROM listProg_temp WHERE contProg = @progCont+1) AS CHAR),
                            '_C',
                            CAST((Ciclo_ini + @cicloCont) AS CHAR),
                            ') AS `Prom_Avance_P',
                            CAST((SELECT idPrograma FROM listProg_temp WHERE contProg = @progCont+1) AS CHAR),
                            '_C',
                            CAST((Ciclo_ini + @cicloCont) AS CHAR),
                            '`');
        END IF;
        

        IF(((@progCont+1) % @numProg) = 0) THEN 
            SET @progCont := 0; 
            SET @cicloCont := @cicloCont +1;
        ELSE
            SET @progCont := @progCont +1;
        END IF;
    UNTIL @x >= Num 
    END REPEAT;

    SET @sql = CONCAT(@sql,' FROM ultimaconsulta');
    PREPARE stmt FROM @sql ;
    EXECUTE stmt ;
    DEALLOCATE PREPARE stmt;
END 
$$

DELIMITER ;

#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE consultaGrupo (
    IN `Filtrar_edad` BOOLEAN, 
    IN `Filtrar_sexo` BOOLEAN,
    IN `grupo` INT,
    IN `Edad_ini` INT, 
    IN `Edad_fin` INT,
    IN `Sexo` VARCHAR(1)
)
BEGIN
    SET @programa = (SELECT idPrograma FROM grupos WHERE idGrupo = grupo);
    SET @Ciclo = (SELECT idCiclo FROM grupos WHERE idGrupo = grupo);

    #Crear tabla de programas TEMP
    CALL getProgs(@programa);

    #Crear tabla temporal de datos
    IF Filtrar_edad = TRUE THEN
        IF Filtrar_sexo = TRUE THEN
            CALL crearTablaTempDatos1(@Ciclo, @Ciclo, Edad_ini, Edad_fin, Sexo);
        ELSE
            CALL crearTablaTempDatos2(@Ciclo, @Ciclo, Edad_ini, Edad_fin);
        END IF;
    ELSE
        IF Filtrar_sexo = TRUE THEN
            CALL crearTablaTempDatos3(@Ciclo, @Ciclo, Sexo);
        ELSE
            CALL crearTablaTempDatos4(@Ciclo, @Ciclo);
        END IF;
    END IF;

    #Asignar login como llave primaria
    ALTER TABLE datosPart_temp
    ADD CONSTRAINT pk_login_partTemp
    PRIMARY KEY (login);

    #Merge de la tabla de datos con las calificaciones y avances
    DROP TEMPORARY TABLE IF EXISTS datosGroup_temp;
    CREATE TEMPORARY TABLE `datosGroup_temp` AS
        SELECT t1.*, t2.CalifInicial, t2.CalifFinal, t2.Avance FROM
            (SELECT * FROM  datosPart_temp) t1
        LEFT OUTER JOIN
            (SELECT login, CalifInicial, CalifFinal, Avance FROM CalifDatos 
             WHERE idCiclo = @Ciclo AND idPrograma = @programa AND Edad_Matriculacion >= Edad_ini AND Edad_Matriculacion <= Edad_fin) t2 
        ON (t1.login = t2.login);

    DROP TABLE IF EXISTS ConsultaGrupo;
    CREATE TABLE `ConsultaGrupo` AS SELECT * FROM datosGroup_temp;
END
$$

DELIMITER ;

#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE consultaGenGrupo ()
BEGIN
    SELECT C.idGrupo, C.idPrograma, C.idCiclo, P.nombrePrograma, U.nombreUsuario, U.apellidoPaterno, U.apellidoMaterno,
     AVG(C.CalifFinal) AS `Prom_CaliF`, AVG(C.Avance) AS `Prom_Ava`
     FROM consultagrupo C, programas P, grupos_terapeutas GT, usuarios U WHERE
     C.idGrupo = GT.idGrupo AND GT.login = U.login AND P.idPrograma=C.idPrograma;
END
$$

DELIMITER ;

#--------------------------------------------------------------------------
#------------------------------- Gestion ----------------------------------
#--------------------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE modificaNivel (IN `idNivelp` INT, IN `nombreNivelp` VARCHAR(50))
BEGIN
    UPDATE niveles  SET nombreNivel = nombreNivelp 
                    WHERE idNivel = idNivelp;
END
$$
DELIMITER ;
