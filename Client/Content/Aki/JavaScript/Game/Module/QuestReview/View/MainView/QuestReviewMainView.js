"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewMainView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const QuestReviewDefine_1 = require("../../QuestReviewDefine");
const QuestReviewNodeItem_1 = require("./QuestReviewNodeItem");
class QuestReviewMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.J51 = undefined;
    this.Z51 = undefined;
    this.Qyi = undefined;
    this.Pe = undefined;
    this.ODu = false;
    this.e81 = undefined;
    this.iha = e => {
      if (e && e > 0) {
        this.e81 = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTabDataById(e);
      }
      if (e === QuestReviewDefine_1.REFRESH_TIMING_AFTER_BURN) {
        this.olu();
      } else if (e !== 3 || ModelManager_1.ModelManager.QuestReviewModel.HasQuestLineFused()) {
        if (e === QuestReviewDefine_1.REFRESH_TIMING_AFTER_FUSION) {
          this.e81 = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTabDataById(3);
          this.e81.IsFirstTimeShow = true;
          this.GetHorizontalLayout(3).RootUIComp.SetUIActive(true);
          this.Tfa(this.Pe);
        } else {
          this.Og();
        }
      } else {
        this.GetHorizontalLayout(3).RootUIComp.SetUIActive(false);
        e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTreeDataById(this.e81.QuestTree);
        this.i81(e);
      }
    };
    this.t81 = () => new QuestReviewLineItem();
    this.Hwn = () => new QuestReviewTabItem();
    this.$An = e => {
      if (e === "Start") {
        this.GetSpine(5).SetAnimation(0, e, false);
      } else if (e === "Open") {
        this.GetSpine(6).SetAnimation(0, e, false);
      }
    };
    this.$Lu = () => {
      if (this.Pe?.IsFirstEntry) {
        this.Pe.IsFirstEntry = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.SpineSkeletonAnimationComponent], [6, UE.SpineSkeletonAnimationComponent]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    this.nlu();
    this.slu();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  async OnBeforeStartAsync() {
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    await this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.Qyi.SetHelpBtnActive(false);
    this.Qyi.SetTitleByTextIdAndArgNew("StoryReview_TabName");
  }
  OnStart() {
    [this.Pe, this.ODu] = this.OpenParam;
    this.J51 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.t81);
    this.Z51 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.Hwn);
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.BURN_QUEST_LINE);
    var e = e.IsDestroy && e.IsFirstTimeDestroy ? QuestReviewDefine_1.BURN_PLAY_TAB : this.Pe.TargetTab;
    this.e81 = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTabDataById(e);
    this.iha(e);
    ControllerHolder_1.ControllerHolder.QuestReviewController.AddViewRefreshDelegate(this.iha);
    if (this.Pe.IsFirstEntry) {
      this.UiViewSequence.StartSequenceName = "FirstStart";
      this.UiViewSequence.AddSequenceFinishEvent("FirstStart", this.$Lu);
    } else {
      this.UiViewSequence.StartSequenceName = "Start";
    }
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestReviewMainViewBeforeHide);
  }
  OnBeforeDestroy() {
    var e;
    ControllerHolder_1.ControllerHolder.QuestReviewController.RemoveViewRefreshDelegate(this.iha);
    this.UiViewSequence.RemoveSequenceFinishEvent("FirstStart", this.$Lu);
    if (this.e81?.Id === QuestReviewDefine_1.BURN_PLAY_TAB) {
      if (!ModelManager_1.ModelManager.QuestReviewModel.HasQuestLineFused()) {
        ControllerHolder_1.ControllerHolder.QuestReviewController.SetBurnFinish();
        ControllerHolder_1.ControllerHolder.QuestReviewController.SetFusionFinish();
        ControllerHolder_1.ControllerHolder.QuestReviewController.SetNewTabUnlockFinish();
        ModelManager_1.ModelManager.QuestReviewModel.SetQuestLineFused();
        (e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.NEW_QUEST_LINE)).HasFused = true;
        e.IsFirstTimeShow = false;
      }
      this.e81.IsFirstTimeShow = false;
    }
  }
  GetLoopAudioEventSwitch() {
    return this.ODu;
  }
  Og() {
    this.Tfa(this.Pe);
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTreeDataById(this.e81.QuestTree);
    this.i81(e);
  }
  i81(e) {
    var t = [];
    for (const s of e.QuestLines) {
      var i = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(s);
      if (!i?.IsFusionLine || !ModelManager_1.ModelManager.QuestReviewModel.HasQuestLineFused()) {
        if (i && i.IsShow) {
          t.push(i);
        }
      }
    }
    t.sort((e, t) => e.DisplayOrder - t.DisplayOrder);
    this.J51.RefreshByData(t);
  }
  olu() {
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.BURN_QUEST_LINE);
    e.IsFirstTimeDestroy = false;
    e.SkipAnim = true;
    var t = ModelManager_1.ModelManager.QuestReviewModel.GetTempLineData();
    var i = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.NEW_QUEST_LINE);
    i.IsFirstTimeShow = true;
    i.HasFused = true;
    var s = ModelManager_1.ModelManager.QuestReviewModel.GetTempLineData();
    this.J51.RefreshByData([e, t, i, s]);
    ModelManager_1.ModelManager.QuestReviewModel.SetQuestLineFused();
  }
  Tfa(e) {
    var t = [];
    for (const s of e.Tabs) {
      var i = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTabDataById(s);
      if (i && i.IsUnlocked) {
        i.IsSelected = s === this.e81.Id;
        t.push(i);
      }
    }
    this.Z51.GetRootUiItem().SetUIActive(t.length > 1);
    if (t.length <= 2) {
      for (const r of t) {
        r.IsFirstTimeShow = false;
      }
    }
    this.Z51.RefreshByData(t);
  }
  async nlu() {
    var e = ControllerHolder_1.ControllerHolder.QuestReviewController.FusionFinishPromise;
    if (e) {
      await e.Promise;
    }
  }
  async slu() {
    var e = ControllerHolder_1.ControllerHolder.QuestReviewController.NewTabUnlockPromise;
    if (e) {
      await e.Promise;
    }
  }
}
exports.QuestReviewMainView = QuestReviewMainView;
class QuestReviewLineItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.r81 = undefined;
    this.o81 = () => new QuestReviewNodeItem_1.QuestReviewNodeItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.r81 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.o81);
  }
  Refresh(e, t, i) {
    if (ModelManager_1.ModelManager.QuestReviewModel.IsQuestLineHasAnyVisibleNode(e.Id)) {
      this.GetRootItem().SetUIActive(true);
      if (e.IsTempLine) {
        this.r81.RefreshByData([]);
      } else {
        var s = ModelManager_1.ModelManager.QuestReviewModel.GetNodeIdListByQuestLineId(e.Id);
        var r = [];
        var n = ModelManager_1.ModelManager.QuestReviewModel.HasQuestLineFused();
        for (let i = 0; i < s.length; ++i) {
          var o = s[i];
          var a = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewNodeDataById(o);
          var h = i > 0 && (s[i - 1] === 0 || !ModelManager_1.ModelManager.QuestReviewModel.IsNodeVisible(s[i - 1]));
          var _ = e.IsDestroy;
          var l = ModelManager_1.ModelManager.QuestReviewModel.IsNodeVisible(o);
          let t = !a || !l;
          for (let e = i + 1; e < s.length; ++e) {
            var v = s[e];
            if (v && ModelManager_1.ModelManager.QuestReviewModel.IsNodeVisible(v)) {
              t = false;
              break;
            }
          }
          if (o === QuestReviewDefine_1.HIDE_NODE_ID_WHEN_PLAYING_BURN && !n) {
            t = true;
          }
          l = {
            Data: a,
            IsLastSlotEmpty: h,
            IsDestroy: _,
            IsLastSlot: i === s.length - 1,
            LineColorHex: e.LineColorHex,
            StarIcon: e.StarIcon,
            RoundIcon: e.RoundIcon,
            LineId: e.Id,
            ShouldHide: t,
            SlotIndex: i
          };
          r.push(l);
        }
        this.r81.RefreshByData(r);
        TimerSystem_1.TimerSystem.Next(() => {
          if (e.IsShow) {
            e.IsFirstTimeShow = false;
          }
          if (e.IsDestroy) {
            e.IsFirstTimeDestroy = false;
          }
          e.SkipAnim &&= false;
        });
      }
    } else {
      this.GetRootItem().SetUIActive(false);
    }
  }
}
const MAX_TAB_NUM = 3;
class QuestReviewTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Hea = undefined;
    this.Pnu = false;
    this.n81 = () => {
      ControllerHolder_1.ControllerHolder.QuestReviewController.TriggerViewRefresh(this.Pe.Id);
    };
    this.alu = e => {
      if (e === "Unlock" && this.Pe?.IsSelected) {
        this.GetExtendToggle(0).SetToggleStateForce(1, undefined, true);
      }
    };
    this.$An = e => {
      if (e === "idle") {
        this.GetSpine(2)?.SetAnimation(0, e, true);
      }
    };
    this.BNe = () => {
      var e = ModelManager_1.ModelManager.QuestReviewModel.TabHasRedDot(this.Pe?.Id ?? 0);
      this.GetItem(4).SetUIActive(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.SpineSkeletonAnimationComponent], [3, UE.UISprite], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.n81]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.Hea.BindSequenceCloseEvent(this.alu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnOpenQuestReviewDetail, this.BNe);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnOpenQuestReviewDetail, this.BNe);
  }
  Refresh(e, t, i) {
    this.Clear();
    this.Pe = e;
    this.BNe();
    if (this.Pe.IsFirstTimeShow) {
      this.Hea.PlayLevelSequenceByName("Unlock");
      this.Pe.IsFirstTimeShow = false;
      this.Pnu = true;
    } else {
      if (!this.Pnu) {
        this.Hea.PlayLevelSequenceByName(e.IsSelected ? "Start" : "UnStart");
        this.Pnu = true;
      }
      this.GetExtendToggle(0).SetToggleState(e.IsSelected ? 1 : 0);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.NameId);
    this.GetSprite(3).SetUIActive(i < MAX_TAB_NUM - 1);
  }
  Clear() {
    var e = this.GetExtendToggle(0);
    e.SetToggleStateForce(0, false);
    var t = e.StateSwitchAnimations.Get(1);
    if (t !== undefined) {
      t = t.Animation.LevelSequence;
      e.GetOwner().SequenceJumpToEnd(t);
    }
  }
}
//# sourceMappingURL=QuestReviewMainView.js.map