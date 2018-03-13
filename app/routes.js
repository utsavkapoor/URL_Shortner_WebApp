module.exports = (app) => {

    const user = require('/config/schema.js');

    app.route('/')
        .get(function(req, res) {
    		  res.sendFile(process.cwd() + '/public/index.html');
        })

    app.route('/')
        .post((req,res) => {
            if(req.body.email && req.body.user_name && req.body.password){
                var new_user = {
                    email: req.body.email,
                    username: req.body.user_name,
                    password: req.body.password
                }
                user.create(new_user, (err,user) =>{
                    if(error){
                        return res.status(500)
                        .type('text')
                        .send('SERVER ERROR');
                    }
                    req.session.userId = user._id;
                    return res.redirect('/profile');
                });
            } else if(req.body.logemail && req.body.logpassword){
                user.authenticate(req.body.logemail && req.body.logpassword, (error,user) => {
                    if(error || !user){
                        return res.status(401)
                        .type('text')
                        .send('Wrong Username or password');
                    }
                    req.session.userId = user._id;
                    return res.redirect('/profile');
                })
            }
        });



    // Respond not found to all the wrong routes
    app.use(function(req, res, next){
      res.status(404);
      res.type('txt').send('Not found');
    });

    // Error Middleware
    app.use(function(err, req, res, next) {
      if(err) {
        res.status(err.status || 500)
          .type('txt')
          .send(err.message || 'SERVER ERROR');
      }
    })
}
