"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteModel = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
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
const SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const RouletteDefine_1 = require("./Data/RouletteDefine");
class RouletteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.RelatedTagEntityHandle = undefined;
    this.RelatedTagIdPriorityList = [];
    this.RelatedTagIdExistPriorityList = [];
    this.cB_ = new Map();
    this.uB_ = undefined;
    this.dB_ = 0;
    this.mB_ = [];
    this.Bcc = undefined;
    this.kcc = [];
    this.qcc = [];
    this.H0o = 0;
    this.j0o = 0;
    this.fB_ = [];
    this.OnSettingExploreSkillIdList = [];
    this.UnlockExploreSkillDataMap = new Map();
    this.w8_ = [];
    this.W0o = (e, t) => e.SortId - t.SortId;
    this.Occ = [];
    this.K0o = new Map();
    this.UnlockFunctionDataMap = new Map();
    this.Q0o = (e, t) => e.SortId - t.SortId;
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
    this.zJu = new Map();
    this.CurrentEquipItemId = 0;
    this.XPn = new InputKeyDisplayData_1.InputKeyDisplayData();
    this.GetRouletteActionName = {
      [1]: InputMappingsDefine_1.actionMappings.幻象探索选择界面,
      2: InputMappingsDefine_1.actionMappings.轮盘2
    };
  }
  IsExploreRouletteOpen(e = false) {
    if (!ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(206)?.HasAnyTag(this.GetExploreRouletteBanTagIds()) && ModelManager_1.ModelManager.LevelFuncFlagModel.GetFuncFlagEnable(1)) {
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
    this.Y0o();
    this.gB_();
    this.Gcc();
    this.AddEvents();
    return !(this.OnSettingExploreSkillIdList.length = 0);
  }
  OnClear() {
    this.RemoveEvents();
    return true;
  }
  GetExploreRouletteBanTagIds() {
    var e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreRouletteConfig();
    var t = new Array();
    if (e.length !== 0) {
      for (const r of e[0].BanTags) {
        var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r);
        if (i) {
          t.push(i);
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
  gB_() {
    this.cB_.clear();
    this.RelatedTagIdPriorityList.length = 0;
    this.RelatedTagIdExistPriorityList.length = 0;
    var e = [];
    for (const r of ConfigManager_1.ConfigManager.RouletteConfig.GetAllReplaceConfig()) {
      for (const o of r.TagsInForce) {
        var t;
        var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o);
        if (i) {
          t = {
            TagId: i,
            SortId: r.Priority,
            ReplaceId: r.Id
          };
          e.push(t);
          this.cB_.set(i, r.Id);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Phantom", 37, "[ExploreRoulette] 探索工具轮盘禁用Tag不存在,请检查配置", ["tagName", o]);
        }
      }
    }
    e.sort((e, t) => e.SortId - t.SortId);
    for (const n of e) {
      this.RelatedTagIdPriorityList.push(n.TagId);
      this.RelatedTagIdExistPriorityList.push(false);
    }
  }
  ActiveReplaceConfig(t) {
    t = ModelManager_1.ModelManager.RouletteModel.cB_.get(t);
    if (this.uB_ !== t) {
      this.uB_ = t;
      var i = ConfigManager_1.ConfigManager.RouletteConfig.GetReplaceConfigById(t);
      if (i.RouletteSkillIdList.length !== RouletteDefine_1.ROULETTE_EXPLORE_IN_USE) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Phantom", 37, "[ExploreRoulette] 替换配置探索技能数量错误", ["ReplaceId", t]);
        }
      } else {
        this.mB_.length = 0;
        this.mB_.push(...i.RouletteSkillIdList);
        this.mB_.push(0);
        let e = i.RouletteItemId;
        if (!!e && !(ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) > 0)) {
          e = 0;
        }
        ControllerHolder_1.ControllerHolder.RouletteController.SaveCurrentRouletteData(undefined, undefined, e);
        if (this.ExploreSkillIdListServer.includes(this.H0o)) {
          this.dB_ = this.H0o;
        } else {
          t = this.w8_[0];
          this.dB_ = t;
        }
        t = i.ReplaceSkillId;
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(t);
        ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(t, undefined, true);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "[ExploreRoulette] 进入替换模式", ["ReplaceId", this.uB_], ["ReplaceSkillId", t], ["RestoreSkillId", this.dB_]);
        }
      }
    }
  }
  DisActiveReplaceConfig() {
    var e;
    if (this.uB_) {
      this.uB_ = undefined;
      if (e = this.dB_) {
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e);
        ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(e, undefined, true);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "[ExploreRoulette] 退出替换模式", ["RestoreSkillId", e]);
      }
      this.dB_ = 0;
    }
  }
  IsExploreRouletteReplace() {
    return !!this.uB_;
  }
  Gcc() {
    this.kcc.length = 0;
    for (const e of ConfigManager_1.ConfigManager.RouletteConfig.GetAllFuncReplaceConfig()) {
      this.kcc.push(e.InstSubType);
    }
  }
  TryActiveFunctionRouletteReplaceConfig(e) {
    var t;
    if (this.kcc.includes(e)) {
      t = (e = ConfigManager_1.ConfigManager.RouletteConfig.GetFuncReplaceConfig(e)).Id;
      if (this.Bcc !== t) {
        this.Bcc = t;
        if (e.FuncMenuIdList.length !== RouletteDefine_1.ROULETTE_FUNCTION_IN_USE) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Phantom", 37, "[FunctionRoulette] 替换配置功能轮盘Id数量错误", ["ReplaceId", t]);
          }
        } else {
          this.qcc.length = 0;
          this.qcc.push(...e.FuncMenuIdList);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Phantom", 37, "[FunctionRoulette] 功能轮盘进入替换模式", ["ReplaceId", this.Bcc]);
          }
        }
      }
    } else {
      this.DisActiveFunctionRouletteReplaceConfig();
    }
  }
  DisActiveFunctionRouletteReplaceConfig() {
    if (this.Bcc) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "[FunctionRoulette] 功能轮盘退出替换模式", ["LastReplaceId", this.Bcc]);
      }
      this.Bcc = undefined;
    }
  }
  IsFunctionRouletteReplace() {
    return !!this.Bcc;
  }
  get ExploreSkillIdList() {
    if (this.IsExploreRouletteReplace()) {
      return this.mB_;
    } else {
      return this.fB_;
    }
  }
  get ExploreSkillIdListServer() {
    return this.fB_;
  }
  set CurrentExploreSkillId(e) {
    if (this.H0o !== e) {
      this.j0o = this.H0o;
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
  z0o(e) {
    this.fB_ = e;
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
  GetLastSkillId() {
    if (this.j0o !== 0) {
      return this.j0o;
    } else if (this.w8_.length === 0) {
      return 0;
    } else {
      return this.w8_[0];
    }
  }
  GetExploreDataBySkillId(e) {
    if (this.UnlockExploreSkillDataMap.has(e)) {
      return this.UnlockExploreSkillDataMap.get(e);
    }
  }
  UnlockExploreSkill(e, t = true) {
    var i = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    if (i.SkillType !== 2 && i.SkillType !== 3 && (this.UnlockExploreSkillDataMap.set(e, i), i.SkillType === 1 && this.w8_.push(e), t)) {
      this.TryAddRedDotItem(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddExploreVisionSkill, e);
    }
  }
  CreateAllUnlockExploreSkill(e) {
    this.UnlockExploreSkillDataMap.clear();
    this.w8_.length = 0;
    for (const t of e) {
      this.UnlockExploreSkill(t, false);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 37, "设置当前解锁的探索技能", ["技能列表", e]);
    }
  }
  efo() {
    var e = [];
    for (const r of this.w8_) {
      var t = this.UnlockExploreSkillDataMap.get(r);
      var i = new RouletteDefine_1.AssemblyExploreGridData();
      i.GridType = 0;
      i.IconPath = t.BackGround;
      i.Name = t.Name;
      i.Id = r;
      i.SortId = t.SortId;
      e.push(i);
    }
    e.sort(this.W0o);
    return e;
  }
  GetDefaultExploreSkillIdList() {
    var t = new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
    const i = [];
    this.UnlockExploreSkillDataMap.forEach((e, t) => {
      if (e.AutoFill) {
        i.push([t, e.SortId]);
      }
    });
    i.sort((e, t) => e[1] - t[1]);
    var r = Math.min(i.length, t.length);
    for (let e = 0; e < r; e++) {
      t[e] = i[e][0];
    }
    return t;
  }
  get FunctionIdListServer() {
    return this.Occ;
  }
  get FunctionIdList() {
    if (this.IsFunctionRouletteReplace()) {
      return this.qcc;
    } else {
      return this.Occ;
    }
  }
  SetFunctionIdList(e) {
    this.Occ = e;
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
    if (this.UnlockFunctionDataMap.has(e) && (this.UnlockFunctionDataMap.delete(e), (e = this.Occ.indexOf(e)) >= 0)) {
      this.Occ[e] = 0;
    }
  }
  ifo() {
    var e;
    var t;
    var i;
    var r = [];
    for ([e, t] of this.UnlockFunctionDataMap.entries()) {
      if (t.ShowInAssembly) {
        (i = new RouletteDefine_1.AssemblyFunctionGridData()).GridType = 1;
        i.IconPath = t.FuncMenuIconPath;
        i.Name = t.FuncName;
        i.Id = e;
        i.SortId = t.FuncMenuSequence;
        r.push(i);
      }
    }
    r.sort(this.Q0o);
    return r;
  }
  GetDefaultFunctionIdList() {
    var t = new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
    const i = [];
    this.UnlockFunctionDataMap.forEach((e, t) => {
      if (e.AutoEquip) {
        i.push([t, e.FuncMenuSequence]);
      }
    });
    i.sort((e, t) => e[1] - t[1]);
    var r = Math.min(i.length, t.length);
    for (let e = 0; e < r; e++) {
      t[e] = i[e][0];
    }
    return t;
  }
  SetOtherIdList(e, t) {
    this.zJu.set(e, t);
  }
  GetOtherIdList(e) {
    return this.zJu.get(e) ?? [];
  }
  CB_(e) {
    var t = this.rfo();
    this.CurrentEquipItemId = e;
    var e = this.rfo();
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSpecialItemUpdate, this.CurrentEquipItemId);
    } else if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSpecialItemUpdate, undefined);
    }
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
  sfo() {
    var e = [];
    for (const o of ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(13)) {
      var t = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(o.GetConfigId());
      if (t && t.SpecialItemType === 0) {
        (t = new RouletteDefine_1.AssemblyEquipItemGridData()).Id = o.GetConfigId();
        t.GridType = 2;
        t.Name = o.GetConfig().Name;
        t.ItemNum = o.GetCount();
        t.ItemType = 13;
        t.SortId = o.GetSortIndex();
        t.QualityId = o.GetQuality();
        e.push(t);
      }
    }
    var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("Roulette_EquipItem_ShowTypeList");
    for (const n of ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(1)) {
      var r = n.GetConfig().ItemBuffType;
      if (i.includes(r)) {
        (r = new RouletteDefine_1.AssemblyEquipItemGridData()).Id = n.GetConfigId();
        r.GridType = 2;
        r.Name = n.GetConfig().Name;
        r.ItemNum = n.GetCount();
        r.ItemType = 1;
        r.SortId = n.GetSortIndex();
        r.QualityId = n.GetQuality();
        e.push(r);
      }
    }
    return e;
  }
  afo() {
    if (this.IsEquipItemSelectOn) {
      if (this.CurrentEquipItemId === 0) {
        ControllerHolder_1.ControllerHolder.RouletteController.SetLastSkillId();
      } else {
        ControllerHolder_1.ControllerHolder.RouletteController.RefreshExploreSkillButton();
      }
    }
  }
  rfo() {
    return !!this.CurrentEquipItemId && SpecialItemController_1.SpecialItemController.IsSpecialItem(this.CurrentEquipItemId);
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
    return !!this.IsEquipItemSelectOn && !!SpecialItemController_1.SpecialItemController.IsSpecialItem(this.CurrentEquipItemId) && !SpecialItemController_1.SpecialItemController.AllowReqUseSpecialItem(this.CurrentEquipItemId);
  }
  SaveRedDotItemList() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RouletteRefreshRedDot);
  }
  TryAddRedDotItem(e) {
    return e !== 0 && (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RouletteRefreshRedDot), true);
  }
  TryRemoveRedDotItem(e) {
    return e !== 0 && ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot, e);
  }
  CheckHasAnyRedDotItem() {
    for (const e of this.w8_) {
      if (ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot, e)) {
        return true;
      }
    }
    return false;
  }
  UpdateRouletteData(r) {
    if (r.length === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "当前不存在保存的轮盘数据");
      }
    } else {
      let e = r[0]?.KHn;
      e = e || new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
      this.z0o(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "探索技能列表", ["Id", e]);
      }
      let t = r[0]?.QHn;
      if (t === undefined) {
        t = 0;
      }
      this.CB_(t);
      this.afo();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "装配道具", ["Id", t]);
      }
      let i = r[1]?.KHn;
      i = i || new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
      this.SetFunctionIdList(i);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "功能轮盘列表", ["Id", i]);
      }
      for (let t = 0; t < r.length; t++) {
        if (!(t < 2)) {
          let e = r[t]?.KHn;
          e = e || new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
          this.SetOtherIdList(t, e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Phantom", 37, "其他轮盘列表", ["Id", e], ["Type", t]);
          }
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRouletteSaveDataChange);
    }
  }
  GetRouletteGridId(e, t, i) {
    switch (t) {
      case 0:
        return (i ? this.ExploreSkillIdList : this.ExploreSkillIdListServer)[e];
      case 1:
        return (i ? this.FunctionIdList : this.FunctionIdListServer)[e];
      case 2:
        return this.CurrentEquipItemId;
    }
  }
  CreateAssemblyGridData() {
    var e = new Map();
    e.set(0, this.efo());
    e.set(1, this.ifo());
    e.set(2, this.sfo());
    return e;
  }
  CreateTempAssemblyIdListData(e, t, i) {
    var r = new Map();
    r.set(0, Array.from(e));
    r.set(1, Array.from(t));
    r.set(2, [i]);
    return r;
  }
  CreateDefaultAssemblyData(e) {
    return this.CreateTempAssemblyIdListData(this.GetDefaultExploreSkillIdList(), this.GetDefaultFunctionIdList(), e ?? 0);
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
    var i = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    const r = [];
    i.Authorization.forEach((e, t) => {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) > 0) {
        r.push([t, e]);
      }
    });
    t.o_authorization = r;
    t.i_explore_tool_id = e;
    LogReportController_1.LogReportController.LogReport(t);
  }
  SendExploreToolEquipLogData(e, t, i) {
    var r = new LogReportDefine_1.ExploreToolEquipLogData();
    var o = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    const n = [];
    o.Authorization.forEach((e, t) => {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) > 0) {
        n.push([t, e]);
      }
    });
    r.o_authorization = n;
    r.i_explore_tool_id = e;
    r.i_operation = t;
    if (i !== undefined) {
      r.i_item_id = i;
    }
    LogReportController_1.LogReportController.LogReport(r);
  }
  SendExploreToolItemUseLogData(e) {
    var t = new LogReportDefine_1.ExploreToolItemUseLogData();
    var i = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
    t.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
    t.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
    t.f_pos_x = i.X;
    t.f_pos_y = i.Y;
    t.f_pos_z = i.Z;
    t.i_item_id = e;
    LogReportController_1.LogReportController.LogReport(t);
  }
}
exports.RouletteModel = RouletteModel;
//# sourceMappingURL=RouletteModel.js.map