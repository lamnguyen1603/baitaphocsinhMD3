const mysql1 = require('mysql');

class Connection {
    configToMysql = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        charset: 'utf8_general_ci',
        database: 'studentmanager'
    }

    getConnection() {
        return mysql1.createConnection(this.configToMysql)
    }

    connected() {
        this.getConnection().connect(err =>{
            if(err){
                console.log(err)
            }else {
                console.log('Connection success')
            }
        })
    }
}
module.exports = new Connection();