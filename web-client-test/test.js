/* Constants. */
/* Number of EEG channels. */
const num_channels = 8;
const alpha = 0;
const theta = 1;
const delta = 2;
const beta = 3;

/* Instructions to float past. */
const high_activity_instructions = ["Your brain is very busy right now.",
  "Let's create some clarity."]
const med_activity_instructions = [""]
const low_activity_instructions = [""]
const neutral_instructions = ["Relax your muscles.",
  "Unclench your jaw.",
  "Let your eyebrows rest.",
  "Let your tongue fall.",
  "Ease your shoulders down.",
  "Focus on the breath.",
  "Breath slow and steady through your nose.",
  "Notice your surroundings.",
  "Allow thoughts to come and to go.",
  "Notice the pulsing of the shapes around you. Don't worry about anticipating them, just let them happen.",
  "Stay aware of the sensation of breathing.",
  "Notice the shapes around you. Allow them to be how they are."]

/* Introduction. */
const intro_phrases = [{phrase: "Welcome to Mind Spaces.", duration: 4},
                      {phrase: "Today, you'll be guided through a meditation experience.", duration: 5},
                      {phrase: "Everything you see around you will be a representation of your state of mind.", duration: 5},
                      {phrase: "If you've never meditated, don't worry.", duration: 3},
                      {phrase: "All you have to do is sit back, relax, and watch as your mind finds clarity.", duration: 4},
                      {phrase: "Breathe slow and steady through your nose.", duration: 5},
                      {phrase: "Focus on the sensation of breathing.", duration: 5},
                      {phrase: "", duration: 25},
                      {phrase: "If you find that you're distracted, this is perfectly ok.", duration: 3},
                      {phrase: "Gently bring your attention back to the breath, and to the visuals around you.", duration: 3}]

/* Request interval in milleseconds. */
 request_interval = 10;

/* Globals. */
/* Buffers for each piece of data for the low pass filter. */
bufs0 = new Array(8).fill(0);
bufs1 = new Array(8).fill(0);
/* Filter cutoff (in range [0.0, 0.99]). */
cutoff = 0.05;

/* Main data buffer. */
data = new Array(8).fill(0);

/* Main function. */
async function main() {
  /* Begin the request loop for the emg data. */
  /* Now, show the intro. */
  var i;
  for (i = 0; i < intro_phrases.length; i++) {
    intro_phrase = "<a-text id=\"introphrase\" align=\"center\" position=\"0 -8.5 -3\" color=\"#dddddd\" value=\"" + intro_phrases[i].phrase + "\"></a-text>";
    animation_one = "<a-animation id=\"anim1\" attribute=\"position\" dur=\"2000\" fill=\"forwards\" from=\"0 -8.5 -3\" to=\"0 10 0\" repeat=\"0\"></a-animation>";
    animation_two = "<a-animation id=\"anim2\" attribute=\"position\" dur=\"2000\" fill=\"forwards\" to=\"0 20 0\" repeat=\"0\"></a-animation>";

    $("#instructions-container").append(intro_phrase);
    $("#instructions-container").append(animation_one);
    $("#anim1").remove();
    await sleep(intro_phrases[i].duration * 1000);
    $("#instructions-container").append(animation_two);
    await sleep(2000);
    $("#anim2").remove();
    $("#introphrase").remove();
    if (i == 3) {
      start_request_loop()
    }
  }
}

function start_request_loop() {
  request_loop = setInterval(function() {
    /* Url of our server. */
    const Url = "http://0.0.0.0:5000/datarequest";

    /* GET request to the server. */
    $.get(Url, function(data, status) {

      /* Filter all the data we get back to smooth
       * it out. */
      for (id = 0; id < num_channels; id++) {
        /* Sanity check. */
        if (id < data.length) {
          /* Lowpass each data point. */
          data[id] = lowpass(data[id], id);
        }
      }

      /* Calculate percentage in alpha band. */
      sum = 0;
      for (i = 0; i < 4; i++) {
        sum += data[i];
      }
      alpha_proportion = data[alpha] / sum;
      upsetness = 1.0 - alpha_proportion + 0.03;

      console.log(upsetness);

      /* Apply modulations to shapes in the scene. */
      for (shape = 0; shape < 32; shape++) {
        fixed_radius = document.getElementById(shape + 1).getAttribute("fixedradius");
        document.getElementById(shape + 1).setAttribute("radius", upsetness * fixed_radius);
      }

      /* Size modulation. */
      for (i = 0; i < 2; i ++) {
        ball = $("#ball" + i);
        ball.attr("radius", parseFloat(ball.attr("initradius")) * data[0]);
      }

    });
  }, request_interval)
}

/* -12dB lowpass filtering function. */
function lowpass(value, id) {
  bufs0[id] += cutoff * (value - bufs0[id]);
  bufs1[id] += cutoff * (bufs0[id] - bufs1[id]);
  return bufs1[id];
}

/*
 * Mixes two colors according to factor lambda.
 * Returns as a hex string.
 */
function color_mix(lambda, r1, g1, b1, r2, g2, b2) {
  return rgb_to_hex(Math.floor(lambda * r1 + (1 - lambda) * r2),
                    Math.floor(lambda * g1 + (1 - lambda) * g2),
                    Math.floor(lambda * b1 + (1 - lambda) * b2))
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* Run the main function when the document is ready. */
$(document).ready(main)
