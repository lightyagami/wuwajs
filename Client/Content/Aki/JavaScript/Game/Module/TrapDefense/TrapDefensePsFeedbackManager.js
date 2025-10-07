"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefensePsFeedbackManager = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TDPlayerController_1 = require("../../KuroSimpleCombat/TD/TDPlayer/TDPlayerController");
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
    this.Y_d();
  }
  static TryRefreshFeedback() {
    if (this.z_d()) {
      this.J_d();
    } else {
      this.Y_d();
    }
  }
  static mSe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputDistributeTagChanged, TrapDefensePsFeedbackManager.xMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonKeySettingKeyChange, this.Z_d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshTrapDefensePsFeedback, this.vRd);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  static dSe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputDistributeTagChanged, TrapDefensePsFeedbackManager.xMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonKeySettingKeyChange, this.Z_d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshTrapDefensePsFeedback, this.vRd);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  static e1d() {
    return ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag);
  }
  static z_d() {
    return !!this.e1d() && !!TDPlayerController_1.TowerDefensePlayerController.IsPlayerFollowerEnabled() && !this.rgd && TDPlayerController_1.TowerDefensePlayerController.Model.FollowerState === 2;
  }
  static yRd() {
    var e = TDPlayerController_1.TowerDefensePlayerController.Model.CurrentFollowerProxyId;
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
  static J_d() {
    if (TDPlayerController_1.TowerDefensePlayerController.Model.CurrentFollowerProxyId) {
      let e = TDPlayerController_1.TowerDefensePlayerController.Model.PsFeedbackId;
      if (e = e || this.yRd()) {
        ControllerHolder_1.ControllerHolder.GamepadController.TryAddFeedbackReason("TrapDefense", e);
      } else {
        this.Y_d();
      }
    }
  }
  static Y_d() {
    ControllerHolder_1.ControllerHolder.GamepadController.RemoveFeedbackReason("TrapDefense");
  }
}
exports.TrapDefensePsFeedbackManager = TrapDefensePsFeedbackManager;
(_a = TrapDefensePsFeedbackManager).rgd = false;
TrapDefensePsFeedbackManager.xMe = e => {
  _a.TryRefreshFeedback();
};
TrapDefensePsFeedbackManager.vRd = () => {
  _a.TryRefreshFeedback();
};
TrapDefensePsFeedbackManager.Z_d = (e, t) => {
  var r = ConfigManager_1.ConfigManager.GamepadConfig?.GetPsFeedbackReason("TrapDefense");
  if (e.GetActionOrAxisName() === r?.ActionName && t === 2) {
    _a.TryRefreshFeedback();
  }
};
TrapDefensePsFeedbackManager.RZe = (e, t) => {
  _a.rgd = t === 0;
  _a.TryRefreshFeedback();
}; //# sourceMappingURL=TrapDefensePsFeedbackManager.js.map