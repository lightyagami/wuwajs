"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListenEntitySelfEventCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ListenEntitySelfEventCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsListenEntitySelfEventCondition(t, i) {
    return (i || new ListenEntitySelfEventCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsListenEntitySelfEventCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ListenEntitySelfEventCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  eventKey(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  resetAfterConditionMet() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startListenEntitySelfEventCondition(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEventKey(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addResetAfterConditionMet(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endListenEntitySelfEventCondition(t) {
    return t.endObject();
  }
  static createListenEntitySelfEventCondition(t, i, n, e) {
    ListenEntitySelfEventCondition.startListenEntitySelfEventCondition(t);
    ListenEntitySelfEventCondition.addType(t, i);
    ListenEntitySelfEventCondition.addEventKey(t, n);
    ListenEntitySelfEventCondition.addResetAfterConditionMet(t, e);
    return ListenEntitySelfEventCondition.endListenEntitySelfEventCondition(t);
  }
}
exports.ListenEntitySelfEventCondition = ListenEntitySelfEventCondition;
//# sourceMappingURL=listen-entity-self-event-condition.js.map