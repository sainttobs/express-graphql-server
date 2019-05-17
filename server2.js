const express = require('express');
const express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');

// GraphQL Schema
var schema = buildSchema(`
	type Query {
		course(id: Int!): Course
		courses(topic: String): [Course]
	}
	type Mutation {
		updateCourseTopic(id: Int!, topic: String!) : Course
	}
	type Course {
		id: Int
		title: String
		author: String
		description: String
		topic: String
		url: String
	}
`);

var coursesData = [
	{
		id: 0,
		title: 'JavaScript30',
		author: 'WesBos',
		description: 'A 30 day vanilla JavaScript course',
		topic: 'JavaScript',
		url: 'https://javascript30.com'
	},
	{
		id: 1,
		title: 'Nodejs Shopping Cart',
		author: 'Academind',
		description: 'Building a shopping cart with Nodejs, MongoDb and Express',
		topic: 'Nodejs',
		url: 'https://youtube.com'
	},
	{
		id: 2,
		title: 'JavaScript Grammer',
		author: 'js_tut',
		description: 'A book on JavaScript Grammer',
		topic: 'JavaScript',
		url: 'https://twitter.com/js_tut'
	}
]

var getCourse = function(args){
	var id = args.id;
	return coursesData.filter(course => {
		return course.id == id;
	})[0];
}

var getCourses =function(args) {
	if (args.topic) {
		var topic = args.topic;
		return coursesData.filter(course => course.topic === topic);
	} else {
		return coursesData
	}
}

var updateCourseTopic = function({id, topic}){
	coursesData.map(course => {
		if (course.id === id) {
			course.topic = topic;
			return course;
		}
	});
	return coursesData.filter(course => course.id === id)[0];
}

var root = {
	course: getCourse,
	courses: getCourses,
	updateCourseTopic : updateCourseTopic
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
	schema : schema,
	rootValue: root,
	graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running on localhost:4000/graphql'));