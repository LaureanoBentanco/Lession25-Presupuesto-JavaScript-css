class Egreso extends Dato {
    static contadeoEgresos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Egreso.contadeoEgresos;
        
    }

    get id(){
      return this._id;  
    }
    
}