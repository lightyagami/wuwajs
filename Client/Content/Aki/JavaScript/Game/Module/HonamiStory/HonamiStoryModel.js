"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryModel = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const HonamiStoryBackpackData_1 = require("./Data/HonamiStoryBackpackData");
const HonamiStoryEquipItemData_1 = require("./Data/HonamiStoryEquipItemData");
const HonamiStoryItemDataBase_1 = require("./Data/HonamiStoryItemDataBase");
const HonamiStoryPickupBoxData_1 = require("./Data/HonamiStoryPickupBoxData");
const HonamiStoryPlayerBackpackData_1 = require("./Data/HonamiStoryPlayerBackpackData");
const HonamiStoryPlayerData_1 = require("./Data/HonamiStoryPlayerData");
const HonamiStoryQuestData_1 = require("./Data/HonamiStoryQuestData");
const HonamiStoryQuickEquipAllManager_1 = require("./Data/HonamiStoryQuickEquipAllManager");
const HonamiStoryTechAreaData_1 = require("./Data/HonamiStoryTechAreaData");
const HonamiStoryTechNodeData_1 = require("./Data/HonamiStoryTechNodeData");
const HonamiStoryWeaponData_1 = require("./Data/HonamiStoryWeaponData");
const HonamiStoryWeaponSuitData_1 = require("./Data/HonamiStoryWeaponSuitData");
const HonamiStoryGamepadLogicController_1 = require("./GamepadLogic/HonamiStoryGamepadLogicController");
const HonamiStoryController_1 = require("./HonamiStoryController");
const HonamiStoryDefine_1 = require("./HonamiStoryDefine");
const HonamiStoryUtil_1 = require("./HonamiStoryUtil");
class HonamiStoryModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ActivityId = 0;
    this.QuickAllManager = new HonamiStoryQuickEquipAllManager_1.HonamiStoryQuickEquipAllManager();
    this.CurBackpackLogicController = undefined;
    this.pkm = undefined;
    this.PickUpItemDataQueue = [];
    this.PickUpTime = 0;
    this.IsPickingUp = false;
    this.PickedEntityId = new Set();
    this.NormalRotation = Rotator_1.Rotator.Create(0, 0, 0).ToUeRotator();
    this.TransRotation = Rotator_1.Rotator.Create(0, 90, 0).ToUeRotator();
    this.IsLastPickUpViewDirty = false;
    this.CanSafeLeave = false;
    this.CacheShowSafeLeaveUpdate = false;
    this.PollutionLevel = 0;
    this.PollutionMaxLevel = 0;
    this.PollutionStarTime = 0;
    this.PollutionLevelMap = undefined;
    this.PollutionWarningLevel = 0;
    this.PollutionDangerLevel = 0;
    this.MonsterBaseEnhanceLevel = 0;
    this.DangerLevel = 0;
    this.MonsterLevelSafeOffset = 0;
    this.MonsterLevelDangerOffset = 0;
    this.ScanMarkId = undefined;
    this.ScanMarkItemIds = new Set();
    this.CurrentUnlockFogId = 0;
    this.CurAreaId = 0;
    this.mwm = undefined;
    this.fwm = undefined;
    this.CNe = undefined;
    this.PlayerData = HonamiStoryPlayerData_1.HonamiStoryPlayerData.Create();
    this.gfd = undefined;
    this.Lko = new Map();
    this.LastRecordRevenue = 0;
    this.aLm = 0;
    this.Ccm = undefined;
    this._5d = new Map();
    this.gzd = new Map();
    this.CurrentSelectNode = undefined;
    this.CurrentSelectNodeItem = undefined;
    this.RoleParentMap = new Map();
    this.ItemDataMap = new Map();
    this.WeaponSuitMap = new Map();
    this.AddLevel = [-1, -1];
    this.CurTrackTaskData = undefined;
    this.yAm = new Map();
    this.Cfd = new Map();
    this.Ugm = (t, o) => {
      var i;
      var e;
      if (t.IsLock() !== o.IsLock()) {
        if (t.IsLock()) {
          return -1;
        } else {
          return 1;
        }
      } else if ((i = t.GetGridHeight() * t.GetGridWidth()) != (e = o.GetGridHeight() * o.GetGridWidth())) {
        return e - i;
      } else if (t.GetSubType() !== o.GetSubType()) {
        return o.GetSubType() - t.GetSubType();
      } else if (t.GetQuality() !== o.GetQuality()) {
        return o.GetQuality() - t.GetQuality();
      } else if (t.GetItemId() !== o.GetItemId()) {
        return t.GetItemId() - o.GetItemId();
      } else {
        return t.GetIncId() - o.GetIncId();
      }
    };
    this.xgm = (t, o) => t.IsLock() !== o.IsLock() ? t.IsLock() ? -1 : 1 : t.GetSubType() !== o.GetSubType() ? o.GetSubType() - t.GetSubType() : t.GetQuality() !== o.GetQuality() ? o.GetQuality() - t.GetQuality() : t.GetItemId() !== o.GetItemId() ? t.GetItemId() - o.GetItemId() : t.GetIncId() - o.GetIncId();
  }
  OnInit() {
    this.CNe = undefined;
    this.ItemDataMap.clear();
    this.vJc();
    return true;
  }
  OnClear() {
    this.r2m();
    return true;
  }
  vJc() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("HonamiStoryBackpackView", HonamiStoryController_1.HonamiStoryController.CanOpenBackpack, "HonamiStoryController.CanOpenView");
    UiManager_1.UiManager.AddOpenViewCheckFunction("HonamiStoryPickUpBackpackView", HonamiStoryController_1.HonamiStoryController.CanOpenBackpack, "HonamiStoryController.CanOpenView");
    UiManager_1.UiManager.AddOpenViewCheckFunction("HonamiStoryPickUpMobileView", HonamiStoryController_1.HonamiStoryController.CanOpenBackpack, "HonamiStoryController.CanOpenView");
  }
  r2m() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("HonamiStoryBackpackView", HonamiStoryController_1.HonamiStoryController.CanOpenBackpack);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("HonamiStoryPickUpBackpackView", HonamiStoryController_1.HonamiStoryController.CanOpenBackpack);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("HonamiStoryPickUpMobileView", HonamiStoryController_1.HonamiStoryController.CanOpenBackpack);
  }
  OnLeaveLevel() {
    this.CurTrackTaskData = undefined;
    this.CanSafeLeave = false;
    this.CacheShowSafeLeaveUpdate = false;
    this.PollutionLevel = 0;
    this.PollutionMaxLevel = 0;
    this.PollutionStarTime = 0;
    this.PollutionLevelMap?.clear();
    this.PollutionWarningLevel = 0;
    this.PollutionDangerLevel = 0;
    this.PollutionLevelMap = undefined;
    this.MonsterBaseEnhanceLevel = 0;
    this.DangerLevel = 0;
    ModelManager_1.ModelManager.MapModel.ClearHonamiScanMarkInfo();
    return true;
  }
  SetActivityData(t) {
    this.CNe = t;
  }
  GetActivityData(t = true) {
    if (this.CNe) {
      return this.CNe;
    }
    if (t && Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "HonamiStoryActivityData is undefined");
    }
  }
  GetPlayerData() {
    return this.PlayerData;
  }
  InitActivityInfo(t, o) {
    this.ActivityId = t;
    this.Uan(t, o.T$d);
    this.InitBackPackInfo(o.T$d.$md);
    this.f5d();
    this.RefreshTalentInfos(o.kMm);
    this.Klm(o.y4d);
  }
  UpdateActivityInfo(t, o) {
    this.Tff(t, o.T$d);
    this.UpdateBackPackInfo(o.T$d.$md);
    this.RefreshTalentInfos(o.kMm);
    this.Klm(o.y4d);
  }
  Klm(t) {
    this.PlayerData.SetLifeSupportLevel(t);
  }
  Uan(t, o) {
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "InitPlayerBagInfo 无效playerInfo");
      }
    } else {
      this.gfd = new HonamiStoryPlayerBackpackData_1.HonamiStoryPlayerBackpackData();
      this.gfd.Init(o);
      for (const e of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryWeaponConfigList(t)) {
        var i = new HonamiStoryWeaponData_1.HonamiStoryWeaponData(e.Id);
        this.Lko.set(e.Id, i);
      }
      this.UpdateWeaponDataList(o.M4d);
    }
  }
  Tff(t, o) {
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "InitPlayerBagInfo 无效playerInfo");
      }
    } else {
      this.gfd.RefreshEquipInfo(o.O$d);
      if (o.Wmd) {
        this.gfd.RefreshGridItemInfo(o.Wmd.k$d);
      }
      for (const e of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryWeaponConfigList(t)) {
        var i = new HonamiStoryWeaponData_1.HonamiStoryWeaponData(e.Id);
        this.Lko.set(e.Id, i);
      }
      this.UpdateWeaponDataList(o.M4d);
    }
  }
  UpdateRoleList(t) {
    this.gfd.RefreshRoleInfo(t);
  }
  UpdateRoleByPosition(t, o) {
    this.gfd.RefreshRoleInfoByPosition(t, o);
  }
  UpdateWeaponByPosition(t, o) {
    this.gfd.RefreshWeaponInfoByPosition(t, o);
  }
  UpdatePlayerBackPack(t) {
    this.gfd.UpdateByContext(t.G$d);
  }
  GetPlayerBackpackData() {
    return this.gfd;
  }
  GetAllRoleIdList() {
    var t = [];
    for (const o of this.gfd.GetRoleEquipDataList()) {
      t.push(o.GetRoleId());
    }
    return t;
  }
  GetRoleItemDataByPosition(t) {
    return this.gfd.GetRoleItemDataByPosition(t);
  }
  GetRoleEquipDataByPosition(t) {
    return this.gfd.GetRoleEquipDataByPosition(t);
  }
  GetRoleEquipDataByRoleId(t) {
    return this.gfd.GetRoleEquipDataByRoleId(t);
  }
  GetEquipItemDataByIncId(t) {
    for (const i of this.gfd.GetRoleEquipDataList()) {
      for (const e of i.GetSlotList()) {
        var o = e.GetItemData();
        if (o && o.GetIncId() === t) {
          return o;
        }
      }
    }
  }
  GetWeaponTypeList() {
    var t = new Set();
    var o = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    for (const i of this.Lko.values()) {
      if (!o || this.GetWeaponEquipState(i.WeaponId) !== undefined) {
        t.add(i.WeaponType);
      }
    }
    return Array.from(t);
  }
  GetWeaponDataListByType(t) {
    var o = [];
    for (const i of this.Lko.values()) {
      if (i.WeaponType === t) {
        o.push(i);
      }
    }
    return o;
  }
  UpdateWeaponDataList(t) {
    for (const i of t) {
      var o = this.GetWeaponData(i);
      if (o !== undefined) {
        o.SetUnlock(true);
      }
    }
  }
  GetWeaponData(t) {
    return this.Lko.get(t);
  }
  CheckSelectWeaponState(t, o) {
    o = o.GetWeaponId();
    if (o === 0) {
      return 1;
    } else if (t === o) {
      return 0;
    } else {
      return 2;
    }
  }
  GetWeaponEquipState(t) {
    if (t !== 0) {
      for (const o of this.gfd.GetRoleEquipDataList()) {
        if (o.GetWeaponId() === t) {
          return o;
        }
      }
    }
  }
  SetTotalRevenueInternal(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("HonamiStory", 78, "SetTotalRevenueInternal", ["value", t]);
    }
    this.aLm = t;
  }
  get TotalRevenue() {
    if (this.aLm >= HonamiStoryDefine_1.HONAMI_MAX_SHOW_REVENUE) {
      return HonamiStoryDefine_1.HONAMI_MAX_SHOW_REVENUE;
    } else {
      return this.aLm;
    }
  }
  GetInventory() {
    return this.Ccm;
  }
  SetInventory(t) {
    this.Ccm = t;
  }
  CheckIsNewInInventory() {
    return this.Ccm !== undefined && (!!this.Ccm.CheckIsNewInBackpack() || (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryWeaponUnlockSet) ?? new Set()).size > 0);
  }
  f5d() {
    this._5d.clear();
    this.gzd.clear();
    for (const i of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryTalentConfigList(this.ActivityId)) {
      var o = new HonamiStoryTechNodeData_1.HonamiStoryTechNodeData(i);
      this._5d.set(i.Id, o);
      let t = this.gzd.get(i.Area);
      if (!t) {
        (t = new HonamiStoryTechAreaData_1.HonamiStoryTechAreaData()).AreaId = i.Area;
        t.NodeIds = new Array();
      }
      t.NodeIds.push(i.Id);
      this.gzd.set(t.AreaId, t);
    }
  }
  CheckNodeCanActiveAndIsEnough(t) {
    if (!t) {
      return false;
    }
    if (t.GetNodeStatus !== 1) {
      return false;
    }
    t = t.GetConfig.ConsumeItems;
    if (t) {
      for (var [o, i] of t) {
        if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o) < i) {
          return false;
        }
      }
    }
    return true;
  }
  RefreshTalentInfos(t) {
    if (t) {
      for (const e of t) {
        var o = e.P4d;
        var i = e.H6n;
        this._5d.get(o).SetNodeStatus(i);
      }
    }
  }
  GetTechNodeData(t) {
    var o = this._5d.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryTechNodeData 无效Id", ["Id", t]);
    }
  }
  GetTechAreaData(t) {
    var o = this.gzd.get(t);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryTechAreaData 无效Id", ["Id", t]);
    }
  }
  get GetTechAreaDataList() {
    const i = [];
    this.gzd.forEach((t, o) => {
      if (o !== 0) {
        i.push(t);
      }
    });
    return i;
  }
  CheckCurrentTalentTreeNode() {
    let t = undefined;
    let o = undefined;
    var i = [];
    for (const e of this._5d.values()) {
      i.push(e);
    }
    i.sort((t, o) => t.GetConfig.IndexSortId - o.GetConfig.IndexSortId);
    for (const r of i) {
      if (r.GetNodeStatus !== 2) {
        if (r.GetNodeStatus === 1) {
          if (this.CheckNodeCanActiveAndIsEnough(r)) {
            this.CurrentSelectNode = r;
            return;
          }
          t = t || r;
        } else {
          o = o || r;
        }
      }
    }
    this.CurrentSelectNode = t || o;
    this.CurrentSelectNode ||= i[0];
  }
  GetFirstTechnologyNode() {
    let i = undefined;
    this._5d.forEach((t, o) => {
      if (t.GetConfig.Area === 0) {
        i = t;
      }
    });
    return i;
  }
  IsTechHasRedDot() {
    for (const t of this._5d.values()) {
      if (this.CheckNodeCanActiveAndIsEnough(t)) {
        return true;
      }
    }
    return false;
  }
  GetAllTechNodeDataList() {
    return Array.from(this._5d.values());
  }
  GetAllTechAreaDataList() {
    return Array.from(this.gzd.values());
  }
  GetAllActiveTechNodeDataList() {
    var t = [];
    for (const o of this._5d.values()) {
      if (o.GetNodeStatus === 2) {
        t.push(o);
      }
    }
    return t;
  }
  GetSubTaskBonusDataList() {
    let t = 1;
    for (const i of this.GetAllActiveTechNodeDataList()) {
      for (const e of i.GetConfig.EffectIds) {
        var o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetEffectConfig(e);
        if (o && o.EffectType === 5) {
          o = Number(o.Param[0]);
          t += o / 10000;
        }
      }
    }
    return t;
  }
  IsShopHasRedDot() {
    var t;
    return !!this.CNe && (t = this.CNe.ShopId, ModelManager_1.ModelManager.PayShopModel.CheckShopItemCheckFlag(t));
  }
  GetRandomDialogData(t) {
    var o = [];
    for (const e of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryOutDialogList(this.ActivityId)) {
      if (e.Type === t) {
        o.push(e);
      }
    }
    var i = o.length;
    if (i !== 0) {
      if (i === 1) {
        return o[0];
      } else {
        return o[Math.floor(Math.random() * i)];
      }
    }
  }
  GetWeaponSuitData(t) {
    var o;
    if (!this.WeaponSuitMap.has(t)) {
      o = new HonamiStoryWeaponSuitData_1.HonamiStoryWeaponSuitData(t);
      this.WeaponSuitMap.set(t, o);
    }
    return this.WeaponSuitMap.get(t);
  }
  GetParentRoleId(t) {
    var o;
    if (!this.RoleParentMap.has(t)) {
      o = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t);
      this.RoleParentMap.set(t, o);
    }
    return this.RoleParentMap.get(t);
  }
  CheckItemPlayerAlreadyPick(t) {
    var o = this.GetBackPackData(2);
    var i = this.GetPlayerBackpackData();
    return o.GetItemDataByInstanceId(t, false) !== undefined || i.CheckItemByIncId(t);
  }
  CreateHonamiStoryItemData(t, o = undefined) {
    let i = this.ItemDataMap.get(t.b9n);
    (i = i || this.Pfd(t.A$d)).Init(t);
    i.UpdatePositionInfo(o);
    this.ItemDataMap.set(i.GetIncId(), i);
    return i;
  }
  Pfd(t) {
    return new (ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryItem(t).ItemType === 1 ? HonamiStoryEquipItemData_1.HonamiStoryEquipItemData : HonamiStoryItemDataBase_1.HonamiStoryItemDataBase)();
  }
  GetItemData(t) {
    var o = this.ItemDataMap.get(t);
    if (o) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "ItemDataMap not found instanceId: " + t);
    }
  }
  RemoveItemData(t) {
    if (!this.GetItemData(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "ItemDataMap not found instanceId: " + t);
      }
    }
  }
  GetQuestDataListByQuestType(t) {
    var o;
    if (this.CNe) {
      if (!this.yAm.has(t)) {
        if (t === 1) {
          (o = []).push(new HonamiStoryQuestData_1.HonamiStoryMainQuestData());
          this.yAm.set(t, o);
        } else if (t === 2) {
          o = this.CNe.GetSubQuestTaskDataList();
          this.yAm.set(t, o);
        }
      }
      return this.yAm.get(t);
    } else {
      return [];
    }
  }
  SetSubQuestTrack(t) {
    var o;
    var i;
    if (t.TaskType !== 2) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("HonamiStory", 78, "SetSubQuestTrack 任务类型错误: " + t.Id);
      }
    } else if (t.IsFinished()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("HonamiStory", 78, "SetSubQuestTrack 任务已结束: " + t.Id);
      }
    } else {
      o = this.CurTrackTaskData?.Id === t.Id;
      i = this.CurTrackTaskData?.DoMapTrack(false);
      if (this.CurTrackTaskData && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("HonamiStory", 78, `SetSubQuestTrack 取消追踪任务${i ? "成功" : "失败"}: ${MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.CurTrackTaskData.GetNameKey())}`);
      }
      if (i) {
        this.CurTrackTaskData = undefined;
      }
      if (!o) {
        i = t.DoMapTrack(true);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("HonamiStory", 78, `SetSubQuestTrack 设置追踪任务${i ? "成功" : "失败"}: ${MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.GetNameKey())}`);
        }
        if (i) {
          this.CurTrackTaskData = t;
        }
      }
    }
  }
  InitSubQuestTrack() {
    if (!this.CurTrackTaskData || this.CurTrackTaskData.IsFinished()) {
      var t = this.GetQuestDataListByQuestType(2);
      if (t !== undefined && !(t.length <= 0)) {
        for (const o of t) {
          if (!o.IsFinished()) {
            this.SetSubQuestTrack(o);
            return;
          }
        }
      }
    }
  }
  InitBackPackInfoList(t) {
    for (const o of t) {
      this.InitBackPackInfo(o);
    }
  }
  InitBackPackInfo(o) {
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "InitBackPackInfo 无效bagInfo");
      }
    } else if (o.Vmd === 1) {
      const t = new HonamiStoryBackpackData_1.HonamiStoryBackpackData();
      this.SetInventory(t);
      t.Init(o);
    } else {
      let t = this.GetBackPackData(o.Vmd, true);
      if (t === undefined) {
        t = new (o.Vmd !== 3 ? HonamiStoryBackpackData_1.HonamiStoryBackpackData : HonamiStoryPickupBoxData_1.HonamiStoryPickupBoxData)();
        this.Cfd.set(o.Vmd, t);
      } else {
        t.ClearBackpack();
      }
      t.Init(o);
    }
  }
  UpdateBackPackInfo(o) {
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "InitBackPackInfo 无效bagInfo");
      }
    } else if (o.Vmd === 1) {
      if (this.Ccm === undefined) {
        const t = new HonamiStoryBackpackData_1.HonamiStoryBackpackData();
        this.SetInventory(t);
        t.Init(o);
      } else {
        this.Ccm.Init(o);
      }
    } else {
      let t = this.GetBackPackData(o.Vmd, true);
      if (t === undefined) {
        t = new (o.Vmd !== 3 ? HonamiStoryBackpackData_1.HonamiStoryBackpackData : HonamiStoryPickupBoxData_1.HonamiStoryPickupBoxData)();
        this.Cfd.set(o.Vmd, t);
      } else {
        t.ClearBackpack();
      }
      t.Init(o);
    }
  }
  GetSkillDescMode() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySkillDescMode) ?? false;
  }
  SetSkillDescMode(t) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySkillDescMode, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStorySkillDescModeChange, t);
  }
  RemoveBackPack(t) {
    var o = this.GetBackPackData(t);
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "RemoveBackPack 无效backpackId: " + t);
      }
    } else {
      o.ClearBackpack();
      this.Cfd.delete(t);
    }
  }
  UpdateBackpackInfo(t) {
    for (const i of t.N$d) {
      var o = this.GetBackPackData(i.Vmd);
      o.SetCapacity(i.rrm);
      o.Update(i.k$d);
    }
  }
  UpdateBackpackSize(t) {
    for (var [o, i] of Object.entries(t)) {
      o = Number(o);
      this.GetBackPackData(o)?.SetCapacity(i);
    }
  }
  UpdateBackPackContext(t) {
    for (const e of t) {
      var o;
      var i = e.Qmd;
      if (i === 4) {
        this.UpdatePlayerBackPack(e);
      } else {
        o = e.G$d;
        if (i === 1) {
          this.GetInventory()?.UpdateByContext(o);
        } else {
          this.GetBackPackData(i).UpdateByContext(o);
        }
      }
    }
  }
  GetBackPackData(t, o = false) {
    var i;
    if (t === 1) {
      i = this.GetInventory();
      if (!o && !i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("HonamiStory", 58, "GetBackPackData 无效backpackId: " + t);
        }
      }
      return i;
    } else if ((i = this.Cfd.get(t)) !== undefined) {
      return i;
    } else {
      if (!o) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("HonamiStory", 58, "GetBackPackData 无效backpackId: " + t);
        }
      }
      return;
    }
  }
  IsPickUpViewOpened() {
    return UiManager_1.UiManager.GetViewByName("HonamiStoryPickUpBackpackView") !== undefined || UiManager_1.UiManager.GetViewByName("HonamiStoryPickUpMobileView") !== undefined;
  }
  TryPickUp(t, o) {
    var i = this.GetBackPackData(2);
    t.SetBackpackWidth(i.GetWidthCount());
    if (this.IsPickUpViewOpened()) {
      this.IsPickingUp = false;
      if (i = o.CheckGetComponent(209)) {
        i.SetInteractionState(true, "HonamiStoryPickUp");
      }
      this.o2m();
      this.PickedEntityId.clear();
    } else if (this.IsPickingUp) {
      for (const e of this.PickUpItemDataQueue) {
        if (e.ItemData.GetIncId() === t.GetIncId()) {
          return;
        }
      }
      this.PickUpItemDataQueue.push({
        ItemData: t,
        EntitySelf: o
      });
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("HonamiStory", 77, "WHJ Get Queue " + this.PickUpItemDataQueue.length);
      }
    } else {
      this.PickedEntityId.clear();
      this.IsPickingUp = true;
      this.PickUpItemDataQueue.push({
        ItemData: t,
        EntitySelf: o
      });
      this.OnPickUpEnd();
    }
  }
  OnPickUpEnd() {
    if (this.PickUpItemDataQueue.length === 0) {
      this.IsPickingUp = false;
      this.o2m();
    } else {
      const o = this.PickUpItemDataQueue.shift();
      var t;
      if (o) {
        if ((t = Time_1.Time.Now) - this.PickUpTime < 200) {
          t = Math.max(200 - (t - this.PickUpTime), TimerSystem_1.MIN_TIME);
          TimerSystem_1.TimerSystem.Delay(() => {
            this.n2m(o);
          }, t);
        } else {
          this.n2m(o);
        }
      } else {
        this.IsPickingUp = false;
        this.o2m();
      }
    }
  }
  async n2m(t) {
    var o = await this.DoPickUpLogic(t);
    this.PickUpTime = Time_1.Time.Now;
    if (!o) {
      if (o = t.EntitySelf.CheckGetComponent(209)) {
        o.SetInteractionState(true, "HonamiStoryPickUp");
      }
      this.PickUpItemDataQueue.unshift(t);
    }
    this.OnPickUpEnd();
  }
  async DoPickUpLogic(t) {
    var o = t.ItemData;
    var i = this.GetBackPackData(2);
    var i = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(i.GetEmptyGridSet(), o, i.GetWidthCount());
    o.SetIsDragCross(i.IsCross);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPickUpHonamiStoryItem, o);
    var t = t.EntitySelf;
    if (i.Position >= 0) {
      i = await this.PickUpFromWorld(o, i.Position);
      o.SetNewInBackpack(true);
      this.yPm(o);
      this.PickedEntityId.add(t.Id);
      return i;
    } else {
      if (o.GetItemType() === 1 && (await this.TryQuickEquipOnEmpty(o))) {
        o.SetNewInBackpack(true);
        this.yPm(o);
        this.PickedEntityId.add(t.Id);
      } else {
        if (i = t.CheckGetComponent(209)) {
          i.SetInteractionState(true, "HonamiStoryPickUp");
        }
        this.o2m();
        if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10102)) {
          ControllerHolder_1.ControllerHolder.FunctionController.OpenFunctionRelateView(10102);
        }
        this.PickedEntityId.clear();
      }
      return true;
    }
  }
  o2m() {
    for (const o of this.PickUpItemDataQueue) {
      var t = o.EntitySelf.CheckGetComponent(209);
      if (t) {
        t.SetInteractionState(true, "HonamiStoryPickUp");
      }
    }
    this.PickUpItemDataQueue.length = 0;
  }
  yPm(o) {
    var i = o.GetItemId();
    var e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryItem(i);
    if (e) {
      let t = -1;
      t = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryMainDungeon() ? HonamiStoryUtil_1.HonamiStoryUtil.GetDropQualityInMainQuest() : ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.DangerLevel).HightQuality;
      if (e.QualityId >= t) {
        UiManager_1.UiManager.OpenView("HonamiStoryNewTipsView", o);
      } else {
        ModelManager_1.ModelManager.ItemHintModel.AddItemToPriorInterfaceData(i, 1, e.QualityId);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "AddHonamiStoryItemNewGetTipsList 无效itemId: " + i);
    }
  }
  GetBackpackLogic() {
    return this.CurBackpackLogicController;
  }
  SetBackpackLogic(t) {
    if (this.CurBackpackLogicController) {
      this.CurBackpackLogicController.Destroy();
    }
    this.CurBackpackLogicController = t;
  }
  GetBackpackLogicState() {
    return this.CurBackpackLogicController.GetLogicState();
  }
  SetBackpackLogicState(t) {
    this.CurBackpackLogicController.SetLogicState(t);
  }
  ShowDiscardTips(t) {
    t = t.GetName();
    t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t);
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_DiscardItemTips", t);
  }
  GetInteractController() {
    return this.CurBackpackLogicController.GetInteractController();
  }
  GetCurrencyCount() {
    var t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(this.CNe.Id).OutCoinItemId;
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
  }
  QuickPickUpFromPickUpBox(t, o) {
    var i;
    var e;
    var r = this.GetBackPackData(2);
    if (r) {
      if ((i = this.CheckCanEquipOnEmpty(t)) !== -1) {
        HonamiStoryController_1.HonamiStoryController.RequestSwitchItem(t, undefined, o, i, 3, 4);
      } else {
        i = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(r.GetEmptyGridSet(), t, r.GetWidthCount());
        [r, e] = this.CheckCanEquipInstead(t);
        if (i.Position >= 0) {
          t.SetIsDragCross(i.IsCross);
          if (r === -1) {
            HonamiStoryController_1.HonamiStoryController.RequestSwitchItem(t, undefined, o, i.Position, 3, 2);
          } else {
            HonamiStoryController_1.HonamiStoryController.RequestEquipFromPickUpBox(t, e, r, i.Position);
          }
        } else if (t.GetItemType() === 2) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoEnoughSpace");
        } else {
          o = r >= 0 ? "HonamiStory_NoEnoughForQuickInstead" : "HonamiStory_NoEnoughSpace";
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(o);
        }
      }
    }
  }
  QuickEquipFromBackpack(t, o) {
    var i;
    var e;
    var r;
    return t.GetItemType() !== 2 && (e = this.CheckCanEquipOnEmpty(t), i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() ? 2 : 1, e !== -1 ? (HonamiStoryController_1.HonamiStoryController.RequestSwitchItem(t, undefined, o, e, i, 4), true) : ([e, r] = this.CheckCanEquipInstead(t), e !== -1 && (HonamiStoryController_1.HonamiStoryController.RequestSwitchItem(t, r, o, e, i, 4), true)));
  }
  async PickUpFromWorld(t, o) {
    if (t.GetItemType() === 2) {
      const i = await HonamiStoryController_1.HonamiStoryController.SendHonamiStoryPickUpItemRequest(2, t, o);
      return i;
    }
    this.SetQuickAllDirty();
    if (await this.TryQuickEquipOnEmpty(t)) {
      return true;
    }
    if (await this.TryQuickEquipInstead(t, o)) {
      return true;
    }
    const i = await HonamiStoryController_1.HonamiStoryController.SendHonamiStoryPickUpItemRequest(2, t, o);
    return i;
  }
  CheckCanEquipOnEmpty(t) {
    if (t.GetItemType() === 2) {
      return -1;
    }
    var o = t;
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 77, "获取道具类型出现错误");
      }
      return -1;
    }
    let i = undefined;
    let e = 0;
    for (const a of this.GetPlayerBackpackData().GetRoleEquipDataList()) {
      var r = a.CheckEquipOnEmpty(o);
      if (r > e) {
        e = r;
        i = a;
      }
    }
    return i?.GetNextEmptySlot() ?? -1;
  }
  async TryQuickEquipOnEmpty(t) {
    var o = this.CheckCanEquipOnEmpty(t);
    let i = false;
    if (o !== -1 && (this.SetQuickAllDirty(), this.GetBackPackData(3).PushItemData(t), i = await HonamiStoryController_1.HonamiStoryController.HonamiStoryPickAndEquipRequest(t, o))) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryPickUpAutoEquip, o);
    }
    return i;
  }
  CheckCanEquipInstead(t) {
    if (t.GetItemType() === 2) {
      return [-1, undefined];
    }
    var o = t;
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 77, "获取道具类型出现错误");
      }
      return [-1, undefined];
    }
    let i = 0;
    let e = -1;
    let r = undefined;
    for (const h of this.GetPlayerBackpackData().GetRoleEquipDataList()) {
      var [a, n, s] = h.CheckEquipInstead(o);
      if (n > i) {
        i = n;
        e = a;
        r = s;
      }
    }
    return [e, r];
  }
  async TryQuickEquipInstead(t, o) {
    var i;
    var [e, r] = this.CheckCanEquipInstead(t);
    var a = this.GetBackPackData(3);
    let n = false;
    if (e !== -1 && ((i = new Protocol_1.Aki.Protocol.B$d()).l9_ = 0, i.Gmd = false, t.UpdatePositionInfo(i), a.PushItemData(t), n = await HonamiStoryController_1.HonamiStoryController.RequestEquipFromPickUpBox(t, r, e, o))) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryPickUpAutoEquip, e);
    }
    return n;
  }
  SetItemIntoBag(t, o, i) {
    var e = this.GetBackPackData(i);
    if (!e) {
      return false;
    }
    var r = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(e.GetEmptyGridSet(), t, e.GetWidthCount());
    if (r.Position === -1) {
      return false;
    }
    for (const a of t.GetGridFillPositionByPosition(r.Position, r.IsCross)) {
      if (a >= e.GetCapacity()) {
        return false;
      }
    }
    t.SetIsDragCross(r.IsCross);
    HonamiStoryController_1.HonamiStoryController.RequestSwitchItem(t, undefined, -1, r.Position, o, i).then(() => {
      if (i === 3) {
        this.ShowDiscardTips(t);
      }
    });
    return true;
  }
  async SellSingleItem(t, o) {
    const i = {
      ItemData: t,
      BackpackType: o
    };
    if (t.IsLock()) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_ShowTips_CantSellLockItem");
      return false;
    }
    if (t.GetQuality() >= 4) {
      o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(384);
      const e = new CustomPromise_1.CustomPromise();
      o.FunctionMap.set(2, () => {
        e.SetResult(HonamiStoryController_1.HonamiStoryController.RequestHonamiStorySellItem([i]));
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
      return e.Promise;
    }
    return HonamiStoryController_1.HonamiStoryController.RequestHonamiStorySellItem([i]);
  }
  SetIsLastPickUpViewDirty(t) {
    this.IsLastPickUpViewDirty = t;
  }
  GetIsLastPickUpViewDirty() {
    return !!HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() && this.IsLastPickUpViewDirty;
  }
  SetQuickAllDirty(t = true) {
    this.QuickAllManager.SetDirty();
    if (t && this.GetBackpackLogic() !== undefined) {
      this.QuickAllRefresh();
      this.GetBackpackLogic().RefreshNeedQuickAll();
    }
  }
  QuickAllRefresh(t = false) {
    return this.QuickAllManager.Refresh(t);
  }
  QuickAllCheck(t = true) {
    if (this.QuickAllManager.GetDirty()) {
      this.QuickAllRefresh();
    }
    return this.GetPlayerBackpackData().GetPowerLevel(!t) < (t ? this.QuickAllManager.GetCurPowerLevel() : this.QuickAllManager.GetRealPowerLevel());
  }
  ApplyQuickAll() {
    if (this.QuickAllCheck()) {
      if (this.QuickAllManager.GetDirty()) {
        this.QuickAllRefresh();
      }
      this.QuickAllManager.ApplyQuickAll();
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_QuickEquip_BestAlready");
    }
  }
  QuickUnloadAllSlot() {
    var t = [];
    for (const h of this.GetPlayerBackpackData().GetRoleEquipDataList()) {
      for (const l of h.GetSlotList()) {
        var o = l.GetItemData();
        if (o) {
          t.push(o);
        }
      }
    }
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    var e = i ? 2 : 1;
    var r = this.GetBackPackData(e);
    if (r) {
      var a = new Set();
      var n = r.GetCapacity();
      for (const c of t) {
        var s = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(r.GetEmptyGridSet(), c, r.GetWidthCount(), a);
        if (!i && s.Position >= n) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoEnoughSpace");
          return;
        }
        if (s.Position === -1) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoEnoughSpace");
          return;
        }
        a.add(s.Position);
      }
      if (a.size !== t.length) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoEnoughSpace");
      } else {
        HonamiStoryController_1.HonamiStoryController.RequestHonamiStoryQuickUnloadAll(t, a, e);
      }
    }
  }
  GetSortContext(t, o) {
    var i;
    var e;
    var r;
    var a = new Protocol_1.Aki.Protocol.V$d();
    a.Qmd = t;
    for ([i, e] of o) {
      if (i.GetPosition() !== e.Position || e.IsCross !== i.GetIsCross()) {
        i.SetIsDragCross(e.IsCross);
        r = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(i, e.Position);
        a.G$d.push(r);
      }
    }
    if (a.G$d.length !== 0) {
      return a;
    }
  }
  SortBackpack() {
    var t = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() ? 2 : 1;
    var [t, o] = this.TrySort(t, true);
    var i = [];
    if (o) {
      i.push(o);
    }
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() && ([, o] = this.TrySort(3, false), o)) {
      i.push(o);
    }
    if (i.length > 0) {
      HonamiStoryController_1.HonamiStoryController.SendHonamiStoryBagOperateRequest(i).then(t => {
        if (t) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_SortSuccess");
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStorySortSuccess);
        }
      });
    } else if (!t) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_SortSuccess");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStorySortSuccess);
    }
  }
  TrySort(t, o) {
    var i = this.GetBackPackData(t);
    var e = i.GetWidthCount();
    var r = i.GetCapacity();
    var a = [];
    var n = [];
    for (const h of i.GetItemDataList()) {
      (h.GetItemType() === 2 ? n : a).push(h);
    }
    a.sort(this.xgm);
    n.sort(this.Ugm);
    var [i, s] = this.FirstSortBackpack(t, a, n, r, e);
    if (i) {
      return [false, s];
    } else {
      [i, s] = this.SecondSortBackpack(t, a, n, r, e);
      if (!i && s > 0) {
        if (o) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_CantSortBackpack", s);
        }
        return [true, undefined];
      } else {
        return [false, i];
      }
    }
  }
  FirstSortBackpack(t, o, i, e, r) {
    var a = new Set();
    for (let t = 0; t < e; t++) {
      a.add(t);
    }
    var n = new Map();
    for (const l of o) {
      var s = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(a, l, r);
      if (s.Position === -1) {
        return [false, undefined];
      }
      a.delete(s.Position);
      n.set(l, s);
    }
    for (const c of i) {
      var h = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(a, c, r);
      if (h.Position === -1) {
        return [false, undefined];
      }
      for (const S of c.GetGridFillPositionByPosition(h.Position, h.IsCross)) {
        a.delete(S);
      }
      n.set(c, h);
    }
    return [true, this.GetSortContext(t, n)];
  }
  SecondSortBackpack(t, o, i, e, r) {
    var a = new Set();
    for (let t = 0; t < e; t++) {
      a.add(t);
    }
    var n = new Map();
    let s = -1;
    let h = false;
    let l = 0;
    for (const v of i) {
      if (h) {
        l += v.GetGridHeight() * v.GetGridWidth();
      } else {
        var c = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(a, v, r);
        if (c.Position === -1) {
          h = true;
          l += v.GetGridHeight() * v.GetGridWidth();
        } else {
          for (const d of v.GetGridFillPositionByPosition(c.Position, c.IsCross)) {
            s = Math.max(s, d);
            a.delete(d);
          }
          n.set(v, c);
        }
      }
    }
    var S;
    var _ = new Set();
    if (!h) {
      var m;
      var y = e - (Math.floor((s + 1) / r) * r + ((s + 1) % r == 0 ? 0 : r));
      for (let t = 0; t < e; t++) {
        if (t < y || a.has(t - y)) {
          _.add(t);
        }
      }
      for ([, m] of n) {
        m.Position += y;
      }
    }
    for (const H of o) {
      if (h) {
        l += H.GetGridHeight() * H.GetGridWidth();
      } else if ((S = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(_, H, r)).Position === -1) {
        h = true;
        l += H.GetGridHeight() * H.GetGridWidth();
      } else {
        _.delete(S.Position);
        n.set(H, S);
      }
    }
    if (h) {
      return [undefined, l];
    }
    var u;
    var f = new Set();
    for ([, u] of n) {
      if (!f.has(u.Position)) {
        f.add(u.Position);
      }
    }
    return [this.GetSortContext(t, n), 0];
  }
  GetGamepadLogic() {
    this.pkm ||= new HonamiStoryGamepadLogicController_1.HonamiStoryGamepadLogicController();
    return this.pkm;
  }
  SetGamepadLogic(t) {
    this.pkm = t;
  }
  SetMainTaskLoadingData(t) {
    this.mwm = t;
  }
  SetGamePlayLoadingData(t) {
    this.fwm = t;
  }
  ClearCurLoadingData() {
    this.mwm = undefined;
    this.fwm = undefined;
  }
  GetCurLoadingData() {
    return this.mwm ?? this.fwm;
  }
  GetCurLoadViewName() {
    var o = this.GetCurLoadingData();
    if (o) {
      let t = undefined;
      var i = o.LoadingId && o.LoadingId > 0;
      var e = o.BtId && o.BtId > 0;
      var r = o.Timing && o.Timing > 0;
      if (i) {
        t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLoadingPerformConfigById(o.LoadingId);
      } else if (r) {
        t = e ? ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLoadingPerformConfigByBtAndTime(o.BtId, o.Timing) : ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLoadingPerformConfigListByTiming(o.Timing)[0];
      }
      if (t) {
        if (t.PerformType === 5) {
          return "HonamiStoryMainLoadingView";
        } else {
          return "HonamiStoryLoadingView";
        }
      }
    }
  }
}
exports.HonamiStoryModel = HonamiStoryModel;
//# sourceMappingURL=HonamiStoryModel.js.map