"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RomanNumeralUtils = undefined;
const StringBuilder_1 = require("./StringBuilder");
class RomanNumeralUtils {
  static ConvertToRoman(l) {
    if (!this.del(l)) {
      return "";
    }
    var e = RomanNumeralUtils.jz;
    e.Clear();
    let a = l;
    for (const r of RomanNumeralUtils.EVg) {
      var t = Math.floor(a / r.Value);
      if (t > 0) {
        e.Append(r.Symbol.repeat(t));
        a -= r.Value * t;
      }
    }
    return e.ToString();
  }
  static del(l) {
    return Number.isInteger(l) && l > 0 && l <= RomanNumeralUtils.IVg;
  }
  static IsValidRange(l) {
    return this.del(l);
  }
}
(exports.RomanNumeralUtils = RomanNumeralUtils).jz = new StringBuilder_1.StringBuilder();
RomanNumeralUtils.EVg = [{
  Value: 1000,
  Symbol: "M"
}, {
  Value: 900,
  Symbol: "CM"
}, {
  Value: 500,
  Symbol: "D"
}, {
  Value: 400,
  Symbol: "CD"
}, {
  Value: 100,
  Symbol: "C"
}, {
  Value: 90,
  Symbol: "XC"
}, {
  Value: 50,
  Symbol: "L"
}, {
  Value: 40,
  Symbol: "XL"
}, {
  Value: 10,
  Symbol: "X"
}, {
  Value: 9,
  Symbol: "IX"
}, {
  Value: 5,
  Symbol: "V"
}, {
  Value: 4,
  Symbol: "IV"
}, {
  Value: 1,
  Symbol: "I"
}];
RomanNumeralUtils.IVg = 3999; //# sourceMappingURL=RomanNumeralUtils.js.map