function(instance, properties, context) {
    
    //Entrada de datos variables
    var rut = properties.RUT_numero;
     
    
   //Comprobar si el valor de entrada está vacío "eliminar error"
   if(rut==null){
    instance.publishState('valido', "")
    instance.publishState('resultadoText', "")
         return false;
    }
    
          
   //Funcion para validar RUT
    
	function validaRUT(rut){
  if (typeof rut === 'string' || typeof rut === 'number') {
    const rutSinFormato = limpiarRUT(rut);
    const rutSinDv = rutSinFormato.slice(0, -1);
    const rutDv = rutSinFormato.split('').pop().toLowerCase();
	
    return calcularDv(rutSinDv) === rutDv;
  }
  else {
    return false;
  }
};

function calcularDv(rut) {
  let suma = 0;
  let rutReversa = limpiarRUT(rut).split('').reverse();

  for (let i = 0, j = 2; i < rutReversa.length; i++, j < 7 ? j++ : j = 2) {
    suma += rutReversa[i] * j;
  }

  let resultado = 11 - (suma % 11)
  if (resultado === 11) return '0';
  if (resultado === 10) return 'k';
  return String(resultado);
};

const limpiarRUT = rut => {
  return String(rut).replace(/[^0-9a-z]/gi, '');
}
    
      //Retorna salida de datos true o false
      var valido = validaRUT(rut);
    
    
    //Verificar los digitos ingresados
    if(rut.length==9)
    {
    
     instance.publishState('valido', valido)
      
    if(valido)
      instance.publishState('resultadoText', "RUT es válido")
    else
      instance.publishState('resultadoText', "Error: RUT no es válido")
        
    } 
    else
    {
     instance.publishState('valido', "")
	 instance.publishState('resultadoText',"")
    }
   
}