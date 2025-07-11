"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class QuestValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsQuestValue(t, e) {
    return (e || new QuestValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsQuestValue(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new QuestValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  v() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startQuestValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endQuestValue(t) {
    return t.endObject();
  }
  static createQuestValue(t, e) {
    QuestValue.startQuestValue(t);
    QuestValue.addV(t, e);
    return QuestValue.endQuestValue(t);
  }
}
exports.QuestValue = QuestValue;
//# sourceMappingURL=quest-value.js.map