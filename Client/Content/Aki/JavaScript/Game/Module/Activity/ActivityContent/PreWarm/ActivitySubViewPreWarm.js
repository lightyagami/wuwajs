"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewPreWarm = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityPreWarmCollectItem_1 = require("./ActivityPreWarmCollectItem");
const ActivityPreWarmDefine_1 = require("./ActivityPreWarmDefine");
class ActivitySubViewPreWarm extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.T8e = undefined;
    this.C1m = undefined;
    this.p1m = undefined;
    this.v1m = new Map();
    this.y1m = [5, 6, 7, 8, 9, 10, 11];
    this.S1m = undefined;
    this.$pt = undefined;
    this.ActivityBaseData = undefined;
    this.vcm = undefined;
    this.JGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.M1m = i => {
      if (this.C1m) {
        this.v1m.get(this.C1m.GetId())?.SetToggleState(0);
      }
      this.I3e(this.C1m?.GetId(), i);
      this.v1m.get(i)?.SetToggleState(1);
      this.C1m = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetCollectItemDataById(i);
      this.jqe();
      this.brd();
      this.mGe();
      this.Dsd();
      this.Abm();
    };
    this.Dwa = () => {
      this.PKt();
    };
    this.E1m = () => {
      var i = this.C1m?.GetQuestId();
      if (i !== undefined) {
        this.ActivityBaseData?.RemoveQuestRedDot(i);
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
    this.I1m = () => {
      var i;
      if (this.C1m) {
        i = {
          Id: this.C1m.GetId(),
          ActivityId: this.C1m.GetActivityId()
        };
        UiManager_1.UiManager.OpenView("ActivityPreWarmMainView", i);
        (i = new LogReportDefine_1.ActivityPreWarmOpenLogEvent()).i_activity_id = this.C1m.GetActivityId();
        i.i_chapter_id = this.C1m.GetId();
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
      }
    };
    this.JGn = () => {
      var i;
      if (this.ActivityBaseData) {
        i = this.ActivityBaseData.Id;
        ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(i);
      }
    };
    this.Wpu = (i, e) => {
      if (i === "SwitchDown" && e === "SwitchDown" || i === "SwitchUp" && e === "SwitchUp") {
        this.vcm?.SetResult();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIScrollViewWithScrollbarComponent], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIText], [18, UE.UITexture], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIButtonComponent], [23, UE.UIItem]];
    this.BtnBindInfo = [[13, this.E1m], [14, this.I1m], [22, this.JGn]];
  }
  async OnBeforeStartAsync() {
    this.T1m();
    var i = [];
    i.push(this.b1m());
    i.push(...this.R1m());
    await Promise.all(i);
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem());
    this.GetItem(19)?.GetOwner()?.OnSequencePlayEvent.Bind(this.Wpu);
    this.GetItem(20)?.GetOwner()?.OnSequencePlayEvent.Bind(this.Wpu);
    this.GetButton(13)?.RootUIComp.SetUIActive(false);
    this.GetButton(14)?.RootUIComp.SetUIActive(false);
    this.GetItem(15)?.SetUIActive(false);
    RedDotController_1.RedDotController.BindRedDot("CommonActivityPage", this.GetItem(23), undefined, this.ActivityBaseData?.Id);
  }
  OnBeforeShow() {
    var i = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetDefaultId() ?? 1;
    this.v1m.get(i)?.SetToggleState(1, true);
  }
  async b1m() {
    var i;
    var e;
    var t;
    if (this.ActivityBaseData && (this.p1m = new ActivityTitleTypeA_1.ActivityTitleTypeA(), await this.p1m.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.p1m.SetTitleByText(this.ActivityBaseData.GetTitle()), e = (i = this.ActivityBaseData.LocalConfig)?.DescTheme, t = !StringUtils_1.StringUtils.IsEmpty(e), this.p1m?.SetSubTitleVisible(t), t) && (t = i?.DescThemeIcon, e && this.p1m?.SetSubTitleByTextId(e), t)) {
      this.p1m?.SetSubTitleIconByPath(t);
    }
  }
  T1m() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(12), this.JGe);
  }
  R1m() {
    const s = [];
    this.y1m.forEach((i, e) => {
      var i = this.GetItem(i);
      var t = new ActivityPreWarmCollectItem_1.ActivityPreWarmCollectItem();
      var e = e + 1;
      this.v1m.set(e, t);
      t.SetSelectCallBack(this.M1m, e);
      s.push(t.CreateThenShowByActorAsync(i.GetOwner()));
    });
    return s;
  }
  jqe() {
    const e = this.C1m?.GetQuestState();
    switch (e) {
      case 0:
      case 1:
        this.GetTexture(0)?.SetColor(UE.Color.FromHex("#50282AFF"));
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(17), "RestoreFrequency_Reward_0");
        break;
      case 2:
        this.GetTexture(0)?.SetColor(UE.Color.FromHex("#BE7A3766"));
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(17), "RestoreFrequency_Reward_0");
        break;
      case 3:
        this.GetTexture(0)?.SetColor(UE.Color.FromHex("#0F855D66"));
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(17), "RestoreFrequency_Reward_1");
    }
    var i;
    if (this.T8e && (i = this.C1m?.GetPreviewReward())) {
      this.T8e.RefreshByData(i, () => {
        this.T8e?.GetScrollItemList().forEach(i => {
          i.SetReceivedVisible(e === 3);
        });
      });
    }
  }
  get Pbm() {
    return this.ActivityBaseData?.IsUnLock() ?? false;
  }
  Abm() {
    var i;
    if (!!this.Pbm && !(i = this.C1m?.GetIsUnlock())?.IsUnlock) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(16), "RestoreFrequency_Unlock_0", i?.CdTime);
    }
  }
  brd() {
    var i;
    this.GetButton(22)?.RootUIComp.SetUIActive(!this.Pbm);
    if (this.Pbm) {
      this.S1m?.SetUIActive(false);
      switch (this.C1m?.GetQuestState()) {
        case 0:
        case 1:
          this.S1m = this.GetItem(15);
          if (this.C1m?.GetIsUnlock()?.IsUnlock) {
            LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(16), "RestoreFrequency_Unlock_1");
          }
          break;
        case 2:
          this.S1m = this.GetButton(13)?.RootUIComp;
          break;
        case 3:
          this.S1m = this.GetButton(14)?.RootUIComp;
      }
      this.S1m?.SetUIActive(true);
    } else {
      this.GetItem(15)?.SetUIActive(true);
      this.S1m = this.GetItem(15);
      i = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.ActivityBaseData.ConditionGroupId);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(16), i);
    }
  }
  mGe() {
    this.TrySetSpriteByPath(this.C1m?.GetTitleNumIconPath(), this.GetSprite(1), false);
    var i = this.C1m?.GetQuestState();
    if (i === 0 || i === 1) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), "RestoreFrequency_Title_0");
    } else {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), this.C1m?.GetTitle());
    }
  }
  async Dsd() {
    await this.vcm?.Promise;
    if (this.C1m?.GetQuestState() === 3) {
      this.GetItem(19)?.SetUIActive(true);
      this.GetItem(20)?.SetUIActive(false);
      this.TrySetTextureByPath(this.C1m.GetIconPath(), this.GetTexture(4));
    } else {
      this.GetItem(19)?.SetUIActive(false);
      this.GetItem(20)?.SetUIActive(true);
    }
  }
  L1m() {
    this.v1m.forEach(i => {
      i.Refresh();
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Dwa);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Dwa);
  }
  OnRefreshView() {
    this.PKt();
  }
  OnTimer(i) {
    this.FNe();
    this.Abm();
  }
  FNe() {
    var [i, e] = this.GetTimeVisibleAndRemainTime();
    this.p1m?.SetTimeTextVisible(i);
    if (i) {
      this.p1m?.SetTimeTextByText(e);
    }
  }
  PKt() {
    this.L1m();
    this.brd();
    this.Dsd();
  }
  I3e(e, t) {
    if (e !== undefined) {
      this.vcm = new CustomPromise_1.CustomPromise();
      var s = ActivityPreWarmDefine_1.leftCollectItems.includes(e);
      var r = ActivityPreWarmDefine_1.leftCollectItems.includes(t);
      let i = undefined;
      e = (i = s === r && (s = (r = s ? ActivityPreWarmDefine_1.leftCollectItems : ActivityPreWarmDefine_1.rightCollectItems).indexOf(e), r.indexOf(t) < s) ? "SwitchUp" : "SwitchDown") === "SwitchUp" ? "SwitchDown" : "SwitchUp";
      this.lwr(i, e);
    }
  }
  lwr(i, e) {
    if (e) {
      this.$pt?.StopSequenceByKey(e, true, true);
    }
    if (this.$pt?.IsSequenceInPlaying(i)) {
      this.$pt.ReplaySequence(i);
    } else {
      this.$pt?.PlaySequence(i);
    }
  }
  OnBeforeDestroy() {
    this.v1m.clear();
    RedDotController_1.RedDotController.UnBindRedDot("CommonActivityPage");
  }
}
exports.ActivitySubViewPreWarm = ActivitySubViewPreWarm;
//# sourceMappingURL=ActivitySubViewPreWarm.js.map