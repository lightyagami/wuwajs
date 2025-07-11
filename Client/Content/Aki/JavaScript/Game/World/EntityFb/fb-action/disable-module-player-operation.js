"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableModulePlayerOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_camera_operation_js_1 = require("../fb-action/union-camera-operation.js");
const union_move_operation_js_1 = require("../fb-action/union-move-operation.js");
const union_scene_interaction_operation_js_1 = require("../fb-action/union-scene-interaction-operation.js");
const union_skill_operation_js_1 = require("../fb-action/union-skill-operation.js");
const union_ui_operation_js_1 = require("../fb-action/union-ui-operation.js");
class DisableModulePlayerOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, e) {
    this.bb_pos = i;
    this.bb = e;
    return this;
  }
  static getRootAsDisableModulePlayerOperation(i, e) {
    return (e || new DisableModulePlayerOperation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsDisableModulePlayerOperation(i, e) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new DisableModulePlayerOperation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, i);
    } else {
      return undefined;
    }
  }
  moveOptionType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_move_operation_js_1.UnionMoveOperation.NONE;
    }
  }
  moveOption(i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(i, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  skillOptionType() {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_skill_operation_js_1.UnionSkillOperation.NONE;
    }
  }
  skillOption(i) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__union(i, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  cameraOptionType() {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_camera_operation_js_1.UnionCameraOperation.NONE;
    }
  }
  cameraOption(i) {
    var e = this.bb.__offset(this.bb_pos, 16);
    if (e) {
      return this.bb.__union(i, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  uiOptionType() {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_ui_operation_js_1.UnionUiOperation.NONE;
    }
  }
  uiOption(i) {
    var e = this.bb.__offset(this.bb_pos, 20);
    if (e) {
      return this.bb.__union(i, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  sceneInteractionOptionType() {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_scene_interaction_operation_js_1.UnionSceneInteractionOperation.NONE;
    }
  }
  sceneInteractionOption(i) {
    var e = this.bb.__offset(this.bb_pos, 24);
    if (e) {
      return this.bb.__union(i, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startDisableModulePlayerOperation(i) {
    i.startObject(11);
  }
  static addType(i, e) {
    i.addFieldOffset(0, e, 0);
  }
  static addMoveOptionType(i, e) {
    i.addFieldInt8(1, e, union_move_operation_js_1.UnionMoveOperation.NONE);
  }
  static addMoveOption(i, e) {
    i.addFieldOffset(2, e, 0);
  }
  static addSkillOptionType(i, e) {
    i.addFieldInt8(3, e, union_skill_operation_js_1.UnionSkillOperation.NONE);
  }
  static addSkillOption(i, e) {
    i.addFieldOffset(4, e, 0);
  }
  static addCameraOptionType(i, e) {
    i.addFieldInt8(5, e, union_camera_operation_js_1.UnionCameraOperation.NONE);
  }
  static addCameraOption(i, e) {
    i.addFieldOffset(6, e, 0);
  }
  static addUiOptionType(i, e) {
    i.addFieldInt8(7, e, union_ui_operation_js_1.UnionUiOperation.NONE);
  }
  static addUiOption(i, e) {
    i.addFieldOffset(8, e, 0);
  }
  static addSceneInteractionOptionType(i, e) {
    i.addFieldInt8(9, e, union_scene_interaction_operation_js_1.UnionSceneInteractionOperation.NONE);
  }
  static addSceneInteractionOption(i, e) {
    i.addFieldOffset(10, e, 0);
  }
  static endDisableModulePlayerOperation(i) {
    return i.endObject();
  }
  static createDisableModulePlayerOperation(i, e, t, o, a, n, r, s, l, u, p, _) {
    DisableModulePlayerOperation.startDisableModulePlayerOperation(i);
    DisableModulePlayerOperation.addType(i, e);
    DisableModulePlayerOperation.addMoveOptionType(i, t);
    DisableModulePlayerOperation.addMoveOption(i, o);
    DisableModulePlayerOperation.addSkillOptionType(i, a);
    DisableModulePlayerOperation.addSkillOption(i, n);
    DisableModulePlayerOperation.addCameraOptionType(i, r);
    DisableModulePlayerOperation.addCameraOption(i, s);
    DisableModulePlayerOperation.addUiOptionType(i, l);
    DisableModulePlayerOperation.addUiOption(i, u);
    DisableModulePlayerOperation.addSceneInteractionOptionType(i, p);
    DisableModulePlayerOperation.addSceneInteractionOption(i, _);
    return DisableModulePlayerOperation.endDisableModulePlayerOperation(i);
  }
}
exports.DisableModulePlayerOperation = DisableModulePlayerOperation;
//# sourceMappingURL=disable-module-player-operation.js.map