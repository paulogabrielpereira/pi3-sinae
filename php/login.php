<?php
    $_user = $_GET['username'];
    $_pass = $_GET['password'];

    if ($_user && $_pass) {
        header("Location: ../pages/index.html");  
    }