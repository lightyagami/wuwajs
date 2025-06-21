"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewMainView = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  QuestReviewDefine_1 = require("../../QuestReviewDefine"),
  QuestReviewNodeItem_1 = require("./QuestReviewNodeItem");
class QuestReviewMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.C51 = void 0, this.p51 = void 0, this.Qyi = void 0, this.Pe = void 0, this.v51 = void 0, this.iha = e => {
      e && 0 < e && (this.v51 = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTabDataById(e)), e === QuestReviewDefine_1.REFRESH_TIMING_AFTER_BURN ? this.jou() : 3 !== e || ModelManager_1.ModelManager.QuestReviewModel.HasQuestLineFused() ? e === QuestReviewDefine_1.REFRESH_TIMING_AFTER_FUSION ? (this.v51 = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTabDataById(3), this.v51.IsFirstTimeShow = !0, this.GetHorizontalLayout(3).RootUIComp.SetUIActive(!0), this.Tfa(this.Pe)) : this.Og() : (this.GetHorizontalLayout(3).RootUIComp.SetUIActive(!1), e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTreeDataById(this.v51.QuestTree), this.S51(e))
    }, this.y51 = () => new QuestReviewLineItem, this.Hwn = () => new QuestReviewTabItem, this.$An = e => {
      "Start" === e ? this.GetSpine(5).SetAnimation(0, e, !1) : "Open" === e && this.GetSpine(6).SetAnimation(0, e, !1)
    }, this.Kdu = () => {
      this.Pe?.IsFirstEntry && (this.Pe.IsFirstEntry = !1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.SpineSkeletonAnimationComponent],
      [6, UE.SpineSkeletonAnimationComponent]
    ]
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An), this.Hou(), this.$ou()
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An)
  }
  async OnBeforeStartAsync() {
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem, this.Qyi.SetCloseCallBack(() => {
      this.CloseMe()
    }), await this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.Qyi.SetHelpBtnActive(!1), this.Qyi.SetTitleByTextIdAndArgNew("StoryReview_TabName")
  }
  OnStart() {
    this.Pe = this.OpenParam, this.C51 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.y51), this.p51 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.Hwn);
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.BURN_QUEST_LINE),
      e = e.IsDestroy && e.IsFirstTimeDestroy ? QuestReviewDefine_1.BURN_PLAY_TAB : this.Pe.TargetTab;
    this.v51 = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTabDataById(e), this.iha(e), ControllerHolder_1.ControllerHolder.QuestReviewController.AddViewRefreshDelegate(this.iha), this.Pe.IsFirstEntry ? (this.UiViewSequence.StartSequenceName = "FirstStart", this.UiViewSequence.AddSequenceFinishEvent("FirstStart", this.Kdu)) : this.UiViewSequence.StartSequenceName = "Start"
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestReviewMainViewBeforeHide)
  }
  OnBeforeDestroy() {
    var e;
    ControllerHolder_1.ControllerHolder.QuestReviewController.RemoveViewRefreshDelegate(this.iha), this.UiViewSequence.RemoveSequenceFinishEvent("FirstStart", this.Kdu), this.v51?.Id === QuestReviewDefine_1.BURN_PLAY_TAB && (ModelManager_1.ModelManager.QuestReviewModel.HasQuestLineFused() || (ControllerHolder_1.ControllerHolder.QuestReviewController.SetBurnFinish(), ControllerHolder_1.ControllerHolder.QuestReviewController.SetFusionFinish(), ControllerHolder_1.ControllerHolder.QuestReviewController.SetNewTabUnlockFinish(), ModelManager_1.ModelManager.QuestReviewModel.SetQuestLineFused(), (e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.NEW_QUEST_LINE)).HasFused = !0, e.IsFirstTimeShow = !1), this.v51.IsFirstTimeShow = !1)
  }
  Og() {
    this.Tfa(this.Pe);
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTreeDataById(this.v51.QuestTree);
    this.S51(e)
  }
  S51(e) {
    var t = [];
    for (const s of e.QuestLines) {
      var i = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(s);
      i?.IsFusionLine && ModelManager_1.ModelManager.QuestReviewModel.HasQuestLineFused() || i && i.IsShow && t.push(i)
    }
    t.sort((e, t) => e.DisplayOrder - t.DisplayOrder), this.C51.RefreshByData(t)
  }
  jou() {
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.BURN_QUEST_LINE),
      t = (e.IsFirstTimeDestroy = !1, e.SkipAnim = !0, ModelManager_1.ModelManager.QuestReviewModel.GetTempLineData()),
      i = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.NEW_QUEST_LINE),
      s = (i.IsFirstTimeShow = !0, i.HasFused = !0, ModelManager_1.ModelManager.QuestReviewModel.GetTempLineData());
    this.C51.RefreshByData([e, t, i, s]), ModelManager_1.ModelManager.QuestReviewModel.SetQuestLineFused()
  }
  Tfa(e) {
    var t = [];
    for (const s of e.Tabs) {
      var i = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTabDataById(s);
      i && i.IsUnlocked && (i.IsSelected = s === this.v51.Id, t.push(i))
    }
    if (this.p51.GetRootUiItem().SetUIActive(1 < t.length), t.length <= 2)
      for (const r of t) r.IsFirstTimeShow = !1;
    this.p51.RefreshByData(t)
  }
  async Hou() {
    var e = ControllerHolder_1.ControllerHolder.QuestReviewController.FusionFinishPromise;
    e && await e.Promise
  }
  async $ou() {
    var e = ControllerHolder_1.ControllerHolder.QuestReviewController.NewTabUnlockPromise;
    e && await e.Promise
  }
}
exports.QuestReviewMainView = QuestReviewMainView;
class QuestReviewLineItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.M51 = void 0, this.E51 = () => new QuestReviewNodeItem_1.QuestReviewNodeItem
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem]
    ]
  }
  OnStart() {
    this.M51 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.E51)
  }
  Refresh(e, t, i) {
    if (ModelManager_1.ModelManager.QuestReviewModel.IsQuestLineHasAnyVisibleNode(e.Id))
      if (this.GetRootItem().SetUIActive(!0), e.IsTempLine) this.M51.RefreshByData([]);
      else {
        var s = ModelManager_1.ModelManager.QuestReviewModel.GetNodeIdListByQuestLineId(e.Id),
          r = [],
          n = ModelManager_1.ModelManager.QuestReviewModel.HasQuestLineFused();
        for (let i = 0; i < s.length; ++i) {
          var o = s[i],
            a = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewNodeDataById(o),
            h = 0 < i && (0 === s[i - 1] || !ModelManager_1.ModelManager.QuestReviewModel.IsNodeVisible(s[i - 1])),
            _ = e.IsDestroy,
            l = ModelManager_1.ModelManager.QuestReviewModel.IsNodeVisible(o);
          let t = !a || !l;
          for (let e = i + 1; e < s.length; ++e) {
            var v = s[e];
            if (v && ModelManager_1.ModelManager.QuestReviewModel.IsNodeVisible(v)) {
              t = !1;
              break
            }
          }
          o !== QuestReviewDefine_1.HIDE_NODE_ID_WHEN_PLAYING_BURN || n || (t = !0);
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
          r.push(l)
        }
        this.M51.RefreshByData(r), TimerSystem_1.TimerSystem.Next(() => {
          e.IsShow && (e.IsFirstTimeShow = !1), e.IsDestroy && (e.IsFirstTimeDestroy = !1), e.SkipAnim && (e.SkipAnim = !1)
        })
      }
    else this.GetRootItem().SetUIActive(!1)
  }
}
const MAX_TAB_NUM = 3;
class QuestReviewTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this.Hea = void 0, this.fiu = !1, this.I51 = () => {
      ControllerHolder_1.ControllerHolder.QuestReviewController.TriggerViewRefresh(this.Pe.Id)
    }, this.Wou = e => {
      "Unlock" === e && this.Pe?.IsSelected && this.GetExtendToggle(0).SetToggleStateForce(1, void 0, !0)
    }, this.$An = e => {
      "idle" === e && this.GetSpine(2)?.SetAnimation(0, e, !0)
    }, this.BNe = () => {
      var e = ModelManager_1.ModelManager.QuestReviewModel.TabHasRedDot(this.Pe?.Id ?? 0);
      this.GetItem(4).SetUIActive(e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.SpineSkeletonAnimationComponent],
      [3, UE.UISprite],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.I51]
    ]
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem()), this.Hea.BindSequenceCloseEvent(this.Wou), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnOpenQuestReviewDetail, this.BNe)
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnOpenQuestReviewDetail, this.BNe)
  }
  Refresh(e, t, i) {
    this.Clear(), this.Pe = e, this.BNe(), this.Pe.IsFirstTimeShow ? (this.Hea.PlayLevelSequenceByName("Unlock"), this.Pe.IsFirstTimeShow = !1, this.fiu = !0) : (this.fiu || (this.Hea.PlayLevelSequenceByName(e.IsSelected ? "Start" : "UnStart"), this.fiu = !0), this.GetExtendToggle(0).SetToggleState(e.IsSelected ? 1 : 0)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.NameId), this.GetSprite(3).SetUIActive(i < MAX_TAB_NUM - 1)
  }
  Clear() {
    var e = this.GetExtendToggle(0),
      t = (e.SetToggleStateForce(0, !1), e.StateSwitchAnimations.Get(1));
    void 0 !== t && (t = t.Animation.LevelSequence, e.GetOwner().SequenceJumpToEnd(t))
  }
}
//# sourceMappingURL=QuestReviewMainView.js.map