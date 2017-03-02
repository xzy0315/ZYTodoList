var express = require('express');
var router = express.Router();
var todoModel = require('../model/index');

router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.route('/todos')
.get(function(req, res, next) {

    todoModel.find({},function(err,todos){
        if(err){
            res.send({code:0,msg:'查询错误'});
        }else{
            res.send(todos);
        }
    });

})
.post(function(req, res, next) {
    todoModel.create(req.body,function(err,todo){
        if(err){
            res.send({code:0,msg:'添加错误'});
        }else{
            res.send(todo);
        }
    });

})

router.route("/todos/delete/:_id").delete(function(req, res, next) {
    todoModel.remove({_id:req.params._id},function(err,result){
        if(err){
            res.send({code:0,msg:'删除错误'});
        }else{
            res.send({code:1,msg:'删除成功'});
        }
    });

});

router.route("/todos/batchDelete").post(function(req, res, next) {
    console.log(req.body);
    todoModel.remove({_id:{$in:req.body}},function(err,result){
        if(err){
            res.send({code:0,msg:'批量删除错误'});
        }else{
            res.send({code:1,msg:'批量删除成功'});
        }
    });

});

module.exports = router;
