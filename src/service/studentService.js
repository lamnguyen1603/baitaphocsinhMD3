const connection1 = require('../model/connection');
connection1.connected();

class StudentService {
    findAll() {
        let sql = 'select * from student s join grade g on s.idGrade = g.idGrade';
        let connect = connection1.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, students) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(students)
                }
            })

        })
    }

    save(student) {
        let connect = connection1.getConnection();
        return new Promise((resolve, reject) => {
            let sql = `insert into studentmanager.student(name, age, address,idGrade)
                       values ('${student.name}', ${student.age}, '${student.address}',${student.idGrade})`;
            connect.query(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Thanh cong');
                }
            })
        })
    }

    remove(id) {
        let connect = connection1.getConnection();
        let sql = `delete
                   from studentmanager.student
                   where id = ${id}`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Thanh cong');
                }
            })
        })

    }

    update(student, id) {
        let connect = connection1.getConnection();
        let sql = `update studentmanager.student
                   set name       = '${student.name}',
                       address = '${student.address}',
                       idGrade = ${student.idGrade},
                       age        = ${student.age}
                   where id = ${id}`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, student) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(student);
                }
            })
        })
    }
    searchStudent(search) {
        let connect = connection1.getConnection();
        let sql = `select * from student s join grade g on s.idGrade = g.idGrade  WHERE name LIKE '%${search}%'`
        return new Promise((resolve, reject) => {
            connect.query(sql,(err, students) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(students);
                }
            })
        })
    }
}

const studentService = new StudentService();

module.exports = studentService
