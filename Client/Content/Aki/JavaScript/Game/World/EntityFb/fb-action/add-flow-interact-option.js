"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddFlowInteractOption = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const interact_option_js_1 = require("../fb-action/interact-option.js");
class AddFlowInteractOption {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsAddFlowInteractOption(t, i) {
    return (i || new AddFlowInteractOption()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAddFlowInteractOption(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new AddFlowInteractOption()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  option(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new interact_option_js_1.InteractOption()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  delayRemoveByQuestEnd() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startAddFlowInteractOption(t) {
    t.startObject(3);
  }
  static addOption(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addDelayRemoveByQuestEnd(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endAddFlowInteractOption(t) {
    return t.endObject();
  }
  static createAddFlowInteractOption(t, i, e, n) {
    AddFlowInteractOption.startAddFlowInteractOption(t);
    AddFlowInteractOption.addOption(t, i);
    AddFlowInteractOption.addEntityId(t, e);
    AddFlowInteractOption.addDelayRemoveByQuestEnd(t, n);
    return AddFlowInteractOption.endAddFlowInteractOption(t);
  }
}
exports.AddFlowInteractOption = AddFlowInteractOption;
//# sourceMappingURL=add-flow-interact-option.js.map