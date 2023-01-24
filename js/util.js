function extractTransformNum(transformStr) {
    transformStr = transformStr.substring(11);
    let transformStrLenght = transformStr.length;
    return transformStr.substring(0, transformStrLenght - 2);
}