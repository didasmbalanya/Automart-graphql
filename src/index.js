/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import graphqlHTTP from 'express-graphql';
import graphqlSchema from './graphql/schema';
import graphqlResolver from './graphql/resolvers';
import { auth } from './middleware/auth';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(auth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const { data, code } = err.originalError;
      const { message } = err || 'An error occured';
      return { data, message, status: code || 500 };
    },
  }),
);

// eslint-disable-next-line no-console
app.listen(PORT, console.log('listening on port ', PORT));

export default app;
