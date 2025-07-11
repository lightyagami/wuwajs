"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSkillIconItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class CommonSkillIconItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  UpdateItem(e) {
    var s = this.GetTexture(0);
    if (e) {
      this.SetTextureByPath(e, s);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
}
exports.CommonSkillIconItem = CommonSkillIconItem;
//# sourceMappingURL=CommonSkillIconItem.js.map