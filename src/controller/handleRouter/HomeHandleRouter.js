const fs1 = require('fs');
const studentService = require('../../service/studentService')
const gradeService = require('../../service/gradeService')
const qs = require('qs')

class HomeHandleRouter {
    static getHomeHtml(homeHtml, students) {
        let tbody = '';
        students.map((student, index) => {
            tbody +=
                `<tr>
                            <td>${index + 1}</td>
                            <td>${student.name}</td>
                            <td>${student.age}</td>
                            <td>${student.address}</td>
                            <td>${student.nameGrade}</td>
                            <td><a href="/edit/${student.id}"><button style="color: blue">Edit</button></td>
                            <td><a href="/delete/${student.id}"><button style="color: red">Delete</button></td>
                        </tr>`
        })
        homeHtml = homeHtml.replace('{student}', tbody);
        return homeHtml;
    }

    showHome(req, res) {
        if (req.method === 'GET') {
            fs1.readFile('./views/home.html', "utf-8", async (err1, homeHtml) => {
                if (err1) {
                    console.log(err1.message)
                } else {
                    let products = await studentService.findAll();
                    homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, products);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            })
        } else {
            let data1 = '';
            req.on('data', chuck => {
                data1 += chuck;
            })
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data1)
                    fs1.readFile('./views/home.html', 'utf-8', async (err1, homeHtml) => {
                        if (err1) {
                            console.log(err1)
                        } else {
                            let students = await studentService.searchStudent(search.search)
                            homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, students);
                            res.writeHead(200, 'text/html');
                            res.write(homeHtml);
                            res.end();
                        }
                    })
                }
            })
        }

    }

    createStudent(req, res) {
        if (req.method === 'GET') {
            fs1.readFile('./views/create.html', "utf-8", async (err, createHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let grades = await gradeService.findAll()
                    let options = '';
                    grades.map(grade => {
                        options += `
                                  <option value=${grade.idGrade}>${grade.nameGrade}</option>
                                  `
                    })
                    createHtml = createHtml.replace('{grades}',options)
                    res.writeHead(200, 'text/html');
                    res.write(createHtml);
                    res.end();
                }
            })
        } else {
            let data1 = '';
            req.on('data', chunk => {
                data1 += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const product = qs.parse(data1);
                    const mess = await studentService.save(product);
                    res.writeHead(301, {location: '/home'});
                    res.end();
                }
            })
        }
    }

    async deleteStudent(req, res, id) {
        if (req.method === 'GET') {
            fs1.readFile('./views/delete.html', "utf-8", async (err, deleteHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    deleteHtml = deleteHtml.replace('{id}', id)
                    res.write(deleteHtml);
                    res.end();
                }
            })
        } else {
            let mess = await studentService.remove(id)
            res.writeHead(301, {location: '/home'});
            res.end();
        }
    }

    editStudent(req, res, id) {
        if (req.method === 'GET') {
            fs1.readFile('./views/edit.html', "utf-8", async (err, editHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let grades = await studentService.findAll()
                    let options = '';
                    grades.map(grades => {
                        options += `
                         <option value=${grades.idGrade}>${grades.nameGrade}</option>`
                    })
                    editHtml = editHtml.replace('{name}', grades[0].name);
                    editHtml = editHtml.replace('{age}', grades[0].age);
                    editHtml = editHtml.replace('{address}', grades[0].address);
                    editHtml = editHtml.replace('{grades}',options)
                    editHtml = editHtml.replace('{id}', id);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            })
        } else {
            let data1 = '';
            req.on('data', chunk => {
                data1 += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const student = qs.parse(data1);
                    console.log(student)
                    console.log(id)
                    await studentService.update(student, id);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            })
        }
    }
}

module.exports = new HomeHandleRouter();