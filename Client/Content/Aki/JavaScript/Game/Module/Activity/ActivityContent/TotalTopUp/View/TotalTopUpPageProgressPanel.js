"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPageProgressPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const TotalTopUpPageGetScoreBtnItem_1 = require("./TotalTopUpPageGetScoreBtnItem");
class TotalTopUpPageProgressPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Txg = undefined;
    this.ckg = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    var t = this.GetItem(3);
    this.ckg = new TotalTopUpPageGetScoreBtnItem_1.TotalTopUpPageGetScoreBtnItem();
    var t = this.ckg.CreateByActorAsync(t.GetOwner());
    e.push(t);
    await Promise.all(e);
    this.ckg.OnClickCallback = () => {
      this.Txg?.GotoStore();
    };
    this.ckg.SetUiActive(true);
  }
  Refresh(e) {
    this.Txg = e;
    this.GetText(0)?.SetText("" + e.CurrentScore);
    this.GetText(1)?.SetText("" + e.NextScore);
    var t = this.GetSprite(2);
    var s = e.ProgressPercent;
    t?.SetFillAmount(s);
    var t = e.ProgressPercent >= 1;
    this.GetItem(5)?.SetUIActive(t);
    this.GetItem(4)?.SetUIActive(!t);
  }
}
exports.TotalTopUpPageProgressPanel = TotalTopUpPageProgressPanel;
//# sourceMappingURL=TotalTopUpPageProgressPanel.js.map