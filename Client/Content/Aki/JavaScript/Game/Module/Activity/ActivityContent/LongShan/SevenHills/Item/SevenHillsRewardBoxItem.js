"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SevenHillsRewardBoxItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const ActivityLongShanController_1 = require("../../ActivityLongShanController");
const Y_BIAS = 30;
class SevenHillsRewardBoxItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this._7s = undefined;
    this.lRo = () => {
      switch (this._7s) {
        case 1:
          this.Zkt(false);
          break;
        case 0:
          this.e2t();
          break;
        case 2:
          this.Zkt(true);
      }
    };
    this.e2t = () => {
      var t = ActivityLongShanController_1.ActivityLongShanController.GetActivityData().GetAllAvailableScoreRewardIds();
      if (t.length > 0) {
        ActivityLongShanController_1.ActivityLongShanController.RequestScoreReward(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIText], [7, UE.UINiagara], [8, UE.UINiagara]];
    this.BtnBindInfo = [[1, this.lRo]];
  }
  OnStart() {
    this.GetUiNiagara(7).SetAlpha(0);
    this.GetUiNiagara(7).SetUIActive(true);
    this.GetUiNiagara(8).SetUIActive(false);
  }
  Refresh(t, e, i) {
    var s = (this.Pe = t).GetState();
    this.GetText(6).SetText(t.Goal.toString());
    this.RefreshRewardState(s, this._7s === undefined);
  }
  RefreshRewardState(t, e) {
    var i;
    var s = this.GetUiNiagara(8);
    s.SetUIActive(false);
    s.Deactivate();
    if (!!e || this._7s !== t) {
      this.GetSprite(2).SetUIActive(t === 1);
      this.GetSprite(3).SetUIActive(t === 0);
      this.GetSprite(4).SetUIActive(t === 2);
      this.GetItem(5).SetUIActive(t === 0);
      i = ActivityLongShanController_1.ActivityLongShanController.GetActivityData().GetScoreRewardRelativeProgress(this.Pe.Id);
      this.GetSprite(0).SetFillAmount(i);
      this.GetUiNiagara(7).SetAlpha(t === 0 ? 1 : 0);
      if (t === 2 && !e) {
        s.SetUIActive(true);
        s.ActivateSystem(true);
      }
      this._7s = t;
    }
  }
  Zkt(t) {
    var e = [];
    for (const r of this.Pe.GetPreviewReward()) {
      var i = {
        Id: r[0].ItemId,
        Num: r[1],
        Received: t
      };
      e.push(i);
    }
    var s = {
      RewardLists: e,
      MountItem: this.GetButton(1).RootUIComp,
      PosBias: new UE.Vector(0, Y_BIAS, 0)
    };
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRewardPopUp, s);
  }
}
exports.SevenHillsRewardBoxItem = SevenHillsRewardBoxItem;
//# sourceMappingURL=SevenHillsRewardBoxItem.js.map