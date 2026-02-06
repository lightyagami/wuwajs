"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneTeamDefine_1 = require("../../../SceneTeam/SceneTeamDefine");
const FormationItem_1 = require("../FormationItem");
const GuestItem_1 = require("../GuestItem");
const FormationHeadIconEnergyBar_1 = require("../HeadIconEnergyBar/FormationHeadIconEnergyBar");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
const GUEST_RESOURCE_ID = "FightRoleHeadGuest";
class FormationPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.Gze = [];
    this.Nze = false;
    this.Oze = false;
    this.kze = 0;
    this.Fze = [];
    this.$n1 = new FormationHeadIconEnergyBar_1.FormationHeadIconEnergyBar();
    this.Vze = (t, e) => {
      this.Fze.push([t, e]);
    };
    this.Hze = () => {
      if (!(this.Fze.length <= 0)) {
        FormationPanel.kQe.Start();
        var t = this.GetOperationType();
        for (const e of this.Fze) {
          if (t === 2) {
            this.jze(e[0], e[1]);
          } else if (t === 1) {
            this.Wze(e[0], e[1]);
          }
        }
        for (const i of this.Gze) {
          i.RefreshQteActive();
        }
        this.Fze.length = 0;
        FormationPanel.kQe.Stop();
      }
    };
    this.mWe = () => {
      this.Kze();
      this.jmc();
      this.Fze.length = 0;
    };
    this.Xze = (t, e) => {
      e = this.$ze(e);
      if (e) {
        e.ActivateConcertoChangeEffect(0, 0);
      }
    };
    this.Yze = t => {
      t = this.$ze(t.Id);
      if (t) {
        t.CureRole();
      }
    };
    this.Jze = t => {
      t = this.$ze(t);
      if (t) {
        t.RefreshRoleHealthPercent();
      }
    };
    this.TQe = (t, e, i) => {
      t = this.Zze(t);
      if (t) {
        t.LevelUp(i);
      }
    };
    this.zpe = (t, e) => {
      var i = this.$ze(e.Id);
      if (i) {
        i.ClearData();
      }
      this.$n1.RemoveEntity(e.Id);
    };
    this.eZe = () => {
      for (const t of this.Gze) {
        t.RefreshRoleName();
      }
    };
    this.tZe = () => {
      for (const t of this.Gze) {
        if (t) {
          t.RefreshRoleHealthPercent();
        }
      }
    };
    this.mJe = t => {
      for (const e of this.Gze) {
        if (!e) {
          return;
        }
        e.RefreshConcertoResponseModule(t);
      }
    };
    this.iZe = () => {
      for (const t of this.Gze) {
        t.RefreshRoleName();
      }
    };
    this.oZe = (t, e) => {
      for (const i of this.Gze) {
        if (i && i.PlayerId === t) {
          i.RefreshPlayerPingState(e);
        }
      }
    };
    this.rZe = (t, e) => {
      for (const i of this.Gze) {
        if (!!i && !i.IsMyRole) {
          i.RefreshOnlineItem();
        }
      }
    };
    this.XBo = () => {
      this.SetVisible(5, Info_1.Info.IsInGamepad() === this.Oze);
    };
    this.Gmc = undefined;
    this.Fmc = 0;
    this.Nmc = false;
    this.Vmc = false;
    this.jmc = () => {
      var t;
      if (this.Vmc) {
        this.Nmc = true;
      } else {
        t = ModelManager_1.ModelManager.BattleUiModel.GuestId;
        this.Vmc = true;
        (t ? this.Hmc(t) : this.$mc()).finally(this.Wmc);
      }
    };
    this.Wmc = () => {
      this.Vmc = false;
      if (this.Nmc) {
        this.Nmc = false;
        this.jmc();
      }
    };
    this.Pqf = () => {
      this.RefreshKeyItemEnableInMotorcycle();
    };
    this.Wef = () => {
      this.RefreshKeyItemEnableInMotorcycle();
    };
  }
  async InitializeAsync() {
    await this.Kze();
    this.SetVisible(5, Info_1.Info.IsInGamepad() === this.Oze);
  }
  SetIsGamepad() {
    this.Oze = true;
    this.SetVisible(5, Info_1.Info.IsInGamepad() === this.Oze);
  }
  Reset() {
    for (const t of this.Gze) {
      t.ResetItem();
    }
    this.Gze.length = 0;
    this.Gmc?.Destroy();
    this.Gmc = undefined;
    this.$n1.Destroy();
    super.Reset();
  }
  OnRegisterComponent() {
    var t = this.GetOperationType();
    if (t === 2) {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
      if (Info_1.Info.IsInGamepad()) {
        this.ComponentRegisterInfos.push([4, UE.UIVerticalLayout]);
      }
    } else if (t === 1) {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIVerticalLayout]];
    }
  }
  OnTickBattleChildViewPanel(t) {
    if (this.Visible) {
      FormationPanel.vJe.Start();
      for (const e of this.Gze) {
        e.OnTick(t);
      }
      this.$n1.Tick(t);
      FormationPanel.vJe.Stop();
    }
  }
  OnShowBattleChildViewPanel() {
    for (const t of this.Gze) {
      t.RefreshCoolDownOnShow();
    }
    this.jmc();
  }
  async nZe(t, e) {
    t = await this.NewStaticChildViewAsync(t, FormationItem_1.FormationItem, e);
    t.SetActive(false);
    this.Gze.push(t);
    this.$n1.InitParentItem(e, t.GetExtraContainer());
  }
  async Kze() {
    if (!this.Nze) {
      this.Nze = true;
      await this.sZe();
      if (ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType !== 3) {
        this.kze = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id;
        var i = this.GetOperationType() === 2;
        var s = ModelManager_1.ModelManager.FunctionModel.IsOpen(10036);
        let e = 0;
        for (let t = 1; t <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; t++) {
          var n;
          var h;
          var o;
          var a;
          var r;
          var _;
          var v = this.Gze[e];
          if (v) {
            e++;
            v.RefreshConcertoResponseModule(s);
            if (n = ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetItemData(t)) {
              h = n.RoleId;
              o = n.PlayerId;
              a = n.RoleSkinId;
              if ((r = ModelManager_1.ModelManager.CreatureModel.GetEntity(n.CreatureDataId))?.IsInit) {
                _ = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(r.Id);
                if (i) {
                  v.Refresh(o, h, a, _);
                  this.$n1.InitData(t, n, _, e - 1);
                  v.RefreshSelectedRole();
                } else if (this.kze === r.Id) {
                  e--;
                  this.$n1.InitData(t, n, _, 0);
                } else {
                  v.Refresh(o, h, a, _);
                  this.$n1.InitData(t, n, _, e - 1);
                }
              } else {
                v.Refresh(o, h, a, undefined);
              }
            } else {
              v.ResetItem();
            }
          }
        }
      }
      this.Nze = false;
    }
  }
  async sZe() {
    if (this.Gze.length === 0) {
      switch (this.GetOperationType()) {
        case 2:
          var t = this.GetItem(0).GetOwner();
          var e = this.GetItem(1).GetOwner();
          var i = this.GetItem(2).GetOwner();
          var s = this.GetItem(3).GetOwner();
          await Promise.all([this.nZe(t, 0), this.nZe(e, 1), this.nZe(i, 2), this.nZe(s, 3)]);
          break;
        case 1:
          t = this.GetItem(0).GetOwner();
          e = this.GetItem(1).GetOwner();
          i = this.GetItem(2).GetOwner();
          await Promise.all([this.nZe(t, 0), this.nZe(e, 1), this.nZe(i, 2)]);
      }
    }
  }
  Zze(t) {
    for (const e of this.Gze) {
      if (e.RoleConfigId === t) {
        return e;
      }
    }
  }
  $ze(t) {
    for (const e of this.Gze) {
      if (e.EntityId === t) {
        return e;
      }
    }
  }
  GetFormationItemList() {
    return this.Gze;
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.Vze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.Hze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.mWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharExecuteMultiQte, this.Xze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FormationPanelUIShowRoleHeal, this.Yze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.Jze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFormationPlayLevelUp, this.TQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleRefreshName, this.eZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshRoleHp, this.tZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnConcertoResponseOpen, this.mJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.iZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshPlayerPing, this.oZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnOtherChangeRole, this.rZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGuest, this.jmc);
    if (this.GetOperationType() === 2) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.Pqf);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.Wef);
    }
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.Vze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.Hze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.mWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharExecuteMultiQte, this.Xze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FormationPanelUIShowRoleHeal, this.Yze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.Jze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFormationPlayLevelUp, this.TQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleRefreshName, this.eZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshRoleHp, this.tZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnConcertoResponseOpen, this.mJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.iZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshPlayerPing, this.oZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnOtherChangeRole, this.rZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGuest, this.jmc);
    if (this.GetOperationType() === 2) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.Pqf);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.Wef);
    }
  }
  jze(t, e) {
    var i = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t);
    var s = this.$ze(this.kze);
    this.$n1.RefreshVisible(this.kze, false, s?.PrefabIndex);
    this.kze = t;
    var t = this.$ze(this.kze);
    if (s) {
      s.RefreshSelectedRole();
    }
    if (t && (t.RefreshSelectedRole(), this.$n1.RefreshVisible(this.kze, true), s = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e)) && i && i.GameplayTagComponent.HasTag(-1732116741)) {
      t.ActivateConcertoChangeEffect(i.ElementType, s.ElementType);
    }
  }
  Wze(t, e) {
    var i;
    var s;
    var n = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e);
    var h = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t);
    this.kze = t;
    if (this.kze) {
      if (i = this.$ze(this.kze)) {
        if (n) {
          s = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
          i.Refresh(s, n.CreatureRoleId ?? 0, n.CreatureSkinId ?? 0, n);
          this.$n1.RefreshVisible(e, false, i.PrefabIndex);
          this.$n1.RefreshVisible(t, true, i.PrefabIndex);
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Battle", 48, "角色上场时找不到下场角色数据");
          }
          i.ResetItem();
        }
        if (n && h && h.GameplayTagComponent.HasTag(-1732116741)) {
          i.ActivateConcertoChangeEffect(h.ElementType, n.ElementType);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 17, "角色上场时找不到之前的头像");
      }
    }
  }
  RefreshOnDelayShow() {}
  RefreshFormationCooldownExternal(t, e, i, s) {
    for (const n of this.Gze) {
      if (t === n.PlayerId && (e === n.RoleConfigId || e === 0)) {
        n.RefreshCoolDownExternal(i, s);
      }
    }
  }
  ResetFormationCooldownExternal() {
    for (const t of this.Gze) {
      t.RefreshCoolDownExternal();
    }
  }
  async Hmc(t) {
    this.Fmc = t;
    let e = undefined;
    if (this.GetOperationType() === 1) {
      (e = this.GetVerticalLayout(3).GetRootComponent()).SetPivot(new UE.Vector2D(0.5, 1));
    } else if (this.Oze) {
      e = this.GetVerticalLayout(4).GetRootComponent();
      if (ModelManager_1.ModelManager.BattleUiModel.FormationPanelData.PositionItemMap.size > 3) {
        e.SetUIItemScale(new UE.Vector(0.8, 0.8, 1));
      } else {
        e.SetUIItemScale(new UE.Vector(1, 1, 1));
      }
    } else {
      e = this.GetRootItem();
    }
    if (this.Gmc) {
      if (this.Fmc !== t) {
        await this.Gmc.SetGuest(t);
      }
    } else {
      this.Gmc = await this.NewDynamicChildViewByResourceId(e, GUEST_RESOURCE_ID, GuestItem_1.GuestItem, false, t);
    }
  }
  async $mc() {
    if (this.Fmc !== 0) {
      this.Fmc = 0;
      if (this.GetOperationType() === 1) {
        this.GetVerticalLayout(3).GetRootComponent().SetPivot(new UE.Vector2D(0.5, 0.5));
      } else if (this.Oze) {
        this.GetVerticalLayout(4).GetRootComponent().SetUIItemScale(new UE.Vector(1, 1, 1));
      }
      await this.Gmc.HideAsync();
      await this.Gmc.DestroyAsync();
      this.Gmc = undefined;
    }
  }
  RefreshKeyItemEnableInMotorcycle() {
    if (Info_1.Info.IsInGamepad()) {
      if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData?.IsDriving) {
        var t = ModelManager_1.ModelManager.SkillButtonUiModel.GetGamepadDataByType(1);
        if (t?.GetIsPressCombineButton()) {
          for (const e of this.Gze) {
            e.SetInvisibleByKeyList(t.MusicSubKeyList);
          }
        } else {
          for (const i of this.Gze) {
            i.SetInvisibleByKeyList(undefined);
          }
        }
      } else {
        for (const s of this.Gze) {
          s.SetInvisibleByKeyList(undefined);
        }
      }
    }
  }
  AddChildToRoleHeadPanel(t) {
    var e;
    var i = this.GetOperationType();
    if (i === 2) {
      if (Info_1.Info.IsInGamepad()) {
        e = this.GetVerticalLayout(4);
        t.SetUIParent(e.RootUIComp);
      } else {
        e = this.GetRootItem();
        t.SetUIParent(e);
      }
      t.SetAsLastHierarchy();
    } else if (i === 1) {
      e = this.GetVerticalLayout(3);
      t.SetUIParent(e.RootUIComp);
      t.SetAsLastHierarchy();
    }
  }
}
(exports.FormationPanel = FormationPanel).vJe = Stats_1.Stat.Create("[BattleView]FormationPanelTick");
FormationPanel.kQe = Stats_1.Stat.Create("[ChangeRole]FormationPanel"); //# sourceMappingURL=FormationPanel.js.map