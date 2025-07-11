"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const TsUiSceneRoleActor_1 = require("../../../Module/UiComponent/TsUiSceneRoleActor");
class AnimNotifyAddMaterialControllerData extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.MaterialAssetData = undefined;
    this.RemoveWhenRevive = false;
  }
  Constructor() {}
  IsAllValid(t, e) {
    if (UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)) {
      if (t && UE.KismetSystemLibrary.IsValid(t)) {
        if (UE.KismetSystemLibrary.IsValid(t.GetOwner())) {
          return this.MaterialAssetData.DataType === 0 || (Log_1.Log.CheckError() && Log_1.Log.Error("RenderCharacter", 13, "错误：特效DA不能是Runtime类型,Runtime类型请使用AnimNotifyStateAddMaterialControllerData", ["Actor", t?.GetOwner()?.GetName()], ["动画", e?.GetName()], ["DA", this.MaterialAssetData?.GetName()]), false);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderCharacter", 13, "错误：动画Owner不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", e?.GetName()]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 13, "错误：动画Mesh不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", e?.GetName()]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "错误：特效DA不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", e?.GetName()]);
      }
      return false;
    }
  }
  K2_Notify(e, r) {
    if (this.IsAllValid(e, r)) {
      var o;
      var i;
      var r = e.GetOwner();
      if (r) {
        if (r instanceof UE.TsBaseCharacter_C) {
          if (!r.CharRenderingComponent.CheckInit()) {
            r.CharRenderingComponent.Init(r.RenderType);
          }
          if ((i = (o = r.CharRenderingComponent.AddMaterialControllerDataWithAnimObject(this.MaterialAssetData, e, undefined)) >= 0) && this.RemoveWhenRevive) {
            EntitySystem_1.EntitySystem.GetComponent(r.EntityId, 191)?.AddMaterialHandle(o);
          }
          return i;
        }
        if (r instanceof TsUiSceneRoleActor_1.default) {
          return r.Model.CheckGetComponent(5).AddRenderingMaterialByData(this.MaterialAssetData) >= 0;
        }
        let t = r.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
        if (!t) {
          (t = r.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, new UE.Transform(), false)).Init(8);
          t.SetLogicOwner(r);
        }
        t.AddMaterialControllerDataWithAnimObject(this.MaterialAssetData, e, undefined);
      }
    }
    return false;
  }
  GetNotifyName() {
    var t = this.MaterialAssetData.GetName();
    if (t) {
      return "材质控制器:" + UE.BlueprintPathsLibrary.GetBaseFilename(t, true);
    } else {
      return "材质控制器";
    }
  }
}
exports.default = AnimNotifyAddMaterialControllerData;
//# sourceMappingURL=AnimNotifyAddMaterialControllerData.js.map