import { Component, HostListener } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-alumnos-curso',
  templateUrl: './alumnos-curso.component.html',
  styleUrls: ['./alumnos-curso.component.css']
})

export class AlumnosCursoComponent {

  // nombre:any = '';
  alumnosCurso: any = [];

  //Variables del formulario de creación de un alumno nuevo
  nombre = new FormControl('');
  apellidos = new FormControl('');
  nombre_Familiar1 = new FormControl('');
  apellidos_Familiar1 = new FormControl('');
  nombre_Familiar2 = new FormControl('');
  apellidos_Familiar2 = new FormControl('');
  direccion = new FormControl('');
  email = new FormControl('');
  telefono1 = new FormControl('');
  telefono2 = new FormControl('');
  observaciones = new FormControl('');

  //Varaible a rellenar posteriormente con el id del profesor/usuario que haya iniciado sesión
  id_Profesor:any = '';

  //Variables del formulario de creación de una asignatura nueva
  nombreAsignatura = new FormControl('');
  alumnoElegido = new FormControl('');

  //Array en el que guardaremos, en el apartado de creación de una nueva asignatura, los alumnos que van 
  //a impartir una asignatura determinada
  alumnosAsignatura: any = [];

  subjects: any = []

  alumnosAsignaturaFormat:any = '';


  constructor(private alumnosService: AlumnosService,  private cookies:CookieService) {

  }
  
  //Según inicia la página, esta carga una tabla con los datos de los alumnos que tiene el usuario en la clase en cestión y
  //  con los botones para las diferentes operaciones tanto con los alumnos como con las asignaturas
  ngOnInit() {

    const form = document.querySelector('.createAlumno');
    form?.setAttribute('style', 'display: none');

    const formAsignatura = document.querySelector('.createAsignatura');
    formAsignatura?.setAttribute('style', 'display: none');

    const curso = {
      nombre: this.cookies.get('curso'),
      profesor: this.cookies.get('user')
    }

    this.alumnosService.getAlumnosCurso(curso).subscribe(
      res => {
        this.alumnosCurso = res;
      },
      err => console.log(err)
    );


    const profesor = {
      nombre : this.cookies.get('user')
    }

    this.alumnosService.getIdProfesor(profesor).subscribe(
      res => {
        this.id_Profesor = res
        this.listSubject()
      },
      err => console.log(err)
    )

    
    console.log(this.alumnosAsignatura);
  }

  //Lista las asignaturas asignadas a un determinado curso
  listSubject(){

    const subject = {
      id_Profesor: this.id_Profesor[0].id,
      Nombre_curso: this.cookies.get('curso')
    }
    console.log(subject)

    this.alumnosService.getSubjects(subject).subscribe(
      res => {
        this.subjects = res
        console.log(this.subjects);
      },
      err => {
        console.log(err);
      }
    )

    
  }

  //Hacemos aparecer y desaparecer el formulario de creación de un nuevo alumno según el usuario clike sobre el
  //botón
  createAlumno(){
    const form = document.querySelector('.createAlumno');

    if (form?.getAttribute('style') == 'display: none') {
      form?.setAttribute('style', 'display: block');  
    }else{
      form?.setAttribute('style', 'display: none');  
    }

    const profesor = {
      nombre : this.cookies.get('user')
    }

    this.alumnosService.getIdProfesor(profesor).subscribe(
      res => {
        this.id_Profesor = res
        console.log(this.id_Profesor[0].id);
      },
      err => console.log(err)
    )

  }

  //Recogemos los datos sobre el nuevo alumno, y lo añadimos a la BBDD para que posteriormente latabla que contiene
  //los alumnos se actualize
  sendForm(){

    const newAlumno = {
      nombre : this.nombre.value,
      apellidos : this.apellidos.value,
      nombre_Familiar1 : this.nombre_Familiar1.value,
      apellidos_Familiar1 : this.apellidos_Familiar1.value,
      nombre_Familiar2 : this.nombre_Familiar2.value,
      apellidos_Familiar2 : this.apellidos_Familiar2.value,
      direccion : this.direccion.value,
      email : this.email.value,
      telefono1 : this.telefono1.value,
      telefono2 : this.telefono2.value,
      observaciones : this.observaciones.value,
      curso : this.cookies.get('curso'),
      id_Profesor: this.id_Profesor[0].id
    }

    if( this.nombre.value == ''){
      alert('El nombre del alumno es imprescindible');
    }else{
      this.alumnosService.createAlumno(newAlumno).subscribe(
        res => {
          alert('Alumno '+this.nombre.value+' registrado correctamente en la clase '+this.cookies.get('curso'));
        },
        err => console.log(err)
      )

      const form = document.querySelector('.createAlumno');

      form?.setAttribute('style', 'display: block');

      window.scrollTo(scrollY, 0);

      this.ngOnInit();
    } 
  }

  //Hacemos aparecer y desaparecer el formulario de creación de nueva asignatura según el usuario clike sobre el
  //botón
  createAsignatura() {
    const formAsignatura = document.querySelector('.createAsignatura');

    if (formAsignatura?.getAttribute('style') == 'display: none') {
      formAsignatura?.setAttribute('style', 'display: block');  
    }else{
      formAsignatura?.setAttribute('style', 'display: none');  
    }
  }

  onChange($event:any){
    let i = -1; //Nos inicia el indice del array de los alumnos en -1 para poder trabajar con él en la eliminación de los alumnos

    //Controlamos mediante condiciones, si el checkbox seleccionado es el que selecciona a todos,
    //o es uno de los que se refiere a un alumno en particular
    if($event.target.name == 'all' && $event.target.checked == true){

      //Si seleccionamos el checbox de 'SELECCIONA TODOS' todos los checkbox se mostrarán como seleccionados
      document.querySelectorAll('.check').forEach(function(checkElement:any) {
        checkElement.checked = true;
      });

      let labelCheck = document.querySelectorAll('.labelCheck');
      
      //Una vez mostrados todos como seleccionados, pasamos a rellenar un array con los datos de todos los alumnos
      //seleccionados
      labelCheck.forEach(e => {
        let array:any = e.textContent?.split(' ');
        let nombre = array[1];
        let apellidos = array[2]+' '+array[3];

        //Si este array de alumnos se encuentra vecío, lo rellenaremos normalmente por primera vez, si no,
        //recorreremos el array en busca de alumnos identicos que ya se hayan metido anteriormente, si encontramos
        //algún alumno con el mismo nombre nos le saltamos, en cambio, si no existe nigún alumno llamado de esa forma,
        //este pasa a introducirse al array en cuestión
        if(this.alumnosAsignatura == ''){
          this.alumnosAsignatura.push({nombre: nombre, apellidos: apellidos}) 
        }else{

          let alumnoAñadido = 0; //Limita las veces que se ha introducido un mismo alumno para no hacerlo más de una vez
          let alumnosRecorridos = 0; //Lo utilizamos para comparar los alumnos que ya han sido comprobados, con la cantidad
          //de alumnos que tenemos ya registrados para hacer la comprobación que explicamos anteriormente

          for (const alum of this.alumnosAsignatura) {

            if((alum.nombre != nombre) && (alum.apellidos != apellidos) && (alumnoAñadido == 0)){
              
              alumnosRecorridos++; //Se añade uno cada vez que un alumno es comprobado

              if(alumnosRecorridos == this.alumnosAsignatura.length){

                //Si finalmente no hay ningún alumno con el mismo nombre, este es añadido
                this.alumnosAsignatura.push({nombre: nombre, apellidos: apellidos})
                
                alumnoAñadido++; //Se añade uno cada vez que metemos un alumno al array

              }
            }
          }
        }
      });
    }else{ //Si las casilla de 'SELECCIONA TODOS' la estamos deseleccionando o estamos seleccionando uno de los alumnos
      //individualmente, haremos lo siguiente
      
      //Si deseleccionamos la casilla de 'SELECCIONA TODOS', todas las casillas serán deseleccionadas y el array
      //que contiene los alumnos será vaciado
      if($event.target.name == 'all' && $event.target.checked == false){
        document.querySelectorAll('.check').forEach(function(checkElement:any) {
          checkElement.checked = false;
        });

        this.alumnosAsignatura = [];
      }

      document.querySelectorAll('.checkTodos').forEach(function(checkElement:any) {
        checkElement.checked = false;
      });

      //Si seleccionamos un alumno de forma individual, este pasa a introducirse direcctamente al array, ya que con las
      //operaciones anteriores nos habremos asegurado de que el array esté vacío o de que no se pueda repetir el alumno
      if ($event.target.checked == true) {
        
        this.alumnosAsignatura.push({nombre: $event.target.name, apellidos: $event.target.value})
      
      }else{ //Si deseleccionamos un alumno, sacamos el puesto que ocupa en el array y lo eliminamos del mismo
  
        for (const alum of this.alumnosAsignatura) {
          i++;
  
          if(alum.nombre == $event.target.name && alum.apellidos == $event.target.value){
            this.alumnosAsignatura.splice(i, 1);
          }
        }
  
      }
    }

    console.log(this.alumnosAsignatura);
  }

  //Recogemos los datos del formulario de creación de nuevas asignaturas para instroducirlas
  //en la BBDD con sus alumnos y clase correspondientes
  sendFormAsignaturas() {
    const divAsignaturas:any = document.querySelector('.asignatura');
    const createSubject:any = document.querySelector('.createSubject');

    // let newSubject:any = document.createElement('button');
    // newSubject.className = "btn btn-lg btn-primary m-4";
    // newSubject.style.width = 25+'%';
    // newSubject.style.height = 200+'px';
    // newSubject.textContent = this.nombreAsignatura.value;

    this.alumnosAsignaturaFormat = '';
    let i=0;
    this.alumnosAsignatura.forEach((element: any) => {
      if(i==0){
        this.alumnosAsignaturaFormat = element.nombre+' '+element.apellidos
      }else{
        this.alumnosAsignaturaFormat = this.alumnosAsignaturaFormat+','+element.nombre+' '+element.apellidos
      }
      i++
    });

    const subject = {
      Nombre: this.nombreAsignatura.value,
      Nombre_alumnos: this.alumnosAsignaturaFormat,
      Nombre_curso: this.cookies.get('curso'),
      id_Profesor: this.id_Profesor[0].id
    }

    this.alumnosService.createSubject(subject).subscribe(
      res => {
        alert(JSON.stringify(res));

        //------------------------------ACABAR-------------------------------------
        const content = {
          Nombre_alumno: this.alumnosAsignaturaFormat,
          Nombre_asignatura: this.nombreAsignatura.value
        }
        this.alumnosService.writeTableCalifications(content).subscribe(
              res=> {
                alert(res)
              },
              err => {
                console.log(err);
              }
            )
      },
      err => {
        console.log(err);
      }
    )

    //Cada vez que creamos una asignatura, esta se ve representada con un botón para que el usuario
    //pueda interaccionar con él
    // divAsignaturas.insertBefore(newSubject, createSubject);
    this.ngOnInit()
  }

  califications(){
    this.alumnosService.califications()
  }
  
}
