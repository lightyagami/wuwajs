"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResTalentTreeDesc = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResTalentTreeDesc {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TalentName() {
    return this.talentname();
  }
  get TalentDesc() {
    return this.talentdesc();
  }
  get Args() {
    return GameUtils_1.GameUtils.ConvertToArray(this.argsLength(), this.args, this);
  }
  get TalentIcon() {
    return this.talenticon();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRogueResTalentTreeDesc(t, e) {
    return (e || new RogueResTalentTreeDesc()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  talentname(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  talentdesc(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  GetArgsAt(t) {
    return this.args(t);
  }
  args(t, e) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, e) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  argsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  talenticon(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.RogueResTalentTreeDesc = RogueResTalentTreeDesc;
//# sourceMappingURL=RogueResTalentTreeDesc.js.map