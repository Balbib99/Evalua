import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent {

  constructor(private alumnosService: AlumnosService, private cookies: CookieService) {

  }

  students: any = []
  idProfesor: any = '';

  rubricas: any = [];

  columnas: any = new FormControl('');
  filas: any = new FormControl('');
  nombreRubrica: any = new FormControl('');

  //Dependiendo de las columas que elija el usuario crear, se utilizará una variable o otra para determinar los encabezados
  threeColumns: any = ['', 'Excelente', 'Regular', 'Mal']
  fourColumns: any = ['', 'Excelente', 'Notable', 'Regular', 'Mal']
  fiveColumns: any = ['', 'Excelente', 'Notable', 'Regular', 'Suficiente', 'Mal']

  //Dependiendo de las columnas elegidas por el usuario, se utilizará una variable u otra para determinar la puntuación de cada celda
  threeColumnsPoint: any = [10, 6, 2]
  fourColumnsPoint: any = [10, 7, 5, 2]
  fiveColumnsPoint: any = [10, 7, 5, 3, 2]

  //Variable que guardará la puntuación final de cada rubrica
  finalCalification: any = 0;

  datosTable: any = [];

  //Devuelve una tabla con el nombre de los alumnos de que imparten la asignatura en esa determinada clase
  ngOnInit() {

    const filtro = {
      id: this.cookies.get('idAsignatura')
    }

    this.alumnosService.getStudentsSubject(filtro).subscribe(
      res => {
        this.students = res;

        this.students = this.students[0].Nombre_alumnos.split(',')
        this.students = this.students.sort()
        console.log(this.students);

      },
      err => { }
    )

    const profesor = {
      nombre: this.cookies.get('user')
    }

    this.alumnosService.getIdProfesor(profesor).subscribe(
      res => {
        this.idProfesor = res;
        this.idProfesor = this.idProfesor[0].id
      }
    )
  }

  chargeTable(table: any, button: any, tabla: any, div: any, counter: number, thNumber: number, puntuación?: any, calificacionFinal?: any) {
    this.finalCalification = 0;
    let tr = document.createElement('tr');
    let trr: any;
    let contador = 0;
    let titulos = 0;
    let puntos = 0;
    let contadorFilas = 0;

    let imprimir = document.createElement('button');
    imprimir.className = 'btn btn-warning';
    imprimir.textContent = 'PDF';
    imprimir.style.marginBottom = 2+'em';
    imprimir.style.marginLeft = 3+'em';
    imprimir.addEventListener('click', () => {


      const options = {
        filename: 'contenido.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      };

      const content = table;

      html2pdf()
        .from(content)
        .set(options)
        .save();
    })


    for (let i = 0; i < tabla.length; i++) {

      //Titulos calificativos
      if (i < thNumber) {
        let th = document.createElement('th');
        th.textContent = tabla[i]
        th.className = 'table-active'
        tr.append(th)

        titulos++

        if (titulos == 3) {
          table.append(tr);
        }

      } else {

        //enunciados por cada fila
        if (contador == 0) {
          contadorFilas++
          console.log(i + ' hola');

          //tr por cada fila
          trr = document.createElement('tr');

          //th para los enunciados de cada fila
          let th = document.createElement('th');
          th.textContent = tabla[i]
          th.className = 'table-active'
          trr.append(th);
          this.filas.value = contadorFilas;

          contador++
        } else {
          //Casillas de contenido
          if (contador == counter) {
            contador = 0;

            //ultima casilla de cada fila
            let td = document.createElement('td')
            td.textContent = tabla[i]

            trr.append(td);

            if (puntuación) {
              let checkbox: any = document.createElement('input')
              checkbox.type = 'checkbox';
              checkbox.setAttribute('name', puntuación[3])
              puntos = 0;
              checkbox.addEventListener('click', ($event: any) => {
                this.onChange($event)
              })
              td.append(checkbox);
            }

          } else {
            contador++

            //resto de casillas
            let td = document.createElement('td')
            td.textContent = tabla[i]

            trr.append(td);

            if (puntuación) {
              let checkbox: any = document.createElement('input')
              checkbox.type = 'checkbox';
              switch (puntos) {
                case 0:
                  checkbox.setAttribute('name', puntuación[0])
                  puntos++
                  break;
                case 1:
                  checkbox.setAttribute('name', puntuación[1])
                  puntos++
                  break;
                case 2:
                  checkbox.setAttribute('name', puntuación[2])
                  puntos++
                  break;
                case 3:
                  checkbox.setAttribute('name', puntuación[3])
                  puntos++
                  break;
                case 4:
                  checkbox.setAttribute('name', puntuación[4])
                  puntos++
                  break;
                default:
                  break;
              }
              checkbox.addEventListener('click', ($event: any) => {
                this.onChange($event)
              })
              td.append(checkbox);
            }

          }
        }
        table.append(trr)
      }

    }
    div.append(table);
    div.append(button);
    div.append(imprimir);

    if (puntuación) {
      let cancelar = document.createElement('button');
      cancelar.className = 'btn btn-dark';
      cancelar.textContent = 'Cancelar';
      cancelar.style.marginBottom = 2 + 'em';
      cancelar.style.marginLeft = 2 + 'em';
      cancelar.addEventListener('click', () => {
        document.querySelectorAll('dialog')[4].close()
      })
      div.append(cancelar)

    }
  }

  //Muestra el cuadro modal que pregunta que tipo de calificación se quiere crear
  createCalification() {
    document.querySelector('dialog')?.showModal();

  }

  //Vuelve hacia atrás desde la anterior función
  backToCalifications() {
    const dialogs = document.querySelectorAll('dialog')

    dialogs[0].close()
  }

  //Muestra el cuadro modal que pregunta si se quiere cargar una rubrica de las existentes o crear una
  rubricaDialogs() {
    const dialogs = document.querySelectorAll('dialog')
    dialogs[0].close()

    dialogs[1].showModal()
  }

  //Vuelve hacia atrás desde la anterior función
  backToCreateCalification() {
    const dialogs = document.querySelectorAll('dialog')
    dialogs[1].close()

    dialogs[0].showModal()
  }

  //Muestra el cuadro modal que pregunta que dimensiones se quieren para la rubrica
  rubricaDimensions() {
    const dialogs = document.querySelectorAll('dialog')
    dialogs[1].close()

    dialogs[2].showModal()
  }

  //Vuelve hacia atrás desde la anterior función
  backToRubricaDialogs() {
    const dialogs = document.querySelectorAll('dialog')
    dialogs[2].close()

    dialogs[1].showModal()
  }

  //Crea la rubrica y comienza el proceso de cración de la misma
  createRubrica() {
    if ((parseInt(this.columnas.value) > 2) && (parseInt(this.columnas.value) < 6) && (parseInt(this.filas.value) > 0)) {
      const dialogs = document.querySelectorAll('dialog')
      dialogs[2].close()

      //------------------------------- Creación de la tabla de calificaciones dinámica -----------------------------

      this.createTableCalifications(this.nombreRubrica.value);

      //-------------------------------------------------------------------------------------

      // -------------------------- PROCESO DE CREACIÓN DE LA RUBRICA ------------------------

      //Crea las filas y columnas de la rubrica una vez se ha elegido el tamaño de la misma
      console.log(this.columnas)
      console.log(this.filas)

      let body: any = document.querySelector('body');

      let newRubrica = document.createElement('div');
      newRubrica.className = 'newRubrica';
      newRubrica.style.margin = 2 + 'em'
      newRubrica.style.overflowX = 'auto';

      let newTable = document.createElement('table');
      newTable.className = 'table table-hover newTable';

      for (let i = 0; i < (this.filas.value + 1); i++) {

        let tr = document.createElement('tr');
        if (i == 0) {
          tr.className = 'table-active'
        }
        newTable.append(tr);

        for (let j = 0; j < (this.columnas.value + 1); j++) {

          if (i == 0) {
            let th = document.createElement('th');
            th.scope = 'col';
            tr.append(th);
            if (j == 0) {
              let input = document.createElement('td');
              th.append(input);
            } else {
              let input;
              //Crea los encabezados dinamicamente dependiendo de las columnas que haya elegido crear el usuario
              switch (this.columnas.value) {
                case 3:
                  input = document.createElement('td');
                  input.textContent = this.threeColumns[(j)]
                  th.append(input);
                  break;
                case 4:
                  input = document.createElement('td');
                  input.textContent = this.fourColumns[(j)]
                  th.append(input);
                  break;
                case 5:
                  input = document.createElement('td');
                  input.textContent = this.fiveColumns[(j)]
                  th.append(input);
                  break;

                default:
                  break;
              }
            }
          } else {
            if (j == 0) {
              let th = document.createElement('th');
              th.scope = 'row';
              tr.append(th);

              let input = document.createElement('input');
              input.placeholder = 'Titulo'
              input.className = 'texto';
              th.append(input);
            } else {
              let td;
              let input;
              let checkbox: any;
              switch (this.columnas.value) {
                case 3:
                  td = document.createElement('td');
                  tr.append(td);

                  input = document.createElement('input');
                  input.placeholder = 'Texto'
                  input.className = 'texto';

                  // let input2 = document.createElement('input');
                  // input2.type = 'number'
                  // input2.placeholder = 'Puntuacion ["," decimales]'

                  // checkbox = document.createElement('input');
                  // checkbox.name = this.threeColumnsPoint[(j - 1)];
                  // checkbox.type = 'checkbox';
                  // checkbox.className = 'checkbox';

                  td.append(input);
                  // td.append(checkbox)
                  // td.append(input2);
                  break;
                case 4:
                  td = document.createElement('td');
                  tr.append(td);

                  input = document.createElement('input');
                  input.placeholder = 'Texto'
                  input.className = 'texto';

                  // let input2 = document.createElement('input');
                  // input2.type = 'number'
                  // input2.placeholder = 'Puntuacion ["," decimales]'

                  // checkbox = document.createElement('input');
                  // checkbox.name = this.fourColumnsPoint[(j - 1)];
                  // checkbox.type = 'checkbox';
                  // checkbox.className = 'checkbox';

                  td.append(input);
                  // td.append(checkbox)
                  // td.append(input2);
                  break;
                case 5:
                  td = document.createElement('td');
                  tr.append(td);

                  input = document.createElement('input');
                  input.placeholder = 'Texto'
                  input.className = 'texto';

                  // let input2 = document.createElement('input');
                  // input2.type = 'number'
                  // input2.placeholder = 'Puntuacion ["," decimales]'

                  // checkbox = document.createElement('input');
                  // checkbox.type = 'checkbox';
                  // checkbox.className = 'checkbox';
                  // checkbox.name = this.fiveColumnsPoint[(j - 1)];

                  td.append(input);
                  // td.append(checkbox)
                  // td.append(input2);
                  break;

                default:
                  break;
              }
            }

          }

        }

      }

      body.append(newRubrica);
      newRubrica.append(newTable);

      let buttonGuardar = document.createElement('button');
      buttonGuardar.className = 'btn btn-secondary botonGuardar';
      buttonGuardar.textContent = 'Guardar Rubrica';
      // buttonGuardar.style.justifySelf = 'end';
      buttonGuardar.addEventListener('click', (e) => {
        this.guardarRubrica(e);
      });

      // let buttonRow = document.createElement('button');
      // buttonRow.className = 'btn btn-success botonCrear';
      // buttonRow.textContent = 'Añadir fila +'
      // buttonRow.style.marginLeft = '50em';
      // buttonRow.addEventListener('click', (e) => {
      //   this.updateRow();
      // });

      newRubrica.append(buttonGuardar);
      // newRubrica.append(buttonRow);
    } else {
      alert('Numero de columnas entre de 3 a 5 y numero de filas mas de 0')
    }
  }

  //Guarda la rubrica creada y la muestra por pantalla
  guardarRubrica(elegido: any) {
    this.finalCalification = 0;
    let casilla = -1;

    let inputs: any = document.querySelectorAll('.newTable .texto');

    const contenidoRubricas: any = [];

    inputs.forEach((e: any) => {
      return contenidoRubricas.push(e.value);
    });

    console.log(contenidoRubricas);

    document.querySelector('.newTable')?.remove();
    document.querySelector('.botonGuardar')?.remove();

    let body: any = document.querySelector('body');

    let newRubrica = document.createElement('div');
    newRubrica.className = 'newRubrica';
    newRubrica.style.overflowX = 'auto';
    newRubrica.style.margin = 2 + 'em';

    let newTable = document.createElement('table');
    newTable.className = this.nombreRubrica.value + 'Table table table-hover';
    newTable.style.overflow = 'scroll';


    for (let i = 0; i < (this.filas.value + 1); i++) {

      let tr = document.createElement('tr');
      if (i == 0) {
        tr.className = 'table-active'
      }
      newTable.append(tr);

      for (let j = 0; j < (this.columnas.value + 1); j++) {


        if (i == 0) {

          // let th = document.createElement('th');
          // th.scope = 'col';
          // th.textContent = contenidoRubricas[casilla];
          // tr.append(th);

          let input;
          //Crea los encabezados dinamicamente dependiendo de las columnas que haya elegido crear el usuario
          switch (this.columnas.value) {
            case 3:
              input = document.createElement('th');
              input.textContent = this.threeColumns[(j)]
              tr.append(input);
              break;
            case 4:
              input = document.createElement('th');
              input.textContent = this.fourColumns[(j)]
              tr.append(input);
              break;
            case 5:
              input = document.createElement('th');
              input.textContent = this.fiveColumns[(j)]
              tr.append(input);
              break;

            default:
              break;
          }
        } else {
          casilla++;
          if (j == 0) {

            //Jugamos con la posición de la 'j' para insertar los titulos de cada fila con un formato determinado
            let th = document.createElement('th');
            th.scope = 'row';
            th.textContent = contenidoRubricas[casilla];
            tr.append(th);

          } else {
            // let td = document.createElement('td');
            // td.textContent = contenidoRubricas[casilla];
            // tr.append(td);
            let td;
            let checkbox: any;
            let br;

            //Dependiendo de las columnas insertadas, insertaremos el contenido y los puntos de cada casilla
            switch (this.columnas.value) {
              case 3:
                td = document.createElement('td');
                td.textContent = contenidoRubricas[casilla];


                checkbox = document.createElement('input');
                checkbox.name = this.threeColumnsPoint[(j - 1)];
                checkbox.type = 'checkbox';
                checkbox.className = 'checkbox';
                checkbox.addEventListener('click', ($event: any) => {
                  this.onChange($event)
                })

                br = document.createElement('br');

                tr.append(td);
                td.append(br);
                td.append(checkbox)
                break;
              case 4:
                td = document.createElement('td');
                td.textContent = contenidoRubricas[casilla];


                checkbox = document.createElement('input');
                checkbox.name = this.fourColumnsPoint[(j - 1)];
                checkbox.type = 'checkbox';
                checkbox.className = 'checkbox';

                br = document.createElement('br');

                tr.append(td);
                td.append(br);
                td.append(checkbox)
                break;
              case 5:
                td = document.createElement('td');
                td.textContent = contenidoRubricas[casilla];


                checkbox = document.createElement('input');
                checkbox.name = this.fiveColumnsPoint[(j - 1)];
                checkbox.type = 'checkbox';
                checkbox.className = 'checkbox';

                br = document.createElement('br');

                tr.append(td);
                td.append(br);
                td.append(checkbox)

                break;

              default:
                break;
            }
          }

        }

      }

    }

    let buttonCalificar = document.createElement('button');
    buttonCalificar.textContent = 'Guardar';
    buttonCalificar.className = this.nombreRubrica.value + ', btn btn-primary';

    buttonCalificar.addEventListener('click', () => {

      const dialogs = document.querySelectorAll('dialog')
      let div: any = dialogs[3].querySelector('div')
      div.className = buttonCalificar.className.split(',')[0];
      dialogs[3].showModal();
      // dialogs[3]. =  buttonCalificar.className.split(',')[0]
      console.log(div.className);

      console.log(this.finalCalification);
    })
    // buttonCalificar.onclick = () => {

    // }

    body.append(newRubrica);
    newRubrica.append(newTable);
    newRubrica.append(buttonCalificar)
  }

  // PROBAR CREACIÓN SEGUN ABRE LA PÁGINA
  createTableCalifications(nombresRubrica: string, finalizar?: any) {
    const header: any = document.querySelector('.header');
    const createCalifications = document.querySelector('.createCalifications');
    const calificatios = document.querySelectorAll('.calificatios');

    if (!finalizar) {
      for (let i = 0; i < (this.students.length + 1); i++) {
        //Controla que sea la primera entrada para introducir el Titulo de la columna
        if (i == 0) {

          let th = document.createElement('th');
          th.textContent = nombresRubrica;
          th.scope = 'col';
          th.style.textAlign = 'center';
          header.insertBefore(th, createCalifications);

        } else {//Una vez escrito el titulo, se pasa a rellenar el resto de la columna

          let td = document.createElement('td');
          td.className = nombresRubrica + ',' + this.students[(i - 1)] + ', table-active';
          td.style.textAlign = 'center';
          // td.style.border = 1+'px solid #DADADA';
          td.style.borderRadius = 10 + 'px';
          td.addEventListener('click', () => {
            this.finalCalification = 0;
            let nombre = td.className.split(',')[0]
            console.log('soy td ' + nombre);

            this.selectedRubrica(td);

          })
          calificatios[(i - 1)].append(td);

        }
      }
    } else {
      for (let i = 0; i < (this.students.length + 1); i++) {
        //Controla que sea la primera entrada para introducir el Titulo de la columna
        if (i == 0) {

          let th = document.createElement('th');
          th.textContent = 'Total';
          th.scope = 'col';
          th.style.textAlign = 'center';
          header.insertBefore(th, createCalifications);

        } else {//Una vez escrito el titulo, se pasa a rellenar el resto de la columna

          let td = document.createElement('td');
          td.className = nombresRubrica + ',' + this.students[(i - 1)] + ', table-active';
          td.style.textAlign = 'center';
          // td.style.border = 1+'px solid #DADADA';
          td.style.borderRadius = 10 + 'px';
          td.addEventListener('click', () => {
            let nombre = td.className.split(',')[0]
            console.log('soy td ' + nombre);

            this.selectedRubrica(td);

          })

          //Coge el tr asiciado a cada td y a partir de él recoge todos sus elementos hijo (td) haciendo un cálculo de todas las puntuaciones que
          //hay por cada alumno y cuales son cada una para llegar a calcular la puntuación final
          let hijos = calificatios[(i - 1)].querySelectorAll('td');
          let contadorHijos = 0;
          let puntuacionFinal = 0;

          hijos?.forEach((e: any) => {
            contadorHijos++
          })
          contadorHijos = contadorHijos;

          hijos?.forEach((e: any) => {

            let puntos = parseInt(e.textContent);
            puntuacionFinal = puntuacionFinal + puntos;

          })

          puntuacionFinal = puntuacionFinal / contadorHijos;
          td.textContent = puntuacionFinal.toString();

          calificatios[(i - 1)].append(td);

        }
      }
    }
  }

  //Cierra cualquier cuadro modal
  close() {
    const dialogs = document.querySelectorAll('dialog')
    dialogs.forEach(element => {
      element.close()
    });
  }

  chargeRubrica() {

    let dialogs = document.querySelectorAll('dialog');
    dialogs.forEach((e: any) => {
      e.close()
    })



    const parametros = {
      Curso: this.cookies.get('curso'),
      id_Profesor: this.idProfesor,
      Asignatura: this.cookies.get('asignatura')
    }
    console.log(this.idProfesor);

    //Carga las rubricas asociadas a la asignatura en la que estemos
    this.alumnosService.getRubricasCalifications(parametros).subscribe(
      res => {
        this.rubricas = res;
        let rubricasSave: any = [];
        let nombreRubricas: any = [];
        console.log(this.rubricas);

        for (const rubrica of this.rubricas) {
          rubricasSave.push(rubrica.Tabla.split('?!?'))
          nombreRubricas.push(rubrica.Nombre)
        }

        console.log(rubricasSave);
        let div: any = document.querySelector('#tableSave');
        while (div.firstChild) {
          div.removeChild(div.firstChild);
        }

        let contadorNombres = 0;
        for (const tabla of rubricasSave) {

          //se convierte en variable para poder unsarlo en la función 'this.createTableCalifications(nombre);'
          let nombre = nombreRubricas[contadorNombres];

          let h2 = document.createElement('h2');
          h2.textContent = nombreRubricas[contadorNombres];
          div.append(h2);

          let table = document.createElement('table');
          table.style.textAlign = 'center';
          table.className = 'table table-hover';

          let button = document.createElement('button');
          button.textContent = 'Usar';
          button.className = nombreRubricas[contadorNombres] + ', btn btn-secondary';
          button.style.marginBottom = 2 + 'em';

          button.addEventListener('click', () => {
            this.createTableCalifications(nombre);
          })

          console.log(tabla);
          contadorNombres++;

          if ((tabla[2] == 'Notable') && (tabla[4] != 'Suficiente')) {
            this.chargeTable(table, button, tabla, div, 4, 5);
          } else if ((tabla[4] == 'Suficiente')) {
            this.chargeTable(table, button, tabla, div, 5, 6);
          } else {
            this.chargeTable(table, button, tabla, div, 3, 4);
          }
        }

      }
    )
  }

  //Cada vez que detecta cambio en un checkbox, este coge su 'name' para calcular la nota del alumno, ya sea
  //sumando porque se ha hecho click o restando porque se ha deshecho el click
  onChange($event: any) {

    let i = -1;
    console.log('hola');

    if ($event.target.checked == true) {
      this.finalCalification = this.finalCalification + parseInt($event.target.name)
      console.log(this.finalCalification);

    } else if ($event.target.checked == false) {
      this.finalCalification = this.finalCalification - parseInt($event.target.name)
      console.log(this.finalCalification);
    }
  }

  saveThatRubric($event: any) {
    const dialogs = document.querySelectorAll('dialog')
    let div: any = dialogs[3].querySelector('div')

    let table = document.querySelector('.' + div.className + 'Table')
    let tr: any = table?.querySelectorAll('tr');
    let i = 0;
    tr?.forEach((e: any) => {
      if (i == 0) {
        let th = e.querySelectorAll('th');
        th.forEach((e: any) => {
          console.log('value -> ' + e.vale);
          console.log('textContent -> ' + e.textContent);
          this.datosTable.push(e.textContent)
        })
        i++
      } else {
        let th = e.querySelector('th');
        console.log('textContent -> ' + th.textContent);
        this.datosTable.push(th.textContent)

        let td = e.querySelectorAll('td');
        td.forEach((e: any) => {
          console.log('value -> ' + e.vale);
          console.log('textContent -> ' + e.textContent);
          this.datosTable.push(e.textContent)
        })
      }
    })

    console.log(this.datosTable.join('?!?'));
    // const dialogs = document.querySelectorAll('dialog')
    dialogs[3].close();

    const rubrica = {
      Nombre: div.className,
      Tabla: this.datosTable.join('?!?'),
      Asignatura: this.cookies.get('asignatura'),
      Curso: this.cookies.get('curso'),
      id_Profesor: this.idProfesor
    }

    this.alumnosService.saveThatRubrica(rubrica).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err);

      }
    )
  }

  selectedRubrica(tdSelecionado: any) {
    let dialogs = document.querySelectorAll('dialog');
    dialogs[4].showModal()

    let div: any = dialogs[4].querySelector('div');
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }

    // let tabla: any = document.createElement('table');
    // tabla.className = 'table table-hover'
    // div?.append(tabla)

    const parametros = {
      Nombre: tdSelecionado.className.split(',')[0],
      Asignatura: this.cookies.get('asignatura'),
      id_Profesor: this.idProfesor,
      Curso: this.cookies.get('curso')
    }
    console.log(tdSelecionado.className.split(',')[1]);


    this.alumnosService.getOnlyOneRubrica(parametros).subscribe(
      res => {
        console.log(res);
        let respuesta: any = '';
        respuesta = res;
        console.log(respuesta);

        let rubrica: any = []
        rubrica.push(respuesta[0].Tabla.split('?!?'))
        console.log(rubrica);


        let table = document.createElement('table');
        table.style.textAlign = 'center';
        table.className = 'table table-hover';

        let button = document.createElement('button');
        button.textContent = 'Calificar';
        button.className = 'btn btn-secondary';
        button.style.marginBottom = 2 + 'em';


        button.addEventListener('click', () => {
          let total = this.finalCalification / this.filas.value
          console.log(this.finalCalification);
          console.log(this.filas.value);
          console.log(total);


          tdSelecionado.textContent = total
          dialogs[4].close()

          //CREAR NOTA PARA EL ALUMNO

          const nota = {
            Nombre_Alumnos: tdSelecionado.className.split(',')[1],
            Nota: total,
            Nombre_Calificacion: tdSelecionado.className.split(',')[0],
            Asignatura: this.cookies.get('asignatura'),
            id_Profesor: this.idProfesor
          }

          this.alumnosService.createNota(nota).subscribe(
            res => {

            },
            err => {

            }
          )
        })

        if ((rubrica[0][2] == 'Notable') && (rubrica[0][4] != 'Suficiente')) {
          this.chargeTable(table, button, rubrica[0], div, 4, 5, this.fourColumnsPoint);
        } else if ((rubrica[0][4] == 'Suficiente')) {
          this.chargeTable(table, button, rubrica[0], div, 5, 6, this.fiveColumnsPoint);
        } else {
          this.chargeTable(table, button, rubrica[0], div, 3, 4, this.threeColumnsPoint);
        }
      },
      err => {

      }

    )
  }

  finalizarCalculo() {
    this.createTableCalifications('Total', true)
  }
}
