"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaFunctionalArea = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
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
    var r = e.length;
    var a = [];
    for (let t = 0; t < PhantomArenaDefine_1.functionAreaTypeList.length && !(t >= r); t++) {
      var i;
      var n;
      var s = e[t];
      var o = PhantomArenaDefine_1.functionAreaTypeList[t];
      if (o === 1) {
        i = new PhantomArenaAreaFunctionalItem_1.PhantomArenaAreaFunctionalItem();
        a.push(i.CreateThenShowByActorAsync(s.GetOwner()));
        (n = new PhantomArenaAreaFunctionalProxy_1.PhantomArenaAreaFunctionalProxy(t, this)).SetAreaItem(i);
        this.CardProxyMap.set(t, n);
        this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(n);
      } else if (o === 0) {
        i = new PhantomArenaAreaMonsterItem_1.PhantomArenaAreaMonsterItem();
        a.push(i.CreateThenShowByActorAsync(s.GetOwner()));
        (n = new PhantomArenaAreaMonsterProxy_1.PhantomArenaAreaMonsterProxy(t, this)).SetAreaItem(i);
        this.CardProxyMap.set(t, n);
        this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(n);
      }
    }
    await Promise.all(a);
  }
  SetAllCardProxyUseActiveState(t, e) {
    for (const r of this.CardProxyMap.values()) {
      if (t && r.CheckSettingCardCondition(e)) {
        r.SetCanUseStateActive(t);
      } else {
        r.SetCanUseStateActive(false);
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
    let r = PhantomArenaDefine_1.DISTANCE_MAX;
    for (var [a, i] of this.CardProxyMap) {
      if (i.IsCanSettingCard(t) && i.Distance < r) {
        r = i.Distance;
        e = a;
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
    let r = -1;
    const a = this.CardProxyMap.get(e);
    if (a && a.CheckSettingCardCondition(t)) {
      r = e;
    }
    if (this.Zo1 !== r) {
      if (this.Zo1 === -1 && r !== -1) {
        this.SetAllCardProxyUseActiveState(true, t);
      } else if (this.Zo1 !== -1 && r === -1) {
        this.SetAllCardProxyUseActiveState(false, t);
      }
      if (this.Zo1 !== -1 && (e = this.CardProxyMap.get(this.Zo1))) {
        e.SetHoverStateActive(false);
      }
      if (r !== -1) {
        const a = this.CardProxyMap.get(r);
        if (a) {
          a.SetHoverStateActive(true);
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "找到放置区的位置", ["LastProxyIndex", this.Zo1], ["CurrentProxyIndex", r]);
      }
      this.Zo1 = r;
    }
  }
  ResetLastProxyIndexByGamepad() {
    this.Zo1 = -1;
  }
  CheckGuideCondition(t) {
    var e;
    return !this.ParentArea.ViewProxy.GuideManager.InGuiding || !(e = this.GetNearlyAreaItemProxyByCard(t)) || e.CheckGuideCondition(t);
  }
  async TrySettingCard(t, e, r) {
    this.SetAllCardProxyUseActiveState(false, t);
    if (this.Zo1 === -1) {
      return false;
    }
    var a = this.CardProxyMap.get(this.Zo1);
    if (r) {
      if (!(await a.HandleCardSetting(t))) {
        a.SetHoverStateActive(false);
        return false;
      }
    } else {
      await a.SetCard(t);
    }
    a.SetHoverStateActive(false);
    t.PlaySequenceWithoutStop("PutDownHandtoTable");
    if (e !== this.Zo1) {
      t.PlaySpineAnimAndEffect("start", false);
    }
    this.Zo1 = -1;
    return true;
  }
  GetNearlyAreaItemProxyByCard(t) {
    let e = PhantomArenaDefine_1.DISTANCE_MAX;
    let r = undefined;
    for (const a of this.CardProxyMap.values()) {
      if (a.IsCardNearlyAreaItem(t) && a.Distance < e) {
        e = a.Distance;
        r = a;
      }
    }
    return r;
  }
  async TryChangeCard(t, e) {
    if (this.Zo1 === -1 || e === -1) {
      return false;
    }
    if (this.Zo1 === e) {
      await this.TrySettingCard(t, e, false);
      return true;
    }
    var r = this.CardProxyMap.get(this.Zo1);
    if (this.ParentArea.ViewProxy.GuideManager.InGuiding) {
      this.ParentArea.ViewProxy.GuideManager.ShowGuideTips();
      r?.SetHoverStateActive(false);
      this.SetAllCardProxyUseActiveState(false, t);
      return false;
    }
    if (PhantomArenaDefine_1.functionAreaTypeList[this.Zo1] === 1) {
      const a = await this.TrySettingCard(t, e, true);
      if (a) {
        const i = this.CardProxyMap.get(e);
        await i.SetCard(undefined);
      }
      return a;
    }
    const a = await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSlotInstead(e, this.Zo1);
    if (!a) {
      this.SetAllCardProxyUseActiveState(false, t);
      r?.SetHoverStateActive(false);
      return false;
    }
    const i = this.CardProxyMap.get(e);
    var n;
    var r = r?.Card;
    if (r) {
      if (n = await this.TrySettingCard(t, e, false)) {
        await i.ChangeCard(r);
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
    for (const a of this.CardProxyMap.values()) {
      var r;
      if (a.Card && e.includes(a.Card.Data.FightId)) {
        r = a;
        if (t === 1) {
          r.AreaItem.SetBuffUpActive(true);
        } else if (t === 2) {
          r.AreaItem.SetBuffDownActive(true);
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
  DestroyCardByLibrary(t) {
    t = this.CardProxyMap.get(t);
    if (t) {
      t.DissolveByLibrary();
    }
  }
  async ResetCardPosition(t) {
    t = this.CardProxyMap.get(t);
    if (t) {
      await t.PlayResetPositionTween();
    }
  }
  async ResetFunctionalToMonster(t, e, r) {
    r = this.CardProxyMap.get(r);
    if (r) {
      await r.SetCard(undefined);
    }
    r = this.CardProxyMap.get(e);
    if (r) {
      await r.ChangeCard(t);
    }
  }
  async FunctionalCardToFunctionalTop(t, e, r) {
    t = this.CardProxyMap.get(t.Data.Index);
    if (t) {
      e = this.CardProxyMap.get(e).AreaItem.GetRootItem();
      await t.PlayFunctionalCardToFunctionalTopTween(e, r);
    }
  }
  async FunctionalToRecycle(t, e) {
    e = this.CardProxyMap.get(e.Data.Index);
    if (e) {
      await e.PlayFunctionalCardToRecycleTween(t);
    }
  }
  GetCardProxyByIndex(t) {
    return this.CardProxyMap.get(t);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length < 3)) {
      var e = t[0];
      if (e === "BattleCard") {
        r = parseInt(t[2]);
        return this.CardProxyMap.get(r)?.Card?.GetGuideUiItemAndUiItemForShowEx(t);
      }
      if (e === "BattleCardById") {
        var r = Array.from(this.CardProxyMap.values());
        var a = parseInt(t[2]);
        for (const i of r) {
          if (i.Card?.Data?.ConfigId === a) {
            return i.Card.GetGuideUiItemAndUiItemForShowEx(t);
          }
        }
      }
    }
  }
}
exports.PhantomArenaFunctionalArea = PhantomArenaFunctionalArea;
//# sourceMappingURL=PhantomArenaFunctionalArea.js.map