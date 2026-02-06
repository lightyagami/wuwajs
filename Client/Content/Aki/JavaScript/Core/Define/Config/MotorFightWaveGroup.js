"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightWaveGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorFightWaveGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get GroupId() {
    return this.groupid();
  }
  get WaveIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.waveidsLength(), this.waveids, this);
  }
  get GroupType() {
    return this.grouptype();
  }
  get GroupLength() {
    return this.grouplength();
  }
  get BossFightTime() {
    return this.bossfighttime();
  }
  get BossFightDistance() {
    return this.bossfightdistance();
  }
  get AttrRate() {
    return GameUtils_1.GameUtils.ConvertToArray(this.attrrateLength(), this.attrrate, this);
  }
  get DamageIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.damageidsLength(), this.damageids, this);
  }
  get Amplify() {
    return this.amplify();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMotorFightWaveGroup(t, s) {
    return (s || new MotorFightWaveGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWaveidsAt(t) {
    return this.waveids(t);
  }
  waveids(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  waveidsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  waveidsArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  grouptype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  grouplength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 30000;
    }
  }
  bossfighttime() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 30000;
    }
  }
  bossfightdistance() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 3000;
    }
  }
  GetAttrrateAt(t) {
    return this.attrrate(t);
  }
  attrrate(t) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  attrrateLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  attrrateArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDamageidsAt(t) {
    return this.damageids(t);
  }
  damageids(t) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  damageidsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageidsArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  amplify() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
}
exports.MotorFightWaveGroup = MotorFightWaveGroup;
//# sourceMappingURL=MotorFightWaveGroup.js.map