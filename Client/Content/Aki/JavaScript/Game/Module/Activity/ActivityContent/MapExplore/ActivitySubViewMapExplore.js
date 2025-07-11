"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewMapExplore = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityManager_1 = require("../../ActivityManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivitySubMapExploreItem_1 = require("./ActivitySubMapExploreItem");
class ActivitySubViewMapExplore extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.s4e = undefined;
    this.wVl = undefined;
    this.loc = undefined;
    this.OnBtnJump = () => {
      var e = this.loc?.RecommendAreaList;
      if (e?.length) {
        var i = this.GetJumpExploreInfo();
        if (i) {
          var t = i.AreaId;
          if (!ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(t)) {
            e = e.indexOf(t);
            e = this.loc?.SourceList[e];
            if (e) {
              SkipTaskManager_1.SkipTaskManager.RunByConfigId(e);
              return;
            }
          }
          e = i.GetRecommendExploreItemDataList(false)?.find(e => !e.IsCompleted());
          SkipTaskManager_1.SkipTaskManager.Run(23, t, e?.ExploreType);
        }
      }
    };
    this.Bqe = () => {
      var e = new ActivitySubMapExploreItem_1.ActivitySubMapExploreItem();
      e.GetRewardCallBack = this.rJs;
      return e;
    };
    this.rJs = e => {
      ActivityManager_1.ActivityManager.GetActivityController(this.ActivityBaseData.Type).RequestGetReward(e.TaskId);
    };
    this._oc = () => {
      this.coc();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [10, UE.UIScrollViewWithScrollbarComponent], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIText], [14, UE.UIItem], [15, UE.UITexture], [16, UE.UITexture]];
    this.BtnBindInfo = [[12, this.OnBtnJump]];
  }
  GetJumpExploreInfo() {
    var e = this.loc.RecommendAreaList;
    if (e.length === 1) {
      return ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e[0]);
    }
    let i = undefined;
    e.forEach(e => {
      e = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e);
      if (e && (!i || e.GetProgress() < i.GetProgress())) {
        i = e;
      }
    });
    return i;
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    await ControllerHolder_1.ControllerHolder.ExploreProgressController.AllExploreProgressAsyncRequest();
    this.s4e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(10), this.Bqe);
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    await this.wVl.CreateByActorAsync(this.GetItem(14).GetOwner());
    this.wVl.ButtonCallBack = () => {
      ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(this.ActivityBaseData.Id);
    };
  }
  OnStart() {
    if (this.ActivityBaseData.IsFirstUnlockState(1)) {
      this.ActivityBaseData.SetFirstUnlockState(2);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityMapExploreStateUpdate, this._oc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityMapExploreStateUpdate, this._oc);
  }
  OnRefreshView() {
    this.coc();
    this.loc = ConfigManager_1.ConfigManager.ActivityMapExploreConfig.GetActivityInfo(this.ActivityBaseData.Id);
    var e = this.loc;
    var i = e.PercentDesc;
    var t = e.AreaTitle;
    var r = !!i && !!t;
    var s = this.GetText(0);
    var n = this.GetText(1);
    var a = this.GetText(2);
    if (r) {
      o = e.RecommendAreaList[0];
      i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i);
      s.SetText(i);
      i = ModelManager_1.ModelManager.ExploreProgressModel?.GetExploreAreaData(o)?.GetProgress() ?? 0;
      n.SetText(i + "%");
      a.ShowTextNew(t);
    }
    s.SetUIActive(r);
    n.SetUIActive(r);
    a.SetUIActive(r);
    this.GetText(3).ShowTextNew(e.MainTitle);
    this.UpdateRemainTime();
    this.GetText(6).ShowTextNew(e.Desc);
    this.GetText(8).SetText(e.SumRewardNum.toString());
    this.GetText(9).ShowTextNew(e.SumRewardDesc);
    this.GetText(13).ShowTextNew("Activity_Exploration_Go");
    this.uoc();
    var o = this.GetTexture(16);
    var i = this.GetTexture(15);
    this.SetTextureShowUntilLoaded(e.Bg, o);
    this.SetTextureShowUntilLoaded(e.Bg, i);
  }
  UpdateRemainTime() {
    var e;
    var i;
    var t;
    if (this.ActivityBaseData) {
      [e, i] = ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(this.ActivityBaseData);
      (t = this.GetText(4)).SetText(i);
      t.SetUIActive(e);
    }
  }
  OnTimer(e) {
    this.UpdateRemainTime();
  }
  coc() {
    this.s4e?.SelectGridProxy(-1);
    this.s4e?.RefreshByData(this.ActivityBaseData.TaskList, undefined, true);
  }
  uoc() {
    var e;
    var i = this.ActivityBaseData.CanPreOpen();
    this.wVl.SetUiActive(!i);
    this.GetButton(12).RootUIComp.SetUIActive(i);
    if (!i) {
      this.wVl.SetButtonVisible(true);
      i = this.ActivityBaseData.HasPreOpenCondition();
      e = this.ActivityBaseData.PreOpenConditionGroupId;
      if ((i = i ? e : this.ActivityBaseData.ConditionGroupId) && (e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(i))) {
        this.wVl.SetTextByTextId(e);
      }
    }
  }
}
exports.ActivitySubViewMapExplore = ActivitySubViewMapExplore;
//# sourceMappingURL=ActivitySubViewMapExplore.js.map