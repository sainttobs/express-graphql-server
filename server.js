const express = require('express');
const express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');

// GraphQL Schema
var schema = buildSchema(`
	type Query {
		message: String
	}
`);

var root = {
	message: () => 'Hello World';
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
	schema : schema,
	rootValue: root,
	graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running on localhost:4000/graphql'));