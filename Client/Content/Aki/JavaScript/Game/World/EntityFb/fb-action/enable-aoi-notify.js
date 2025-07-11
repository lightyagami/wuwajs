"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableAoiNotify = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableAoiNotify {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEnableAoiNotify(t, i) {
    return (i || new EnableAoiNotify()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnableAoiNotify(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EnableAoiNotify()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startEnableAoiNotify(t) {
    t.startObject(1);
  }
  static addState(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endEnableAoiNotify(t) {
    return t.endObject();
  }
  static createEnableAoiNotify(t, i) {
    EnableAoiNotify.startEnableAoiNotify(t);
    EnableAoiNotify.addState(t, i);
    return EnableAoiNotify.endEnableAoiNotify(t);
  }
}
exports.EnableAoiNotify = EnableAoiNotify;
//# sourceMappingURL=enable-aoi-notify.js.map