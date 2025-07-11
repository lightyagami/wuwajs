"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareWeather = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareWeather {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCompareWeather(e, t) {
    return (t || new CompareWeather()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareWeather(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CompareWeather()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  weather(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  weatherId() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCompareWeather(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addWeather(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addWeatherId(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endCompareWeather(e) {
    return e.endObject();
  }
  static createCompareWeather(e, t, r, a, s) {
    CompareWeather.startCompareWeather(e);
    CompareWeather.addType(e, t);
    CompareWeather.addCompare(e, r);
    CompareWeather.addWeather(e, a);
    CompareWeather.addWeatherId(e, s);
    return CompareWeather.endCompareWeather(e);
  }
}
exports.CompareWeather = CompareWeather;
//# sourceMappingURL=compare-weather.js.map