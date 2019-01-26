/* Simple test. */
$(document).ready(
  request_loop = setInterval(function() {
      const Url = "http://0.0.0.0:5000/datarequest";
      $.get(Url, function(data, status) {
        console.log(data[0]);
        // intensity = (lowpass(data[0]) * 4);
        intensity = 5;
        red = Math.floor(lowpass(data[1]) * 255);
        color = rgb_to_hex(red, 10, 220);
        console.log(color);
        $("#ball").attr("light", "color: " + color + "; distance:120; intensity:" + intensity + "; type:point");
        $("#ball").attr("material", "shader:flat;color:" + color);
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

function rgb_to_hex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  if (r.length % 2) {
    r = '0' + r;
  }
  if (g.length % 2) {
    g = '0' + g;
  }
  if (b.length % 2) {
    b = '0' + b;
  }
  return ("#" + r + g + b).toUpperCase();
}
