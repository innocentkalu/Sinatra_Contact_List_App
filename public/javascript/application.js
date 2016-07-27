(function() {
  $("#loadContacts").on('click',function() {
    $.ajax({
    method: 'GET',
    dataType: 'json',
    url: '/contacts',
    success: function(contacts) {
      var table = $("#contacts").find('tbody');
      contacts.forEach(function(contact) {
        var tr = $("<tr>").appendTo(table);
        $("<td>").text(contact.first_name).appendTo(tr);
        $("<td>").text(contact.last_name).appendTo(tr);
        $("<td>").text(contact.email).appendTo(tr);
        $("<td>").text(contact.phone).appendTo(tr);
      });
      $("#results").show();
    }
  });
 });
});
