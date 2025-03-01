

const csvRequestQueries = {
    INSERT_CSV_REQUEST : "INSERT INTO csv_requests (request_id, file_name, file_path, status, client_id, created_at) VALUES ($1, $2, $3, $4, $5, NOW())",
    UPDATE_CSV_STATUS: "UPDATE csv_requests SET status = $1 WHERE request_id = $2",
    UPDATE_CSV_RESULT: "UPDATE csv_requests SET file_path = $1, status = $2 WHERE request_id = $3",
    GET_CSV_STATUS: "SELECT status, file_path as drive_link, client_id FROM csv_requests WHERE request_id = $1 AND client_id = $2",
}

module.exports = {
    csvRequestQueries
}