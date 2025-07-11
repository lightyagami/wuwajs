"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsGroupMatch = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RacingBetsGroupMatch {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SeasonId() {
    return this.seasonid();
  }
  get Type() {
    return this.type();
  }
  get SortId() {
    return this.sortid();
  }
  get Name() {
    return this.name();
  }
  get LegMatches() {
    return GameUtils_1.GameUtils.ConvertToArray(this.legmatchesLength(), this.legmatches, this);
  }
  get DangoList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.dangolistLength(), this.dangolist, this);
  }
  get AdvancedDangoCount() {
    return this.advanceddangocount();
  }
  get NextMatchId() {
    return this.nextmatchid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRacingBetsGroupMatch(t, s) {
    return (s || new RacingBetsGroupMatch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  seasonid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetLegmatchesAt(t) {
    return this.legmatches(t);
  }
  legmatches(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  legmatchesLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  legmatchesArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDangolistAt(t) {
    return this.dangolist(t);
  }
  dangolist(t) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  dangolistLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  dangolistArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  advanceddangocount() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nextmatchid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RacingBetsGroupMatch = RacingBetsGroupMatch;
//# sourceMappingURL=RacingBetsGroupMatch.js.map