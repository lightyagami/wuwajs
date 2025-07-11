"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginOfficialStatusView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class LoginOfficialStatusView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.RefreshStatus = () => {
      var e = ModelManager_1.ModelManager.LoginModel.GetLoginStatus();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "ELoginStatus", e);
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoginStatusChange, this.RefreshStatus);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoginStatusChange, this.RefreshStatus);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.RefreshStatus();
  }
}
exports.LoginOfficialStatusView = LoginOfficialStatusView;
//# sourceMappingURL=LoginOfficialStatusView.js.map