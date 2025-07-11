"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResCharacterBuff = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResCharacterBuff {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BuffId() {
    return this.buffid();
  }
  get BuffIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffidsLength(), this.buffids, this);
  }
  get AffixDesc() {
    return this.affixdesc();
  }
  get AffixDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.affixdescparamLength(), this.affixdescparam, this);
  }
  get AffixDescSimple() {
    return this.affixdescsimple();
  }
  get AffixTitle() {
    return this.affixtitle();
  }
  get AffixIcon() {
    return this.affixicon();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRogueResCharacterBuff(t, s) {
    return (s || new RogueResCharacterBuff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBuffidsAt(t) {
    return this.buffids(t);
  }
  buffids(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  buffidsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffidsArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  affixdesc(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetAffixdescparamAt(t) {
    return this.affixdescparam(t);
  }
  affixdescparam(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  affixdescparamLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  affixdescsimple(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  affixtitle(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  affixicon(t) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.RogueResCharacterBuff = RogueResCharacterBuff;
//# sourceMappingURL=RogueResCharacterBuff.js.map