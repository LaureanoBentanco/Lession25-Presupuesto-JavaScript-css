const ingresos = [
    new Ingreso("Crema de Demagos 300mg" , 394.50),
    new Ingreso("Perfume Kevin 200 ml", 345.39)

];

const egresos = [
    new Egreso ("Pago de LUZ",  300.00),
    new Egreso ("Pago de Impuestos ", 200.40)
];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let cargarCabecero = ()=>{

    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());

}

let totalIngresos =()=>{
    let totalIngreso = 0;

    for(ingreso of ingresos){
        totalIngreso += ingreso.valor
    }

    return totalIngreso;
};

let totalEgresos = ()=>{

    let totalEgreso = 0;

    for(egreso of egresos){
        totalEgreso += egreso.valor
    }

    return totalEgreso;
};

const formatoPorcentaje = (valor) => {

    return valor.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: 2});

};

// A los valores numericos le da un Formato de Moneda

const formatoMoneda = (valor)=>{

    return valor.toLocaleString('es-US',{style:'currency', currency: 'USD', minimumFractionDigits: 2});

};

const cargarIngresos = ()=>{

    let ingresosHTML = "";

    for(ingreso of ingresos){

        ingresosHTML+= crearIngresoHTML(ingreso);
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;

}


const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `

    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
         <div class="elemento_eliminar">
             <button class = "elemento_eliminar--btn">
                 <ion-icon name="close-circle-outline"
                 onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
             </button>
         </div>

    </div>
</div>

    `;
    return ingresoHTML;
}

const cargarEgresos =()=> {
    
    let egresosHTML = '';
    for(egreso of egresos ){
       egresosHTML += crearEgresoHTML(egreso);
    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML;



}

const crearEgresoHTML = (egreso) =>{

    let egresosHTML = ` <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
     <div class="derecha limpiarEstilos">
      <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
      <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
      <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
              <ion-icon name="close-circle-outline"
              onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
          </button>
      </div>
     </div>
     
 </div>
    `;
     return egresosHTML;

}

const eliminarIngreso=(id)=>{
    let indeceEliminar = ingresos.findIndex(ingreso=>ingreso.id === id);
    ingresos.splice(indeceEliminar,1);
    cargarCabecero();
    cargarIngresos();

}

const eliminarEgreso=(id)=>{   
 let indiceEliminar = egresos.findIndex(egreso=>egreso.id === id );
 egresos.splice(indiceEliminar, 1);
 cargarCabecero();
 cargarEgresos();

}

let agregarDato =()=>{

    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor  = forma["valor"]

    if(descripcion.value !== '' && valor.value !== ""){
        if(tipo.value === 'ingreso'){

            ingresos.push(new Ingreso(descripcion.value, +valor.value))
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value ==='egreso'){
            egresos.push(new Egreso (descripcion.value, +valor.value))
            cargarCabecero();
            cargarEgresos();
        }
    }

}