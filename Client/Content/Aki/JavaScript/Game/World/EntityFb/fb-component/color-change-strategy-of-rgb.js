"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorChangeStrategyOfRGB = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ColorChangeStrategyOfRGB {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsColorChangeStrategyOfRGB(t, e) {
    return (e || new ColorChangeStrategyOfRGB()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsColorChangeStrategyOfRGB(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ColorChangeStrategyOfRGB()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  blueState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  yellowState(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  redState(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startColorChangeStrategyOfRGB(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBlueState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addYellowState(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addRedState(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endColorChangeStrategyOfRGB(t) {
    return t.endObject();
  }
  static createColorChangeStrategyOfRGB(t, e, r, a, o) {
    ColorChangeStrategyOfRGB.startColorChangeStrategyOfRGB(t);
    ColorChangeStrategyOfRGB.addType(t, e);
    ColorChangeStrategyOfRGB.addBlueState(t, r);
    ColorChangeStrategyOfRGB.addYellowState(t, a);
    ColorChangeStrategyOfRGB.addRedState(t, o);
    return ColorChangeStrategyOfRGB.endColorChangeStrategyOfRGB(t);
  }
}
exports.ColorChangeStrategyOfRGB = ColorChangeStrategyOfRGB;
//# sourceMappingURL=color-change-strategy-of-rgb.js.map