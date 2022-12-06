const Tought = require('../models/Tought')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ToughtController{

    static async showToughts(req,res){
        

        let search =''

        if(req.query.search){

            search = req.query.search
        }
         // order results, newest first
    let order = 'DESC'

    if (req.query.order === 'old') {
      order = 'ASC'
    } else {
      order = 'DESC'
    }
    

        const toughtsData = await Tought.findAll({
            include: User,
            where:{
                title : {[Op.like]:`%${search}%`}
            },
            
            order: [['createdAt', order]],

            
        })
        let toughtsQty = toughtsData.length

        if (toughtsQty === 0) {
          toughtsQty = false
        }
        const toughts = toughtsData.map((result) => result.get({plain: true}))
       

        res.render('toughts/home',{toughts,search,toughtsQty})
    }

    static async dashboard(req,res){

        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id : userId,
            },
            include:Tought,
            plain :true,
            
        })

        if(!user){
            res.redirect('/login')
        }

        const toughts = user.Toughts.map((result)=> result.dataValues)
        
        let emptyToughts = true

    if (toughts.length > 0) {
      emptyToughts = false
    }

        res.render('toughts/dashboard',{toughts,emptyToughts})

    }
    static createTought(req, res) {
        res.render('toughts/create')
      }

     static async createToughtSave(req,res){

        const tought = {
            title:req.body.title,
            UserId : req.session.userid         
        }

      await  Tought.create(tought)

        try {
            req.flash('message','Pensamento criado com sucesso!')

        

        req.session.save(() =>{
            res.redirect('/toughts/dashboard')
        })
        } catch (error) {
            console.log(error)
        }
     } 

     static  async removeTought(req,res){

        const id = req.body.id
        
       
        

        try {
        await Tought.destroy({where : {id:id }})
        req.flash('message','Pensamento removido com sucesso!')

        
        
        req.session.save(() =>{
            res.redirect('/toughts/dashboard')
        })
        } catch (error) {
            console.log(error)
        }

     }

     static async updateTought(req,res){

        const userid = req.params.id

        const tought = await Tought.findOne({where :{ id : userid},raw:true})

        res.render('toughts/edit',{tought})

     }

     static async updateToughtPost(req,res){

        const id = req.body.id

        const tought = {
            title:req.body.title,
            UserId : req.session.userid         
        }

        Tought.update(tought,{where:{id:id}})

        try {
            req.flash('message', 'Pensamento atualizado com sucesso!')
            req.session.save(() => {
          res.redirect('/toughts/dashboard')
        })} catch (error) {
            console.log(error)
        }
     }
}

