"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsLegMatches = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RacingBetsLegMatches {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MatchId() {
    return this.matchid();
  }
  get Name() {
    return this.name();
  }
  get Type() {
    return this.type();
  }
  get EndPoint() {
    return this.endpoint();
  }
  get DiceTypeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.dicetypelistLength(), this.dicetypelist, this);
  }
  get BtnBgPath() {
    return this.btnbgpath();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRacingBetsLegMatches(t, s) {
    return (s || new RacingBetsLegMatches()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  matchid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  type() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  endpoint() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDicetypelistAt(t) {
    return this.dicetypelist(t);
  }
  dicetypelist(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  dicetypelistLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  dicetypelistArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  btnbgpath(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.RacingBetsLegMatches = RacingBetsLegMatches;
//# sourceMappingURL=RacingBetsLegMatches.js.map