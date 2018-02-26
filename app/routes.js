module.exports = (app) => {
    app.route('/')
        .get(function(req, res) {
    		  res.sendFile(process.cwd() + '/public/index.html');
        })

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
