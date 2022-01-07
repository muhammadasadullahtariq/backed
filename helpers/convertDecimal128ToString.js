function convertDecimal128ToString(value) {
  if (typeof value !== "undefined") {
    // return value.toString();
    return parseFloat(value.toString());
  }
  return value;
}

module.exports = convertDecimal128ToString;
