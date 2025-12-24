"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpponentFunctionArea = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
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
    var a = [this.GetItem(0), this.GetItem(1), this.GetItem(2), this.GetItem(3), this.GetItem(4), this.GetItem(5), this.GetItem(6)];
    var e = a.length;
    var r = [];
    for (let t = 0; t < PhantomArenaDefine_1.functionAreaTypeList.length && !(t >= e); t++) {
      var n;
      var o = a[t];
      let e = undefined;
      if (PhantomArenaDefine_1.functionAreaTypeList[t] === 0) {
        n = new PhantomArenaAreaMonsterItem_1.PhantomArenaAreaMonsterItem();
        r.push(n.CreateThenShowByActorAsync(o.GetOwner()));
        (e = new OpponentMonsterProxy_1.OpponentMonsterProxy(t, this)).SetAreaItem(n);
      } else {
        n = new PhantomArenaAreaFunctionalItem_1.PhantomArenaAreaFunctionalItem();
        r.push(n.CreateThenShowByActorAsync(o.GetOwner()));
        (e = new OpponentFunctionalProxy_1.OpponentFunctionalProxy(t, this)).SetAreaItem(n);
      }
      this.CardProxyMap.set(t, e);
      this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(e);
    }
    await Promise.all(r);
  }
  RegisterBattleArea(e) {
    this.ParentArea = e;
  }
  async TrySettingCard(e, t) {
    var a;
    var t = this.CardProxyMap.get(t);
    if (t) {
      a = this.ParentArea.HandArea.GetLayoutItem();
      await t.SetCard(e, a);
    }
  }
  async TrySettingCardFromLibrary(e, t) {
    var a;
    var t = this.CardProxyMap.get(t);
    if (t) {
      a = this.ParentArea.ViewProxy.GetOpponentCardLibraryItem();
      await t.SetCard(e, a);
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
    for (const a of this.CardProxyMap.values()) {
      if (!a.IsMonster) {
        t = a;
        break;
      }
    }
    if (t) {
      await t.UseCardSkill(e);
    }
  }
  async TryChangeCard(e, t) {
    var a;
    var r;
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
      a = e.Card;
      r = t.Card;
      if (a || r) {
        await Promise.all([e.ChangeCard(r), t.ChangeCard(a)]);
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
    for (const r of this.CardProxyMap.values()) {
      var a;
      if (r.Card && t.includes(r.Card.Data.FightId)) {
        a = r;
        if (e === 1) {
          a.AreaItem.SetBuffUpActive(true);
        } else if (e === 2) {
          a.AreaItem.SetBuffDownActive(true);
        }
      }
    }
  }
  async DestroyCardByIndex(e) {
    e = this.CardProxyMap.get(e);
    if (e) {
      await e.DissolveCard();
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
  async CopyCardListToFight(e) {
    var t = [];
    for (const r of e) {
      var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleCardByCardId(r.kg1);
      var a = this.CardProxyMap.get(a.Index);
      t.push(a.CopyCard(r.kg1));
    }
    await Promise.all(t);
  }
  async PlayDamageHitEffect(e, t) {
    e = this.GetCardProxyByCardId(e);
    if (e) {
      await e.Card?.PlayHitEffect(t);
    }
  }
  async ReconstructFightCardToRecycle(e) {
    var t = [];
    for (const r of e) {
      var a = this.GetCardProxyByCardId(r);
      if (a) {
        t.push(a.PlayBackToRecycleTween());
      }
    }
    await Promise.all(t);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length < 3)) {
      var t = e[0];
      if (t === "BattleCard") {
        a = parseInt(e[2]);
        return this.CardProxyMap.get(a)?.Card?.GetGuideUiItemAndUiItemForShowEx(e);
      }
      if (t === "BattleCardById" || t === "BattleCardSkillById") {
        var a = Array.from(this.CardProxyMap.values());
        var r = parseInt(e[2]);
        for (const n of a) {
          if (n.Card?.Data?.ConfigId === r) {
            return n.Card.GetGuideUiItemAndUiItemForShowEx(e);
          }
        }
      }
    }
  }
}
exports.OpponentFunctionArea = OpponentFunctionArea;
//# sourceMappingURL=OpponentFunctionArea.js.map