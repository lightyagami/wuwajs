"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionListenerComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condtion_listener_js_1 = require("../fb-component/condtion-listener.js");
class ConditionListenerComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsConditionListenerComponent(t, e) {
    return (e || new ConditionListenerComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConditionListenerComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ConditionListenerComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  listeners(t, e) {
    var n = this.bb.__offset(this.bb_pos, 6);
    if (n) {
      return (e || new condtion_listener_js_1.CondtionListener()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  listenersLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startConditionListenerComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addListeners(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createListenersVector(e, n) {
    e.startVector(4, n.length, 4);
    for (let t = n.length - 1; t >= 0; t--) {
      e.addOffset(n[t]);
    }
    return e.endVector();
  }
  static startListenersVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endConditionListenerComponent(t) {
    return t.endObject();
  }
  static createConditionListenerComponent(t, e, n) {
    ConditionListenerComponent.startConditionListenerComponent(t);
    ConditionListenerComponent.addDisabled(t, e);
    ConditionListenerComponent.addListeners(t, n);
    return ConditionListenerComponent.endConditionListenerComponent(t);
  }
}
exports.ConditionListenerComponent = ConditionListenerComponent;
//# sourceMappingURL=condition-listener-component.js.map