import { connectDB } from './connect-db'

export const addNewTask = async task=>{
  let db = await connectDB();
  let collection = db.collection('tasks');
  await collection.insertOne(task);
}

export const addNewComment = async comment => {
  let db = await connectDB();
  let collection = db.collection('comments');
  await collection.insertOne(comment);
}

export const updateTask = async task => {
  let { id, group, isComplete, name } = task;
  let db = await connectDB();
  let collection = db.collection('tasks');
  if (group) {
    await collection.updateOne(
      {id}, {$set: {group}}
    );
  }
  if (name) {
    await collection.updateOne({id}, {$set: {name}});
  }
  if (isComplete !== undefined) {
    await collection.updateOne({id}, {$set: {isComplete}});
  }
}

export const assembleUserState = async user => {
  let db = await connectDB();

  let tasks = await db.collection(`tasks`).find({owner:user.id}).toArray();
  let groups = await db.collection(`groups`).find({owner:user.id}).toArray();
  let comments = await db.collection(`comments`).find({task:{$in:tasks.map(task=>task.id)}}).toArray();
  let users = [
    await db.collection(`users`).findOne({id:user.id}),
    ...await db.collection(`users`).find({id:{$in:[...tasks,comments].map(x=>x.owner)}}).toArray()
];

  return {
    session: {authenticated:`AUTHENTICATED`, id: user.id},
    tasks,
    groups,
    comments,
    users
  }
}