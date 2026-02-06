"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const HelpStylizeDefine_1 = require("./Stylize/HelpStylizeDefine");
class HelpController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    UE.UIExtendButtonComponent.SetDelegateForHelpClick((0, puerts_1.toManualReleaseDelegate)(HelpController._ti));
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyOpenHelpView, this.nAm);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyOpenHelpView, this.nAm);
  }
  static OpenHelpById(e) {
    var r = ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(e);
    if (r !== undefined && r.length !== 0) {
      this.HelpGroupId = e;
      var t = r[0].Style;
      switch (r[0].Type) {
        case 0:
          UiManager_1.UiManager.OpenView(HelpStylizeDefine_1.helpPopUpViewStylizeMap[t], this.HelpGroupId, this.uti);
          break;
        case 1:
          UiManager_1.UiManager.OpenView("HelpGuideView", this.HelpGroupId, this.uti);
      }
    }
  }
  static OnClear() {
    (0, puerts_1.releaseManualReleaseDelegate)(HelpController._ti);
    return true;
  }
}
exports.HelpController = HelpController;
(_a = HelpController).HelpGroupId = undefined;
HelpController._ti = e => {
  HelpController.OpenHelpById(e);
};
HelpController.uti = e => {
  if (e) {
    _a.HelpGroupId = undefined;
  }
};
HelpController.nAm = e => {
  _a.OpenHelpById(e);
}; //# sourceMappingURL=HelpController.js.map