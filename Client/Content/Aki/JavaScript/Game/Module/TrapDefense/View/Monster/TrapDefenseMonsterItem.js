"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterItem = undefined;
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class TrapDefenseMonsterItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor(e = false) {
    super();
    this.IsWave = e;
    this.BdBuffData = undefined;
    this.OnSelectMonsterItemCallback = undefined;
    this.OnClickMonsterItemCallback = undefined;
    this.CanExecuteChangeCallback = undefined;
    this.OnShowNumCallback = undefined;
    this.kGd = () => {
      if (this.BdBuffData !== this.Data) {
        this.UpdateBuffInfo();
      }
    };
  }
  OnStart() {
    this.AllComponentLoadedCallback = this.kGd;
  }
  OnRefresh(e) {
    this.BdBuffData = e;
    this.UpdateBuffInfo();
  }
  UpdateBuffInfo() {
    var e;
    var t;
    if (!this.IsAnyComponentLoading) {
      e = this.BdBuffData;
      t = this.OnShowNumCallback?.(e);
      t = {
        Type: 4,
        IconPath: e.IconPath,
        QualityIcon: e.GetQualityPathGrid(),
        TagPathList: e.GetGridTagPathList(),
        RightTopValue: t,
        Data: e
      };
      this.Apply(t);
    }
  }
  CheckWaveUpdate(e) {
    if (this.IsWave) {
      e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster.IsSameWaveAndMonster(e, this.BdBuffData);
      if (this.IsSelected && !e) {
        this.ScrollViewDelegate?.ClearSelectInfo();
      }
      this.SetSelected(e);
    }
  }
  OnSelected() {
    this.SetSelected(true);
    this.OnSelectMonsterItemCallback?.(this.BdBuffData);
  }
  OnDeselected() {
    this.SetSelected(false);
  }
  OnBeforeDestroy() {}
  OnExtendToggleStateChanged(e) {
    if (e === 1) {
      this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
    } else if (this.IsSelected) {
      this.SetSelected(true);
    }
  }
  OnCanExecuteChange() {
    return this.CanExecuteChangeCallback?.(this.BdBuffData) ?? true;
  }
  OnExtendToggleClicked() {
    this.OnClickMonsterItemCallback?.(this.BdBuffData);
  }
}
exports.TrapDefenseMonsterItem = TrapDefenseMonsterItem;
//# sourceMappingURL=TrapDefenseMonsterItem.js.map