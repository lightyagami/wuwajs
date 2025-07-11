"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneBulletGroup = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class SceneBulletGroup {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSceneBulletGroup(t, e) {
    return (e || new SceneBulletGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSceneBulletGroup(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SceneBulletGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt64(this.bb_pos + t);
    } else {
      return BigInt("0");
    }
  }
  range(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  offset(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startSceneBulletGroup(t) {
    t.startObject(4);
  }
  static addEntityState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBulletId(t, e) {
    t.addFieldInt64(1, e, BigInt("0"));
  }
  static addRange(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addOffset(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endSceneBulletGroup(t) {
    return t.endObject();
  }
}
exports.SceneBulletGroup = SceneBulletGroup;
//# sourceMappingURL=scene-bullet-group.js.map