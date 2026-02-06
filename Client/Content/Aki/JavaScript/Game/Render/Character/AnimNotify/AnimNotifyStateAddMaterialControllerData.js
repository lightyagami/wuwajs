"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const TsUiSceneRoleActor_1 = require("../../../Module/UiComponent/TsUiSceneRoleActor");
const UiModelUtil_1 = require("../../../Module/UiModel/UiModelUtil");
const TsBaseVehicle_1 = require("../../../NewWorld/Vehicle/TsBaseVehicle");
const TsAnimNotifyUtils_1 = require("../../../Utils/TsAnimNotifyUtils");
class MaterialControllerData {
  constructor() {
    this.HandleId = -1;
    this.CharRenderingComponent = undefined;
  }
}
const materialControllerStateHandleMap = new Map();
class AnimNotifyStateAddMaterialControllerData extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.MaterialAssetData = undefined;
    this.NeedAnyTag = false;
    this.PlayNeedTags = undefined;
    this.TagCheckWithOwner = false;
  }
  Constructor() {}
  K2_NotifyBegin(r, e, t) {
    let i = -1;
    if (this.IsAllValid(r, e)) {
      e = r.GetOwner();
      if (e && (!(e instanceof UE.TsUiSceneRoleActor_C) && !(e instanceof UE.TsSkeletalObserver_C) || this.UiModelTagsCheck(e))) {
        let t = undefined;
        if ((i = e instanceof TsBaseCharacter_1.default || e instanceof TsBaseVehicle_1.default ? ((t = e.CharRenderingComponent).CheckInit() || t.Init(e.RenderType), o = undefined, o = (o = e.GetEntityNoBlueprint()?.GetComponent(1)?.GetReplaceEffect(UE.KismetSystemLibrary.GetPathName(this.MaterialAssetData))) ? ResourceSystem_1.ResourceSystem.Load(o, UE.PD_CharacterControllerData_C) : this.MaterialAssetData, t.AddMaterialControllerDataWithAnimObject(o, r, undefined)) : e instanceof TsUiSceneRoleActor_1.default ? e.Model.CheckGetComponent(5).AddRenderingMaterialWithAnimObject(this.MaterialAssetData, r) : ((t = e.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())) || ((t = e.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, new UE.Transform(), false)).Init(8), t.SetLogicOwner(e)), t.AddMaterialControllerDataWithAnimObject(this.MaterialAssetData, r, undefined))) >= 0) {
          let e = materialControllerStateHandleMap.get(r);
          if (!e) {
            e = new Map();
            materialControllerStateHandleMap.set(r, e);
          }
          var o = new MaterialControllerData();
          o.HandleId = i;
          o.CharRenderingComponent = t;
          e.set(this, o);
          return true;
        }
      }
    }
    return false;
  }
  K2_NotifyEnd(e, t) {
    var r = materialControllerStateHandleMap.get(e);
    if (!r) {
      return true;
    }
    var i = r.get(this);
    if (!i) {
      return true;
    }
    r.delete(this);
    if (!r.size) {
      materialControllerStateHandleMap.delete(e);
    }
    r = e.GetOwner();
    if (r) {
      try {
        if (r instanceof TsUiSceneRoleActor_1.default) {
          r.Model.CheckGetComponent(5).RemoveRenderingMaterialWithEnding(i.HandleId);
        } else {
          i.CharRenderingComponent?.RemoveMaterialControllerDataWithEnding(i.HandleId);
        }
        return true;
      } catch {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderCharacter", 25, "AnimNotifyStateAddMaterialControllerData移除材质控制器特效失败", ["Actor", e?.GetOwner()?.GetName()], ["动画", t?.GetName()], ["handleId", i.HandleId]);
        }
      }
    }
    return false;
  }
  IsAllValid(e, t) {
    if (UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)) {
      if (e && UE.KismetSystemLibrary.IsValid(e)) {
        return !!UE.KismetSystemLibrary.IsValid(e.GetOwner()) || (Log_1.Log.CheckError() && Log_1.Log.Error("RenderCharacter", 13, "错误：动画Owner不合法", ["Actor", e?.GetOwner()?.GetName()], ["动画", t?.GetName()]), false);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 13, "错误：动画Mesh不合法", ["Actor", e?.GetOwner()?.GetName()], ["动画", t?.GetName()]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "错误：特效DA不合法", ["Actor", e?.GetOwner()?.GetName()], ["动画", t?.GetName()]);
      }
      return false;
    }
  }
  GetNotifyName() {
    var e = this.MaterialAssetData.GetName();
    if (e && e !== "") {
      return "材质控制器:" + UE.BlueprintPathsLibrary.GetBaseFilename(e, true);
    } else {
      return "材质控制器";
    }
  }
  UiModelTagsCheck(e) {
    e = UiModelUtil_1.UiModelUtil.GetSelfAndOwnerComponents(e, 7, this.TagCheckWithOwner);
    return e.length === 0 || e.some(e => TsAnimNotifyUtils_1.TsAnimNotifyUtils.CheckTags(this.NeedAnyTag, this.PlayNeedTags, e.ContainsTagById.bind(e)));
  }
}
exports.default = AnimNotifyStateAddMaterialControllerData;
//# sourceMappingURL=AnimNotifyStateAddMaterialControllerData.js.map