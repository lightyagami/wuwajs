"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssGotoNextFloor = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DangoAbyssGotoNextFloor {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(o, t) {
    this.bb_pos = o;
    this.bb = t;
    return this;
  }
  static getRootAsDangoAbyssGotoNextFloor(o, t) {
    return (t || new DangoAbyssGotoNextFloor()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static getSizePrefixedRootAsDangoAbyssGotoNextFloor(o, t) {
    o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new DangoAbyssGotoNextFloor()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static startDangoAbyssGotoNextFloor(o) {
    o.startObject(0);
  }
  static endDangoAbyssGotoNextFloor(o) {
    return o.endObject();
  }
  static createDangoAbyssGotoNextFloor(o) {
    DangoAbyssGotoNextFloor.startDangoAbyssGotoNextFloor(o);
    return DangoAbyssGotoNextFloor.endDangoAbyssGotoNextFloor(o);
  }
}
exports.DangoAbyssGotoNextFloor = DangoAbyssGotoNextFloor;
//# sourceMappingURL=dango-abyss-goto-next-floor.js.map