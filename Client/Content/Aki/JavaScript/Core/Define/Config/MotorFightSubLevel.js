"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightSubLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorFightSubLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get SubLevelId() {
    return this.sublevelid();
  }
  get SubLevelType() {
    return this.subleveltype();
  }
  get WaveGroupIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.wavegroupidsLength(), this.wavegroupids, this);
  }
  get PreSegmentId() {
    return this.presegmentid();
  }
  get PreSegmentLength() {
    return this.presegmentlength();
  }
  get SegmentId() {
    return this.segmentid();
  }
  get WorldSpeedMultiply() {
    return this.worldspeedmultiply();
  }
  get BornDistance() {
    return this.borndistance();
  }
  get DistanceToNext() {
    return this.distancetonext();
  }
  get LevelAttrRate() {
    return GameUtils_1.GameUtils.ConvertToArray(this.levelattrrateLength(), this.levelattrrate, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsMotorFightSubLevel(t, e) {
    return (e || new MotorFightSubLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  sublevelid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  subleveltype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWavegroupidsAt(t) {
    return this.wavegroupids(t);
  }
  wavegroupids(t) {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  wavegroupidsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  wavegroupidsArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  presegmentid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  presegmentlength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  segmentid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  worldspeedmultiply() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  borndistance() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  distancetonext() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  GetLevelattrrateAt(t) {
    return this.levelattrrate(t);
  }
  levelattrrate(t) {
    var e = this.J7.__offset(this.z7, 22);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  levelattrrateLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelattrrateArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.MotorFightSubLevel = MotorFightSubLevel;
//# sourceMappingURL=MotorFightSubLevel.js.map