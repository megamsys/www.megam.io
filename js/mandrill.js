
var main = function(){

$('#sendEmail').click(function() {
$.ajax({
  type: 'POST',
  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
  data: {
    'key': '24jn9MvYtPqoRLGDBuQX5w',
    'message': {
      'from_email': $('#email').val(),
      'to': [
    {
      'email': 'info@megam.io',
      'name': 'Megam Systems',
      'type': 'to'
    }

    ],
    'autotext': 'true',
    'subject': $('#subject').val(),
    'html': $('#message').val()
  }
}
}).done(function(response) {
  alert("DONE TESTED");
  console.log(response); // if you're into that sorta thing

});
});
}
$(document).ready(main);
