"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeScaleUtils = undefined;
const PRIORITY_EXTEND = 100;
class TimeScaleUtils {
  static GetTimeScalePriority(e) {
    return e * PRIORITY_EXTEND;
  }
}
exports.TimeScaleUtils = TimeScaleUtils;
//# sourceMappingURL=TimeScaleUtils.js.map