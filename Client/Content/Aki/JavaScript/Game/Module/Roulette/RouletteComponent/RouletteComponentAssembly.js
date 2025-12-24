"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteComponentAssembly = undefined;
const RouletteGridForbiddenSettings_1 = require("../RouletteGrid/RouletteGridForbiddenSettings");
const RouletteComponent_1 = require("./RouletteComponent");
class RouletteComponentAssembly extends RouletteComponent_1.RouletteComponentBase {
  constructor() {
    super(...arguments);
    this.ViewProxy = undefined;
  }
  RegisterViewProxy(t) {
    this.ViewProxy = t;
  }
  IsCurrentEquippedId(t) {
    return false;
  }
  GamepadReturnEmptyGrid() {
    this.IsEmptyChoose = false;
  }
  JudgeGridStateByData(t, e) {
    if (t !== undefined && t !== 0) {
      if ((e = RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.CheckGridSpecialState(0, e, t)) !== undefined) {
        return e;
      } else {
        return 1;
      }
    } else {
      return 2;
    }
  }
  SetCurrentToggleState(t) {
    this.GetCurrentGrid()?.SetGridToggleNavigation(t);
  }
  InitGridEvent(t) {
    super.InitGridEvent(t);
    t.SetGridToggleChangeEvent();
  }
  GridDataDecorator(t) {
    t.State = this.JudgeGridStateByData(t.Id, t.GridType);
    t.ShowIndex = true;
    t.ShowRedDot = false;
    return t;
  }
  GetRouletteInfoMap() {
    return this.ViewProxy.GetRouletteDataMap();
  }
  GetGridId(t, e) {
    return this.ViewProxy.GetRouletteGridId(t, e);
  }
  GetGridByValidId(t) {
    if (t !== 0 && t !== undefined) {
      for (const e of this.RouletteGridList) {
        if (e.Data.Id === t) {
          return e;
        }
      }
    }
  }
  SetCurrentGridByData(t) {
    this.CurrentGridIndex = t.GridIndex;
    this.RefreshRouletteComponent();
  }
  RefreshCurrentGridData(t) {
    this.GridDataDecorator(t);
    this.GetCurrentGrid()?.RefreshGrid(t);
    this.RefreshRouletteComponent();
  }
  DeactivateGridToggleChangeEvent() {
    for (const t of this.RouletteGridList) {
      t.RemoveGridToggleChangeEvent();
    }
  }
  GetGridByIndex(t) {
    if (!(t < 0) && !(t >= this.RouletteGridList.length)) {
      return this.RouletteGridList[t];
    }
  }
}
exports.RouletteComponentAssembly = RouletteComponentAssembly;
//# sourceMappingURL=RouletteComponentAssembly.js.map