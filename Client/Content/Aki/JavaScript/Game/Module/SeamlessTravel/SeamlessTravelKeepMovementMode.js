"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SeamlessTravelKeepMovementMode = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  CustomMovementDefine_1 = require("../../NewWorld/Character/Common/Component/Move/CustomMovementDefine"),
  configStateToMovementMode = {
    Kite: [6, CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE]
  };
class SeamlessTravelKeepMovementMode {
  constructor() {
    this.Hte = void 0, this.nx = void 0, this.Sfu = void 0, this.Mfu = void 0, this.qh1 = !1, this.mQo = !1
  }
  get IsInit() {
    return this.qh1
  }
  get IsActive() {
    return this.mQo
  }
  get TargetMovementMode() {
    return this.Sfu
  }
  get TargetCustomMode() {
    return this.Mfu
  }
  SetInitDataWithTargetMode(e, t) {
    this.Sfu = e, this.Mfu = t
  }
  static GetCurrentKeepableMovementMode(e) {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp?.CharacterMovement,
      o = t?.MovementMode,
      t = t?.CustomMovementMode;
    if (void 0 !== o && void 0 !== t && e.KeepMovementStateFeatures?.KeepKite) {
      e = this.GetMovementModeByConfigState("Kite");
      if (e && o === e[0] && t === e[1]) return [o, t]
    }
  }
  static GetMovementModeByConfigState(e) {
    return configStateToMovementMode[e]
  }
  Init(e, t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "[无缝传送KeepMovementMode] 初始化(开始)"), this.Hte = Global_1.Global.BaseCharacter?.CharacterActorComponent, this.Hte ? this.IsInit ? t?.(!0) : (this.nx = e, this.nx ? (this.qh1 = !0, t?.(!0)) : t?.(!1)) : (Log_1.Log.CheckError() && Log_1.Log.Error("Teleport", 39, "[无缝传送KeepMovementMode] 初始化失败，无效的ActorComp", ["ActorName", Global_1.Global.BaseCharacter?.GetName()]), t?.(!1))
  }
  Tick(e) {
    var t, o;
    this.IsInit && this.IsActive && void 0 !== this.TargetMovementMode && (o = this.Hte?.MoveComp?.CharacterMovement) && (t = o.MovementMode, o = o.CustomMovementMode, t !== this.TargetMovementMode || void 0 !== this.TargetCustomMode && o !== this.TargetCustomMode) && this.Hte.Actor.KuroSetMovementMode({
      Mode: this.TargetMovementMode,
      CustomMode: this.TargetCustomMode,
      Context: "[SeamlessTravelKeepMovementMode.Tick]"
    })
  }
  Destroy() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "[无缝传送KeepMovementMode] 清理"), this.qh1 = !1, this.Hte = void 0, this.nx = void 0
  }
  AppearEffect(e) {
    this.IsInit ? this.IsActive ? e?.(!0) : this.Hte?.Actor.IsValid() ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "[无缝传送KeepMovementMode] 开启效果"), this.mQo = !0, e?.(!0)) : e?.(!1) : e?.(!1)
  }
  DisappearEffect(e) {
    this.IsInit ? (this.IsActive && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "[无缝传送KeepMovementMode] 关闭效果"), this.mQo = !1), e?.(!0)) : e?.(!1)
  }
}
exports.SeamlessTravelKeepMovementMode = SeamlessTravelKeepMovementMode;
//# sourceMappingURL=SeamlessTravelKeepMovementMode.js.map