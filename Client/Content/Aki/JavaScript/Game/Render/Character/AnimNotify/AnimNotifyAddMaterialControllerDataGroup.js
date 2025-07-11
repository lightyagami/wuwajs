"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
class AnimNotifyAddMaterialControllerDataGroup extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.MaterialAssetData = undefined;
  }
  Constructor() {}
  IsAllValid(t, e) {
    if (!UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "错误：特效DA不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", e?.GetName()]);
      }
      return false;
    }
    if (!t || !UE.KismetSystemLibrary.IsValid(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "错误：动画Mesh不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", e?.GetName()]);
      }
      return false;
    }
    if (!UE.KismetSystemLibrary.IsValid(t.GetOwner())) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "错误：动画Owner不合法", ["Actor", t?.GetOwner()?.GetName()], ["动画", e?.GetName()]);
      }
      return false;
    }
    for (let r = 0; r < this.MaterialAssetData.DataMap.Num(); r++) {
      if (this.MaterialAssetData.DataMap.GetKey(r).DataType !== 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 13, "错误：DAGroup的每一个子项不能是Runtime类型,Runtime类型请使用AnimNotifyStateAddMaterialControllerDataGroup", ["Actor", t?.GetOwner()?.GetName()], ["动画", e?.GetName()], ["DAGroup", this.MaterialAssetData?.GetName()]);
        }
        return false;
      }
    }
    return true;
  }
  K2_Notify(r, t) {
    if (!this.IsAllValid(r, t)) {
      return false;
    }
    t = r.GetOwner();
    if (t instanceof UE.TsBaseCharacter_C) {
      if (!t.CharRenderingComponent.CheckInit()) {
        t.CharRenderingComponent.Init(t.RenderType);
      }
      const o = t.CharRenderingComponent.AddMaterialControllerDataGroupWithAnimObject(this.MaterialAssetData, r);
      return o >= 0;
    }
    let e = t.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    if (!e) {
      (e = t.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, new UE.Transform(), false)).Init(8);
      e.SetLogicOwner(t);
    }
    const o = e.AddMaterialControllerDataGroupWithAnimObject(this.MaterialAssetData, r);
    return o >= 0;
  }
  GetNotifyName() {
    var r = this.MaterialAssetData.GetName();
    if (r) {
      return "材质控制器组:" + UE.BlueprintPathsLibrary.GetBaseFilename(r, true);
    } else {
      return "材质控制器组";
    }
  }
}
exports.default = AnimNotifyAddMaterialControllerDataGroup;
//# sourceMappingURL=AnimNotifyAddMaterialControllerDataGroup.js.map