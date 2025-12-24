"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmersiveMouseModule = undefined;
const puerts_1 = require("puerts");
const Log_1 = require("../../../Core/Common/Log");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiLayerType_1 = require("../Define/UiLayerType");
const InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine");
const UiModel_1 = require("../UiModel");
const InputManager_1 = require("./InputManager");
class ImmersiveMouseModule {
  constructor() {
    this.KLd = false;
    this.Wgu = 0.1;
    this.XLd = 3000;
    this.YLd = 0;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this._Lm = [InputMappingsDefine_1.actionMappings.Ui左键点击, InputMappingsDefine_1.actionMappings.Ui右键点击];
    this.zLd = [UiLayerType_1.ELayerType.Pop, UiLayerType_1.ELayerType.Loading, UiLayerType_1.ELayerType.Plot, UiLayerType_1.ELayerType.Normal];
    this.JLd = new Set();
    this.kPt = false;
    this.ZLd = undefined;
    this.qua = new Set();
    this.uLm = true;
    this.j6f = false;
    this.Tick = e => {
      var i;
      var s;
      var t;
      if (!!this.KLd && !(this.qua.size > 0)) {
        i = this.j6f;
        this.j6f = this.$6f();
        if (this.j6f) {
          t = (0, puerts_1.$ref)(0);
          s = (0, puerts_1.$ref)(0);
          Global_1.Global.CharacterController.GetInputMouseDelta(t, s);
          if ((t = Math.abs((0, puerts_1.$unref)(t)) + Math.abs((0, puerts_1.$unref)(s))) > 0 && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] Mouse Input Delta: ", ["Distance", t]);
          }
          s = this.cLm();
          t = t > this.Wgu;
          if (Global_1.Global.CharacterController.bShowMouseCursor) {
            if (t || s) {
              this.YLd = 0;
            } else {
              this.YLd += e;
              if (this.YLd >= this.XLd) {
                InputManager_1.InputManager.SetShowCursor(false);
                this.YLd = 0;
              }
            }
          } else if (t || s) {
            InputManager_1.InputManager.SetShowCursor(true);
            this.YLd = 0;
          }
        } else {
          this.YLd = 0;
          if (i && !Global_1.Global.CharacterController.bShowMouseCursor) {
            InputManager_1.InputManager.SetShowCursor(true);
          }
        }
      }
    };
    this.Ndr = (e, i) => {
      if (this.KLd && !Global_1.Global.CharacterController.bShowMouseCursor) {
        InputManager_1.InputManager.SetShowCursor(true);
        this.YLd = 0;
      }
    };
  }
  Initialize() {
    if (!this.kPt) {
      this.kPt = true;
      this.Reset();
      for (const e of ConfigManager_1.ConfigManager.ImmersiveMouseConfig.GetAllImmersiveMouseViewConfig()) {
        this.JLd.add(e.ViewName);
      }
    }
  }
  EnableImmersiveMode() {
    if (!this.KLd && this.uLm && (this.KLd = true, this.sKe = TickSystem_1.TickSystem.Add(this.Tick, "ImmersiveMouseModule", 0, true, undefined, true).Id, ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions(this._Lm, this.Ndr), this.j6f = this.$6f(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] 开启鼠标沉浸模式 ");
    }
  }
  DisableImmersiveMode() {
    if (this.KLd && (this.KLd = false, this.Reset(), this.sKe !== TickSystem_1.TickSystem.InvalidId && (TickSystem_1.TickSystem.Remove(this.sKe), this.sKe = TickSystem_1.TickSystem.InvalidId), ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions(this._Lm, this.Ndr), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] 关闭鼠标沉浸模式 ");
    }
  }
  IsImmersiveModeEnabled() {
    return this.KLd;
  }
  PauseImmersiveMode(e, i = true, s = true) {
    this.qua.add(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] 暂停鼠标沉浸模式 ", ["Reason", e], ["bReset", i], ["bShowCursor", s]);
    }
    if (this.KLd && (i && this.Reset(), s)) {
      InputManager_1.InputManager.SetShowCursor(true);
    }
  }
  ResumeImmersiveMode(e) {
    if (this.qua.delete(e)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] 恢复鼠标沉浸模式 ", ["Reason", e]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] 恢复鼠标沉浸模式失败 ", ["Reason", e]);
    }
  }
  Reset() {
    this.YLd = 0;
  }
  cLm() {
    for (const e of this._Lm) {
      if (ModelManager_1.ModelManager.InputDistributeModel.IsActionInPress(e)) {
        return true;
      }
    }
    return false;
  }
  $6f() {
    var e = (0, puerts_1.$ref)(0);
    var i = (0, puerts_1.$ref)(0);
    return Global_1.Global.CharacterController.GetMousePosition(e, i);
  }
  RefreshMouseImmersiveMode() {
    let e = undefined;
    for (const s of this.zLd) {
      if (e = UiModel_1.UiModel.GetTopView(s)) {
        break;
      }
    }
    var i;
    if (e && (i = e.Info.Name) !== this.ZLd) {
      this.ZLd = i;
      if (this.JLd.has(i)) {
        this.ePd(i);
        if (!this.KLd) {
          this.EnableImmersiveMode();
        }
      } else if (this.KLd) {
        this.DisableImmersiveMode();
      }
    }
  }
  ePd(e) {
    e = ConfigManager_1.ConfigManager.ImmersiveMouseConfig.GetImmersiveMouseViewConfigByViewName(e);
    if (e) {
      this.XLd = e.AutoHideTime;
      this.Wgu = e.DeadZone;
    }
  }
  SetFunctionEnabled(e, i = true, s = true) {
    this.uLm = e;
    if (this.uLm) {
      if (i) {
        this.Reset();
      }
      if (s) {
        InputManager_1.InputManager.SetShowCursor(true);
      }
    } else {
      this.DisableImmersiveMode();
    }
  }
  IsFunctionEnabled() {
    return this.uLm;
  }
}
exports.ImmersiveMouseModule = ImmersiveMouseModule;
//# sourceMappingURL=ImmersiveMouseModule.js.map