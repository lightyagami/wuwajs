"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiAlertNotifyComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const extra_ai_alert_js_1 = require("../fb-component/extra-ai-alert.js");
class AiAlertNotifyComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsAiAlertNotifyComponent(t, i) {
    return (i || new AiAlertNotifyComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAiAlertNotifyComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new AiAlertNotifyComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  extraAiAlert(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new extra_ai_alert_js_1.ExtraAiAlert()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  excludeEntities(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  excludeEntitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  excludeEntitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  alertSound(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startAiAlertNotifyComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addExtraAiAlert(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addExcludeEntities(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createExcludeEntitiesVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addInt32(e[t]);
    }
    return i.endVector();
  }
  static startExcludeEntitiesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addAlertSound(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endAiAlertNotifyComponent(t) {
    return t.endObject();
  }
}
exports.AiAlertNotifyComponent = AiAlertNotifyComponent;
//# sourceMappingURL=ai-alert-notify-component.js.map