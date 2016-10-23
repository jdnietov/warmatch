import '/client/home/home.js';
import '/client/dashboard/dashboard.js';
import '/client/login/login.js';
import '/client/register/register.js';

Router.route('/', function () {
  this.render('home');
});
Router.route('/login');
Router.route('/register');
Router.route('/dashboard');
