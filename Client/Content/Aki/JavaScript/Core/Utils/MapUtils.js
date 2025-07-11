"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapUtils = undefined;
class MapUtils {
  static ForEach(t, e) {
    var a = t.Num();
    for (let s = 0; s < a; s++) {
      var r = t.GetKey(s);
      e(t.GetKey(s), t.Get(r));
    }
  }
}
exports.MapUtils = MapUtils;
//# sourceMappingURL=MapUtils.js.map