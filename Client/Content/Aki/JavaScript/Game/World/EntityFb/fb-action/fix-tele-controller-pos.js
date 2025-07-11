"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixTeleControllerPos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixTeleControllerPos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsFixTeleControllerPos(e, t) {
    return (t || new FixTeleControllerPos()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsFixTeleControllerPos(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FixTeleControllerPos()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static startFixTeleControllerPos(e) {
    e.startObject(0);
  }
  static endFixTeleControllerPos(e) {
    return e.endObject();
  }
  static createFixTeleControllerPos(e) {
    FixTeleControllerPos.startFixTeleControllerPos(e);
    return FixTeleControllerPos.endFixTeleControllerPos(e);
  }
}
exports.FixTeleControllerPos = FixTeleControllerPos;
//# sourceMappingURL=fix-tele-controller-pos.js.map