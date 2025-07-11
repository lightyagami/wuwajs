"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCorniceMeetingMainView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../../Help/HelpController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivityCorniceMeetingController_1 = require("./ActivityCorniceMeetingController");
const ActivityCorniceMeetingRewardItem_1 = require("./ActivityCorniceMeetingRewardItem");
const ActivityCorniceMeetingTabItem_1 = require("./ActivityCorniceMeetingTabItem");
class ActivityCorniceMeetingMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.m3e = undefined;
    this.F6a = undefined;
    this.H3e = undefined;
    this.GOe = undefined;
    this.LHa = [];
    this.V6a = () => {
      var e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
      if (e.GetIsShow(e.CurrentSelectLevelPlayId) && (e = e.GetLevelEntryData(e.CurrentSelectLevelPlayId))) {
        e = {
          MarkId: e.GetMarkId(),
          MarkType: 24,
          OpenFogId: 0
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, e);
      }
    };
    this.VKi = () => {
      var e = this.F6a.GetSelectedGridIndex();
      this.F6a.RefreshGridProxy(e);
    };
    this.g3e = e => {
      var t;
      if (e.has(ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.ActivityId)) {
        e = () => {
          this.CloseMe();
        };
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115)).FunctionMap.set(1, e);
        t.FunctionMap.set(0, e);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
    this.H6a = e => {
      var t = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
      t.CurrentSelectLevelPlayId = e;
      this.m3e = t.GetLevelEntryData(e);
      this.j6a();
      this.S3e();
      this.W6a();
      this.y3e();
      this.PlaySequenceAsync("Switch", true);
    };
    this.f3e = () => {
      var e = new ActivityCorniceMeetingTabItem_1.ActivityCorniceMeetingTabItem();
      this.LHa.push(e);
      return e;
    };
    this.VOe = () => {
      return new ActivityCorniceMeetingRewardItem_1.ActivityCorniceMeetingRewardItem();
    };
    this.Awe = () => {
      this.CloseMe();
    };
    this.D3e = () => {
      var e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().GetHelpId();
      HelpController_1.HelpController.OpenHelpById(e);
    };
    this.R3e = false;
    this.kOe = () => {
      this.y3e();
      var e;
      var t = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
      if (t) {
        if ((t = t.GetIsShow(t.CurrentSelectLevelPlayId)) && this.R3e !== t) {
          e = this.F6a.GetSelectedGridIndex();
          this.F6a.RefreshGridProxy(e);
          this.W6a();
          this.S3e();
        }
        this.R3e = t;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIVerticalLayout], [5, UE.UIText], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[7, this.V6a]];
  }
  OnStart() {
    var e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    this.m3e = e.GetLevelEntryData(e.GetDefaultSelectLevelPlayId());
    this.H3e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.VOe);
    this.F6a = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.f3e);
    this.U3e();
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.kOe, 1000);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().Id);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickActivityCorniceMeetingTab, this.H6a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCorniceMeetingRedDot, this.VKi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickActivityCorniceMeetingTab, this.H6a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCorniceMeetingRedDot, this.VKi);
  }
  OnBeforeShow() {
    this.Eua();
    this.j6a();
    this.S3e();
    this.W6a();
  }
  OnBeforeDestroy() {
    if (this.GOe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
    RedDotController_1.RedDotController.UnBindRedDot("ActivityCorniceMeeting");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().Id);
  }
  U3e() {
    var e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.Awe);
    this.lqe.SetHelpCallBack(this.D3e);
    this.lqe.SetTitle(e.GetTitle());
  }
  y3e() {
    var e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    if (!e.GetIsShow(e.CurrentSelectLevelPlayId)) {
      e = e.GetLevelEntryData(e.CurrentSelectLevelPlayId);
      e = this.x3e(e.UnlockTime / 1000, "ActiveToOpenTime");
      this.GetText(8).SetText(e);
    }
  }
  x3e(e, t) {
    var i = TimeUtil_1.TimeUtil.GetServerTime();
    var e = Number(e) - i;
    var i = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e);
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(t);
    let r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return r = r.replace("{0}", i.CountDownText);
  }
  j6a() {
    var e = this.m3e.GetRewardList();
    this.H3e.RefreshByData(e);
  }
  Eua() {
    const e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    var t = e.GetLevelPlayIdList();
    this.F6a.BindOnScrollValueChanged(e => {
      let t = false;
      let i = false;
      for (let e = 0; e < this.LHa.length; e++) {
        var r = this.LHa[e];
        if ((r &&= ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().GetLevelEntryData(r.LevelPlayId)) && (r.GetRedDot() && e < this.F6a.GetDisplayGridStartIndex() && (t = true), r.GetRedDot()) && e > this.F6a.GetDisplayGridEndIndex()) {
          i = true;
        }
      }
      this.GetItem(10).SetUIActive(t);
      this.GetItem(11).SetUIActive(i);
    });
    this.F6a.RefreshByData(t, false, () => {
      this.F6a?.SelectGridProxy(e.GetSelectLevelPlayIdIndex());
    });
  }
  S3e() {
    var e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    var e = e.GetIsShow(e.CurrentSelectLevelPlayId);
    this.GetVerticalLayout(4)?.RootUIComp.SetUIActive(e);
    this.GetItem(3).SetUIActive(!e);
    this.GetButton(7)?.RootUIComp.SetUIActive(e);
  }
  W6a() {
    var e;
    var t;
    var i = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    var i = i.GetLevelEntryData(i.CurrentSelectLevelPlayId);
    var r = TimeUtil_1.TimeUtil.GetTimeString(i.RemainTime);
    if (i?.MaxScore === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "ActivityCorniceMeetingScoreNoRecord");
    } else {
      e = i.MaxScore;
      t = i?.GetMaxScoreConfig() ?? 0;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "Text_ItemCost_Text", (t < e ? t : e).toString(), t);
    }
    this.GetItem(9).SetUIActive(i.IsAllFinished());
    this.GetText(6).SetText(r);
    this.GetItem(12).SetUIActive(i.IsUnlock());
  }
}
exports.ActivityCorniceMeetingMainView = ActivityCorniceMeetingMainView;
//# sourceMappingURL=ActivityCorniceMeetingMainView.js.map