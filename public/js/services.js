'use strict';

var app = angular.module('PetApp');

app.service('PetService', function($http) {

  this.getAll = function() {
    return $http.get('/pets');
  };

  this.create = function(appointment) {
    return $http.post('/pets', appointment);
  };

  this.update = function(appointmentId, updateObj) {
    return $http.put(`/pets/${petId}`, updateObj);
  };

  this.toggleAdopted = function(petId) {
    return $http.put(`/pets/${petId}/adopted`);
  };

  this.addClient = function(petId, clientId) {
    return $http.put(`/pets/${petId}/addClients/`, { clientIds: clientIds });
  };

});
