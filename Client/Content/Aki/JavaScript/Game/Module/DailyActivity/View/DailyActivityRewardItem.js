"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyActivityRewardItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const DailyActivityController_1 = require("../DailyActivityController");
const DailyActivityDefine_1 = require("../DailyActivityDefine");
class DailyActivityRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Jkt = 0;
    this.DailyActiveState = undefined;
    this.SPe = undefined;
    this.zkt = () => {
      switch (this.DailyActiveState) {
        case 2:
          this.Zkt(false);
          break;
        case 1:
          this.e2t();
          break;
        case 3:
          this.Zkt(true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UINiagara], [7, UE.UINiagara], [8, UE.UIItem]];
    this.BtnBindInfo = [[1, this.zkt]];
  }
  OnStart() {
    this.GetUiNiagara(6).SetAlpha(0);
    this.GetUiNiagara(7).SetUIActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {}
  Refresh(e, t, i) {
    this.Jkt = e;
    e = ModelManager_1.ModelManager.DailyActivityModel.DailyActivityGoalMap.get(this.Jkt);
    if (e) {
      this.SetRewardGoalValue(e.Goal);
      if (this.DailyActiveState !== e.State) {
        this.RefreshRewardState(e.State, this.DailyActiveState === undefined);
      } else if (this.DailyActiveState === 3) {
        this.GetUiNiagara(7).SetUIActive(false);
      }
    }
  }
  RefreshSelf() {
    this.Refresh(this.Jkt, false, 0);
  }
  SetRewardGoalValue(e) {
    this.GetText(0).SetText(e.toString());
  }
  RefreshRewardState(t, e) {
    var i = [this.GetSprite(4), this.GetSprite(2), this.GetSprite(3)];
    for (let e = 0; e < i.length; e++) {
      i[e].SetUIActive(e + 1 === t);
    }
    this.GetItem(8).SetUIActive(t === 1);
    this.GetUiNiagara(6).SetAlpha(t === 1 ? 1 : 0);
    var r = this.GetUiNiagara(7);
    if (t !== 3 || e) {
      r.SetUIActive(false);
      r.Deactivate();
    } else {
      r.SetUIActive(true);
      r.ActivateSystem(true);
    }
    if (t === 1 && !e) {
      this.SPe.PlayLevelSequenceByName("Activate");
    }
    var r = t === 2 ? DailyActivityDefine_1.REWARD_BACKGROUND_COLOR_UNFINISHED : DailyActivityDefine_1.REWARD_BACKGROUND_COLOR_FINISHED;
    var e = UE.Color.FromHex(r);
    this.GetSprite(5).SetColor(e);
    this.GetText(0).useChangeColor = t !== 2;
    this.DailyActiveState = t;
  }
  e2t() {
    DailyActivityController_1.DailyActivityController.RequestAllAvailableActivityReward();
  }
  Zkt(e) {
    var t = [];
    for (const s of ModelManager_1.ModelManager.DailyActivityModel.GetActivityRewardById(this.Jkt)) {
      var i = {
        Id: s[0].ItemId,
        Num: s[1],
        Received: e
      };
      t.push(i);
    }
    var r = {
      RewardLists: t,
      MountItem: this.GetButton(1).RootUIComp,
      PosBias: new UE.Vector(0, 30, 0)
    };
    ModelManager_1.ModelManager.DailyActivityModel.RewardData = r;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityRewardPopUp);
  }
}
exports.DailyActivityRewardItem = DailyActivityRewardItem;
//# sourceMappingURL=DailyActivityRewardItem.js.map