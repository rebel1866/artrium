function extractTransformNum(transformStr) {
  transformStr = transformStr.substring(11);
  let transformStrLenght = transformStr.length;
  return transformStr.substring(0, transformStrLenght - 2);
}

function animate(options) {
  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    var progress = options.timing(timeFraction);

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
    }
  }
}

function pow8Func(timeFraction) {
  return Math.pow(timeFraction, 8);
}
function linear(timeFraction){
    return timeFraction;
}

function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}
