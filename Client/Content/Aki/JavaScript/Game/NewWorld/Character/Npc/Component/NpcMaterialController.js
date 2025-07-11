"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcMaterialController = exports.NpcMatHandleInfo = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
class NpcMatHandleInfo {
  constructor() {
    this.Id = ++NpcMatHandleInfo.Yla;
    this.Type = 0;
    this.Handle = 0;
  }
}
(exports.NpcMatHandleInfo = NpcMatHandleInfo).Yla = 0;
class NpcMaterialController {
  constructor(t) {
    this.Entity = undefined;
    this.ActorComp = undefined;
    this.CreatureData = undefined;
    this.HolographicEffectActor = undefined;
    this.SimpleMatControlComponentInternal = undefined;
    this.IsInitSimpleMatController = false;
    this.MaterialEffectHandleMap = new Map();
    this.Entity = t;
    this.CreatureData = this.Entity.GetComponent(0);
    this.ActorComp = this.Entity.GetComponent(2);
  }
  get SimpleMatControlComponent() {
    if (!this.IsInitSimpleMatController) {
      this.IsInitSimpleMatController = true;
      var t = this.ActorComp.Actor.AddComponentByClass(UE.BP_NPCMaterialController_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      if (!t?.IsValid()) {
        return;
      }
      this.SimpleMatControlComponentInternal = t;
    }
    return this.SimpleMatControlComponentInternal;
  }
  Dispose() {
    var t;
    if (this.SimpleMatControlComponentInternal?.IsValid()) {
      this.SimpleMatControlComponent.K2_DestroyComponent(this.ActorComp.Actor);
    }
    if (this.HolographicEffectActor?.IsValid()) {
      if ((t = this.HolographicEffectActor) && t.IsA(UE.BP_MaterialControllerRenderActor_C.StaticClass())) {
        t.CharRenderingComponent?.Destroy();
      }
      ActorSystem_1.ActorSystem.Put("NpcMaterialController.Dispose", this.HolographicEffectActor);
    }
    return true;
  }
  LoadAndSetHolographicEffect() {
    if (!this.HolographicEffectActor?.IsValid()) {
      const e = RenderConfig_1.RenderConfig.HolographicPath;
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PD_CharacterControllerDataGroup_C, t => {
        if (this.ActorComp?.Actor.IsValid()) {
          if (t?.IsValid()) {
            this.ActorComp.Actor.CharRenderingComponent?.AddMaterialControllerDataGroup(t);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("NPC", 50, "[NpcMaterialController.LoadAndSetHolographicEffect] 无法找到投影材质效果DA", ["EffectPath", e], ["PbDataId", this.CreatureData?.GetPbDataId()]);
          }
        }
      });
    }
  }
  ApplyMaterialEffect(e) {
    if (e === "" || e === "None") {
      return 0;
    }
    const i = new NpcMatHandleInfo();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PrimaryDataAsset, t => {
      if (this.ActorComp?.Actor?.IsValid()) {
        if (t?.IsValid()) {
          this.ApplyMaterialEffectInternal(t, i);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("NPC", 50, "[NpcMaterialController.ApplyMaterialEffect] 加载DA失败", ["EffectPath", e], ["PbDataId", this.CreatureData?.GetPbDataId()]);
        }
      }
    });
    return i.Id;
  }
  ApplyMaterialEffectByAsset(t) {
    var e = new NpcMatHandleInfo();
    this.ApplyMaterialEffectInternal(t, e);
    return e.Id;
  }
  ApplyMaterialEffectInternal(i, s) {
    if (i?.IsValid()) {
      let t = 0;
      let e = 0;
      if (i.IsA(UE.PD_HolographicEffect_C.StaticClass())) {
        t = 1;
        e = -1;
        this.ApplySimpleMaterialEffectByAsset(i);
      } else if (i.IsA(UE.PD_CharacterControllerDataGroup_C.StaticClass())) {
        t = 3;
        e = this.ActorComp?.Actor.CharRenderingComponent?.AddMaterialControllerDataGroup(i) ?? 0;
      } else if (i.IsA(UE.PD_CharacterControllerData_C.StaticClass())) {
        t = 2;
        e = this.ActorComp?.Actor.CharRenderingComponent?.AddMaterialControllerData(i) ?? 0;
      }
      if (e) {
        s.Type = t;
        s.Handle = e;
        this.MaterialEffectHandleMap.set(s.Id, s);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "无法识别的材质特效类型", ["Effect", i.GetName()], ["PbDataId", this.CreatureData?.GetPbDataId()]);
      }
    }
  }
  ApplySimpleMaterialEffect(e) {
    if (e !== "" && e !== "None" && this.SimpleMatControlComponent?.IsValid()) {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PD_HolographicEffect_C, t => {
        if (this.ActorComp.Actor?.IsValid() && this.SimpleMatControlComponent?.IsValid()) {
          if (t?.IsValid()) {
            this.ApplySimpleMaterialEffectByAsset(t);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("NPC", 50, "[NpcMaterialController.ApplySimpleMaterialEffect] 加载DA失败", ["EffectPath", e], ["PbDataId", this.CreatureData?.GetPbDataId()]);
          }
        }
      });
    }
  }
  ApplySimpleMaterialEffectByAsset(t) {
    if (t?.IsValid() && this.SimpleMatControlComponent?.IsValid()) {
      this.SimpleMatControlComponent.DATA = t;
      this.SimpleMatControlComponent.StartEffect();
    }
  }
  RemoveMaterialEffect(t) {
    var e = this.MaterialEffectHandleMap.get(t);
    if (e) {
      switch (e.Type) {
        case 1:
          this.RemoveSimpleMaterialEffect();
          break;
        case 2:
          this.ActorComp?.Actor.CharRenderingComponent?.RemoveMaterialControllerData(e.Handle);
          break;
        case 3:
          this.ActorComp?.Actor.CharRenderingComponent?.RemoveMaterialControllerDataGroup(e.Handle);
      }
      this.MaterialEffectHandleMap.delete(t);
    }
  }
  RemoveSimpleMaterialEffect() {
    if (this.SimpleMatControlComponent?.IsValid()) {
      this.SimpleMatControlComponent.EndEffect();
    }
  }
  GetMaterialInfo(t) {
    if (t && this.MaterialEffectHandleMap.has(t)) {
      return this.MaterialEffectHandleMap.get(t);
    }
  }
}
exports.NpcMaterialController = NpcMaterialController;
//# sourceMappingURL=NpcMaterialController.js.map