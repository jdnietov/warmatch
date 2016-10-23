import '/client/home/home.html';
import '/client/dashboard/dashboard.html';
import '/client/login/login.html';
import '/client/register/register.html';
import '/client/createMatch/createMatch.html';
import '/client/profile/profile.html';

Router.route('/', function () {
  this.render('home');
});
Router.route('/login');
Router.route('/register');
Router.route('/dashboard');
Router.route('/profile');
Router.route('/createMatch');
