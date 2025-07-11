"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeTeamPosition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeTeamPosition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeTeamPosition(t, e) {
    return (e || new ChangeTeamPosition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeTeamPosition(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeTeamPosition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  positionId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startChangeTeamPosition(t) {
    t.startObject(1);
  }
  static addPositionId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endChangeTeamPosition(t) {
    return t.endObject();
  }
  static createChangeTeamPosition(t, e) {
    ChangeTeamPosition.startChangeTeamPosition(t);
    ChangeTeamPosition.addPositionId(t, e);
    return ChangeTeamPosition.endChangeTeamPosition(t);
  }
}
exports.ChangeTeamPosition = ChangeTeamPosition;
//# sourceMappingURL=change-team-position.js.map