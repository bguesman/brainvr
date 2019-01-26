/* Simple test. */
$(document).ready(
  request_loop = setInterval(function() {
      const Url = "http://0.0.0.0:5000/datarequest";
      $.get(Url, function(data, status) {
        console.log(data);
        $("#data").text("number: " + data);
      });
    }, 10)
)
