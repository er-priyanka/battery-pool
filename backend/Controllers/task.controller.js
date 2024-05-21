const { Task } = require("../Models/task.model");


const TaskController = {
    async addTask(req, res){
        const { title, description, dueDate, status, image } = req.body;
        try {
          const newTask = new Task({
            title,
            description,
            dueDate,
            status,
            image,
            user: req.user.userID
          });
          const task = await newTask.save();
          res.json(task);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
        }
    },

    async getAllTasks(req, res){
        try {
            const tasks = await Task.find({ user: req.user.userID });
            res.json(tasks);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          } 
    },

    async getSingleTask(req, res){
        try {
            let task = await Task.findById(req.params.id);
            if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
            }
            if (task.user.toString() !== req.user.userID) {
            return res.status(401).json({ msg: 'User not authorized' });
            }
            
            res.json(task);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },

    async updateTask(req, res){
        const { title, description, dueDate, status, image } = req.body;
        const taskFields = { title, description, dueDate, status, image };
        try {
            let task = await Task.findById(req.params.id);
            if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
            }
            if (task.user.toString() !== req.user.userID) {
            return res.status(401).json({ msg: 'User not authorized' });
            }
            task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });
            res.json(task);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },

    async deleteTask(req, res){
        try {
            let task = await Task.findById(req.params.id);
            if (!task) {
              return res.status(404).json({ msg: 'Task not found' });
            }
            if (task.user.toString() !== req.user.userID) {
              return res.status(401).json({ msg: 'User not authorized' });
            }
            await Task.findByIdAndDelete(req.params.id);
            res.json({ msg: 'Task Deleted' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        } 
    }

};

module.exports = { TaskController };