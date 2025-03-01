'use strict'
const pool = require("../utils/pg"); 
const { promisify } = require('util');
const redis = require('../utils/redis')
const setAsync = promisify(redis.set).bind(redis);
const getAsync = promisify(redis.get).bind(redis);
const delAsync = promisify(redis.del).bind(redis);
const {redisConfig } = require('../config')


const findClientByApiKey = async (apiKey) => {
  try {
    let rediskey = `assigment:findClientByApiKey_${apiKey}`;
    const redisData = await getAsync(rediskey);
    if(redisData) return JSON.parse(redisData);
    const result = await pool.query(
      "SELECT * FROM client_auth WHERE api_key = crypt($1, api_key)",
      [apiKey]
    );
    if(result.rows[0]){
        await setAsync(rediskey, JSON.stringify(result.rows[0]),'PX',redisConfig.redisExpTime);
    }
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error verifying API key:", error);
    throw error
  }
};
const pgInsert = async (query, params = [], redis_key=null) => {
    try{
        if(redis_key){
            await delAsync(redis_key);
        }
        let result = await pool.query(query, params);
        return {success: true, rows: result?.rowCount};
    } catch(err){
        if(err.message) throw err;
        throw {message: 'ERROR_IN_PG_INSERT', method: 'model.pgInsert', query, params, err}
    }
}
const pgUpdate = async (query, params= [], redis_key) => {
    try{
        if(redis_key){
            await delAsync(redis_key);
        }
        let result = await pool.query(query, params);
        return {success: true, rows: result?.rowCount}; 

    } catch(err){
        if(err.message) throw err;
        throw {message: 'ERROR_IN_PG_UPDATE', method: 'model.pgUpdate', query, params, err};   
     }
}

const pgGetOneRow = async (query, params= [], redis_key=null) => {
    try{
        if(redis_key){
            const redisData = await getAsync(redis_key);
            if(redisData) return JSON.parse(redisData);
        }
        let result = await pool.query(query, params);
        if (result && result.rows && result.rows.length) {
            if(redis_key){
                await setAsync(redis_key,JSON.stringify(result.rows[0]),'PX',redisConfig.redisExpTime,);

            }
            return result.rows[0];
          }
          return null;

    } catch(err){
        if(err.message) throw err;
        throw {message: 'ERROR_IN_PG_GET_ONE_ROW', method: 'model.pgGetOneRow', query, params, err};   
    }

}

const pgGetArrayOfRow = async(query, params = [], redis_key=null) => {
    try{
        if(redis_key){
            const redisData = await getAsync(redis_key);
            if(redisData) return JSON.parse(redisData);
        }
        let result = await pgPool.query(query, params);
        if (result && result.rows && result.rows.length) {
            await setAsync(
              redis_key,
              JSON.stringify(result.rows),
              'PX',
              redisConfig.redisExpTime,
            );
            return result.rows;
          }
          return [];
    } catch(err){
        if(err.message) throw err;
        throw {message: 'ERROR_IN_PG_GET_ARRAY_OF_ROW', method: 'model.pgGetArrayOfRow', query, params, err};   
    }

}



module.exports = { findClientByApiKey, pgInsert, pgUpdate, pgGetOneRow, pgGetArrayOfRow };
