$(function() {
  $("#loadContacts").on('click',function() {
    $.ajax({
    method: 'GET',
    dataType: 'json',
    url: '/contacts',
    success: function(contacts) {
      var table = $("#contacts").find('tbody').empty();
      $("#contactForm").hide();
      contacts.forEach(function(contact) {
        var tr = $("<tr>").appendTo(table);
        $("<td>").text(contact.first_name).appendTo(tr);
        $("<td>").text(contact.last_name).appendTo(tr);
        $("<td>").text(contact.email).appendTo(tr);
        $("<td>").text(contact.phone).appendTo(tr);
        $("<td>").html("&times").css({color: 'red',cursor: 'pointer'}).addClass('delete').data('contactId',contact.id).appendTo(tr);
      });

      $("#results").show();
    }
  });
 });
  $("#addContact").on('click',function() {
    $("#results").hide();
    $("#contactForm").show();
  });
  $("#newContact").on('submit',function(event) {
    event.preventDefault();
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    if (fname == '' || lname == '' || email == '' || phone == '') {
      alert("Please fill in all the fields");
    } else {
    $.post('/contacts',{first_name: fname, last_name: lname, email: email, phone: phone}, 
      function(results) {
        if(results.result) {
          alert("Contact has been successfully created")
          $("#newContact")[0].reset()
        } else {
          alert("Contact was not created")
        }
      },'json');
    }
  });
  $("#search").on('keyup',function(event) {
    if (event.keyCode == 13) {
      var search_value = $("#search").val();
      if (search_value == '') {
      return false;
    } 
    $.getJSON('/search/'+search_value, function(contacts) {
      var table = $("#contacts").find('tbody').empty();
      $("#contactForm").hide();
      contacts.forEach(function(contact) {
        var tr = $("<tr>").appendTo(table);
        $("<td>").text(contact.first_name).appendTo(tr);
        $("<td>").text(contact.last_name).appendTo(tr);
        $("<td>").text(contact.email).appendTo(tr);
        $("<td>").text(contact.phone).appendTo(tr);
      });
      $("#results").show(); 
    });
    } 
  });
  $("#contacts").on('click','.delete', function() {
    var row = $(this).parents('tr');
    var id = $(this).data('contactId');
    $.getJSON('/contacts/'+id+'/delete', function(result) {
      if (result.result) {
        alert("Contact deleted");
        row.remove();
      } else {
        alert("Delete unsuccessful")
      }
    });
  });
});
