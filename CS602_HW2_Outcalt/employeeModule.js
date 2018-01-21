var _ = require('underscore');

var data = [
  {id:1, firstName:'John', lastName:'Smith'},
  {id:2, firstName:'Jane', lastName:'Smith'},
  {id:3, firstName:'John', lastName:'Doe'}
];

//TODO return copies instead of the data object

module.exports = {
  lookupById: function(idInput) {
       var foundEmployee =  _.findWhere(data, {id:idInput});
       if (_.isEmpty(foundEmployee)) {    //using underscores empty test to determine undefined
         return undefined;
       } else {
          return foundEmployee;
       }
  },
  lookupByLastName: function(lastNameInput) {
    var matchedArray = _.where(data, {lastName:lastNameInput});
    if (matchedArray.length == 0 || typeof matchedArray === "undefined") {    //array is empty if length is 0
      console.log("returning empty array");
      return [];
    } else {
      return matchedArray;
    }
  },
  addEmployee: function(firstNameInput, lastNameInput) {
    var idsFromDataArray = _.pluck(data, 'id');   //get all ids
    var newId = _.max(idsFromDataArray) + 1;      //return max of the id array then increment
    data.push({id:newId, firstName:firstNameInput, lastName:lastNameInput})
  },
};
