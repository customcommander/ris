const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const World = require('./world.js');

setWorldConstructor(World);
Before(World.init);
After(World.destroy);
