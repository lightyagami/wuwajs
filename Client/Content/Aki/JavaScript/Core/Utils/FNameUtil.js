"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FNameUtil = undefined;
const UE = require("ue");
class FNameUtil {
  static GetDynamicFName(e) {
    if (e) {
      let t = this.BJ.get(e);
      if (!t) {
        t = new UE.FName(e);
        this.BJ.set(e, t);
      }
      return t;
    }
  }
  static IsEmpty(t) {
    return !t || t.op_Equality(this.EMPTY);
  }
  static IsNothing(t) {
    return this.IsEmpty(t) || t.op_Equality(this.NONE);
  }
}
(exports.FNameUtil = FNameUtil).EMPTY = new UE.FName("");
FNameUtil.NONE = new UE.FName("None");
FNameUtil.BJ = new Map(); //# sourceMappingURL=FNameUtil.js.map