"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityCustomAudioComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_ak_event_type_js_1 = require("../fb-component/union-ak-event-type.js");
const union_audio_control_type_js_1 = require("../fb-component/union-audio-control-type.js");
class EntityCustomAudioComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsEntityCustomAudioComponent(t, o) {
    return (o || new EntityCustomAudioComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityCustomAudioComponent(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new EntityCustomAudioComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  akEventTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_ak_event_type_js_1.UnionAkEventType.NONE;
    }
  }
  akEventType(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    if (o) {
      return this.bb.__union(t, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  audioRangeType(t) {
    var o = this.bb.__offset(this.bb_pos, 10);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  audioControlTypeType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_audio_control_type_js_1.UnionAudioControlType.NONE;
    }
  }
  audioControlType(t) {
    var o = this.bb.__offset(this.bb_pos, 14);
    if (o) {
      return this.bb.__union(t, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  static startEntityCustomAudioComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addAkEventTypeType(t, o) {
    t.addFieldInt8(1, o, union_ak_event_type_js_1.UnionAkEventType.NONE);
  }
  static addAkEventType(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static addAudioRangeType(t, o) {
    t.addFieldOffset(3, o, 0);
  }
  static addAudioControlTypeType(t, o) {
    t.addFieldInt8(4, o, union_audio_control_type_js_1.UnionAudioControlType.NONE);
  }
  static addAudioControlType(t, o) {
    t.addFieldOffset(5, o, 0);
  }
  static endEntityCustomAudioComponent(t) {
    return t.endObject();
  }
  static createEntityCustomAudioComponent(t, o, i, n, e, s, u) {
    EntityCustomAudioComponent.startEntityCustomAudioComponent(t);
    EntityCustomAudioComponent.addDisabled(t, o);
    EntityCustomAudioComponent.addAkEventTypeType(t, i);
    EntityCustomAudioComponent.addAkEventType(t, n);
    EntityCustomAudioComponent.addAudioRangeType(t, e);
    EntityCustomAudioComponent.addAudioControlTypeType(t, s);
    EntityCustomAudioComponent.addAudioControlType(t, u);
    return EntityCustomAudioComponent.endEntityCustomAudioComponent(t);
  }
}
exports.EntityCustomAudioComponent = EntityCustomAudioComponent;
//# sourceMappingURL=entity-custom-audio-component.js.map