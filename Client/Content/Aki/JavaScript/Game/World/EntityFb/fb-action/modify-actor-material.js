"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModifyActorMaterial = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_modify_actor_material_type_js_1 = require("../fb-action/union-modify-actor-material-type.js");
const actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class ModifyActorMaterial {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsModifyActorMaterial(t, r) {
    return (r || new ModifyActorMaterial()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsModifyActorMaterial(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ModifyActorMaterial()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  actorRefs(t, r) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (r || new actor_ref_js_1.ActorRef()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actorRefsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_modify_actor_material_type_js_1.UnionModifyActorMaterialType.NONE;
    }
  }
  config(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.__union(t, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  static startModifyActorMaterial(t) {
    t.startObject(3);
  }
  static addActorRefs(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static createActorRefsVector(r, i) {
    r.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      r.addOffset(i[t]);
    }
    return r.endVector();
  }
  static startActorRefsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static addConfigType(t, r) {
    t.addFieldInt8(1, r, union_modify_actor_material_type_js_1.UnionModifyActorMaterialType.NONE);
  }
  static addConfig(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endModifyActorMaterial(t) {
    return t.endObject();
  }
  static createModifyActorMaterial(t, r, i, e) {
    ModifyActorMaterial.startModifyActorMaterial(t);
    ModifyActorMaterial.addActorRefs(t, r);
    ModifyActorMaterial.addConfigType(t, i);
    ModifyActorMaterial.addConfig(t, e);
    return ModifyActorMaterial.endModifyActorMaterial(t);
  }
}
exports.ModifyActorMaterial = ModifyActorMaterial;
//# sourceMappingURL=modify-actor-material.js.map