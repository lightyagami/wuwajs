"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportToAndEnterFishingBoat = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportToAndEnterFishingBoat {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleportToAndEnterFishingBoat(t, e) {
    return (e || new TeleportToAndEnterFishingBoat()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportToAndEnterFishingBoat(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleportToAndEnterFishingBoat()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startTeleportToAndEnterFishingBoat(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endTeleportToAndEnterFishingBoat(t) {
    return t.endObject();
  }
  static createTeleportToAndEnterFishingBoat(t, e) {
    TeleportToAndEnterFishingBoat.startTeleportToAndEnterFishingBoat(t);
    TeleportToAndEnterFishingBoat.addType(t, e);
    return TeleportToAndEnterFishingBoat.endTeleportToAndEnterFishingBoat(t);
  }
}
exports.TeleportToAndEnterFishingBoat = TeleportToAndEnterFishingBoat;
//# sourceMappingURL=teleport-to-and-enter-fishing-boat.js.map