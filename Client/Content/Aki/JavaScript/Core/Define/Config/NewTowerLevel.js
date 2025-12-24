"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewTowerLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class NewTowerLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Param() {
    return this.param();
  }
  get InstId() {
    return this.instid();
  }
  get Cond() {
    return this.cond();
  }
  get MaxLoopCount() {
    return this.maxloopcount();
  }
  get TeamLimit() {
    return this.teamlimit();
  }
  get Diff() {
    return this.diff();
  }
  get NewTowerBuffs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.newtowerbuffsLength(), this.newtowerbuffs, this);
  }
  get NewTowerBuffCount() {
    return this.newtowerbuffcount();
  }
  get ScoreLevelRule() {
    return GameUtils_1.GameUtils.ConvertToMap(this.scorelevelruleLength(), this.scorelevelruleKey, this.scorelevelruleValue, this);
  }
  scorelevelruleKey(t) {
    return this.scorelevelrule(t)?.key();
  }
  scorelevelruleValue(t) {
    return this.scorelevelrule(t)?.value();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsNewTowerLevel(t, e) {
    return (e || new NewTowerLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  param() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cond() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxloopcount() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  teamlimit() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  diff() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetNewtowerbuffsAt(t) {
    return this.newtowerbuffs(t);
  }
  newtowerbuffs(t) {
    var e = this.J7.__offset(this.z7, 18);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  newtowerbuffsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  newtowerbuffsArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  newtowerbuffcount() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetScorelevelruleAt(t, e) {
    return this.scorelevelrule(t);
  }
  scorelevelrule(t, e) {
    var s = this.J7.__offset(this.z7, 22);
    if (s) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  scorelevelruleLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.NewTowerLevel = NewTowerLevel;
//# sourceMappingURL=NewTowerLevel.js.map