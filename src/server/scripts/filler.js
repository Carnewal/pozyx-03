require('babel-register')();
require('babel-polyfill');


var model = require('../src/model')

model.sequelize.sync().then(function(){
 model.Map.destroy({where: {}}).then(function () {})
 model.Map.create({
    name: "Demo Map",
    url: "someurltomapimage",
    x: 80,
    y: 80,
    z: 2,
    anchors: [
      {name:"Alpha",
      hardwareVersion: 12,
      firmwareVersion: 11,
      x: 40,
      y: 40,
      z: 2},
      {name:"Beta",
      hardwareVersion: 12,
      firmwareVersion: 11,
      x: 20,
      y: 20,
      z: 2},
      {name:"Gamma",
      hardwareVersion: 12,
      firmwareVersion: 11,
      x: 40,
      y: 20,
      z: 2},
      {name:"Delta",
      hardwareVersion: 12,
      firmwareVersion: 11,
      x: 20,
      y: 40,
      z: 2}
    ],
  tags: [
    {
    name:"Maximus",
    hardwareVersion: 12,
    firmwareVersion: 11,
    battery: 0.5,
    updateRate: 1.2,
    iconNumber: 1,
    iconColor: "ff0000",
    labels: [{
      name:"cart"}],
    positions:[
      {x: 40, y: 40, z: 2, timestamp: new Date(2017, 3, 13).toJSON()},
      {x: 44, y: 35, z: 2, timestamp: new Date(2017, 3, 12).toJSON()},
      {x: 48, y: 30, z: 2, timestamp: new Date(2017, 3, 11).toJSON()},
      {x: 52, y: 25, z: 2, timestamp: new Date(2017, 3, 10).toJSON()},
      {x: 56, y: 20, z: 2, timestamp: new Date(2017, 3, 9).toJSON()},
      {x: 60, y: 15, z: 2, timestamp: new Date(2017, 3, 8).toJSON()}
    ]
    }
    ,{
    name:"Julius",
    hardwareVersion: 12,
    firmwareVersion: 11,
    battery: 0.5,
    updateRate: 1.2,
    iconNumber: 1,
    iconColor: "ff0000",
    labels: [{
      name:"cart"}],
    positions:[{
      x: 40,
      y: 40,
      z: 2}]
    },{
    name:"Claudius",
    hardwareVersion: 12,
    firmwareVersion: 11,
    battery: 0.5,
    updateRate: 1.2,
    iconNumber: 1,
    iconColor: "33cc33",
    labels: [{
      name:"Warehouse"}],
    positions:[{
      x: 40,
      y: 40,
      z: 2}]
    },{
    name:"Vinius",
    hardwareVersion: 12,
    firmwareVersion: 11,
    battery: 0.5,
    updateRate: 1.2,
    iconNumber: 1,
    iconColor: "0066ff",
    labels: [{
      name:"cart"},{
      name:"Warehouse"}],
    positions:[{
      x: 40,
      y: 40,
      z: 2}]
    }

]}
, {
  include: [{
    model : model.Anchor,
    as : "anchors"
  },{
    model : model.Tag,
    as : "tags",
    include: [{
  model : model.Label,
  as : "labels"
},{
  model : model.Position,
  as : "positions"
}]
  }]
})

})
model.sequelize.sync().then(function(){
model.Map.create({
   name: "Demo Map 2",
   url: "someurltomapimage",
   x: 225,
   y: 150,
   z: 2,
   anchors: [
     {name:"Alpha",
     hardwareVersion: 12,
     firmwareVersion: 11,
     x: 225,
     y: 110,
     z: 2},
     {name:"Beta",
     hardwareVersion: 12,
     firmwareVersion: 11,
     x: 225,
     y: 30,
     z: 2},
     {name:"Gamma",
     hardwareVersion: 12,
     firmwareVersion: 11,
     x: 40,
     y: 110,
     z: 2},
     {name:"Delta",
     hardwareVersion: 12,
     firmwareVersion: 11,
     x: 40,
     y: 30,
     z: 2}
   ],
 tags: [
   {
   name:"Maximus",
   hardwareVersion: 12,
   firmwareVersion: 11,
   battery: 0.5,
   updateRate: 1.2,
   iconNumber: 1,
   iconColor: "ff0000",
   labels: [{
     name:"student"}],
   positions:[{
     x: 60,
     y: 40,
     z: 2}]
   }
   ,{
   name:"Julius",
   hardwareVersion: 12,
   firmwareVersion: 11,
   battery: 0.5,
   updateRate: 1.2,
   iconNumber: 1,
   iconColor: "ff0000",
   labels: [{
     name:"student"}],
   positions:[{
     x: 70,
     y: 90,
     z: 2}]
   },{
   name:"Claudius",
   hardwareVersion: 12,
   firmwareVersion: 11,
   battery: 0.5,
   updateRate: 1.2,
   iconNumber: 1,
   iconColor: "33cc33",
   labels: [{
     name:"teacher"}],
   positions:[{
     x: 67,
     y: 45,
     z: 2}]
   },{
   name:"Vinius",
   hardwareVersion: 12,
   firmwareVersion: 11,
   battery: 0.5,
   updateRate: 1.2,
   iconNumber: 1,
   iconColor: "0066ff",
   labels: [{
     name:"teacher"},{
     name:"assistent"}],
   positions:[{
     x: 115,
     y: 100,
     z: 2}]
   }

]}
, {
 include: [{
   model : model.Anchor,
   as : "anchors"
 },{
   model : model.Tag,
   as : "tags",
   include: [{
 model : model.Label,
 as : "labels"
},{
 model : model.Position,
 as : "positions"
}]
 }]
})
})
