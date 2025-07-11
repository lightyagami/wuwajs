"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DelayRemoveAfterSkillFinish = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DelayRemoveAfterSkillFinish {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsDelayRemoveAfterSkillFinish(e, i) {
    return (i || new DelayRemoveAfterSkillFinish()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsDelayRemoveAfterSkillFinish(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new DelayRemoveAfterSkillFinish()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  static startDelayRemoveAfterSkillFinish(e) {
    e.startObject(1);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static endDelayRemoveAfterSkillFinish(e) {
    return e.endObject();
  }
  static createDelayRemoveAfterSkillFinish(e, i) {
    DelayRemoveAfterSkillFinish.startDelayRemoveAfterSkillFinish(e);
    DelayRemoveAfterSkillFinish.addType(e, i);
    return DelayRemoveAfterSkillFinish.endDelayRemoveAfterSkillFinish(e);
  }
}
exports.DelayRemoveAfterSkillFinish = DelayRemoveAfterSkillFinish;
//# sourceMappingURL=delay-remove-after-skill-finish.js.map