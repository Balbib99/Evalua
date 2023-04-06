DROP DATABASE IF EXISTS evalua2;
CREATE DATABASE IF NOT EXISTS evalua2;

USE evalua2;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-04-2023 a las 15:15:03
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `evalua2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `Nombre` varchar(20) NOT NULL,
  `Apellidos` varchar(40) DEFAULT 'NULL',
  `Nombre_Familiar1` varchar(20) NOT NULL,
  `Apellidos_Familiar1` varchar(40) DEFAULT 'NULL',
  `Nombre_Familiar2` varchar(20) DEFAULT 'NULL',
  `Apellidos_Familiar2` varchar(40) DEFAULT 'NULL',
  `Direccion` varchar(50) DEFAULT 'NULL',
  `Email` varchar(60) DEFAULT 'NULL',
  `Telefono1` varchar(10) NOT NULL,
  `Telefono2` varchar(10) DEFAULT 'NULL',
  `Observaciones` varchar(500) DEFAULT 'NULL',
  `Curso` varchar(5) NOT NULL,
  `id` int(10) NOT NULL,
  `id_Profesor` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`Nombre`, `Apellidos`, `Nombre_Familiar1`, `Apellidos_Familiar1`, `Nombre_Familiar2`, `Apellidos_Familiar2`, `Direccion`, `Email`, `Telefono1`, `Telefono2`, `Observaciones`, `Curso`, `id`, `id_Profesor`) VALUES
('Raul', 'Bragado Sanz', 'Pedro', 'NULL', 'NULL', 'NULL', 'C/Eusebio gonzalez Nº13 2ºB', 'pedro@gmail.com', '489512634', 'NULL', 'NULL', '2ºA', 1, 1),
('Adrian', 'Cano Martin', 'Juan Carlos', 'NULL', 'NULL', 'NULL', 'C/Misericordia Nº13 2ºB', 'Juancar@gmail.com', '485125698', 'NULL', 'NULL', '2ºA', 2, 1),
('Miguel', 'Cañibano Centeno', 'Marisol', 'NULL', 'NULL', 'NULL', 'C/Misericordia Nº5 4ºD', 'Marisol@gmail.com', '458154784', 'NULL', 'NULL', '2ºA', 3, 1),
('Balbino', 'Martinez Rodriguez', 'Balbino', 'NULL', 'NULL', 'NULL', 'C/Gregorio Marañon Nº15 Atico B', 'Balbino@gmail.com', '471256895', 'NULL', 'NULL', '2ºB', 4, 1),
('Alfonso', 'Miguel de la torre', 'Navarro', 'NULL', 'NULL', 'NULL', 'C/Guadalajara Nº13 2ºB', 'Erminio@gmail.com', '256481543', 'NULL', 'NULL', '2ºB', 5, 1),
('Alvaro', 'Manzano', 'Sergio', 'NULL', 'NULL', 'NULL', 'C/Acero Nº6 2ºB', 'Ministro@gmail.com', '897456213', 'NULL', 'NULL', '2ºB', 6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaturas`
--

CREATE TABLE `asignaturas` (
  `Nombre` varchar(20) NOT NULL,
  `id` int(10) NOT NULL,
  `id_Profesor` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `asignaturas`
--

INSERT INTO `asignaturas` (`Nombre`, `id`, `id_Profesor`) VALUES
('Matematicas', 1, 1),
('Lengua', 2, 1),
('Ciencias Sociales', 3, 1),
('Ingles', 4, 1),
('Art', 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `Nombre` varchar(5) NOT NULL,
  `id` int(10) NOT NULL,
  `id_Profesor` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`Nombre`, `id`, `id_Profesor`) VALUES
('2ºA', 1, 1),
('2ºB', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `Nombre` varchar(20) NOT NULL,
  `Email` varchar(60) NOT NULL,
  `Clave` varchar(200) NOT NULL,
  `Telefono` varchar(10) DEFAULT '999999999',
  `id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`Nombre`, `Email`, `Clave`, `Telefono`, `id`) VALUES
('pepe', 'pepe@gmail.com', 'pepe', '458762315', 1),
('mar', 'mar@gmail.com', 'mar', '478516243', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Profesor` (`id_Profesor`);

--
-- Indices de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Profesor` (`id_Profesor`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Profesor` (`id_Profesor`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`id_Profesor`) REFERENCES `profesores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD CONSTRAINT `asignaturas_ibfk_1` FOREIGN KEY (`id_Profesor`) REFERENCES `profesores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`id_Profesor`) REFERENCES `profesores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
