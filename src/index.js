import dotenv from 'dotenv';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import graphqlHTTP from 'express-graphql';
import graphqlSchema from './graphql/schema';
import graphqlResolver from './graphql/resolvers';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  }),
);

// eslint-disable-next-line no-console
app.listen(PORT, console.log('listening on port ', PORT));

export default app;
