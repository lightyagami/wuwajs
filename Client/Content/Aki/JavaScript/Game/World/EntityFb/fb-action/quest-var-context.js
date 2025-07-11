"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestVarContext = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class QuestVarContext {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsQuestVarContext(t, e) {
    return (e || new QuestVarContext()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsQuestVarContext(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new QuestVarContext()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startQuestVarContext(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endQuestVarContext(t) {
    return t.endObject();
  }
  static createQuestVarContext(t, e, s) {
    QuestVarContext.startQuestVarContext(t);
    QuestVarContext.addType(t, e);
    QuestVarContext.addId(t, s);
    return QuestVarContext.endQuestVarContext(t);
  }
}
exports.QuestVarContext = QuestVarContext;
//# sourceMappingURL=quest-var-context.js.map