var redirectHome = ['dashboard'];

// react and redirect depending on user
export default function noUserRedirect(url) {
  for (var i = 0; i < redirectHome.length; i++) {
    if(redirectHome[i] == url) {
      console.log(true);
      Router.go('/');
      break;
    }
  }
}
