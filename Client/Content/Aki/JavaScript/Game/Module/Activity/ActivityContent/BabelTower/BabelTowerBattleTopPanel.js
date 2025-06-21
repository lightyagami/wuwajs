"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerBattleTopPanel = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  BattleVisibleChildView_1 = require("../../../BattleUi/Views/BattleChildView/BattleVisibleChildView");
class BabelTowerBattleTopPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments), this.zlc = 0, this.yd1 = !1, this.Jlc = () => {
      var e = [],
        t = [],
        i = ModelManager_1.ModelManager.BabelTowerModel.CurrentChallengeInstData,
        s = i?.BuffSelection;
      if (s)
        for (const n of s) {
          var a = {
            Id: n,
            IsDeTerm: !1,
            CanClick: !0,
            ShowStar: !1
          };
          e.push(a)
        }
      s = i?.DeTermIdList;
      if (s)
        for (const h of s) {
          var r = {
            Id: h,
            IsDeTerm: !0,
            CanClick: !0,
            ShowStar: !0
          };
          t.push(r)
        }
      i = {
        BuffDataList: e,
        DeTermDataList: t
      };
      UiManager_1.UiManager.OpenView("BabelTowerBuffView", i)
    }, this.Zlc = () => {
      var e = ModelManager_1.ModelManager.BabelTowerModel.GetCurStarNum();
      this.Update(e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.Jlc]
    ]
  }
  Initialize(e) {
    super.Initialize(e), this.InitChildType(4), this.SetVisible(1, !1)
  }
  Reset() {
    super.Reset()
  }
  LZs() {
    this.yd1 || (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBabelActivityInstInfoUpdate, this.Zlc), this.yd1 = !0)
  }
  DZs() {
    this.yd1 && (EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBabelActivityInstInfoUpdate, this.Zlc), this.yd1 = !1)
  }
  Update(e) {
    this.zlc = e, this.Refresh()
  }
  Refresh() {
    this.GetText(1).SetText(this.zlc.toString())
  }
  StartShow() {
    var e = ModelManager_1.ModelManager.BabelTowerModel.CurrentChallengeInstData?.CurStarNum ?? 0;
    this.Update(e), this.SetVisible(1, !0)
  }
  EndShow() {
    this.SetVisible(1, !1)
  }
  OnShowBattleChildView() {
    this.LZs()
  }
  OnHideBattleChildView() {
    this.DZs()
  }
}
exports.BabelTowerBattleTopPanel = BabelTowerBattleTopPanel;
//# sourceMappingURL=BabelTowerBattleTopPanel.js.map