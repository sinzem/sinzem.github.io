<?php 

    function res() {
        $key = file_get_contents("../assets/bin/fragment.json");
        $key = json_decode($key, true);
        $keyPart = [];
        for ($i = 0; $i < count($key); $i++) {
            if ($i % 2 !== 0) {
                array_push($keyPart, $key[$i]);
            }
        };
        $keyPart = implode(";", $keyPart);
        
        return html_entity_decode($keyPart);
    }

    function req() {
        $key = fopen("../assets/bin/fragment.txt", "r");
        $key = fgets($key);
        $key = substr($key, 24, 4);
        return $key;
    }
    
?>