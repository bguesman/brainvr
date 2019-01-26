/* Simple test. */
$(document).ready(
  request_loop = setInterval(function() {
      const Url = "http://0.0.0.0:5000/datarequest";
      $.get(Url, function(data, status) {
        console.log(data);
        $("#ball").attr("radius", lowpass(data));
      });
    }, 10)
)

buf0 = 0.0;
buf1 = 0.0;
cutoff = 0.1;

function lowpass(value) {
  buf0 += cutoff * (value - buf0);
  buf1 += cutoff * (buf0 - buf1);
  return buf1;
}
