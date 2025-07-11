"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeamReceiveComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class BeamReceiveComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBeamReceiveComponent(t, e) {
    return (e || new BeamReceiveComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBeamReceiveComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new BeamReceiveComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  beginActions(t, e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (e || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  beginActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  completeActions(t, e) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (e || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  completeActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  stopActions(t, e) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (e || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  stopActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startBeamReceiveComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addDuration(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addBeginActions(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createBeginActionsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startBeginActionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addCompleteActions(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createCompleteActionsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startCompleteActionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addStopActions(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createStopActionsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startStopActionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endBeamReceiveComponent(t) {
    return t.endObject();
  }
  static createBeamReceiveComponent(t, e, i, s, o, n) {
    BeamReceiveComponent.startBeamReceiveComponent(t);
    BeamReceiveComponent.addDisabled(t, e);
    BeamReceiveComponent.addDuration(t, i);
    BeamReceiveComponent.addBeginActions(t, s);
    BeamReceiveComponent.addCompleteActions(t, o);
    BeamReceiveComponent.addStopActions(t, n);
    return BeamReceiveComponent.endBeamReceiveComponent(t);
  }
}
exports.BeamReceiveComponent = BeamReceiveComponent;
//# sourceMappingURL=beam-receive-component.js.map