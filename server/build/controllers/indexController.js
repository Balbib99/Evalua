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
            yield database_1.default.query('SELECT Nombre FROM curso WHERE ID_Profesor IN (SELECT id FROM Profesores WHERE Nombre = ? )', [req.body.usuario], (err, rows, field) => {
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
}
exports.indexController = new IndexController();
