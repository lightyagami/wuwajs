"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelUpController = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class LevelUpController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerLevelChanged, this.x2e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerExpChanged, this.Ngi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFinishLoadingState, this.ivi);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerLevelChanged, this.x2e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerExpChanged, this.Ngi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFinishLoadingState, this.ivi);
  }
}
(exports.LevelUpController = LevelUpController).Ngi = (e, n, r) => {
  var t;
  var o = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
  if (!(o < ConfigManager_1.ConfigManager.LevelUpConfig.GetHiddenLevelUpLevel())) {
    t = ConfigManager_1.ConfigManager.FunctionConfig.GetDifferenceExp(o, n, o, e);
    ModelManager_1.ModelManager.LevelUpModel.SetExpChange(o, e, n, r, t);
  }
};
LevelUpController.x2e = (e, n, r, t, o, a, i) => {
  var s;
  KuroSdkReport_1.KuroSdkReport.OnPlayerLevelChange(n);
  if (!(n < ConfigManager_1.ConfigManager.LevelUpConfig.GetHiddenLevelUpLevel())) {
    s = ConfigManager_1.ConfigManager.FunctionConfig.GetDifferenceExp(e, t, n, r);
    ModelManager_1.ModelManager.LevelUpModel.SetLevelUp(e, n, r, t, o, a, i, s);
  }
};
LevelUpController.ivi = () => {
  var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
  if (!(e < ConfigManager_1.ConfigManager.LevelUpConfig.GetHiddenLevelUpLevel())) {
    ModelManager_1.ModelManager.LevelUpModel.SetShowLevelOnly(e);
  }
}; //# sourceMappingURL=LevelUpController.js.map