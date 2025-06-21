"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SeamlessTravelSceneEffect = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData");
class SeamlessTravelSceneEffect {
  constructor() {
    this.Hte = void 0, this.nx = void 0, this.I_u = void 0, this.T_u = void 0, this.rvi = void 0, this.ege = void 0, this.qh1 = !1, this.b_u = 0, this.R_u = 0
  }
  get IsInit() {
    return this.qh1
  }
  Init(e, t) {
    this.Hte = Global_1.Global.BaseCharacter?.CharacterActorComponent, this.Hte ? (this.nx = e, this.IsInit ? t(!0) : (this.I_u = this.nx.SceneEffectDaPath, this.L_u(e => {
      this.qh1 = !0, t(e)
    }))) : Log_1.Log.CheckError() && Log_1.Log.Error("SeamlessTravel", 39, "[SeamlessTravelSceneEffect]初始化失败，无效的ActorComp", ["ActorName", Global_1.Global.BaseCharacter?.GetName()])
  }
  L_u(i) {
    this.I_u?.length ? ResourceSystem_1.ResourceSystem.LoadAsync(this.I_u, UE.EffectModelBase, (e, t) => {
      var s;
      e ? (this.T_u = e, e = Math.max(this.nx.EffectExpandTime, this.T_u.StartTime), s = Math.max(this.nx.EffectCollapseTime, this.T_u.EndTime), this.b_u = e * MathUtils_1.MathUtils.SecondToMillisecond, this.R_u = s * MathUtils_1.MathUtils.SecondToMillisecond, i(!0)) : (Log_1.Log.CheckError() && Log_1.Log.Error("SeamlessTravel", 39, "[SeamlessTravelSceneEffect] 加载DA失败", ["path", t], ["ActorName", Global_1.Global.BaseCharacter?.GetName()]), i(!1))
    }) : i(!0)
  }
  Tick(e) {}
  Destroy() {
    this.rvi && EffectSystem_1.EffectSystem.IsValid(this.rvi) && EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[SeamlessTravelSceneEffect] DisappearEffect", !0), this.ege = void 0, this.rvi = void 0, this.T_u = void 0
  }
  AppearEffect(t) {
    this.IsInit && this.Hte?.Actor?.IsValid() && this.T_u?.IsValid() ? this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.Hte.ActorTransform, this.I_u, "[SeamlessTravelSceneEffect] AppearEffect", new EffectContext_1.EffectContext(void 0, this.Hte.Actor), 0, void 0, void 0, e => {
      e = EffectSystem_1.EffectSystem.GetSureEffectActor(e);
      e?.IsValid() ? (this.Hte?.Actor.IsValid() && e.K2_AttachToActor(this.Hte.Actor, void 0, 2, 2, 2, !1), this.ege = e, TimerSystem_1.TimerSystem.Delay(() => {
        t?.(!0)
      }, this.b_u)) : t?.(!1)
    }) : t(!1)
  }
  DisappearEffect(e) {
    this.IsInit ? this.rvi && EffectSystem_1.EffectSystem.IsValid(this.rvi) ? (EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[SeamlessTravelSceneEffect] DisappearEffect", !1), this.ege = void 0, this.rvi = void 0, TimerSystem_1.TimerSystem.Delay(() => {
      e?.(!0)
    }, this.R_u)) : (this.ege = void 0, this.rvi = void 0, e?.(!0)) : e(!1)
  }
  GetSeamlessTravelActors(e) {
    return this.ege && e.push(this.ege), e
  }
}
exports.SeamlessTravelSceneEffect = SeamlessTravelSceneEffect;
//# sourceMappingURL=SeamlessTravelSceneEffect.js.map