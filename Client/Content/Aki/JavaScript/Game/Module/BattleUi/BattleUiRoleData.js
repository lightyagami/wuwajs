"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiRoleData = undefined;
const UE = require("ue");
const RoleBattleViewInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleBattleViewInfoById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class BattleUiRoleData {
  constructor() {
    this.IsCurEntity = false;
    this.EntityHandle = undefined;
    this.AttributeComponent = undefined;
    this.GameplayTagComponent = undefined;
    this.RoleElementComponent = undefined;
    this.BuffComponent = undefined;
    this.ShieldComponent = undefined;
    this.RoleQteComponent = undefined;
    this.CreatureDataComponent = undefined;
    this.BaseDeathComponent = undefined;
    this.ActorComp = undefined;
    this.ElementType = undefined;
    this.ElementConfig = undefined;
    this.ElementColor = undefined;
    this.ElementLinearColor = undefined;
    this.UltimateSkillColor = undefined;
    this.CreatureDataId = 0;
    this.CreatureRoleId = undefined;
    this.CreatureSkinId = undefined;
    this.RoleConfig = undefined;
    this.RoleBattleViewInfo = undefined;
    this.HeadIconEnergyBarConfig = undefined;
    this.QteCdTagId = 0;
    this.boa = undefined;
    this.SpecialStateMap = new Map();
    this.MorphShowSpecialEnergyBar = true;
    this.OnlyBattleInput = false;
    this.HasEnergyTag = false;
    this.CheckEnergyTag = false;
    this.i$e = [];
    this.o$e = (t, i, s) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiElementEnergyChanged, this.EntityHandle.Id);
    };
    this.Trc = (t, i, s) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiEnergyChanged, this.EntityHandle.Id);
    };
    this.Mld = (t, i) => {
      if (this.HasEnergyTag !== i) {
        this.HasEnergyTag = i;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiEnergyChanged, this.EntityHandle.Id);
      }
    };
    this.r$e = (t, i) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiElementHideTagChanged, this.EntityHandle.Id, t, i);
    };
    this.n$e = (t, i) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiDeadTagChanged, this.EntityHandle.Id, t, i);
    };
    this.s$e = (t, i) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiQteEnableTagChanged, this.EntityHandle.Id, t, i);
    };
    this.a$e = (t, i) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiQteCdTagChanged, this.EntityHandle.Id, t, i);
    };
    this.h$e = (t, i) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiUseQteTagChanged, this.EntityHandle.Id, t, i);
    };
    this.l$e = (t, i) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiConcertoEnableTagChanged, this.EntityHandle.Id, t, i);
    };
    this.wGa = (t, i) => {
      if (i) {
        ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(0);
      }
    };
    this.NQ_ = (t, i) => {
      if (i) {
        ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(5);
      }
    };
    this.vJ1 = (t, i) => {
      t = BattleUiRoleData.SpecialStateTagMap.get(t);
      if (t !== undefined && (this.SpecialStateMap.set(t, i), this.IsCurEntity)) {
        ModelManager_1.ModelManager.BattleUiModel.RefreshRoleSpecialState(t);
      }
    };
    this._$e = (t, i) => {
      if (this.IsCurEntity && t !== i) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAimStateChanged);
      }
    };
    this.u$e = t => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiShieldChanged, this.EntityHandle.Id);
    };
    this.qoa = () => {
      this.Goa();
    };
    this.hXe = (t, i, s) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiHealthChanged, this.EntityHandle.Id);
    };
    this.m2 = (t, i, s) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiLevelChanged, this.EntityHandle.Id);
    };
  }
  Init(t, i) {
    this.EntityHandle = t;
    this.IsCurEntity = i;
    this.AttributeComponent = t.Entity.GetComponent(174);
    this.GameplayTagComponent = t.Entity.GetComponent(206);
    this.RoleElementComponent = t.Entity.GetComponent(92);
    this.BuffComponent = t.Entity.GetComponent(175);
    this.ShieldComponent = t.Entity.GetComponent(75);
    this.RoleQteComponent = t.Entity.GetComponent(99);
    this.CreatureDataComponent = t.Entity.GetComponent(0);
    this.BaseDeathComponent = t.Entity.GetComponent(15);
    this.ActorComp = t.Entity.GetComponent(3);
    this.ElementType = this.AttributeComponent.GetCurrentValue(EAttributeId.Proto_ElementPropertyType);
    this.ElementConfig = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(this.ElementType);
    this.ElementColor = UE.Color.FromHex(this.ElementConfig.ElementColor);
    this.ElementLinearColor = new UE.LinearColor(this.ElementColor);
    this.UltimateSkillColor = UE.Color.FromHex(this.ElementConfig.UltimateSkillColor);
    this.CreatureRoleId = this.CreatureDataComponent?.GetRoleId();
    this.CreatureDataId = this.CreatureDataComponent?.GetCreatureDataId() ?? 0;
    this.CreatureSkinId = this.CreatureDataComponent?.GetSkinId();
    this.RoleConfig = this.CreatureDataComponent?.GetRoleConfig();
    if (this.RoleConfig) {
      if (this.RoleConfig.RoleType === 2) {
        this.RoleBattleViewInfo = RoleBattleViewInfoById_1.configRoleBattleViewInfoById.GetConfig(this.RoleConfig.Id);
      }
      this.HeadIconEnergyBarConfig = ModelManager_1.ModelManager.BattleUiModel?.GetHeadIconEnergyBarConfig(this.RoleConfig.Id);
    }
    if (this.ActorComp?.IsAutonomousProxy && this.CreatureRoleId === 1207) {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(6);
    }
    if (this.CreatureRoleId === 1608) {
      this.CheckEnergyTag = true;
      this.d$e(414280119, this.Mld, true);
    }
    this.c$e();
  }
  OnChangeRole(t) {
    this.IsCurEntity = t;
  }
  Clear() {
    this.m$e();
    if (this.ActorComp?.IsAutonomousProxy && this.CreatureRoleId === 1207) {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(6);
    }
    if (this.IsCurEntity) {
      this.SpecialStateMap.clear();
      ModelManager_1.ModelManager.BattleUiModel?.RefreshAllRoleSpecialState();
    }
    this.AttributeComponent = undefined;
    this.GameplayTagComponent = undefined;
    this.RoleElementComponent = undefined;
    this.BuffComponent = undefined;
    this.ShieldComponent = undefined;
    this.RoleQteComponent = undefined;
    this.CreatureDataComponent = undefined;
    this.BaseDeathComponent = undefined;
    this.ActorComp = undefined;
    this.ElementType = undefined;
    this.ElementConfig = undefined;
    this.ElementColor = undefined;
    this.ElementLinearColor = undefined;
    this.UltimateSkillColor = undefined;
    this.CreatureDataId = 0;
    this.CreatureRoleId = undefined;
    this.RoleConfig = undefined;
    this.RoleBattleViewInfo = undefined;
    this.HeadIconEnergyBarConfig = undefined;
    this.QteCdTagId = 0;
    this.CheckEnergyTag = false;
    this.HasEnergyTag = false;
  }
  c$e() {
    for (const i of BattleUiRoleData.HideElementTagList) {
      this.d$e(i, this.r$e);
    }
    this.d$e(1008164187, this.n$e);
    this.d$e(166024319, this.s$e);
    this.d$e(1674960297, this.h$e);
    this.d$e(-426018619, this.l$e);
    this.d$e(-640833006, this.wGa, true);
    this.d$e(913890514, this.NQ_, true);
    for (const s of BattleUiRoleData.SpecialStateTagMap.keys()) {
      this.d$e(s, this.vJ1, true);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, this._$e);
    EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharShieldChange, this.u$e);
    this.Goa();
    EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharQteTagRowNameChanged, this.qoa);
    var t = this.AttributeComponent;
    t.AddListener(EAttributeId.Proto_Life, this.hXe);
    t.AddListener(EAttributeId.l5n, this.hXe);
    t.AddListener(EAttributeId.Proto_Lv, this.m2);
    t.AddListener(EAttributeId.Proto_ElementEnergy, this.o$e);
    t.AddListener(EAttributeId.Proto_ElementEnergyMax, this.o$e);
    t.AddListener(EAttributeId.Proto_Energy, this.Trc);
    t.AddListener(EAttributeId.Proto_EnergyMax, this.Trc);
  }
  m$e() {
    for (const i of this.i$e) {
      i?.EndTask();
    }
    var t;
    this.i$e.length = 0;
    if (this.boa) {
      this.boa.EndTask();
      this.boa = undefined;
    }
    if (this.EntityHandle?.Valid) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, this._$e);
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharShieldChange, this.u$e);
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharQteTagRowNameChanged, this.qoa);
      (t = this.AttributeComponent).RemoveListener(EAttributeId.Proto_Life, this.hXe);
      t.RemoveListener(EAttributeId.l5n, this.hXe);
      t.RemoveListener(EAttributeId.Proto_Lv, this.m2);
      t.RemoveListener(EAttributeId.Proto_ElementEnergy, this.o$e);
      t.RemoveListener(EAttributeId.Proto_ElementEnergyMax, this.o$e);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 17, "BattelUi清理RoleData时，Entity不合法");
    }
  }
  d$e(t, i, s = false) {
    if (s && this.GameplayTagComponent?.HasTag(t)) {
      i(t, true);
    }
    s = this.GameplayTagComponent.ListenForTagAddOrRemove(t, i);
    if (s) {
      this.i$e.push(s);
    }
  }
  Goa() {
    var t = this.RoleQteComponent?.GetQteTagData()?.NoTag.TagId ?? 0;
    if (t !== this.QteCdTagId && (this.boa && (this.boa.EndTask(), this.boa = undefined), this.QteCdTagId = t, this.QteCdTagId)) {
      this.boa = this.GameplayTagComponent.ListenForTagAddOrRemove(t, this.a$e);
    }
  }
  GetTopButtonVisible() {
    return !this.RoleBattleViewInfo || this.RoleBattleViewInfo.TopButtonVisible;
  }
  GetElementAttributePercent() {
    var t;
    var i;
    if (!this.RoleElementComponent || (t = this.RoleElementComponent.RoleElementEnergy, (i = this.RoleElementComponent.RoleElementEnergyMax) <= 0)) {
      return 0;
    } else {
      return t / i;
    }
  }
  IsPhantom() {
    return this.RoleConfig?.RoleType === 2;
  }
  CanUseUltraSkill() {
    var t;
    var i;
    if (this.CheckEnergyTag) {
      return this.HasEnergyTag;
    } else {
      return !!(t = this.AttributeComponent) && (i = t.GetCurrentValue(EAttributeId.Proto_Energy), t.GetCurrentValue(EAttributeId.Proto_EnergyMax) <= i);
    }
  }
}
(exports.BattleUiRoleData = BattleUiRoleData).HideElementTagList = [-1623647531, 666997186, -1987078323, -1751370752, 1522720219, 33752370];
BattleUiRoleData.SpecialStateTagMap = new Map([[-1254507003, 0], [-1602588323, 1]]); //# sourceMappingURL=BattleUiRoleData.js.map