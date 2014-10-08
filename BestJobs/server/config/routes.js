var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', { title: 'Express', year: new Date().getFullYear() });
    });
    
    app.get('/about', function (req, res) {
        res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page.' });
    });
    
    app.get('/contact', function (req, res) {
        res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page.' });
    });


    //app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    //app.post('/api/users', controllers.users.createUser);
    //app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    //app.get('/partials/:partialArea/:partialName', function(req, res) {
    //    res.render('../../public/templates/' + req.params.partialArea + '/' + req.params.partialName)
    //});

    //app.post('/api/login', auth.login);
    //app.post('/api/logout', auth.logout);

    //app.get('/api/articles', controllers.articles.getAll);
    //app.get('/api/articles/:id', controllers.articles.getById);
    //app.get('/api/articles/:category', controllers.articles.getByCategory);
    //app.post('/api/articles', controllers.articles.createItem);
    //app.delete('/api/articles', controllers.articles.deleteItem);

    //app.get('/api/*', function(req, res) {
    //    res.status(404);
    //    res.end();
    //});

    //app.get('*', function(req, res) {
    //    res.render('index', {currentUser: req.user});
    //});
};