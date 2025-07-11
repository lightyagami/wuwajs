"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapAreaRewardItem = undefined;
const UE = require("ue");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const DailyActivityDefine_1 = require("../../DailyActivity/DailyActivityDefine");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MapAreaRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e, t) {
    super();
    this.wOl = e;
    this.BOl = t;
    this.$Tt = undefined;
    this.DailyActiveState = undefined;
    this.SPe = undefined;
    this.zkt = () => {
      switch (this.DailyActiveState) {
        case 2:
          this.Zkt(false);
          break;
        case 1:
          this.wOl();
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
    this.$Tt = e;
    this.SetRewardGoalValue(e.Goal);
    if (this.DailyActiveState !== e.State) {
      this.RefreshRewardState(e.State, this.DailyActiveState === undefined);
    } else if (this.DailyActiveState === 3) {
      this.GetUiNiagara(7).SetUIActive(false);
    }
    var e = e.State !== 2;
    var s = this.GetText(0);
    s.SetChangeColor(e, s.changeColor);
  }
  RefreshSelf() {
    this.Refresh(this.$Tt, false, 0);
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
    if (t === 1 && e) {
      this.SPe.PlayLevelSequenceByName("Activate");
    }
    e = t === 2 ? DailyActivityDefine_1.REWARD_BACKGROUND_COLOR_UNFINISHED : DailyActivityDefine_1.REWARD_BACKGROUND_COLOR_FINISHED;
    e = UE.Color.FromHex(e);
    this.GetSprite(5).SetColor(e);
    this.DailyActiveState = t;
  }
  Zkt(e) {
    var t = [];
    for (const r of this.$Tt.Rewards) {
      var i = {
        Id: r[0].ItemId,
        Num: r[1],
        Received: e
      };
      t.push(i);
    }
    var s = {
      RewardLists: t,
      MountItem: this.GetButton(1).RootUIComp,
      PosBias: new UE.Vector(0, -20, 0)
    };
    this.BOl(s);
  }
}
exports.MapAreaRewardItem = MapAreaRewardItem;
//# sourceMappingURL=MapAreaRewardItem.js.map