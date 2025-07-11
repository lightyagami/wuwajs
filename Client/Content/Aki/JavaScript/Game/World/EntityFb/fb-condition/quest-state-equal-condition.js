"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestStateEqualCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class QuestStateEqualCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsQuestStateEqualCondition(t, e) {
    return (e || new QuestStateEqualCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsQuestStateEqualCondition(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new QuestStateEqualCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  questId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  state() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startQuestStateEqualCondition(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addQuestId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addState(t, e) {
    t.addFieldInt8(2, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endQuestStateEqualCondition(t) {
    return t.endObject();
  }
  static createQuestStateEqualCondition(t, e, i, s, a) {
    QuestStateEqualCondition.startQuestStateEqualCondition(t);
    QuestStateEqualCondition.addType(t, e);
    QuestStateEqualCondition.addQuestId(t, i);
    QuestStateEqualCondition.addState(t, s);
    QuestStateEqualCondition.addCompare(t, a);
    return QuestStateEqualCondition.endQuestStateEqualCondition(t);
  }
}
exports.QuestStateEqualCondition = QuestStateEqualCondition;
//# sourceMappingURL=quest-state-equal-condition.js.map