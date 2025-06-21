"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaHandArea = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  Transform_1 = require("../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  PhantomArenaCard_1 = require("../../Card/PhantomArenaCard"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaHandAreaItem_1 = require("./PhantomArenaHandAreaItem"),
  PhantomArenaHandCardProxy_1 = require("./PhantomArenaHandCardProxy"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
class PhantomArenaHandArea extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.CardMap = new Map, this.Area = void 0, this.Layout = void 0, this.ItemWorldTrans = Transform_1.Transform.Create(), this.TempCardPos = Vector_1.Vector.Create(), this.TotalWidth = 0, this.TotalHeight = 0, this.GridWidth = 0, this.OriginalSpace = 0, this.OriginalOffset = 0, this.Sequence = void 0, this.IsLayoutHoist = !1
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout]
    ]
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Layout = this.GetHorizontalLayout(0), this.Layout.bUseOriginalChildrenOrder = !0, this.OriginalSpace = this.Layout.GetSpacing(), this.ItemWorldTrans.FromUeTransform(this.RootItem.K2_GetComponentToWorld()), this.OriginalOffset = this.RootItem.GetAnchorOffsetY(), this.TotalWidth = this.Layout.RootUIComp.GetWidth(), this.TotalHeight = this.Layout.RootUIComp.GetHeight()
  }
  OnBeforeDestroy() {
    this.Sequence.Clear()
  }
  async UA_() {
    var a = new PhantomArenaHandAreaItem_1.PhantomArenaHandAreaItem;
    return await a.CreateThenShowByResourceIdAsync("UiItem_HeadAreaItem", this.RootItem), a
  }
  Uc1() {
    let a = this.OriginalSpace;
    var t = PhantomArenaDefine_1.HANDCARD_LIMIT * this.GridWidth + (PhantomArenaDefine_1.HANDCARD_LIMIT - 1) * this.OriginalSpace;
    this.CardMap.size > PhantomArenaDefine_1.HANDCARD_LIMIT && (t = t - this.CardMap.size * this.GridWidth, a = t / (this.CardMap.size - 1)), this.Layout.SetSpacing(a), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "[CalculateLayoutSpace]", ["Space", a])
  }
  async Dc1(a) {
    var t = new PhantomArenaHandCardProxy_1.PhantomArenaHandCardProxy,
      e = (this.CardMap.set(a, t), await this.UA_()),
      a = (await e.PlayMoveInSequence(), this.GridWidth = e.GetRootItem().GetWidth(), ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(a)),
      i = new PhantomArenaCard_1.PhantomArenaCard;
    i.SetCardData(a), t.Init(i, e, this.Area), await i.CreateByResourceIdAsync("UiItem_SoundRemnantItem", e.GetRootItem()), await i.RefreshSelfAsync()
  }
  async Bc1(a) {
    var t = new PhantomArenaHandCardProxy_1.PhantomArenaHandCardProxy,
      e = (this.CardMap.set(a.Data.CardId, t), await this.UA_());
    t.Init(a, e, this.Area), await e.PlayMoveInSequence()
  }
  async Zeu() {
    var a, t, e, i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardIdList(),
      r = (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "初始化手牌", ["Id", i]), []);
    for ([a, t] of this.CardMap) {
      const n = i.indexOf(a);
      0 <= n ? (i.splice(n, 1), e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(a), r.push(t.RefreshCardData(e))) : (this.CardMap.delete(a), r.push(t.Clear()))
    }
    await Promise.all(r);
    var s = [];
    for (const o of i) s.push(this.Dc1(o));
    await Promise.all(s);
    let n = 0;
    for (const h of this.CardMap.values()) h.SetHierarchyIndex(n), n++;
    this.Uc1()
  }
  async zru(a) {
    var t = [];
    for (const e of a) t.push(this.Dc1(e));
    await Promise.all(t), this.Uc1()
  }
  async Ktu(a) {
    var t = [];
    let e = 1;
    for (const i of this.CardMap.values()) i.IsFourCost() || (t.push(i.PlayStartTimeLocationTween(a, e * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY)), e++);
    await Promise.all(t)
  }
  async Xtu(a) {
    var t = [];
    let e = 1;
    for (const i of this.CardMap.values()) i.IsFourCost() || (t.push(i.PlayEndTimeLocationTween(a, e * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY)), e++);
    await Promise.all(t)
  }
  async Jru(a, t) {
    var e = [];
    let i = 1;
    for (const o of t) {
      var r = this.CardMap.get(o);
      r && e.push(r.PlayDiscardCardTween(a, i * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY)), i++
    }
    await Promise.all(e);
    var s = [];
    for (const h of t) {
      var n = this.CardMap.get(h);
      n && (s.push(n.RemoveBySequence()), this.CardMap.delete(h))
    }
    await Promise.all(s), this.Uc1()
  }
  async Zru(a, t) {
    var e = [];
    let i = 1;
    for (const s of t) {
      var r = this.CardMap.get(s);
      r && e.push(r.PlayStartTimeLocationTween(a, i * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY)), i++
    }
    await Promise.all(e)
  }
  async eou(a, t) {
    var e = [];
    let i = 1;
    for (const s of t) {
      var r = this.CardMap.get(s);
      r && e.push(r.PlayHandRecycleCardTween(a, i * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY)), this.CardMap.delete(s), i++
    }
    await Promise.all(e), this.Uc1()
  }
  async tou(a) {
    a = this.CardMap.get(a);
    a && await a.PlayResetPositionTween()
  }
  async uuu(a, t, e) {
    a = this.CardMap.get(a);
    a && await a.PlayHandToFunctionalTopTween(t, e)
  }
  CheckCardOutHandArea(a) {
    return this.TempCardPos.FromUeVector(a.GetWorldLocation()), this.ItemWorldTrans.InverseTransformPosition(this.TempCardPos, this.TempCardPos), this.TempCardPos.Y - a.HalfHeight > this.TotalHeight || this.TempCardPos.Y + a.HalfHeight < 0 || this.TempCardPos.X + a.HalfWidth < -this.TotalWidth / 2 || this.TempCardPos.X - a.HalfWidth > this.TotalWidth / 2
  }
  RegisterBattleArea(a) {
    this.Area = a
  }
  async DestroyCardByLibrary(a) {
    var t = this.CardMap.get(a);
    t && (this.CardMap.delete(a), await t.DissolveByLibrary(), this.Uc1())
  }
  HoistLayout() {
    this.IsLayoutHoist || (this.IsLayoutHoist = !0, this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("Up"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaHandCardsShowHideChange, !0))
  }
  LowerLayout() {
    this.IsLayoutHoist && (this.IsLayoutHoist = !1, this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("Down"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaHandCardsShowHideChange, !1))
  }
  SwitchLayoutHoist() {
    this.IsLayoutHoist ? this.LowerLayout() : this.HoistLayout()
  }
  GetCardProxy(a) {
    return this.CardMap.get(a)
  }
  GetCardProxyByIndex(t) {
    if (!(t < 0 || t >= this.CardMap.size)) {
      let a = 0;
      for (const e of this.CardMap.values()) {
        if (a === t) return e;
        a++
      }
    }
  }
  RefreshHandCardSequence() {
    for (const a of this.CardMap.values()) !a.IsInit || a.CheckCardOutHandArea() || a.PlayInHandSequence()
  }
  async StartTimeDrawCard(a) {
    await this.Zeu(), ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty(), await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME), await this.Ktu(a)
  }
  async EndTimeDiscardCard(a) {
    await this.Xtu(a);
    for (var [t, e] of this.CardMap) e.IsFourCost() || (e.Remove(), this.CardMap.delete(t))
  }
  async DiscardCard(a, t) {
    await this.Jru(a, t)
  }
  async AddCard(a, t) {
    await this.zru(t), await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME), await this.Zru(a, t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandAreaAddCard, t)
  }
  async RecycleCard(a, t) {
    await this.eou(a, t)
  }
  async ResetCardPosition(a) {
    await this.tou(a.Data.CardId)
  }
  async RemoveCard(a) {
    var t = this.CardMap.get(a.Data.CardId);
    t && (this.CardMap.delete(a.Data.CardId), await t.RemoveBySequence(), this.Uc1())
  }
  async FunctionalToHand(a) {
    await this.Bc1(a), this.Uc1(), await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME), await this.tou(a.Data.CardId)
  }
  async HandToRecycle(a, t) {
    await this.eou(a, [t.Data.CardId])
  }
  async HandCardToFunctionalTop(a, t, e) {
    await this.uuu(a.Data.CardId, t, e)
  }
  GetGuideUiItemAndUiItemForShowEx(a) {
    var t, e;
    if (a && !(a.length < 1)) return "HandCard" === (t = a[0]) ? a.length < 2 ? void 0 : (e = parseInt(a[1]), Array.from(this.CardMap.values())[e]?.GetGuideUiItemAndUiItemForShowEx(a)) : "HandArea" === t ? Array.from(this.CardMap.values())[0]?.GetGuideUiItemAndUiItemForShowEx(a) : void 0
  }
}
exports.PhantomArenaHandArea = PhantomArenaHandArea;
//# sourceMappingURL=PhantomArenaHandArea.js.map