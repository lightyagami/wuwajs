"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateMatrix = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const group_destroy_listen_config_js_1 = require("../fb-component/group-destroy-listen-config.js");
const template_matrix_row_js_1 = require("../fb-component/template-matrix-row.js");
const vector2_js_1 = require("../fb-var/vector2.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class TemplateMatrix {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTemplateMatrix(t, e) {
    return (e || new TemplateMatrix()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTemplateMatrix(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TemplateMatrix()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  matrixSize(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new vector2_js_1.Vector2()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  templateMatrix(t, e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (e || new template_matrix_row_js_1.TemplateMatrixRow()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  templateMatrixLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityInterval(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  groupDestroyListenConfigs(t, e) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (e || new group_destroy_listen_config_js_1.GroupDestroyListenConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  groupDestroyListenConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  onNonGroupEntityDestroy(t, e) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return (e || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  onNonGroupEntityDestroyLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTemplateMatrix(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMatrixSize(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addTemplateMatrix(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createTemplateMatrixVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startTemplateMatrixVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addEntityInterval(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addGroupDestroyListenConfigs(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createGroupDestroyListenConfigsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startGroupDestroyListenConfigsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addOnNonGroupEntityDestroy(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createOnNonGroupEntityDestroyVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startOnNonGroupEntityDestroyVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endTemplateMatrix(t) {
    return t.endObject();
  }
}
exports.TemplateMatrix = TemplateMatrix;
//# sourceMappingURL=template-matrix.js.map