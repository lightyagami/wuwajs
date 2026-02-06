"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightWave = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorFightWave {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get WaveId() {
    return this.waveid();
  }
  get RefreshType() {
    return this.refreshtype();
  }
  get RefreshGroupId() {
    return this.refreshgroupid();
  }
  get BuffGateBornGroup() {
    return this.buffgateborngroup();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get Weight() {
    return this.weight();
  }
  get BornTrack() {
    return this.borntrack();
  }
  get BornDistance() {
    return GameUtils_1.GameUtils.ConvertToArray(this.borndistanceLength(), this.borndistance, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsMotorFightWave(t, r) {
    return (r || new MotorFightWave()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  waveid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  refreshtype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  refreshgroupid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffgateborngroup() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weight() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  borntrack() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBorndistanceAt(t) {
    return this.borndistance(t);
  }
  borndistance(t) {
    var r = this.J7.__offset(this.z7, 18);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  borndistanceLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  borndistanceArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.MotorFightWave = MotorFightWave;
//# sourceMappingURL=MotorFightWave.js.map