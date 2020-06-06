$(document).ready(function (){
  //Consulta de todos los productos registrados
consultaProductos();    
function consultaProductos(){
    var table=$('#tbProductos').DataTable( {
        "language":
                {
                    "url": "http://localhost/appAbarrotesTrebol/Spanish.json"
                },
        "ajax": {
        "url": "http://localhost/ServiceTREBOL/controller/productos_db_controller.php",
        "dataSrc": ""
        },
          "columns": [
            {
                "className":      'opciones',
                "orderable":      false,
                "data":           null,
                "defaultContent": '<div  class="btn-group btn-group-sm btn-group-justified">'+
                '<a type="button" class="btn btn-sm btn-warning editarProd"><i class="fas fa-edit"></i></a>'+                
                '<a type="button" class="btn btn-sm btn-danger borrarProd"><i class="fas fa-trash"></i></a>'+
                '</div>'
            },   
           { "data": "idProductos" },//el nombre de los campos deben ser escritos como estan definidos en la Base de Datos.
           { "data": "CodBarras" },
           { "data": "NomProducto" },
           { "data": "PrecioMayoreo" },
           { "data": "PrecioVenta" },
           { "data": "Existencia" },
           { "data": "Medida" },
           { "data": "Status" },
           { "data": "Observaciones" },
           { "data": "FechaModif" },
           { "data": "idPYME" },
           { "data": "idClasificacion" },
           { "data": "idProveedores" }
           ],
           "order": [[1, 'asc']]
      });
//Habilitar formulario guardar y desactivar los botónes 
$("#habilitarformGuardar").click(function(){
    $("#habilitarformGuardar").prop('disabled', true);
    $("#cancelar").prop('disabled', false);
    $("#actualizarProducto").prop('disabled', true);
    $("#guardarProducto").prop('disabled', false);    
});

//Guardar un nuevo producto
$("#guardarProducto").on("click",function(event){
    var CodBarras=$("#CodBarras").val();
    var NomProducto=$("#NomProducto").val();
    var PrecioMayoreo=$("#PrecioMayoreo").val();
    var PrecioVenta=$("#PrecioVenta").val();
    var Existencia=$("#Existencia").val();
    var Medida=$("#Medida").val();
    var Status=$("#Status").val();
    var Observaciones=$("#Observaciones").val();
    var FechaModif=$("#FechaModif").val();
    var idPYME=$("#idPYME").val();
    var idClasificacion=$("#idClasificacion").val();
    var idProveedores=$("#idProveedores").val();
    if(CodBarras==""|| NomProducto==""|| PrecioMayoreo==""|| PrecioVenta==""|| Existencia==""|| Medida==""|| Status==""|| 
    	Observaciones==""|| FechaModif==""|| idPYME==""|| idClasificacion==""|| idProveedores==""){
        alert("Favor de llenar todos los campos del formulario");
    }else{
    event.preventDefault();  
    $.ajax({
        type:"POST",
        url: "http://localhost/ServiceTREBOL/controller/productos_db_controller.php",
        data:{
            CodBarras:CodBarras,
            NomProducto:NomProducto,                        
            PrecioMayoreo:PrecioMayoreo,                        
            PrecioVenta:PrecioVenta,                        
            Existencia:Existencia,                        
            Medida:Medida,                        
            Status:Status,                        
            Observaciones:Observaciones,                        
            FechaModif:FechaModif,                        
            idPYME:idPYME,                        
            idClasificacion:idClasificacion,                        
            idProveedores:idProveedores                        
        },
        success: function(msg){  
            alert(msg);          
            table.ajax.reload(null,false);  
            $("#habilitarformGuardar").prop('disabled', false);
            $("#cancelar").prop('disabled', true);
            $("#actualizarProducto").prop('disabled', true);
            $("#guardarProducto").prop('disabled', true);  
            limpiarControlesForm();       
        }
    });  
    }
});      

//Seleccionar un registro y pasarlo al formulario
$(document).on("click",".editarProd", function(){
    var fila=$(this).closest("tr");
    var row = table.row( fila );
    var idProd=parseInt(fila.find('td:eq(1)').text());
    console.log(idProd);
    CargarDatForm(row.data(),"Mostrar"); 
    table.ajax.reload(null,false); 
    $("#habilitarformGuardar").prop('disabled', true);
    $("#cancelar").prop('disabled', false);
    $("#actualizarProducto").prop('disabled', false);
    $("#guardarProducto").prop('disabled', true);   
});

function CargarDatForm(row){
$("#idProductos").val(row.idProductos);
$("#CodBarras").val(row.CodBarras);
$("#NomProducto").val(row.NomProducto);
$("#PrecioMayoreo").val(row.PrecioMayoreo);
$("#PrecioVenta").val(row.PrecioVenta);
$("#Existencia").val(row.Existencia);
$("#Medida").val(row.Medida);
$("#Status").val(row.Status);
$("#Observaciones").val(row.Observaciones);
$("#idPYME").val(row.idPYME);
$("#idClasificacion").val(row.idClasificacion);
$("#idProveedores").val(row.idProveedores);
$("#FechaModif").val(row.FechaModif);
}

//Actualizar un producto
 $("#actualizarProducto").on("click",function(event){
    var idProductos=$("#idProductos").val();
    var CodBarras=$("#CodBarras").val();
    var NomProducto=$("#NomProducto").val();
    var PrecioMayoreo=$("#PrecioMayoreo").val();
    var PrecioVenta=$("#PrecioVenta").val();
    var Existencia=$("#Existencia").val();
    var Medida=$("#Medida").val();
    var Status=$("#Status").val();
    var Observaciones=$("#Observaciones").val();
    var FechaModif=$("#FechaModif").val();
    var idPYME=$("#idPYME").val();
    var idClasificacion=$("#idClasificacion").val();
    var idProveedores=$("#idProveedores").val();
    if(idProductos==""|| CodBarras==""|| NomProducto==""|| PrecioMayoreo==""|| PrecioVenta==""|| Existencia==""|| Medida==""|| 
    	Status==""|| Observaciones==""|| FechaModif==""|| idPYME==""|| idClasificacion==""|| idProveedores==""){
        alert("Favor de llenar todos los campos del formulario");
    }else{
        event.preventDefault();  
    $.ajax({
        type:"PUT",
        url: "http://localhost/ServiceTREBOL/controller/productos_db_controller.php",
        data:{
            idProductos:idProductos,
            CodBarras:CodBarras,
            NomProducto:NomProducto,                        
            PrecioMayoreo:PrecioMayoreo,                        
            PrecioVenta:PrecioVenta,                        
            Existencia:Existencia,                        
            Medida:Medida,                        
            Status:Status,                        
            Observaciones:Observaciones,                        
            FechaModif:FechaModif,                        
            idPYME:idPYME,                        
            idClasificacion:idClasificacion,                        
            idProveedores:idProveedores                        
        },
        success: function(msg){  
            alert(msg);          
            table.ajax.reload(null,false);   
            $("#habilitarformGuardar").prop('disabled', false);
            $("#cancelar").prop('disabled', true);
            $("#actualizarProducto").prop('disabled', true);
            $("#guardarProducto").prop('disabled', true);    
            limpiarControlesForm();      
        }
    });
    }
});    

//Cancelar opraciones de actualizacion y nuevos registros
$("#cancelar").on("click",function(event){
    limpiarControlesForm();
    event.preventDefault(); 
});

//Código para eliminar un registro
$(document).on("click",".borrarProd", function(){
    var fila=$(this).closest("tr");
    var idProd=parseInt(fila.find('td:eq(1)').text());
    
    $.ajax({
        type:"DELETE",
        url: "http://localhost/ServiceTREBOL/controller/productos_db_controller.php",
        data:{
            idProductos:idProd
        },
        success: function(msg){  
            alert(msg);          
            table.ajax.reload(null,false); 
            limpiarControlesForm();           
        }
    });
});

function limpiarControlesForm(){
    $("#idProductos").val();
    $("#CodBarras").val();
    $("#NomProducto").val();
    $("#PrecioMayoreo").val();
    $("#PrecioVenta").val();
    $("#Existencia").val();
    $("#Medida").val();
    $("#Status").val();
    $("#Observaciones").val();
    $("#idPYME").val();
    $("#idClasificacion").val();
    $("#idProveedores").val();
    $("#FechaModif").val();
    $("#cancelar").prop('disabled', true);
    $("#habilitarformGuardar").prop('disabled', false);
    $("#actualizarProducto").prop('disabled', true);
    $("#guardarProducto").prop('disabled', true);     
}

}

});    

