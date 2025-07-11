"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTabTitle = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class CommonTabTitle extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  UpdateIcon(e) {
    this.SetSpriteByPath(e, this.GetSprite(0), false);
  }
  UpdateTitle(e) {
    var t = this.GetText(1);
    if (e) {
      t.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.TextId, ...e.Args);
    } else {
      t.SetUIActive(false);
    }
  }
}
exports.CommonTabTitle = CommonTabTitle;
//# sourceMappingURL=CommonTabTitle.js.map