"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointGroupByLayer = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const parkour_point_layer_config_js_1 = require("../fb-component/parkour-point-layer-config.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class PointGroupByLayer {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsPointGroupByLayer(t, r) {
    return (r || new PointGroupByLayer()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPointGroupByLayer(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new PointGroupByLayer()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  space(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + r), this.bb);
    } else {
      return undefined;
    }
  }
  layers(t, r) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (r || new parkour_point_layer_config_js_1.ParkourPointLayerConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  layersLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPointGroupByLayer(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addSpace(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addLayers(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static createLayersVector(r, e) {
    r.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      r.addOffset(e[t]);
    }
    return r.endVector();
  }
  static startLayersVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endPointGroupByLayer(t) {
    return t.endObject();
  }
}
exports.PointGroupByLayer = PointGroupByLayer;
//# sourceMappingURL=point-group-by-layer.js.map