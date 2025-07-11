"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AirWallSpawnerComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class AirWallSpawnerComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsAirWallSpawnerComponent(t, r) {
    return (r || new AirWallSpawnerComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAirWallSpawnerComponent(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new AirWallSpawnerComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  splineEntity() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  wallName(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  thickness() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  height() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  biasDirection() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isExtend() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  hasCover() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  wallActorsRef(t, r) {
    var e = this.bb.__offset(this.bb_pos, 20);
    if (e) {
      return (r || new actor_ref_js_1.ActorRef()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  wallActorsRefLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startAirWallSpawnerComponent(t) {
    t.startObject(9);
  }
  static addDisabled(t, r) {
    t.addFieldInt8(0, +r, 0);
  }
  static addSplineEntity(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static addWallName(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static addThickness(t, r) {
    t.addFieldFloat32(3, r, 0);
  }
  static addHeight(t, r) {
    t.addFieldFloat32(4, r, 0);
  }
  static addBiasDirection(t, r) {
    t.addFieldInt8(5, r, 0);
  }
  static addIsExtend(t, r) {
    t.addFieldInt8(6, +r, 0);
  }
  static addHasCover(t, r) {
    t.addFieldInt8(7, +r, 0);
  }
  static addWallActorsRef(t, r) {
    t.addFieldOffset(8, r, 0);
  }
  static createWallActorsRefVector(r, e) {
    r.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      r.addOffset(e[t]);
    }
    return r.endVector();
  }
  static startWallActorsRefVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endAirWallSpawnerComponent(t) {
    return t.endObject();
  }
  static createAirWallSpawnerComponent(t, r, e, i, a, s, n, o, l, h) {
    AirWallSpawnerComponent.startAirWallSpawnerComponent(t);
    AirWallSpawnerComponent.addDisabled(t, r);
    AirWallSpawnerComponent.addSplineEntity(t, e);
    AirWallSpawnerComponent.addWallName(t, i);
    AirWallSpawnerComponent.addThickness(t, a);
    AirWallSpawnerComponent.addHeight(t, s);
    AirWallSpawnerComponent.addBiasDirection(t, n);
    AirWallSpawnerComponent.addIsExtend(t, o);
    AirWallSpawnerComponent.addHasCover(t, l);
    AirWallSpawnerComponent.addWallActorsRef(t, h);
    return AirWallSpawnerComponent.endAirWallSpawnerComponent(t);
  }
}
exports.AirWallSpawnerComponent = AirWallSpawnerComponent;
//# sourceMappingURL=air-wall-spawner-component.js.map