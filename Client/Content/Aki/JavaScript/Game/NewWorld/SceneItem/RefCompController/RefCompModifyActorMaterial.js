"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefCompModifyActorMaterial = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const RefCompControllerBase_1 = require("./RefCompControllerBase");
class RefCompModifyActorMaterial extends RefCompControllerBase_1.RefCompControllerBase {
  constructor() {
    super(...arguments);
    this.Type = 2;
    this.oMn = undefined;
    this.iMn = undefined;
    this.iNg = undefined;
    this.rNg = undefined;
    this.oNg = e => {
      if (this.iNg && this.iNg.size > 0) {
        for (const t of this.iNg.values()) {
          for (const a of t) {
            var r;
            if (a.TargetMaterialInstanceDynamic?.IsValid() && a.SplineComp?.IsValid()) {
              r = RefCompModifyActorMaterial.GetSplineProgressValue(a.SplineComp, a.SplineProgressType);
              if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel("RefCompModifyActorMaterial") > 0 && Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("SceneItem", 72, "[RefCompModifyActorMaterial:OnTick] 设置材质参数", ["TargetMaterialInstanceDynamic", a.TargetMaterialInstanceDynamic.GetName()], ["SplineComponent", a.SplineComp.GetName()], ["MaterialParamName", a.MaterialParamName], ["CustomTime", r], ["Delta", e]);
              }
              a.TargetMaterialInstanceDynamic.SetScalarParameterValue(a.MaterialParamName, r);
            }
          }
        }
      }
    };
  }
  get nNg() {
    this.iNg ||= new Map();
    return this.iNg;
  }
  OnEnd() {
    super.OnEnd();
    this.iNg?.clear();
    if (this.rNg) {
      TimerSystem_1.TimerSystem.Remove(this.rNg);
      this.rNg = undefined;
    }
  }
  OnTick(e) {
    super.OnTick(e);
  }
  HandleActorMaterial(e) {
    switch (e.Config.Type) {
      case "ChangeMaterialData":
        this.mMn(e.Config.MaterialData, e.Config.ActorRefs);
        break;
      case "ChangeMPC":
        this.dMn(e.Config.MpcData);
    }
  }
  HandleModifyActorMaterialParamBySplineProgress(e) {
    switch (e.Config.Type) {
      case 0:
        return this.sNg(e.Config);
      case 1:
        return this.aNg(e.Config);
    }
    return false;
  }
  sNg(t, a = 0) {
    let e = undefined;
    switch (a) {
      case 0:
        e = Global_1.Global.BaseCharacter?.EntityId;
        break;
      case 1:
        var r = Global_1.Global.BaseCharacter?.CharacterActorComponent;
        if (r?.Valid) {
          e = r.Entity.CheckGetComponent(242)?.VehicleEntity?.Id;
        }
    }
    if (!e) {
      return false;
    }
    var o = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(t.SplineEntityId, e, 1);
    for (const c of t.ActorRefs) {
      if (StringUtils_1.StringUtils.IsBlank(c.MaterialParam)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 72, "[EnterModifyActorMaterialParamBySplineProgress] 材质参数为空", ["ActorRef", c.ActorRef], ["MaterialParam", c.MaterialParam]);
        }
      } else {
        var i = this.GetActorByActorRef(c.ActorRef, "[EnterModifyActorMaterialParamBySplineProgress]");
        if (i?.IsValid()) {
          var s = i.GetComponentByClass(UE.MeshComponent.StaticClass());
          if (s?.IsValid()) {
            var n = s.GetMaterials();
            for (let e = 0, r = n.Num(); e < r; e++) {
              var l = n.Get(e);
              if (l?.IsValid()) {
                if ((l = s.CreateDynamicMaterialInstance(e, l))?.IsValid()) {
                  s.SetMaterial(e, l);
                  if (!this.nNg.has(t.SplineEntityId)) {
                    this.nNg.set(t.SplineEntityId, []);
                  }
                  this.nNg.get(t.SplineEntityId).push({
                    SplineProgressType: a,
                    SplineComp: o,
                    TargetMaterialInstanceDynamic: l,
                    MaterialParamName: FNameUtil_1.FNameUtil.GetDynamicFName(c.MaterialParam)
                  });
                  this.rNg ||= TimerSystem_1.TimerSystem.Forever(this.oNg, TimerSystem_1.MIN_TIME);
                } else if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("SceneItem", 72, "[EnterModifyActorMaterialParamBySplineProgress]创建DynamicMaterialInstance失败", ["ActorRef", c.ActorRef], ["MaterialIndex", e]);
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("SceneItem", 72, "[EnterModifyActorMaterialParamBySplineProgress]无效Material", ["ActorRef", c.ActorRef], ["MaterialIndex", e]);
              }
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 72, "[EnterModifyActorMaterialParamBySplineProgress]无效MeshComponent", ["ActorRef", c.ActorRef]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 72, "[EnterModifyActorMaterialParamBySplineProgress]无效Actor", ["ActorRef", c.ActorRef]);
        }
      }
    }
    return true;
  }
  aNg(e) {
    if (this.iNg && this.iNg.delete(e.SplineEntityId) && this.rNg && this.iNg.size === 0) {
      TimerSystem_1.TimerSystem.Remove(this.rNg);
      this.rNg = undefined;
    }
    return false;
  }
  static GetSplineProgressValue(e, r) {
    if (!e?.IsValid()) {
      return 0;
    }
    let t = undefined;
    switch (r) {
      case 0:
        t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
        break;
      case 1:
        var a = Global_1.Global.BaseCharacter?.CharacterActorComponent;
        if (a?.Valid && (a = a.Entity.CheckGetComponent(242)?.VehicleEntity)?.Valid) {
          t = a.CheckGetComponent(247)?.ActorLocationProxy;
        }
    }
    var o;
    var i;
    if (t && (r = t.ToUeVector(), o = e.D_FindInputKeyClosestToWorldLocation(r), (i = ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel("RefCompModifyActorMaterial")) > 0 && (UE.KismetSystemLibrary.D_DrawDebugSphere(e, r, i * 50, 16, ColorUtils_1.ColorUtils.LinearGreen), r = e.D_GetLocationAtSplineInputKey(o, 1), UE.KismetSystemLibrary.D_DrawDebugSphere(e, r, i * 50, 16, ColorUtils_1.ColorUtils.LinearRed)), r = e.GetDistanceAlongSplineAtSplineInputKey(o), (i = e.GetSplineLength()) > 0)) {
      return r / i;
    } else {
      return 0;
    }
  }
  mMn(e, s) {
    if (e && e !== "None") {
      if (s.length) {
        this.iMn ||= new Map();
        this.oMn ||= new Map();
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.ItemMaterialControllerActorData_C, r => {
          if (r?.IsValid()) {
            for (const o of s) {
              var t = this.GetActorByActorRef(o, "[ReferenceComponent:ChangeMaterial]");
              if (t?.IsValid()) {
                if (!this.iMn.get(o.PathName)) {
                  this.iMn.set(o.PathName, true);
                  var a = this.oMn.get(o.PathName);
                  if (a && a.length) {
                    for (const i of a) {
                      ModelManager_1.ModelManager.RenderModuleModel.DisableActorData(i);
                    }
                    a.length = 0;
                    this.oMn.set(o.PathName, a);
                  }
                }
                a = ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(r, t);
                let e = this.oMn.get(o.PathName);
                (e = e || new Array()).push(a);
                this.oMn.set(o.PathName, e);
              }
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
          }
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 7, "[ReferenceComponent]目标actor未配置");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 7, "[ReferenceComponent]未配置对应MaterialData");
    }
  }
  dMn(e) {
    if (e && e !== "None") {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.ItemMaterialControllerMPCData_C, e => {
        if (!e?.IsValid()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
          }
        }
        ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(e);
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 7, "[ReferenceComponent]未配置对应MPCData");
    }
  }
  ResetActorMaterialClearMap() {
    this.iMn?.clear();
  }
}
exports.RefCompModifyActorMaterial = RefCompModifyActorMaterial;
//# sourceMappingURL=RefCompModifyActorMaterial.js.map