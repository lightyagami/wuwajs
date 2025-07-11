"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsHistoryItem = exports.RacingBetsHistoryView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RacingBetsController_1 = require("../RacingBetsController");
class RacingBetsHistoryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.kt1 = undefined;
    this.Og = () => {
      this.D2t();
    };
    this.Ot1 = () => {
      return new RacingBetsHistoryItem();
    };
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.Jvt]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate, this.Og);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate, this.Og);
  }
  async OnBeforeStartAsync() {
    this.kt1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.Ot1);
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsHistoryData();
    this.rw1(e);
    if (e && e.length > 0) {
      await this.kt1.RefreshByDataAsync(e);
    }
  }
  OnStart() {
    this.GetScrollViewWithScrollbar(0).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
  }
  D2t() {
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsHistoryData();
    this.rw1(e);
    if (e && e.length > 0) {
      this.kt1.RefreshByData(e);
    }
  }
  rw1(e) {
    if (e) {
      e = e.length;
      this.GetItem(3).SetUIActive(e === 0);
      this.GetItem(0)?.SetUIActive(e > 0);
    } else {
      this.GetItem(0)?.SetUIActive(false);
    }
  }
}
exports.RacingBetsHistoryView = RacingBetsHistoryView;
class RacingBetsHistoryItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Kxc = undefined;
    this.Gt1 = () => {
      var e;
      if (this.Kxc) {
        if (e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData()) {
          RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(e.Id, this.Kxc.Id);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 78, "投注历史界面 item LegMatchData undefined");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.Gt1]];
  }
  Refresh(e, t, i) {
    this.Kxc = e;
    this.Xqe();
  }
  Xqe() {
    var e;
    var t;
    var i;
    if (this.Kxc) {
      e = this.Kxc.IsLegMatchFinished();
      t = this.Kxc.BetDangoId;
      i = (t = ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(t))?.Icon ?? "";
      this.SetTextureByPath(i, this.GetTexture(2));
      this.GetText(3).ShowTextNew("" + t?.Name);
      this.GetText(0).SetText(TimeUtil_1.TimeUtil.DateFormat6String(this.Kxc.MatchStartTime));
      this.GetText(1).ShowTextNew(this.Kxc.Name);
      if (e) {
        this.GetText(4).SetText("" + this.Kxc.GetBetDangoRank());
        this.GetText(5).SetText("" + this.Kxc.OddsReward);
      } else {
        this.GetText(4).SetText("-");
        this.GetText(5).SetText("-");
      }
      this.GetButton(6).RootUIComp.SetUIActive(e);
    }
  }
}
exports.RacingBetsHistoryItem = RacingBetsHistoryItem;
//# sourceMappingURL=RacingBetsHistoryView.js.map