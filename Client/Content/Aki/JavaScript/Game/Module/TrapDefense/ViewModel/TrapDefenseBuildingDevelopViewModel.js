"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingDevelopViewModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId_1 = require("../../../../Core/Define/ConfigQuery/SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const TrapDefenseBuildingDevelopData_1 = require("../Data/TrapDefenseBuildingDevelopData");
class TrapDefenseBuildingDevelopViewModel {
  constructor() {
    this.Model = undefined;
    this.IsInDungeon = false;
    this.CurRecommendLevel = undefined;
    this.TabDataList = [];
    this.AuxiliaryDataMap = new Map();
    this.BuildingDataMap = new Map();
    this.RemainPoints = 0;
    this.InAuxiliaryData = [];
    this.InAuxiliaryDataMap = new Map();
    this.InBuildingData = [];
    this.InBuildingDataMap = new Map();
    this.SlotList = [];
    this.LevelUnlockAuxiliary = new Map();
    this.LevelUnlockBuilding = new Map();
    this.v6i = 999;
  }
  static Create(e) {
    var t = new TrapDefenseBuildingDevelopViewModel();
    t.Model = e;
    return t;
  }
  SetIsInDungeon(e) {
    this.IsInDungeon = e;
  }
  SetCurRecommendLevel(e) {
    this.CurRecommendLevel = e;
  }
  GetIsRecommendOrgan(e) {
    if (this.CurRecommendLevel && e.IsBuilding) {
      return !!this.CurRecommendLevel.Config.DefaultBuildingType.includes(e.GetDataType()) || undefined;
    }
  }
  GetTabList() {
    var e = [];
    e.push(this.xXu(0));
    if (this.IsInDungeon) {
      if (this.BuildingDataMap.size > 0) {
        e.push(this.xXu(1));
      }
      if (this.AuxiliaryDataMap.size > 0) {
        e.push(this.xXu(2));
      }
    } else {
      e.push(this.xXu(1));
      e.push(this.xXu(2));
    }
    return e;
  }
  SetRemainPoints(e) {
    this.RemainPoints = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseLevelUpPointUpdate);
  }
  CheckAuxiliaryRedDot() {
    for (const e of this.AuxiliaryDataMap) {
      if (e[1].CheckNeedRedDot()) {
        return true;
      }
    }
    return false;
  }
  CheckBuildingRedDot() {
    for (const e of this.BuildingDataMap) {
      if (e[1].CheckNeedRedDot()) {
        return true;
      }
    }
    return false;
  }
  xXu(e) {
    var t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetDevelopTabConfig(e);
    var e = {
      TabType: e,
      Icon: t.Icon,
      TabName: t.TabName
    };
    if (!this.IsInDungeon) {
      e.RedDot = t.RedDot || undefined;
    }
    return e;
  }
  GetBuffData(e, t) {
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e);
    if (o) {
      o = (0, IComponent_1.getComponent)(o.ComponentsData, "SimpleCombatComponent");
      if (o) {
        var o = o.Id;
        var o = SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId_1.configSimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId.GetConfig(o, t);
        if (o) {
          o = o.PropertyId;
          return ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBaseProperty(o);
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefenseEvent", 77, "GetBuffData Error", ["templateId", e], ["subId", t]);
        }
      }
    }
  }
  GetBranchName(e) {
    return "TowerDefense_BranchName_" + e;
  }
  SetDevelopTab(e) {
    this.TabDataList = e;
  }
  GetDevelopTabByData(e) {
    for (const t of this.TabDataList) {
      if (e.GetPlacementType() === t.PlacementType) {
        return t;
      }
    }
  }
  InitDevelopInfo(e) {
    var t = e.dHc;
    var e = e.mHc;
    for (const i of t) {
      var o = {
        MachineType: 2,
        DataType: i.s5n,
        Level: i.F6n,
        Branch: i.yHc
      };
      var o = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(o);
      if (this.AuxiliaryDataMap.has(i.s5n)) {
        this.AuxiliaryDataMap.get(i.s5n)?.UpdateId(o);
      } else {
        o = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingDevelopItemData.Create(o, 2);
        this.AuxiliaryDataMap.set(i.s5n, o);
      }
      this.AuxiliaryDataMap.get(i.s5n).SetCurMaxLevel(i.SHc);
    }
    for (const n of e) {
      var r = {
        MachineType: 1,
        DataType: n.s5n,
        Level: n.F6n,
        Branch: n.yHc
      };
      var r = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(r);
      if (this.BuildingDataMap.has(n.s5n)) {
        this.BuildingDataMap.get(n.s5n)?.UpdateId(r);
      } else {
        r = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingDevelopItemData.Create(r, 1);
        this.BuildingDataMap.set(n.s5n, r);
      }
      this.BuildingDataMap.get(n.s5n).SetCurMaxLevel(n.SHc);
      this.BuildingDataMap.get(n.s5n).SetBuildingPrice(n.wJc, n.LJc);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseOnBranchUpdate);
  }
  UpdateDevelopInfo(e) {
    var t = e.dHc;
    var e = e.mHc;
    for (const i of t) {
      var o = {
        MachineType: 2,
        DataType: i.s5n,
        Level: i.F6n,
        Branch: i.yHc
      };
      var o = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(o);
      if (this.AuxiliaryDataMap.has(i.s5n)) {
        this.AuxiliaryDataMap.get(i.s5n)?.UpdateId(o);
      } else {
        o = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingDevelopItemData.Create(o, 2);
        this.AuxiliaryDataMap.set(i.s5n, o);
      }
      this.AuxiliaryDataMap.get(i.s5n).SetCurMaxLevel(i.SHc);
    }
    for (const n of e) {
      var r = {
        MachineType: 1,
        DataType: n.s5n,
        Level: n.F6n,
        Branch: n.yHc
      };
      var r = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(r);
      if (this.BuildingDataMap.has(n.s5n)) {
        this.BuildingDataMap.get(n.s5n)?.UpdateId(r);
      } else {
        r = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingDevelopItemData.Create(r, 1);
        this.BuildingDataMap.set(n.s5n, r);
      }
      this.BuildingDataMap.get(n.s5n).SetCurMaxLevel(n.SHc);
      this.BuildingDataMap.get(n.s5n).SetBuildingPrice(n.wJc, n.LJc);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseOnBranchUpdate);
  }
  GetHaveList() {
    var e = [[], [], [], [], []];
    for (const t of this.AuxiliaryDataMap) {
      e[0].push(t[1]);
    }
    for (const o of this.BuildingDataMap) {
      e[o[1].GetPlacementType()].push(o[1]);
    }
    return e;
  }
  GetCanAllReset() {
    for (const e of this.AuxiliaryDataMap) {
      if (e[1].GetLevel() > 1) {
        return true;
      }
    }
    for (const t of this.BuildingDataMap) {
      if (t[1].GetLevel() > 1) {
        return true;
      }
    }
    return false;
  }
  ResetAllOrgan() {
    for (const o of this.AuxiliaryDataMap) {
      var e = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(o[1].Id);
      var e = {
        MachineType: e.MachineType,
        DataType: e.DataType,
        Level: 1,
        Branch: 0
      };
      var e = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(e);
      o[1].UpdateId(e);
    }
    for (const r of this.BuildingDataMap) {
      var t = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(r[1].Id);
      var t = {
        MachineType: t.MachineType,
        DataType: t.DataType,
        Level: 1,
        Branch: 0
      };
      var t = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(t);
      r[1].UpdateId(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseOnDevelopResetAll);
  }
  OnItemUpdate(e) {
    var t = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(e);
    if (t.MachineType === 2) {
      if (!this.AuxiliaryDataMap.has(t.DataType)) {
        return;
      }
      var o = this.AuxiliaryDataMap.get(t.DataType);
      o?.UpdateId(e);
      var o = this.GetDevelopTabByData(o);
      if (!o) {
        return;
      }
      o.UpdateItemData(e);
    } else {
      if (!this.BuildingDataMap.has(t.DataType)) {
        return;
      }
      o = this.BuildingDataMap.get(t.DataType);
      o?.UpdateId(e);
      t = this.GetDevelopTabByData(o);
      if (!t) {
        return;
      }
      t.UpdateItemData(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseOnBranchUpdate);
  }
  CheckNeedOrganNew(e) {
    var t;
    return !!e.GetIsUnlock() && (t = e.GetDataType(), e = e.IsBuilding ? LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseBuildingClicked : LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseAuxiliaryClicked, !(e = LocalStorage_1.LocalStorage.GetPlayer(e)) || !e.has(t));
  }
  SetOrganClicked(e) {
    var t;
    var o;
    return !!e.GetIsUnlock() && (t = e.IsBuilding ? LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseBuildingClicked : LocalStorageDefine_1.ELocalStoragePlayerKey.TrapDefenseAuxiliaryClicked, o = LocalStorage_1.LocalStorage.GetPlayer(t) ?? new Set(), e = e.GetDataType(), !o.has(e)) && (o.add(e), LocalStorage_1.LocalStorage.SetPlayer(t, o), true);
  }
  InitInBattle(e) {
    this.InAuxiliaryData.length = 0;
    this.InAuxiliaryDataMap.clear();
    this.InBuildingData.length = 0;
    this.InBuildingDataMap.clear();
    for (const r of e.dHc) {
      var t = {
        MachineType: 2,
        DataType: r.s5n,
        Level: r.F6n,
        Branch: r.yHc
      };
      var t = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(t);
      var t = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingDevelopItemData.Create(t, 2);
      t.SetCurMaxLevel(r.SHc);
      t.IsInDungeon = true;
      this.InAuxiliaryData.push(t);
      this.InAuxiliaryDataMap.set(r.s5n, t);
    }
    for (const i of e.mHc) {
      var o = {
        MachineType: 1,
        DataType: i.s5n,
        Level: i.F6n,
        Branch: i.yHc
      };
      var o = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(o);
      var o = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingDevelopItemData.Create(o, 1);
      o.SetCurMaxLevel(i.SHc);
      o.SetBuildingPrice(i.wJc, i.LJc);
      o.SetSellPrice(i.AJc);
      o.IsInDungeon = true;
      this.InBuildingData.push(o);
      this.InBuildingDataMap.set(i.s5n, o);
    }
    this.InitSlot(e.DEs);
  }
  InitSlot(e) {
    var t;
    var o = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetSlotCount();
    for (let e = this.SlotList.length; e < o; e++) {
      var r = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingSlotData.Create(e);
      this.SlotList.push(r);
    }
    for (const a of this.SlotList) {
      a.InitSlotData(undefined);
    }
    for (const s of e) {
      if (s.cHc !== undefined) {
        if (t = this.InAuxiliaryDataMap.get(s.cHc.s5n)) {
          this.SlotList[s.q6n].InitSlotData(t);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefense", 77, "未找到对应辅助机ID", ["ID", s.cHc.s5n]);
        }
      } else if (s.uHc !== undefined) {
        if (t = this.InBuildingDataMap.get(s.uHc.s5n)) {
          t.SetBuildingPrice(s.uHc.wJc, s.uHc.LJc);
          t.SetSellPrice(s.uHc.AJc);
          this.SlotList[s.q6n].InitSlotData(t);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefense", 77, "未找到对应建筑机关ID", ["ID", s.uHc.s5n]);
        }
      }
    }
    e = ModelManager_1.ModelManager.TrapDefenseModel?.GetCurInstToLevelData();
    if (e) {
      for (const f of e.Config.ForceAuxiliaryType) {
        var i = this.InAuxiliaryDataMap.get(f);
        if (i) {
          i.SetLockInBattle(true);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefense", 77, "未找到对应强制携带辅助机ID", ["ID", f]);
        }
      }
      for (const l of e.Config.ForceBuildingType) {
        var n = this.InBuildingDataMap.get(l);
        if (n) {
          n.SetLockInBattle(true);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefense", 77, "未找到对应强制携带建筑ID", ["ID", l]);
        }
      }
    }
  }
  GetSlotData() {
    return this.SlotList;
  }
  GetFirstEmptySlot() {
    for (const e of this.SlotList) {
      if (e.GetSlotData() === undefined) {
        return e;
      }
    }
  }
  IsSlotFull() {
    for (const e of this.SlotList) {
      if (e.GetSlotData() === undefined) {
        return false;
      }
    }
    return true;
  }
  GetInBattleDataByType(e) {
    if (e === 0) {
      return this.InAuxiliaryData;
    }
    var t = [];
    for (const o of this.InBuildingData) {
      if (o.GetPlacementType() === e) {
        t.push(o);
      }
    }
    return t;
  }
  IsSlotData(e) {
    for (const t of this.SlotList) {
      if (t.GetSlotData() === e) {
        return t;
      }
    }
  }
  CheckAuxiliarySlot(e) {
    let t = 0;
    for (const r of this.SlotList) {
      var o = r.GetSlotData();
      if (o) {
        t += o?.IsBuilding ? 0 : 1;
      }
    }
    if (e) {
      return t < ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetAuxiliaryLimit();
    } else {
      return t > 1;
    }
  }
  QuickEquipOrgan() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData();
    var t = e.Config.RecommendAuxiliaryType;
    var o = e.Config.RecommendBuildingType;
    for (let e = 0; e < t.length; e++) {
      var r = this.InAuxiliaryDataMap.get(t[e]);
      if (r) {
        if (e >= this.SlotList.length) {
          break;
        }
        this.SlotList[e].SetSlotData(r, true);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 77, "未找到对应辅助机ID", ["ID", t[e]]);
      }
    }
    for (let e = 0; e < o.length; e++) {
      var i = e + t.length;
      if (i >= this.SlotList.length) {
        break;
      }
      var n = this.InBuildingDataMap.get(o[e]);
      if (n) {
        this.SlotList[i].SetSlotData(n, true);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 77, "未找到建筑ID", ["ID", o[e]]);
      }
    }
    for (let e = t.length + o.length; e < this.SlotList.length; e++) {
      this.SlotList[e].SetSlotData(undefined, true);
    }
    if (e.Config.ModeType !== 3 && ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckNeedSellBuilding()) {
      this.tzc();
    } else {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.UploadSlotChange();
    }
  }
  async EquipOrgan(t, o) {
    if (!(this.SlotList.length <= t)) {
      var t = this.SlotList[t];
      var r = t.GetSlotData();
      let e = true;
      if (r === o) {
        if (r === undefined) {
          return;
        }
        e = t.SetSlotData(undefined);
      } else {
        e = t.SetSlotData(o);
      }
      if (e) {
        if (ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData().Config.ModeType === 1 && ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckNeedSellBuilding()) {
          this.tzc();
        } else {
          await ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.UploadSlotChange();
        }
      }
    }
  }
  tzc() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(351);
    e.FunctionMap.set(1, () => {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.DoSlotChange(false);
    });
    e.FunctionMap.set(2, () => {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.UploadSlotChange();
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  CheckNeedSellBuilding() {
    var e = [];
    var t = [];
    for (const r of this.SlotList) {
      var o = r.GetSlotData();
      if (o && o.IsBuilding) {
        e.push(o.GetDataType());
      }
      var o = r.GetUploadData();
      if (o && o.IsBuilding) {
        t.push(o.GetDataType());
      }
    }
    for (const i of e) {
      if (!t.includes(i) && ModelManager_1.ModelManager.TowerDefenseEventModel.HasAnyTrapByType(i)) {
        return true;
      }
    }
    return false;
  }
  UploadSlotChangeByNotify(e) {
    if (this.InBuildingDataMap.size !== 0 || this.InAuxiliaryDataMap.size !== 0) {
      this.DoSlotChange(false);
      this.InitSlot(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseOnSlotUpdate);
    }
  }
  async UploadSlotChange() {
    var e = this.GetUploadList();
    var e = await ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseSlotUpdate(e);
    this.DoSlotChange(e);
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseOnSlotUpdate);
    }
  }
  DoSlotChange(e) {
    for (const t of this.SlotList) {
      t.ApplySlotData(e);
    }
  }
  GetUploadList() {
    var e = [];
    for (const n of this.SlotList) {
      var t;
      var o;
      var r = new Protocol_1.Aki.Protocol.bHc();
      var i = n.GetUploadData();
      r.q6n = n.GetIndex();
      if (i === undefined) {
        r.RHc = undefined;
      } else if ((t = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(i.Id)).MachineType === 2) {
        r.RHc = "uHc";
        (o = new Protocol_1.Aki.Protocol.LHc()).yHc = t.Branch;
        o.SHc = i.GetCurMaxLevel();
        o.s5n = t.DataType;
        o.F6n = t.Level;
        r.cHc = o;
        r.uHc = undefined;
      } else {
        r.RHc = "cHc";
        (o = new Protocol_1.Aki.Protocol.wHc()).yHc = t.Branch;
        o.SHc = i.GetCurMaxLevel();
        o.s5n = t.DataType;
        o.F6n = t.Level;
        r.cHc = undefined;
        r.uHc = o;
      }
      e.push(r);
    }
    return e;
  }
  CheckSlotEquipped(e) {
    if (e.IsInDungeon) {
      for (const t of this.SlotList) {
        if (t.GetSlotData() === e) {
          return true;
        }
      }
    }
    return false;
  }
  SetCurrentDragIndex(e) {
    this.v6i = e;
  }
  ClearCurrentDragIndex() {
    this.v6i = 999;
  }
  CheckIfCurrentDragIndex(e) {
    return this.v6i === e;
  }
  CheckIfCanDrag() {
    return this.v6i === 999;
  }
}
exports.TrapDefenseBuildingDevelopViewModel = TrapDefenseBuildingDevelopViewModel;
//# sourceMappingURL=TrapDefenseBuildingDevelopViewModel.js.map