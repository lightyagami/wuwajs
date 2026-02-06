"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksUtils = undefined;
class DrinksUtils {
  static GetStepType(s) {
    if (s < 2) {
      return 1;
    } else if (s < 4) {
      return 2;
    } else {
      return 3;
    }
  }
}
exports.DrinksUtils = DrinksUtils;
//# sourceMappingURL=DrinksUtils.js.map