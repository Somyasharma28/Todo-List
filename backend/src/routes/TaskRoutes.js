const router = require('express').Router();
const TaskModel = require('../model/TaskModel');
const UserModel = require('../model/UserModel');


const isNullOrUndefined = (val) => val === null || val === undefined;

//MiddleWare
const AuthMiddleWare = async (req, res, next) => {

    if (isNullOrUndefined(req.session) || isNullOrUndefined(req.session.userId) ) {
        res.status(401).send({ err: "Not logged in" });
      } else {
        next();
      }
}

//Get all task for a user
router.get("/", AuthMiddleWare, async (req, res) => {

    await TaskModel.find({ userId: req.session.userId })
        .then((result) => {
            //result.sort((a, b) => new Date(a['updatedAt']) < new Date(b['updatedAt']));
            //const tasks = result.map(val => val.description)
            res.status(200).send(result);
        })
        .catch(err => res.status(400).send({
            err: "Error Occurred",
        }));

});

//Add task for a user
router.post("/add", AuthMiddleWare, async (req, res) => {

    const { description } = req.body;
    if (isNullOrUndefined(description)) {
        res.status(400).send({ err: "Please enter correct data" });
    } else {
        const verifyTask = await TaskModel.findOne({ userId: req.session.userId, description });
        if (!isNullOrUndefined(verifyTask)) {
            res.status(400).send({ err: "Task is already present" });
        }
        else {
            const newTask = new TaskModel({ description, userId: req.session.userId });
            await newTask.save()
                .then((r) => res.status(200).send({ success: r}))
                .catch((err) => res.status(400).send({ err: "Error in saving data" }));
        }
    }
});

//Delete a task
router.delete('/delete/:taskId', AuthMiddleWare, async (req, res) => {
    const taskId = req.params.taskId;
    if (isNullOrUndefined(taskId)) {
        res.status(400).send({ err: "Error in deleting data" });
    } else {
        await TaskModel.deleteOne({ _id: taskId, userId: req.session.userId })
            .then((r) => res.status(200).send({ success: true }))
            .catch((err) => res.status(400).send({ err: "Error in deleting data" }));
    }
});

//edit a task
router.put('/update/:taskId', AuthMiddleWare, async (req, res) => {
    const taskId = req.params.taskId;
    const { description } = req.body;
    if (isNullOrUndefined(taskId)) {
        res.status(400).send({ err: "Error in updating data" });
    } else {
        await TaskModel.updateOne({ _id: taskId, userId: req.session.userId }, { description })
            .then((r) => res.status(200).send({ success: true }))
            .catch((err) => res.status(400).send({ err: "Error in updating data" }));
    }
});

module.exports = router;