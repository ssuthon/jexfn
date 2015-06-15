var students = [
	{name: 'John', scores: [8, 2, 3, 6, 7]},
	{name: 'Kent', scores: [5, 2, 3, 4, 4]},
	{name: 'Jane', scores: [4, 2, 3, 8, 7]},
	{name: 'Kate', scores: [1, 2, 4, 7]}
]

console.log(calTotalScore(students));
console.log(findTopStudent(students).name);