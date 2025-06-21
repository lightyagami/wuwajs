"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SeamlessTravelPostProcess = void 0;
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  DEFAULT_TRANSITION_POSTPROCESS_PRIORITY = 9999;
class SeamlessTravelPostProcess {
  constructor() {
    this.Hte = void 0, this.nx = void 0, this.kh1 = void 0, this.Oh1 = void 0, this.qh1 = !1, this.CurrentBlendStatus = 0, this.Gh1 = 0, this.Fh1 = 0, this.Nh1 = void 0, this.Vh1 = void 0
  }
  get IsInit() {
    return this.qh1
  }
  get IsActive() {
    return 0 !== this.CurrentBlendStatus
  }
  Init(t, s) {
    this.Hte = Global_1.Global.BaseCharacter?.CharacterActorComponent, this.Hte ? (this.CurrentBlendStatus = 0, this.nx = t, this.IsInit ? s(!0) : (this.Gh1 = this.nx.EffectExpandTime * MathUtils_1.MathUtils.SecondToMillisecond, this.Fh1 = this.nx.EffectCollapseTime * MathUtils_1.MathUtils.SecondToMillisecond, this.Oh1 = this.nx.TransitionWeatherDaPath, this.jh1(t => {
      this.qh1 = !0, s(t)
    }))) : Log_1.Log.CheckError() && Log_1.Log.Error("Teleport", 39, "[无缝传送PPV]初始化失败，无效的ActorComp", ["ActorName", Global_1.Global.BaseCharacter?.GetName()])
  }
  jh1(i) {
    this.kh1 = ActorSystem_1.ActorSystem.Get(UE.KuroPostProcessVolume.StaticClass(), this.Hte?.ActorTransform ?? MathUtils_1.MathUtils.DefaultTransformDouble), this.kh1.IsValid() ? (GlobalData_1.GlobalData.IsPlayInEditor && this.kh1.SetActorLabel("SeamlessTravel_PostProcessVolume"), this.kh1.BlendWeight = 0, this.kh1.bUnbound = !0, this.kh1.bEnabled = !1, this.kh1.Priority = DEFAULT_TRANSITION_POSTPROCESS_PRIORITY, UE.KuroRenderingRuntimeBPPluginBPLibrary.MarkWorldPostProcessPriorityDirty(this.kh1), this.Oh1?.length ? ResourceSystem_1.ResourceSystem.LoadAsync(this.Oh1, UE.KuroWeatherDataAsset, (t, s) => {
      t ? (this.kh1?.SetWeatherDataAsset(t), i(!0)) : (Log_1.Log.CheckError() && Log_1.Log.Error("Teleport", 39, "[无缝传送PPV] 加载DA失败", ["path", s], ["ActorName", Global_1.Global.BaseCharacter?.GetName()]), i(!1))
    }) : i(!0)) : (Log_1.Log.CheckError() && Log_1.Log.Error("Teleport", 39, "[无缝传送PPV] 创建PPV失败", ["ActorName", Global_1.Global.BaseCharacter?.GetName()]), i(!1))
  }
  Tick(t) {
    if (this.IsInit && this.kh1?.IsValid() && this.IsActive && this.Hte) {
      var s, i = this.kh1.BlendWeight;
      switch (this.CurrentBlendStatus) {
        case 2:
          this.kh1.BlendWeight = MathUtils_1.MathUtils.Clamp(i + t / this.Gh1, 0, 1), this.kh1.D_K2_SetActorLocation(this.Hte.ActorLocation, !1, void 0, !0), this.kh1.bEnabled = 0 < this.kh1.BlendWeight, this.kh1.PostModify(), 1 !== i && 1 === this.kh1.BlendWeight && (s = this.Nh1, this.Nh1 = void 0, this.CurrentBlendStatus = 1, s?.(!0));
          break;
        case 3:
          this.kh1.BlendWeight = MathUtils_1.MathUtils.Clamp(i - t / this.Fh1, 0, 1), this.kh1.D_K2_SetActorLocation(this.Hte.ActorLocation, !1, void 0, !0), this.kh1.bEnabled = 0 < this.kh1.BlendWeight, this.kh1.PostModify(), 0 !== i && 0 === this.kh1.BlendWeight && (s = this.Vh1, this.Vh1 = void 0, this.CurrentBlendStatus = 0, s?.(!0))
      }
    }
  }
  Destroy() {
    this.kh1?.IsValid() && (this.kh1.BlendWeight = 0, this.kh1.bUnbound = !1, this.kh1.bEnabled = !1, this.kh1.Priority = 0, ActorSystem_1.ActorSystem.Put("SeamlessTravelPostProcess.Destroy", this.kh1)), this.kh1 = void 0, this.Hte = void 0, this.nx = void 0, this.CurrentBlendStatus = 0, this.Nh1 = void 0, this.Vh1 = void 0
  }
  AppearEffect(t) {
    this.IsInit && this.kh1?.IsValid() ? (this.Nh1 = t, this.CurrentBlendStatus = 2) : t(!1)
  }
  DisappearEffect(t) {
    this.IsInit && this.kh1?.IsValid() ? (this.Vh1 = t, this.CurrentBlendStatus = 3) : t(!1)
  }
  GetSeamlessTravelActors(t) {
    return this.kh1 && t.push(this.kh1), t
  }
}
exports.SeamlessTravelPostProcess = SeamlessTravelPostProcess;
//# sourceMappingURL=SeamlessTravelPostProcess.js.map