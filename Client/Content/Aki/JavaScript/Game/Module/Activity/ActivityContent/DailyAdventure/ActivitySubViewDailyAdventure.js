"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewDailyAdventure = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const DailyAdventureRewardItem_1 = require("./DailyAdventureRewardItem");
const DailyAdventureTaskItem_1 = require("./DailyAdventureTaskItem");
class ActivitySubViewDailyAdventure extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.DailyAdventureData = undefined;
    this.TaskLayout = undefined;
    this.RewardItemList = [];
    this.JNe = undefined;
    this.zNe = undefined;
    this.ZNe = undefined;
    this.eOe = 0;
    this.tOe = () => {
      return new DailyAdventureTaskItem_1.DailyAdventureTaskItem();
    };
    this.wNe = e => {
      if (e === this.ActivityBaseData.Id) {
        this.iOe();
        this.jqe();
      }
    };
    this.Dwa = () => {
      var e;
      if (this.DailyAdventureData.CheckIfInShowTime()) {
        e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(184);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIVerticalLayout], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UINiagara]];
  }
  OnSetData() {
    this.DailyAdventureData = this.ActivityBaseData;
    this.eOe = this.DailyAdventureData.ProgressPoint;
  }
  async OnBeforeStartAsync() {
    this.TaskLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.tOe);
    var e = [];
    for (const t of [9, 10, 11, 12, 13]) {
      e.push(this.rOe(this.GetItem(t).GetOwner()));
    }
    await Promise.all(e);
  }
  async rOe(e) {
    var t = new DailyAdventureRewardItem_1.DailyAdventureRewardItem();
    await t.CreateThenShowByActorAsync(e);
    this.RewardItemList.push(t);
  }
  OnStart() {
    this.JNe = this.GetItem(5);
    this.zNe = this.GetText(6);
    this.ZNe = this.GetUiNiagara(14);
    this.ZNe.SetUIActive(false);
    this.nOe();
  }
  OnBeforeDestroy() {
    this.ZNe.DeactivateSystem();
    this.ZNe.SetUIActive(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Dwa);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Dwa);
  }
  OnRefreshView() {
    this.FNe();
    this.iOe();
    this.jqe();
    this.DailyAdventureData.ReadDailyTips();
  }
  nOe() {
    this.GetText(4).SetText(this.DailyAdventureData.GetTitle());
    var e = ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetActivityDailyAdventureConfig(this.DailyAdventureData.Id);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.AreaTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.AreaDescription);
    const t = this.GetTexture(2);
    t.SetUIActive(false);
    this.SetTextureByPath(e.AreaPic, t, undefined, () => {
      t.SetUIActive(true);
    });
  }
  iOe() {
    var e = this.DailyAdventureData.GetAllTaskInfo();
    this.TaskLayout.RefreshByData(e);
  }
  jqe() {
    this.GetText(7).SetText(this.DailyAdventureData.ProgressPoint.toString());
    if (this.DailyAdventureData.ProgressPoint > this.eOe) {
      this.ZNe.SetUIActive(true);
      this.ZNe.ActivateSystem(true);
    }
    this.eOe = this.DailyAdventureData.ProgressPoint;
    var t = this.DailyAdventureData.GetAllPointReward();
    for (let e = 0; e < t.length && !(e >= this.RewardItemList.length); e++) {
      this.RewardItemList[e].Refresh(t[e]);
    }
  }
  OnTimer(e) {
    this.FNe();
  }
  FNe() {
    var [e, t] = this.GetTimeVisibleAndRemainTime();
    this.JNe.SetUIActive(e);
    if (e) {
      this.zNe.SetText(t);
    }
  }
}
exports.ActivitySubViewDailyAdventure = ActivitySubViewDailyAdventure;
//# sourceMappingURL=ActivitySubViewDailyAdventure.js.map