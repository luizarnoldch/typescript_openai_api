-- Tabla 'chat.choices'
CREATE TABLE chat.choices (
    choice_id SERIAL PRIMARY KEY,
    completion_id INT REFERENCES chat.completions(id),
    index INT,
    role VARCHAR(50),
    content TEXT,
    logprobs JSON,
    finish_reason VARCHAR(50)
);