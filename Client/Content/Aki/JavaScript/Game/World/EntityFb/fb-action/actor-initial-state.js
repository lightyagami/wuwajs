"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActorInitialState = void 0;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  actor_initial_montage_js_1 = require("../fb-action/actor-initial-montage.js"),
  actor_look_at_data_js_1 = require("../fb-action/actor-look-at-data.js");
class ActorInitialState {
  constructor() {
    this.bb = void 0, this.bb_pos = 0
  }
  __init(t, i) {
    return this.bb_pos = t, this.bb = i, this
  }
  static getRootAsActorInitialState(t, i) {
    return (i || new ActorInitialState).__init(t.readInt32(t.position()) + t.position(), t)
  }
  static getSizePrefixedRootAsActorInitialState(t, i) {
    return t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH), (i || new ActorInitialState).__init(t.readInt32(t.position()) + t.position(), t)
  }
  initialMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? (t || new actor_initial_montage_js_1.ActorInitialMontage).__init(this.bb.__indirect(this.bb_pos + i), this.bb) : void 0
  }
  initialLookAt(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? (t || new actor_look_at_data_js_1.ActorLookAtData).__init(this.bb.__indirect(this.bb_pos + i), this.bb) : void 0
  }
  initialEffects(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0
  }
  initialEffectsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0
  }
  initialEffectsArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t)) : void 0
  }
  static startActorInitialState(t) {
    t.startObject(3)
  }
  static addInitialMontage(t, i) {
    t.addFieldOffset(0, i, 0)
  }
  static addInitialLookAt(t, i) {
    t.addFieldOffset(1, i, 0)
  }
  static addInitialEffects(t, i) {
    t.addFieldOffset(2, i, 0)
  }
  static createInitialEffectsVector(i, a) {
    i.startVector(4, a.length, 4);
    for (let t = a.length - 1; 0 <= t; t--) i.addInt32(a[t]);
    return i.endVector()
  }
  static startInitialEffectsVector(t, i) {
    t.startVector(4, i, 4)
  }
  static endActorInitialState(t) {
    return t.endObject()
  }
}
exports.ActorInitialState = ActorInitialState;
//# sourceMappingURL=actor-initial-state.js.map