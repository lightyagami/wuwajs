"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekCardScoreItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeekCardScoreItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture]];
  }
  Refresh(e) {
    var i = this.GetText(0);
    i.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(e.Tips));
    if (!StringUtils_1.StringUtils.IsEmpty(e.Tips)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.Tips);
    }
    this.GetText(1).SetText(e.Count.toString());
    this.SetTextureByPath(e.IconPath, this.GetTexture(2));
  }
}
exports.WeekCardScoreItem = WeekCardScoreItem;
//# sourceMappingURL=WeekCardScoreItem.js.map