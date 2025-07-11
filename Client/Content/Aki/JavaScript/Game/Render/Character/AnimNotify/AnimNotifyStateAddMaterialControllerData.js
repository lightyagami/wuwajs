"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const TsUiSceneRoleActor_1 = require("../../../Module/UiComponent/TsUiSceneRoleActor");
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
  }
  Constructor() {}
  K2_NotifyBegin(r, a, e) {
    let o = -1;
    if (this.IsAllValid(r, a)) {
      a = r.GetOwner();
      if (a) {
        let t = undefined;
        if (a instanceof UE.TsBaseCharacter_C) {
          if (!(t = a.CharRenderingComponent).CheckInit()) {
            t.Init(a.RenderType);
          }
          let e = undefined;
          var i = (e = a instanceof TsBaseCharacter_1.default ? a.CharacterActorComponent?.GetReplaceEffect(UE.KismetSystemLibrary.GetPathName(this.MaterialAssetData)) : e) ? ResourceSystem_1.ResourceSystem.Load(e, UE.PD_CharacterControllerData_C) : this.MaterialAssetData;
          o = t.AddMaterialControllerDataWithAnimObject(i, r, undefined);
        } else {
          o = a instanceof TsUiSceneRoleActor_1.default ? a.Model.CheckGetComponent(5).AddRenderingMaterialByData(this.MaterialAssetData) : ((t = a.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())) || ((t = a.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, new UE.Transform(), false)).Init(8), t.SetLogicOwner(a)), t.AddMaterialControllerDataWithAnimObject(this.MaterialAssetData, r, undefined));
        }
        if (o >= 0) {
          let e = materialControllerStateHandleMap.get(r);
          if (!e) {
            e = new Map();
            materialControllerStateHandleMap.set(r, e);
          }
          i = new MaterialControllerData();
          i.HandleId = o;
          i.CharRenderingComponent = t;
          e.set(this, i);
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
    var a = r.get(this);
    if (!a) {
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
          r.Model.CheckGetComponent(5).RemoveRenderingMaterialWithEnding(a.HandleId);
        } else {
          a.CharRenderingComponent?.RemoveMaterialControllerDataWithEnding(a.HandleId);
        }
        return true;
      } catch {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderCharacter", 25, "AnimNotifyStateAddMaterialControllerData移除材质控制器特效失败", ["Actor", e?.GetOwner()?.GetName()], ["动画", t?.GetName()], ["handleId", a.HandleId]);
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
}
exports.default = AnimNotifyStateAddMaterialControllerData;
//# sourceMappingURL=AnimNotifyStateAddMaterialControllerData.js.map