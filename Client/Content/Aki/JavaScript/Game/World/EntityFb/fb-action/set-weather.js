"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetWeather = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetWeather {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetWeather(t, e) {
    return (e || new SetWeather()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetWeather(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetWeather()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  weatherId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  areaIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  areaIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  areaIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startSetWeather(t) {
    t.startObject(2);
  }
  static addWeatherId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addAreaIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createAreaIdsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addInt32(r[t]);
    }
    return e.endVector();
  }
  static startAreaIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSetWeather(t) {
    return t.endObject();
  }
  static createSetWeather(t, e, r) {
    SetWeather.startSetWeather(t);
    SetWeather.addWeatherId(t, e);
    SetWeather.addAreaIds(t, r);
    return SetWeather.endSetWeather(t);
  }
}
exports.SetWeather = SetWeather;
//# sourceMappingURL=set-weather.js.map