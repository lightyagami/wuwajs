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
    this.i1d();
  }
  static TryRefreshFeedback() {
    if (this.r1d()) {
      this.o1d();
    } else {
      this.i1d();
    }
  }
  static mSe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputDistributeTagChanged, TrapDefensePsFeedbackManager.xMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonKeySettingKeyChange, this.n1d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshTrapDefensePsFeedback, this.WLd);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  static dSe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputDistributeTagChanged, TrapDefensePsFeedbackManager.xMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonKeySettingKeyChange, this.n1d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshTrapDefensePsFeedback, this.WLd);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
  }
  static s1d() {
    return ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag);
  }
  static r1d() {
    return !!this.s1d() && !!TDPlayerController_1.TowerDefensePlayerController.IsPlayerFollowerEnabled() && !this.yCd && TDPlayerController_1.TowerDefensePlayerController.Model.FollowerState === 2;
  }
  static QLd() {
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
  static o1d() {
    if (TDPlayerController_1.TowerDefensePlayerController.Model.CurrentFollowerProxyId) {
      let e = TDPlayerController_1.TowerDefensePlayerController.Model.PsFeedbackId;
      if (e = e || this.QLd()) {
        ControllerHolder_1.ControllerHolder.GamepadController.TryAddFeedbackReason("TrapDefense", e);
      } else {
        this.i1d();
      }
    }
  }
  static i1d() {
    ControllerHolder_1.ControllerHolder.GamepadController.RemoveFeedbackReason("TrapDefense");
  }
}
exports.TrapDefensePsFeedbackManager = TrapDefensePsFeedbackManager;
(_a = TrapDefensePsFeedbackManager).yCd = false;
TrapDefensePsFeedbackManager.xMe = e => {
  _a.TryRefreshFeedback();
};
TrapDefensePsFeedbackManager.WLd = () => {
  _a.TryRefreshFeedback();
};
TrapDefensePsFeedbackManager.n1d = (e, t) => {
  var r = ConfigManager_1.ConfigManager.GamepadConfig?.GetPsFeedbackReason("TrapDefense");
  if (e.GetActionOrAxisName() === r?.ActionName && t === 2) {
    _a.TryRefreshFeedback();
  }
};
TrapDefensePsFeedbackManager.RZe = (e, t) => {
  _a.yCd = t === 0;
  _a.TryRefreshFeedback();
}; //# sourceMappingURL=TrapDefensePsFeedbackManager.js.map