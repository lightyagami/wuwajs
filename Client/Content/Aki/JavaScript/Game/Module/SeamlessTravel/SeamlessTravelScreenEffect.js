"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeamlessTravelScreenEffect = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
class SeamlessTravelScreenEffect {
  constructor() {
    this.nx = undefined;
    this.tat = undefined;
    this.eat = undefined;
    this.T0u = undefined;
    this.cl1 = false;
    this.M0u = 0;
    this.E0u = 0;
  }
  get IsInit() {
    return this.cl1;
  }
  Init(e, t) {
    this.nx = e;
    if (this.IsInit) {
      t(true);
    } else {
      this.tat = this.nx.EffectPath;
      this.I0u(e => {
        this.cl1 = true;
        t(e);
      });
    }
  }
  I0u(r) {
    if (this.tat?.length) {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.tat, UE.EffectScreenPlayData_C, (e, t) => {
        var s;
        if (e) {
          this.eat = e;
          this.T0u = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
          e = Math.max(this.nx.EffectExpandTime, this.eat.Start);
          s = this.nx?.FinishParams?.NotStopScreenEffect ? this.nx.EffectCollapseTime : Math.max(this.nx.EffectCollapseTime, this.eat.End);
          this.M0u = e * MathUtils_1.MathUtils.SecondToMillisecond;
          this.E0u = s * MathUtils_1.MathUtils.SecondToMillisecond;
          r(true);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SeamlessTravel", 39, "[SeamlessTravelScreenEffect] 加载DA失败", ["path", t], ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
          }
          r(false);
        }
      }, 102);
    } else {
      r(true);
    }
  }
  Tick(e) {}
  Destroy() {
    if (!this.nx?.FinishParams?.NotStopScreenEffect) {
      if (this.T0u?.IsValid() && this.eat?.IsValid()) {
        this.T0u.DestroyScreenEffect(this.eat);
      }
    }
    this.T0u = undefined;
    this.eat = undefined;
  }
  AppearEffect(e) {
    if (this.IsInit && this.T0u?.IsValid() && this.eat?.IsValid()) {
      SeamlessTravelScreenEffect.SetNeedRenderKuroToonDepth();
      ModelManager_1.ModelManager.ScreenEffectModel?.PlayScreenEffect(this.tat);
      if (this.M0u < TimerSystem_1.MIN_TIME) {
        e?.(true);
      } else {
        TimerSystem_1.TimerSystem.Delay(() => {
          e?.(true);
        }, this.M0u);
      }
    } else {
      e(false);
    }
  }
  DisappearEffect(e) {
    if (this.IsInit && this.T0u?.IsValid() && this.eat?.IsValid()) {
      if (this.nx?.FinishParams?.NotStopScreenEffect) {
        this.T0u.SetEffectExtraState(this.eat, this.nx.FinishParams.ScreenEffectExtraState);
      } else {
        ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffectByPath(this.tat);
      }
      if (this.E0u < TimerSystem_1.MIN_TIME) {
        SeamlessTravelScreenEffect.UnsetNeedRenderKuroToonDepth();
        e?.(true);
      } else {
        TimerSystem_1.TimerSystem.Delay(() => {
          SeamlessTravelScreenEffect.UnsetNeedRenderKuroToonDepth();
          e?.(true);
        }, this.E0u);
      }
    } else {
      e(false);
    }
  }
  GetSeamlessTravelActors(e) {
    var t;
    if (this.T0u?.IsValid() && (e.push(this.T0u), t = (0, puerts_1.$ref)(undefined), this.T0u?.GetScreenEffectGeneralRoot(t), (t = (0, puerts_1.$unref)(t)).IsValid())) {
      e.push(t);
    }
    return e;
  }
  static SetNeedRenderKuroToonDepth() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.kuro.NeedRenderKuroToonDepth 1");
  }
  static UnsetNeedRenderKuroToonDepth() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.kuro.NeedRenderKuroToonDepth 0");
  }
}
exports.SeamlessTravelScreenEffect = SeamlessTravelScreenEffect;
//# sourceMappingURL=SeamlessTravelScreenEffect.js.map