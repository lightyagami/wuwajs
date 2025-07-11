"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
class MaterialControllerData {
  constructor() {
    this.HandleId = -1;
    this.CharRenderingComponent = undefined;
  }
}
const materialControllerStateHandleMap = new Map();
class AnimNotifyStateAddMaterialControllerDataGroup extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.MaterialAssetData = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(e, a, t) {
    let o = -1;
    if (this.IsAllValid(e, a)) {
      a = e.GetOwner();
      if (a) {
        let r = undefined;
        if ((a instanceof UE.TsBaseCharacter_C ? (r = a.CharRenderingComponent).CheckInit() || r.Init(a.RenderType) : (r = a.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())) || ((r = a.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, new UE.Transform(), false)).Init(8), r.SetLogicOwner(a)), o = r.AddMaterialControllerDataGroupWithAnimObject(this.MaterialAssetData, e)) >= 0) {
          let t = materialControllerStateHandleMap.get(e);
          if (!t) {
            t = new Map();
            materialControllerStateHandleMap.set(e, t);
          }
          a = new MaterialControllerData();
          a.HandleId = o;
          a.CharRenderingComponent = r;
          t.set(this, a);
          return true;
        }
      }
    }
    return false;
  }
  K2_NotifyEnd(t, r) {
    var e = materialControllerStateHandleMap.get(t);
    if (!e) {
      return true;
    }
    var a = e.get(this);
    if (!a) {
      return true;
    }
    e.delete(this);
    if (!e.size) {
      materialControllerStateHandleMap.delete(t);
    }
    try {
      a.CharRenderingComponent?.RemoveMaterialControllerDataGroupWithEnding(a.HandleId);
      return true;
    } catch {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RenderCharacter", 25, "AnimNotifyStateAddMaterialControllerData移除材质控制器特效失败", ["Actor", t?.GetOwner()?.GetName()], ["动画", r?.GetName()], ["handleId", a.HandleId]);
      }
    }
    return false;
  }
  IsAllValid(t, r) {
    if (UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)) {
      if (t && UE.KismetSystemLibrary.IsValid(t)) {
        return !!UE.KismetSystemLibrary.IsValid(t.GetOwner()) || (Log_1.Log.CheckError() && Log_1.Log.Error("RenderCharacter", 13, "错误：动画Owner不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", r?.GetName()]), false);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 13, "错误：动画Mesh不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", r?.GetName()]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "错误：特效DA不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", r?.GetName()]);
      }
      return false;
    }
  }
  GetNotifyName() {
    var t = this.MaterialAssetData.GetName();
    if (t) {
      return "材质控制器组:" + UE.BlueprintPathsLibrary.GetBaseFilename(t, true);
    } else {
      return "材质控制器组";
    }
  }
}
exports.default = AnimNotifyStateAddMaterialControllerDataGroup;
//# sourceMappingURL=AnimNotifyStateAddMaterialControllerDataGroup.js.map