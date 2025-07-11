"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Weather = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Weather {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsWeather(t, e) {
    return (e || new Weather()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsWeather(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new Weather()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  weather(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  weatherId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startWeather(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addWeather(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addWeatherId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endWeather(t) {
    return t.endObject();
  }
  static createWeather(t, e, r, s, a) {
    Weather.startWeather(t);
    Weather.addType(t, e);
    Weather.addCompare(t, r);
    Weather.addWeather(t, s);
    Weather.addWeatherId(t, a);
    return Weather.endWeather(t);
  }
}
exports.Weather = Weather;
//# sourceMappingURL=weather.js.map