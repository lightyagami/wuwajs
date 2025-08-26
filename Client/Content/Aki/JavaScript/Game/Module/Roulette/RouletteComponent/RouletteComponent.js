"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteComponentBase = exports.trapDefenseExploreRouletteMap = exports.exploreRouletteMap = exports.functionRouletteMap = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RouletteDefine_1 = require("../Data/RouletteDefine");
const RouletteGridData_1 = require("../RouletteGrid/RouletteGridData");
exports.functionRouletteMap = [[[1], 4, 1], [[2], 5, 1], [[3], 6, 1], [[4], 7, 1], [[5], 8, 1], [[6], 9, 1], [[7], 10, 1], [[8], 11, 1]];
exports.exploreRouletteMap = [[[1], 4, 0], [[2], 5, 0], [[3], 6, 0], [[4], 7, 0], [[5], 8, 0], [[6], 9, 0], [[7], 10, 0], [[8], 11, 2]];
exports.trapDefenseExploreRouletteMap = [[[1], 4, 0], [[2], 5, 0], [[3], 6, 0], [[4], 7, 0], [[5], 8, 0], [[6], 9, 0], [[7], 10, 0], [[8], 11, 0]];
class RouletteComponentBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.v0o = undefined;
    this.Angle = -1;
    this.AreaIndex = 0;
    this.cie = new UE.Rotator(0, 0, 0);
    this.CurrentGridIndex = -1;
    this.CurrentEquipGridIndex = -1;
    this.IsEmptyChoose = true;
    this.RouletteGridList = [];
    this.AreaIndexToGridIndex = new Map();
    this.ToggleEventList = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.v0o = this.GetItem(2);
  }
  OnBeforeDestroy() {
    this.v0o = undefined;
    this.cie = undefined;
    this.M0o();
    this.AreaIndexToGridIndex.clear();
    this.AreaIndexToGridIndex = undefined;
    this.ToggleEventList = [];
  }
  Reset() {
    this.AreaIndex = 0;
    this.Angle = -1;
    this.RefreshRouletteComponent();
  }
  E0o() {
    this.M0o();
    var t = this.GetRouletteInfoMap();
    let e = 0;
    var i = new Map([[0, 0], [1, 0], [2, 0]]);
    for (const a of t) {
      for (const u of a[0]) {
        this.AreaIndexToGridIndex.set(u, e);
      }
      var s = a[1];
      var h = a[2];
      var r = i.get(h);
      var o = new RouletteGridData_1.RouletteData();
      o.Id = this.GetGridId(r, h);
      o.GridIndex = e;
      o.DataIndex = r;
      o.GridType = h;
      var s = this.GetItem(s);
      var n = new RouletteGridData_1.rouletteGridGenerator[h]();
      n.SetRootActor(s.GetOwner(), true);
      this.GridDataDecorator(o);
      n.RefreshGrid(o);
      var s = this.IsCurrentEquippedId(o);
      if (s) {
        this.CurrentEquipGridIndex = o.GridIndex;
      }
      n.SetGridEquipped(s);
      this.InitGridEvent(n);
      this.RouletteGridList.push(n);
      i.set(h, r + 1);
      e++;
    }
  }
  GetGridId(t, e) {
    return 0;
  }
  GetRouletteInfoMap() {}
  InitGridEvent(t) {
    for (const e of this.ToggleEventList) {
      t.AddToggleStateChangeEvent(e);
    }
  }
  GridDataDecorator(t) {
    t.State = this.JudgeGridStateByData(t.Id, t.GridType);
    return t;
  }
  AddAllGridToggleEvent(t) {
    this.ToggleEventList.push(t);
  }
  AddAllGridToggleCanExecuteChangeEvent(t) {
    for (const e of this.RouletteGridList) {
      e.BindOnCanToggleExecuteChange(t);
    }
  }
  IsCurrentEquippedId(t) {
    return false;
  }
  JudgeGridStateByData(t, e) {
    return 1;
  }
  M0o() {
    for (const t of this.RouletteGridList) {
      t.SetGridEquipped(false);
      t.SetGridToggleState(false);
    }
    this.RouletteGridList = [];
  }
  GamepadReturnEmptyGrid() {}
  RefreshCurrentGridIndex(t) {
    this.AreaIndex = t;
    t = this.AreaIndexToGridIndex.get(this.AreaIndex);
    if (t !== undefined) {
      this.CurrentGridIndex = t;
      this.IsEmptyChoose = false;
    } else if (Info_1.Info.IsInGamepad()) {
      this.GamepadReturnEmptyGrid();
    } else {
      this.CurrentGridIndex = -1;
      this.IsEmptyChoose = true;
    }
  }
  GetCurrentGrid() {
    if (this.CurrentGridIndex !== -1) {
      return this.RouletteGridList[this.CurrentGridIndex];
    }
  }
  SetAllGridToggleSelfInteractive(t) {
    for (const e of this.RouletteGridList) {
      e.SetToggleSelfInteractive(t);
    }
  }
  GetCurrentIndexAndAngle() {
    return [this.AreaIndex, this.Angle];
  }
  RefreshRouletteComponent() {
    this.RefreshCurrentShowName();
    this.RefreshTips();
  }
  Refresh(t, e) {
    var i;
    var s;
    if (t !== undefined && this.AreaIndex !== t) {
      i = this.AreaIndex === 0;
      s = (this.AreaIndexToGridIndex.get(this.AreaIndex) ?? -1) !== (this.AreaIndexToGridIndex.get(t) ?? -1);
      if (!i && s) {
        this.SetCurrentToggleState(false);
      }
      this.RefreshCurrentGridIndex(t);
      if (!this.IsEmptyChoose && s) {
        this.SetCurrentToggleState(true);
      }
      this.RefreshCurrentShowName();
      if (i || this.IsEmptyChoose) {
        this.SetRingVisible(!this.IsEmptyChoose);
      }
      this.RefreshTips();
    }
    if (e !== undefined && this.Angle !== e) {
      this.Angle = e;
      if (!this.IsEmptyChoose) {
        this.S0o(this.Angle);
      }
    }
  }
  SetCurrentToggleState(t) {}
  S0o(t) {
    this.cie.Yaw = t;
    this.v0o.SetUIRelativeRotation(this.cie);
  }
  SetRingVisible(t) {
    this.v0o.SetUIActive(t);
  }
  RefreshCurrentShowName() {
    var t = this.GetCurrentGrid()?.Data?.Name ?? RouletteDefine_1.ROULETTE_TEXT_EMPTY;
    this.RefreshName(t);
  }
  RefreshName(t) {
    this.GetText(0).ShowTextNew(t);
  }
  SetNameVisible(t) {
    this.GetText(0).SetUIActive(t);
  }
  RefreshTips() {}
  RefreshTipsByText(t, e = 0) {
    var i;
    if (t !== undefined) {
      i = this.GetText(1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
    }
  }
  SetTipsActive(t) {
    this.GetText(1).SetUIActive(t);
  }
  RefreshRouletteType() {
    this.RefreshRouletteItem();
    this.Reset();
    this.E0o();
  }
  RefreshRouletteItem() {}
  RefreshRoulettePlatformType() {
    this.Reset();
  }
  RefreshRouletteInputType() {
    this.Reset();
  }
}
exports.RouletteComponentBase = RouletteComponentBase;
//# sourceMappingURL=RouletteComponent.js.map