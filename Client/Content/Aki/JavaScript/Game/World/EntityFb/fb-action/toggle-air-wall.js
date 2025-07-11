"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleAirWall = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_toggle_air_wall_js_1 = require("../fb-action/union-toggle-air-wall.js");
const actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class ToggleAirWall {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsToggleAirWall(t, r) {
    return (r || new ToggleAirWall()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsToggleAirWall(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ToggleAirWall()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_toggle_air_wall_js_1.UnionToggleAirWall.NONE;
    }
  }
  option(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__union(t, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  actorRefs(t, r) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (r || new actor_ref_js_1.ActorRef()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actorRefsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startToggleAirWall(t) {
    t.startObject(3);
  }
  static addOptionType(t, r) {
    t.addFieldInt8(0, r, union_toggle_air_wall_js_1.UnionToggleAirWall.NONE);
  }
  static addOption(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addActorRefs(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static createActorRefsVector(r, e) {
    r.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      r.addOffset(e[t]);
    }
    return r.endVector();
  }
  static startActorRefsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endToggleAirWall(t) {
    return t.endObject();
  }
  static createToggleAirWall(t, r, e, i) {
    ToggleAirWall.startToggleAirWall(t);
    ToggleAirWall.addOptionType(t, r);
    ToggleAirWall.addOption(t, e);
    ToggleAirWall.addActorRefs(t, i);
    return ToggleAirWall.endToggleAirWall(t);
  }
}
exports.ToggleAirWall = ToggleAirWall;
//# sourceMappingURL=toggle-air-wall.js.map