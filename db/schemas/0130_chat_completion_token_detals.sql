-- Tabla 'chat.completion_tokens_details'
CREATE TABLE chat.completion_tokens_details (
    details_id SERIAL PRIMARY KEY,
    usage_id INT REFERENCES chat.usage(usage_id),
    reasoning_tokens INT,
    accepted_prediction_tokens INT,
    rejected_prediction_tokens INT
);