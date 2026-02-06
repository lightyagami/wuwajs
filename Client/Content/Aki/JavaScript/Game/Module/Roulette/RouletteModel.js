"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteModel = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const InputKeyDisplayData_1 = require("../../InputSettings/InputKeyDisplayData");
const InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const RouletteListDataExplore_1 = require("./Data/RouletteListDataExplore");
const RouletteListDataFunc_1 = require("./Data/RouletteListDataFunc");
const RouletteListDataMotor_1 = require("./Data/RouletteListDataMotor");
class RouletteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.RouletteListDataMap = new Map();
    this.H0o = 0;
    this.OnSettingExploreSkillIdList = [];
    this.UnlockExploreSkillDataMap = new Map();
    this.K0o = new Map();
    this.UnlockFunctionDataMap = new Map();
    this.X0o = (e, t) => {
      e = this.K0o.get(e);
      if (e !== undefined) {
        if (t) {
          this.$0o(e);
        } else {
          this.dqt(e);
        }
      }
    };
    this.XPn = new InputKeyDisplayData_1.InputKeyDisplayData();
    this.GetRouletteActionName = {
      [1]: InputMappingsDefine_1.actionMappings.幻象探索选择界面,
      2: InputMappingsDefine_1.actionMappings.轮盘2
    };
  }
  IsExploreRouletteOpen(e = false) {
    if (!ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(217)?.HasAnyTag(this.GetExploreRouletteBanTagIds()) && ModelManager_1.ModelManager.LevelFuncFlagModel.GetFuncFlagEnable(1)) {
      return ModelManager_1.ModelManager.FunctionModel.IsOpen(10026);
    } else {
      if (e) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ExploreToolCantOpen");
      }
      return false;
    }
  }
  IsFunctionRouletteOpen() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10056);
  }
  OnInit() {
    this.iFm();
    this.Y0o();
    this.AddEvents();
    return !(this.OnSettingExploreSkillIdList.length = 0);
  }
  OnClear() {
    this.rFm();
    this.RemoveEvents();
    return true;
  }
  GetExploreRouletteBanTagIds() {
    var e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreRouletteConfig();
    var t = new Array();
    if (e.length !== 0) {
      for (const r of e[0].BanTags) {
        var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r);
        if (o) {
          t.push(o);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Phantom", 37, "探索工具轮盘禁用Tag不存在,请检查配置", ["tagName", r]);
        }
      }
    }
    return t;
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.X0o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.X0o);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.X0o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.X0o);
  }
  GetActivatedRouletteList() {
    var e = [];
    for (const t of this.RouletteListDataMap.values()) {
      if (t.IsActivate()) {
        e.push(t);
      }
    }
    e.sort((e, t) => e.Priority - t.Priority);
    return e;
  }
  GetCurrentExploreRouletteListData() {
    return this.GetActivatedRouletteList()[0];
  }
  GetCurrentFunctionRouletteListData() {
    return this.RouletteListDataMap.get(1);
  }
  iFm() {
    this.RouletteListDataMap.clear();
    var e = new RouletteListDataExplore_1.RouletteListDataExplore();
    this.RouletteListDataMap.set(0, e);
    var e = new RouletteListDataFunc_1.RouletteListDataFunc();
    this.RouletteListDataMap.set(1, e);
    var e = new RouletteListDataMotor_1.RouletteListDataMotor();
    this.RouletteListDataMap.set(3, e);
    for (const t of this.RouletteListDataMap.values()) {
      t.Init();
    }
  }
  rFm() {
    for (const e of this.RouletteListDataMap.values()) {
      e.Clear();
    }
    this.RouletteListDataMap.clear();
  }
  set CurrentExploreSkillId(e) {
    if (this.H0o !== e) {
      this.H0o = e;
      this.J0o(this.H0o);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "设置新探索技能Id成功", ["Id", this.H0o]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeSelectedExploreId);
    }
  }
  get CurrentExploreSkillId() {
    return this.H0o;
  }
  get CurrentExploreSkillIcon() {
    if (this.H0o !== 0) {
      if (this.IsEquipItemSelectOn) {
        if (this.CurrentEquipItemId === 0) {
          return undefined;
        } else {
          return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(this.CurrentEquipItemId)?.Icon;
        }
      } else {
        return (this.UnlockExploreSkillDataMap.get(this.H0o) || ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(this.H0o)).BattleViewIcon;
      }
    }
  }
  RecoverEquipExploreSkillId() {
    for (const t of this.GetActivatedRouletteList()) {
      var e = t.GetEquipExploreSkillId();
      if (e !== 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "还原当前状态装备探索技能Id", ["启用轮盘类型", t.RouletteType], ["SkillId", e]);
        }
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e, 0, "RecoverEquipExploreSkillId");
        ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(e);
        return;
      }
    }
  }
  GetExploreDataBySkillId(e) {
    if (this.UnlockExploreSkillDataMap.has(e)) {
      return this.UnlockExploreSkillDataMap.get(e);
    }
  }
  UnlockExploreSkill(e, t = true) {
    var o = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    if (o) {
      this.UnlockExploreSkillDataMap.set(e, o);
    }
    if (t) {
      this.TryAddNewItem(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddExploreVisionSkill, e);
    }
  }
  CreateAllUnlockExploreSkill(e) {
    this.UnlockExploreSkillDataMap.clear();
    for (const t of e) {
      this.UnlockExploreSkill(t, false);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 37, "设置当前解锁的探索技能", ["技能列表", e]);
    }
  }
  GetFuncDataByFuncId(e) {
    if (this.UnlockFunctionDataMap.has(e)) {
      return this.UnlockFunctionDataMap.get(e);
    }
  }
  Y0o() {
    for (const e of ConfigManager_1.ConfigManager.RouletteConfig.GetAllFuncConfig()) {
      if (e.UnlockCondition) {
        this.K0o.set(e.UnlockCondition, e.FuncId);
      } else {
        this.UnlockFunctionDataMap.set(e.FuncId, e);
      }
    }
  }
  $0o(e) {
    var t = ConfigManager_1.ConfigManager.RouletteConfig.GetFuncConfigById(e);
    if (t && !this.UnlockFunctionDataMap.has(e)) {
      this.UnlockFunctionDataMap.set(e, t);
    }
  }
  dqt(e) {
    if (this.UnlockFunctionDataMap.has(e)) {
      this.UnlockFunctionDataMap.delete(e);
    }
  }
  get CurrentEquipItemId() {
    return this.RouletteListDataMap.get(0).GetExtraItemId();
  }
  get IsEquipItemSelectOn() {
    return this.CurrentExploreSkillId === 3001;
  }
  get EquipItemType() {
    if (this.CurrentEquipItemId !== 0) {
      if (ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(this.CurrentEquipItemId)) {
        return 13;
      } else {
        return 1;
      }
    }
  }
  IsExploreSkillHasNumBySkillData(e) {
    var t;
    if (e.SkillType !== 5) {
      return !!(t = e.Cost) && !!(t.size > 0);
    } else {
      return !!(t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseItemByExploreToolId(e.PhantomSkillId)) && !!ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.GetItemData(t.Id);
    }
  }
  GetExploreSkillShowNumBySkillData(e) {
    var t;
    if (e.SkillType !== 5) {
      if ((t = e.Cost) && t.size > 0) {
        [t] = t.keys();
        return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
      } else {
        return 0;
      }
    } else if ((t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseItemByExploreToolId(e.PhantomSkillId)) && (e = ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.GetItemData(t.Id))) {
      return e.InventoryCount;
    } else {
      return 0;
    }
  }
  IsExploreSkillHasNum() {
    var e;
    if (this.IsEquipItemSelectOn) {
      return this.EquipItemType === 1 || (ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(this.CurrentEquipItemId)?.NeedShowNum ?? false);
    } else {
      return !!(e = this.UnlockExploreSkillDataMap.get(this.CurrentExploreSkillId)) && this.GetExploreSkillShowNumBySkillData(e) > 0;
    }
  }
  GetExploreSkillShowNum() {
    var e;
    if (this.IsEquipItemSelectOn) {
      return ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(this.CurrentEquipItemId);
    } else if (e = this.UnlockExploreSkillDataMap.get(this.CurrentExploreSkillId)) {
      return this.GetExploreSkillShowNumBySkillData(e);
    } else {
      return 0;
    }
  }
  IsExploreSkillHasSetNum(e) {
    switch (e) {
      case 1010:
      case 1012:
      case 1018:
      case 1011:
        return true;
    }
    return false;
  }
  GetExploreSkillShowSetNumById(e) {
    switch (e) {
      case 1010:
        var t = ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceLimit(e);
        return [ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceNum(e) ?? 0, t ?? 0];
      case 1012:
        t = ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceLimit(e);
        return [ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceNum(e) ?? 0, t ?? 0];
      case 1011:
        t = ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceLimit(e);
        return [ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceNum(e) ?? 0, t ?? 0];
      case 1018:
        t = ModelManager_1.ModelManager.FishingModel.GetTempFishingPointLimit();
        return [ModelManager_1.ModelManager.FishingModel.GetTempFishingPointNum() ?? 0, t ?? 0];
    }
    return [0, 0];
  }
  IsEquipItemInBuffCd() {
    return !!this.IsEquipItemSelectOn && !!ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(this.CurrentEquipItemId) && ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(this.CurrentEquipItemId) - TimeUtil_1.TimeUtil.TimeDeviation > 0;
  }
  IsEquippedItemBanReqUse() {
    return !!this.IsEquipItemSelectOn && !!ControllerHolder_1.ControllerHolder.SpecialItemController.IsSpecialItem(this.CurrentEquipItemId) && !ControllerHolder_1.ControllerHolder.SpecialItemController.AllowReqUseSpecialItem(this.CurrentEquipItemId);
  }
  SaveNewItemList() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RouletteRefreshNew);
  }
  TryAddNewItem(e) {
    return e !== 0 && (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RouletteRefreshNew), true);
  }
  TryRemoveNewItem(e) {
    return e !== 0 && ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot, e);
  }
  CheckHasAnyNewItem() {
    for (var [t, o] of this.UnlockExploreSkillDataMap.entries()) {
      if (o.CanAssemblyShow) {
        let e = false;
        for (const r of o.RouletteType) {
          if (this.RouletteListDataMap.get(r)?.IsRouletteOpen()) {
            e = true;
            break;
          }
        }
        if (e) {
          if (ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot, t)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  UpdateRouletteData(t) {
    if (t.length === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "当前不存在保存的轮盘数据");
      }
    } else {
      for (let e = 0; e < t.length; e++) {
        var o = this.RouletteListDataMap.get(e);
        if (o && (o.UpdateData(t[e]), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Phantom", 37, "轮盘列表数据", ["Type", e], ["List", o.RouletteIdListServer], ["ItemId", o.ExtraItemIdServer], ["EquipId", o.EquipExploreSkillIdServer]);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRouletteSaveDataChange);
      this.oFm();
    }
  }
  UpdateRouletteDataByType(e, t) {
    var o = this.RouletteListDataMap.get(e);
    if (o && (o.UpdateData(t), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Phantom", 37, "轮盘列表数据", ["Type", e], ["List", o.RouletteIdListServer], ["ItemId", o.ExtraItemIdServer], ["EquipId", o.EquipExploreSkillIdServer]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRouletteSaveDataChange);
    this.oFm();
  }
  oFm() {
    var e = this.GetCurrentExploreRouletteListData();
    var t = e.GetEquipExploreSkillId();
    if (t !== 0 && t !== this.CurrentExploreSkillId) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "TryEquipActivateRoulette", ["Type", e.RouletteType], ["EquipId", t]);
      }
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(t, 0, "TryEquipActivateRouletteExploreSkillId");
      ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(t, undefined, true);
    }
  }
  GetRouletteKeyRichText(e) {
    this.XPn.Reset();
    var e = InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(this.XPn, e);
    if ((e = e && this.XPn.GetDisplayKeyIconPathList(0)) && e.length !== 0) {
      return `<texture=${e[0]}>`;
    } else {
      return "";
    }
  }
  GetRouletteMainAction(e) {
    if (InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(this.XPn, e) && this.XPn.IsCombination) {
      return InputMappingsDefine_1.actionMappings.组合主键;
    } else {
      return e;
    }
  }
  GetRouletteSelectConfig() {
    return LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadRouletteSelectConfig) ?? 1;
  }
  SaveRouletteSelectConfig(e) {
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadRouletteSelectConfig, e);
  }
  GetRouletteActionOpenConfig(e) {
    var t = e === 1 ? 0 : 1;
    if (Info_1.Info.IsInGamepad()) {
      e = e === 1 ? LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAction01OpenConfig : LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAction02OpenConfig;
      return LocalStorage_1.LocalStorage.GetPlayer(e) ?? t;
    } else {
      return t;
    }
  }
  SaveRouletteActionOpenConfig(e, t) {
    e = e === 1 ? LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAction01OpenConfig : LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAction02OpenConfig;
    LocalStorage_1.LocalStorage.SetPlayer(e, t);
  }
  J0o(e) {
    var t = new LogReportDefine_1.ExploreToolSwitchLogData();
    var o = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    const r = [];
    o.Authorization.forEach((e, t) => {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) > 0) {
        r.push([t, e]);
      }
    });
    t.o_authorization = r;
    t.i_explore_tool_id = e;
    LogReportController_1.LogReportController.LogReport(t);
  }
  SendExploreToolEquipLogData(e, t, o, r) {
    var a = new LogReportDefine_1.ExploreToolEquipLogData();
    var n = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    const i = [];
    n.Authorization.forEach((e, t) => {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) > 0) {
        i.push([t, e]);
      }
    });
    a.o_authorization = i;
    a.i_explore_tool_id = e;
    a.i_operation = t;
    a.i_roulette_id = o;
    if (r !== undefined) {
      a.i_item_id = r;
    }
    LogReportController_1.LogReportController.LogReport(a);
  }
  SendExploreToolItemUseLogData(e) {
    var t = new LogReportDefine_1.ExploreToolItemUseLogData();
    var o = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
    t.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
    t.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
    t.f_pos_x = o.X;
    t.f_pos_y = o.Y;
    t.f_pos_z = o.Z;
    t.i_item_id = e;
    LogReportController_1.LogReportController.LogReport(t);
  }
  TrySendExploreToolGeneralUseLogData(e, t = 0, o = 0) {
    var r;
    var a;
    var n = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    if (n && n.InputLogReport && (n = "1026_" + e, r = new LogReportDefine_1.ExploreToolGeneralUseLogData(), a = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy, r.event_id = n, r.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId, r.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father, r.f_pos_x = a.X, r.f_pos_y = a.Y, r.f_pos_z = a.Z, r.i_skill_id = t, r.i_entity_configId = o, ModelManager_1.ModelManager.LogReportModel.GetTimerAssemblyLogData(n) || ModelManager_1.ModelManager.LogReportModel.SetTimerAssemblyLogData(n, new LogReportDefine_1.ExploreToolAssemblyLogData(e.toString())), LogReportController_1.LogReportController.UnitLogReport(r), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("LogReport", 37, "上报通用探索技能使用埋点", ["Id", e]);
    }
  }
}
exports.RouletteModel = RouletteModel;
//# sourceMappingURL=RouletteModel.js.map