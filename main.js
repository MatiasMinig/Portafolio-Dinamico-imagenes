
const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    // Agregue los listener de los enlaces para filtrar por categoria.
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
       elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
       });
    });

    // Agrego el listener para la barra de busqueda.
    document.querySelector('#barra-busqueda').addEventListener('input',(evento) => {
        const busqueda = evento.target.value;
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    });
    // Agrego listener para las imagenes.
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });
    // Event listener del boton cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click' , () => {
        overlay.classList.remove('activo');
    });
    /*Eventlistener del overlay Me sirve para que la img se cierra ademas de la X*/
    overlay.addEventListener('click', (evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    }); 
});
