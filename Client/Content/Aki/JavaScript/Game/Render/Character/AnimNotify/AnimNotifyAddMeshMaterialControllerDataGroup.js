"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TsEffectActor_1 = require("../../../Effect/TsEffectActor");
const GlobalData_1 = require("../../../GlobalData");
class MaterialControllerData {
  constructor() {
    this.HandleId = -1;
    this.RenderActor = undefined;
    this.CharRenderingComponent = undefined;
  }
}
const materialControllerStateHandleMap = new Map();
class AnimNotifyAddMeshMaterialControllerDataGroup extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.MaterialAssetData = undefined;
    this.HideMeshAfterPlay = false;
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    if (GlobalData_1.GlobalData.World) {
      if (UE.KismetSystemLibrary.IsValid(e)) {
        e.SetHiddenInGame(false);
        if (this.IsAllValid(e, r)) {
          var a = e.GetOwner();
          if (a instanceof UE.TsBaseCharacter_C && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("RenderCharacter", 25, "材质控制器不应该在角色蓝图上使用此动画通知，请检查动画", ["Actor", e?.GetOwner()?.GetName()], ["动画", r?.GetName()], ["材质控制器", this.MaterialAssetData?.GetName()]);
          }
          var o = new MaterialControllerData();
          if (a instanceof TsEffectActor_1.default || a?.IsA(UE.EffectSystemActor.StaticClass())) {
            o.CharRenderingComponent = a.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
            if (!o.CharRenderingComponent) {
              o.CharRenderingComponent = a.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, new UE.Transform(), false);
              o.CharRenderingComponent.Init(8);
            }
          }
          if (!o.CharRenderingComponent) {
            o.RenderActor = UE.KuroRenderingRuntimeBPPluginBPLibrary.D_SpawnActorFromClass(e, UE.BP_MaterialControllerRenderActor_C.StaticClass(), a.D_GetTransform());
            o.RenderActor.RefActor = a;
            o.CharRenderingComponent = o.RenderActor.CharRenderingComponent;
            o.CharRenderingComponent.Init(7);
            o.CharRenderingComponent.AddComponentByCase(0, e);
          }
          o.CharRenderingComponent.SetLogicOwner(a);
          o.HandleId = o.CharRenderingComponent.AddMaterialControllerDataGroup(this.MaterialAssetData);
          let t = materialControllerStateHandleMap.get(e);
          if (!t) {
            t = new Map();
            materialControllerStateHandleMap.set(e, t);
          }
          t.set(this, o);
          return true;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "错误：动画Mesh不合法", ["Actor", e?.GetOwner()], ["动画", r?.GetName()]);
      }
    }
    return false;
  }
  IsAllValid(t, e) {
    if (UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)) {
      return !!t && !!UE.KismetSystemLibrary.IsValid(t) || (Log_1.Log.CheckError() && Log_1.Log.Error("RenderCharacter", 13, "错误：动画Mesh不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", e?.GetName()]), false);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "错误：特效DA不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", e?.GetName()]);
      }
      return false;
    }
  }
  K2_NotifyEnd(t, e) {
    var r;
    var a;
    return !!GlobalData_1.GlobalData.World && ((r = materialControllerStateHandleMap.get(t)) && (a = r.get(this)) && (r.delete(this), r.size || materialControllerStateHandleMap.delete(t), a.CharRenderingComponent && a.HandleId >= 0 && a.CharRenderingComponent.RemoveMaterialControllerDataGroup(a.HandleId), a.RenderActor && (a.CharRenderingComponent.Destroy(), a.RenderActor.K2_DestroyActor()), this.HideMeshAfterPlay) && t.SetHiddenInGame(true), true);
  }
  GetNotifyName() {
    var t = this.MaterialAssetData.GetName();
    if (t) {
      return "召唤物/NPC材质控制器组:" + UE.BlueprintPathsLibrary.GetBaseFilename(t, true);
    } else {
      return "召唤物/NPC材质控制器组";
    }
  }
}
exports.default = AnimNotifyAddMeshMaterialControllerDataGroup;
//# sourceMappingURL=AnimNotifyAddMeshMaterialControllerDataGroup.js.map