import { Component } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';
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

    const parametros = {
      Curso: this.cookies.get('curso'),
      id_Profesor: this.idProfesor,
      Asignatura: this.cookies.get('asignatura')
    }

    this.alumnosService.getRubricasCalifications(parametros).subscribe(
      res => {
        this.rubricas = res;    
      }
    )
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
    const dialogs = document.querySelectorAll('dialog')
    dialogs[2].close()

    const header: any = document.querySelector('.header');
    const createCalifications = document.querySelector('.createCalifications');
    const calificatios = document.querySelectorAll('.calificatios');

    //------------------------------- Creación de la tabla de calificaciones dinámica -----------------------------

    for (let i = 0; i < (this.students.length + 1); i++) {
      //Controla que sea la primera entrada para introducir el Titulo de la columna
      if (i == 0) {
        
        let th = document.createElement('th');
        th.textContent = this.nombreRubrica.value;
        th.scope = 'col';
        header.insertBefore(th, createCalifications);
      
      }else{//Una vez escrito el titulo, se pasa a rellenar el resto de la columna
        
        let td = document.createElement('td');
        td.className = this.nombreRubrica.value + ','+this.students[(i-1)]+', table-active';
        // td.style.border = 1+'px solid #DADADA';
        td.style.borderRadius = 10+'px';
        td.addEventListener('click', () => {
          let nombre = td.className.split(',')[0]
          console.log('soy td '+nombre);
          
        })
        calificatios[(i-1)].append(td);
      
      }
    }

    //-------------------------------------------------------------------------------------

    // -------------------------- PROCESO DE CREACIÓN DE LA RUBRICA ------------------------

    //Crea las filas y columnas de la rubrica una vez se ha elegido el tamaño de la misma
    console.log(this.columnas)
    console.log(this.filas)

    let body: any = document.querySelector('body');

    let newRubrica = document.createElement('div');
    newRubrica.className = 'container newRubrica';


    let newTable = document.createElement('table');
    newTable.className = 'table table-hover newTable';

    for (let i = 0; i < (this.columnas.value + 1); i++) {

      let tr = document.createElement('tr');
      if (i == 0) {
        tr.className = 'table-active'
      }
      newTable.append(tr);

      for (let j = 0; j < (this.filas.value + 1); j++) {

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
  }

  //Guarda la rubrica creada y la muestra por pantalla
  guardarRubrica(elegido: any) {
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
    newRubrica.className = 'container newRubrica';

    let newTable = document.createElement('table');
    newTable.className = this.nombreRubrica.value+'Table table table-hover';
    

    for (let i = 0; i < (this.columnas.value + 1); i++) {

      let tr = document.createElement('tr');
      if (i == 0) {
        tr.className = 'table-active'
      }
      newTable.append(tr);

      for (let j = 0; j < (this.filas.value + 1); j++) {
        

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
    buttonCalificar.textContent = 'Calificar';
    buttonCalificar.className = this.nombreRubrica.value+', btn btn-primary';

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

  //Cierra cualquier cuadro modal
  close() {
    const dialogs = document.querySelectorAll('dialog')
    dialogs.forEach(element => {
      element.close()
    });
  }

  //Cada vez que detecta cambio en un checkbox, este coge su 'name' para calcular la nota del alumno, ya sea
  //sumando porque se ha hecho click o restando porque se ha deshecho el click
  onChange($event: any) {
    let i = -1;
    if ($event.target.checked == true) {
      this.finalCalification = this.finalCalification + parseInt($event.target.name)
    }else if ($event.target.checked == false){
      this.finalCalification = this.finalCalification - parseInt($event.target.name)
    }
  }

  saveThatRubric($event: any){
    const dialogs = document.querySelectorAll('dialog')
    let div: any = dialogs[3].querySelector('div')

    let table = document.querySelector('.'+div.className+'Table')

    console.log(div.className);
    // const dialogs = document.querySelectorAll('dialog')
    // dialogs[3].close();

    const rubrica = {
      Nombre: div.className,
      Tabla: table?.innerHTML,
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
}
