"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridStarLevelComponent = undefined;
const UE = require("ue");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridStarLevelComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments);
    this.xwt = undefined;
    this.wwt = [];
    this.Bwt = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite]];
  }
  OnActivate() {
    this.xwt = this.GetItem(0);
    this.GetSprite(1).SetUIActive(false);
  }
  OnDeactivate() {
    this.wwt.length = 0;
    this.xwt = undefined;
  }
  GetResourceId() {
    return "UiItem_ItemTagStar";
  }
  OnRefresh(t) {
    if (this.Bwt !== t) {
      this.Bwt = t;
      var i = this.GetSprite(1).GetOwner();
      this.bwt();
      for (let e = 0; e < t; e++) {
        let t = this.wwt[e];
        if (!t?.IsValid()) {
          t = LguiUtil_1.LguiUtil.DuplicateActor(i, this.xwt);
          this.wwt.push(t);
        }
        t?.GetUIItem()?.SetUIActive(true);
      }
    }
    this.SetActive(true);
  }
  bwt() {
    for (const t of this.wwt) {
      t?.GetUIItem()?.SetUIActive(false);
    }
  }
}
exports.MediumItemGridStarLevelComponent = MediumItemGridStarLevelComponent;
//# sourceMappingURL=MediumItemGridStarLevelComponent.js.map