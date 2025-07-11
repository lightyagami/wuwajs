"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingTowerGotoNextFloor = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MowingTowerGotoNextFloor {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(o, t) {
    this.bb_pos = o;
    this.bb = t;
    return this;
  }
  static getRootAsMowingTowerGotoNextFloor(o, t) {
    return (t || new MowingTowerGotoNextFloor()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static getSizePrefixedRootAsMowingTowerGotoNextFloor(o, t) {
    o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new MowingTowerGotoNextFloor()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static startMowingTowerGotoNextFloor(o) {
    o.startObject(0);
  }
  static endMowingTowerGotoNextFloor(o) {
    return o.endObject();
  }
  static createMowingTowerGotoNextFloor(o) {
    MowingTowerGotoNextFloor.startMowingTowerGotoNextFloor(o);
    return MowingTowerGotoNextFloor.endMowingTowerGotoNextFloor(o);
  }
}
exports.MowingTowerGotoNextFloor = MowingTowerGotoNextFloor;
//# sourceMappingURL=mowing-tower-goto-next-floor.js.map