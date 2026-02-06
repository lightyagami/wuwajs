"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleModel = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const BasePropertyById_1 = require("../../../Core/Define/ConfigQuery/BasePropertyById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const SkillNodeDataInfo_1 = require("./RoleData/Module/DataInfo/SkillNodeDataInfo");
const RoleOnlineInstanceData_1 = require("./RoleData/RoleOnlineInstanceData");
const RoleRobotData_1 = require("./RoleData/RoleRobotData");
const RoleDefine_1 = require("./RoleDefine");
const RoleSkillResponseData_1 = require("./RoleSkill/RoleSkillResponseData");
const RoleInstance_1 = require("./View/ViewData/RoleInstance");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const Log_1 = require("../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const ResonantChainByGroupId_1 = require("../../../Core/Define/ConfigQuery/ResonantChainByGroupId");
const RolePropertyGrowthByLevelAndBreachLevel_1 = require("../../../Core/Define/ConfigQuery/RolePropertyGrowthByLevelAndBreachLevel");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const RoleSpecialRobotData_1 = require("./RoleData/RoleSpecialRobotData");
const RoleDevUtils_1 = require("./RoleDev/RoleDevUtils");
const RoleUtils_1 = require("./RoleUtils");
const RoleNewJoinAgent_1 = require("./View/AgentData/RoleNewJoinAgent");
const RolePreviewAgent_1 = require("./View/AgentData/RolePreviewAgent");
const RoleViewAgent_1 = require("./View/AgentData/RoleViewAgent");
class RoleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.dco = new Map();
    this.Cco = new Map();
    this.BOf = new Map();
    this.kOf = new Map();
    this.gco = new Set();
    this.P9l = new Set();
    this.fco = new Map();
    this.pco = false;
    this.vco = undefined;
    this.Mco = false;
    this.RoleTrialIdList = new Set();
    this.u9f = new Map();
    this.qOf = true;
    this.OOf = (t, r) => {
      let o = -1;
      let n = -1;
      var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true);
      for (let e = 0; e < i.length; e++) {
        var a = i[e];
        if (t === a.GetConfigId) {
          o = e;
        }
        if (r === a.GetConfigId) {
          n = e;
        }
      }
      var e = i[o] !== undefined;
      var l = i[n] !== undefined;
      if (e != l) {
        return (l ? 1 : 0) - (e ? 1 : 0);
      } else if (e) {
        return o - n;
      } else {
        l = this.GetRoleDataById(t);
        e = this.GetRoleDataById(r);
        return this.DefaultSortFunc(l, e);
      }
    };
    this.DefaultSortFunc = (e, t) => {
      var r = e.GetLevelData();
      var o = t.GetLevelData();
      if (r.GetLevel() !== o.GetLevel()) {
        return o.GetLevel() - r.GetLevel();
      } else if (e.GetRoleConfig().QualityId !== t.GetRoleConfig().QualityId) {
        return t.GetRoleConfig().QualityId - e.GetRoleConfig().QualityId;
      } else if (e.GetRoleConfig().Priority !== t.GetRoleConfig().Priority) {
        return t.GetRoleConfig().Priority - e.GetRoleConfig().Priority;
      } else {
        return -1;
      }
    };
    this.yco = undefined;
    this.Ico = [];
    this.zyn = false;
    this.xie = (e, t) => {
      if (t) {
        (t.Entity?.GetComponent(205)).RemoveTagAddOrRemoveListener(1733479717, this.Zyn);
      }
      if (e && ((t = e.Entity?.GetComponent(205)).AddTagAddOrRemoveListener(1733479717, this.Zyn), this.zyn !== t.HasTag(1733479717))) {
        this.zyn = !this.zyn;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterOrExitUltraSkill, this.zyn);
      }
    };
    this.Zyn = (e, t) => {
      if (e === 1733479717) {
        this.zyn = t;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterOrExitUltraSkill, t);
      }
    };
  }
  set IsInRoleTrial(e) {
    this.Mco = e;
    ModelManager_1.ModelManager.OnlineModel.DisableOnline(2, e);
  }
  get IsInRoleTrial() {
    return this.Mco;
  }
  SetCanUseSpecialTrialRole(e) {
    this.qOf = e;
  }
  CanUseSpecialTrialRole(e = undefined) {
    return !ModelManager_1.ModelManager.GameModeModel?.IsMulti && (!(e = e ?? ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.Id) || !!this.IsDungeonCanUseSpecialTrialRole(e)) && this.qOf;
  }
  IsDungeonCanUseSpecialTrialRole(e) {
    var t;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return !!e && !!(t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("NewTrialRoleEnableInsSubType")) && t.includes(e.InstSubType);
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem);
    this.IsInRoleTrial = false;
    this.dco.clear();
    this.Cco.clear();
    this.BOf.clear();
    this.kOf.clear();
    return true;
  }
  UpdateRoleInfoByServerData(e) {
    for (const t of e) {
      this.UpdateRoleInfo(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleInfoUpdate);
  }
  RoleChange(e, t) {
    this.dco.delete(e);
    this.UpdateRoleInfo(t);
    this.UpdateMainRoleMap(t.Q6n);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSystemDeleteRole, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSystemChangeRole, t.Q6n);
  }
  UpdateRoleInfo(e) {
    let t = this.dco.get(e.Q6n);
    if (!t) {
      t = new RoleInstance_1.RoleInstance(e.Q6n);
      this.dco.set(e.Q6n, t);
    }
    if (this.IsMainRole(e.Q6n)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, GameSettingsDefine_1.EFunction.GENDERSETTING);
    }
    t.RefreshRoleInfo(e);
  }
  UpdateMainRoleMap(e) {
    for (const t of this.Tco().values()) {
      this.fco.set(t, e);
    }
  }
  RoleLevelUp(e, t, r) {
    var o = this.GetRoleInstanceById(e);
    var n = o.GetLevelData();
    var i = n.GetLevel();
    if (o) {
      n.SetLevel(r);
      n.SetExp(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleInfoUpdate);
    if (i < r) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleLevelUp, e, t, r);
    }
  }
  RoleLevelUpReceiveItem(e) {
    var t = [];
    for (const o of Object.keys(e)) {
      var r = [{
        IncId: 0,
        ItemId: Number.parseInt(o)
      }, e[o]];
      t.push(r);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleLevelUpReceiveItem, t);
  }
  RoleBreakUp(e, t) {
    var r = this.GetRoleInstanceById(e);
    if (r) {
      r.GetLevelData().SetBreachLevel(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleInfoUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleBreakUp, e, t);
  }
  RoleSkillLevelUp(e, t) {
    var r = this.GetRoleInstanceById(e);
    if (r) {
      r.RefreshSkillInfo(t.Z4n, t.e5n);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSkillLevelUp, e, t);
  }
  RoleNameUpdate(e, t) {
    e = this.GetRoleInstanceById(e);
    if (e) {
      e.SetRoleName(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleRefreshName);
    }
  }
  RoleAttrUpdate(e, t, r) {
    e = this.GetRoleInstanceById(e);
    if (e) {
      e.RefreshRoleAttr(t, r);
    }
  }
  RoleResonanceLockFinish(e) {
    this.dco.get(e.Q6n).GetResonanceData().SetResonanceLock(e.nxs);
  }
  GetRoleViewAgent(e) {
    switch (e) {
      case 1:
        return new RolePreviewAgent_1.RolePreviewAgent();
      case 2:
        return new RoleNewJoinAgent_1.RoleNewJoinAgent();
      default:
        return new RoleViewAgent_1.RoleViewAgent();
    }
  }
  get IsShowMultiSkillDesc() {
    return this.pco;
  }
  set IsShowMultiSkillDesc(e) {
    this.pco = e;
  }
  get IsShowSkillResume() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShowSkillResume) ?? false;
  }
  set IsShowSkillResume(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShowSkillResume, e);
  }
  GetRoleSkillDescType() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return 1;
    } else {
      return 0;
    }
  }
  GetRoleList() {
    var e = Array.from(this.dco.keys());
    this.rVi(e);
    var t = [];
    for (const o of e) {
      var r = this.dco.get(o);
      if (r.GetRoleConfig().RoleType === 1) {
        t.push(r);
      }
    }
    return t;
  }
  GetRoleDataList(e = false) {
    var t = [];
    for (const n of Array.from(this.dco.keys())) {
      var r = this.dco.get(n);
      if (r.GetRoleConfig().RoleType === 1) {
        t.push(r);
      }
    }
    if (e) {
      for (const i of Array.from(this.kOf.keys())) {
        var o = this.kOf.get(i);
        if (o?.IsVisibleInFormation()) {
          t.push(o);
        }
      }
    }
    t.sort((e, t) => this.OOf(e.GetDataId(), t.GetDataId()));
    return t;
  }
  GetRoleListWithoutMainRole() {
    var e = Array.from(this.dco.keys());
    this.rVi(e);
    var t = [];
    for (const o of e) {
      var r = this.dco.get(o);
      if (r.GetRoleConfig().RoleType === 1 && !this.IsMainRole(o)) {
        t.push(r);
      }
    }
    return t;
  }
  GetRoleMap() {
    return this.dco;
  }
  GetRoleDataMap(e = false) {
    var t = this.GetRoleMap();
    if (!e) {
      return t;
    }
    var r;
    var o;
    var n = new Map(t);
    for ([r, o] of this.kOf) {
      if (o?.IsVisibleInFormation()) {
        n.set(r, o);
      }
    }
    return n;
  }
  GetRoleRobotMap() {
    return this.Cco;
  }
  GetCommonRoleRobotMap() {
    return this.BOf;
  }
  GetRoleFormationRobotMap() {
    return this.kOf;
  }
  GetBattleTeamFirstRoleId() {
    return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem?.GetConfigId;
  }
  rVi(e) {
    e.sort(this.OOf);
  }
  GetRoleDataById(e, t = true) {
    let r = undefined;
    if (t) {
      if (RoleUtils_1.RoleUtils.IsTrialRole(e)) {
        r = this.GetRoleRobotData(e);
      } else if (!(r = this.dco.get(e)) && this.IsMainRole(e)) {
        t = this.GetNewMainRoleId(e);
        r = this.dco.get(t);
      }
      return r;
    } else {
      return new RoleOnlineInstanceData_1.RoleOnlineInstanceData(e);
    }
  }
  GetRoleDataByTrialRoleId(e) {
    let t = undefined;
    var r;
    if (RoleUtils_1.RoleUtils.IsTrialRole(e)) {
      r = RoleUtils_1.RoleUtils.GetTrailRoleRealRoleId(e);
      t = (t = !(t = this.dco.get(r)) && this.IsMainRole(r) ? this.GetCurSelectMainRoleInstance() : t) || this.GetRoleRobotData(e);
    }
    return t;
  }
  GetNewMainRoleId(e) {
    return this.fco.get(e);
  }
  GetRoleRobotData(e) {
    let t = this.Cco.get(e);
    if (!t) {
      (RoleUtils_1.RoleUtils.IsSpecialTrialRole(e) ? (t = new RoleSpecialRobotData_1.RoleSpecialRobotData(e), this.kOf) : (t = new RoleRobotData_1.RoleRobotData(e), this.BOf)).set(e, t);
      this.Cco.set(e, t);
    }
    return t;
  }
  HasAnyTrialRole() {
    for (const e of this.GetRoleSystemRoleList()) {
      if (RoleUtils_1.RoleUtils.IsTrialRole(e)) {
        return true;
      }
    }
    return false;
  }
  GetRoleInstanceById(e) {
    return this.dco.get(e);
  }
  GetRoleName(e, t = undefined) {
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (r) {
      return r.GetName(t);
    } else {
      r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Name);
    }
  }
  Lco(e, t, r) {
    let o = 0;
    ModelManager_1.ModelManager.WeaponModel.AutoAddExpItemEx(e, t, r);
    for (const n of t) {
      o += n.SelectedCount * r(n);
    }
    return o;
  }
  GetExpItemInInventory() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.RoleModel.GetRoleCostExpList()) {
      var t = {
        IncId: 0,
        ItemId: r.Id,
        Count: ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(r.Id),
        SelectedCount: 0
      };
      e.push(t);
    }
    return e;
  }
  GetSelectLevelUpItemNeedMoney(e) {
    var e = this.GetRoleInstanceById(e).GetLevelData().GetLevelUpNeedExp();
    var t = this.GetExpItemInInventory();
    var e = this.Lco(e, t, e => this.GetRoleExpItemExp(e.ItemId));
    return this.GetMoneyToLevelUp(e);
  }
  GetMoneyToLevelUp(e) {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("ExpConversionCount");
    return Math.ceil(e * t / 1000);
  }
  GetHasEnoughMoneyLevelUp(e) {
    e = this.GetSelectLevelUpItemNeedMoney(e);
    return !(ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(ItemDefines_1.EItemId.Gold) < e);
  }
  GetSelectHasEnoughItemToLevelUp(e) {
    e = this.GetRoleInstanceById(e)?.GetLevelData()?.GetLevelUpNeedExp();
    let t = 0;
    for (const o of this.GetRoleCostExpList()) {
      var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(o.Id);
      t += this.GetRoleExpItemExp(o.Id) * r;
    }
    return t >= e;
  }
  GetRoleBreachState(e) {
    e = this.GetRoleInstanceById(e).GetLevelData();
    e = e.GetBreachConfig(e.GetBreachLevel() + 1);
    if (!e) {
      return 3;
    }
    if (!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(e.ConditionId.toString(), undefined, true)) {
      return 4;
    }
    for (const t of e.BreachConsume) {
      if (t[0] === ItemDefines_1.EItemId.Gold) {
        if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(ItemDefines_1.EItemId.Gold) < t[1]) {
          return 1;
        }
      } else if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t[0]) < t[1]) {
        return 0;
      }
    }
    return 2;
  }
  GetRoleNeedBreakUp(e) {
    e = this.GetRoleInstanceById(e);
    return !!e && e.GetLevelData().GetRoleNeedBreakUp();
  }
  GetRoleCostExpList() {
    var e = [];
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleExpItemList();
    if (t) {
      for (const o of t) {
        var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(o.Id);
        if (r) {
          e.push(r);
        }
      }
    }
    return e;
  }
  GetRoleExpItemExp(e) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleExpItemExp(e);
  }
  GetAllRoleList() {
    return Array.from(this.dco.values());
  }
  GetRoleIdList() {
    var e = Array.from(this.dco.keys());
    this.rVi(e);
    var t = [];
    for (const r of e) {
      if (this.dco.get(r).GetRoleConfig().RoleType === 1) {
        t.push(r);
      }
    }
    return t;
  }
  GetOfficialRoleList() {
    var e = [];
    for (const t of this.dco.values()) {
      if (t.GetRoleConfig().RoleType === 1 && !t.IsTrialRole()) {
        e.push(t);
      }
    }
    return e;
  }
  GetRoleTabList() {
    var t = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("RoleRootView");
    var r = t.length;
    var o = [];
    for (let e = 0; e < r; e++) {
      var n = t[e];
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(n.FunctionId)) {
        o.push(n);
      }
    }
    return o;
  }
  GetNormalRoleTabList() {
    return this.GetRoleTabList().filter(e => e.ChildViewName === "RoleAttributeTabView" || e.ChildViewName === "RoleWeaponTabView" || e.ChildViewName === "RolePhantomTabView" || e.ChildViewName === "RoleSkillTabView" || e.ChildViewName === "RoleResonanceTabNewView" || e.ChildViewName === "RoleFavorTabView");
  }
  GetTrialRoleTabList() {
    return this.GetRoleTabList().filter(e => e.ChildViewName === "RoleAttributeTabView" || e.ChildViewName === "RoleWeaponTabView" || e.ChildViewName === "RolePhantomTabView" || e.ChildViewName === "RoleSkillTabView" || e.ChildViewName === "RoleResonanceTabNewView");
  }
  GetSpecialTrialRoleTabList() {
    return this.GetRoleTabList().filter(e => e.ChildViewName === "RoleAttributeTabView" || e.ChildViewName === "RoleWeaponTabView" || e.ChildViewName === "RolePhantomTabView" || e.ChildViewName === "RoleSkillTabView" || e.ChildViewName === "RoleResonanceTabNewView");
  }
  GetPreviewRoleTabList() {
    return this.GetRoleTabList().filter(e => e.ChildViewName === "RolePreviewAttributeTabView" || e.ChildViewName === "RoleSkillTabView" || e.ChildViewName === "RoleResonanceTabNewView");
  }
  GetRoleTabListByUiParam(e) {
    switch (e) {
      case 1:
      case 3:
        return this.GetNormalRoleTabList();
      case 0:
        return this.GetTrialRoleTabList();
      case 4:
        return this.GetSpecialTrialRoleTabList();
      case 2:
        return this.GetPreviewRoleTabList();
      default:
        return this.GetNormalRoleTabList();
    }
  }
  RedDotRoleSelectionListCondition() {
    var e = ModelManager_1.ModelManager.NewFlagModel.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem);
    if (e !== undefined) {
      for (const t of this.GetAllRoleList()) {
        if (e.has(t.GetDataId())) {
          return true;
        }
      }
    }
    return false;
  }
  RedDotRoleSystemRoleListCondition(e) {
    let t = false;
    var r = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList;
    if (t = r ? r.includes(e) : t) {
      return !!this.RedDotResonanceTabCondition(e) || !!ModelManager_1.ModelManager.VisionRecommendModel.CheckVisionOneKeyEquipRedDot(e);
    } else {
      return this.RedDotResonanceTabCondition(e);
    }
  }
  RedDotAttributeTabLevelUpCondition(e) {
    var t = this.GetRoleDataById(e);
    return !!t && !t.IsTrialRole() && !t.GetLevelData().GetRoleIsMaxLevel() && !!this.GetSelectHasEnoughItemToLevelUp(e) && !!this.GetHasEnoughMoneyLevelUp(e);
  }
  RedDotAttributeTabBreakUpCondition(e) {
    e = this.GetRoleDataById(e);
    return !!e && !e.IsTrialRole() && !!e.GetLevelData().GetRoleNeedBreakUp() && this.Rco(e);
  }
  RedDotFavorItemActiveCondition(e) {
    e = this.GetRoleDataById(e);
    return !e.IsTrialRole() && e.GetFavorData().IsExistCanUnlockFavorItem();
  }
  Rco(e) {
    return e.GetLevelData().IsEnoughBreachConsume();
  }
  RedDotResonanceTabCondition(e) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
    if (e === undefined) {
      return false;
    }
    var t = this.GetRoleResonanceGroupIndex(e);
    var e = e.GetRoleConfig().ResonanceId;
    var e = ResonantChainByGroupId_1.configResonantChainByGroupId.GetConfigList(e);
    if (t < 0 || t >= e.length) {
      return false;
    }
    for (const r of e[t].ActivateConsume) {
      if (ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(r[0]) < r[1]) {
        return false;
      }
    }
    return true;
  }
  RedDotCondition() {
    return this.RedDotResonanceCondition() || this.RedDotRoleSkinCondition();
  }
  RedDotResonanceCondition() {
    for (const e of this.GetAllRoleList()) {
      if (this.RedDotResonanceTabCondition(e.GetDataId())) {
        return true;
      }
    }
    return false;
  }
  RedDotRoleSkinCondition() {
    for (const e of this.GetAllRoleList()) {
      if (ModelManager_1.ModelManager.RoleSkinModel.HasRoleSkinRedDotByRoleId(e.GetDataId())) {
        return true;
      }
    }
    return false;
  }
  RedDotResonanceTabHoleCondition(e, t) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
    if (!e) {
      return false;
    }
    if (t - this.GetRoleResonanceGroupIndex(e) != 1) {
      return false;
    }
    e = this.GetRoleResonanceConfigList(e)[t - 1];
    let r = true;
    e.ActivateConsume.forEach((e, t) => {
      if (ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t) < e) {
        r = false;
      }
    });
    return r;
  }
  GetRoleResonanceState(e, t) {
    e = e.GetResonanceData().GetResonantChainGroupIndex();
    if (t <= e) {
      return 2;
    } else if (t - 1 === e) {
      return 1;
    } else {
      return 0;
    }
  }
  GetRoleResonanceGroupIndex(e) {
    return e.GetResonanceData().GetResonantChainGroupIndex();
  }
  GetRoleResonanceConfigList(e) {
    e = e.GetDataId();
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).ResonantChainGroupId;
    return ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(e);
  }
  get RoleSkillResponseData() {
    this.yco ||= new RoleSkillResponseData_1.RoleSkillResponseData();
    return this.yco;
  }
  GetCurRoleSkillViewDataLocal(e, t) {
    e = this.GetRoleDataById(e).GetSkillData().GetSkillLevel(t);
    return this.GetRoleSkillEffect(t, e);
  }
  GetNextRoleSkillViewDataLocal(e, t) {
    var e = this.GetRoleDataById(e).GetSkillData().GetSkillLevel(t);
    var r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t).MaxSkillLevel;
    return this.GetRoleSkillEffect(t, e < r ? e + 1 : r);
  }
  GetRoleSkillEffect(e, t) {
    var r = new RoleDefine_1.SkillEffect();
    var e = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.RoleSkillConfig.GetAllRoleSkillDescConfigByGroupId(e));
    e.sort((e, t) => e.Order - t.Order);
    var o = [];
    for (const i of e) {
      var n = new RoleDefine_1.OneSkillEffect();
      n.Id = i.Id;
      n.Desc = [];
      for (const a of i.SkillDetailNum) {
        if (!(a.ArrayString.length <= 0) && !(t > a.ArrayString.length)) {
          n.Desc.push(a.ArrayString[t - 1]);
        }
      }
      o.push(n);
    }
    r.Level = t;
    r.EffectDescList = o;
    return r;
  }
  UpdateRoleSkillViewData(e, t, r) {
    this.RoleSkillResponseData.UpdateRoleSkillViewResponse(e, t, r);
  }
  UpdateRoleSkillNodeData(e, t) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
    if (e) {
      e = e.GetSkillData();
      if (e) {
        var r = t.length;
        var o = new Map();
        for (let e = 0; e < r; e++) {
          var n = t[e];
          var i = n.qHn;
          var n = new SkillNodeDataInfo_1.SkillNodeDataInfo(i, n.WHn, n.r5n);
          o.set(i, n);
        }
        e.SetSkillNodeStateData(o);
      }
    }
  }
  GetUpgradeSkillIdIfUpgraded(e, t) {
    return this.GetRoleDataById(t).GetSkillData().GetSkillIdAfterUpgrade(e);
  }
  UpdateRoleFavorData(t) {
    var r = t.length;
    for (let e = 0; e < r; e++) {
      this.UpdateRoleFavorDataSingle(t[e]);
    }
  }
  UpdateRoleFavorCondition(e) {
    for (var [t, r] of e) {
      ModelManager_1.ModelManager.RoleFavorConditionModel.UpdateRoleFavorCondition(t, r);
    }
  }
  UpdateRoleFavorDataSingle(e) {
    var t;
    var r;
    var o;
    var n;
    var i = e.Q6n;
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i);
    if (i &&= i.GetFavorData()) {
      t = e.F6n;
      r = e.U8n;
      o = e.KPs;
      n = e.QPs;
      e = e.XPs;
      i.SetFavorLevel(t);
      i.SetFavorExp(r);
      i.UpdateRoleFavorData(0, o);
      i.UpdateRoleFavorData(2, n);
      i.UpdateRoleFavorData(4, e);
    }
  }
  UpdateRoleFavorNewCanUnLockId(e) {
    var t = e.Q6n;
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t);
    if (t) {
      t.GetFavorData().UpdateCanUnlockId(e.H9n, e.eUs);
    }
  }
  UpdateRoleFavorLevelAndExp(e) {
    var t = e.Q6n;
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t).GetFavorData();
    t.SetFavorLevel(e.F6n);
    t.SetFavorExp(e.U8n);
  }
  UpdateRoleSkinInfo(e, t) {
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "UpdateRoleSkinInfo 无效roleId", ["roleId", e]);
      }
    } else {
      r.SetRoleSkinId(t);
    }
  }
  UpdateRoleBackgroundMusicEnabled(e, t) {
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 43, "UpdateRoleBackgroundMusicEnabled 无效roleId", ["roleId", e]);
      }
    } else {
      r.SetBackgroundMusicEnabled(t);
    }
  }
  GetRoleBackgroundMusicEnabled(e) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
    return e === undefined || e.GetBackgroundMusicEnabled();
  }
  GetRoleSystemRoleList(e = false) {
    if (ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance()) {
      return this.GetRoleIdList();
    }
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return this.GetRoleIdList();
    }
    var t = [];
    for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      var r = a.GetConfigId;
      var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
      if (o && o.IsTrialRole()) {
        t.push(r);
      }
    }
    var n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamLength();
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && t.length > 0 && t.length === n) {
      return t;
    }
    if (t.length > 0) {
      const i = Array.from(this.dco.keys());
      for (const l of t) {
        i.push(l);
      }
      if (e) {
        this.dog(i);
      }
      this.rVi(i);
      return i;
    }
    const i = this.GetRoleIdList();
    if (e) {
      this.dog(i);
      this.rVi(i);
    }
    return i;
  }
  dog(e) {
    for (const r of this.kOf.values()) {
      var t;
      if (r.IsVisibleInRoleSystem()) {
        t = r.GetDataId();
        if (!(e.indexOf(t) >= 0)) {
          e.push(t);
        }
      }
    }
  }
  GetRoleListHighestLevel() {
    let e = -1;
    for (var [, t] of this.dco) {
      t = t.GetLevelData().GetLevel();
      e = t > e ? t : e;
    }
    for (var [, r] of this.Cco) {
      if (ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(r.GetDataId(), {
        ParamType: 0
      })) {
        r = r.GetLevelData().GetLevel();
        e = r > e ? r : e;
      }
    }
    return e;
  }
  UpdateCanChangeRoleIdList(e) {
    this.Ico = this.Ico.concat(e);
  }
  GetCanChangeRoleIdList() {
    return this.Ico;
  }
  IsMainRole(e) {
    return this.Tco().has(e);
  }
  IsLightMainRole(e) {
    return this.U9l().has(e);
  }
  Tco() {
    if (this.gco.size === 0) {
      this.Uco();
    }
    return this.gco;
  }
  U9l() {
    if (this.P9l.size === 0) {
      this.D9l();
    }
    return this.P9l;
  }
  Uco() {
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetAllMainRoleConfig();
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var o = t[e];
      this.gco.add(o.Id);
    }
  }
  D9l() {
    for (const e of CommonParamById_1.configCommonParamById.GetIntArrayConfig("LightMainRoleIdList")) {
      this.P9l.add(e);
    }
  }
  GetCurSelectMainRoleId() {
    for (const e of this.Tco().values()) {
      if (this.dco.get(e)) {
        return e;
      }
    }
  }
  GetCurSelectMainRoleInstance() {
    for (const t of this.Tco().values()) {
      var e = this.dco.get(t);
      if (e) {
        return e;
      }
    }
  }
  GetCorrectMainRoleConfig(e) {
    if (this.IsMainRole(e)) {
      var t = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleById(e);
      var r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      if (t.Gender !== r) {
        for (const n of ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(r)) {
          if (ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n.Id).ElementId === o.ElementId) {
            return n;
          }
        }
      }
      return t;
    }
  }
  GetRoleLevelUpExp(e, t) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleLevelConsume(e.LevelConsumeId, t);
    if (e) {
      return e.ExpCount;
    } else {
      return 1;
    }
  }
  CalculateExpBackItem(e) {
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleExpItemList();
    var r = t.length;
    let o = e;
    var n = new Map();
    for (let e = r - 1; e >= 0; e--) {
      var i = t[e].BasicExp;
      var a = Math.floor(o / i);
      o %= i;
      if (a > 0) {
        n.set(t[e].Id, a);
      }
    }
    return n;
  }
  GetBaseAttributeById(e, t) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var r = BasePropertyById_1.configBasePropertyById.GetConfig(e.PropertyId);
    switch (t) {
      case EAttributeId.Proto_Atk:
        return r.Atk;
      case EAttributeId.Proto_Def:
        return r.Def;
      case EAttributeId.l5n:
        return r.LifeMax;
    }
    return 0;
  }
  GetAttributeRadioByLevel(e, t, r) {
    var o = RolePropertyGrowthByLevelAndBreachLevel_1.configRolePropertyGrowthByLevelAndBreachLevel.GetConfig(t, r);
    switch (e) {
      case EAttributeId.Proto_Atk:
        return o.AtkRatio;
      case EAttributeId.Proto_Def:
        return o.DefRatio;
      case EAttributeId.l5n:
        return o.LifeMaxRatio;
    }
    return 0;
  }
  GetAttributeByLevel(e, t, r, o) {
    e = this.GetBaseAttributeById(e, t) * this.GetAttributeRadioByLevel(t, r, o) * RoleDefine_1.MUL_RATIO;
    return Math.floor(e);
  }
  GetAddAttrLevelUp(e, t, r, o, n, i) {
    t = this.GetAttributeByLevel(e, i, t, r);
    return this.GetAttributeByLevel(e, i, o, n) - t;
  }
  GetRoleSkillTreeNodeLevel(e, t) {
    if (t <= 0) {
      return 0;
    }
    t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(t);
    if (!t) {
      return 0;
    }
    let r = this.GetRoleInstanceById(e);
    r = r || this.GetRoleDataById(e);
    return this.GetRoleSkillTreeNodeLevelByConfig(r, t);
  }
  GetRoleSkillTreeNodeLevelByConfig(e, t) {
    return e.GetSkillData().GetSkillNodeLevel(t);
  }
  GetRoleSkillTreeNodeState(t, r) {
    if (!(r <= 0)) {
      r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(r);
      if (r) {
        let e = this.GetRoleInstanceById(t);
        return (e = e || this.GetRoleDataById(t)).GetSkillData().GetSkillTreeNodeState(r, t);
      }
    }
  }
  GetRoleSkillTreeNodeConsumeSatisfied(e, t) {
    e = this.GetRoleInstanceById(e);
    return !!e && e.GetSkillData().IsSkillTreeNodeConsumeSatisfied(t);
  }
  GetSkillAttributeNameByOneSkillEffect(e) {
    return ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillDescriptionConfigById(e.Id).AttributeName;
  }
  GetSkillAttributeDescriptionByOneSkillEffect(t) {
    var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillDescriptionConfigById(t.Id);
    let r = "";
    if (e.Description) {
      r = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Description), ...t.Desc);
    } else {
      var o = new StringBuilder_1.StringBuilder();
      var n = t.Desc.length;
      for (let e = 0; e < n; ++e) {
        o.Append(t.Desc[e]);
      }
      r = o.ToString();
    }
    return r;
  }
  GetResonantItemRoleMap() {
    if (!this.vco) {
      var e;
      this.vco = new Map();
      for (const r of ConfigManager_1.ConfigManager.RoleConfig.GetRoleList()) {
        if (!(r.ResonantChainGroupId <= 0)) {
          if (e = ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(r.ResonantChainGroupId)) {
            e.forEach(e => {
              for (const t of e.ActivateConsume) {
                let e = this.vco.get(t[0]);
                if (!(e = e || new Array()).includes(r.Id)) {
                  e.push(r.Id);
                }
                this.vco.set(t[0], e);
              }
            });
          }
        }
      }
    }
    return this.vco;
  }
  GetResonantItemRoleId(e) {
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e)?.ShowTypes.includes(30) && (e = this.GetResonantItemRoleMap().get(e)) && e.length > 0) {
      return e;
    } else {
      return undefined;
    }
  }
  CheckRoleResonantIfMax(e) {
    e = this.GetRoleInstanceById(e);
    return !!e && (this.GetRoleResonanceGroupIndex(e) ?? 0) >= ConfigManager_1.ConfigManager.RoleResonanceConfig.GetResonanceMaxLevel();
  }
  GetRoleLeftResonantCount(e) {
    var e = this.GetRoleInstanceById(e);
    if (e) {
      e = this.GetRoleResonanceGroupIndex(e) ?? 0;
      return ConfigManager_1.ConfigManager.RoleResonanceConfig.GetResonanceMaxLevel() - e;
    } else {
      return 0;
    }
  }
  GetRoleLeftResonantCountWithInventoryItem(e) {
    var t;
    var e = this.GetRoleInstanceById(e);
    if (!e) {
      return 0;
    }
    let r = 0;
    for ([t] of e.GetRoleConfig().SpilloverItem) {
      r += ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
    }
    e = this.GetRoleResonanceGroupIndex(e) ?? 0;
    return ConfigManager_1.ConfigManager.RoleResonanceConfig.GetResonanceMaxLevel() - e - r;
  }
  InUltraSkill() {
    return this.zyn;
  }
  GetRoleTagByRoleInfo(e) {
    var t;
    if (this.ClientCheckRoleIsUpgradeLightMainRole(e.Id)) {
      t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("MainRoleReplaceTagList");
      return Array.from(t);
    } else {
      return e.Tag;
    }
  }
  ClientCheckRoleIsUpgradeLightMainRole(e) {
    return !!this.IsLightMainRole(e) && (e = CommonParamById_1.configCommonParamById.GetIntConfig("MainRoleTagReplaceCondition"), ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(e.toString(), undefined, false));
  }
  GetAllConfigRoleDataList() {
    var t = [];
    var r = new Set();
    for (const a of ConfigManager_1.ConfigManager.RoleConfig.GetRoleList() ?? []) {
      if (a.RoleType === 1 && !r.has(a.Id)) {
        r.add(a.Id);
        var o = a.Id;
        let e = this.dco.get(o);
        var n = !!e;
        var i = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(o) === 0;
        if ((!!n || !this.IsMainRole(o)) && !i) {
          if (ModelManager_1.ModelManager.HandBookModel.GetRoleCanShowInHandBook(o)) {
            e = e || new RoleInstance_1.RoleInstance(o);
            t.push(e);
          }
        }
      }
    }
    this.SortRoleDataList(t);
    return t;
  }
  GetAllConfigRoleIdList() {
    var e;
    var t;
    var r;
    var o = [];
    var n = new Set();
    for (const i of ConfigManager_1.ConfigManager.RoleConfig.GetRoleList() ?? []) {
      if (i.RoleType === 1 && !n.has(i.Id) && !(n.add(i.Id), e = i.Id, t = !!this.dco.get(e), r = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e) === 0, !t && this.IsMainRole(e)) && !r) {
        if (ModelManager_1.ModelManager.HandBookModel.GetRoleCanShowInHandBook(e)) {
          o.push(e);
        }
      }
    }
    this.xWd(o);
    return o;
  }
  SortRoleDataList(e) {
    e.sort((e, t) => this.HPd(e, t));
  }
  xWd(e) {
    e.sort((e, t) => {
      e = this.GetRoleDataByIdOrCreateDefault(e);
      t = this.GetRoleDataByIdOrCreateDefault(t);
      if (e && t) {
        return this.HPd(e, t);
      } else {
        return 0;
      }
    });
  }
  HPd(e, t) {
    var r = this.XRt(e, t);
    if (r !== 0 || (r = this.oRt(e, t)) !== 0) {
      return r;
    } else {
      return this.KDt(e, t);
    }
  }
  XRt(t, r) {
    let o = -1;
    let n = -1;
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
    for (let e = 0; e < i.length; e++) {
      var a = i[e];
      if (t.GetDataId() === a.GetConfigId) {
        o = e;
      }
      if (r.GetDataId() === a.GetConfigId) {
        n = e;
      }
    }
    var e = i[o] !== undefined;
    var l = i[n] !== undefined;
    if (e || l) {
      if (e != l) {
        return (l ? 1 : 0) - (e ? 1 : 0);
      } else {
        return o - n;
      }
    } else {
      return 0;
    }
  }
  oRt(e, t) {
    e = e.GetLevelData();
    t = t.GetLevelData();
    if (e.GetLevel() !== t.GetLevel()) {
      return t.GetLevel() - e.GetLevel();
    } else if (e.GetBreachLevel() !== t.GetBreachLevel()) {
      return t.GetBreachLevel() - e.GetBreachLevel();
    } else {
      return 0;
    }
  }
  KDt(e, t) {
    e = e.GetRoleConfig().QualityId;
    t = t.GetRoleConfig().QualityId;
    if (e !== t) {
      return t - e;
    } else {
      return 0;
    }
  }
  GetRoleDataByIdOrCreateDefault(t) {
    if (ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)) {
      let e = this.dco.get(t);
      return e = e || new RoleInstance_1.RoleInstance(t);
    }
  }
  IsRoleOwned(e) {
    return this.dco.has(e);
  }
  SetRoleBranch(e, t) {
    this.u9f.set(e, t);
  }
  IsRoleHasBranch(e) {
    e = this.GetRoleBranchIdList(e);
    return e && e.length === 2;
  }
  GetRoleBranchIdList(e) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleBranchIds(e);
  }
  GetRoleCurrentBranchId(e) {
    let t = this.u9f.get(e);
    return t = t || this.GetRoleDefaultBranchId(e);
  }
  GetRoleOppositeBranchId(e) {
    var t = this.GetRoleCurrentBranchIndex(e);
    return this.GetRoleBranchIdByIndex(e, t === 0 ? 1 : 0);
  }
  GetRoleBranchIdByIndex(e, t) {
    return this.GetRoleBranchIdList(e)[t];
  }
  GetRoleDefaultBranchId(e) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleDefaultBranch(e);
  }
  GetRoleCurrentBranchIndex(e) {
    var t = this.GetRoleBranchIdList(e);
    const r = this.GetRoleCurrentBranchId(e);
    return t.findIndex(e => r === e);
  }
  GetRoleDefaultBranchIndex(e) {
    var t = this.GetRoleBranchIdList(e);
    const r = this.GetRoleDefaultBranchId(e);
    return t.findIndex(e => r === e);
  }
  CheckCanSwitchRoleBranch(e = false) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !!t?.Valid && !!(t = t.Entity.GetComponent(217))?.Valid && (!t.HasTag(1996802261) || !(e && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("ForbiddenActionInFight"), 1));
  }
  IsSkillNodeHasBranch(e) {
    e = this.GetSkillNodeBranchIdList(e);
    return e && e.length === 2;
  }
  GetSkillNodeCurrentBranchId(e, t) {
    e = this.GetRoleCurrentBranchIndex(e);
    return ConfigManager_1.ConfigManager.RoleConfig.GetSkillNodeBranchIds(t)[e];
  }
  GetSkillNodeBranchIdList(e) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetSkillNodeBranchIds(e);
  }
}
exports.RoleModel = RoleModel;
//# sourceMappingURL=RoleModel.js.map