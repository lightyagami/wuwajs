"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandbookRewardItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const Y_BIAS = 30;
const REWARD_BACKGROUND_COLOR_UNFINISHED = "00000033";
const REWARD_BACKGROUND_COLOR_FINISHED = "F3EAAB1E";
class HandbookRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this._7s = undefined;
    this.Pe = undefined;
    this.zkt = () => {
      switch (this._7s) {
        case 0:
          this.Zkt(false);
          break;
        case 1:
          this.e2t();
          break;
        case 2:
          this.Zkt(true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UINiagara], [7, UE.UINiagara], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText]];
    this.BtnBindInfo = [[1, this.zkt]];
  }
  OnStart() {
    this.GetUiNiagara(6).SetAlpha(0);
    this.GetUiNiagara(6).SetUIActive(true);
    this.GetUiNiagara(7).SetUIActive(false);
  }
  Refresh(e, t, r) {
    var s;
    var e = ModelManager_1.ModelManager.MoonChasingModel.GetHandbookRewardDataById(e);
    if (e) {
      this.Pe = e;
      s = ModelManager_1.ModelManager.MoonChasingModel.GetHandbookUnlockCount();
      s = e.GetState(s);
      this.SetRewardGoalValue(s, e.Goal);
      this.RefreshRewardState(s, this._7s === undefined);
    }
  }
  SetRewardGoalValue(t, r) {
    var s = [this.GetText(0), this.GetText(10), this.GetText(9)];
    for (let e = 0; e < s.length; e++) {
      var i = e === t;
      s[e].SetUIActive(i);
      if (i) {
        s[e].SetText(r.toString());
      }
    }
  }
  RefreshRewardState(t, e) {
    var r = this.GetUiNiagara(7);
    r.SetUIActive(false);
    r.Deactivate();
    if (e || this._7s !== t) {
      var s = [this.GetSprite(2), this.GetSprite(4), this.GetSprite(3)];
      for (let e = 0; e < s.length; e++) {
        s[e].SetUIActive(e === t);
      }
      this.GetItem(8).SetUIActive(t === 1);
      var i = t === 0 ? REWARD_BACKGROUND_COLOR_UNFINISHED : REWARD_BACKGROUND_COLOR_FINISHED;
      var i = UE.Color.FromHex(i);
      this.GetSprite(5).SetColor(i);
      this.GetUiNiagara(6).SetAlpha(t === 1 ? 1 : 0);
      if (t === 2 && !e) {
        r.SetUIActive(true);
        r.ActivateSystem(true);
      }
      this._7s = t;
    }
  }
  e2t() {
    ControllerHolder_1.ControllerHolder.MoonChasingController.RequestAllAvailableHandbookReward();
  }
  Zkt(e) {
    var t = [];
    for (const i of this.Pe.GetPreviewReward()) {
      var r = {
        Id: i[0].ItemId,
        Num: i[1],
        Received: e
      };
      t.push(r);
    }
    var s = {
      RewardLists: t,
      MountItem: this.GetButton(1).RootUIComp,
      PosBias: new UE.Vector(0, Y_BIAS, 0)
    };
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRewardPopUp, s);
  }
}
exports.HandbookRewardItem = HandbookRewardItem;
//# sourceMappingURL=HandbookRewardItem.js.map