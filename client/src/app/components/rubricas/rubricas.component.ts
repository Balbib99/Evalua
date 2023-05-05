import { Component } from '@angular/core';

@Component({
  selector: 'app-rubricas',
  templateUrl: './rubricas.component.html',
  styleUrls: ['./rubricas.component.css']
})
export class RubricasComponent {
  
  

  constructor(){}

  //Muestra un cuadro de dialogo para elegir el tamaño de la rubrica a crear
  showDialog(){
    let dialog = document.querySelector('dialog');
    dialog?.showModal();
  }

  //Crea las filas y columnas de la rubrica una vez se ha elegido el tamaño de la misma
  createRubrica(){
    let dialog = document.querySelector('dialog');
    dialog?.close();

    let body:any = document.querySelector('.body');
    let button = document.querySelector('.create');

    let newRubrica = document.createElement('div');
    newRubrica.className = 'container newRubrica';
    

    let newTable = document.createElement('table');
    newTable.className = 'table table-hover newTable';

    for (let i = 0; i < 6; i++) {
      
      let tr = document.createElement('tr');
      if(i == 0){
        tr.className = 'table-active'
      }
      newTable.append(tr);
      
      for (let j = 0; j < 6; j++) {
        
        if(i == 0){
          let th = document.createElement('th');
          th.scope = 'col';
          tr.append(th);

          let input = document.createElement('input');
          th.append(input);
        }else{
          if(j == 0){
            let th = document.createElement('th');
            th.scope = 'row';
            tr.append(th);

            let input = document.createElement('input');
            th.append(input);
          }else{
            let td = document.createElement('td');
            tr.append(td);

            let input = document.createElement('input');
            td.append(input);
          }
          
        }

      }
      
    }

    body.insertBefore(newRubrica, button);
    newRubrica.append(newTable);

    let buttonGuardar = document.createElement('button');
    buttonGuardar.className ='btn btn-secondary botonGuardar';
    buttonGuardar.textContent = 'Guardar Rubrica';
    // buttonGuardar.style.justifySelf = 'end';
    buttonGuardar.addEventListener('click', (e) => {
      this.guardarRubrica(e);
    });

    let buttonRow = document.createElement('button');
    buttonRow.className = 'btn btn-success botonCrear';
    buttonRow.textContent = 'Añadir fila +'
    buttonRow.style.marginLeft = '50em';
    buttonRow.addEventListener('click', (e) => {
      this.updateRow();
    });

    newRubrica.append(buttonGuardar);
    newRubrica.append(buttonRow);
  }

  //Guarda la rubrica creada y la muestra por pantalla
  guardarRubrica(elegido: any){
    let casilla = -1;

    let inputs = document.querySelectorAll('input');

    const contenidoRubricas: any = [];
    
    inputs.forEach(e=> {
      return contenidoRubricas.push(e.value);
    });

    console.log(contenidoRubricas);
    
    document.querySelector('.newTable')?.remove();
    document.querySelector('.botonGuardar')?.remove();

    let body:any = document.querySelector('.body');
    let button = document.querySelector('.create');

    let newRubrica = document.createElement('div');
    newRubrica.className = 'container newRubrica';
    

    let newTable = document.createElement('table');
    newTable.className = 'table table-hover';

    for (let i = 0; i < 6; i++) {
      
      let tr = document.createElement('tr');
      if(i == 0){
        tr.className = 'table-active'
      }
      newTable.append(tr);
      
      for (let j = 0; j < 6; j++) {
        casilla++;

        if(i == 0){
          let th = document.createElement('th');
          th.scope = 'col';
          th.textContent = contenidoRubricas[casilla];
          tr.append(th);
        }else{
          if(j == 0){
            let th = document.createElement('th');
            th.scope = 'row';
            th.textContent = contenidoRubricas[casilla];
            tr.append(th);

          }else{
            let td = document.createElement('td');
            td.textContent = contenidoRubricas[casilla];
            tr.append(td);
          }
          
        }

      }
      
    }

    body.insertBefore(newRubrica, button);
    newRubrica.append(newTable);
  }

  //Permite crear más filas dinamicamente a mayores en la rubrica
  updateRow(){
    let rubrica: any = document.querySelector('.newRubrica');
    let table = document.querySelector('.newTable');
    let button = document.querySelector('.botonGuardar');

    for (let i = 0; i < 1; i++) {
      let tr = document.createElement('tr');
      table?.append(tr);
      for (let j = 0; j < 6; j++) {
        if(j == 0){
          let th = document.createElement('th');
          th.scope = 'row';
          tr.append(th);

          let input = document.createElement('input');
          th.append(input);
        }else{
          let td = document.createElement('td');
          tr.append(td);

          let input = document.createElement('input');
          td.append(input);
        }
      }
      
    }

    rubrica.insertBefore(table,button);
  }
  
}
