const express = require('express')
const { engine } = require('express-handlebars');
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const toughtRoutes = require('./routes/toughtsRoutes')

const app = express()


const conn = require('./db/conn')

// Importando Models

const Tought = require('./models/Tought')
const User = require('./models/User');

//DEFININDO O USO DO ARQUIVO "main" COMO MODELO PRINCIPAL DO LAYOUT
app.engine('handlebars', engine({  defaultLayout: "main"}));
app.set('view engine','handlebars')

//Rotas
const ToughtController = require('./controllers/ToughtController');
const authRoutes = require('./routes/authRoutes')

//Receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//session middleware
app.use(session({
    name:"session",
    secret:'nosso_secret',
    resave: false,
    saveUninitialized:false,
    store: new FileStore({
        logFn:function(){},
        path : require('path').join(require('os').tmpdir(),'sessions'),
    }),
    cookie:{
        secure:false,
        maxAge: 360000,
        expires: new Date(Date.now()+360000),
        httpOnly : true
    }
}),
)

// Flash Messages

app.use(flash())

//Public 

app.use(express.static(__dirname + '/public'));

// Salvar sessão 

app.use((req,res,next)=>{

    if(req.session.userid){
        res.locals.session = req.session
    }

    next()

})
//Routes
app.use('/',authRoutes)
//DEFININDO "/TOUGHTS" PARA SER INCLUSO AUTOMATIMENTE NAS TOUGHTROUTES
app.use('/toughts',toughtRoutes)
//DEFININDO A ROTA RAIZ DO PROJETO
app.get('/',ToughtController.showToughts)


conn
//FORÇA A RECRIAÇÃO DAS TABELAS DO BANCO APAGANDO TODOS OS DADOS
//.sync({force:true})
//SINCRONIZA O BANCO DE DADOS A CADA INICIALIZAÇÃO DO SERVIDOR
.sync()
.then(()=>{
    //PORTA DO SERVIDOR
    app.listen(3000)
})
.catch((err)=> console.log(err))