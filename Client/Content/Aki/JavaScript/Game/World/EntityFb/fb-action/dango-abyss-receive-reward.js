"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssReceiveReward = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DangoAbyssReceiveReward {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, s) {
    this.bb_pos = e;
    this.bb = s;
    return this;
  }
  static getRootAsDangoAbyssReceiveReward(e, s) {
    return (s || new DangoAbyssReceiveReward()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsDangoAbyssReceiveReward(e, s) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new DangoAbyssReceiveReward()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static startDangoAbyssReceiveReward(e) {
    e.startObject(0);
  }
  static endDangoAbyssReceiveReward(e) {
    return e.endObject();
  }
  static createDangoAbyssReceiveReward(e) {
    DangoAbyssReceiveReward.startDangoAbyssReceiveReward(e);
    return DangoAbyssReceiveReward.endDangoAbyssReceiveReward(e);
  }
}
exports.DangoAbyssReceiveReward = DangoAbyssReceiveReward;
//# sourceMappingURL=dango-abyss-receive-reward.js.map