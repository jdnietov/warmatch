import '/client/home/home.html';
import '/client/dashboard/dashboard.html';
import '/client/login/login.html';
import '/client/register/register.html';

Router.route('/', function () {
  this.render('home');
});
Router.route('/login');
Router.route('/register');
Router.route('/dashboard');
Router.route('/profile');
