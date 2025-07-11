"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboTeachingController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const CheckCondtions_1 = require("./Conditions/CheckCondtions");
class ComboTeachingController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingViewOpen, ComboTeachingController.OnOpenComboTeachingView);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingViewOpen, ComboTeachingController.OnOpenComboTeachingView);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("ComboTeachingView", ComboTeachingController.CheckOpenComboTeachingView, "ComboTeachingController.CheckOpenComboTeachingView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("ComboTeachingView", ComboTeachingController.CheckOpenComboTeachingView);
  }
  static GetSuccessChecker(e, n) {
    switch (e) {
      case 0:
        return new CheckCondtions_1.CheckSkillIdSuccessCondition(n, true);
      case 5:
        return new CheckCondtions_1.CheckTagAddCondition(n, true);
      case 4:
        return new CheckCondtions_1.CheckBuffAddCondition(n, true);
      case 2:
        return new CheckCondtions_1.CheckSkillEnterNextAttrCondition(n, true);
      case 6:
        return new CheckCondtions_1.CheckIsJumpCondition(n, true);
      case 1:
        return new CheckCondtions_1.CheckSkillHitSuccessCondition(n, true);
      case 3:
        return new CheckCondtions_1.CheckEnergyCondition(n, true);
      case 7:
        return new CheckCondtions_1.CheckBuffNotHaveCondition(n, true);
      case 8:
        return new CheckCondtions_1.CheckTagNotHaveCondition(n, true);
      case 9:
        return new CheckCondtions_1.CheckBulletHitCondition(n, true);
      case 10:
        return new CheckCondtions_1.CheckKeyInputCondition(n, true);
      case 11:
        return new CheckCondtions_1.CheckKeyHoldingCondition(n, true);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ComboTeaching", 34, "角色出招教学，成功条件检查未实现", ["type", e]);
    }
    return new CheckCondtions_1.BaseCheckCondition(n, true);
  }
  static GetFailChecker(e, n) {
    switch (e) {
      case 0:
        return new CheckCondtions_1.CheckSkillIdFailCondition(n, false);
      case 2:
        return new CheckCondtions_1.CheckNotInSkillCondition(n, false);
      case 1:
        return new CheckCondtions_1.CheckSkillExitNextAttrCondition(n, false);
      case 4:
        return new CheckCondtions_1.CheckBuffNotHaveCondition(n, false);
      case 5:
        return new CheckCondtions_1.CheckTagNotHaveCondition(n, false);
      case 6:
        return new CheckCondtions_1.CheckIsInJumpCondition(n, false);
      case 3:
        return new CheckCondtions_1.CheckEnergyCondition(n, false);
      case 7:
        return new CheckCondtions_1.CheckKeyInputCondition(n, false);
      case 8:
        return new CheckCondtions_1.CheckKeyHoldingCondition(n, false);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ComboTeaching", 34, "角色出招教学，失败条件检查未实现", ["type", e]);
    }
    return new CheckCondtions_1.BaseCheckCondition(n, false);
  }
}
(exports.ComboTeachingController = ComboTeachingController).OnOpenComboTeachingView = e => {
  ModelManager_1.ModelManager.ComboTeachingModel.RecoveryComboId = e;
  UiManager_1.UiManager.OpenView("ComboTeachingView", e);
};
ComboTeachingController.CheckOpenComboTeachingView = () => ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance(); //# sourceMappingURL=ComboTeachingController.js.map