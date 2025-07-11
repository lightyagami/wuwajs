"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshNpcModel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MeshNpcModel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsMeshNpcModel(e, t) {
    return (t || new MeshNpcModel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsMeshNpcModel(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new MeshNpcModel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  mesh(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startMeshNpcModel(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMesh(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endMeshNpcModel(e) {
    return e.endObject();
  }
  static createMeshNpcModel(e, t, s) {
    MeshNpcModel.startMeshNpcModel(e);
    MeshNpcModel.addType(e, t);
    MeshNpcModel.addMesh(e, s);
    return MeshNpcModel.endMeshNpcModel(e);
  }
}
exports.MeshNpcModel = MeshNpcModel;
//# sourceMappingURL=mesh-npc-model.js.map