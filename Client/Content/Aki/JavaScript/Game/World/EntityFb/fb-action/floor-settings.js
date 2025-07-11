"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloorSettings = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector2_js_1 = require("../fb-var/vector2.js");
class FloorSettings {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsFloorSettings(t, s) {
    return (s || new FloorSettings()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFloorSettings(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new FloorSettings()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  meshPath(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  materialPath(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  scale(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return (t || new vector2_js_1.Vector2()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  showTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  disappearTime() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startFloorSettings(t) {
    t.startObject(5);
  }
  static addMeshPath(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addMaterialPath(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addScale(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static addShowTime(t, s) {
    t.addFieldFloat32(3, s, 0);
  }
  static addDisappearTime(t, s) {
    t.addFieldFloat32(4, s, 0);
  }
  static endFloorSettings(t) {
    return t.endObject();
  }
}
exports.FloorSettings = FloorSettings;
//# sourceMappingURL=floor-settings.js.map