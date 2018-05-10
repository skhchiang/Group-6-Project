// const fs= require ('fs');
// const jsonReadableStream = require('read-json-file');
// const pg = require('pg');

// const config = {

//     user: 'luk',
//     database: 'project2',
//     password: '12345678',
//     host: 'localhost',
//     port: 5432,
//     max: 10, 
//     idleTimeoutMillis: 30000,

// }

// const client = new pg.Client(config);
// const inputStream = fs.createReadStream('cityList.json','utf-8');

// async function run(){
//     await client.connect();

//     let rows = [];

//     inputStream
//         .pipe(jsonReadableStream({parsedNumbers:true,parseBooleans:true,trim:true}))
//         .on('data',async (row)=>{
//             rows.push(row);
//             console.log(rows);
//         })
//         .on('end',async (data)=>{
//             knex.transaction(async (trx)=>{
//                 for(let row of rows){      
//                         await trx('city')
//                                 .whereIn('citrus_id',function(){
//                                             return this.select('id')
//                                                     .from('citrus')
//                                                     .where('name','=',name);
//                                 })
//                                 .increment('quantity',quantity);
                    
//                         await trx('stock')
//                                 .whereIn('citrus_id',function(){
//                                             return this.select('id')
//                                                     .from('citrus')
//                                                     .where('name','=',name);
//                                 })
//                                 .decrement('quantity',quantity);
//                             }
            
//                 let knexResult = await knex.select('*').from('stock')
//                                     .innerJoin('citrus','stock.citrus_id','citrus.id');
//                 console.log(knexResult);

//                 let trxResult = await trx.select('*').from('stock')
//                                     .innerJoin('citrus','stock.citrus_id','citrus.id');
//                 console.log(trxResult);
//             });          
//        });
// }


// run();
