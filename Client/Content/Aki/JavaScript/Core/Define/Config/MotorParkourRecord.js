"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourRecord = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorParkourRecord {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get NPCId() {
    return this.npcid();
  }
  get Record() {
    return this.record();
  }
  get LapRecord() {
    return GameUtils_1.GameUtils.ConvertToArray(this.laprecordLength(), this.laprecord, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsMotorParkourRecord(t, r) {
    return (r || new MotorParkourRecord()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  npcid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  record() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLaprecordAt(t) {
    return this.laprecord(t);
  }
  laprecord(t) {
    var r = this.J7.__offset(this.z7, 10);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  laprecordLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  laprecordArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.MotorParkourRecord = MotorParkourRecord;
//# sourceMappingURL=MotorParkourRecord.js.map