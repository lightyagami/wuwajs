"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharMaterialContainerV2 = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../../Core/Common/Stats");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
const charMeshName = new UE.FName("CharacterMesh0");
class CharMaterialContainerV2 extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.gel = undefined;
    this.xW = undefined;
    this.pk1 = undefined;
    this.IdentifyName = "";
    this.d91 = undefined;
    this.pel = undefined;
  }
  Start() {
    var t = this.GetRenderingComponent().GetCachedOwner();
    var e = this.GetRenderingComponent().RenderType;
    if (t) {
      this.gel = t.GetComponentByClass(UE.KuroMaterialControllerComponent.StaticClass());
      if (!this.gel) {
        this.gel = t.AddComponentByClass(UE.KuroMaterialControllerComponent.StaticClass(), false, undefined, false);
        if (e === 6 || e === 7) {
          this.gel.SetInitTakeOver(false);
        } else {
          this.gel.SetInitTakeOver(true);
        }
        this.gel.InitFromOwner();
      }
      if (e === 0) {
        this.gel.SetToonCustomStencilValue(1);
      }
      this.IdentifyName = t.GetClass().GetName();
      if (e = this.gel.GetRegisteredSkeletalMeshComponent(charMeshName)?.SkeletalMesh) {
        this.IdentifyName = this.IdentifyName + "_" + e.GetName();
      }
      this.d91 = this.GetRenderingComponent().GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
      this.xW = Stats_1.Stat.CreateNoFlameGraph("CharMaterialContainerV2_Tick_" + this.IdentifyName);
      this.pk1 = Stats_1.Stat.CreateNoFlameGraph("CharMaterialContainerV2_UpdateEffectOnly_" + this.IdentifyName);
      this.OnInitSuccess();
    }
  }
  Update() {
    this.xW?.Start();
    var t = {
      LogicalTimeDilation: 1
    };
    var e = this.RenderComponent.GetTimeDilation(t);
    this.gel.ManualTick(this.GetDeltaTime() * e, false, false, t.LogicalTimeDilation);
    this.gel.UpdateEffects();
    this.gel.SetUpdateForce(false);
    var i = this.gel.RemoveDeadEffects();
    if (this.pel) {
      for (let t = 0, e = i.Num(); t < e; ++t) {
        for (const s of this.pel) {
          s(i.Get(t));
        }
      }
    }
    if (this.d91) {
      e = this.gel.GetBodyOpacity();
      this.d91.SetOpacity(e, true);
    }
    this.xW?.Stop();
  }
  UpdateEffectsOnly() {
    this.pk1?.Start();
    this.gel.MarkForceUpdateAllOnce();
    this.gel.UpdateEffects();
    this.pk1?.Stop();
  }
  ForceUpdateOnce() {
    this.gel?.MarkForceUpdateAllOnce();
    this.gel?.SetUpdateForce(true);
  }
  AddSkeletalComponent(t, e, i = false) {
    this.gel.AddSkeletalMeshComponent(t, new UE.FName(e), i);
  }
  GetSkeletalComponent(t) {
    return this.gel.GetRegisteredSkeletalMeshComponent(new UE.FName(t));
  }
  GetSkeletalMeshComponentBodyName(t) {
    return this.gel.GetSkeletalMeshComponentBodyName(t);
  }
  RemoveSkeletalComponent(t) {
    this.gel.RemoveSkeletalMeshComponent(new UE.FName(t));
  }
  AddEffect(t, e, i, s, a = false) {
    return this.gel.AddEffect_Ex(t, e, i, s, a);
  }
  SetEffectLoop(t, e) {
    this.gel.SetHandleLoop(t, e, true);
  }
  SetEffectPause(t, e) {
    this.gel.SetHandlePause(t, e);
  }
  SetEffectProgress(t, e) {
    this.gel.SeekHandleFactor(t, e);
  }
  RemoveEffect(t) {
    this.gel.RemoveEffect(t);
    if (this.pel) {
      for (const e of this.pel) {
        e(t);
      }
    }
  }
  RemoveAllUnloopedEffects() {
    var i = this.gel.RemoveAllUnloopedEffects();
    if (this.pel) {
      for (let t = 0, e = i.Num(); t < e; ++t) {
        for (const s of this.pel) {
          s(i.Get(t));
        }
      }
    }
  }
  OnResetRenderState() {
    this.gel.RemoveAllEffects();
    this.gel.UpdateEffects();
  }
  SetFloatUpdateParamPermanent(t, e, i, s, a) {
    this.gel.AddFloatUpdateParamPermanent(t, e, i, s, a ?? 17);
  }
  AddFloatUpdateParamPermanentByIndex(t, e, i, s) {
    this.gel.AddFloatUpdateParamPermanentByIndex(t, e, i, s);
  }
  SetColorUpdateParamPermanent(t, e, i, s, a) {
    this.gel.AddColorUpdateParamPermanent(t, e, i, s, a ?? 17);
  }
  SetTextureUpdateParamPermanent(t, e, i, s, a) {
    this.gel.AddTextureUpdateParamPermanent(t, e, i, s, a ?? 17);
  }
  RemoveFloatUpdateParamPermanent(t, e, i, s) {
    this.gel.RemoveFloatUpdateParamPermanent(t, e, i, s ?? 17);
  }
  RemoveColorUpdateParamPermanent(t, e, i, s) {
    this.gel.RemoveColorUpdateParamPermanent(t, e, i, s ?? 17);
  }
  RemoveTextureUpdateParamPermanent(t, e, i, s) {
    this.gel.RemoveTextureUpdateParamPermanent(t, e, i, s ?? 17);
  }
  SetExternalMaterialReplace(t, e, i, s) {
    this.gel.SetExternalMaterialReplace(t, e, i, s ?? 17);
  }
  SetExternalMaterialReplaceByIndex(t, e, i) {
    this.gel.SetExternalMaterialReplaceByIndex(t, e, i);
  }
  RemoveExternalMaterialReplace(t, e, i) {
    this.gel.RemoveExternalMaterialReplace(t, e, i ?? 17);
  }
  RemoveExternalMaterialReplaceByIndex(t, e) {
    this.gel.RemoveExternalMaterialReplaceByIndex(t, e);
  }
  AddAlphaTestCount(t) {
    this.gel.AddExternalAlphaTestRefCount(t);
  }
  AddOutlineStencilTestCount(t) {
    this.gel.AddExternalOutlineStencilTestRefCount(t);
  }
  AddBattleCount(t) {
    this.gel.AddExternalBattleRefCount(t);
  }
  AddBattleMaskCount(t) {
    this.gel.AddExternalBattleMaskRefCount(t);
  }
  RemoveAlphaTestCount(t) {
    this.gel.RemoveExternalAlphaTestRefCount(t);
  }
  RemoveOutlineStencilTestCount(t) {
    this.gel.RemoveExternalOutlineStencilTestRefCount(t);
  }
  RemoveBattleCount(t) {
    this.gel.RemoveExternalBattleRefCount(t);
  }
  RemoveBattleMaskCount(t) {
    this.gel.RemoveExternalBattleMaskRefCount(t);
  }
  SetNoWater(t) {
    this.gel.SetAllBodyNoWater(t);
  }
  AddEffectFinishCallback(t) {
    if (t) {
      this.pel ||= new Set();
      if (!this.pel.has(t)) {
        this.pel.add(t);
      }
    }
  }
  RemoveEffectFinishCallback(t) {
    if (t && this.pel) {
      this.pel.delete(t);
    }
  }
  GetAnyUnloopEffect() {
    return this.gel.GetAnyUnloopEffect();
  }
  EnableTickGetHeadPosInAllMeshes(e) {
    var i = this.gel.GetAllRegisteredBodyNames();
    var s = i.Num();
    for (let t = 0; t < s; ++t) {
      this.gel.GetRegisteredSkeletalMeshComponent(i.Get(t))?.EnableTickGetHeadBonePos(e);
    }
  }
  Destroy() {}
  GetStatName() {
    return "CharMaterialContainerV2";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdMaterialContainerV2;
  }
}
exports.CharMaterialContainerV2 = CharMaterialContainerV2;
//# sourceMappingURL=CharMaterialContainerV2.js.map