"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchHelpView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class FloroRanchHelpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.GetExtraPopFrameType = e => 11;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), () => new FloroRanchHelpItem());
    var e = this.OpenParam;
    var e = ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(e);
    this.eGe.RefreshByData(e);
    if (e.length > 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e[0].Title);
    }
  }
}
exports.FloroRanchHelpView = FloroRanchHelpView;
class FloroRanchHelpItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e, i, r) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Content);
  }
}
//# sourceMappingURL=FloroRanchHelpView.js.map