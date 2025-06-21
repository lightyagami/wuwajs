"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FormationPanel = void 0;
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SceneTeamDefine_1 = require("../../../SceneTeam/SceneTeamDefine"),
  FormationItem_1 = require("../FormationItem"),
  GuestItem_1 = require("../GuestItem"),
  FormationHeadIconEnergyBar_1 = require("../HeadIconEnergyBar/FormationHeadIconEnergyBar"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
  GUEST_RESOURCE_ID = "FightRoleHeadGuest";
class FormationPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments), this.Gze = [], this.Nze = !1, this.Oze = !1, this.kze = 0, this.Fze = [], this.Tn1 = new FormationHeadIconEnergyBar_1.FormationHeadIconEnergyBar, this.Vze = (t, e) => {
      this.Fze.push([t, e])
    }, this.Hze = () => {
      if (!(this.Fze.length <= 0)) {
        FormationPanel.kQe.Start();
        var t = this.GetOperationType();
        for (const e of this.Fze) 2 === t ? this.jze(e[0], e[1]) : 1 === t && this.Wze(e[0], e[1]);
        for (const i of this.Gze) i.RefreshQteActive();
        this.Fze.length = 0, FormationPanel.kQe.Stop()
      }
    }, this.mWe = () => {
      this.Kze(), this.jmc(), this.Fze.length = 0
    }, this.Xze = (t, e) => {
      e = this.$ze(e);
      e && e.ActivateConcertoChangeEffect(0, 0)
    }, this.Yze = t => {
      t = this.$ze(t.Id);
      t && t.CureRole()
    }, this.Jze = t => {
      t = this.$ze(t);
      t && t.RefreshRoleHealthPercent()
    }, this.TQe = (t, e, i) => {
      t = this.Zze(t);
      t && t.LevelUp(i)
    }, this.zpe = (t, e) => {
      var i = this.$ze(e.Id);
      i && i.ClearData(), this.Tn1.RemoveEntity(e.Id)
    }, this.eZe = () => {
      for (const t of this.Gze) t.RefreshRoleName()
    }, this.tZe = () => {
      for (const t of this.Gze) t && t.RefreshRoleHealthPercent()
    }, this.mJe = t => {
      for (const e of this.Gze) {
        if (!e) return;
        e.RefreshConcertoResponseModule(t)
      }
    }, this.iZe = () => {
      for (const t of this.Gze) t.RefreshRoleName()
    }, this.oZe = (t, e) => {
      for (const i of this.Gze) i && i.PlayerId === t && i.RefreshPlayerPingState(e)
    }, this.rZe = (t, e) => {
      for (const i of this.Gze) !i || i.IsMyRole || i.RefreshOnlineItem()
    }, this.XBo = () => {
      this.SetVisible(5, Info_1.Info.IsInGamepad() === this.Oze)
    }, this.Gmc = void 0, this.Fmc = 0, this.Nmc = !1, this.Vmc = !1, this.jmc = () => {
      var t;
      this.Vmc ? this.Nmc = !0 : (t = ModelManager_1.ModelManager.BattleUiModel.GuestId, this.Vmc = !0, (t ? this.Hmc(t) : this.$mc()).finally(this.Wmc))
    }, this.Wmc = () => {
      this.Vmc = !1, this.Nmc && (this.Nmc = !1, this.jmc())
    }
  }
  async InitializeAsync() {
    await this.Kze(), this.SetVisible(5, Info_1.Info.IsInGamepad() === this.Oze)
  }
  SetIsGamepad() {
    this.Oze = !0, this.SetVisible(5, Info_1.Info.IsInGamepad() === this.Oze)
  }
  Reset() {
    for (const t of this.Gze) t.ResetItem();
    this.Gze.length = 0, this.Gmc?.Destroy(), this.Gmc = void 0, this.Tn1.Destroy(), super.Reset()
  }
  OnRegisterComponent() {
    var t = this.GetOperationType();
    2 === t ? (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem]
    ], Info_1.Info.IsInGamepad() && this.ComponentRegisterInfos.push([4, UE.UIVerticalLayout])) : 1 === t && (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout]
    ])
  }
  OnTickBattleChildViewPanel(t) {
    if (this.Visible) {
      FormationPanel.vJe.Start();
      for (const e of this.Gze) e.OnTick(t);
      this.Tn1.Tick(t), FormationPanel.vJe.Stop()
    }
  }
  OnShowBattleChildViewPanel() {
    for (const t of this.Gze) t.RefreshCoolDownOnShow();
    this.jmc()
  }
  async nZe(t, e) {
    t = await this.NewStaticChildViewAsync(t, FormationItem_1.FormationItem, e);
    t.SetActive(!1), this.Gze.push(t), this.Tn1.InitParentItem(e, t.GetExtraContainer())
  }
  async Kze() {
    if (!this.Nze) {
      if (this.Nze = !0, await this.sZe(), 3 !== ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType) {
        this.kze = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id;
        var i = 2 === this.GetOperationType(),
          s = ModelManager_1.ModelManager.FunctionModel.IsOpen(10036);
        let e = 0;
        for (let t = 1; t <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; t++) {
          var n, h, o, a, r, _, v = this.Gze[e];
          v && (e++, v.RefreshConcertoResponseModule(s), (n = ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetItemData(t)) ? (h = n.RoleId, o = n.PlayerId, a = n.RoleSkinId, (r = ModelManager_1.ModelManager.CreatureModel.GetEntity(n.CreatureDataId))?.IsInit ? (_ = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(r.Id), i ? (v.Refresh(o, h, a, _), this.Tn1.InitData(t, n, _, e - 1), v.RefreshSelectedRole()) : this.kze === r.Id ? (e--, this.Tn1.InitData(t, n, _, 0)) : (v.Refresh(o, h, a, _), this.Tn1.InitData(t, n, _, e - 1))) : v.Refresh(o, h, a, void 0)) : v.ResetItem())
        }
      }
      this.Nze = !1
    }
  }
  async sZe() {
    if (0 === this.Gze.length) switch (this.GetOperationType()) {
      case 2:
        var t = this.GetItem(0).GetOwner(),
          e = this.GetItem(1).GetOwner(),
          i = this.GetItem(2).GetOwner(),
          s = this.GetItem(3).GetOwner();
        await Promise.all([this.nZe(t, 0), this.nZe(e, 1), this.nZe(i, 2), this.nZe(s, 3)]);
        break;
      case 1:
        t = this.GetItem(0).GetOwner(), e = this.GetItem(1).GetOwner(), i = this.GetItem(2).GetOwner();
        await Promise.all([this.nZe(t, 0), this.nZe(e, 1), this.nZe(i, 2)])
    }
  }
  Zze(t) {
    for (const e of this.Gze)
      if (e.RoleConfigId === t) return e
  }
  $ze(t) {
    for (const e of this.Gze)
      if (e.EntityId === t) return e
  }
  GetFormationItemList() {
    return this.Gze
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.Vze), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.Hze), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.mWe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharExecuteMultiQte, this.Xze), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FormationPanelUIShowRoleHeal, this.Yze), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.Jze), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFormationPlayLevelUp, this.TQe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleRefreshName, this.eZe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshRoleHp, this.tZe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnConcertoResponseOpen, this.mJe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.iZe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshPlayerPing, this.oZe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnOtherChangeRole, this.rZe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGuest, this.jmc)
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.Vze), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.Hze), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.mWe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharExecuteMultiQte, this.Xze), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FormationPanelUIShowRoleHeal, this.Yze), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.Jze), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFormationPlayLevelUp, this.TQe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleRefreshName, this.eZe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshRoleHp, this.tZe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnConcertoResponseOpen, this.mJe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.iZe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshPlayerPing, this.oZe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnOtherChangeRole, this.rZe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGuest, this.jmc)
  }
  jze(t, e) {
    var i = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t),
      s = this.$ze(this.kze),
      t = (this.Tn1.RefreshVisible(this.kze, !1, s?.PrefabIndex), this.kze = t, this.$ze(this.kze));
    s && s.RefreshSelectedRole(), t && (t.RefreshSelectedRole(), this.Tn1.RefreshVisible(this.kze, !0), s = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e)) && i && i.GameplayTagComponent.HasTag(-1732116741) && t.ActivateConcertoChangeEffect(i.ElementType, s.ElementType)
  }
  Wze(t, e) {
    var i, s, n = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e),
      h = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t);
    this.kze = t, this.kze && ((i = this.$ze(this.kze)) ? (n ? (s = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0, i.Refresh(s, n.CreatureRoleId ?? 0, n.CreatureSkinId ?? 0, n), this.Tn1.RefreshVisible(e, !1, i.PrefabIndex), this.Tn1.RefreshVisible(t, !0, i.PrefabIndex)) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 48, "角色上场时找不到下场角色数据"), i.ResetItem()), n && h && h.GameplayTagComponent.HasTag(-1732116741) && i.ActivateConcertoChangeEffect(h.ElementType, n.ElementType)) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 17, "角色上场时找不到之前的头像"))
  }
  RefreshOnDelayShow() {}
  RefreshFormationCooldownExternal(t, e, i, s) {
    for (const n of this.Gze) t !== n.PlayerId || e !== n.RoleConfigId && 0 !== e || n.RefreshCoolDownExternal(i, s)
  }
  ResetFormationCooldownExternal() {
    for (const t of this.Gze) t.RefreshCoolDownExternal()
  }
  async Hmc(t) {
    this.Fmc = t;
    let e = void 0;
    1 === this.GetOperationType() ? (e = this.GetVerticalLayout(3).GetRootComponent()).SetPivot(new UE.Vector2D(.5, 1)) : this.Oze ? (e = this.GetVerticalLayout(4).GetRootComponent(), 3 < ModelManager_1.ModelManager.BattleUiModel.FormationPanelData.PositionItemMap.size ? e.SetUIItemScale(new UE.Vector(.8, .8, 1)) : e.SetUIItemScale(new UE.Vector(1, 1, 1))) : e = this.GetRootItem(), this.Gmc ? this.Fmc !== t && await this.Gmc.SetGuest(t) : this.Gmc = await this.NewDynamicChildViewByResourceId(e, GUEST_RESOURCE_ID, GuestItem_1.GuestItem, !1, t)
  }
  async $mc() {
    0 !== this.Fmc && (this.Fmc = 0, 1 === this.GetOperationType() ? this.GetVerticalLayout(3).GetRootComponent().SetPivot(new UE.Vector2D(.5, .5)) : this.Oze && this.GetVerticalLayout(4).GetRootComponent().SetUIItemScale(new UE.Vector(1, 1, 1)), await this.Gmc.HideAsync(), await this.Gmc.DestroyAsync(), this.Gmc = void 0)
  }
  AddChildToRoleHeadPanel(t) {
    var e, i = this.GetOperationType();
    2 === i ? (Info_1.Info.IsInGamepad() ? (e = this.GetVerticalLayout(4), t.SetUIParent(e.RootUIComp)) : (e = this.GetRootItem(), t.SetUIParent(e)), t.SetAsLastHierarchy()) : 1 === i && (e = this.GetVerticalLayout(3), t.SetUIParent(e.RootUIComp), t.SetAsLastHierarchy())
  }
}(exports.FormationPanel = FormationPanel).vJe = Stats_1.Stat.Create("[BattleView]FormationPanelTick"), FormationPanel.kQe = Stats_1.Stat.Create("[ChangeRole]FormationPanel");
//# sourceMappingURL=FormationPanel.js.map