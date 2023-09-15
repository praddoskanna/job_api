require("dotenv").config();
const express = require('express');
const { join } = require("path");
// const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Resolvers 
const { mergeResolvers } = require("@graphql-tools/merge");
const resolvers_User = require("./resolvers/user");
const resolvers_General = require("./resolvers/general");
const resolvers_Category = require("./resolvers/category");
const resolvers_SubCategory = require("./resolvers/subcategory");
const resolvers_SkillSet = require("./resolvers/skillset");
// TypeDefs
const typeDefs_User = require("./typedefs/user");
const typeDefs_General = require("./typedefs/general");
const typeDefs_Category = require("./typedefs/category");
const typeDefs_SubCategory = require("./typedefs/subcategory");
const typeDefs_SkillSet = require("./typedefs/skillset");
const typeDefs_JOB = require("./typedefs/job");
const resolvers_JOB = require("./resolvers/job");

mongoose.connect(
    `${process.env.MONGO_URL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_PATH}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });


const typeDefs_base = gql`
  type Query
  type Mutation
`;

const typeDefs = [
    typeDefs_base,
    typeDefs_General,
    typeDefs_User,
    typeDefs_Category,
    typeDefs_SubCategory,
    typeDefs_SkillSet,
    typeDefs_JOB
];

const resolvers = mergeResolvers([
    resolvers_General,
    resolvers_User,
    resolvers_Category,
    resolvers_SubCategory,
    resolvers_SkillSet,
    resolvers_JOB
]);

async function startServer() {

    const app = express();

    app.use(graphqlUploadExpress({ maxFileSize: 100000000 }));
    app.use(express.static(join(__dirname, "./uploads")));
    app.use(express.static(join(__dirname, "./admin")));

    app.use(bodyParser.json({ limit: "50mb" }));

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const user = req.user || null;
            return { user };
        },
    })
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app });

    app.get('/admin', (req, res) => {
        res.sendFile(join(__dirname, './admin', 'admin.html'));
    });

    app.listen(4000);

}

startServer().then(() => {
    console.log(`Server started at http://localhost:4000/graphql`);
});

