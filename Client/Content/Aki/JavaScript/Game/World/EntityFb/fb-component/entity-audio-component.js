"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityAudioComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_ak_event_type_js_1 = require("../fb-component/union-ak-event-type.js");
class EntityAudioComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityAudioComponent(t, i) {
    return (i || new EntityAudioComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityAudioComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityAudioComponent()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  audioRangeType(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startEntityAudioComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addAkEventTypeType(t, i) {
    t.addFieldInt8(1, i, union_ak_event_type_js_1.UnionAkEventType.NONE);
  }
  static addAkEventType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addAudioRangeType(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endEntityAudioComponent(t) {
    return t.endObject();
  }
  static createEntityAudioComponent(t, i, n, e, o) {
    EntityAudioComponent.startEntityAudioComponent(t);
    EntityAudioComponent.addDisabled(t, i);
    EntityAudioComponent.addAkEventTypeType(t, n);
    EntityAudioComponent.addAkEventType(t, e);
    EntityAudioComponent.addAudioRangeType(t, o);
    return EntityAudioComponent.endEntityAudioComponent(t);
  }
}
exports.EntityAudioComponent = EntityAudioComponent;
//# sourceMappingURL=entity-audio-component.js.map