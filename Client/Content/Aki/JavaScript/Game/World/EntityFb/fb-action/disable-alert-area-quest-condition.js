"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableAlertAreaQuestCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableAlertAreaQuestCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsDisableAlertAreaQuestCondition(t, e) {
    return (e || new DisableAlertAreaQuestCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDisableAlertAreaQuestCondition(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new DisableAlertAreaQuestCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  relatedQuestId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startDisableAlertAreaQuestCondition(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addRelatedQuestId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endDisableAlertAreaQuestCondition(t) {
    return t.endObject();
  }
  static createDisableAlertAreaQuestCondition(t, e, i) {
    DisableAlertAreaQuestCondition.startDisableAlertAreaQuestCondition(t);
    DisableAlertAreaQuestCondition.addType(t, e);
    DisableAlertAreaQuestCondition.addRelatedQuestId(t, i);
    return DisableAlertAreaQuestCondition.endDisableAlertAreaQuestCondition(t);
  }
}
exports.DisableAlertAreaQuestCondition = DisableAlertAreaQuestCondition;
//# sourceMappingURL=disable-alert-area-quest-condition.js.map