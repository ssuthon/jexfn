var data = [
    {title: 'A', vx: 3, vy: 8, br: true },
    {title: 'B', vx: 5, vy: 7, br: true },
    {title: 'C', vx: 1, vy: 3, br: false },
    {title: 'D', vx: 2, vy: 8, br: false },
    {title: 'E', vx: 3, vy: 1, br: true }
];

//in case of br, value = vx + 2* vy
//otherwise, value = vx + vy

var b = new XData(data[0]);
console.log(b.getValue());
b.calculate();
console.log(b.getValue());