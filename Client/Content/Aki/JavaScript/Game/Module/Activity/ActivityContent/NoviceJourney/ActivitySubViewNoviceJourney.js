"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewNoviceJourney = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const NoviceJourneyItem_1 = require("./NoviceJourneyItem");
class ActivitySubViewNoviceJourney extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.mNe = undefined;
    this.dNe = true;
    this.CNe = undefined;
    this.sGe = () => {
      var e = new NoviceJourneyItem_1.NoviceJourneyItem();
      e.SetActivityData(this.CNe);
      return e;
    };
    this.q2e = e => {
      this.eGe.GetLayoutItemByKey(e).RefreshCurrentState();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UILayoutBase], [3, UE.UIItem], [4, UE.UIText]];
  }
  OnSetData() {
    this.CNe = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var e = ConfigManager_1.ConfigManager.ActivityNoviceJourneyConfig.GetNoticeJourneyConfigList();
    var t = [];
    for (const i of e) {
      t.push(i.Id);
    }
    this.eGe = new GenericLayout_1.GenericLayout(this.GetLayoutBase(2), this.sGe, this.GetItem(3).GetOwner());
    await this.eGe.RefreshByDataAsync(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NoticeJourneyReceive, this.q2e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NoticeJourneyReceive, this.q2e);
  }
  OnStart() {
    this.mNe = this.GetText(1);
    this.dNe = this.CNe.EndShowTime !== 0;
    this.mNe.SetUIActive(this.CNe.EndShowTime !== 0);
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerLevel();
    this.GetText(0).SetText(e.toString());
    this.GetText(4).SetText(this.CNe.GetTitle());
  }
  OnBeforeShow() {
    this.fNe();
  }
  OnBeforeDestroy() {
    for (const e of this.eGe.GetLayoutItemList()) {
      this.AddChild(e);
    }
  }
  pNe(e) {
    if (this.dNe !== e) {
      this.dNe = e;
      this.mNe.SetUIActive(e);
    }
  }
  fNe() {
    var [e, t] = this.GetTimeVisibleAndRemainTime();
    this.pNe(e);
    if (e) {
      this.mNe.SetText(t);
    }
  }
  OnTimer(e) {
    this.fNe();
  }
}
exports.ActivitySubViewNoviceJourney = ActivitySubViewNoviceJourney;
//# sourceMappingURL=ActivitySubViewNoviceJourney.js.map