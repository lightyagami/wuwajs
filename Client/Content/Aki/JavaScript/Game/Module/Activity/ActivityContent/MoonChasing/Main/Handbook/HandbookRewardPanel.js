"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandbookRewardPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const HandbookRewardItem_1 = require("./HandbookRewardItem");
const REWARD_WIDTH = 120;
class HandbookRewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.t2t = undefined;
    this.qte = 0;
    this.BY = 0;
    this.a2t = [];
    this.h2t = 0;
    this.l2t = 0;
    this._2t = REWARD_WIDTH;
    this.u2t = 0;
    this.c2t = 0;
    this.d2t = () => {
      var t = this.GetItem(1);
      var i = this.GetSprite(2);
      LguiUtil_1.LguiUtil.CopyItem(i, t).SetUIActive(true);
      var i = this.GetItem(5);
      var t = this.GetSprite(6);
      LguiUtil_1.LguiUtil.CopyItem(t, i).SetUIActive(true);
      return new HandbookRewardItem_1.HandbookRewardItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite]];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.d2t);
    var t = this.GetItem(0);
    this.l2t = t.GetWidth();
    this.t2t = this.GetItem(0);
    this.GetSprite(2).SetUIActive(false);
    this.GetSprite(6).SetUIActive(false);
  }
  OnBeforeShow() {
    this.Refresh();
  }
  OnBeforeDestroy() {
    this.t2t = undefined;
  }
  Refresh() {
    this.a2t = ModelManager_1.ModelManager.MoonChasingModel.HandbookRewardIdList;
    this.qte = ModelManager_1.ModelManager.MoonChasingModel.GetHandbookUnlockCount();
    this.h2t = 0;
    for (const i of this.a2t) {
      var t = ModelManager_1.ModelManager.MoonChasingModel.GetHandbookRewardDataById(i);
      if (t) {
        if (t.GetState(this.qte) !== 0) {
          this.h2t++;
        }
        this.BY = Math.max(t.Goal, this.BY);
      }
    }
    this.c2t = this.a2t.length;
    if (!(this.c2t <= 0)) {
      this.H3e.RefreshByData(this.a2t);
      this.u2t = (this.l2t - this._2t * (this.c2t - 1)) / this.c2t;
      this.C2t(this.qte / this.BY);
    }
  }
  RefreshLayout() {
    this.a2t = ModelManager_1.ModelManager.MoonChasingModel.HandbookRewardIdList;
    this.H3e.RefreshByData(this.a2t);
  }
  C2t(t) {
    var i = Math.min(this.h2t, this.c2t - 1) * this._2t;
    var t = this.u2t * this.c2t * Math.min(t, 1);
    var i = this.l2t - i - t;
    this.t2t.SetStretchRight(i);
  }
}
exports.HandbookRewardPanel = HandbookRewardPanel;
//# sourceMappingURL=HandbookRewardPanel.js.map