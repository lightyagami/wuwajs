"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationUtils = undefined;
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
class AnimationUtils {
  static GetRootLocationCurveValue(e, a) {
    var t;
    var r;
    a.Reset();
    if (e.Valid && (e = e.GetComponent(178)?.MainAnimInstance)) {
      t = e.GetCurveValue(CharacterNameDefines_1.CharacterNameDefines.ROOT_X);
      r = e.GetCurveValue(CharacterNameDefines_1.CharacterNameDefines.ROOT_Y);
      e = e.GetCurveValue(CharacterNameDefines_1.CharacterNameDefines.ROOT_Z);
      a.Set(t, r, e);
    }
  }
  static GetRootLocationCurveValueWithDelta(e, a, t) {
    var r;
    var i;
    t.Reset();
    if (e.Valid && (e = e.GetComponent(178)?.MainAnimInstance)) {
      r = e.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_X, a);
      i = e.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_Y, a);
      e = e.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_Z, a);
      t.Set(r, i, e);
    }
  }
}
exports.AnimationUtils = AnimationUtils;
//# sourceMappingURL=AnimationUtils.js.map