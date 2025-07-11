"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaptureStrategicPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const static_entitiy_match_js_1 = require("../fb-component/static-entitiy-match.js");
class CaptureStrategicPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCaptureStrategicPoint(t, e) {
    return (e || new CaptureStrategicPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCaptureStrategicPoint(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CaptureStrategicPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  maxValue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  initValue() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  progressPerformanceAttribute() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  increaseSpeed() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  decreaseSpeed() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  unoccupiedDecreaseSpeed() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  enemyEntitiyMatch(t) {
    var e = this.bb.__offset(this.bb_pos, 18);
    if (e) {
      return (t || new static_entitiy_match_js_1.StaticEntitiyMatch()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  captureType() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCaptureStrategicPoint(t) {
    t.startObject(9);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaxValue(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addInitValue(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addProgressPerformanceAttribute(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addIncreaseSpeed(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addDecreaseSpeed(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static addUnoccupiedDecreaseSpeed(t, e) {
    t.addFieldInt32(6, e, 0);
  }
  static addEnemyEntitiyMatch(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static addCaptureType(t, e) {
    t.addFieldInt8(8, e, 0);
  }
  static endCaptureStrategicPoint(t) {
    return t.endObject();
  }
}
exports.CaptureStrategicPoint = CaptureStrategicPoint;
//# sourceMappingURL=capture-strategic-point.js.map