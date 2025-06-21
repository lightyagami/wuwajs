"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SevenHillsRewardBoxItem = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  ActivityLongShanController_1 = require("../../ActivityLongShanController"),
  Y_BIAS = 30;
class SevenHillsRewardBoxItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this._7s = void 0, this.lRo = () => {
      switch (this._7s) {
        case 1:
          this.Zkt(!1);
          break;
        case 0:
          this.e2t();
          break;
        case 2:
          this.Zkt(!0)
      }
    }, this.e2t = () => {
      var t = ActivityLongShanController_1.ActivityLongShanController.GetActivityData().GetAllAvailableScoreRewardIds();
      0 < t.length && ActivityLongShanController_1.ActivityLongShanController.RequestScoreReward(t)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIButtonComponent],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UINiagara],
      [8, UE.UINiagara]
    ], this.BtnBindInfo = [
      [1, this.lRo]
    ]
  }
  OnStart() {
    this.GetUiNiagara(7).SetAlpha(0), this.GetUiNiagara(7).SetUIActive(!0), this.GetUiNiagara(8).SetUIActive(!1)
  }
  Refresh(t, e, i) {
    var s = (this.Pe = t).GetState();
    this.GetText(6).SetText(t.Goal.toString()), this.RefreshRewardState(s, void 0 === this._7s)
  }
  RefreshRewardState(t, e) {
    var i, s = this.GetUiNiagara(8);
    s.SetUIActive(!1), s.Deactivate(), !e && this._7s === t || (this.GetSprite(2).SetUIActive(1 === t), this.GetSprite(3).SetUIActive(0 === t), this.GetSprite(4).SetUIActive(2 === t), this.GetItem(5).SetUIActive(0 === t), i = ActivityLongShanController_1.ActivityLongShanController.GetActivityData().GetScoreRewardRelativeProgress(this.Pe.Id), this.GetSprite(0).SetFillAmount(i), this.GetUiNiagara(7).SetAlpha(0 === t ? 1 : 0), 2 !== t || e || (s.SetUIActive(!0), s.ActivateSystem(!0)), this._7s = t)
  }
  Zkt(t) {
    var e = [];
    for (const r of this.Pe.GetPreviewReward()) {
      var i = {
        Id: r[0].ItemId,
        Num: r[1],
        Received: t
      };
      e.push(i)
    }
    var s = {
      RewardLists: e,
      MountItem: this.GetButton(1).RootUIComp,
      PosBias: new UE.Vector(0, Y_BIAS, 0)
    };
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRewardPopUp, s)
  }
}
exports.SevenHillsRewardBoxItem = SevenHillsRewardBoxItem;
//# sourceMappingURL=SevenHillsRewardBoxItem.js.map