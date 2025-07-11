"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementStarItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementStarItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i) {
    super();
    this.TGe = 0;
    this.LGe = new Array();
    this.Pe = undefined;
    this.TGe = t;
    this.Pe = e;
    this.CreateThenShowByResourceIdAsync(this.DGe(t), i).then(() => {}, () => {});
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [];
    for (let t = 0; t < this.TGe + 1; ++t) {
      this.ComponentRegisterInfos.push([t, UE.UIItem]);
    }
  }
  OnStart() {
    for (let t = 0; t < this.TGe; ++t) {
      this.LGe.push(this.GetItem(t));
    }
    this.RefreshStar(this.Pe);
  }
  OnBeforeDestroy() {
    if (this.LGe !== undefined) {
      this.LGe.length = 0;
      this.LGe = undefined;
    }
    this.Pe &&= undefined;
  }
  RefreshStar(t) {
    this.LGe.forEach(t => {
      t.SetUIActive(false);
    });
    if (t.IfSingleAchievement()) {
      if (t.CanShowStarState()) {
        for (let t = 0; t < this.TGe; t++) {
          this.LGe[t].SetUIActive(true);
        }
      }
    } else {
      var e = t.GetAchievementShowStar();
      for (let t = 0; t < e; t++) {
        this.LGe[t].SetUIActive(true);
      }
    }
  }
  DGe(t) {
    if (t === 1) {
      return "UiItem_AchvStarA";
    } else if (t === 2) {
      return "UiItem_AchvStarB";
    } else {
      return "UiItem_AchvStarC";
    }
  }
}
exports.AchievementStarItem = AchievementStarItem;
//# sourceMappingURL=AchievementStarItem.js.map