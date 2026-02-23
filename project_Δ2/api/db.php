<?php
// api/db.php
function db() {
  $dsn = "mysql:host=localhost;dbname=sugoroku;charset=utf8mb4";
  $user = "root";   // XAMPPの既定が多い
  $pass = "";       // 必要ならここを変更

  return new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
  ]);
}