-- Cambia al esquema 'chat'
SET search_path TO chat;

-- Elimina las tablas en el orden correcto para evitar conflictos de referencias

-- 1. Eliminar la tabla 'completion_tokens_details' (dependiente de 'usage')
DROP TABLE IF EXISTS completion_tokens_details;

-- 2. Eliminar la tabla 'usage' (dependiente de 'completions')
DROP TABLE IF EXISTS usage;

-- 3. Eliminar la tabla 'choices' (dependiente de 'completions')
DROP TABLE IF EXISTS choices;

-- 4. Eliminar la tabla 'completions'
DROP TABLE IF EXISTS completions;

-- Opcional: Eliminar el esquema 'chat' si ya no es necesario
DROP SCHEMA IF EXISTS chat;

DROP DATABASE IF EXISTS "chatpgt";
CREATE DATABASE "chatgpt";
CREATE SCHEMA chat;


