"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshAnimalModel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MeshAnimalModel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsMeshAnimalModel(e, t) {
    return (t || new MeshAnimalModel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsMeshAnimalModel(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new MeshAnimalModel()).__init(e.readInt32(e.position()) + e.position(), e);
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
  static startMeshAnimalModel(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMesh(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endMeshAnimalModel(e) {
    return e.endObject();
  }
  static createMeshAnimalModel(e, t, s) {
    MeshAnimalModel.startMeshAnimalModel(e);
    MeshAnimalModel.addType(e, t);
    MeshAnimalModel.addMesh(e, s);
    return MeshAnimalModel.endMeshAnimalModel(e);
  }
}
exports.MeshAnimalModel = MeshAnimalModel;
//# sourceMappingURL=mesh-animal-model.js.map