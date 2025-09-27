<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // permite fetch do front

$method = $_SERVER['REQUEST_METHOD'];
$file = 'data.json';
$data = json_decode(file_get_contents($file), true);

if ($method === 'GET') {
    echo json_encode($data);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['nome']) && isset($input['ra'])) {
        $data[] = $input;
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(['message' => 'Adicionado com sucesso']);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Nome e RA são obrigatórios']);
    }
}