import { Component } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';
import html2pdf from 'html2pdf.js';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-rubricas',
  templateUrl: './rubricas.component.html',
  styleUrls: ['./rubricas.component.css']
})
export class RubricasComponent {
  
  idProfesor:any = '';
  rubricas: any = [];
  filas: any = new FormControl('');
  columnas: any = new FormControl('');

  constructor(private alumnosService: AlumnosService, private cookies: CookieService){}

  ngOnInit(){
    const profesor = {
      nombre: this.cookies.get('user')
    }

    this.alumnosService.getIdProfesor(profesor).subscribe(
      res => {
        this.idProfesor = res;
        this.idProfesor = this.idProfesor[0].id
        console.log(this.idProfesor);
        this.chargeRubrica()   
      }
    )
  }

  // ------------------ PROXIMA ACTUALIZACIÓN DE LA PÁGINA WEB --------------------------------

  // //Muestra un cuadro de dialogo para elegir el tamaño de la rubrica a crear
  // showDialog(){
  //   let dialog = document.querySelector('dialog');
  //   dialog?.showModal();
  // }

  // //Crea las filas y columnas de la rubrica una vez se ha elegido el tamaño de la misma
  // createRubrica(){
  //   let dialog = document.querySelector('dialog');
  //   dialog?.close();

  //   let body:any = document.querySelector('.body');
  //   let button = document.querySelector('.create');

  //   let newRubrica = document.createElement('div');
  //   newRubrica.className = 'container newRubrica';
    

  //   let newTable = document.createElement('table');
  //   newTable.className = 'table table-hover newTable';

  //   for (let i = 0; i < this.filas.value ; i++) {
      
  //     let tr = document.createElement('tr');
  //     if(i == 0){
  //       tr.className = 'table-active'
  //     }
  //     newTable.append(tr);
      
  //     for (let j = 0; j < this.columnas.value; j++) {
        
  //       if(i == 0){
  //         let th = document.createElement('th');
  //         th.scope = 'col';
  //         tr.append(th);

  //         let input = document.createElement('input');
  //         th.append(input);
  //       }else{
  //         if(j == 0){
  //           let th = document.createElement('th');
  //           th.scope = 'row';
  //           tr.append(th);

  //           let input = document.createElement('input');
  //           th.append(input);
  //         }else{
  //           let td = document.createElement('td');
  //           tr.append(td);

  //           let input = document.createElement('input');
  //           td.append(input);
  //         }
          
  //       }

  //     }
      
  //   }

  //   body.append(newRubrica);
  //   newRubrica.append(newTable);

  //   let buttonGuardar = document.createElement('button');
  //   buttonGuardar.className ='btn btn-secondary botonGuardar';
  //   buttonGuardar.textContent = 'Guardar Rubrica';
  //   // buttonGuardar.style.justifySelf = 'end';
  //   buttonGuardar.addEventListener('click', (e) => {
  //     this.guardarRubrica(e);
  //   });

  //   let buttonRow = document.createElement('button');
  //   buttonRow.className = 'btn btn-success botonCrear';
  //   buttonRow.textContent = 'Añadir fila +'
  //   buttonRow.style.marginLeft = '50em';
  //   buttonRow.addEventListener('click', (e) => {
  //     this.updateRow();
  //   });

  //   newRubrica.append(buttonGuardar);
  //   newRubrica.append(buttonRow);
  // }

  // //Guarda la rubrica creada y la muestra por pantalla
  // guardarRubrica(elegido: any){
  //   let casilla = -1;

  //   let inputs = document.querySelectorAll('input');

  //   const contenidoRubricas: any = [];
    
  //   inputs.forEach(e=> {
  //     return contenidoRubricas.push(e.value);
  //   });

  //   console.log(contenidoRubricas);
    
  //   document.querySelector('.newTable')?.remove();
  //   document.querySelector('.botonGuardar')?.remove();

  //   let body:any = document.querySelector('.body');
  //   let button = document.querySelector('.create');

  //   let newRubrica = document.createElement('div');
  //   newRubrica.className = 'container newRubrica';
    

  //   let newTable = document.createElement('table');
  //   newTable.className = 'table table-hover';

  //   for (let i = 0; i < this.filas.value; i++) {
      
  //     let tr = document.createElement('tr');
  //     if(i == 0){
  //       tr.className = 'table-active'
  //     }
  //     newTable.append(tr);
      
  //     for (let j = 0; j < this.columnas.value; j++) {
  //       casilla++;

  //       if(i == 0){
  //         let th = document.createElement('th');
  //         th.scope = 'col';
  //         th.textContent = contenidoRubricas[casilla];
  //         tr.append(th);
  //       }else{
  //         if(j == 0){
  //           let th = document.createElement('th');
  //           th.scope = 'row';
  //           th.textContent = contenidoRubricas[casilla];
  //           tr.append(th);

  //         }else{
  //           let td = document.createElement('td');
  //           td.textContent = contenidoRubricas[casilla];
  //           tr.append(td);
  //         }
          
  //       }

  //     }
      
  //   }

  //   body.append(newRubrica);
  //   newRubrica.append(newTable);
  // }

  // //Permite crear más filas dinamicamente a mayores en la rubrica
  // updateRow(){
  //   let rubrica: any = document.querySelector('.newRubrica');
  //   let table = document.querySelector('.newTable');
  //   let button = document.querySelector('.botonGuardar');

  //   for (let i = 0; i < 1; i++) {
  //     let tr = document.createElement('tr');
  //     table?.append(tr);
  //     for (let j = 0; j < 6; j++) {
  //       if(j == 0){
  //         let th = document.createElement('th');
  //         th.scope = 'row';
  //         tr.append(th);

  //         let input = document.createElement('input');
  //         th.append(input);
  //       }else{
  //         let td = document.createElement('td');
  //         tr.append(td);

  //         let input = document.createElement('input');
  //         td.append(input);
  //       }
  //     }
      
  //   }

  //   rubrica.insertBefore(table,button);
  //   document.querySelector('.botonCrear')?.remove()
  // }

  chargeRubrica() {

    let dialogs = document.querySelectorAll('dialog');
    dialogs.forEach((e: any) => {
      e.close()
    })



    const parametros = {
      id_Profesor: this.idProfesor
    }
    console.log('hola'+parametros.id_Profesor);

    //Carga las rubricas asociadas a la asignatura en la que estemos
    this.alumnosService.getRubricas(parametros).subscribe(
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
        let div: any = document.querySelector('.body');
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

          console.log(tabla);
          contadorNombres++;

          if ((tabla[2] == 'Notable') && (tabla[4] != 'Suficiente')) {
            this.chargeTable(table, tabla, div, 4, 5);
          } else if ((tabla[4] == 'Suficiente')) {
            this.chargeTable(table, tabla, div, 5, 6);
          } else {
            this.chargeTable(table, tabla, div, 3, 4);
          }
        }

      }
    )
  }

  
  chargeTable(table: any, tabla: any, div: any, counter: number, thNumber: number) {
    let tr = document.createElement('tr');
    let trr: any;
    let contador = 0;
    let titulos = 0;
    let puntos = 0;
    let contadorFilas = 0;

    let imprimir = document.createElement('button');
    imprimir.className = 'btn btn-warning';
    imprimir.textContent = 'PDF';
    imprimir.style.marginBottom = 2 + 'em';
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

          contador++
        } else {
          //Casillas de contenido
          if (contador == counter) {
            contador = 0;

            //ultima casilla de cada fila
            let td = document.createElement('td')
            td.textContent = tabla[i]

            trr.append(td);

          } else {
            contador++

            //resto de casillas
            let td = document.createElement('td')
            td.textContent = tabla[i]

            trr.append(td);

          }
        }
        table.append(trr)
      }

    }
    div.append(table);
    div.append(imprimir);
  }
  
}
