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
    this.IRd = [UiLayerType_1.ELayerType.Pop, UiLayerType_1.ELayerType.Loading, UiLayerType_1.ELayerType.Plot, UiLayerType_1.ELayerType.Normal];
    this.TRd = new Set();
    this.kPt = false;
    this.bRd = undefined;
    this.Tick = e => {
      var i;
      var s;
      if (this.SRd) {
        i = (0, puerts_1.$ref)(0);
        s = (0, puerts_1.$ref)(0);
        Global_1.Global.CharacterController.GetInputMouseDelta(i, s);
        if ((i = Math.abs((0, puerts_1.$unref)(i)) + Math.abs((0, puerts_1.$unref)(s))) > 0 && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] Mouse Input Delta: ", ["Distance", i]);
        }
        s = i > this.Wgu;
        if (Global_1.Global.CharacterController.bShowMouseCursor) {
          if (s) {
            this.ERd = 0;
          } else {
            this.ERd += e;
            if (this.ERd >= this.MRd) {
              InputManager_1.InputManager.SetShowCursor(false);
              this.ERd = 0;
            }
          }
        } else if (s) {
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
    if (!this.SRd) {
      this.SRd = true;
      this.sKe = TickSystem_1.TickSystem.Add(this.Tick, "ImmersiveMouseModule", 0, true, undefined, true).Id;
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.Ui左键点击, InputMappingsDefine_1.actionMappings.Ui右键点击], this.Ndr);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] 开启鼠标沉浸模式 ");
      }
    }
  }
  DisableImmersiveMode() {
    if (this.SRd && (this.SRd = false, this.Reset(), this.sKe !== TickSystem_1.TickSystem.InvalidId && (TickSystem_1.TickSystem.Remove(this.sKe), this.sKe = TickSystem_1.TickSystem.InvalidId), ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.Ui左键点击, InputMappingsDefine_1.actionMappings.Ui右键点击], this.Ndr), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Input", 43, "[ImmersiveMouseModule] 关闭鼠标沉浸模式 ");
    }
  }
  IsImmersiveModeEnabled() {
    return this.SRd;
  }
  Reset() {
    this.ERd = 0;
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
}
exports.ImmersiveMouseModule = ImmersiveMouseModule;
//# sourceMappingURL=ImmersiveMouseModule.js.map