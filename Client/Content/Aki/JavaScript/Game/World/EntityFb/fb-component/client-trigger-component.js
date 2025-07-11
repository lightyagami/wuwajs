"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientTriggerComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const trigger_match_config_js_1 = require("../fb-component/trigger-match-config.js");
const triggered_config_js_1 = require("../fb-component/triggered-config.js");
class ClientTriggerComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsClientTriggerComponent(t, i) {
    return (i || new ClientTriggerComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsClientTriggerComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ClientTriggerComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  triggerMatch(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new trigger_match_config_js_1.TriggerMatchConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  onTriggerEnter(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new triggered_config_js_1.TriggeredConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  onTriggerExit(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new triggered_config_js_1.TriggeredConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startClientTriggerComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addTriggerMatch(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addOnTriggerEnter(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addOnTriggerExit(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endClientTriggerComponent(t) {
    return t.endObject();
  }
}
exports.ClientTriggerComponent = ClientTriggerComponent;
//# sourceMappingURL=client-trigger-component.js.map