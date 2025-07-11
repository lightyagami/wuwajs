"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetFlowTemplate = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const camera_pos_and_rot_js_1 = require("../fb-action/camera-pos-and-rot.js");
const camera_setting_js_1 = require("../fb-action/camera-setting.js");
const flow_actor_index_data_js_1 = require("../fb-action/flow-actor-index-data.js");
const flow_template_mode_js_1 = require("../fb-action/flow-template-mode.js");
const pos_and_rot_js_1 = require("../fb-action/pos-and-rot.js");
const set_camera_anim_js_1 = require("../fb-action/set-camera-anim.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class SetFlowTemplate {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetFlowTemplate(t, e) {
    return (e || new SetFlowTemplate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetFlowTemplate(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetFlowTemplate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  folded() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  templateMode(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new flow_template_mode_js_1.FlowTemplateMode()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  targetPos(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new pos_and_rot_js_1.PosAndRot()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  cameraAnim(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new set_camera_anim_js_1.SetCameraAnim()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  cameraOffset(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  cameraRotate(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  cameraPosAndRot(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    if (e) {
      return (t || new camera_pos_and_rot_js_1.CameraPosAndRot()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  cameraSetting(t) {
    var e = this.bb.__offset(this.bb_pos, 18);
    if (e) {
      return (t || new camera_setting_js_1.CameraSetting()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  actorIndexArray(t, e) {
    var a = this.bb.__offset(this.bb_pos, 20);
    if (a) {
      return (e || new flow_actor_index_data_js_1.FlowActorIndexData()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + a) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actorIndexArrayLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 22);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSetFlowTemplate(t) {
    t.startObject(10);
  }
  static addFolded(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addTemplateMode(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addTargetPos(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addCameraAnim(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addCameraOffset(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addCameraRotate(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addCameraPosAndRot(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static addCameraSetting(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static addActorIndexArray(t, e) {
    t.addFieldOffset(8, e, 0);
  }
  static createActorIndexArrayVector(e, a) {
    e.startVector(4, a.length, 4);
    for (let t = a.length - 1; t >= 0; t--) {
      e.addOffset(a[t]);
    }
    return e.endVector();
  }
  static startActorIndexArrayVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addDelayTime(t, e) {
    t.addFieldFloat32(9, e, 0);
  }
  static endSetFlowTemplate(t) {
    return t.endObject();
  }
}
exports.SetFlowTemplate = SetFlowTemplate;
//# sourceMappingURL=set-flow-template.js.map