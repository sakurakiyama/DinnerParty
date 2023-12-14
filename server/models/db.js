import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  // eslint-disable-next-line no-undef
  connectionString: process.env.PG_URI,
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

export default query;
