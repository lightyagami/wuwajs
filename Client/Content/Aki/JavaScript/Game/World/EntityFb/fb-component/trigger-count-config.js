"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerCountConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TriggerCountConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsTriggerCountConfig(t, r) {
    return (r || new TriggerCountConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTriggerCountConfig(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new TriggerCountConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  triggerCount() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  triggerInterval() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTriggerCountConfig(t) {
    t.startObject(2);
  }
  static addTriggerCount(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addTriggerInterval(t, r) {
    t.addFieldFloat32(1, r, 0);
  }
  static endTriggerCountConfig(t) {
    return t.endObject();
  }
  static createTriggerCountConfig(t, r, i) {
    TriggerCountConfig.startTriggerCountConfig(t);
    TriggerCountConfig.addTriggerCount(t, r);
    TriggerCountConfig.addTriggerInterval(t, i);
    return TriggerCountConfig.endTriggerCountConfig(t);
  }
}
exports.TriggerCountConfig = TriggerCountConfig;
//# sourceMappingURL=trigger-count-config.js.map