"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssCreateRewardTreasureBox = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DangoAbyssCreateRewardTreasureBox {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsDangoAbyssCreateRewardTreasureBox(e, r) {
    return (r || new DangoAbyssCreateRewardTreasureBox()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsDangoAbyssCreateRewardTreasureBox(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new DangoAbyssCreateRewardTreasureBox()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static startDangoAbyssCreateRewardTreasureBox(e) {
    e.startObject(0);
  }
  static endDangoAbyssCreateRewardTreasureBox(e) {
    return e.endObject();
  }
  static createDangoAbyssCreateRewardTreasureBox(e) {
    DangoAbyssCreateRewardTreasureBox.startDangoAbyssCreateRewardTreasureBox(e);
    return DangoAbyssCreateRewardTreasureBox.endDangoAbyssCreateRewardTreasureBox(e);
  }
}
exports.DangoAbyssCreateRewardTreasureBox = DangoAbyssCreateRewardTreasureBox;
//# sourceMappingURL=dango-abyss-create-reward-treasure-box.js.map