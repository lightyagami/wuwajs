"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridComposeTag = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridComposeTag extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UIItem], [1, UE.UIItem], [3, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ComposeItem";
  }
  OnRefresh(e) {
    this.GetItem(2).SetUIActive(e.IsRefreshItem);
    this.GetItem(1).SetUIActive(e.IsLimitTimeItem);
    this.RefreshBuffIcon(e.BuffItem);
    this.SetActive(e.IsRefreshItem || e.IsLimitTimeItem || e.BuffItem !== 0);
  }
  RefreshBuffIcon(s) {
    if (s === undefined || s === 0) {
      this.GetSprite(3).SetUIActive(false);
    } else {
      this.GetSprite(3).SetUIActive(true);
      let e = undefined;
      var t = ModelManager_1.ModelManager.MediumItemGridModel;
      switch (s) {
        case 1:
          e = t.AttackBuffSpritePath;
          break;
        case 2:
          e = t.DefenseBuffSpritePath;
          break;
        case 3:
          e = t.RestoreHealthBuffSpritePath;
          break;
        case 4:
          e = t.RechargeBuffSpritePath;
          break;
        case 5:
          e = t.ResurrectionBuffSpritePath;
          break;
        case 6:
          e = t.ExploreBuffSpritePath;
      }
      if (e) {
        s = this.GetSprite(3);
        this.SetSpriteByPath(e, s, false);
      }
    }
  }
}
exports.MediumItemGridComposeTag = MediumItemGridComposeTag;
//# sourceMappingURL=MediumItemGridComposeTag.js.map