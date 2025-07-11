"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestorePhantom = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RestorePhantom {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsRestorePhantom(t, e) {
    return (e || new RestorePhantom()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRestorePhantom(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new RestorePhantom()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startRestorePhantom(t) {
    t.startObject(0);
  }
  static endRestorePhantom(t) {
    return t.endObject();
  }
  static createRestorePhantom(t) {
    RestorePhantom.startRestorePhantom(t);
    return RestorePhantom.endRestorePhantom(t);
  }
}
exports.RestorePhantom = RestorePhantom;
//# sourceMappingURL=restore-phantom.js.map