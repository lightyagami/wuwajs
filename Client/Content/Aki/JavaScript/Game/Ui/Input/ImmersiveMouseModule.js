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
    this.SRd = false;
    this.Wgu = 0.1;
    this.MRd = 3000;
    this.ERd = 0;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.jYd = [InputMappingsDefine_1.actionMappings.Ui左键点击, InputMappingsDefine_1.actionMappings.Ui右键点击];
    this.IRd = [UiLayerType_1.ELayerType.Pop, UiLayerType_1.ELayerType.Loading, UiLayerType_1.ELayerType.Plot, UiLayerType_1.ELayerType.Normal];
    this.TRd = new Set();
    this.kPt = false;
    this.bRd = undefined;
    this.qua = new Set();
    this.HYd = true;
    this.Tick = e => {
      var i;
      var s;
      if (!!this.SRd && !(this.qua.size > 0)) {
        s = (0, puerts_1.$ref)(0);
        i = (0, puerts_1.$ref)(0);
        Global_1.Global.CharacterController.GetInputMouseDelta(s, i);
        if ((s = Math.abs((0, puerts_1.$unref)(s)) + Math.abs((0, puerts_1.$unref)(i))) > 0 && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] Mouse Input Delta: ", ["Distance", s]);
        }
        i = this.$Yd();
        s = s > this.Wgu;
        if (Global_1.Global.CharacterController.bShowMouseCursor) {
          if (s || i) {
            this.ERd = 0;
          } else {
            this.ERd += e;
            if (this.ERd >= this.MRd) {
              InputManager_1.InputManager.SetShowCursor(false);
              this.ERd = 0;
            }
          }
        } else if (s || i) {
          InputManager_1.InputManager.SetShowCursor(true);
          this.ERd = 0;
        }
      }
    };
    this.Ndr = (e, i) => {
      if (this.SRd && !Global_1.Global.CharacterController.bShowMouseCursor) {
        InputManager_1.InputManager.SetShowCursor(true);
        this.ERd = 0;
      }
    };
  }
  Initialize() {
    if (!this.kPt) {
      this.kPt = true;
      this.Reset();
      for (const e of ConfigManager_1.ConfigManager.ImmersiveMouseConfig.GetAllImmersiveMouseViewConfig()) {
        this.TRd.add(e.ViewName);
      }
    }
  }
  EnableImmersiveMode() {
    if (!this.SRd && this.HYd && (this.SRd = true, this.sKe = TickSystem_1.TickSystem.Add(this.Tick, "ImmersiveMouseModule", 0, true, undefined, true).Id, ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions(this.jYd, this.Ndr), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] 开启鼠标沉浸模式 ");
    }
  }
  DisableImmersiveMode() {
    if (this.SRd && (this.SRd = false, this.Reset(), this.sKe !== TickSystem_1.TickSystem.InvalidId && (TickSystem_1.TickSystem.Remove(this.sKe), this.sKe = TickSystem_1.TickSystem.InvalidId), ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions(this.jYd, this.Ndr), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] 关闭鼠标沉浸模式 ");
    }
  }
  IsImmersiveModeEnabled() {
    return this.SRd;
  }
  PauseImmersiveMode(e, i = true, s = true) {
    this.qua.add(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] 暂停鼠标沉浸模式 ", ["Reason", e], ["bReset", i], ["bShowCursor", s]);
    }
    if (this.SRd && (i && this.Reset(), s)) {
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
    this.ERd = 0;
  }
  $Yd() {
    for (const e of this.jYd) {
      if (ModelManager_1.ModelManager.InputDistributeModel.IsActionInPress(e)) {
        return true;
      }
    }
    return false;
  }
  RefreshMouseImmersiveMode() {
    let e = undefined;
    for (const s of this.IRd) {
      if (e = UiModel_1.UiModel.GetTopView(s)) {
        break;
      }
    }
    var i;
    if (e && (i = e.Info.Name) !== this.bRd) {
      this.bRd = i;
      if (this.TRd.has(i)) {
        this.RRd(i);
        if (!this.SRd) {
          this.EnableImmersiveMode();
        }
      } else if (this.SRd) {
        this.DisableImmersiveMode();
      }
    }
  }
  RRd(e) {
    e = ConfigManager_1.ConfigManager.ImmersiveMouseConfig.GetImmersiveMouseViewConfigByViewName(e);
    if (e) {
      this.MRd = e.AutoHideTime;
      this.Wgu = e.DeadZone;
    }
  }
  SetFunctionEnabled(e, i = true, s = true) {
    this.HYd = e;
    if (this.HYd) {
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
    return this.HYd;
  }
}
exports.ImmersiveMouseModule = ImmersiveMouseModule;
//# sourceMappingURL=ImmersiveMouseModule.js.map