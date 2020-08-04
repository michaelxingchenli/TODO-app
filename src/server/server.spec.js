import { addNewTask, updateTask} from './server'
/*
addNewTask({
  name: 'test my task',
  id: '12345'
})

*/

(async function myFunc() {
  await addNewTask({
    name: 'test my task 2',
    id: '123456'
  });
  await updateTask({
    id: '123456',
    name: "My task - updated"
  });
})();