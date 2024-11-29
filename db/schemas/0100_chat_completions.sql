-- Tabla 'chat.completions'
CREATE TABLE chat.completions (
    id SERIAL PRIMARY KEY,
	openai_id VARCHAR(50),
    object VARCHAR(50),
    created TIMESTAMP,
    model VARCHAR(50),
    system_fingerprint VARCHAR(50)
);