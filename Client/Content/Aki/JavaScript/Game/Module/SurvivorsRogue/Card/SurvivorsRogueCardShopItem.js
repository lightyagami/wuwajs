"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardShopItem = undefined;
const UE = require("ue");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const SurvivorsRogueLvNode_1 = require("../RogueFlow/View/Components/SurvivorsRogueLvNode");
const SurvivorsRogueCardBase_1 = require("./SurvivorsRogueCardBase");
const SurvivorsRogueCardDataFactory_1 = require("./SurvivorsRogueCardDataFactory");
const SEQ_LIGHT = "Start";
const SEQ_CLOSE = "Close";
class SurvivorsRogueCardShopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.pFd = undefined;
    this.CardItem = undefined;
    this.Pe = undefined;
    this.j8d = false;
    this.ZTd = undefined;
    this.ebd = [];
    this.OnPurchaseBtnClickCallback = undefined;
    this.OnClickLockCallback = undefined;
    this.OnStateChangeCallback = undefined;
    this.U0n = false;
    this.tbd = () => {
      if (this.HasImportantNode()) {
        this.vFd(true);
        this.q7d().then(() => {
          this.OnPurchaseBtnClickCallback?.(this.Pe);
        });
      } else {
        this.OnPurchaseBtnClickCallback?.(this.Pe);
      }
    };
    this.ahh = (t, e) => {
      this.OnClickLockCallback?.(this.Pe, e);
    };
    this.oFe = (t, e) => {
      this.OnStateChangeCallback?.(this.Pe, e === 1);
    };
    this._ui = (t, e) => {
      if (e !== 1) {
        this.obd(true, true);
      }
    };
    this.uui = (t, e) => {
      if (e !== 1) {
        this.obd(false, true);
      }
    };
    this.ibd = () => {
      return new SurvivorsRogueLvNode_1.SurvivorsRogueLvNode();
    };
    this.Wpu = (t, e) => {
      if (t === "None" && e === "PlayStart") {
        if (this.Pe && !this.Pe.Y5n) {
          this.SPe?.PlayOrReplaySequenceByName("Start");
        }
      }
    };
    this.iFi = () => {
      var t;
      if (this.Pe) {
        t = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetCurrencyCount() >= this.Pe.qN_;
        this.CardItem?.RefreshCost(this.Pe.qN_, false, !this.Pe.O2s);
        this.GetButton(1).SetSelfInteractive(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[1, this.tbd]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.pFd = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(8));
    this.CardItem = new SurvivorsRogueCardBase_1.SurvivorsRogueCardBase();
    t.push(this.CardItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.ZTd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.ibd);
    await Promise.all(t);
    this.CardItem.BindLockFunction(this.ahh);
    this.CardItem.BindOnStateChangeCallback(this.oFe);
    this.CardItem.BindOnHoverCallback(this._ui);
    this.CardItem.BindOnUnHoverCallback(this.uui);
    this.GetItem(8).SetUIActive(false);
    this.RefreshPurchased(true);
    this.RootActor.OnSequencePlayEvent.Bind(this.Wpu);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.iFi);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.iFi);
    this.RootActor.OnSequencePlayEvent.Unbind();
  }
  async RefreshAsync(t, e, i) {
    var s = (this.Pe = t).O2s;
    var r = t.fEd;
    let o = [];
    switch (r.R5n) {
      case "lEd":
        var h = r.lEd;
        var a = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(h.Q6n);
        var n = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleLv(r.v9n);
        var v = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a.TrialRoleId);
        var v = {
          Type: 2,
          Id: h.Q6n,
          Index: i,
          QualityId: n.Quality,
          TitleText: v.GetName(),
          DescId: n.Describe,
          UseToggle: true,
          IsLevelUp: !s,
          NeedLock: !s,
          LockState: t.Y5n,
          PropertyId: n.PropertyId,
          LvUpCount: s ? undefined : n.Level,
          Cost: s ? undefined : t.qN_,
          TagVisible: false
        };
        o = this.rbd(h.nEd.wJs, Array.from(a.EvolveIds.values()), h.nEd.F6n, n.Level);
        await this.CardItem.Apply(v);
        break;
      case "uEd":
        a = r.uEd;
        h = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(a.zys);
        n = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponLv(r.v9n);
        v = {
          Type: 1,
          Id: a.zys,
          Index: i,
          QualityId: n.Quality,
          TitleId: h.Name,
          DescId: n.Describe,
          UseToggle: true,
          IsLevelUp: !s,
          NeedLock: !s,
          LockState: t.Y5n,
          PropertyId: n.PropertyId,
          LvUpCount: n.Level,
          Cost: t.qN_,
          TagVisible: false
        };
        o = this.rbd(a.sEd.wJs, Array.from(h.EvolveIds.values()), a.sEd.F6n, n.Level);
        await this.CardItem.Apply(v);
        break;
      case "aEd":
        h = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralItem(r.v9n);
        h.Index = i;
        h.UseToggle = true;
        h.NeedLock = !s;
        h.LockState = t.Y5n;
        h.Cost = t.qN_;
        h.TagVisible = !s;
        this.ebd.length = 0;
        await this.CardItem.Apply(h);
    }
    if (!s) {
      this.GetItem(5).SetUIActive(false);
      this.j8d = o.length > 0;
      if (this.j8d) {
        await this.ZTd.RefreshByDataAsync(o);
      }
    }
    this.obd(e);
    this.iFi();
    this.RefreshPurchased(s);
  }
  rbd(t, i, s, r) {
    this.ebd.length = 0;
    if (t <= s) {
      return [];
    }
    var o = [];
    for (let e = 1; e <= t; e++) {
      let t = 0;
      if (e <= s) {
        t = 1;
      } else if (e <= s + r) {
        this.ebd.push(e);
      }
      var h = {
        Lv: e,
        IsImportant: i.includes(e),
        State: t
      };
      o.push(h);
    }
    return o.reverse();
  }
  RefreshPurchased(t) {
    this.GetItem(6).SetUIActive(t);
    this.GetItem(7).SetUIActive(t);
    this.GetButton(1).RootUIComp.SetUIActive(!t);
    this.GetItem(2).SetUIActive(!t && this.j8d);
    this.GetItem(8).SetUIActive(!t && this.j8d);
  }
  obd(e, i = false) {
    if (!i) {
      this.CardItem.SetSelected(e, false);
    }
    if (this.Pe.O2s) {
      this.GetItem(9).SetUIActive(false);
    } else {
      let t = false;
      for (const h of this.ebd) {
        var s = e ? 2 : 0;
        var r = this.ZTd.GetLayoutItemByKey(h);
        r?.RefreshState(s);
        if (r?.Data.IsImportant) {
          t = true;
        }
      }
      var o = this.ebd.at(-1);
      if (o !== undefined && (o = this.ZTd.GetItemByKey(o))) {
        this.GetItem(5).SetAnchorOffsetY(o.GetAnchorOffsetY());
      }
      this.GetItem(9).SetUIActive(!i && e && t);
      this.vFd(e);
    }
  }
  vFd(t) {
    if (t !== this.U0n) {
      this.U0n = t;
      this.pFd.StopPlayingSequence(false, true);
      this.GetItem(5).SetUIActive(true);
      this.pFd.PlayLevelSequenceByName(t ? SEQ_LIGHT : SEQ_CLOSE);
    }
  }
  HasImportantNode() {
    for (const t of this.ebd) {
      if (this.ZTd.GetLayoutItemByKey(t)?.Data.IsImportant) {
        return true;
      }
    }
    return false;
  }
  async q7d() {
    var t = [];
    for (const i of this.ebd) {
      var e = this.ZTd.GetLayoutItemByKey(i);
      if (e?.Data.IsImportant) {
        t.push(e.PlayImportantNodeAnim());
      }
    }
    await Promise.all(t);
  }
  OnSelected(t) {
    this.obd(true);
  }
  OnDeselected(t) {
    this.obd(false);
  }
  GetKey(t, e) {
    return t.fEd.w5n;
  }
}
exports.SurvivorsRogueCardShopItem = SurvivorsRogueCardShopItem;
//# sourceMappingURL=SurvivorsRogueCardShopItem.js.map