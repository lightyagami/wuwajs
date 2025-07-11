"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
class TsAnimNotifyStateMeshVisibility extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.HideMeshName = "";
    this.Visibility = true;
    this.EntityMeshMap = undefined;
  }
  Constructor() {
    this.EntityMeshMap = undefined;
  }
  K2_NotifyBegin(t, i, e) {
    this.EntityMeshMap ||= new Map();
    var t = t.GetOwner();
    var s = t.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    let r = false;
    let o = undefined;
    for (let t = 0; t < s.Num(); t++) {
      if (s.Get(t).GetName() === this.HideMeshName) {
        o = s.Get(t);
        r = true;
        break;
      }
    }
    var h = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(t);
    if (h !== 1 && h !== 3) {
      if (o) {
        o.SetVisibility(this.Visibility);
      }
    } else {
      h = t;
      t = h.GetEntityId();
      if (!this.EntityMeshMap.has(t)) {
        this.EntityMeshMap.set(t, new Array());
      }
      if (!h) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Render", 4, "TsAnimNotifyStateHideMesh,该Actor不是一个实体");
        }
        return false;
      }
      if (!r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Render", 4, "TsAnimNotifyStateHideMesh无法找到Mesh", ["填入Mesh名", this.HideMeshName]);
        }
        return false;
      }
      this.EntityMeshMap.get(t).push(o);
      o.SetVisibility(this.Visibility);
    }
    return true;
  }
  K2_NotifyEnd(t, i) {
    var t = t.GetOwner();
    var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(t);
    if (e !== 1 && e !== 3) {
      var s = t.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      let i = undefined;
      for (let t = 0; t < s.Num(); t++) {
        if (s.Get(t).GetName() === this.HideMeshName) {
          i = s.Get(t);
          break;
        }
      }
      if (i) {
        i.SetVisibility(!this.Visibility);
      }
    } else {
      e = t.GetEntityId();
      if (this.EntityMeshMap.has(e) && (t = this.EntityMeshMap.get(e).find(t => t.GetName() === this.HideMeshName))) {
        t.SetVisibility(!this.Visibility);
      }
    }
    return true;
  }
  GetNotifyName() {
    return "控制角色Mesh显隐";
  }
}
exports.default = TsAnimNotifyStateMeshVisibility;
//# sourceMappingURL=TsAnimNotifyStateMeshVisibility.js.map