"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueTalentTreeDesc = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntArray_1 = require("./SubType/IntArray");
class RogueTalentTreeDesc {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BaseDesc() {
    return this.basedesc();
  }
  get Args() {
    return GameUtils_1.GameUtils.ConvertToArray(this.argsLength(), this.args, this);
  }
  get TalentIcon() {
    return this.talenticon();
  }
  get TalentName() {
    return this.talentname();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRogueTalentTreeDesc(t, e) {
    return (e || new RogueTalentTreeDesc()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  basedesc(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  GetArgsAt(t, e) {
    return this.args(t);
  }
  args(t, e) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return (e || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  argsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  talenticon(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  talentname(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.RogueTalentTreeDesc = RogueTalentTreeDesc;
//# sourceMappingURL=RogueTalentTreeDesc.js.map