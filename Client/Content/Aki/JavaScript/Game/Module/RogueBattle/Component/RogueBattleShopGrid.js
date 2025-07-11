"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleShopGrid = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const RogueBattleShopGridComponent_1 = require("./RogueBattleShopGridComponent");
class RogueBattleShopGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.SelectCallback = undefined;
  }
  OnRefresh(e, t, o) {
    var i;
    var r = (this.Data = e)._Ic;
    if (r && (i = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(r.v9n)) && (i = {
      Type: 4,
      Data: e,
      IconPath: i.BuffIcon,
      QualityId: i.Quality,
      QualityType: "MediumItemGridQualitySpritePath",
      IsDisable: !!r && r.O2s
    }, this.Apply(i), r)) {
      i = this.RefreshComponent(RogueBattleShopGridComponent_1.RogueBattleDiscountTagComponent, true, e);
      r = r.qN_ !== r.kN_;
      this.SetComponentVisible(i, r);
      i = this.RefreshComponent(RogueBattleShopGridComponent_1.RogueBattleShopDiscount, true, e);
      this.SetComponentVisible(i, true);
      r = this.RefreshComponent(RogueBattleShopGridComponent_1.RogueBattleGridElementComponent, true, e);
      this.SetComponentVisible(r, true);
    }
  }
  OnExtendToggleStateChanged(e) {
    if (e === 1) {
      this.OnSelected(true);
    }
  }
  OnSelected(e) {
    this.SetSelected(true);
    ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = this.Data;
    if (e) {
      this.SelectCallback?.(this.GridIndex, this.Data);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false);
    ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = undefined;
  }
}
exports.RogueBattleShopGrid = RogueBattleShopGrid;
//# sourceMappingURL=RogueBattleShopGrid.js.map