"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableAlertAreaDungeonCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableAlertAreaDungeonCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsDisableAlertAreaDungeonCondition(e, t) {
    return (t || new DisableAlertAreaDungeonCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsDisableAlertAreaDungeonCondition(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new DisableAlertAreaDungeonCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  relatedDungeonId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startDisableAlertAreaDungeonCondition(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addRelatedDungeonId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endDisableAlertAreaDungeonCondition(e) {
    return e.endObject();
  }
  static createDisableAlertAreaDungeonCondition(e, t, n) {
    DisableAlertAreaDungeonCondition.startDisableAlertAreaDungeonCondition(e);
    DisableAlertAreaDungeonCondition.addType(e, t);
    DisableAlertAreaDungeonCondition.addRelatedDungeonId(e, n);
    return DisableAlertAreaDungeonCondition.endDisableAlertAreaDungeonCondition(e);
  }
}
exports.DisableAlertAreaDungeonCondition = DisableAlertAreaDungeonCondition;
//# sourceMappingURL=disable-alert-area-dungeon-condition.js.map