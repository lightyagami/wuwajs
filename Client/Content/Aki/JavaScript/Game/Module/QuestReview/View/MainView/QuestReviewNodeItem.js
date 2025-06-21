"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewNodeItem = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  QuestReviewDefine_1 = require("../../QuestReviewDefine"),
  NODE_STATE_TRANS_ANIM_DELAY = 1800,
  NODE_TRIGGER_ANIM_DELAY = 20,
  NODE_FUSION_ANIM_INTERVAL = 100;
class QuestReviewNodeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.T51 = void 0, this.b51 = void 0, this.R51 = void 0, this.L51 = void 0, this.Hea = void 0, this.Xdu = void 0, this.pDe = void 0, this.giu = () => {
      let t = "ActivateClose";
      this.w51(this.pDe) ? t = "ActivateClose" : this.A51(this.pDe) ? t = "ActivateCloseC" : this.P51(this.pDe) ? t = "NotClose" : this.x51(this.pDe) && (t = "NotCloseB"), this.Hea?.PlayLevelSequenceByName(t)
    }, this.$xt = t => {
      this.GetRootActor()?.IsValid() && ("Flame" === t && (this.T51?.SetUiActive(!1), this.T51?.SetToggleInteractive(!0), ControllerHolder_1.ControllerHolder.QuestReviewController.SetBurnFinish()), "Change" === t && (this.T51?.SetUiActive(!1), this.T51?.SetToggleInteractive(!0)), "Trigger" === t) && ControllerHolder_1.ControllerHolder.QuestReviewController.SetNewTabUnlockFinish()
    }
  }
  get j3() {
    return this.Xdu
  }
  set j3(t) {
    this.Xdu && TimerSystem_1.TimerSystem.Has(this.Xdu) && TimerSystem_1.TimerSystem.Remove(this.Xdu), this.Xdu = t
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem()), this.T51 = new QuestReviewNodeNormalItem(this.GetItem(5)), this.b51 = new QuestReviewNodeDestroyItem, this.R51 = new QuestReviewNodeStarItem, this.L51 = new QuestReviewNodeStarDestroyItem;
    var t = [],
      e = this.GetItem(1).GetOwner(),
      e = (t.push(this.T51.CreateByActorAsync(e)), this.GetItem(2).GetOwner()),
      e = (t.push(this.b51.CreateByActorAsync(e)), this.GetItem(3).GetOwner()),
      e = (t.push(this.R51.CreateByActorAsync(e)), this.GetItem(4).GetOwner());
    t.push(this.L51.CreateByActorAsync(e)), await Promise.all(t), this.T51.SetSeqPlayer(this.Hea), this.b51.SetSeqPlayer(this.Hea), this.R51.SetSeqPlayer(this.Hea), this.L51.SetSeqPlayer(this.Hea)
  }
  OnStart() {
    this.Hea.BindSequenceCloseEvent(this.$xt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestReviewMainViewBeforeHide, this.giu)
  }
  OnBeforeDestroy() {
    this.j3 = void 0, EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestReviewMainViewBeforeHide, this.giu)
  }
  Refresh(t) {
    this.pDe = t, this.T51.SetUiActive(this.w51(t)), this.b51.SetUiActive(this.A51(t)), this.R51.SetUiActive(this.P51(t)), this.L51.SetUiActive(this.x51(t)), t.ShouldHide ? this.GetRootItem().SetAlpha(0) : (this.GetRootItem().SetAlpha(1), this.w51(t) && (this.Hea?.PlayLevelSequenceByName("Flame"), this.Hea?.StopCurrentSequence(), this.T51.Refresh(t)), this.A51(t) && this.b51.Refresh(t), this.P51(t) && this.R51.Refresh(t), this.x51(t) && this.L51.Refresh(t), this.Qou(t))
  }
  Qou(t) {
    var e, i, s = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    s?.SkipAnim || (this.w51(t) ? ModelManager_1.ModelManager.QuestReviewModel.IsFirstEntry() ? (this.fnu(t), t.Data?.IsFirstTimeShow && (t.Data.IsFirstTimeShow = !1), s?.IsFirstTimeShow && (s.IsFirstTimeShow = !1)) : (s?.IsShow && s?.IsFirstTimeShow && (this.Ciu(t), t.Data?.IsFirstTimeShow) && (t.Data.IsFirstTimeShow = !1), t.Data?.IsFirstTimeShow ? (this.Ciu(t), t.Data.IsFirstTimeShow = !1) : this.Hea.PlayLevelSequenceByName("ActivateStart")) : this.A51(t) ? s?.IsDestroy && s?.IsFirstTimeDestroy ? (this.piu(t), t.Data?.IsFirstTimeShow && (t.Data.IsFirstTimeShow = !1)) : this.Hea.PlayLevelSequenceByName("ActivateStartC") : this.P51(t) ? (e = t.LineId === QuestReviewDefine_1.NEW_QUEST_LINE, i = ModelManager_1.ModelManager.QuestReviewModel.HasQuestLineFused(), e && !i ? (this.R51?.SetUiActive(!1), this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      this.R51?.SetUiActive(!0), this.Hea.PlayLevelSequenceByName("UnTrigger")
    }, NODE_TRIGGER_ANIM_DELAY)) : this.Hea.PlayLevelSequenceByName("NotStart")) : this.x51(t) && (s?.IsDestroy && s?.IsFirstTimeDestroy ? (this.viu(t), t.Data?.IsFirstTimeShow && (t.Data.IsFirstTimeShow = !1)) : this.Hea.PlayLevelSequenceByName("NotStartB")))
  }
  w51(t) {
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetPredecessorNodeByNodeId(t.Data?.Id ?? 0);
    return !!t.Data && 0 !== t.Data.State && !t.IsDestroy && (t.Data.ShowOnceUnlock || !e || 3 === e?.State)
  }
  A51(t) {
    return !!t.Data && t.IsDestroy
  }
  P51(t) {
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetPredecessorNodeByNodeId(t.Data?.Id ?? 0);
    return (!t.Data || 0 === t.Data.State || !t.Data.ShowOnceUnlock && !!e && e.State < 3) && !t.IsDestroy
  }
  x51(t) {
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetPredecessorNodeByNodeId(t.Data?.Id ?? 0);
    return (!t.Data || 0 === t.Data.State || !t.Data.ShowOnceUnlock && !!e && e.State < 3) && t.IsDestroy
  }
  Ciu(t) {
    this.T51?.SetUiActive(!1), this.R51?.SetUiActive(!0), this.R51?.Refresh(t), this.Hea.PlayLevelSequenceByName("NotStart");
    const e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      this.T51?.SetUiActive(!0), this.Hea?.PlayLevelSequenceByName(e.ShowSeqName)
    }, NODE_TRIGGER_ANIM_DELAY)
  }
  fnu(t) {
    this.T51?.SetUiActive(!1), this.R51?.SetUiActive(!0), this.R51?.Refresh(t);
    const e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      this.T51?.SetUiActive(!0), this.Hea?.PlayLevelSequenceByName(e.NodeFirstActivateSeqName)
    }, NODE_STATE_TRANS_ANIM_DELAY)
  }
  async piu(t) {
    this.b51?.SetUiActive(!1), this.T51?.SetUiActive(!0), this.T51?.SetToggleInteractive(!1), this.T51?.Refresh(t);
    const e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    e.IsFusionLine ? (this.Hea?.PlayLevelSequenceByName("Flame"), this.Hea?.StopCurrentSequence(), await ControllerHolder_1.ControllerHolder.QuestReviewController.BurnFinishPromise.Promise, await TimerSystem_1.TimerSystem.Wait(Math.max(NODE_FUSION_ANIM_INTERVAL * t.SlotIndex, TimerSystem_1.MIN_TIME)), await this.Hea?.PlaySequenceAsync(e.DestroySeqName, new CustomPromise_1.CustomPromise), 4 === e.DisplayOrder && ControllerHolder_1.ControllerHolder.QuestReviewController.SetFusionFinish()) : this.j3 = TimerSystem_1.TimerSystem.Next(() => {
      this.b51?.SetUiActive(!0), this.Hea?.PlayLevelSequenceByName(e.DestroySeqName)
    })
  }
  async viu(t) {
    this.L51?.SetUiActive(!1), this.R51?.SetUiActive(!0), this.R51?.Refresh(t);
    const e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    e.IsFusionLine ? (await ControllerHolder_1.ControllerHolder.QuestReviewController.BurnFinishPromise.Promise, await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME), await TimerSystem_1.TimerSystem.Wait(Math.max(NODE_FUSION_ANIM_INTERVAL * t.SlotIndex, TimerSystem_1.MIN_TIME)), this.L51?.SetUiActive(!e.IsFusionLine), this.Hea?.PlayLevelSequenceByName("Unchange")) : this.j3 = TimerSystem_1.TimerSystem.Next(() => {
      this.L51?.SetUiActive(!e.IsFusionLine), this.Hea?.PlayLevelSequenceByName("NotFlameA")
    })
  }
}
exports.QuestReviewNodeItem = QuestReviewNodeItem;
class QuestReviewNodeItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.SeqPlayer = void 0
  }
  Refresh(t) {}
  SetSeqPlayer(t) {
    this.SeqPlayer = t
  }
  PlaySeqByName(t) {
    this.SeqPlayer?.PlayLevelSequenceByName(t)
  }
}
const NORMAL_VERTICAL_LINE_HEIGHT = 50,
  BRANCHING_VERTICAL_LINE_HEIGHT = 320,
  LINE_ALPHA = .5;
class QuestReviewNodeNormalItem extends QuestReviewNodeItemBase {
  constructor(t) {
    super(), this.yiu = t, this.Pe = void 0, this.p$1 = () => {
      ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestNodeDetail(this.Pe.Id), this.GetExtendToggle(13).SetToggleState(0), this.Pe.HasRedDot = !1, this.yiu.SetUIActive(!1)
    }, this.yfu = t => {
      this.Pe?.Id === t && this.yiu.SetUIActive(!1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UISprite],
      [11, UE.UISprite],
      [12, UE.UISprite],
      [13, UE.UIExtendToggle],
      [14, UE.UITexture]
    ], this.BtnBindInfo = [
      [13, this.p$1]
    ]
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnOpenQuestReviewDetail, this.yfu)
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnOpenQuestReviewDetail, this.yfu)
  }
  Refresh(t) {
    this.Pe = t.Data, this.GetRootItem().SetAlpha(1), this.U51.SetAlpha(LINE_ALPHA), this.D51.SetAlpha(LINE_ALPHA), this.SetTextureByPath(this.Pe.ImageSmall, this.GetTexture(0)), this.SetTextureByPath(this.Pe.ImageSmall, this.GetTexture(14)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe.TitleId), this.GetItem(8).SetUIActive(1 === this.Pe.LineType), this.GetItem(9).SetUIActive(0 === this.Pe.LineType);
    var e = this.Pe.IsBranching ? BRANCHING_VERTICAL_LINE_HEIGHT : NORMAL_VERTICAL_LINE_HEIGHT,
      e = (this.D51.SetHeight(e), this.D51.SetUIActive(this.Pe.IsBranching), this.GetSprite(4).SetUIActive(!t.IsLastSlotEmpty), this.SetSpriteByPath(t.RoundIcon, this.GetSprite(4), !1), this.qz1(t), ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId));
    this.yiu.SetUIActive(t.Data.HasRedDot && !e.IsDestroy)
  }
  SetToggleInteractive(t) {
    this.GetExtendToggle(13).SetSelfInteractive(t)
  }
  get D51() {
    return 0 === this.Pe.LineType ? this.GetSprite(2) : this.GetSprite(12)
  }
  get U51() {
    return 0 === this.Pe.LineType ? this.GetSprite(1) : this.GetSprite(10)
  }
  get Gz1() {
    return 0 === this.Pe.LineType ? this.GetSprite(6) : this.GetSprite(11)
  }
  qz1(t) {
    this.D51.SetColor(UE.Color.FromHex(t.LineColorHex)), this.U51.SetColor(UE.Color.FromHex(t.LineColorHex)), this.Gz1.SetColor(UE.Color.FromHex(t.LineColorHex))
  }
}
class QuestReviewNodeDestroyItem extends QuestReviewNodeItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite]
    ]
  }
  Refresh(t) {
    this.GetRootItem().SetAlpha(1), this.GetSprite(0).SetAlpha(LINE_ALPHA), this.GetSprite(1).SetAlpha(LINE_ALPHA), this.GetSprite(1).SetUIActive(!t.IsLastSlotEmpty), this.SetSpriteByPath(t.RoundIcon, this.GetSprite(1), !1);
    t = UE.Color.FromHex(t.LineColorHex);
    this.GetSprite(0).SetColor(t)
  }
}
const STAR_HORIZONTAL_LINE_STRETCH_RIGHT = -190;
class QuestReviewNodeStarItem extends QuestReviewNodeItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite]
    ]
  }
  Refresh(t) {
    this.GetRootItem().SetAlpha(1), this.GetSprite(0).SetAlpha(LINE_ALPHA), this.GetSprite(2).SetAlpha(LINE_ALPHA), this.GetSprite(1).SetAlpha(LINE_ALPHA), this.GetSprite(1).SetUIActive(!t.IsLastSlotEmpty), this.SetSpriteByPath(t.RoundIcon, this.GetSprite(1), !1), this.SetSpriteByPath(t.StarIcon, this.GetSprite(3), !1), this.GetSprite(0).SetUIActive(!0), this.GetSprite(2).SetUIActive(!1);
    var e = t.IsLastSlot ? 0 : STAR_HORIZONTAL_LINE_STRETCH_RIGHT,
      e = (this.U51.SetStretchRight(e), UE.Color.FromHex(t.LineColorHex));
    this.U51.SetColor(e)
  }
  get U51() {
    return this.GetSprite(0)
  }
}
class QuestReviewNodeStarDestroyItem extends QuestReviewNodeItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIItem]
    ]
  }
  Refresh(t) {
    this.GetRootItem().SetAlpha(1), this.GetSprite(0).SetAlpha(LINE_ALPHA), this.GetSprite(1).SetAlpha(LINE_ALPHA), this.GetSprite(1).SetUIActive(!t.IsLastSlotEmpty), this.GetItem(2).SetUIActive(!t.IsLastSlotEmpty), this.SetSpriteByPath(t.RoundIcon, this.GetSprite(1), !1);
    var e = UE.Color.FromHex(t.LineColorHex),
      e = (this.GetSprite(0).SetColor(e), t.IsLastSlot ? 0 : STAR_HORIZONTAL_LINE_STRETCH_RIGHT);
    this.GetSprite(0).SetStretchRight(e)
  }
}
//# sourceMappingURL=QuestReviewNodeItem.js.map