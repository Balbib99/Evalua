DROP DATABASE IF EXISTS evalua;
CREATE DATABASE IF NOT EXISTS evalua;

USE evalua;

-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: evalua
-- ------------------------------------------------------
-- Server version	5.7.36-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `Nombre` varchar(20) DEFAULT NULL,
  `Apellido1` varchar(20) DEFAULT NULL,
  `Apellido2` varchar(20) DEFAULT NULL,
  `DNI` varchar(10) NOT NULL,
  `Nombre_Familiar1` varchar(20) DEFAULT NULL,
  `PrimerApellido_Familiar1` varchar(20) DEFAULT NULL,
  `SegundoApellido_Familiar1` varchar(20) DEFAULT NULL,
  `Nombre_Familiar2` varchar(20) DEFAULT NULL,
  `PrimerApellido_Familiar2` varchar(20) DEFAULT NULL,
  `SegundoApellido_Familiar2` varchar(20) DEFAULT NULL,
  `Direccion` varchar(30) DEFAULT NULL,
  `Email` varchar(20) DEFAULT NULL,
  `Telefono1` int(10) DEFAULT NULL,
  `Telefono2` int(10) DEFAULT NULL,
  `Observaciones` text,
  PRIMARY KEY (`DNI`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES ('Jesus',NULL,NULL,'123456W','Pedro',NULL,NULL,NULL,NULL,NULL,'C/Eusebio Nº3 2ºA','Pedro@gmail.com',165495238,NULL,NULL),('Alberto',NULL,NULL,'789451A','Marisa',NULL,NULL,NULL,NULL,NULL,'C/Almendrera Nº14 5ºB','Marisa@gmail.com',496357892,NULL,NULL);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumnos_materia`
--

DROP TABLE IF EXISTS `alumnos_materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos_materia` (
  `Nota` float DEFAULT NULL,
  `Nombre_Materia` varchar(25) DEFAULT NULL,
  `DNI_Alumno` varchar(10) DEFAULT NULL,
  KEY `Nombre_Materia` (`Nombre_Materia`),
  KEY `DNI_Alumno` (`DNI_Alumno`),
  CONSTRAINT `alumnos_materia_ibfk_1` FOREIGN KEY (`Nombre_Materia`) REFERENCES `materias` (`Nombre`),
  CONSTRAINT `alumnos_materia_ibfk_2` FOREIGN KEY (`DNI_Alumno`) REFERENCES `alumnos` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos_materia`
--

LOCK TABLES `alumnos_materia` WRITE;
/*!40000 ALTER TABLE `alumnos_materia` DISABLE KEYS */;
INSERT INTO `alumnos_materia` VALUES (5,'Matematicas','789451A'),(7,'Lengua','789451A'),(2,'Ciencias Sociales','789451A'),(10,'Plastica','789451A'),(3,'Ingles','789451A'),(8,'Ingles','123456W'),(3,'Matematicas','123456W'),(5,'Lengua','123456W'),(6,'Ciencias Sociales','123456W'),(10,'Plastica','123456W');
/*!40000 ALTER TABLE `alumnos_materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `Nombre` varchar(5) DEFAULT NULL,
  `ID_Profesor` int(5) DEFAULT NULL,
  `DNI_Alumno` varchar(10) DEFAULT NULL,
  `Materia` varchar(25) DEFAULT NULL,
  `Tipo` varchar(15) DEFAULT NULL,
  KEY `ID_Profesor` (`ID_Profesor`),
  KEY `DNI_Alumno` (`DNI_Alumno`),
  CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`ID_Profesor`) REFERENCES `profesores` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `curso_ibfk_2` FOREIGN KEY (`DNI_Alumno`) REFERENCES `alumnos` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES ('2ºA',1,'789451A','Matematicas','Tutor'),('2ºA',1,'789451A','Ciencias Sociales','Tutor'),('2ºA',1,'789451A','Plastica','Tutor'),('2ºA',2,'789451A','Ingles','Profesor'),('2ºA',2,'789451A','Lengua','Profesor'),('2ºB',1,'123456W','Lengua','Profesor'),('2ºB',1,'123456W','Ingles','Profesor'),('2ºB',2,'123456W','Plastica','Tutor'),('2ºB',2,'123456W','Ciencias Sociales','Tutor'),('2ºB',2,'123456W','Matematicas','Tutor');
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `Nombre` varchar(25) NOT NULL,
  PRIMARY KEY (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES ('Ciencias Naturales'),('Ciencias Sociales'),('Educacion Fisica'),('Ingles'),('Lengua'),('Matematicas'),('Musica'),('Plastica'),('Religion'),('Robotica'),('Valores');
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `Nombre` varchar(20) DEFAULT NULL,
  `Clave` varchar(15) DEFAULT NULL,
  `Correo` varchar(60) DEFAULT NULL,
  `Telefono` varchar(10) DEFAULT NULL,
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES ('Jose','Jose12','jose@gmail.com','548623548'),('Maria','Maria12','maria@gmail.com','145789562');
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-17 18:58:01
