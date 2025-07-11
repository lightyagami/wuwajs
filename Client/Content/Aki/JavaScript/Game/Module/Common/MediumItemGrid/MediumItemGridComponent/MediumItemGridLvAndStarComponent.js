"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridLvAndStarComponent = undefined;
const UE = require("ue");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridLvAndStarComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
  }
  GetResourceId() {
    return "UiItem_ItemRoleInfo";
  }
  OnRefresh(e) {
    if (e) {
      this.SetLevel(e.Level);
      this.SetStar(e.Star);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
  SetLevel(e) {
    this.GetText(0).SetUIActive(e !== undefined);
    if (e !== undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Text_LevelShow_Text", e);
    }
  }
  SetStar(e) {
    this.GetItem(1).SetUIActive(e !== undefined);
    if (e !== undefined) {
      this.GetText(3).SetText(e.toString());
    }
  }
}
exports.MediumItemGridLvAndStarComponent = MediumItemGridLvAndStarComponent;
//# sourceMappingURL=MediumItemGridLvAndStarComponent.js.map