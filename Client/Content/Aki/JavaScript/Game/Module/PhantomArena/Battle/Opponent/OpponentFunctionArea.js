"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpponentFunctionArea = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const PhantomArenaAreaFunctionalItem_1 = require("../Area/Functional/PhantomArenaAreaFunctionalItem");
const PhantomArenaAreaMonsterItem_1 = require("../Area/Functional/PhantomArenaAreaMonsterItem");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
const OpponentFunctionalProxy_1 = require("./OpponentFunctionalProxy");
const OpponentMonsterProxy_1 = require("./OpponentMonsterProxy");
class OpponentFunctionArea extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ParentArea = undefined;
    this.CardProxyMap = new Map();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.Ri1();
  }
  async Ri1() {
    var r = [this.GetItem(0), this.GetItem(1), this.GetItem(2), this.GetItem(3), this.GetItem(4), this.GetItem(5), this.GetItem(6)];
    var e = r.length;
    var n = [];
    for (let t = 0; t < PhantomArenaDefine_1.functionAreaTypeList.length && !(t >= e); t++) {
      var a;
      var o = r[t];
      let e = undefined;
      if (PhantomArenaDefine_1.functionAreaTypeList[t] === 0) {
        a = new PhantomArenaAreaMonsterItem_1.PhantomArenaAreaMonsterItem();
        n.push(a.CreateThenShowByActorAsync(o.GetOwner()));
        (e = new OpponentMonsterProxy_1.OpponentMonsterProxy(t, this)).SetAreaItem(a);
      } else {
        a = new PhantomArenaAreaFunctionalItem_1.PhantomArenaAreaFunctionalItem();
        n.push(a.CreateThenShowByActorAsync(o.GetOwner()));
        (e = new OpponentFunctionalProxy_1.OpponentFunctionalProxy(t, this)).SetAreaItem(a);
      }
      this.CardProxyMap.set(t, e);
      this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(e);
    }
    await Promise.all(n);
  }
  RegisterBattleArea(e) {
    this.ParentArea = e;
  }
  async TrySettingCard(e, t) {
    t = this.CardProxyMap.get(t);
    if (t) {
      await t.SetCard(e);
    }
  }
  async TryEvolveCard(e, t) {
    t = this.CardProxyMap.get(t);
    if (t) {
      await t.EvolveCard(e);
    }
  }
  async TryUseCardSkill(e) {
    let t = undefined;
    for (const r of this.CardProxyMap.values()) {
      if (!r.IsMonster) {
        t = r;
        break;
      }
    }
    if (t) {
      await t.UseCardSkill(e);
    }
  }
  async TryChangeCard(e, t) {
    var r;
    var n;
    if (e === -1 || t === -1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "Npc交换卡牌索引不能为-1");
      }
    } else if (e === t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "Npc交换卡牌索引不能一样");
      }
    } else {
      e = this.CardProxyMap.get(e);
      t = this.CardProxyMap.get(t);
      r = e.Card;
      n = t.Card;
      if (r || n) {
        await Promise.all([e.ChangeCard(n), t.ChangeCard(r)]);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "Npc交换卡牌不能都为空");
      }
    }
  }
  async BackToRecycle(e) {
    e = this.CardProxyMap.get(e);
    if (e) {
      await e.PlayBackToRecycleTween();
    }
  }
  ShowAddBuffEffect(e, t) {
    for (const n of this.CardProxyMap.values()) {
      var r;
      if (n.Card && t.includes(n.Card.Data.FightId)) {
        r = n;
        if (e === 1) {
          r.AreaItem.SetBuffUpActive(true);
        } else if (e === 2) {
          r.AreaItem.SetBuffDownActive(true);
        }
      }
    }
  }
  async DestroyCardByIndex(e) {
    e = this.CardProxyMap.get(e);
    if (e) {
      await e.DestroyCard();
    }
  }
  RefreshBattleCard(e) {
    for (const t of this.CardProxyMap.values()) {
      if (t.Card && t.Card.Data.CardId === e) {
        t.Card.RefreshSelfAsync();
        break;
      }
    }
  }
  RefreshAllBattleCard() {
    for (const e of this.CardProxyMap.values()) {
      if (e.Card) {
        e.Card.RefreshSelfAsync();
      }
    }
  }
  GetCardProxyByCardId(e) {
    for (const t of this.CardProxyMap.values()) {
      if (t.Card && t.Card.Data.CardId === e) {
        return t;
      }
    }
  }
  GetCardProxyByIndex(e) {
    return this.CardProxyMap.get(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length < 3)) {
      var t = e[0];
      if (t === "BattleCard") {
        r = parseInt(e[2]);
        return this.CardProxyMap.get(r)?.Card?.GetGuideUiItemAndUiItemForShowEx(e);
      }
      if (t === "BattleCardById") {
        var r = Array.from(this.CardProxyMap.values());
        var n = parseInt(e[2]);
        for (const a of r) {
          if (a.Card?.Data?.ConfigId === n) {
            return a.Card.GetGuideUiItemAndUiItemForShowEx(e);
          }
        }
      }
    }
  }
}
exports.OpponentFunctionArea = OpponentFunctionArea;
//# sourceMappingURL=OpponentFunctionArea.js.map