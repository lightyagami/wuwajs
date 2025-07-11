"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestroyFishingBoat = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DestroyFishingBoat {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsDestroyFishingBoat(t, s) {
    return (s || new DestroyFishingBoat()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDestroyFishingBoat(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new DestroyFishingBoat()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startDestroyFishingBoat(t) {
    t.startObject(0);
  }
  static endDestroyFishingBoat(t) {
    return t.endObject();
  }
  static createDestroyFishingBoat(t) {
    DestroyFishingBoat.startDestroyFishingBoat(t);
    return DestroyFishingBoat.endDestroyFishingBoat(t);
  }
}
exports.DestroyFishingBoat = DestroyFishingBoat;
//# sourceMappingURL=destroy-fishing-boat.js.map