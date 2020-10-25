//where we write our knex queries
// const knex =require('knex')
// const config= require('../knexfile')
// const db = knex(config.development)
const db= require('../dbConfig');
const knexfile = require('../knexfile');

module.exports={
    add,
    find,
    findById,
    remove,
    update,
    addMessage,
    findMessageById,
    findLessonMessages,
    removeMessage,
    updateMessage,
    addUser,
    findAllUsers,
    findUserByUsername
}

async function addUser(user){
    return await db('users')
    .insert(user,['id','username'])
}

function findAllUsers(){
    return db('users')
}

function findUserByUsername(username){
    return db('users')
    .where({username})
    .first()
}


async function add(lesson){
//下方注释掉的语法适用于sqlite而不适用于postgres的规范,addMessage方法中也是同理
//    const [id] = await db('lessons').insert(lesson)
//    return findById(id)

return await db('lessons').insert(lesson,['id','name'])
}


function find(){
    return db('lessons')
}

function findById(id){
    return db('lessons')
    .where({id:id})
    .first()
}

function remove(id){
    return db('lessons')
    .where({id})
    .del();
}

function update(id,changes){
    return db('lessons')
    .where({id})
    .update(changes)
    .then(()=>{
        return findById(id)
    })
    
}

function findMessageById(id){
    return db('messages')
    .where({id})
    .first()
}

async function addMessage(message,lesson_id){
    // const [id] = await db('messages')
    // .where({lesson_id})
    // .insert(message)
    // return findMessageById(id)
    return await db('messages')
    .where({lesson_id})
    .insert(message,['id'])
 }

 function findLessonMessages(lesson_id){
     return db('lessons as l')
     .join("messages as m","l.id","m.lesson_id")
     .select(
         "l.id as lessonID",
         "l.name as lessonName",
         "m.id as MessageID",
         "m.sender",
         "m.text"
     )
     .where({lesson_id})
      
 }

function removeMessage(id){
  return db('messages')
  .where({id})
  .del()
}


function updateMessage(id,changes){
    return db('messages')
    .where({id})
    .update(changes)
    .then(()=>{
        findMessageById(id)
    })
}