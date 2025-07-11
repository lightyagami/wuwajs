"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalModel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_animal_model_type_js_1 = require("../fb-component/union-animal-model-type.js");
class AnimalModel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsAnimalModel(t, i) {
    return (i || new AnimalModel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAnimalModel(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new AnimalModel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  blueprintPath(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  animalModelType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_animal_model_type_js_1.UnionAnimalModelType.NONE;
    }
  }
  animalModel(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  abp(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startAnimalModel(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBlueprintPath(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addAnimalModelType(t, i) {
    t.addFieldInt8(2, i, union_animal_model_type_js_1.UnionAnimalModelType.NONE);
  }
  static addAnimalModel(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addAbp(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endAnimalModel(t) {
    return t.endObject();
  }
  static createAnimalModel(t, i, e, a, l, s) {
    AnimalModel.startAnimalModel(t);
    AnimalModel.addType(t, i);
    AnimalModel.addBlueprintPath(t, e);
    AnimalModel.addAnimalModelType(t, a);
    AnimalModel.addAnimalModel(t, l);
    AnimalModel.addAbp(t, s);
    return AnimalModel.endAnimalModel(t);
  }
}
exports.AnimalModel = AnimalModel;
//# sourceMappingURL=animal-model.js.map