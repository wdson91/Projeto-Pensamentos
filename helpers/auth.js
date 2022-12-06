//EXPORTANDO MIDDLEWARE QUE CHECA SE USUARIO TEM SESSÃO ATIVA
module.exports.checkAuth = function (req, res, next) {
    
  const userId = req.session.userid
  
    if (!userId) {
      res.redirect('/login')
    }
  
    next()
  }
  