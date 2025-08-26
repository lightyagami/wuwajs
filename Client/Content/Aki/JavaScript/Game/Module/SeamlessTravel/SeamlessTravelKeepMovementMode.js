"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeamlessTravelKeepMovementMode = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const CustomMovementDefine_1 = require("../../NewWorld/Character/Common/Component/Move/CustomMovementDefine");
const configStateToMovementMode = {
  Kite: [6, CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE],
  Soar: [6, CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR]
};
class SeamlessTravelKeepMovementMode {
  constructor() {
    this.Hte = undefined;
    this.nx = undefined;
    this.kNu = undefined;
    this.ONu = undefined;
    this.cl1 = false;
    this.mQo = false;
  }
  get IsInit() {
    return this.cl1;
  }
  get IsActive() {
    return this.mQo;
  }
  get TargetMovementMode() {
    return this.kNu;
  }
  get TargetCustomMode() {
    return this.ONu;
  }
  SetInitDataWithTargetMode(e, t) {
    this.kNu = e;
    this.ONu = t;
  }
  static GetCurrentKeepableMovementMode(e) {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp?.CharacterMovement;
    var o = t?.MovementMode;
    var t = t?.CustomMovementMode;
    if (o !== undefined && t !== undefined) {
      if (e.KeepMovementStateFeatures?.KeepSoar) {
        var i = this.GetMovementModeByConfigState("Soar");
        if (i && o === i[0] && t === i[1]) {
          return [o, t];
        }
      }
      if (e.KeepMovementStateFeatures?.KeepKite) {
        i = this.GetMovementModeByConfigState("Kite");
        if (i && o === i[0] && t === i[1]) {
          return [o, t];
        }
      }
    }
  }
  static GetMovementModeByConfigState(e) {
    return configStateToMovementMode[e];
  }
  Init(e, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 39, "[无缝传送KeepMovementMode] 初始化(开始)");
    }
    this.Hte = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (this.Hte) {
      if (this.IsInit) {
        t?.(true);
      } else {
        this.nx = e;
        if (this.nx) {
          this.cl1 = true;
          t?.(true);
        } else {
          t?.(false);
        }
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 39, "[无缝传送KeepMovementMode] 初始化失败，无效的ActorComp", ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
      }
      t?.(false);
    }
  }
  Tick(e) {
    var t;
    var o;
    if (this.IsInit && this.IsActive && this.TargetMovementMode !== undefined && (o = this.Hte?.MoveComp?.CharacterMovement) && (t = o.MovementMode, o = o.CustomMovementMode, t !== this.TargetMovementMode || this.TargetCustomMode !== undefined && o !== this.TargetCustomMode)) {
      this.Hte.Actor.KuroSetMovementMode({
        Mode: this.TargetMovementMode,
        CustomMode: this.TargetCustomMode,
        Context: "[SeamlessTravelKeepMovementMode.Tick]"
      });
    }
  }
  Destroy() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 39, "[无缝传送KeepMovementMode] 清理");
    }
    this.cl1 = false;
    this.Hte = undefined;
    this.nx = undefined;
  }
  AppearEffect(e) {
    if (this.IsInit) {
      if (this.IsActive) {
        e?.(true);
      } else if (this.Hte?.Actor.IsValid()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "[无缝传送KeepMovementMode] 开启效果");
        }
        this.mQo = true;
        e?.(true);
      } else {
        e?.(false);
      }
    } else {
      e?.(false);
    }
  }
  DisappearEffect(e) {
    if (this.IsInit) {
      if (this.IsActive) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "[无缝传送KeepMovementMode] 关闭效果");
        }
        this.mQo = false;
      }
      e?.(true);
    } else {
      e?.(false);
    }
  }
}
exports.SeamlessTravelKeepMovementMode = SeamlessTravelKeepMovementMode;
//# sourceMappingURL=SeamlessTravelKeepMovementMode.js.map