"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpponentFunctionArea = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  PhantomArenaAreaFunctionalItem_1 = require("../Area/Functional/PhantomArenaAreaFunctionalItem"),
  PhantomArenaAreaMonsterItem_1 = require("../Area/Functional/PhantomArenaAreaMonsterItem"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine"),
  OpponentFunctionalProxy_1 = require("./OpponentFunctionalProxy"),
  OpponentMonsterProxy_1 = require("./OpponentMonsterProxy");
class OpponentFunctionArea extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.ParentArea = void 0, this.CardProxyMap = new Map
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    await this.hi1()
  }
  async hi1() {
    var r = [this.GetItem(0), this.GetItem(1), this.GetItem(2), this.GetItem(3), this.GetItem(4), this.GetItem(5), this.GetItem(6)],
      e = r.length,
      n = [];
    for (let t = 0; t < PhantomArenaDefine_1.functionAreaTypeList.length && !(t >= e); t++) {
      var a, o = r[t];
      let e = void 0;
      0 === PhantomArenaDefine_1.functionAreaTypeList[t] ? (a = new PhantomArenaAreaMonsterItem_1.PhantomArenaAreaMonsterItem, n.push(a.CreateThenShowByActorAsync(o.GetOwner())), (e = new OpponentMonsterProxy_1.OpponentMonsterProxy(t, this)).SetAreaItem(a)) : (a = new PhantomArenaAreaFunctionalItem_1.PhantomArenaAreaFunctionalItem, n.push(a.CreateThenShowByActorAsync(o.GetOwner())), (e = new OpponentFunctionalProxy_1.OpponentFunctionalProxy(t, this)).SetAreaItem(a)), this.CardProxyMap.set(t, e), this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(e)
    }
    await Promise.all(n)
  }
  RegisterBattleArea(e) {
    this.ParentArea = e
  }
  async TrySettingCard(e, t) {
    t = this.CardProxyMap.get(t);
    t && await t.SetCard(e)
  }
  async TryEvolveCard(e, t) {
    t = this.CardProxyMap.get(t);
    t && await t.EvolveCard(e)
  }
  async TryUseCardSkill(e) {
    let t = void 0;
    for (const r of this.CardProxyMap.values())
      if (!r.IsMonster) {
        t = r;
        break
      } t && await t.UseCardSkill(e)
  }
  async TryChangeCard(e, t) {
    var r, n; - 1 === e || -1 === t ? Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "Npc交换卡牌索引不能为-1") : e === t ? Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "Npc交换卡牌索引不能一样") : (e = this.CardProxyMap.get(e), t = this.CardProxyMap.get(t), r = e.Card, n = t.Card, r || n ? await Promise.all([e.ChangeCard(n), t.ChangeCard(r)]) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "Npc交换卡牌不能都为空"))
  }
  async BackToRecycle(e) {
    e = this.CardProxyMap.get(e);
    e && await e.PlayBackToRecycleTween()
  }
  ShowAddBuffEffect(e, t) {
    for (const n of this.CardProxyMap.values()) {
      var r;
      n.Card && t.includes(n.Card.Data.FightId) && (r = n, 1 === e ? r.AreaItem.SetBuffUpActive(!0) : 2 === e && r.AreaItem.SetBuffDownActive(!0))
    }
  }
  async DestroyCardByIndex(e) {
    e = this.CardProxyMap.get(e);
    e && await e.DestroyCard()
  }
  RefreshBattleCard(e) {
    for (const t of this.CardProxyMap.values())
      if (t.Card && t.Card.Data.CardId === e) {
        t.Card.RefreshSelfAsync();
        break
      }
  }
  RefreshAllBattleCard() {
    for (const e of this.CardProxyMap.values()) e.Card && e.Card.RefreshSelfAsync()
  }
  GetCardProxyByCardId(e) {
    for (const t of this.CardProxyMap.values())
      if (t.Card && t.Card.Data.CardId === e) return t
  }
  GetCardProxyByIndex(e) {
    return this.CardProxyMap.get(e)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length < 3)) {
      var t = e[0];
      if ("BattleCard" === t) return r = parseInt(e[2]), this.CardProxyMap.get(r)?.Card?.GetGuideUiItemAndUiItemForShowEx(e);
      if ("BattleCardById" === t) {
        var r = Array.from(this.CardProxyMap.values()),
          n = parseInt(e[2]);
        for (const a of r)
          if (a.Card?.Data?.ConfigId === n) return a.Card.GetGuideUiItemAndUiItemForShowEx(e)
      }
    }
  }
}
exports.OpponentFunctionArea = OpponentFunctionArea;
//# sourceMappingURL=OpponentFunctionArea.js.map