"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const DockyardItemBlockOriginalData_1 = require("./Dockyard/Base/DockyardItemBlockOriginalData");
const DockyardCageData_1 = require("./Dockyard/Cage/DockyardCageData");
const FishingPointData_1 = require("./Dockyard/FishingPoint/FishingPointData");
const FishingDefine_1 = require("./FishingDefine");
const FishingShipData_1 = require("./FishingShipData");
class FishingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.FishingReputationItemId = 0;
    this.FishingShipFixItem = 0;
    this.FishingShipFixCost = 0;
    this.NormalTechNodeMap = new Map();
    this.RoleTechNodeMap = new Map();
    this.AQ_ = undefined;
    this.FishingSlotCountTech = 0;
    this.FishingBagRedPercentage = 0;
    this.rzl = new Map();
    this.ozl = new Map();
    this.Nn_ = new Map();
    this.Vn_ = new Map();
    this.jn_ = new Map();
    this.C8_ = 0;
    this.Hn_ = new Map();
    this.nzl = new Map();
    this.gO_ = new Set([11, 10]);
    this.EffectType2TechIdsMap = new Map();
    this.Ux_ = 0;
    this.uh_ = new FishingShipData_1.FishingShipData();
    this.LocalSailingTime = 0;
    this.FishingItemHandBookDataMap = new Map();
    this.FishingItemHandBookRewardMap = new Map();
    this.FishingItemHandBookUnlockTraceList = [];
    this.RoleTalkIds = undefined;
    this.UnlockPort = [];
    this.CurrentShipSkin = 0;
    this.UnlockShipSkin = [];
  }
  SetFishingLevelUpInfo(e) {
    if (this.AQ_ === undefined) {
      this.AQ_ = e;
    } else {
      this.AQ_.CurrentLevel = e.CurrentLevel;
    }
  }
  GetFishingLevelUpInfo() {
    return this.AQ_;
  }
  ClearLastFishingExp() {
    this.AQ_ = undefined;
  }
  OnInit() {
    this.FishingReputationItemId = CommonParamById_1.configCommonParamById.GetIntConfig("FishingSailingExpItemId");
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("FishingShipFixCost");
    this.FishingShipFixItem = e[0];
    this.FishingShipFixCost = CommonParamById_1.configCommonParamById.GetIntConfig("FishingShipFixCostCount");
    this.C8_ = CommonParamById_1.configCommonParamById.GetIntConfig("FishingMaxBaitCount") ?? 0;
    this.FishingSlotCountTech = CommonParamById_1.configCommonParamById.GetIntConfig("FishingSlotCountTech") ?? 0;
    this.FishingBagRedPercentage = CommonParamById_1.configCommonParamById.GetIntConfig("FishingBagRedPercentage") ?? 0;
    this.Va_();
    return true;
  }
  Va_() {
    for (const i of ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechList()) {
      if (i.Type === FishingDefine_1.PLAYER_TECH_TYPE || i.Type === FishingDefine_1.PHOEBE_TECH_TYPE) {
        let e = this.RoleTechNodeMap.get(i.Type);
        e = e || [];
        var t = {
          ConfigId: i.Id,
          NodeType: i.Type,
          Area: i.Area,
          PreNode: i.PreNode
        };
        e.push(t);
        this.RoleTechNodeMap.set(i.Type, e);
      } else {
        let e = this.NormalTechNodeMap.get(i.Area);
        e = e || [];
        t = {
          ConfigId: i.Id,
          NodeType: i.Type,
          Area: i.Area,
          PreNode: i.PreNode
        };
        e.push(t);
        this.NormalTechNodeMap.set(i.Area, e);
      }
    }
  }
  GetFishingReputationLevelByItemCount(e) {
    let t = 1;
    for (const i of ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingReputation()) {
      if (e >= i.Exp && t <= i.Level) {
        t = i.Level;
      }
    }
    return t;
  }
  GetConfigMaxFishingReputationLevel() {
    let e = 0;
    for (const t of ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingReputation()) {
      if (e <= t.Level) {
        e = t.Level;
      }
    }
    return e;
  }
  szl(e, t) {
    var i = this.rzl.get(e) ?? new Map();
    for (const a of t) {
      var n = new DockyardCageData_1.DockyardCageData(a);
      i.set(a.s5n, n);
    }
    this.rzl.set(e, i);
  }
  SetCageDataMapFromServer(e) {
    this.rzl.clear();
    for (const n of Object.keys(e)) {
      var t = parseInt(n);
      var i = e[t].YT_;
      this.szl(t, i);
    }
  }
  AddCageDataFromServer(e, t) {
    var i = this.rzl.get(e) ?? new Map();
    i.set(t.s5n, new DockyardCageData_1.DockyardCageData(t));
    this.rzl.set(e, i);
  }
  GetDataByCage(e, t) {
    e = this.GetCageDataByConfigId(e);
    if (e) {
      return e.GetData(t);
    }
  }
  GetCageDataByConfigId(e) {
    var t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
    var t = this.rzl.get(t);
    if (t) {
      return t.get(e);
    }
  }
  GetCageDataList(e) {
    e = this.GetCageDataByConfigId(e);
    if (e) {
      return e.GetDataList();
    } else {
      return [];
    }
  }
  Or_(e) {
    var t = this.ozl.get(e.s5n) ?? new Map();
    for (const n of e.HT_) {
      var i = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(n);
      t.set(i.IncId, i);
    }
    this.ozl.set(e.s5n, t);
  }
  SetInteractData(e) {
    for (const t of e) {
      this.Or_(t);
    }
  }
  UpdateInteractData(e) {
    var t = this.ozl.get(e.s5n) ?? new Map();
    t?.clear();
    for (const n of e.HT_) {
      var i = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(n);
      t.set(i.IncId, i);
    }
    this.ozl.set(e.s5n, t);
  }
  GetDataByInteract(e, t) {
    e = this.ozl.get(e);
    if (e) {
      return e.get(t);
    }
  }
  GetDataMapByInteract(e) {
    return this.ozl.get(e);
  }
  SetAllFishingPointData(t) {
    this.Wn_();
    for (const r of Object.keys(t)) {
      var i = parseInt(r);
      var n = t[i].tb_;
      var a = t[i].ib_;
      let e = this.Vn_.get(i);
      if (!e) {
        e = new Set();
        this.Vn_.set(i, e);
      }
      for (const o of n) {
        this.WZl(i, e, o);
      }
      for (const s of a) {
        this.SetTempFishingPointData(i, s);
      }
    }
  }
  Wn_() {
    this.Nn_.clear();
    this.Vn_.clear();
    this.jn_.clear();
    this.Hn_.clear();
  }
  RefreshFishingPointData(e, t) {
    let i = this.Vn_.get(e);
    if (!i) {
      i = new Set();
      this.Vn_.set(e, i);
    }
    this.WZl(e, i, t);
  }
  WZl(e, t, i) {
    var n = i.A5n;
    let a = this.Nn_.get(n);
    if (!a) {
      (a = new FishingPointData_1.FishingPointData()).SceneId = e;
      t.add(n);
      this.Nn_.set(n, a);
      this.jn_.set(i.s5n, n);
    }
    a.Refresh(i);
    this.Qn_(n, a);
  }
  RemoveOneFishingPointData(e, t) {
    var i = t.A5n;
    var n = this.Nn_.get(i);
    if (n) {
      n.Refresh(t);
      this.Qn_(i, n);
    }
    var n = this.Nn_.delete(i);
    if (n) {
      if (n = this.Vn_.get(e)) {
        n.delete(i);
      }
      this.jn_.delete(t.s5n);
    }
  }
  Qn_(e, t) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (e?.Valid) {
      e.Entity.GetComponent(276)?.RefreshFishingPoint(t);
    }
  }
  GetFishingPointDataById(e) {
    e = this.jn_.get(e);
    if (e) {
      return this.Nn_.get(e);
    }
  }
  GetFishingPointEntityIdByConfigId(e) {
    return this.jn_.get(e) ?? 0;
  }
  GetFishingPointHaveFinishingIdByConfigId(e) {
    var e = this.jn_.get(e);
    return !e || !(e = this.Nn_.get(e)) || e.CurrentCount <= 0;
  }
  GetFishingPointDataByPbEntityId(e) {
    return this.Nn_.get(e);
  }
  GetAllFishingPointDataBySceneId(e) {
    var t = [];
    var e = this.Vn_.get(e);
    if (e) {
      for (const n of e.values()) {
        var i = this.Nn_.get(n);
        t.push(i);
      }
    }
    return t;
  }
  SetTempFishingPointData(e, t) {
    var i = MathUtils_1.MathUtils.LongToNumber(t.F4n);
    let n = this.Hn_.get(i);
    if (!n) {
      (n = new FishingPointData_1.TempFishingPointData()).SceneId = e;
      this.Hn_.set(i, n);
    }
    n.Refresh(t);
  }
  RemoveTempFishingPointData(e) {
    e = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    this.Hn_.delete(e);
  }
  GetTempFishingPointDataByCreatureDataId(e) {
    return this.Hn_.get(e);
  }
  GetTempFishingPointLimit() {
    return this.C8_;
  }
  GetTempFishingPointNum() {
    return this.Hn_.size;
  }
  SetFishingTechData(e) {
    this.nzl.clear();
    for (const n of e) {
      var t = n.b5n;
      for (const a of ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(t).Effect) {
        var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(a);
        if (i && this.gO_.has(i.Type)) {
          let e = this.EffectType2TechIdsMap.get(i.Type);
          if (!e) {
            e = new Set();
            this.EffectType2TechIdsMap.set(i.Type, e);
          }
          e.add(t);
        }
      }
      this.nzl.set(t, n);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh, n.b5n);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingRoleTechRefresh, 4);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingRoleTechRefresh, 5);
  }
  UpdateFishingTechData(e) {
    this.nzl.set(e.b5n, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingTechNodeRefresh, e.b5n);
  }
  GetFishingTechUnlock(e) {
    var t = this.nzl.get(e);
    return (!(ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(e).UnlockCondition > 0) || !!t?.CMs) && (t?.F6n ?? 0) > 0;
  }
  GetFishingTechUnlockByEffectType(e) {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechList();
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectByType(e);
    if (!(e.length <= 0)) {
      var i = e[0].Id;
      for (const n of t) {
        if (n.Effect.includes(i)) {
          return this.GetFishingTechUnlock(n.Id);
        }
      }
    }
    return false;
  }
  GetFishingCurrentLevelTechEffectByEffectType(e) {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechList();
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectByType(e);
    if (!(e.length <= 0)) {
      var i;
      var n = e[0].Id;
      for (const a of t) {
        if (a.Effect.includes(n)) {
          if ((i = this.nzl.get(a.Id)?.F6n ?? 0) <= 0) {
            return 0;
          } else {
            return a.Effect[i - 1];
          }
        }
      }
    }
    return 0;
  }
  get UnlockFishingTechCount() {
    let e = 0;
    for (var [, t] of this.nzl) {
      if (t.F6n > 0) {
        e += 1;
      }
    }
    return e;
  }
  get AllFishingTechCount() {
    return ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechList().length;
  }
  GetTechNodeCanLevelUp(e) {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(e);
    var i = this.nzl.get(e);
    if (i.F6n >= t.Effect.length || !this.GetNodePreNodeUnlock(e)) {
      return false;
    }
    var n;
    var a;
    var e = t.Effect[i.F6n];
    for ([n, a] of ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(e).Consume) {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n) < a) {
        return false;
      }
    }
    return true;
  }
  GetRoleTechNodeCanLevelUp(e) {
    for (var [t, i] of this.nzl) {
      var n = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(t);
      if (n.Type === e && !(i.F6n >= n.Effect.length) && this.GetNodePreNodeUnlock(t)) {
        var a;
        var r;
        var t = n.Effect[i.F6n];
        for ([a, r] of ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(t).Consume) {
          if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(a) >= r) {
            return true;
          }
        }
      }
    }
    return false;
  }
  RefreshTechCanLevelUp() {
    for (var [e, t] of this.nzl) {
      var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(e);
      if (!(t.F6n >= i.Effect.length) && this.GetNodePreNodeUnlock(e)) {
        var n;
        var a;
        var i = i.Effect[t.F6n];
        for ([n, a] of ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(i).Consume) {
          if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n) >= a) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh, e);
          }
        }
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingRoleTechRefresh, 4);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingRoleTechRefresh, 5);
  }
  GetTechNodeCurrentLevel(e) {
    return this.nzl.get(e)?.F6n ?? 0;
  }
  GetTechNodeMaxLevel(e) {
    return ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(e).Effect.length;
  }
  GetFirstNode() {
    var e = this.NormalTechNodeMap.get(FishingDefine_1.FISHING_TECH_FIRST_NODE_AREA);
    if (e) {
      return e[0];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 5, "捕鱼活动获取首科技节点失败，请检查科技树配置");
    }
  }
  GetLastNode() {
    var e = this.NormalTechNodeMap.get(FishingDefine_1.FISHING_TECH_LAST_NODE_AREA);
    if (e) {
      return e[0];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 5, "捕鱼活动获取尾科技节点失败，请检查科技树配置");
    }
  }
  GetFirstUnlockNode() {
    let e = undefined;
    for (var [, t] of this.NormalTechNodeMap) {
      for (const n of t) {
        if (n.NodeType !== 3) {
          var i = this.nzl.get(n.ConfigId);
          if (!i || i.F6n <= 0) {
            return n;
          }
          e = n;
        }
      }
    }
    return e;
  }
  GetNormalTechNodeById(e) {
    for (var [, t] of this.NormalTechNodeMap) {
      for (const i of t) {
        if (i.ConfigId === e) {
          return i;
        }
      }
    }
  }
  GetRoleTechNodeById(e) {
    for (var [, t] of this.RoleTechNodeMap) {
      for (const i of t) {
        if (i.ConfigId === e) {
          return i;
        }
      }
    }
  }
  GetNodePreNodeUnlock(e) {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(e);
    if (t.PreNode) {
      return this.GetFishingTechUnlock(t.PreNode);
    } else {
      return !(ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(e).UnlockCondition > 0) || (this.nzl.get(e)?.CMs ?? false);
    }
  }
  GetNodeLevelUpItemEnough(e) {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(e);
    var e = this.nzl.get(e);
    let i = 0;
    i = e?.F6n ? t.Effect[e.F6n] : t.Effect[0];
    for (const n of ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(i).Consume) {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n[0]) < n[1]) {
        return false;
      }
    }
    return true;
  }
  get IsInDock() {
    return this.Ux_ > 0;
  }
  get DockId() {
    return this.Ux_;
  }
  set DockId(e) {
    this.Ux_ = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingRefreshDockId, this.Ux_);
  }
  GetShipData() {
    return this.uh_;
  }
  SaveLocalSailingIsFix(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SailingIsFix, e);
  }
  GetShipCapacityInfoTuple(e) {
    return [ModelManager_1.ModelManager.DockyardModel.BackpackUseSize, ModelManager_1.ModelManager.DockyardModel.BackpackSize];
  }
  GetShipCageCapacityInfoTuple(e) {
    var t = this.GetCageDataByConfigId(e);
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Fishing", 63, "[捕鱼系统]->获取笼子容量错误，未找到对应实体的笼子数据。", ["configId", e]);
      }
      return [0, 0];
    } else {
      return [(e = t.Data).bMs.length, e.zT_];
    }
  }
  GetShipCageNextHarvestTimeStamp(e) {
    var t = this.GetCageDataByConfigId(e);
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Fishing", 63, "[捕鱼系统]->获取笼子容量错误，未找到对应实体的笼子数据。", ["configId", e]);
      }
      return 0;
    } else {
      return MathUtils_1.MathUtils.LongToNumber(t.Data.ZT_);
    }
  }
  GetFishingPointCapacityInfoTuple(e) {
    var t = this.GetFishingPointDataByPbEntityId(e);
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Fishing", 63, "[捕鱼系统]->获取捕鱼点容量错误，未找到对应捕鱼点数据。", ["entityId", e]);
      }
      return [0, 0];
    } else {
      return [t.CurrentCount, t.MaxCount];
    }
  }
  GetFishingPointAppearTimeLocalKey(e) {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPointConfigByEntityId(e).ShowItem;
    var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(t).Time;
    if (i === 1) {
      return "Fishing_WholeDay";
    } else if (i === 2) {
      return "Fishing_OnlyDay";
    } else if (i === 3) {
      return "Fishing_OnlyNight";
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Fishing", 63, "[捕鱼系统]->获取鱼点的出没时间文本Key错误。", ["entityId", e], ["展示道具", t], ["出没时间", i]);
      }
      return "";
    }
  }
  GetFishingPointNameLocalKey(e) {
    e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPointConfigByEntityId(e).ShowItem;
    return ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(e).Name;
  }
  GetFishingPointTechNameLocalKey(e) {
    e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPointConfigByEntityId(e).UnlockTech;
    return ConfigManager_1.ConfigManager.FishingConfig.GetFishingTagConfig(e).Name;
  }
  IsOnShipVehicle() {
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(230);
    return (e && e.IsOnVehicle) ?? false;
  }
  SetHandBookData(e) {
    var t;
    for (const n of e.FT_) {
      if (!(n.s5n <= 0)) {
        t = {
          Id: n.s5n,
          MaxSize: n.VT_,
          MinSize: n.jT_
        };
        this.FishingItemHandBookDataMap.set(n.s5n, t);
      }
    }
    for (const a of e.NT_) {
      var i = {
        Id: a.s5n,
        IsFinished: a.dMs,
        IsTaken: a.mMs,
        Current: a.lMs,
        Target: a.j6n
      };
      this.FishingItemHandBookRewardMap.set(a.s5n, i);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingRefreshHandBookRewardView);
    ModelManager_1.ModelManager.FishingModel.FishingItemHandBookUnlockTraceList = e.WA_;
  }
  RefreshHandBookData(e) {
    var t;
    if (!(e.s5n <= 0)) {
      t = {
        Id: e.s5n,
        MaxSize: e.VT_,
        MinSize: e.jT_
      };
      this.FishingItemHandBookDataMap.set(e.s5n, t);
    }
  }
  GetFishingItemIdList() {
    var e = [];
    for (const t of ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingItemConfig()) {
      if (!(t.IllustratedNum <= 0)) {
        e.push(t.Id);
      }
    }
    return e;
  }
  GetFishingItemList() {
    var e;
    var t = [];
    for (const i of ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingItemConfig()) {
      if (!(i.IllustratedNum <= 0)) {
        e = {
          Id: i.Id,
          Type: i.Category,
          Area: i.Area,
          Tech: i.Tech,
          Time: i.Time,
          HandBookId: i.IllustratedNum
        };
        t.push(e);
      }
    }
    return t;
  }
  get AllFishingItemCount() {
    let e = 0;
    for (const t of ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingItemConfig()) {
      if (t.IllustratedNum > 0) {
        e++;
      }
    }
    return e;
  }
  get UnLockFishingItemCount() {
    return this.FishingItemHandBookDataMap.size;
  }
  GetSizeIsGoldSize(e) {
    var t;
    var i = [];
    var n = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(e);
    if (!(n.SizeWeight.length < FishingDefine_1.FISHING_SIZE_TYPE)) {
      if ((e = this.FishingItemHandBookDataMap.get(e)) && (t = n.SizeWeight[0], e.MinSize <= t.ArrayInt[1] && i.push(0), t = n.SizeWeight[2], e.MaxSize >= t.ArrayInt[0])) {
        i.push(2);
      }
    }
    return i;
  }
  GetHandBookRewardHaveTakenCount() {
    let e = 0;
    for (var [, t] of this.FishingItemHandBookRewardMap) {
      if (t.IsTaken) {
        e++;
      }
    }
    return e;
  }
  RefreshHandBookDataReward(e) {
    var t = {
      Id: e.s5n,
      IsFinished: e.dMs,
      IsTaken: e.mMs,
      Current: e.lMs,
      Target: e.j6n
    };
    this.FishingItemHandBookRewardMap.set(e.s5n, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingRefreshHandBookRewardView);
  }
  GetHandBookRewardRedDotState() {
    for (const e of this.FishingItemHandBookRewardMap.values()) {
      if (e.IsFinished && !e.IsTaken) {
        return true;
      }
    }
    return false;
  }
}
exports.FishingModel = FishingModel;
//# sourceMappingURL=FishingModel.js.map