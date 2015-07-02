//travel at light speed need power 1500 units + (1.1 * load)
var ship = new Ship('SpaceX', 1000);    //main energy tanks is 1000 units 
var cargos = [
    {title: 'A5588', load: 1000},
    {title: 'A1833', load: 300},
    {title: 'G5332', load: 200}
];
var energy_tanks = [
    {code: 'P11', energy: 500},
    {code: 'P50', energy: 800},
    {code: 'P65', energy: 300}
]
ship.loadCargos(cargos);
ship.loadEnergyTanks(energy_tanks);
ship.addBooster(1.1);       //boost all energy

console.log("======" + ship.title +"=========");
console.log("load = " + ship.currentLoad);
console.log("energy = " + ship.currentEnergy);

console.log("Travelling at ligh speed...");
if(ship.canTravelAtLighSpeed()){
    console.log('Yeah!');
}else{
    console.log('TT');
}
