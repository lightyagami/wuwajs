"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UidView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const LguiUtil_1 = require("../Util/LguiUtil");
class UidView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.k4_ = e => {
      var t = this.GetText(0);
      if (t) {
        t.SetUIActive(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPreparePhotoScreenShot, this.k4_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPreparePhotoScreenShot, this.k4_);
  }
  OnStart() {
    let e = "";
    if (FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()) {
      e = " " + ConfigManager_1.ConfigManager.TextConfig.GetTextById("BetaVersionTip");
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "FriendMyUid", "" + ModelManager_1.ModelManager.FunctionModel.PlayerId.toString() + e);
  }
}
exports.UidView = UidView;
//# sourceMappingURL=UidView.js.map