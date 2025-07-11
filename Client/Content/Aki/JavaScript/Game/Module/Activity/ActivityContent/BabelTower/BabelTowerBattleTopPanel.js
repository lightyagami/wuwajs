"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerBattleTopPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const BattleVisibleChildView_1 = require("../../../BattleUi/Views/BattleChildView/BattleVisibleChildView");
class BabelTowerBattleTopPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.zlc = 0;
    this.Wd1 = false;
    this.Jlc = () => {
      var e = [];
      var t = [];
      var i = ModelManager_1.ModelManager.BabelTowerModel.CurrentChallengeInstData;
      var s = i?.BuffSelection;
      if (s) {
        for (const n of s) {
          var a = {
            Id: n,
            IsDeTerm: false,
            CanClick: true,
            ShowStar: false
          };
          e.push(a);
        }
      }
      s = i?.DeTermIdList;
      if (s) {
        for (const h of s) {
          var r = {
            Id: h,
            IsDeTerm: true,
            CanClick: true,
            ShowStar: true
          };
          t.push(r);
        }
      }
      i = {
        BuffDataList: e,
        DeTermDataList: t
      };
      UiManager_1.UiManager.OpenView("BabelTowerBuffView", i);
    };
    this.Zlc = () => {
      var e = ModelManager_1.ModelManager.BabelTowerModel.GetCurStarNum();
      this.Update(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.Jlc]];
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(4);
    this.SetVisible(1, false);
  }
  Reset() {
    super.Reset();
  }
  LZs() {
    if (!this.Wd1) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBabelActivityInstInfoUpdate, this.Zlc);
      this.Wd1 = true;
    }
  }
  DZs() {
    if (this.Wd1) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBabelActivityInstInfoUpdate, this.Zlc);
      this.Wd1 = false;
    }
  }
  Update(e) {
    this.zlc = e;
    this.Refresh();
  }
  Refresh() {
    this.GetText(1).SetText(this.zlc.toString());
  }
  StartShow() {
    var e = ModelManager_1.ModelManager.BabelTowerModel.CurrentChallengeInstData?.CurStarNum ?? 0;
    this.Update(e);
    this.SetVisible(1, true);
  }
  EndShow() {
    this.SetVisible(1, false);
  }
  OnShowBattleChildView() {
    this.LZs();
  }
  OnHideBattleChildView() {
    this.DZs();
  }
}
exports.BabelTowerBattleTopPanel = BabelTowerBattleTopPanel;
//# sourceMappingURL=BabelTowerBattleTopPanel.js.map