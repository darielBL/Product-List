// Crear el módulo de AngularJS
var app = angular.module('Store', []);

// Controlador para manejar la lógica
app.controller('productCtrl', function ($scope, $http) {
  $scope.carrito = [];

  $scope.orderConfirmed = false;

  // Función para cargar los productos desde data.json
  $scope.cargarProductos = function () {
    $http.get('data.json').then(function (response) {
      $scope.products = response.data;
    }, function (error) {
      console.error('Error al cargar los productos:', error);
    });
  };

  // Función para agregar un producto al carrito
  $scope.agregarAlCarrito = function (producto) {
    // Verificar si el producto ya está en el carrito
    var encontrado = $scope.carrito.find(item => item.name === producto.name);
    if (encontrado) {
      // Si ya está, aumentar la cantidad
      encontrado.cantidad++;
    } else {
      // Si no está, agregarlo al carrito con cantidad 1
      $scope.carrito.push({
        name: producto.name,
        price: producto.price,
        category: producto.category,
        image: producto.image.thumbnail,
        cantidad: 1 // Inicializar la cantidad en 1
      });
    }
  };

  // Función para eliminar un producto del carrito
  $scope.eliminarDelCarrito = function (producto) {
    const index = $scope.carrito.findIndex(item => item.name === producto.name);
    if (index !== -1) {
      $scope.carrito.splice(index, 1);
    }
  };

  // Función para disminuir un producto del carrito
  $scope.disminuirDelCarrito = function (producto) {
    var encontrado = $scope.carrito.find(item => item.name === producto.name);
    if (encontrado) {
      if (encontrado.cantidad > 1) {
        encontrado.cantidad--; // Reducir la cantidad en 1
      } else {
        // Si la cantidad es 1, eliminar el producto del carrito
        const index = $scope.carrito.indexOf(encontrado);
        if (index !== -1) {
          $scope.carrito.splice(index, 1);
        }
      }
    }
  };

  // Función para calcular la cantidad total de productos
  $scope.cantidadTotal = function () {
    return $scope.carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  // Función para calcular el precio total del carrito
  $scope.precioTotal = function () {
    return $scope.carrito.reduce((total, item) => total + (item.price * item.cantidad), 0);
  };

  // Función para obtener la cantidad de un producto en el carrito
  $scope.cantidadEnCarrito = function (producto) {
    var encontrado = $scope.carrito.find(item => item.name === producto.name);
    return encontrado ? encontrado.cantidad : 0; // Devuelve la cantidad o 0 si no está en el carrito
  };

  $scope.confirmarOrder = function () {
    $scope.orderConfirmed = true;
  }

  $scope.starNewOrder = function () {
    $scope.orderConfirmed = false;
    $scope.carrito = [];
  }

  // Cargar los productos al cargar la página
  $scope.cargarProductos();
});

