var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.route('/api/users')
        .get(auth.isInRole('admin'), controllers.users.getAllUsers)
        .post(controllers.users.createUser)
        .put(auth.isAuthenticated, controllers.users.updateUser);

    app.post('/api/login', auth.login);
    app.post('/api/logout', auth.logout);
    
    app.get('/api/jobs', auth.isInRole('user'), controllers.jobOffers.getAllJobOffers);
    
    app.route('/api/jobs/:id')
        .get(/*view specific job*/)
        .put(/*join job*/ );

    app.route('/api/jobs/create')
        .post(/* create job */);
    
    app.route('/api/offers')
        .get(/* Get all offers + filter */);
    
    app.route('/api/offers/:id')
        .get(/* View specific offer */);

    app.route('/api/candidates/:id')
        .get(/*Get candidate view page */)
        .put(/* Accepct specific candidate to interview*/)

    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });
    
    app.get('*', function (req, res) {
        res.render('index', { currentUser: req.user });
    });

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });    
};