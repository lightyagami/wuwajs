"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteComponentAssemblyFunction = exports.RouletteComponentAssemblyExplore = exports.RouletteComponentAssembly = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteGridForbiddenSettings_1 = require("../RouletteGrid/RouletteGridForbiddenSettings");
const RouletteComponent_1 = require("./RouletteComponent");
class RouletteComponentAssembly extends RouletteComponent_1.RouletteComponentBase {
  IsCurrentEquippedId(e) {
    return false;
  }
  GamepadReturnEmptyGrid() {
    this.IsEmptyChoose = false;
  }
  JudgeGridStateByData(e, t) {
    if (e !== undefined && e !== 0) {
      if ((t = RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.CheckGridSpecialState(0, t, e)) !== undefined) {
        return t;
      } else {
        return 1;
      }
    } else {
      return 2;
    }
  }
  SetCurrentToggleState(e) {
    this.GetCurrentGrid()?.SetGridToggleNavigation(e);
  }
  InitGridEvent(e) {
    super.InitGridEvent(e);
    e.SetGridToggleChangeEvent();
  }
  GridDataDecorator(e) {
    e.State = this.JudgeGridStateByData(e.Id, e.GridType);
    e.ShowIndex = true;
    e.ShowRedDot = false;
    return e;
  }
  GetGridId(e, t) {
    return ModelManager_1.ModelManager.RouletteModel.GetRouletteGridId(e, t, false);
  }
  y0o(e, t) {
    switch (t) {
      case 0:
        var o = ModelManager_1.ModelManager.RouletteModel.GetDefaultExploreSkillIdList();
        if (e > o.length) {
          return undefined;
        } else {
          return o[e];
        }
      case 1:
        o = ModelManager_1.ModelManager.RouletteModel.GetDefaultFunctionIdList();
        if (e > o.length) {
          return undefined;
        } else {
          return o[e];
        }
      case 2:
        return;
    }
  }
  ResetAllGridDefault() {
    for (const o of this.RouletteGridList) {
      o.SetGridEquipped(false);
      o.SetGridToggleState(false);
      var e = o.Data;
      e.Name = undefined;
      var t = this.y0o(e.DataIndex, e.GridType);
      e.Id = t ?? e.Id;
      e.State = this.JudgeGridStateByData(e.Id, e.GridType);
      o.RefreshGrid(e);
    }
  }
  GetGridByValidId(e) {
    if (e !== 0 && e !== undefined) {
      for (const t of this.RouletteGridList) {
        if (t.Data.Id === e) {
          return t;
        }
      }
    }
  }
  SetCurrentGridByData(e) {
    this.CurrentGridIndex = e.GridIndex;
    this.RefreshRouletteComponent();
  }
  RefreshCurrentGridData(e) {
    this.GridDataDecorator(e);
    this.GetCurrentGrid()?.RefreshGrid(e);
    this.RefreshRouletteComponent();
  }
  GetGridByIndex(e) {
    if (!(e < 0) && !(e >= this.RouletteGridList.length)) {
      return this.RouletteGridList[e];
    }
  }
  SetAllGridDeselect() {
    for (const e of this.RouletteGridList) {
      e.SetGridToggleState(false);
    }
  }
}
class RouletteComponentAssemblyExplore extends (exports.RouletteComponentAssembly = RouletteComponentAssembly) {
  GetRouletteInfoMap() {
    return RouletteComponent_1.exploreRouletteMap;
  }
}
exports.RouletteComponentAssemblyExplore = RouletteComponentAssemblyExplore;
class RouletteComponentAssemblyFunction extends RouletteComponentAssembly {
  GetRouletteInfoMap() {
    return RouletteComponent_1.functionRouletteMap;
  }
}
exports.RouletteComponentAssemblyFunction = RouletteComponentAssemblyFunction;
//# sourceMappingURL=RouletteComponentAssembly.js.map