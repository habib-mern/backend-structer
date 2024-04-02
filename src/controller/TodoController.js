const TodoModel = require('../models/TodoModel')


//Create ToDo Start
exports.CreateTodo = async (req, res) => {
    try {
        const reqBody = req.body;
        reqBody.email = req.headers.email
        const todo = await TodoModel.create(reqBody);
        res
            .status(200)
            .json({status: "sucess", data: todo})

    } catch (error) {
        res
            .status(200)
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
        res.status(200).json({status: "sucess", data: todo})
    }
    catch(error){
        res.status(200).json({status: "fail", message: error.message})
    }
} 
//Update ToDo End

//Delete ToDo Start
exports.DeleteTodo = async(req,res)=>{
    try{
        let id = req.params.id
        let query = {_id: id}
        const todo = await TodoModel.deleteOne(query)
        res.status(200).json({status: "sucess", data: todo})
    }
    catch(error){
        res.status(200).json({status: "fail", message: error.message})
    }
} 
//Delete ToDo End

//todo list by status Start
exports.TodoListByStatus = async(req, res) =>{
    try{
        let status = req.params.status
        let email = req.headers.email

        const result = await TodoModel.aggregate(
            [
                {$match:{status:status,email:email}},
                {$project:{_id:1,title:1,description:1,status:1,createDate:{$dateToString:{format:"%d-%m-%Y", date:"$createDate"}}}}
            ]
        )

        res.status(200).json({status: "sucess", data: result})
    }
    catch(error){
        res.status(200).json({status: "fail", message: error.message})
    }
}
//todo list by status End

//todo count Start
exports.TodoCountByStatus = async(req,res)=>{
    try{
        let email = req.headers.email

        const result = await TodoModel.aggregate(
            [
                {$match:{email:email}},
                {$group:{_id:"$status",total:{$count:{}}}}
            ]
        )

        res.status(200).json({status: "sucess", data: result})
    }
    catch(error){
        res.status(200).json({status: "fail", message: error.message})
    }
}
//todo count End