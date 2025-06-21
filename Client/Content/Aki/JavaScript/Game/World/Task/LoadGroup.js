"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LoadGroup = void 0;
const Log_1 = require("../../../Core/Common/Log");
class LoadGroup {
  constructor(r) {
    this.Name = r, this.bfr = new Array, this.nK = new Array
  }
  async Run() {
    for (const s of this.nK) {
      var r = s[1],
        o = s[2];
      const i = s[3];
      if (r && !r()) return !0;
      r = o();
      r.then(r => {
        i?.(r)
      }), this.bfr.push(r)
    }
    var t = await Promise.all(this.bfr);
    for (let r = 0; r < t.length; ++r) {
      var e = this.nK[r][0];
      if (!t[r]) return Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 3, "执行函数Handle失败", ["name", e], ["index", r]), !1
    }
    return !0
  }
  Add(r, o, t, e) {
    return this.nK.push([r, o, t, e]), !0
  }
}
exports.LoadGroup = LoadGroup;
//# sourceMappingURL=LoadGroup.js.map