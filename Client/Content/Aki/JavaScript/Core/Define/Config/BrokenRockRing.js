"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrokenRockRing = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const IntArray_1 = require("./SubType/IntArray");
class BrokenRockRing {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InvalidBox() {
    return GameUtils_1.GameUtils.ConvertToArray(this.invalidboxLength(), this.invalidbox, this);
  }
  get RandomBox() {
    return GameUtils_1.GameUtils.ConvertToArray(this.randomboxLength(), this.randombox, this);
  }
  get PerfectBox() {
    return this.perfectbox();
  }
  get BonusRate() {
    return GameUtils_1.GameUtils.ConvertToMap(this.bonusrateLength(), this.bonusrateKey, this.bonusrateValue, this);
  }
  bonusrateKey(t) {
    return this.bonusrate(t)?.key();
  }
  bonusrateValue(t) {
    return this.bonusrate(t)?.value();
  }
  get GoodScore() {
    return this.goodscore();
  }
  get PerfectScore() {
    return this.perfectscore();
  }
  get BonusScore() {
    return this.bonusscore();
  }
  get Speed() {
    return GameUtils_1.GameUtils.ConvertToMap(this.speedLength(), this.speedKey, this.speedValue, this);
  }
  speedKey(t) {
    return this.speed(t)?.key();
  }
  speedValue(t) {
    return this.speed(t)?.value();
  }
  get ColdTime() {
    return this.coldtime();
  }
  get MultiBoxGroup() {
    return this.multiboxgroup();
  }
  get Offset() {
    return GameUtils_1.GameUtils.ConvertToArray(this.offsetLength(), this.offset, this);
  }
  get IsAnticlockwise() {
    return this.isanticlockwise();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBrokenRockRing(t, s) {
    return (s || new BrokenRockRing()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInvalidboxAt(t, s) {
    return this.invalidbox(t);
  }
  invalidbox(t, s) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return (s || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  invalidboxLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRandomboxAt(t) {
    return this.randombox(t);
  }
  randombox(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  randomboxLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  randomboxArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  perfectbox() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetBonusrateAt(t, s) {
    return this.bonusrate(t);
  }
  bonusrate(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  bonusrateLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  goodscore() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10;
    }
  }
  perfectscore() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 30;
    }
  }
  bonusscore() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10;
    }
  }
  GetSpeedAt(t, s) {
    return this.speed(t);
  }
  speed(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  speedLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  coldtime() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 500;
    }
  }
  multiboxgroup() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetOffsetAt(t) {
    return this.offset(t);
  }
  offset(t) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  offsetLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  offsetArray() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  isanticlockwise() {
    var t = this.J7.__offset(this.z7, 28);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.BrokenRockRing = BrokenRockRing;
//# sourceMappingURL=BrokenRockRing.js.map