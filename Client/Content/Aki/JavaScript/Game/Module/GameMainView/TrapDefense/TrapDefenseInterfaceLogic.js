"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseInterfaceLogic = undefined;
const TrapDefensePsFeedbackManager_1 = require("../../TrapDefense/TrapDefensePsFeedbackManager");
class TrapDefenseInterfaceLogic {
  constructor(e) {
    this.ViewProxy = undefined;
    this.ViewProxy = e;
  }
  SelectMachine(e) {
    var s = e?.IsBuilding ?? false;
    this.ViewProxy.MobileSkillPanel?.SetIsInBuild(s);
    this.ViewProxy.DesktopSkillPanel?.RefreshButtonByIsInBuild(s);
    this.ViewProxy.BuildTipsPanel.SetIsInSelectBuild(s);
    this.ViewProxy.BuildTipsPanel.ResetCannotMode();
    this.ViewProxy.MachineTipsPanel.SetMachineItem(e);
    TrapDefensePsFeedbackManager_1.TrapDefensePsFeedbackManager.TryRefreshFeedback();
  }
  SliderPointerDown() {
    this.ViewProxy.MobileSkillPanel?.HideBattleChildViewPanel();
  }
  SliderValueChange(e) {
    this.ViewProxy.MachineTipsPanel.SetMachineItem(e);
  }
  SliderDragEnd() {
    this.ViewProxy.MobileSkillPanel?.ShowBattleChildViewPanel();
  }
}
exports.TrapDefenseInterfaceLogic = TrapDefenseInterfaceLogic;
//# sourceMappingURL=TrapDefenseInterfaceLogic.js.map