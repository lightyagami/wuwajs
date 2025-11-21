"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingSlotData = exports.TrapDefenseBuildingDevelopItemData = exports.TrapDefenseBuildingTypeData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const KscUtil_1 = require("../../../KuroSimpleCombat/KscUtil");
const TDPlayerController_1 = require("../../../KuroSimpleCombat/TD/TDPlayer/TDPlayerController");
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
      return this.qYc();
    } else {
      return this.GYc(e);
    }
  }
  GYc(e) {
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
  qYc() {
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
    this.FYc = -1;
    this.cMd = 0;
    this.fXu = [];
    this.gQl = true;
    this.NYc = false;
    this.OJc = undefined;
    this.qJc = undefined;
    this.GJc = undefined;
    this.FJc = undefined;
    this.Dtd = -1;
    this.Id = e;
    this.Type = t;
  }
  static Create(e, t) {
    e = new TrapDefenseBuildingDevelopItemData(e, t);
    e.NJc();
    return e;
  }
  NJc() {
    if (this.IsBuilding) {
      this.GJc = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBuildingById(this.Id);
      this.FJc = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBuildingTypeById(this.GJc.BuildingType);
    } else {
      this.OJc = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryById(this.Id);
      this.qJc = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryTypeById(this.OJc.AuxiliaryType);
    }
  }
  GetIconPath() {
    return (this.IsBuilding ? this.FJc : this.qJc).Icon;
  }
  GetName() {
    return (this.IsBuilding ? this.FJc : this.qJc).Name;
  }
  GetDesc() {
    if (this.IsBuilding) {
      return [this.GJc.Desc, this.GJc.DescArgs];
    } else {
      return [this.OJc.Desc, this.OJc.DescArgs];
    }
  }
  GetVideo() {
    if (this.IsBuilding) {
      return [this.FJc.VideoName, this.FJc.VideoPath];
    } else {
      return [this.qJc.VideoName, this.qJc.VideoPath];
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
      return this.FJc.PlacementType;
    } else {
      return 0;
    }
  }
  GetUpgradeCost() {
    return (this.IsBuilding ? this.GJc : this.OJc).UpgradeCost;
  }
  GetBuildingCost(e) {
    if (this.IsBuilding) {
      if (e && this.Dtd !== -1) {
        return this.Dtd;
      } else {
        return this.GJc.ConstructDefaultCost;
      }
    } else {
      return 0;
    }
  }
  GetCoolDown() {
    if (this.IsBuilding) {
      return 0;
    } else {
      return TDPlayerController_1.TowerDefensePlayerController.GetFollowerSkillCD(this.Id);
    }
  }
  GetRemainCd() {
    return !this.IsBuilding && this.OJc.CDSkill !== 0 && TDPlayerController_1.TowerDefensePlayerController.GetFollowerSkillRemainCD(this.Id) || 0;
  }
  GetIsMaxLevel(e) {
    return (e ? this.FYc : this.GetMaxLevel()) === this.GetLevel();
  }
  SetBuildingPrice(e, t) {
    this.Dtd = t;
  }
  SetCurMaxLevel(e) {
    this.FYc = e;
  }
  GetCurMaxLevel() {
    return this.FYc;
  }
  GetMaxLevel() {
    if (!(this.UQ >= 0)) {
      if (this.IsBuilding) {
        this.UQ = this.FJc.MaxLevel;
      } else {
        this.UQ = this.qJc.MaxLevel;
      }
    }
    return this.UQ;
  }
  GetIsUnlock() {
    return this.gQl;
  }
  GetHasBranch() {
    if (this.IsBuilding) {
      var e = this.GJc;
      const t = this.FJc;
      return e.Level === t.MaxLevel && t.BranchCount > 1;
    }
    e = this.OJc;
    const t = this.qJc;
    return e.Level === t.MaxLevel && t.BranchCount > 1;
  }
  GetBranchCount() {
    return (this.IsBuilding ? this.FJc : this.qJc).BranchCount;
  }
  GetAttrItem() {
    var e;
    if (!(this.fXu.length > 0)) {
      if (this.IsBuilding) {
        t = this.GetPlacementId();
        e = placementAttrIcon.get(this.GetPlacementType());
        this.fXu.push({
          Name: "TowerDefense_BuildingAttr_Type",
          Icon: e,
          Value: t,
          MultiTxt: true
        });
        e = {
          Name: "TowerDefense_BuildingAttr_Cost",
          Icon: "/Game/Aki/UI/UIResources/Common/Image/IconAttribute/T_RogueSkill_Coin_UI.T_RogueSkill_Coin_UI",
          Value: "" + this.GetBuildingCost(false)
        };
        this.fXu.push(e);
      }
      if (this.IsBuilding) {
        var t = this.GJc;
        const u = this.FJc;
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
              this.fXu.push(n);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("TowerDefense", 77, "缺少属性字段配置", ["属性ID", _]);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefense", 77, "无法获得Buff模板", ["机关ID", this.Id], ["模板ID", u.TemplateId]);
        }
      } else {
        const u = this.qJc;
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
                this.fXu.push(l);
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
    return this.fXu;
  }
  GetBranch() {
    return (this.IsBuilding ? this.GJc : this.OJc).Branch;
  }
  GetBranchDesc() {
    return (this.IsBuilding ? this.GJc : this.OJc).BranchDesc;
  }
  GetBranchDescArgs() {
    return (this.IsBuilding ? this.GJc : this.OJc).BranchDescArgs;
  }
  CheckNeedRedDot() {
    return !!this.GetIsMaxLevel(false) && !(this.GetBranchCount() <= 1) && ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(this.Id).Branch === 0;
  }
  get IsBuilding() {
    return this.Type === 1;
  }
  UpdateId(e) {
    this.Id = e;
    this.fXu.length = 0;
    this.NJc();
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
    return (this.IsBuilding ? this.FJc : this.qJc).SortId;
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
    this.NYc = e;
  }
  GetLockInBattle() {
    return this.NYc;
  }
  SetSellPrice(e) {
    this.cMd = e;
  }
  GetSellPrice() {
    return this.cMd;
  }
}
exports.TrapDefenseBuildingDevelopItemData = TrapDefenseBuildingDevelopItemData;
class TrapDefenseBuildingSlotData {
  constructor(e) {
    this.Xy = e;
    this.VYc = undefined;
    this.jYc = undefined;
    this.HYc = false;
  }
  static Create(e) {
    return new TrapDefenseBuildingSlotData(e);
  }
  GetIndex() {
    return this.Xy;
  }
  GetSlotData() {
    return this.VYc;
  }
  InitSlotData(e) {
    this.HYc = false;
    this.jYc = undefined;
    this.VYc = e;
  }
  SetSlotData(e, t = false) {
    if (this.$Yc() || e !== undefined || t) {
      return (e === undefined || !!t || !!this.Oad(e)) && (e || this.VYc?.IsBuilding || t || ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckAuxiliarySlot(false) ? (this.jYc = e, this.HYc = true) : (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TowerDefense_Battle_AuxiliaryNeed"), false));
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TowerDefense_Battle_SlotLock");
      return false;
    }
  }
  Oad(e) {
    var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.IsSlotData(e);
    if (t) {
      t.SetSlotData(this.VYc, true);
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
    if (this.HYc) {
      return this.jYc;
    } else {
      return this.VYc;
    }
  }
  ApplySlotData(e) {
    if (this.HYc && e) {
      this.VYc = this.jYc;
    }
    this.jYc = undefined;
    this.HYc = false;
  }
  $Yc() {
    return !this.VYc || !this.VYc.GetLockInBattle();
  }
}
exports.TrapDefenseBuildingSlotData = TrapDefenseBuildingSlotData;
//# sourceMappingURL=TrapDefenseBuildingDevelopData.js.map