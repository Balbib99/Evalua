"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const database_1 = __importDefault(require("../database"));
class IndexController {
    index(req, res) {
        res.send('Hello');
    }
    validarUser(req, res) {
        console.log(req.body);
        const { correo, clave } = req.body;
        console.log(correo + ' y ' + clave);
        database_1.default.query('SELECT * FROM profesores WHERE Nombre = ? AND Clave = ?', [correo, clave], (err, rows, field) => {
            if (!err) {
                if (rows.length > 0) {
                    let clave = rows;
                    res.json(clave[0].Clave);
                }
                else {
                    res.json('Usuario o claves incorrectos');
                }
            }
            else {
                console.log(err);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO profesores set ?', [req.body]);
            res.json({ mensaje: "usuario registrado" });
        });
    }
    getCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await connect.query('SELECT DISTINCT Nombre FROM curso WHERE ID_Profesor IN (SELECT id FROM Profesores WHERE Nombre = ? )', 
            // [req.body.usuario],
            // (err,rows,field) => {
            //     if(!err){
            //         if(rows.length > 0){
            //             res.json(rows);
            //         }else{
            //             res.json('No existen cursos')
            //         }
            //     }else{
            //         console.log(err);
            //     }
            // }
            // );
            yield database_1.default.query('SELECT DISTINCT Nombre FROM cursos WHERE ID_Profesor IN (SELECT id FROM profesores WHERE Nombre = ? )', [req.body.usuario], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existen cursos');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    getIdProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT id FROM profesores WHERE Nombre = ?', [req.body.nombre], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existe ningun usuario con ese nombre');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    crearCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO cursos set ?', [req.body]);
            res.json({ mensaje: "curso añadido correctamente" });
        });
    }
    createSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO asignaturas set ?', [req.body]);
            res.json({ mensaje: "asignatura añadida correctamente" });
        });
    }
    getSubjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM asignaturas WHERE id_Profesor = ? AND Nombre_curso = ?', [req.body.id_Profesor, req.body.Nombre_curso], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existe ningun usuario con ese nombre');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    getStudentsSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('SELECT Nombre_alumnos FROM asignaturas WHERE id=?', [req.body.id], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existe ninguna asignatura con ese id');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    writeTableCalifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const alumnos = req.body.Nombre_alumnos.split(',');
            // await connect.query('INSERT INTO asignaturas VALUES (? , ?)',[req.body]);
            res.json({ mensaje: alumnos });
        });
    }
    saveThatRubrica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO calificaciones SET ?', [req.body]);
            if (res) {
                res.json({ mensaje: "rubrica añadida correctamente" });
            }
        });
    }
    getRubricasCalifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT Nombre, Tabla FROM calificaciones WHERE Curso=? AND id_Profesor=? AND Asignatura=?', [req.body.Curso, req.body.id_Profesor, req.body.Asignatura], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existe ninguna rubrica para este curso por el momento');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    getOnlyOneRubrica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT Tabla FROM calificaciones WHERE Curso=? AND id_Profesor=? AND Asignatura=? AND Nombre=?', [req.body.Curso, req.body.id_Profesor, req.body.Asignatura, req.body.Nombre], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existe ninguna rubrica por el momento');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    createNota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO notas SET ?', [req.body]);
            if (res) {
                res.json({ mensaje: "nota añadida correctamente" });
            }
        });
    }
    searchNotas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT Nota FROM notas WHERE Curso=? AND id_Profesor=? AND Asignatura=? AND Nombre_Calificacion=? AND Nombre_Alumnos', [req.body.Curso, req.body.id_Profesor, req.body.Asignatura, req.body.Nombre_Calificacion, req.body.NombreAlumnos], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existe ninguna rubrica por el momento');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    updateNotas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE notas SET Nota=? WHERE Nombre_Alumnos=? AND Nombre_Calificacion=? AND Asignatura=? AND id_Profesor=? AND Curso=?', [req.body.Nota, req.body.Nombre_Alumnos, req.body.Nombre_Calificacion, req.body.Asignatura, req.body.id_Profesor, req.body.Curso]);
            if (res) {
                res.json({ mensaje: "nota actualizada correctamente" });
            }
        });
    }
    getNotas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT Nota, Nombre_Calificacion, Nombre_Alumnos FROM notas WHERE Curso=? AND id_Profesor=? AND Asignatura=?', [req.body.Curso, req.body.id_Profesor, req.body.Asignatura], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existe ninguna nota por el momento');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    getRurbicasNotas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT Nombre_Calificacion FROM notas WHERE Nombre_Calificacion=? AND Curso=?', [req.body.Nombre_Calificacion, req.body.Curso], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existe ninguna rubrica por el momento');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    getRubricas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT Nombre, Tabla FROM calificaciones WHERE id_Profesor=?', [req.body.id_Profesor], (err, rows, field) => {
                if (!err) {
                    if (rows.length > 0) {
                        res.json(rows);
                    }
                    else {
                        res.json('No existe ninguna rubrica por el momento');
                    }
                }
                else {
                    console.log(err);
                }
            });
        });
    }
}
exports.indexController = new IndexController();
