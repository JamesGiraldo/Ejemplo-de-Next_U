-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: blog_viajes
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `contraseña` varchar(45) NOT NULL,
  `pseudonimo` varchar(45) NOT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autores`
--

LOCK TABLES `autores` WRITE;
/*!40000 ALTER TABLE `autores` DISABLE KEYS */;
INSERT INTO `autores` VALUES (1,'luis@gmail.com','123123','luis2000',NULL),(2,'ana@gmail.com','123123','a5555',NULL),(3,'aarcela@gmail.com','123123','aarcela',NULL),(4,'andresa@gmail.com','123123','andresss',NULL);
/*!40000 ALTER TABLE `autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicaciones`
--

DROP TABLE IF EXISTS `publicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `resumen` varchar(255) NOT NULL,
  `contenido` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `votos` int DEFAULT '0',
  `fecha_hora` timestamp NULL DEFAULT NULL,
  `autor_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_publicaciones_autores_idx` (`autor_id`),
  CONSTRAINT `fk_publicaciones_autores` FOREIGN KEY (`autor_id`) REFERENCES `autores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicaciones`
--

LOCK TABLES `publicaciones` WRITE;
/*!40000 ALTER TABLE `publicaciones` DISABLE KEYS */;
INSERT INTO `publicaciones` VALUES (1,'Roma','Buen viaje a Roma','Contenido',NULL,0,'2018-09-10 05:08:27',1),(2,'Grecia','Buen viaje a Grecia','Contenido</p>',NULL,0,'2018-09-11 05:08:27',1),(3,'Paris','Buen viaje a Paris','Contenido',NULL,0,'2018-09-12 05:08:27',1),(4,'Costa Rica','Buen viaje a Costa Rica','Contenido',NULL,0,'2018-09-13 05:08:27',2),(5,'Mar de Plata','Buen viaje a Mar de Plata','Contenido',NULL,0,'2018-09-14 05:08:27',2),(6,'Guadalajara','Buen viaje a Guadalajara','Contenido',NULL,0,'2018-09-15 05:08:27',2),(7,'China','Buen viaje a China','Contenido',NULL,2,'2018-09-16 05:08:27',2),(8,'Venezuela','Buen viaje a Venezuela','Contenido',NULL,3,'2018-09-16 05:08:27',3),(9,'Brasil','Buen viaje a Brasil','Contenido',NULL,5,'2018-09-16 05:08:27',4),(10,'Probando','Probando resumen','Contenido',NULL,0,'2020-04-04 04:00:00',4);
/*!40000 ALTER TABLE `publicaciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-04 18:41:46
