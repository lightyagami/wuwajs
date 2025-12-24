"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaFunctionalArea = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaAreaFunctionalItem_1 = require("./PhantomArenaAreaFunctionalItem");
const PhantomArenaAreaFunctionalProxy_1 = require("./PhantomArenaAreaFunctionalProxy");
const PhantomArenaAreaMonsterItem_1 = require("./PhantomArenaAreaMonsterItem");
const PhantomArenaAreaMonsterProxy_1 = require("./PhantomArenaAreaMonsterProxy");
class PhantomArenaFunctionalArea extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ParentArea = undefined;
    this.CardProxyMap = new Map();
    this.Zo1 = -1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.Ri1();
  }
  async Ri1() {
    var e = [this.GetItem(0), this.GetItem(1), this.GetItem(2), this.GetItem(3), this.GetItem(4), this.GetItem(5), this.GetItem(6)];
    var a = e.length;
    var r = [];
    for (let t = 0; t < PhantomArenaDefine_1.functionAreaTypeList.length && !(t >= a); t++) {
      var i;
      var n;
      var s = e[t];
      var o = PhantomArenaDefine_1.functionAreaTypeList[t];
      if (o === 1) {
        i = new PhantomArenaAreaFunctionalItem_1.PhantomArenaAreaFunctionalItem();
        r.push(i.CreateThenShowByActorAsync(s.GetOwner()));
        (n = new PhantomArenaAreaFunctionalProxy_1.PhantomArenaAreaFunctionalProxy(t, this)).SetAreaItem(i);
        this.CardProxyMap.set(t, n);
        this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(n);
      } else if (o === 0) {
        i = new PhantomArenaAreaMonsterItem_1.PhantomArenaAreaMonsterItem();
        r.push(i.CreateThenShowByActorAsync(s.GetOwner()));
        (n = new PhantomArenaAreaMonsterProxy_1.PhantomArenaAreaMonsterProxy(t, this)).SetAreaItem(i);
        this.CardProxyMap.set(t, n);
        this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(n);
      }
    }
    await Promise.all(r);
  }
  SetAllCardProxyUseActiveState(t, e) {
    for (const a of this.CardProxyMap.values()) {
      if (t && a.CheckSettingCardCondition(e)) {
        a.SetCanUseStateActive(t);
      } else {
        a.SetCanUseStateActive(false);
      }
    }
  }
  CheckSettingCardPosition(t) {
    for (const e of this.CardProxyMap.values()) {
      if (e.CheckSettingCardCondition(t)) {
        return true;
      }
    }
    return false;
  }
  RegisterBattleArea(t) {
    this.ParentArea = t;
  }
  RefreshStateByDragCard(t) {
    let e = -1;
    let a = PhantomArenaDefine_1.DISTANCE_MAX;
    for (var [r, i] of this.CardProxyMap) {
      if (i.IsCanSettingCard(t) && i.Distance < a) {
        a = i.Distance;
        e = r;
      }
    }
    var n;
    if (this.Zo1 !== e) {
      if (this.Zo1 === -1 && e !== -1) {
        this.SetAllCardProxyUseActiveState(true, t);
      } else if (this.Zo1 !== -1 && e === -1) {
        this.SetAllCardProxyUseActiveState(false, t);
      }
      if (this.Zo1 !== -1 && (n = this.CardProxyMap.get(this.Zo1))) {
        n.SetHoverStateActive(false);
      }
      if (e !== -1 && (n = this.CardProxyMap.get(e))) {
        n.SetHoverStateActive(true);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "找到放置区的位置", ["LastProxyIndex", this.Zo1], ["CurrentProxyIndex", e]);
      }
      this.Zo1 = e;
    }
  }
  RefreshStateByGamepad(t, e) {
    let a = -1;
    const r = this.CardProxyMap.get(e);
    if (r && r.CheckSettingCardCondition(t)) {
      a = e;
    }
    if (this.Zo1 !== a) {
      if (this.Zo1 === -1 && a !== -1) {
        this.SetAllCardProxyUseActiveState(true, t);
      } else if (this.Zo1 !== -1 && a === -1) {
        this.SetAllCardProxyUseActiveState(false, t);
      }
      if (this.Zo1 !== -1 && (e = this.CardProxyMap.get(this.Zo1))) {
        e.SetHoverStateActive(false);
      }
      if (a !== -1) {
        const r = this.CardProxyMap.get(a);
        if (r) {
          r.SetHoverStateActive(true);
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "找到放置区的位置", ["LastProxyIndex", this.Zo1], ["CurrentProxyIndex", a]);
      }
      this.Zo1 = a;
    }
  }
  ResetLastProxyIndexByGamepad() {
    this.Zo1 = -1;
  }
  CheckGuideCondition(t) {
    var e;
    return !this.ParentArea.ViewProxy.GuideManager.InGuiding || !(e = this.GetNearlyAreaItemProxyByCard(t)) || e.CheckGuideCondition(t);
  }
  async TrySettingCard(t, e, a) {
    this.SetAllCardProxyUseActiveState(false, t);
    if (this.Zo1 === -1) {
      return false;
    }
    var r = this.CardProxyMap.get(this.Zo1);
    if (a) {
      if (!(await r.HandleCardSetting(t))) {
        r.SetHoverStateActive(false);
        return false;
      }
    } else {
      await r.SetCard(t);
    }
    r.SetHoverStateActive(false);
    t.PlaySequenceWithoutStop("PutDownHandtoTable");
    if (e !== this.Zo1) {
      t.PlaySpineAnimAndEffect("start", false);
    }
    this.Zo1 = -1;
    return true;
  }
  GetNearlyAreaItemProxyByCard(t) {
    let e = PhantomArenaDefine_1.DISTANCE_MAX;
    let a = undefined;
    for (const r of this.CardProxyMap.values()) {
      if (r.IsCardNearlyAreaItem(t) && r.Distance < e) {
        e = r.Distance;
        a = r;
      }
    }
    return a;
  }
  async TryChangeCard(t, e) {
    if (this.Zo1 === -1 || e === -1) {
      return false;
    }
    if (this.Zo1 === e) {
      await this.TrySettingCard(t, e, false);
      return true;
    }
    var a = this.CardProxyMap.get(this.Zo1);
    if (this.ParentArea.ViewProxy.GuideManager.InGuiding) {
      this.ParentArea.ViewProxy.GuideManager.ShowGuideTips();
      a?.SetHoverStateActive(false);
      this.SetAllCardProxyUseActiveState(false, t);
      return false;
    }
    if (PhantomArenaDefine_1.functionAreaTypeList[this.Zo1] === 1) {
      const r = await this.TrySettingCard(t, e, true);
      if (r) {
        const i = this.CardProxyMap.get(e);
        await i.SetCard(undefined);
      }
      return r;
    }
    if (!ModelManager_1.ModelManager.PhantomArenaBattleModel.CanSetSlotIndex(this.Zo1)) {
      return false;
    }
    const r = await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSlotInstead(e, this.Zo1);
    if (!r) {
      this.SetAllCardProxyUseActiveState(false, t);
      a?.SetHoverStateActive(false);
      return false;
    }
    const i = this.CardProxyMap.get(e);
    var n;
    var a = a?.Card;
    if (a) {
      if (n = await this.TrySettingCard(t, e, false)) {
        await i.ChangeCard(a);
      }
      return n;
    } else {
      await i.SetCard(undefined);
      return this.TrySettingCard(t, e, false);
    }
  }
  RemoveCard(t) {
    t = this.CardProxyMap.get(t);
    if (t) {
      t.SetCard(undefined);
    }
  }
  ResetCardSelectState(t) {
    t = this.CardProxyMap.get(t);
    if (t) {
      t.ResetCardSelectState();
    }
  }
  FinishBuffEffect(t) {
    t = this.CardProxyMap.get(t);
    if (t) {
      t.SetCard(undefined);
    }
  }
  ShowAddBuffEffect(t, e) {
    for (const r of this.CardProxyMap.values()) {
      var a;
      if (r.Card && e.includes(r.Card.Data.FightId)) {
        a = r;
        if (t === 1) {
          a.AreaItem.SetBuffUpActive(true);
        } else if (t === 2) {
          a.AreaItem.SetBuffDownActive(true);
        }
      }
    }
  }
  RefreshBattleCard(t) {
    for (const e of this.CardProxyMap.values()) {
      if (e.Card && e.Card.Data.CardId === t) {
        e.Card.RefreshSelfAsync();
        break;
      }
    }
  }
  RefreshAllBattleCard() {
    for (const t of this.CardProxyMap.values()) {
      if (t.Card) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "RefreshAllBattleCard", ["CardId", t.Card.Data.CardId]);
        }
        t.Card.RefreshSelfAsync();
      }
    }
  }
  GetCardProxyByCardId(t) {
    for (const e of this.CardProxyMap.values()) {
      if (e.Card && e.Card.Data.CardId === t) {
        return e;
      }
    }
  }
  async DestroyCardByLibrary(t) {
    t = this.CardProxyMap.get(t);
    if (t) {
      await t.DissolveByLibrary();
    }
  }
  async ResetCardPosition(t) {
    t = this.CardProxyMap.get(t);
    if (t) {
      await t.PlayResetPositionTween();
    }
  }
  async RemoveCardToLibrary(t) {
    t = this.CardProxyMap.get(t);
    if (t) {
      await t.PlayCardToLibraryTween();
    }
  }
  async ResetFunctionalToMonster(t, e, a) {
    a = this.CardProxyMap.get(a);
    if (a) {
      await a.SetCard(undefined);
    }
    a = this.CardProxyMap.get(e);
    if (a) {
      await a.ChangeCard(t);
    }
  }
  async FunctionalCardToFunctionalTop(t, e, a) {
    t = this.CardProxyMap.get(t.Data.Index);
    if (t) {
      e = this.CardProxyMap.get(e).AreaItem.GetRootItem();
      await t.PlayFunctionalCardToFunctionalTopTween(e, a);
    }
  }
  async CopyCardListToFight(t) {
    var e = [];
    for (const i of t) {
      var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleCardByCardId(i.kg1);
      var r = this.CardProxyMap.get(a.Index);
      e.push(r.CopyCard(a));
    }
    await Promise.all(e);
  }
  async PlayDamageHitEffect(t, e) {
    t = this.GetCardProxyByCardId(t);
    if (t) {
      await t.Card?.PlayHitEffect(e);
    }
  }
  async FunctionalToRecycle(t) {
    t = this.CardProxyMap.get(t.Data.Index);
    if (t) {
      await t.PlayFunctionalCardToRecycleTween();
    }
  }
  GetCardProxyByIndex(t) {
    return this.CardProxyMap.get(t);
  }
  async RefreshEffect(t, e) {
    t = this.GetCardProxyByCardId(t);
    if (t) {
      await t.Card?.RefreshEffect(e);
    }
  }
  async ReconstructFightCardToRecycle(t) {
    var e = [];
    for (const r of t) {
      var a = this.GetCardProxyByCardId(r);
      if (a) {
        this.ParentArea.ViewProxy.CancelSelectedCard();
        e.push(a.PlayFunctionalCardToRecycleTween());
      }
    }
    await Promise.all(e);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length < 3)) {
      var e = t[0];
      if (e === "BattleCard") {
        a = parseInt(t[2]);
        return this.CardProxyMap.get(a)?.Card?.GetGuideUiItemAndUiItemForShowEx(t);
      }
      if (e === "BattleCardById" || e === "BattleCardSkillById") {
        var a = Array.from(this.CardProxyMap.values());
        var r = parseInt(t[2]);
        for (const i of a) {
          if (i.Card?.Data?.ConfigId === r) {
            return i.Card.GetGuideUiItemAndUiItemForShowEx(t);
          }
        }
      }
    }
  }
}
exports.PhantomArenaFunctionalArea = PhantomArenaFunctionalArea;
//# sourceMappingURL=PhantomArenaFunctionalArea.js.map