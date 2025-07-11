"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyTaskView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const CommonCurrencyItemListComponent_1 = require("../../../Common/CommonCurrencyItemListComponent");
const TabComponent_1 = require("../../../Common/TabComponent/TabComponent");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ShipTowerTeamTabItem_1 = require("../../../ShipTower/View/ShipTowerTeamTabItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
const DangoMonopolyTaskItem_1 = require("./DangoMonopolyTaskItem");
const DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyTaskView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.Ivt = undefined;
    this.I6e = 0;
    this.bOe = undefined;
    this.sma = undefined;
    this.Cfe = 0;
    this.IsNeedClose = false;
    this.CurrencyItemListComponent = undefined;
    this.IsShowRemainTime = false;
    this.fqe = () => {
      return new ShipTowerTeamTabItem_1.ShipTowerTeamTabItem();
    };
    this.KOl = e => {
      this.I6e = e;
      e = this.OpenParam?.TaskList[this.I6e];
      if (e) {
        this.VVc(e);
      }
    };
    this.rOe = () => {
      var e = new DangoMonopolyTaskItem_1.DangoMonopolyTaskItem();
      e.ClickCallBack = this.FVc;
      return e;
    };
    this.FVc = e => {
      this.ActivityData?.RequestReceiveTask(e.Id);
    };
    this.I5t = () => {
      this.CloseMe();
    };
    this.jVc = e => {
      switch (e) {
        case 0:
          this.KOl(this.I6e);
          break;
        case 1:
        case 2:
          this.ShowTipClose();
      }
      this.UpdateTabRedDotState();
    };
    this.kOe = () => {
      var e;
      var t;
      if (this.Cfe) {
        e = Math.max(this.Cfe - TimeUtil_1.TimeUtil.GetServerTime(), 0);
        e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e);
        t = this.GetText(4);
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, DangoMonopolyDefine_1.dangoMonopolyTextKey.TaskRefresh, e.CountDownText);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.I5t], [5, this.I5t]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    this.Ivt = new TabComponent_1.TabComponent(this.GetItem(1), this.fqe, this.KOl, undefined);
    this.bOe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.rOe, this.GetItem(3).GetOwner());
    var e = this.OpenParam?.TaskList.length ?? 2;
    await this.Ivt.RefreshTabItemByLengthAsync(e);
    this.GetText(4)?.SetUIActive(false);
    this.CurrencyItemListComponent = new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(this.GetItem(7));
    await this.CurrencyItemListComponent.SetCurrencyItemList([this.ActivityData.DiceItemId]);
  }
  OnStart() {
    this.GetText(6)?.ShowTextNew(DangoMonopolyDefine_1.dangoMonopolyTextKey.TaskTitle);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DangoMonopolyTaskUpdate, this.jVc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DangoMonopolyTaskUpdate, this.jVc);
  }
  OnBeforeShow() {
    this.HVc();
    if (this.IsShowRemainTime) {
      this.sma = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, 200);
    }
  }
  OnAfterHide() {
    this.jm();
  }
  HVc() {
    var e;
    var t;
    var i = this.Ivt.GetTabItemMap();
    var o = this.OpenParam?.TaskList ?? [];
    for ([e, t] of i) {
      t.UpdateNameText(o[e].TaskTypeName);
      t.UpdateRedDotVisible(this.GetTaskListRedDotState(e));
    }
    this.Ivt.SelectToggleByIndex(this.$Vc(), true);
  }
  UpdateTabRedDotState() {
    var e;
    var t;
    for ([e, t] of this.Ivt.GetTabItemMap()) {
      t.UpdateRedDotVisible(this.GetTaskListRedDotState(e));
    }
  }
  GetTaskListRedDotState(e) {
    return (this.OpenParam?.TaskList ?? [])[e].TaskList.some(e => e.IsCanReceive() || !this.ActivityData.TaskLookedSet.has(e.Id));
  }
  UpdateTabRedDotStateByIndex(e) {
    var t = this.Ivt.GetTabItemByIndex(e);
    var i = this.OpenParam?.TaskList ?? [];
    t?.UpdateRedDotVisible(i[e].TaskList.some(e => e.IsCanReceive()));
  }
  $Vc() {
    var e = this.OpenParam.TaskId ?? 0;
    const t = this.ActivityData?.TaskIdMap.get(e)?.TaskType;
    e = this.OpenParam.TaskList;
    if (t) {
      const i = e.findIndex(e => e.TaskType === t);
      return Math.max(i, 0);
    }
    const i = e.findIndex(e => e.TaskList.findIndex(e => e.IsCanReceive()) >= 0);
    return Math.max(i, 0);
  }
  OnBeforeDestroy() {}
  VVc(e) {
    this.bOe?.RefreshByData(e.TaskList, undefined, true);
    this.UpdateRemainTimeInfo(e);
    e = e.TaskList.map(e => e.Id);
    if (this.ActivityData?.AddNewTaskIdList(e)) {
      this.UpdateTabRedDotStateByIndex(this.I6e);
    }
  }
  UpdateRemainTimeInfo(e) {
    var t = this.GetText(4);
    if (this.IsShowRemainTime) {
      this.Cfe = e.EndTime;
      t?.SetUIActive(this.Cfe > 0);
      this.kOe();
    } else {
      switch (e.TaskType) {
        case 0:
          t?.SetUIActive(true);
          t?.ShowTextNew(DangoMonopolyDefine_1.dangoMonopolyTextKey.TaskRefreshTipsDay);
          break;
        case 1:
          t?.SetUIActive(true);
          t?.ShowTextNew(DangoMonopolyDefine_1.dangoMonopolyTextKey.TaskRefreshTipsWeek);
          break;
        default:
          t?.SetUIActive(false);
      }
    }
  }
  ShowTipClose() {
    var e;
    if (!this.IsNeedClose) {
      this.IsNeedClose = true;
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(146)).IsEscViewTriggerCallBack = false;
      e.FunctionMap.set(1, this.CloseMe.bind(this));
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    }
  }
  jm() {
    if (TimerSystem_1.RealTimeTimerSystem.Has(this.sma)) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.sma);
      this.sma = undefined;
    }
  }
}
exports.DangoMonopolyTaskView = DangoMonopolyTaskView;
//# sourceMappingURL=DangoMonopolyTaskView.js.map