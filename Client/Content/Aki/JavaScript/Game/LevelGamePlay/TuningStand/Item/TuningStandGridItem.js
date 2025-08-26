"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandGridItem = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const GridProxyAbstract_1 = require("../../../Module/Util/Grid/GridProxyAbstract");
const TuningStandDefine_1 = require("../TuningStandDefine");
const TuningStandGridEndItem_1 = require("./TuningStandGridEndItem");
const TuningStandGridNumItem_1 = require("./TuningStandGridNumItem");
const TuningStandGridStartItem_1 = require("./TuningStandGridStartItem");
class TuningStandGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Grid = undefined;
    this.TimeHandle = undefined;
  }
  Refresh(t, i, e) {
    if ((this.Data = t).GridType !== IAction_1.ETuningStandGridType.Empty && this.Grid) {
      this.Grid.SetUiActive(false);
      this.eRu();
      this.PlayShowAnim();
    }
  }
  async CreateGrid() {
    var t = this.Data;
    let i = "";
    switch (t.GridMainType) {
      case 3:
        i = "UiItem_DigitalMazeLatticeEnd";
        this.Grid = new TuningStandGridEndItem_1.TuningStandGridEndItem(t);
        break;
      case 1:
        i = "UiItem_DigitalMazeLatticeStart";
        this.Grid = new TuningStandGridStartItem_1.TuningStandGridStartItem(t);
        break;
      case 2:
        i = "UiItem_DigitalMazeLattice";
        this.Grid = new TuningStandGridNumItem_1.TuningStandGridNumItem(t);
        break;
      default:
        return;
    }
    await this.Grid.CreateThenShowByResourceIdAsync(i, this.GetRootItem());
    this.Grid.SetUiActive(false);
  }
  RefreshGrid() {
    if (this.Data.GridType !== IAction_1.ETuningStandGridType.Empty) {
      this.Grid.OnRefreshGrid();
    }
  }
  GetGrid() {
    return this.Grid;
  }
  eRu() {
    if (this.Data.GridType !== IAction_1.ETuningStandGridType.Empty) {
      this.Grid.ResetGrid(this.Data);
    }
  }
  PlayShowAnim() {
    if (this.Data.GridType !== IAction_1.ETuningStandGridType.Empty) {
      if (this.TimeHandle) {
        if (TimerSystem_1.TimerSystem.Has(this.TimeHandle)) {
          TimerSystem_1.TimerSystem.Remove(this.TimeHandle);
        }
        this.TimeHandle = undefined;
      }
      const e = this.Data.GetCenterDistance();
      if (e === 0) {
        this.Grid.SetUiActive(true);
        this.Grid.PlayInAnim(0);
      } else {
        let i = 0;
        for (let t = 1; t <= e; t++) {
          i += TuningStandDefine_1.ANIM_IN_TIME / t;
        }
        this.TimeHandle = TimerSystem_1.TimerSystem.Delay(() => {
          this.Grid.SetUiActive(true);
          this.Grid.PlayInAnim(e);
        }, i / 2);
      }
    }
  }
  OnLinkMiss(t) {
    if (this.Data.GridType !== IAction_1.ETuningStandGridType.Empty) {
      this.Grid.OnLinkMiss(t);
    }
  }
  StartRevolving() {
    if (this.Data.GridType !== IAction_1.ETuningStandGridType.Empty) {
      this.Grid.StartRevolving();
    }
  }
}
exports.TuningStandGridItem = TuningStandGridItem;
//# sourceMappingURL=TuningStandGridItem.js.map