"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingSlotData = exports.TrapDefenseBuildingDevelopItemData = exports.TrapDefenseBuildingTypeData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const KscUtil_1 = require("../../../KuroSimpleCombat/KscUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const placementAttrIcon = new Map([[4, "/Game/Aki/UI/UIResources/Common/Image/IconAttribute/T_RogueSkill_ArrowUp_UI.T_RogueSkill_ArrowUp_UI"], [2, "/Game/Aki/UI/UIResources/Common/Image/IconAttribute/T_RogueSkill_ArrowFull_UI.T_RogueSkill_ArrowFull_UI"], [1, "/Game/Aki/UI/UIResources/Common/Image/IconAttribute/T_RogueSkill_ArrowDown_UI.T_RogueSkill_ArrowDown_UI"]]);
class TrapDefenseBuildingTypeData {
  constructor(e, t, i) {
    this.IsInDungeon = false;
    this.Type = undefined;
    this.PlacementType = 0;
    this.DataList = [];
    this.DataMap = new Map();
    this.CurSelectedData = undefined;
    this.TempSelectedData = undefined;
    this.Type = e;
    this.PlacementType = i ?? 0;
    this.IsInDungeon = t;
  }
  static Create(e, t, i, r) {
    e = new TrapDefenseBuildingTypeData(e, t, r);
    if (e.AU(i)) {
      return e;
    } else {
      return undefined;
    }
  }
  GetTitleId() {
    if (this.Type === 2) {
      if (this.IsInDungeon) {
        return "TowerDefense_Building_AuxiliaryTypeDungeon_Text";
      } else {
        return "TowerDefense_Building_AuxiliaryType_Text";
      }
    } else if (this.PlacementType === 1) {
      return "TowerDefense_Building_FloorBuildingType_Text";
    } else if (this.PlacementType === 2) {
      return "TowerDefense_Building_WallBuildingType_Text";
    } else {
      return "TowerDefense_Building_TopBuildingType_Text";
    }
  }
  AU(e) {
    if (this.IsInDungeon) {
      return this.L9c();
    } else {
      return this.A9c(e);
    }
  }
  A9c(e) {
    var t;
    var i = new Set();
    for (const s of e) {
      i.add(s.GetDataType());
      this.DataList.push(s);
      this.DataMap.set(s.GetDataType(), s);
    }
    for (const n of this.Type === 2 ? ConfigManager_1.ConfigManager.TrapDefenseConfig?.GetAllAuxiliaryTypeList() : ConfigManager_1.ConfigManager.TrapDefenseConfig?.GetAllBuildingTypeList()) {
      if (this.Type === 1) {
        var r = n;
        if (this.PlacementType !== r.PlacementType) {
          continue;
        }
      }
      if (!i.has(n.Id)) {
        r = {
          MachineType: this.Type,
          DataType: n.Id,
          Level: 1,
          Branch: 0
        };
        t = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(r);
        (t = TrapDefenseBuildingDevelopItemData.Create(t, this.Type)).SetIsUnLock(false);
        this.DataList.push(t);
        this.DataMap.set(n.Id, t);
      }
    }
    this.SortList();
    return this.DataList.length > 0;
  }
  L9c() {
    this.DataList = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetInBattleDataByType(this.PlacementType);
    return this.DataList.length > 0;
  }
  GetDataList() {
    return this.DataList;
  }
  GetDataMap() {
    return this.DataMap;
  }
  UpdateItemData(e, t = true) {
    var i = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(e);
    if (this.DataMap.has(i.DataType)) {
      i = this.DataMap.get(i.DataType);
      if (t) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseOnDevelopUpdate, i);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TowerDefense", 77, "机关养成更新无效", ["ID", e]);
    }
  }
  SortList() {
    this.DataList.sort((e, t) => e.GetSortId() - t.GetSortId());
  }
}
exports.TrapDefenseBuildingTypeData = TrapDefenseBuildingTypeData;
class TrapDefenseBuildingDevelopItemData {
  constructor(e, t) {
    this.Id = 0;
    this.Type = undefined;
    this.IsInDungeon = false;
    this.vUt = -1;
    this.UQ = -1;
    this.P9c = -1;
    this.gud = 0;
    this.D9c = [];
    this.gQl = true;
    this.x9c = false;
    this.kYc = undefined;
    this.OYc = undefined;
    this.qYc = undefined;
    this.GYc = undefined;
    this.bZc = -1;
    this.Id = e;
    this.Type = t;
  }
  static Create(e, t) {
    e = new TrapDefenseBuildingDevelopItemData(e, t);
    e.FYc();
    return e;
  }
  FYc() {
    if (this.IsBuilding) {
      this.qYc = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBuildingById(this.Id);
      this.GYc = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBuildingTypeById(this.qYc.BuildingType);
    } else {
      this.kYc = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryById(this.Id);
      this.OYc = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryTypeById(this.kYc.AuxiliaryType);
    }
  }
  GetIconPath() {
    return (this.IsBuilding ? this.GYc : this.OYc).Icon;
  }
  GetName() {
    return (this.IsBuilding ? this.GYc : this.OYc).Name;
  }
  GetDesc() {
    if (this.IsBuilding) {
      return [this.qYc.Desc, this.qYc.DescArgs];
    } else {
      return [this.kYc.Desc, this.kYc.DescArgs];
    }
  }
  GetVideo() {
    if (this.IsBuilding) {
      return [this.GYc.VideoName, this.GYc.VideoPath];
    } else {
      return [this.OYc.VideoName, this.OYc.VideoPath];
    }
  }
  SetIsUnLock(e) {
    this.gQl = e;
  }
  GetLevel() {
    return ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(this.Id).Level;
  }
  GetPlacementType() {
    if (this.IsBuilding) {
      return this.GYc.PlacementType;
    } else {
      return 0;
    }
  }
  GetUpgradeCost() {
    return (this.IsBuilding ? this.qYc : this.kYc).UpgradeCost;
  }
  GetBuildingCost(e) {
    if (this.IsBuilding) {
      if (e && this.bZc !== -1) {
        return this.bZc;
      } else {
        return this.qYc.ConstructDefaultCost;
      }
    } else {
      return 0;
    }
  }
  GetCoolDown() {
    if (this.IsBuilding) {
      return 0;
    } else {
      return ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.GetFollowerSkillCD(this.Id);
    }
  }
  GetRemainCd() {
    return !this.IsBuilding && this.kYc.CDSkill !== 0 && ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.GetFollowerSkillRemainCD(this.Id) || 0;
  }
  GetIsMaxLevel(e) {
    return (e ? this.P9c : this.GetMaxLevel()) === this.GetLevel();
  }
  SetBuildingPrice(e, t) {
    this.bZc = t;
  }
  SetCurMaxLevel(e) {
    this.P9c = e;
  }
  GetCurMaxLevel() {
    return this.P9c;
  }
  GetMaxLevel() {
    if (!(this.UQ >= 0)) {
      if (this.IsBuilding) {
        this.UQ = this.GYc.MaxLevel;
      } else {
        this.UQ = this.OYc.MaxLevel;
      }
    }
    return this.UQ;
  }
  GetIsUnlock() {
    return this.gQl;
  }
  GetHasBranch() {
    if (this.IsBuilding) {
      var e = this.qYc;
      const t = this.GYc;
      return e.Level === t.MaxLevel && t.BranchCount > 1;
    }
    e = this.kYc;
    const t = this.OYc;
    return e.Level === t.MaxLevel && t.BranchCount > 1;
  }
  GetBranchCount() {
    return (this.IsBuilding ? this.GYc : this.OYc).BranchCount;
  }
  GetAttrItem() {
    var e;
    if (!(this.D9c.length > 0)) {
      if (this.IsBuilding) {
        t = this.GetPlacementId();
        t = ConfigManager_1.ConfigManager.TextConfig?.GetMultiTextByKey(t, t);
        e = placementAttrIcon.get(this.GetPlacementType());
        this.D9c.push({
          Name: "TowerDefense_BuildingAttr_Type",
          Icon: e,
          Value: t ?? ""
        });
        e = {
          Name: "TowerDefense_BuildingAttr_Cost",
          Icon: "/Game/Aki/UI/UIResources/Common/Image/IconAttribute/T_RogueSkill_Coin_UI.T_RogueSkill_Coin_UI",
          Value: "" + this.GetBuildingCost(false)
        };
        this.D9c.push(e);
      }
      if (this.IsBuilding) {
        var t = this.qYc;
        const u = this.GYc;
        var i = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetBuffData(u.TemplateId, t.SimpleCombatSubtypeIds[0]);
        if (i) {
          for (const _ of u.AttrShow) {
            var r = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAttrShow(_);
            if (r) {
              var s = i[r.Key] ?? r.Key + "Error";
              let e = "";
              e = r.Key === "SkillCoolDown" ? (n = s / 10000).toFixed(Number.isInteger(n) ? 0 : 1) : String(s);
              var n = {
                Name: r.Name,
                Icon: r.Icon,
                Value: e
              };
              this.D9c.push(n);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("TowerDefense", 77, "缺少属性字段配置", ["属性ID", _]);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefense", 77, "无法获得Buff模板", ["机关ID", this.Id], ["模板ID", u.TemplateId]);
        }
      } else {
        const u = this.OYc;
        var o = KscUtil_1.KscUtil.GetFollowerAttrsByProxy(this.Id);
        if (o) {
          for (const g of u.AttrShow) {
            var a = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAttrShow(g);
            if (a) {
              if (o.has(g)) {
                var h = o.get(g);
                let e = "";
                e = a.Key === "SkillCoolDown" ? (l = h / 10000).toFixed(Number.isInteger(l) ? 0 : 1) : String(h);
                var l = {
                  Name: a.Name,
                  Icon: a.Icon,
                  Value: e
                };
                this.D9c.push(l);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("TowerDefense", 77, "属性值Map未找到键", ["AttrID", g]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("TowerDefense", 77, "数据库未找到属性键", ["AttrID", g]);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefense", 77, "无法读取辅助机属性", ["AttrID", this.Id]);
        }
      }
    }
    return this.D9c;
  }
  GetBranch() {
    return (this.IsBuilding ? this.qYc : this.kYc).Branch;
  }
  GetBranchDesc() {
    return (this.IsBuilding ? this.qYc : this.kYc).BranchDesc;
  }
  GetBranchDescArgs() {
    return (this.IsBuilding ? this.qYc : this.kYc).BranchDescArgs;
  }
  CheckNeedRedDot() {
    return !!this.GetIsMaxLevel(false) && !(this.GetBranchCount() <= 1) && ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(this.Id).Branch === 0;
  }
  get IsBuilding() {
    return this.Type === 1;
  }
  UpdateId(e) {
    this.Id = e;
    this.D9c.length = 0;
    this.FYc();
  }
  GetDataType() {
    var e;
    if (this.vUt === -1) {
      e = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(this.Id);
      this.vUt = e.DataType;
    }
    return this.vUt;
  }
  GetSortId() {
    return (this.IsBuilding ? this.GYc : this.OYc).SortId;
  }
  GetPlacementId() {
    var e;
    if (this.Type === 2) {
      return "TowerDefense_Building_AuxiliaryType_Text";
    } else if ((e = this.GetPlacementType()) === 1) {
      return "TowerDefense_Building_FloorBuildingType_Text";
    } else if (e === 2) {
      return "TowerDefense_Building_WallBuildingType_Text";
    } else {
      return "TowerDefense_Building_TopBuildingType_Text";
    }
  }
  SetLockInBattle(e) {
    this.x9c = e;
  }
  GetLockInBattle() {
    return this.x9c;
  }
  SetSellPrice(e) {
    this.gud = e;
  }
  GetSellPrice() {
    return this.gud;
  }
}
exports.TrapDefenseBuildingDevelopItemData = TrapDefenseBuildingDevelopItemData;
class TrapDefenseBuildingSlotData {
  constructor(e) {
    this.Xy = e;
    this.U9c = undefined;
    this.B9c = undefined;
    this.k9c = false;
  }
  static Create(e) {
    return new TrapDefenseBuildingSlotData(e);
  }
  GetIndex() {
    return this.Xy;
  }
  GetSlotData() {
    return this.U9c;
  }
  InitSlotData(e) {
    this.k9c = false;
    this.B9c = undefined;
    this.U9c = e;
  }
  SetSlotData(e, t = false) {
    if (this.O9c() || e !== undefined || t) {
      return (e === undefined || !!t || !!this.fod(e)) && (e || this.U9c?.IsBuilding || t || ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckAuxiliarySlot(false) ? (this.B9c = e, this.k9c = true) : (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TowerDefense_Battle_AuxiliaryNeed"), false));
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TowerDefense_Battle_SlotLock");
      return false;
    }
  }
  fod(e) {
    var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.IsSlotData(e);
    if (t) {
      t.SetSlotData(this.U9c, true);
    } else {
      t = !!this.GetSlotData() && !this.GetSlotData()?.IsBuilding;
      if (e.IsBuilding || t) {
        if (e.IsBuilding && t && !ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckAuxiliarySlot(false)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TowerDefense_Battle_AuxiliaryNeed");
          return false;
        }
      } else if (!ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckAuxiliarySlot(true)) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TowerDefense_Battle_AuxiliaryMax");
        return false;
      }
    }
    return true;
  }
  GetUploadData() {
    if (this.k9c) {
      return this.B9c;
    } else {
      return this.U9c;
    }
  }
  ApplySlotData(e) {
    if (this.k9c && e) {
      this.U9c = this.B9c;
    }
    this.B9c = undefined;
    this.k9c = false;
  }
  O9c() {
    return !this.U9c || !this.U9c.GetLockInBattle();
  }
}
exports.TrapDefenseBuildingSlotData = TrapDefenseBuildingSlotData;
//# sourceMappingURL=TrapDefenseBuildingDevelopData.js.map