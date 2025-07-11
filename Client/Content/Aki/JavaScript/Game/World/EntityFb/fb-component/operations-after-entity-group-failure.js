"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationsAfterEntityGroupFailure = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class OperationsAfterEntityGroupFailure {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsOperationsAfterEntityGroupFailure(t, r) {
    return (r || new OperationsAfterEntityGroupFailure()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOperationsAfterEntityGroupFailure(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new OperationsAfterEntityGroupFailure()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  isResetState() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actions(t, r) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (r || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startOperationsAfterEntityGroupFailure(t) {
    t.startObject(2);
  }
  static addIsResetState(t, r) {
    t.addFieldInt8(0, +r, 0);
  }
  static addActions(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static createActionsVector(r, i) {
    r.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      r.addOffset(i[t]);
    }
    return r.endVector();
  }
  static startActionsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endOperationsAfterEntityGroupFailure(t) {
    return t.endObject();
  }
  static createOperationsAfterEntityGroupFailure(t, r, i) {
    OperationsAfterEntityGroupFailure.startOperationsAfterEntityGroupFailure(t);
    OperationsAfterEntityGroupFailure.addIsResetState(t, r);
    OperationsAfterEntityGroupFailure.addActions(t, i);
    return OperationsAfterEntityGroupFailure.endOperationsAfterEntityGroupFailure(t);
  }
}
exports.OperationsAfterEntityGroupFailure = OperationsAfterEntityGroupFailure;
//# sourceMappingURL=operations-after-entity-group-failure.js.map