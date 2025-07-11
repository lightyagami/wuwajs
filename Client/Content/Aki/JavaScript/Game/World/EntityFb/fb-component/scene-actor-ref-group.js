"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneActorRefGroup = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class SceneActorRefGroup {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSceneActorRefGroup(t, e) {
    return (e || new SceneActorRefGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSceneActorRefGroup(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SceneActorRefGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  actions(t, e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (e || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSceneActorRefGroup(t) {
    t.startObject(2);
  }
  static addEntityState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addActions(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createActionsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startActionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSceneActorRefGroup(t) {
    return t.endObject();
  }
  static createSceneActorRefGroup(t, e, r) {
    SceneActorRefGroup.startSceneActorRefGroup(t);
    SceneActorRefGroup.addEntityState(t, e);
    SceneActorRefGroup.addActions(t, r);
    return SceneActorRefGroup.endSceneActorRefGroup(t);
  }
}
exports.SceneActorRefGroup = SceneActorRefGroup;
//# sourceMappingURL=scene-actor-ref-group.js.map