"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssActivatePortal = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DangoAbyssActivatePortal {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsDangoAbyssActivatePortal(t, s) {
    return (s || new DangoAbyssActivatePortal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDangoAbyssActivatePortal(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new DangoAbyssActivatePortal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startDangoAbyssActivatePortal(t) {
    t.startObject(0);
  }
  static endDangoAbyssActivatePortal(t) {
    return t.endObject();
  }
  static createDangoAbyssActivatePortal(t) {
    DangoAbyssActivatePortal.startDangoAbyssActivatePortal(t);
    return DangoAbyssActivatePortal.endDangoAbyssActivatePortal(t);
  }
}
exports.DangoAbyssActivatePortal = DangoAbyssActivatePortal;
//# sourceMappingURL=dango-abyss-activate-portal.js.map