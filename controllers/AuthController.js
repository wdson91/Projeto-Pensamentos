//IMPORTAÇÃO DO MODEL USER DO BANCO DE DADOS
const User = require("../models/User")
//IMPORTAÇÃO DO HASH DE SENHA
const bcrypt = require('bcryptjs')
//IMPORTAÇÃO DO MODULO DE FLASH MESSAGES
const flash = require("express-flash")

//EXPORTANDO A CLASSE AUTHCONTROLLER QUE SERÁ USADA NAS ROTAS
//ABAIXO FUNÇÕES QUE SERÃO USADAS NAS ROTAS 
module.exports = class AuthController{

    //FUNÇÃO LOGIN QUE RENDERIZA A VIEW LOGIN DA PASTA AUTH
    static login(req, res) {
        res.render('auth/login')

      }

    static async  loginPost(req,res){

        const {email ,password} = req.body




        //find user

        const user = await User.findOne({where:{email:email}})

        if(!user){

           req.flash('message','Usuario não encontrado')
           res.render('auth/login') 
           return

        }

        //check if password match

       // compare password
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
        req.flash('message','Senha invalida')
        res.render('auth/login') 

      return
    }  
        //Initialize session 

        req.session.userid= user.id


        req.flash('message', 'Autenticação efetuada com sucesso')

        req.session.save(()=>{
            res.redirect('/')
    })
}






      static register(req, res) {
        res.render('auth/register')


      }

      static async registerPost(req,res){

        const {name,email,password,confirmpassword} = req.body

        // confirmar senha

        if(password != confirmpassword){

            //Mensagem flash
            req.flash('message','As senhas não conferem,Tente Novamente')
            res.render('auth/register')

            return
        }

        //Checando usuario
        const checkIfUserExists = await User.findOne({where:{email:email}})

        if (checkIfUserExists){
            req.flash('message','Email ja Usado,Tente Novamente')
            res.render('auth/register')

            return
        }

        
            const salt = bcrypt.genSaltSync(10)
            const hashedpassword = bcrypt.hashSync(password,salt)

            const user = {

                name,
                email,
                password : hashedpassword,
         }

         try {


      const createdUser =  await User.create(user)


            req.session.userid= createdUser.id


            req.flash('message', 'Cadastro efetuado com sucesso')

            req.session.save(()=>{
                res.redirect('/')

            })


            
            
         } catch (error) {
            console.log(error)
            
         }
      }

      static logout(req,res){

        req.session.destroy()
        res.redirect('/login')
      }
      
}