"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureCollectionLevel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FeatureCollectionLevel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsFeatureCollectionLevel(e, t) {
    return (t || new FeatureCollectionLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsFeatureCollectionLevel(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FeatureCollectionLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  id() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  level() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startFeatureCollectionLevel(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addLevel(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endFeatureCollectionLevel(e) {
    return e.endObject();
  }
  static createFeatureCollectionLevel(e, t, i, l, r) {
    FeatureCollectionLevel.startFeatureCollectionLevel(e);
    FeatureCollectionLevel.addType(e, t);
    FeatureCollectionLevel.addId(e, i);
    FeatureCollectionLevel.addCompare(e, l);
    FeatureCollectionLevel.addLevel(e, r);
    return FeatureCollectionLevel.endFeatureCollectionLevel(e);
  }
}
exports.FeatureCollectionLevel = FeatureCollectionLevel;
//# sourceMappingURL=feature-collection-level.js.map