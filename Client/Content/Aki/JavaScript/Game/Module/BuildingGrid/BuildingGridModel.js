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
    this.WKu = new Map();
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
    BuildingGridModel.QKu.X = l;
    BuildingGridModel.QKu.Y = i;
    if (!d.GetCellIndex(BuildingGridModel.QKu, BuildingGridModel.KKu)) {
      return false;
    }
    d = (0, puerts_1.$unref)(BuildingGridModel.KKu);
    let t = this.WKu.get(r);
    if (!t) {
      if (!e.lWn) {
        return false;
      }
      t = new Map();
      this.WKu.set(r, t);
    }
    let o = t.get(d);
    if (!o) {
      if (!e.lWn) {
        return false;
      }
      o = (o = BuildingGridModel.XKu.Get()) || BuildingGridModel.XKu.Create();
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
        this.WKu.delete(r);
      }
      BuildingGridModel.XKu.Put(o);
    }
    return true;
  }
  IsCellPolluted(e, i) {
    e = this.WKu.get(e);
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
    for (const e of this.WKu.values()) {
      for (const i of e.values()) {
        BuildingGridModel.XKu.Put(i);
      }
      e.clear();
    }
    this.WKu.clear();
    BuildingGridModel.XKu.Clear();
    return super.OnLeaveLevel();
  }
}
(exports.BuildingGridModel = BuildingGridModel).XKu = new Pool_1.Pool(100, () => new BuildingGridCellModel());
BuildingGridModel.QKu = new UE.KuroBuildingGridCellVector();
BuildingGridModel.KKu = (0, puerts_1.$ref)(0); //# sourceMappingURL=BuildingGridModel.js.map