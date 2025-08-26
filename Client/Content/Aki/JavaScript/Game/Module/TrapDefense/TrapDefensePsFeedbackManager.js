"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefensePsFeedbackManager = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class TrapDefensePsFeedbackManager {
  static Initialize() {
    this.mSe();
  }
  static Clear() {
    this.dSe();
    this.Wsd();
  }
  static TryRefreshFeedback() {
    if (this.Qsd()) {
      this.Ksd();
    } else {
      this.Wsd();
    }
  }
  static mSe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputDistributeTagChanged, TrapDefensePsFeedbackManager.xMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonKeySettingKeyChange, this.Xsd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshTrapDefensePsFeedback, this.Ncd);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  static dSe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputDistributeTagChanged, TrapDefensePsFeedbackManager.xMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonKeySettingKeyChange, this.Xsd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshTrapDefensePsFeedback, this.Ncd);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  static Ysd() {
    return ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag);
  }
  static Qsd() {
    return !!this.Ysd() && !!ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.IsPlayerFollowerEnabled() && !this.A_d && ModelManager_1.ModelManager.TowerDefensePlayerModel?.FollowerState === 2;
  }
  static Vcd() {
    var e = ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.Model.CurrentFollowerProxyId;
    if (e) {
      e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryById(e);
      if (e) {
        e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryTypeById(e.AuxiliaryType);
        if (e) {
          return e.PsFeedbackId;
        }
      }
    }
  }
  static Ksd() {
    if (ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.Model.CurrentFollowerProxyId) {
      let e = ModelManager_1.ModelManager.TowerDefensePlayerModel?.PsFeedbackId;
      if (e = e || this.Vcd()) {
        ControllerHolder_1.ControllerHolder.GamepadController.TryAddFeedbackReason("TrapDefense", e);
      } else {
        this.Wsd();
      }
    }
  }
  static Wsd() {
    ControllerHolder_1.ControllerHolder.GamepadController.RemoveFeedbackReason("TrapDefense");
  }
}
exports.TrapDefensePsFeedbackManager = TrapDefensePsFeedbackManager;
(_a = TrapDefensePsFeedbackManager).A_d = false;
TrapDefensePsFeedbackManager.xMe = e => {
  _a.TryRefreshFeedback();
};
TrapDefensePsFeedbackManager.Ncd = () => {
  _a.TryRefreshFeedback();
};
TrapDefensePsFeedbackManager.Xsd = (e, t) => {
  var a = ConfigManager_1.ConfigManager.GamepadConfig?.GetPsFeedbackReason("TrapDefense");
  if (e.GetActionOrAxisName() === a?.ActionName && t === 2) {
    _a.TryRefreshFeedback();
  }
};
TrapDefensePsFeedbackManager.RZe = (e, t) => {
  _a.A_d = t === 0;
  _a.TryRefreshFeedback();
}; //# sourceMappingURL=TrapDefensePsFeedbackManager.js.map