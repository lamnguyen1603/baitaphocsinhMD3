const connection1 = require('../model/connection');
connection1.connected();
class GradeService {
    findAll() {
        let sql = 'select * from grade';
        let connect = connection1.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, grades) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(grades)
                }
            })

        })
    }
}
module.exports = new GradeService()