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
    this.Dmm = undefined;
    this.Umm = undefined;
    this.xmm = new Map();
    this.Bmm = [5, 6, 7, 8, 9, 10, 11];
    this.kmm = undefined;
    this.$pt = undefined;
    this.ActivityBaseData = undefined;
    this.j0m = undefined;
    this.JGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.qmm = i => {
      if (this.Dmm) {
        this.xmm.get(this.Dmm.GetId())?.SetToggleState(0);
      }
      this.I3e(this.Dmm?.GetId(), i);
      this.xmm.get(i)?.SetToggleState(1);
      this.Dmm = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetCollectItemDataById(i);
      this.jqe();
      this.brd();
      this.mGe();
      this.Dsd();
      this.dHm();
    };
    this.Dwa = () => {
      this.PKt();
    };
    this.Omm = () => {
      var i = this.Dmm?.GetQuestId();
      if (i !== undefined) {
        this.ActivityBaseData?.RemoveQuestRedDot(i);
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
    this.Gmm = () => {
      var i;
      if (this.Dmm) {
        i = {
          Id: this.Dmm.GetId(),
          ActivityId: this.Dmm.GetActivityId()
        };
        UiManager_1.UiManager.OpenView("ActivityPreWarmMainView", i);
        (i = new LogReportDefine_1.ActivityPreWarmOpenLogEvent()).i_activity_id = this.Dmm.GetActivityId();
        i.i_chapter_id = this.Dmm.GetId();
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
        this.j0m?.SetResult();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIScrollViewWithScrollbarComponent], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIText], [18, UE.UITexture], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIButtonComponent], [23, UE.UIItem]];
    this.BtnBindInfo = [[13, this.Omm], [14, this.Gmm], [22, this.JGn]];
  }
  async OnBeforeStartAsync() {
    this.Fmm();
    var i = [];
    i.push(this.Nmm());
    i.push(...this.Vmm());
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
    this.xmm.get(i)?.SetToggleState(1, true);
  }
  async Nmm() {
    var i;
    var e;
    var t;
    if (this.ActivityBaseData && (this.Umm = new ActivityTitleTypeA_1.ActivityTitleTypeA(), await this.Umm.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.Umm.SetActivityBaseData(this.ActivityBaseData), this.Umm.SetTitleByText(this.ActivityBaseData.GetTitle()), e = (i = this.ActivityBaseData.LocalConfig)?.DescTheme, t = !StringUtils_1.StringUtils.IsEmpty(e), this.Umm?.SetSubTitleVisible(t), t) && (t = i?.DescThemeIcon, e && this.Umm?.SetSubTitleByTextId(e), t)) {
      this.Umm?.SetSubTitleIconByPath(t);
    }
  }
  Fmm() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(12), this.JGe);
  }
  Vmm() {
    const s = [];
    this.Bmm.forEach((i, e) => {
      var i = this.GetItem(i);
      var t = new ActivityPreWarmCollectItem_1.ActivityPreWarmCollectItem();
      var e = e + 1;
      this.xmm.set(e, t);
      t.SetSelectCallBack(this.qmm, e);
      s.push(t.CreateThenShowByActorAsync(i.GetOwner()));
    });
    return s;
  }
  jqe() {
    const e = this.Dmm?.GetQuestState();
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
    if (this.T8e && (i = this.Dmm?.GetPreviewReward())) {
      this.T8e.RefreshByData(i, () => {
        this.T8e?.GetScrollItemList().forEach(i => {
          i.SetReceivedVisible(e === 3);
        });
      });
    }
  }
  get cHm() {
    return this.ActivityBaseData?.IsUnLock() ?? false;
  }
  dHm() {
    var i;
    if (!!this.cHm && !(i = this.Dmm?.GetIsUnlock())?.IsUnlock) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(16), "RestoreFrequency_Unlock_0", i?.CdTime);
    }
  }
  brd() {
    var i;
    this.GetButton(22)?.RootUIComp.SetUIActive(!this.cHm);
    if (this.cHm) {
      this.kmm?.SetUIActive(false);
      switch (this.Dmm?.GetQuestState()) {
        case 0:
        case 1:
          this.kmm = this.GetItem(15);
          if (this.Dmm?.GetIsUnlock()?.IsUnlock) {
            LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(16), "RestoreFrequency_Unlock_1");
          }
          break;
        case 2:
          this.kmm = this.GetButton(13)?.RootUIComp;
          break;
        case 3:
          this.kmm = this.GetButton(14)?.RootUIComp;
      }
      this.kmm?.SetUIActive(true);
    } else {
      this.GetItem(15)?.SetUIActive(true);
      this.kmm = this.GetItem(15);
      i = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.ActivityBaseData.ConditionGroupId);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(16), i);
    }
  }
  mGe() {
    this.TrySetSpriteByPath(this.Dmm?.GetTitleNumIconPath(), this.GetSprite(1), false);
    var i = this.Dmm?.GetQuestState();
    if (i === 0 || i === 1) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), "RestoreFrequency_Title_0");
    } else {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), this.Dmm?.GetTitle());
    }
  }
  async Dsd() {
    await this.j0m?.Promise;
    if (this.Dmm?.GetQuestState() === 3) {
      this.GetItem(19)?.SetUIActive(true);
      this.GetItem(20)?.SetUIActive(false);
      this.TrySetTextureByPath(this.Dmm.GetIconPath(), this.GetTexture(4));
    } else {
      this.GetItem(19)?.SetUIActive(false);
      this.GetItem(20)?.SetUIActive(true);
    }
  }
  Hmm() {
    this.xmm.forEach(i => {
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
    this.dHm();
  }
  FNe() {
    var [i, e] = this.GetTimeVisibleAndRemainTime();
    this.Umm?.SetTimeTextVisible(i);
    if (i) {
      this.Umm?.SetTimeTextByText(e);
    }
  }
  PKt() {
    this.Hmm();
    this.brd();
    this.Dsd();
  }
  I3e(e, t) {
    if (e !== undefined) {
      this.j0m = new CustomPromise_1.CustomPromise();
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
    this.xmm.clear();
    RedDotController_1.RedDotController.UnBindRedDot("CommonActivityPage");
  }
}
exports.ActivitySubViewPreWarm = ActivitySubViewPreWarm;
//# sourceMappingURL=ActivitySubViewPreWarm.js.map