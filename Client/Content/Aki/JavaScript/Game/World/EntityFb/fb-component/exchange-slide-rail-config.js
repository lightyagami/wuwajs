"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExchangeSlideRailConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const next_slide_rail_js_1 = require("../fb-component/next-slide-rail.js");
class ExchangeSlideRailConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, e) {
    this.bb_pos = i;
    this.bb = e;
    return this;
  }
  static getRootAsExchangeSlideRailConfig(i, e) {
    return (e || new ExchangeSlideRailConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsExchangeSlideRailConfig(i, e) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ExchangeSlideRailConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  maxExchangeDistance() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  nextRails(i, e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return (e || new next_slide_rail_js_1.NextSlideRail()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + t) + i * 4), this.bb);
    } else {
      return undefined;
    }
  }
  nextRailsLength() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__vector_len(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  static startExchangeSlideRailConfig(i) {
    i.startObject(2);
  }
  static addMaxExchangeDistance(i, e) {
    i.addFieldInt32(0, e, 0);
  }
  static addNextRails(i, e) {
    i.addFieldOffset(1, e, 0);
  }
  static createNextRailsVector(e, t) {
    e.startVector(4, t.length, 4);
    for (let i = t.length - 1; i >= 0; i--) {
      e.addOffset(t[i]);
    }
    return e.endVector();
  }
  static startNextRailsVector(i, e) {
    i.startVector(4, e, 4);
  }
  static endExchangeSlideRailConfig(i) {
    return i.endObject();
  }
  static createExchangeSlideRailConfig(i, e, t) {
    ExchangeSlideRailConfig.startExchangeSlideRailConfig(i);
    ExchangeSlideRailConfig.addMaxExchangeDistance(i, e);
    ExchangeSlideRailConfig.addNextRails(i, t);
    return ExchangeSlideRailConfig.endExchangeSlideRailConfig(i);
  }
}
exports.ExchangeSlideRailConfig = ExchangeSlideRailConfig;
//# sourceMappingURL=exchange-slide-rail-config.js.map