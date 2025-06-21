"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SeamlessTravelScreenEffect = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
class SeamlessTravelScreenEffect {
  constructor() {
    this.nx = void 0, this.tat = void 0, this.eat = void 0, this.w_u = void 0, this.qh1 = !1, this.b_u = 0, this.R_u = 0
  }
  get IsInit() {
    return this.qh1
  }
  Init(e, t) {
    this.nx = e, this.IsInit ? t(!0) : (this.tat = this.nx.EffectPath, this.L_u(e => {
      this.qh1 = !0, t(e)
    }))
  }
  L_u(r) {
    this.tat?.length ? ResourceSystem_1.ResourceSystem.LoadAsync(this.tat, UE.EffectScreenPlayData_C, (e, t) => {
      var s;
      e ? (this.eat = e, this.w_u = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance(), e = Math.max(this.nx.EffectExpandTime, this.eat.Start), s = this.nx?.FinishParams?.NotStopScreenEffect ? this.nx.EffectCollapseTime : Math.max(this.nx.EffectCollapseTime, this.eat.End), this.b_u = e * MathUtils_1.MathUtils.SecondToMillisecond, this.R_u = s * MathUtils_1.MathUtils.SecondToMillisecond, r(!0)) : (Log_1.Log.CheckError() && Log_1.Log.Error("SeamlessTravel", 39, "[SeamlessTravelScreenEffect] 加载DA失败", ["path", t], ["ActorName", Global_1.Global.BaseCharacter?.GetName()]), r(!1))
    }, 102) : r(!0)
  }
  Tick(e) {}
  Destroy() {
    this.nx?.FinishParams?.NotStopScreenEffect || this.w_u?.IsValid() && this.eat?.IsValid() && this.w_u.DestroyScreenEffect(this.eat), this.w_u = void 0, this.eat = void 0
  }
  AppearEffect(e) {
    this.IsInit && this.w_u?.IsValid() && this.eat?.IsValid() ? (SeamlessTravelScreenEffect.SetNeedRenderKuroToonDepth(), ModelManager_1.ModelManager.ScreenEffectModel?.PlayScreenEffect(this.tat), this.b_u < TimerSystem_1.MIN_TIME ? e?.(!0) : TimerSystem_1.TimerSystem.Delay(() => {
      e?.(!0)
    }, this.b_u)) : e(!1)
  }
  DisappearEffect(e) {
    this.IsInit && this.w_u?.IsValid() && this.eat?.IsValid() ? (this.nx?.FinishParams?.NotStopScreenEffect ? this.w_u.SetEffectExtraState(this.eat, this.nx.FinishParams.ScreenEffectExtraState) : ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffectByPath(this.tat), this.R_u < TimerSystem_1.MIN_TIME ? (SeamlessTravelScreenEffect.UnsetNeedRenderKuroToonDepth(), e?.(!0)) : TimerSystem_1.TimerSystem.Delay(() => {
      SeamlessTravelScreenEffect.UnsetNeedRenderKuroToonDepth(), e?.(!0)
    }, this.R_u)) : e(!1)
  }
  GetSeamlessTravelActors(e) {
    var t;
    return this.w_u?.IsValid() && (e.push(this.w_u), t = (0, puerts_1.$ref)(void 0), this.w_u?.GetScreenEffectGeneralRoot(t), (t = (0, puerts_1.$unref)(t)).IsValid()) && e.push(t), e
  }
  static SetNeedRenderKuroToonDepth() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.kuro.NeedRenderKuroToonDepth 1")
  }
  static UnsetNeedRenderKuroToonDepth() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.kuro.NeedRenderKuroToonDepth 0")
  }
}
exports.SeamlessTravelScreenEffect = SeamlessTravelScreenEffect;
//# sourceMappingURL=SeamlessTravelScreenEffect.js.map