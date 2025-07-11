"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomJson = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomJson {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsCustomJson(t, s) {
    return (s || new CustomJson()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCustomJson(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new CustomJson()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  jsonString(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  static startCustomJson(t) {
    t.startObject(2);
  }
  static addName(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addJsonString(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endCustomJson(t) {
    return t.endObject();
  }
  static createCustomJson(t, s, o) {
    CustomJson.startCustomJson(t);
    CustomJson.addName(t, s);
    CustomJson.addJsonString(t, o);
    return CustomJson.endCustomJson(t);
  }
}
exports.CustomJson = CustomJson;
//# sourceMappingURL=custom-json.js.map