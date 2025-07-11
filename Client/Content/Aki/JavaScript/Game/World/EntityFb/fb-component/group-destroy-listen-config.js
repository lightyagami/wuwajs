"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupDestroyListenConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class GroupDestroyListenConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsGroupDestroyListenConfig(t, i) {
    return (i || new GroupDestroyListenConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGroupDestroyListenConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new GroupDestroyListenConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  groupType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  onTriggerActions(t, i) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  onTriggerActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startGroupDestroyListenConfig(t) {
    t.startObject(2);
  }
  static addGroupType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addOnTriggerActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createOnTriggerActionsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addOffset(r[t]);
    }
    return i.endVector();
  }
  static startOnTriggerActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endGroupDestroyListenConfig(t) {
    return t.endObject();
  }
  static createGroupDestroyListenConfig(t, i, r) {
    GroupDestroyListenConfig.startGroupDestroyListenConfig(t);
    GroupDestroyListenConfig.addGroupType(t, i);
    GroupDestroyListenConfig.addOnTriggerActions(t, r);
    return GroupDestroyListenConfig.endGroupDestroyListenConfig(t);
  }
}
exports.GroupDestroyListenConfig = GroupDestroyListenConfig;
//# sourceMappingURL=group-destroy-listen-config.js.map