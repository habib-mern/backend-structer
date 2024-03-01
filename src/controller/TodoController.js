const TodoModel = require('../models/TodoModel')


//Create ToDo Start
exports.CreateTodo = async (req, res) => {
    try {
        const reqBody = req.body;
        reqBody.email = req.headers.email
        const todo = await TodoModel.create(reqBody);
        res
            .status(201)
            .json({status: "sucess", data: todo})

    } catch (error) {
        res
            .status(400)
            .json({status: "fail", message: error.message})
    }
}
//Create ToDo End

//Update ToDo Start
exports.UpdateTodoStatus = async(req,res)=>{
    try{
        let id = req.params.id
        let status = req.params.status
        let query = {_id: id}
        const todo = await TodoModel.updateOne(query, {status: status})
        res.status(201).json({status: "sucess", data: todo})
    }
    catch(error){
        res.status(400).json({status: "fail", message: error.message})
    }
} 
//Update ToDo End

//Delete ToDo Start
exports.DeleteTodo = async(req,res)=>{
    try{
        let id = req.params.id
        let query = {_id: id}
        const todo = await TodoModel.deleteOne(query)
        res.status(201).json({status: "sucess", data: todo})
    }
    catch(error){
        res.status(400).json({status: "fail", message: error.message})
    }
} 
//Delete ToDo End