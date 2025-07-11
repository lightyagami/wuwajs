"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackCoastRewardItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const Y_BIAS = 30;
class BlackCoastRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this._7s = undefined;
    this.Pe = undefined;
    this.zkt = () => {
      switch (this._7s) {
        case 1:
          this.Zkt(false);
          break;
        case 0:
          this.RequestGetAllAvailableReward?.();
          break;
        case 2:
          this.Zkt(true);
      }
    };
    this.RequestGetAllAvailableReward = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UINiagara], [7, UE.UINiagara], [8, UE.UIItem]];
    this.BtnBindInfo = [[1, this.zkt]];
  }
  OnStart() {
    this.GetUiNiagara(6).SetAlpha(0);
    this.GetUiNiagara(6).SetUIActive(true);
    this.GetUiNiagara(7).SetUIActive(false);
  }
  Refresh(t, e, s) {
    var i = (this.Pe = t).GetState();
    this.SetRewardGoalValue(t.Goal);
    this.RefreshRewardState(i, this._7s === undefined);
  }
  SetRewardGoalValue(t) {
    this.GetText(0).SetText(t.toString());
  }
  RefreshRewardState(e, t) {
    var s = this.GetUiNiagara(7);
    s.SetUIActive(false);
    s.Deactivate();
    if (t || this._7s !== e) {
      var i = [this.GetSprite(4), this.GetSprite(2), this.GetSprite(3)];
      for (let t = 0; t < i.length; t++) {
        i[t].SetUIActive(t === e);
      }
      this.GetItem(8).SetUIActive(e === 0);
      this.GetUiNiagara(6).SetAlpha(e === 0 ? 1 : 0);
      if (e === 2 && !t) {
        s.SetUIActive(true);
        s.ActivateSystem(true);
      }
      this._7s = e;
    }
  }
  Zkt(t) {
    var e = [];
    for (const r of this.Pe.GetPreviewReward()) {
      var s = {
        Id: r[0].ItemId,
        Num: r[1],
        Received: t
      };
      e.push(s);
    }
    var i = {
      RewardLists: e,
      MountItem: this.GetButton(1).RootUIComp,
      PosBias: new UE.Vector(0, Y_BIAS, 0)
    };
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRewardPopUp, i);
  }
}
exports.BlackCoastRewardItem = BlackCoastRewardItem;
//# sourceMappingURL=BlackCoastRewardItem.js.map