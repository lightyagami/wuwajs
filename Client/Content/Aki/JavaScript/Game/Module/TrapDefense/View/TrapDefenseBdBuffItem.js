"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdBuffItem = undefined;
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const GlobalData_1 = require("../../../GlobalData");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class TrapDefenseBdBuffItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.BdBuffData = undefined;
    this.OnSelectBuffItemCallback = undefined;
    this.OnClickBuffItemCallback = undefined;
    this.CanExecuteChangeCallback = undefined;
    this.OnIsShowBdBuffLockStateCallback = undefined;
    this.OnIsNewTagStateCallback = undefined;
    this.OnGetBdBuffConfig = undefined;
    this.o1c = false;
    this.r5d = () => {
      if (this.o1c) {
        this.o1c = false;
        this.UpdateBuffInfo();
      }
    };
  }
  OnStart() {
    this.SetUseFixedAsync(true);
    this.AllComponentLoadedCallback = this.r5d;
  }
  OnRefresh(t) {
    this.BdBuffData = t;
    this.UpdateBuffInfo();
  }
  UpdateBuffInfo() {
    var t;
    var e;
    var i;
    var s;
    if (this.IsAnyComponentLoading) {
      this.o1c = true;
    } else {
      t = this.BdBuffData;
      s = !!this.OnIsShowBdBuffLockStateCallback?.(t);
      e = this.OnGetBdBuffConfig?.(t) ?? t.BdBuffConfig;
      i = s ? "TrapDefense_BdBuff_LockShowName" : e.Name;
      s = {
        Type: 4,
        IconPath: e.Icon,
        QualityId: t.Config.Quality,
        IsLockVisible: s,
        IsDisable: s,
        BottomTextId: i,
        IsUpGrade: t.IsStrengthen(e),
        IsNewVisible: this.OnIsNewTagStateCallback?.(t),
        SubIconPath: e.SubIcon,
        Data: t
      };
      this.Apply(s);
    }
  }
  OnSelected() {
    this.SetSelected(true);
    this.OnSelectBuffItemCallback?.(this.BdBuffData, this);
  }
  OnDeselected() {
    this.SetSelected(false);
  }
  OnBeforeDestroy() {}
  OnExtendToggleStateChanged(t) {
    if (t === 1) {
      this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
    } else if (this.IsSelected) {
      this.SetSelected(true);
    }
  }
  OnCanExecuteChange() {
    return this.CanExecuteChangeCallback?.(this.BdBuffData) ?? true;
  }
  OnExtendToggleClicked() {
    this.OnClickBuffItemCallback?.(this.BdBuffData);
  }
}
exports.TrapDefenseBdBuffItem = TrapDefenseBdBuffItem;
//# sourceMappingURL=TrapDefenseBdBuffItem.js.map