"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsAnimNotifyUtils = undefined;
class TsAnimNotifyUtils {
  static CheckTags(t, r, e) {
    var s = r.Num();
    if (t) {
      for (let t = 0; t < s; t++) {
        var i = r.GetKey(t);
        var o = r.Get(i);
        if (e(i.TagId) === o) {
          return true;
        }
      }
      return false;
    }
    for (let t = 0; t < s; t++) {
      var a = r.GetKey(t);
      var f = r.Get(a);
      if (e(a.TagId) !== f) {
        return false;
      }
    }
    return true;
  }
}
exports.TsAnimNotifyUtils = TsAnimNotifyUtils;
//# sourceMappingURL=TsAnimNotifyUtils.js.map