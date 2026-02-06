"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightRank = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class MotorFightRank {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get DisplayThreshold() {
    return this.displaythreshold();
  }
  get Score() {
    return this.score();
  }
  get WaveNum() {
    return this.wavenum();
  }
  get KillNum() {
    return this.killnum();
  }
  get BuffGateNum() {
    return this.buffgatenum();
  }
  get CollectionItem() {
    return GameUtils_1.GameUtils.ConvertToMap(this.collectionitemLength(), this.collectionitemKey, this.collectionitemValue, this);
  }
  collectionitemKey(t) {
    return this.collectionitem(t)?.key();
  }
  collectionitemValue(t) {
    return this.collectionitem(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMotorFightRank(t, i) {
    return (i || new MotorFightRank()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  displaythreshold() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  score() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  wavenum() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  killnum() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffgatenum() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCollectionitemAt(t, i) {
    return this.collectionitem(t);
  }
  collectionitem(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  collectionitemLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MotorFightRank = MotorFightRank;
//# sourceMappingURL=MotorFightRank.js.map