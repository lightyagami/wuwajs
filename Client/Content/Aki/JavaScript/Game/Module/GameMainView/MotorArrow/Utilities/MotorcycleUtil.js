"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleUtil = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const HP_LEVEL1 = 100000;
const HP_LEVEL2 = 100000000;
const SECOND_PER_MINUTE = 60;
const SECOND_PER_HOUR = 3600;
class MotorcycleUtil {
  static CompactNumberFormat(t) {
    if ((t = Math.floor(t)) >= HP_LEVEL2) {
      return Math.floor(t / 1000000) + "M";
    } else if (t >= HP_LEVEL1) {
      return Math.floor(t / 1000) + "K";
    } else {
      return t.toString();
    }
  }
  static TimeFormat(t) {
    var t = t * MathUtils_1.MathUtils.MillisecondToSecond;
    var E = Math.floor(t / SECOND_PER_HOUR);
    var e = Math.floor(t % SECOND_PER_HOUR / SECOND_PER_MINUTE);
    var t = Math.floor(t % SECOND_PER_MINUTE);
    return [E.toString().padStart(2, "0"), e.toString().padStart(2, "0"), t.toString().padStart(2, "0")].join(":");
  }
}
exports.MotorcycleUtil = MotorcycleUtil;
//# sourceMappingURL=MotorcycleUtil.js.map