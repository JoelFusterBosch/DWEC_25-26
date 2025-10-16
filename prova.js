const mysql= require('mysql2');
const connection = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'1234'
});
connection.connect((err) =>{
    if(err){
        console.log("Error en la connexió");
        return;
    }
    console.log("Connexió exitosa");
});