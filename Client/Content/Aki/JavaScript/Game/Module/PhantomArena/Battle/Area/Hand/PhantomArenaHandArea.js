"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaHandArea = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const PhantomArenaCard_1 = require("../../Card/PhantomArenaCard");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaHandAreaItem_1 = require("./PhantomArenaHandAreaItem");
const PhantomArenaHandCardProxy_1 = require("./PhantomArenaHandCardProxy");
class PhantomArenaHandArea extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CardMap = new Map();
    this.Area = undefined;
    this.Layout = undefined;
    this.ItemWorldTrans = Transform_1.Transform.Create();
    this.TempCardPos = Vector_1.Vector.Create();
    this.TotalWidth = 0;
    this.TotalHeight = 0;
    this.GridWidth = 0;
    this.OriginalSpace = 0;
    this.OriginalOffset = 0;
    this.Sequence = undefined;
    this.IsLayoutHoist = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Layout = this.GetHorizontalLayout(0);
    this.Layout.bUseOriginalChildrenOrder = true;
    this.OriginalSpace = this.Layout.GetSpacing();
    this.ItemWorldTrans.FromUeTransform(this.RootItem.K2_GetComponentToWorld());
    this.OriginalOffset = this.RootItem.GetAnchorOffsetY();
    this.TotalWidth = this.Layout.RootUIComp.GetWidth();
    this.TotalHeight = this.Layout.RootUIComp.GetHeight();
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  async UA_() {
    var a = new PhantomArenaHandAreaItem_1.PhantomArenaHandAreaItem();
    await a.CreateThenShowByResourceIdAsync("UiItem_HeadAreaItem", this.RootItem);
    return a;
  }
  iu1() {
    let a = this.OriginalSpace;
    var t = PhantomArenaDefine_1.HANDCARD_LIMIT * this.GridWidth + (PhantomArenaDefine_1.HANDCARD_LIMIT - 1) * this.OriginalSpace;
    if (this.CardMap.size > PhantomArenaDefine_1.HANDCARD_LIMIT) {
      t = t - this.CardMap.size * this.GridWidth;
      a = t / (this.CardMap.size - 1);
    }
    this.Layout.SetSpacing(a);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "[CalculateLayoutSpace]", ["Space", a]);
    }
  }
  async ru1(a) {
    var t = new PhantomArenaHandCardProxy_1.PhantomArenaHandCardProxy();
    this.CardMap.set(a, t);
    var e = await this.UA_();
    await e.PlayMoveInSequence();
    this.GridWidth = e.GetRootItem().GetWidth();
    var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(a);
    var i = new PhantomArenaCard_1.PhantomArenaCard();
    i.SetCardData(a);
    t.Init(i, e, this.Area);
    await i.CreateByResourceIdAsync("UiItem_SoundRemnantItem", e.GetRootItem());
    await i.RefreshSelfAsync();
  }
  async ou1(a) {
    var t = new PhantomArenaHandCardProxy_1.PhantomArenaHandCardProxy();
    this.CardMap.set(a.Data.CardId, t);
    var e = await this.UA_();
    t.Init(a, e, this.Area);
    await e.PlayMoveInSequence();
  }
  async yiu() {
    var a;
    var t;
    var e;
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardIdList();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "初始化手牌", ["Id", i]);
    }
    var r = [];
    for ([a, t] of this.CardMap) {
      const n = i.indexOf(a);
      if (n >= 0) {
        i.splice(n, 1);
        e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(a);
        r.push(t.RefreshCardData(e));
      } else {
        this.CardMap.delete(a);
        r.push(t.Clear());
      }
    }
    await Promise.all(r);
    var s = [];
    for (const o of i) {
      s.push(this.ru1(o));
    }
    await Promise.all(s);
    let n = 0;
    for (const h of this.CardMap.values()) {
      h.SetHierarchyIndex(n);
      n++;
    }
    this.iu1();
  }
  async chu(a) {
    var t = [];
    for (const e of a) {
      t.push(this.ru1(e));
    }
    await Promise.all(t);
    this.iu1();
  }
  async knu(a) {
    var t = [];
    let e = 1;
    for (const i of this.CardMap.values()) {
      if (!i.IsFourCost()) {
        t.push(i.PlayStartTimeLocationTween(a, e * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY));
        e++;
      }
    }
    await Promise.all(t);
  }
  async Onu(a) {
    var t = [];
    let e = 1;
    for (const i of this.CardMap.values()) {
      if (!i.IsFourCost()) {
        t.push(i.PlayEndTimeLocationTween(a, e * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY));
        e++;
      }
    }
    await Promise.all(t);
  }
  async dhu(a, t) {
    var e = [];
    let i = 1;
    var r = [];
    for (const o of t) {
      var s = this.CardMap.get(o);
      if (s) {
        r.push(s);
        this.CardMap.delete(o);
        e.push(s.PlayDiscardCardTween(a, i * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY));
      }
      i++;
    }
    await Promise.all(e);
    var n = [];
    for (const h of r) {
      n.push(h.RemoveBySequence());
    }
    await Promise.all(n);
    this.iu1();
  }
  async mhu(a, t) {
    var e = [];
    let i = 1;
    for (const s of t) {
      var r = this.CardMap.get(s);
      if (r) {
        e.push(r.PlayStartTimeLocationTween(a, i * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY));
      }
      i++;
    }
    await Promise.all(e);
  }
  async fhu(a, t) {
    var e = [];
    let i = 1;
    for (const s of t) {
      var r = this.CardMap.get(s);
      if (r) {
        e.push(r.PlayHandRecycleCardTween(a, i * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY));
      }
      this.CardMap.delete(s);
      i++;
    }
    await Promise.all(e);
    this.iu1();
  }
  async ghu(a) {
    a = this.CardMap.get(a);
    if (a) {
      await a.PlayResetPositionTween();
    }
  }
  async v7c(a, t, e) {
    a = this.CardMap.get(a);
    if (a) {
      await a.PlayHandToFunctionalTopTween(t, e);
    }
  }
  CheckCardOutHandArea(a) {
    this.TempCardPos.FromUeVector(a.GetWorldLocation());
    this.ItemWorldTrans.InverseTransformPosition(this.TempCardPos, this.TempCardPos);
    return this.TempCardPos.Y - a.HalfHeight > this.TotalHeight || this.TempCardPos.Y + a.HalfHeight < 0 || this.TempCardPos.X + a.HalfWidth < -this.TotalWidth / 2 || this.TempCardPos.X - a.HalfWidth > this.TotalWidth / 2;
  }
  RegisterBattleArea(a) {
    this.Area = a;
  }
  async DestroyCardByLibrary(a) {
    var t = this.CardMap.get(a);
    if (t) {
      this.CardMap.delete(a);
      await t.DissolveByLibrary();
      this.iu1();
    }
  }
  HoistLayout() {
    if (!this.IsLayoutHoist) {
      this.IsLayoutHoist = true;
      this.Sequence.StopPrevSequence(false, true);
      this.Sequence.PlaySequencePurely("Up");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaHandCardsShowHideChange, true);
    }
  }
  LowerLayout() {
    if (this.IsLayoutHoist) {
      this.IsLayoutHoist = false;
      this.Sequence.StopPrevSequence(false, true);
      this.Sequence.PlaySequencePurely("Down");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaHandCardsShowHideChange, false);
    }
  }
  SwitchLayoutHoist() {
    if (this.IsLayoutHoist) {
      this.LowerLayout();
    } else {
      this.HoistLayout();
    }
  }
  GetCardProxy(a) {
    return this.CardMap.get(a);
  }
  GetCardProxyByIndex(t) {
    if (!(t < 0) && !(t >= this.CardMap.size)) {
      let a = 0;
      for (const e of this.CardMap.values()) {
        if (a === t) {
          return e;
        }
        a++;
      }
    }
  }
  RefreshHandCardSequence() {
    for (const a of this.CardMap.values()) {
      if (!!a.IsInit && !a.CheckCardOutHandArea()) {
        a.PlayInHandSequence();
      }
    }
  }
  async StartTimeDrawCard(a) {
    await this.yiu();
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
    await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
    await this.knu(a);
  }
  async EndTimeDiscardCard(a) {
    await this.Onu(a);
    for (var [t, e] of this.CardMap) {
      if (!e.IsFourCost()) {
        e.Remove();
        this.CardMap.delete(t);
      }
    }
  }
  async DiscardCard(a, t) {
    await this.dhu(a, t);
  }
  async AddCard(a, t) {
    await this.chu(t);
    await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
    await this.mhu(a, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandAreaAddCard, t);
  }
  async RecycleCard(a, t) {
    await this.fhu(a, t);
  }
  async ResetCardPosition(a) {
    await this.ghu(a.Data.CardId);
  }
  async RemoveCard(a) {
    var t = this.CardMap.get(a.Data.CardId);
    if (t) {
      this.CardMap.delete(a.Data.CardId);
      await t.RemoveBySequence();
      this.iu1();
    }
  }
  async FunctionalToHand(a) {
    await this.ou1(a);
    this.iu1();
    await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
    await this.ghu(a.Data.CardId);
  }
  async HandToRecycle(a, t) {
    await this.fhu(a, [t.Data.CardId]);
  }
  async HandCardToFunctionalTop(a, t, e) {
    await this.v7c(a.Data.CardId, t, e);
  }
  GetGuideUiItemAndUiItemForShowEx(a) {
    var t;
    var e;
    if (a && !(a.length < 1)) {
      if ((t = a[0]) === "HandCard") {
        if (a.length < 2) {
          return undefined;
        } else {
          e = parseInt(a[1]);
          return Array.from(this.CardMap.values())[e]?.GetGuideUiItemAndUiItemForShowEx(a);
        }
      } else if (t === "HandArea") {
        return Array.from(this.CardMap.values())[0]?.GetGuideUiItemAndUiItemForShowEx(a);
      } else {
        return undefined;
      }
    }
  }
}
exports.PhantomArenaHandArea = PhantomArenaHandArea;
//# sourceMappingURL=PhantomArenaHandArea.js.map