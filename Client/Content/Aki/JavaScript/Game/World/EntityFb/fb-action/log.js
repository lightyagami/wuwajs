"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Log = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Log {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLog(t, e) {
    return (e || new Log()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLog(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new Log()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  level(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  content(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startLog(t) {
    t.startObject(2);
  }
  static addLevel(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addContent(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endLog(t) {
    return t.endObject();
  }
  static createLog(t, e, s) {
    Log.startLog(t);
    Log.addLevel(t, e);
    Log.addContent(t, s);
    return Log.endLog(t);
  }
}
exports.Log = Log;
//# sourceMappingURL=log.js.map