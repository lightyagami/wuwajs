"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityStateAudioComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_state_audio_config_js_1 = require("../fb-component/entity-state-audio-config.js");
const union_ak_event_type_js_1 = require("../fb-component/union-ak-event-type.js");
class EntityStateAudioComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEntityStateAudioComponent(t, e) {
    return (e || new EntityStateAudioComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityStateAudioComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EntityStateAudioComponent()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  audioRangeType(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  config(t, e) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (e || new entity_state_audio_config_js_1.EntityStateAudioConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  configLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEntityStateAudioComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addAkEventTypeType(t, e) {
    t.addFieldInt8(1, e, union_ak_event_type_js_1.UnionAkEventType.NONE);
  }
  static addAkEventType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addAudioRangeType(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addConfig(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createConfigVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startConfigVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endEntityStateAudioComponent(t) {
    return t.endObject();
  }
  static createEntityStateAudioComponent(t, e, i, n, o, s) {
    EntityStateAudioComponent.startEntityStateAudioComponent(t);
    EntityStateAudioComponent.addDisabled(t, e);
    EntityStateAudioComponent.addAkEventTypeType(t, i);
    EntityStateAudioComponent.addAkEventType(t, n);
    EntityStateAudioComponent.addAudioRangeType(t, o);
    EntityStateAudioComponent.addConfig(t, s);
    return EntityStateAudioComponent.endEntityStateAudioComponent(t);
  }
}
exports.EntityStateAudioComponent = EntityStateAudioComponent;
//# sourceMappingURL=entity-state-audio-component.js.map