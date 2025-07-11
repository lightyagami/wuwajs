"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueWeeklyBuffDesc = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueWeeklyBuffDesc {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BuffDsec() {
    return this.buffdsec();
  }
  get BuffDsecParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffdsecparamLength(), this.buffdsecparam, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRogueWeeklyBuffDesc(t, e) {
    return (e || new RogueWeeklyBuffDesc()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffdsec(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  GetBuffdsecparamAt(t) {
    return this.buffdsecparam(t);
  }
  buffdsecparam(t, e) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, e) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  buffdsecparamLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueWeeklyBuffDesc = RogueWeeklyBuffDesc;
//# sourceMappingURL=RogueWeeklyBuffDesc.js.map