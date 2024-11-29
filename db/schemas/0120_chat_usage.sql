-- Tabla 'chat.usage'
CREATE TABLE chat.usage (
    usage_id SERIAL PRIMARY KEY,
    completion_id INT REFERENCES chat.completions(id),
    prompt_tokens INT,
    completion_tokens INT,
    total_tokens INT
);