"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHotKeyHandleRoulette = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const RouletteMainViewProxy_1 = require("../../../Module/Roulette/ViewProxy/RouletteMainViewProxy");
const InputDistributeController_1 = require("../../InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../InputDistribute/InputMappingsDefine");
const ViewHotKeyHandle_1 = require("../ViewHotKeyHandle");
class ViewHotKeyHandleRoulette extends ViewHotKeyHandle_1.ViewHotKeyHandle {
  constructor() {
    super(...arguments);
    this.KXa = false;
    this.$Xa = false;
    this.XXa = false;
    this.YXa = 0;
    this.Dut = e => {
      if (this.ActionName && this.ActionName === e) {
        this.zXa(this.JXa());
      }
    };
    this.ZXa = (e, t) => {
      if (this.XXa && this.KXa && (t < -this.YXa || t > this.YXa)) {
        this.$Xa = true;
        this.OnInputAction(this.ActionName, 0);
        this.$Xa = false;
        this.KXa = false;
      }
    };
    this.eYa = (e, t) => {
      this.KXa = t === 0;
      this.OnInputAction(e, t);
    };
  }
  Bind() {
    this.AU();
    InputDistributeController_1.InputDistributeController.BindAction(this.ActionName, this.eYa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActionKeyChanged, this.Dut);
  }
  UnBind() {
    InputDistributeController_1.InputDistributeController.UnBindAction(this.ActionName, this.eYa);
    if (this.XXa) {
      InputDistributeController_1.InputDistributeController.UnBindAxes([InputMappingsDefine_1.axisMappings.LookUp, InputMappingsDefine_1.axisMappings.Turn], this.ZXa);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActionKeyChanged, this.Dut);
  }
  AU() {
    this.YXa = CommonParamById_1.configCommonParamById.GetFloatConfig("Roulette_Gamepad_Open_DeadLimit") ?? 0;
    this.zXa(this.JXa());
  }
  JXa() {
    var e;
    return !!this.ActionName && !!(e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(this.ActionName)) && (e.GetGamepadKeyNameList(e = []), e.length === 1) && InputSettingsManager_1.InputSettingsManager.IsCombinationAxisMainKey(e[0]);
  }
  zXa(e) {
    if (e !== this.XXa) {
      if (e) {
        InputDistributeController_1.InputDistributeController.BindAxes([InputMappingsDefine_1.axisMappings.LookUp, InputMappingsDefine_1.axisMappings.Turn], this.ZXa);
      } else {
        InputDistributeController_1.InputDistributeController.UnBindAxes([InputMappingsDefine_1.axisMappings.LookUp, InputMappingsDefine_1.axisMappings.Turn], this.ZXa);
      }
      this.XXa = e;
    }
  }
  SpecialConditionCheck() {
    return !Info_1.Info.IsInGamepad() || !this.XXa || this.$Xa;
  }
  OnOpenViewImplement() {
    var e = new RouletteMainViewProxy_1.RouletteMainViewProxy();
    e.ActionType = Number(this.ViewParam[0]);
    ControllerHolder_1.ControllerHolder.RouletteController.OpenRouletteMainView(e);
  }
}
exports.ViewHotKeyHandleRoulette = ViewHotKeyHandleRoulette;
//# sourceMappingURL=ViewHotKeyHandleRoulette.js.map