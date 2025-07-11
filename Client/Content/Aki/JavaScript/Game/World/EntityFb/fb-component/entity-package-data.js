"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityPackageData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_package_node_js_1 = require("../fb-component/entity-package-node.js");
class EntityPackageData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsEntityPackageData(t, a) {
    return (a || new EntityPackageData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityPackageData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new EntityPackageData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  packagedLevelId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  packageEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  packageTree(t, a) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (a || new entity_package_node_js_1.EntityPackageNode()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  packageTreeLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEntityPackageData(t) {
    t.startObject(3);
  }
  static addPackagedLevelId(t, a) {
    t.addFieldInt32(0, a, 0);
  }
  static addPackageEntityId(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static addPackageTree(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static createPackageTreeVector(a, e) {
    a.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      a.addOffset(e[t]);
    }
    return a.endVector();
  }
  static startPackageTreeVector(t, a) {
    t.startVector(4, a, 4);
  }
  static endEntityPackageData(t) {
    return t.endObject();
  }
  static createEntityPackageData(t, a, e, i) {
    EntityPackageData.startEntityPackageData(t);
    EntityPackageData.addPackagedLevelId(t, a);
    EntityPackageData.addPackageEntityId(t, e);
    EntityPackageData.addPackageTree(t, i);
    return EntityPackageData.endEntityPackageData(t);
  }
}
exports.EntityPackageData = EntityPackageData;
//# sourceMappingURL=entity-package-data.js.map