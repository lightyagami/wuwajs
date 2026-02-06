"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPayAdditiveTagItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class TotalTopUpPayAdditiveTagItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture]];
  }
  OnStart() {
    var e;
    var t = ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.GetCurrentScoreIconPath();
    if (t && t !== "") {
      e = this.GetTexture(1);
      this.SetTextureByPath(t, e);
    }
  }
  RefreshByGoodsId(e) {
    var t;
    var i = ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController;
    if (i) {
      t = 0;
      if ((t = i.GetGoodsScore(e)) <= 0) {
        this.SetUiActive(false);
      } else {
        this.SetUiActive(true);
        this.GetText(0)?.SetText(t.toString());
      }
    }
  }
}
exports.TotalTopUpPayAdditiveTagItem = TotalTopUpPayAdditiveTagItem;
//# sourceMappingURL=TotalTopUpPayAdditiveTagItem.js.map