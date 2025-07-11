"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsMatchBtnItem = exports.RacingBetsMatchView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RacingBetsController_1 = require("../RacingBetsController");
const RacingBetsMatchInfoItem_1 = require("./Item/RacingBetsMatchInfoItem");
class RacingBetsMatchView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Ft1 = [1, 3, 5, 4, 2];
    this.Vt1 = undefined;
    this.jt1 = undefined;
    this.Ht1 = undefined;
    this.$t1 = undefined;
    this.Rk1 = undefined;
    this.uM1 = [];
    this.Nt1 = undefined;
    this.Og = t => {
      this.Qt1();
    };
    this.ifa = () => {
      return new RacingBetsMatchBtnItem();
    };
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIGridLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Jvt]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsLegMatchEnd, this.Og);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsLegMatchEnd, this.Og);
  }
  async OnBeforeStartAsync() {
    this.Vt1 = new RacingBetsMatchInfoItem_1.RacingBetsSixDangoMatchInfo();
    await this.Vt1.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.jt1 = new RacingBetsMatchInfoItem_1.RacingBetsSixDangoMatchInfo();
    await this.jt1.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.Ht1 = new RacingBetsMatchInfoItem_1.RacingBetsFourDangoMatchInfo();
    await this.Ht1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.$t1 = new RacingBetsMatchInfoItem_1.RacingBetsFourDangoMatchInfo();
    await this.$t1.CreateThenShowByActorAsync(this.GetItem(6).GetOwner());
    this.Rk1 = new RacingBetsMatchInfoItem_1.RacingBetsFinalMatchInfo();
    await this.Rk1.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
    this.Nt1 = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.ifa);
    this.uM1 = [];
    for (const e of this.Ft1) {
      var t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(e);
      if (t) {
        this.uM1.push(...t.GetLegMatchList());
      }
    }
    await this.Nt1.RefreshByDataAsync(this.uM1);
  }
  OnStart() {
    this.Qt1();
  }
  OnTick() {
    this.Wt1();
  }
  Wt1() {
    for (const t of this.Nt1.GetLayoutItemList()) {
      t.RefreshState();
    }
  }
  Qt1() {
    this.Vt1?.SetData(1);
    this.jt1?.SetData(2);
    this.Ht1?.SetData(3);
    this.$t1?.SetData(4);
    this.Rk1?.SetData(5);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t.length !== 0) {
      for (const i of Array.from(this.uM1).sort((t, e) => e.MatchEndTime - t.MatchEndTime)) {
        if (i.IsLegMatchFinished()) {
          var e = this.uM1.indexOf(i);
          var e = this.Nt1.GetGridByDisplayIndex(e);
          if (e) {
            return [e, e];
          }
        }
      }
    }
  }
}
exports.RacingBetsMatchView = RacingBetsMatchView;
class RacingBetsMatchBtnItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Kxc = undefined;
    this.Kt1 = () => {
      var t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
      if (t && this.Kxc && this.Kxc.IsLegMatchFinished()) {
        RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(t.Id, this.Kxc.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Kt1]];
  }
  Refresh(t, e, i) {
    if (t) {
      this.Kxc = t;
      this.RefreshItem();
    }
  }
  RefreshItem() {
    if (this.Kxc) {
      this.GetText(2).SetText(TimeUtil_1.TimeUtil.DateFormat6String(this.Kxc.MatchStartTime));
      this.GetText(3).ShowTextNew(this.Kxc.Name);
      this.SetSpriteByPath(this.Kxc.MatchBtnBgPath, this.GetSprite(1), false);
      this.RefreshState();
    }
  }
  RefreshState() {
    var t;
    if (this.Kxc) {
      t = this.Kxc.GetLegMatchState();
      this.GetSprite(4).SetUIActive(t === 4);
      this.GetItem(5).SetUIActive(t !== 0 && t !== 4);
    }
  }
}
exports.RacingBetsMatchBtnItem = RacingBetsMatchBtnItem;
//# sourceMappingURL=RacingBetsMatchView.js.map