"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingGridModel = exports.BuildingGridCellModel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Pool_1 = require("../../../Core/Container/Pool");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const TowerDefenseEventEntityModel_1 = require("../TowerDefenseEvent/Model/TowerDefenseEventEntityModel");
class BuildingGridCellModel {
  constructor() {
    this.GridId = "";
    this.X = 0;
    this.Y = 0;
    this.CreatureId = 0;
  }
}
exports.BuildingGridCellModel = BuildingGridCellModel;
class BuildingGridModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.eKu = new Map();
  }
  UpdateGridCell(e) {
    var i = e.lEu?.jfu;
    if (!i) {
      return false;
    }
    var r = i.bPu;
    var l = i.iPs;
    var i = i.rPs;
    var d = UE.KuroBuildingGridSubsystem.K2_FindBuildingGrid(GlobalData_1.GlobalData.World, r);
    if (!d) {
      return false;
    }
    BuildingGridModel.tKu.X = l;
    BuildingGridModel.tKu.Y = i;
    if (!d.GetCellIndex(BuildingGridModel.tKu, BuildingGridModel.iKu)) {
      return false;
    }
    d = (0, puerts_1.$unref)(BuildingGridModel.iKu);
    let t = this.eKu.get(r);
    if (!t) {
      if (!e.lWn) {
        return false;
      }
      t = new Map();
      this.eKu.set(r, t);
    }
    let o = t.get(d);
    if (!o) {
      if (!e.lWn) {
        return false;
      }
      o = (o = BuildingGridModel.rKu.Get()) || BuildingGridModel.rKu.Create();
      t.set(d, o);
    }
    if (e.lWn) {
      o.GridId = r;
      o.X = l;
      o.Y = i;
      o.CreatureId = 0;
      if (e.lEu?.uEu) {
        o.CreatureId = -1;
      } else if (e.lEu?._Eu) {
        o.CreatureId = MathUtils_1.MathUtils.LongToNumber(e.lEu._Eu.s5n);
      }
    } else {
      t.delete(d);
      if (t.size === 0) {
        this.eKu.delete(r);
      }
      BuildingGridModel.rKu.Put(o);
    }
    return true;
  }
  IsCellPolluted(e, i) {
    e = this.eKu.get(e);
    if (e) {
      e = e.get(i);
      if (e) {
        i = ModelManager_1.ModelManager.TowerDefenseEventModel.GetEntity(e.CreatureId);
        if (i && (0, TowerDefenseEventEntityModel_1.isTypeOfSpecialCellBaseInfo)(i)) {
          if (i.CellType === 2) {
            return i.Uid;
          }
        }
      }
    }
    return -1;
  }
  OnLeaveLevel() {
    for (const e of this.eKu.values()) {
      for (const i of e.values()) {
        BuildingGridModel.rKu.Put(i);
      }
      e.clear();
    }
    this.eKu.clear();
    BuildingGridModel.rKu.Clear();
    return super.OnLeaveLevel();
  }
}
(exports.BuildingGridModel = BuildingGridModel).rKu = new Pool_1.Pool(100, () => new BuildingGridCellModel());
BuildingGridModel.tKu = new UE.KuroBuildingGridCellVector();
BuildingGridModel.iKu = (0, puerts_1.$ref)(0); //# sourceMappingURL=BuildingGridModel.js.map