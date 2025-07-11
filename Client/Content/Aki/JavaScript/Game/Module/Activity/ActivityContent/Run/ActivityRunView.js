"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRunView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../../Help/HelpController");
const TimeOfDayDefine_1 = require("../../../TimeOfDay/TimeOfDayDefine");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivityRunController_1 = require("./ActivityRunController");
const ActivityRunCycleItem_1 = require("./ActivityRunCycleItem");
const ActivityRunItem_1 = require("./ActivityRunItem");
const TIMERGAP = 1000;
class ActivityRunView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.GOe = undefined;
    this.c3e = undefined;
    this.m3e = undefined;
    this.d3e = undefined;
    this.C3e = undefined;
    this.lqe = undefined;
    this.g3e = e => {
      var i;
      if (e.has(this.m3e.Id)) {
        e = () => {
          this.CloseMe();
        };
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115)).FunctionMap.set(1, e);
        i.FunctionMap.set(0, e);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      }
    };
    this.VOe = () => {
      return new ActivityRunItem_1.ActivityRunItem();
    };
    this.f3e = () => new ActivityRunCycleItem_1.ActivityRunCycleItem();
    this.p3e = () => {
      this.v3e();
      this.M3e();
      this.E3e();
      this.S3e();
      this.y3e();
      this.I3e();
    };
    this.T3e = e => {
      this.C3e.ScrollToGridIndex(e.GridIndex, true);
    };
    this.r3e = e => {
      this.C3e?.RefreshAllGridProxies();
    };
    this.L3e = () => {
      var e;
      if (ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId).GetIsShow()) {
        e = {
          MarkId: ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunMarkId(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId),
          MarkType: 13,
          OpenFogId: 0
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, e);
      }
    };
    this.Awe = () => {
      this.CloseMe();
    };
    this.D3e = () => {
      this.OpenHelpView();
    };
    this.R3e = false;
    this.kOe = () => {
      this.y3e();
      var e;
      var i = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId);
      if (i) {
        if ((i = i.GetIsShow()) && this.R3e !== i) {
          e = this.C3e.GetSelectedGridIndex();
          this.C3e.RefreshGridProxy(e);
          this.v3e();
          this.E3e();
          this.M3e();
          this.S3e();
        }
        this.R3e = i;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIVerticalLayout], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIText], [17, UE.UIText]];
    this.BtnBindInfo = [[6, this.L3e]];
  }
  U3e() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.Awe);
    this.lqe.SetHelpCallBack(this.D3e);
    this.lqe.SetTitle(this.m3e.GetTitle());
  }
  OnStart() {
    this.m3e = this.OpenParam;
    this.c3e = this.m3e.GetChallengeDataArray();
    this.U3e();
    var e = this.GetVerticalLayout(7);
    this.d3e = new GenericLayout_1.GenericLayout(e, this.VOe);
    e = this.GetItem(1).GetOwner().GetComponentByClass(UE.UILoopScrollViewComponent.StaticClass());
    this.C3e = new LoopScrollView_1.LoopScrollView(e, this.GetItem(2).GetOwner(), this.f3e);
    this.GetItem(2).SetUIActive(false);
    this.GetButton(11).RootUIComp.SetUIActive(false);
    this.GetButton(12).RootUIComp.SetUIActive(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectActivityRunChallengeItem, this.p3e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickActivityRunChallenge, this.T3e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetRunActivityReward, this.r3e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectActivityRunChallengeItem, this.p3e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickActivityRunChallenge, this.T3e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetRunActivityReward, this.r3e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  S3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId).GetIsShow();
    this.GetItem(3)?.SetUIActive(e);
    this.GetItem(9).SetUIActive(!e);
  }
  M3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId);
    if (e) {
      this.GetButton(6).RootUIComp.SetUIActive(e.GetIsShow());
    }
  }
  I3e() {
    if (this.UiViewSequence.HasSequenceNameInPlaying("Switch")) {
      this.UiViewSequence.ReplaySequence("Switch");
    } else {
      this.UiViewSequence.PlaySequence("Switch");
    }
  }
  OpenHelpView() {
    var e = this.m3e.GetHelpId();
    HelpController_1.HelpController.OpenHelpById(e);
  }
  OnBeforeShow() {
    ActivityRunController_1.ActivityRunController.SelectDefaultChallengeId(this.m3e);
    this.A3e();
    this.P3e();
  }
  P3e() {
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.kOe, TIMERGAP);
  }
  y3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId);
    if (!e.GetIsShow()) {
      e = this.x3e(e.BeginOpenTime, "ActiveToOpenTime");
      this.GetText(10).SetText(e);
    }
  }
  x3e(e, i) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    let r = Number(e) - t;
    if (r <= 10) {
      r = 10;
    }
    let n = TimeUtil_1.TimeUtil.GetCountDownData(r);
    if (r >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY) {
      n = TimeUtil_1.TimeUtil.GetCountDownData(r, 3, 2);
    }
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(i);
    let o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return o = o.replace("{0}", n.CountDownText);
  }
  A3e() {
    var i = this.c3e.length;
    var t = new Array();
    for (let e = 0; e < i; e++) {
      t.push(this.c3e[e].Id);
    }
    this.C3e.RefreshByDataAsync(t).then(() => {
      this.C3e.SelectGridProxy(ModelManager_1.ModelManager.ActivityRunModel.GetStartViewSelectIndex(), true);
    });
  }
  v3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId);
    if (e) {
      e = e.GetScoreArray();
      this.d3e.RefreshByData(e);
    }
  }
  E3e() {
    var e;
    var i = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId);
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), "ActiveRunMaxPoint");
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "ActiveRunMinTime");
      if (i.GetMiniTime() === 0) {
        e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("ActivityRunNoPoint");
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
        this.GetText(4)?.SetText(e);
        this.GetText(5)?.SetText(e);
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), "ActiveRunMaxPoint");
        this.GetText(4)?.SetText(i.GetMaxScore().toString());
        e = TimeUtil_1.TimeUtil.GetTimeString(i.GetMiniTime());
        this.GetText(5)?.SetText(e.toString());
      }
      this.GetText(17).ShowTextNew("ReadyToFightText");
    }
  }
  OnBeforeDestroy() {
    if (this.GOe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
    RedDotController_1.RedDotController.UnBindRedDot("ActivityRun");
  }
}
exports.ActivityRunView = ActivityRunView;
//# sourceMappingURL=ActivityRunView.js.map