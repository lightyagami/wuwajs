"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleRandomEventItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RogueBattleRandomEventItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.fqc = () => {
      if (this.GetExtendToggle(0).GetToggleState() === 1) {
        this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.fqc]];
  }
  Refresh(e, t, s) {
    this.Data = e;
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1);
    ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = this.Data;
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0);
    ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = undefined;
  }
}
exports.RogueBattleRandomEventItem = RogueBattleRandomEventItem;
//# sourceMappingURL=RogueBattleRandomEventItem.js.map