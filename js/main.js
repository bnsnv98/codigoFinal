$( document ).ready( function(){

  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  mouse.x = 1000000000000000000;
  mouse.y = -100000000000000000;

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  $( "body" ).append( renderer.domElement );

  scene.add( camera );
  camera.position.z = 0;

  let light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 0, camera.position.z );
  scene.add( light );

  let rotation = 20;
  let rotationInterval = 360/rotation;

  let contenedorCirculos = new THREE.Object3D();
  scene.add( contenedorCirculos );

  for( let i = 0; i < 360; i+=rotationInterval ){
    let circulo = new THREE.Object3D();
    circulo.rotation.y += toRadians(i);
    contenedorCirculos.add( circulo );
  }



  let num = 10;
  let interval = 360/num;
  let radius = 3;
  let contador = 0;

  for( let j = 0; j < contenedorCirculos.children.length; j++ ){
    for( let i = 0; i < num; i++ ){
      let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
      let material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF} );
      let nodo = new THREE.Mesh( geometry, material );
      nodo.position.x = radius;
      nodo.position.y = -(num/2) + i;
      //console.log(toRadians( i ) );
      contenedorCirculos.children[ j ].add( nodo );
    }
  }

  function animate(){
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    contenedorCirculos.rotation.y += 0.003;

     raycaster.setFromCamera( mouse, camera );

	   // calculate objects intersecting the picking ray

	   let intersects = raycaster.intersectObjects( contenedorCirculos.children, true );

     if(intersects){
  	   for ( var i = 0; i < intersects.length; i++ ) {
  		     intersects[ i ].object.material.color.set( 0x00FF00 );
           if( intersects[ i ].object.seleccionado === null || intersects[ i ].object.seleccionado === undefined || intersects[ i ].object.seleccionado === false  ){
             contador++;
             intersects[ i ].object.seleccionado = true;
             console.log( contador );
           }
  	   }
     }

     if(contador<20){
       myFunction();
     }


     if(contador==20){
       alert("Ganaste!!")
       for( let j = 0; j < contenedorCirculos.children.length; j++ ){
         for( let i = 0; i < num; i++ ){
           let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
           let material = new THREE.MeshLambertMaterial({ color: 0x00FF00} );
           let nodo = new THREE.Mesh( geometry, material );
           nodo.position.x = radius;
           nodo.position.y = -(num/2) + i;
           //console.log(toRadians( i ) );
           contenedorCirculos.children[ j ].add( nodo );
         }
       }
     }
  }
  animate();

  function toRadians(degrees){
    var pi = Math.PI;
    return degrees * (pi/180);
  }

  function myFunction() {
    myVar = setTimeout(alertFunc, 25000);
  }

  function alertFunc() {
    alert("Perdiste!!")
    for( let j = 0; j < contenedorCirculos.children.length; j++ ){
      for( let i = 0; i < num; i++ ){
        let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        let material = new THREE.MeshLambertMaterial({ color: 0xFF0000} );
        let nodo = new THREE.Mesh( geometry, material );
        nodo.position.x = radius;
        nodo.position.y = -(num/2) + i;
        //console.log(toRadians( i ) );
        contenedorCirculos.children[ j ].add( nodo );
      }
    }
  }

  $( document ).on( 'mousemove', function( e ){
     mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	   mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    // console.log(mouse.x + "," + mouse.y);
     //camera.lookAt(0, 0, 0 );
  });
});//document ready
