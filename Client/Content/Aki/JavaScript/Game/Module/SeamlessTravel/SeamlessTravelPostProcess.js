"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeamlessTravelPostProcess = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const DEFAULT_TRANSITION_POSTPROCESS_PRIORITY = 9999;
class SeamlessTravelPostProcess {
  constructor() {
    this.Hte = undefined;
    this.nx = undefined;
    this.ll1 = undefined;
    this._l1 = undefined;
    this.cl1 = false;
    this.CurrentBlendStatus = 0;
    this.ul1 = 0;
    this.dl1 = 0;
    this.ml1 = undefined;
    this.fl1 = undefined;
  }
  get IsInit() {
    return this.cl1;
  }
  get IsActive() {
    return this.CurrentBlendStatus !== 0;
  }
  Init(t, s) {
    this.Hte = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (this.Hte) {
      this.CurrentBlendStatus = 0;
      this.nx = t;
      if (this.IsInit) {
        s(true);
      } else {
        this.ul1 = this.nx.EffectExpandTime * MathUtils_1.MathUtils.SecondToMillisecond;
        this.dl1 = this.nx.EffectCollapseTime * MathUtils_1.MathUtils.SecondToMillisecond;
        this._l1 = this.nx.TransitionWeatherDaPath;
        this.gl1(t => {
          this.cl1 = true;
          s(t);
        });
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 39, "[无缝传送PPV]初始化失败，无效的ActorComp", ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
    }
  }
  gl1(i) {
    this.ll1 = ActorSystem_1.ActorSystem.Get(UE.KuroPostProcessVolume.StaticClass(), this.Hte?.ActorTransform ?? MathUtils_1.MathUtils.DefaultTransformDouble);
    if (this.ll1.IsValid()) {
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        this.ll1.SetActorLabel("SeamlessTravel_PostProcessVolume");
      }
      this.ll1.BlendWeight = 0;
      this.ll1.bUnbound = true;
      this.ll1.bEnabled = false;
      this.ll1.Priority = DEFAULT_TRANSITION_POSTPROCESS_PRIORITY;
      UE.KuroRenderingRuntimeBPPluginBPLibrary.MarkWorldPostProcessPriorityDirty(this.ll1);
      if (this._l1?.length) {
        ResourceSystem_1.ResourceSystem.LoadAsync(this._l1, UE.KuroWeatherDataAsset, (t, s) => {
          if (t) {
            this.ll1?.SetWeatherDataAsset(t);
            i(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Teleport", 39, "[无缝传送PPV] 加载DA失败", ["path", s], ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
            }
            i(false);
          }
        }, 100, "SeamlessTravel.PostProcess");
      } else {
        i(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 39, "[无缝传送PPV] 创建PPV失败", ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
      }
      i(false);
    }
  }
  Tick(t) {
    if (this.IsInit && this.ll1?.IsValid() && this.IsActive && this.Hte) {
      var s;
      var i = this.ll1.BlendWeight;
      switch (this.CurrentBlendStatus) {
        case 2:
          this.ll1.BlendWeight = MathUtils_1.MathUtils.Clamp(i + t / this.ul1, 0, 1);
          this.ll1.D_K2_SetActorLocation(this.Hte.ActorLocation, false, undefined, true);
          this.ll1.bEnabled = this.ll1.BlendWeight > 0;
          this.ll1.PostModify();
          if (i !== 1 && this.ll1.BlendWeight === 1) {
            s = this.ml1;
            this.ml1 = undefined;
            this.CurrentBlendStatus = 1;
            s?.(true);
          }
          break;
        case 3:
          this.ll1.BlendWeight = MathUtils_1.MathUtils.Clamp(i - t / this.dl1, 0, 1);
          this.ll1.D_K2_SetActorLocation(this.Hte.ActorLocation, false, undefined, true);
          this.ll1.bEnabled = this.ll1.BlendWeight > 0;
          this.ll1.PostModify();
          if (i !== 0 && this.ll1.BlendWeight === 0) {
            s = this.fl1;
            this.fl1 = undefined;
            this.CurrentBlendStatus = 0;
            s?.(true);
          }
      }
    }
  }
  Destroy() {
    if (this.ll1?.IsValid()) {
      this.ll1.BlendWeight = 0;
      this.ll1.bUnbound = false;
      this.ll1.bEnabled = false;
      this.ll1.Priority = 0;
      ActorSystem_1.ActorSystem.Put("SeamlessTravelPostProcess.Destroy", this.ll1);
    }
    this.ll1 = undefined;
    this.Hte = undefined;
    this.nx = undefined;
    this.CurrentBlendStatus = 0;
    this.ml1 = undefined;
    this.fl1 = undefined;
  }
  AppearEffect(t) {
    if (this.IsInit && this.ll1?.IsValid()) {
      this.ml1 = t;
      this.CurrentBlendStatus = 2;
    } else {
      t(false);
    }
  }
  DisappearEffect(t) {
    if (this.IsInit && this.ll1?.IsValid()) {
      this.fl1 = t;
      this.CurrentBlendStatus = 3;
    } else {
      t(false);
    }
  }
  GetSeamlessTravelActors(t) {
    if (this.ll1) {
      t.push(this.ll1);
    }
    return t;
  }
}
exports.SeamlessTravelPostProcess = SeamlessTravelPostProcess;
//# sourceMappingURL=SeamlessTravelPostProcess.js.map