"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDetailItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TowerDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
    this.IDo = undefined;
    this.TDo = -1;
    this.kqe = () => {
      if (this.IDo) {
        this.IDo(this.TDo);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(e, t, i) {
    this.TDo = e;
    var r = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_TowerOnlyFloor_Text", r.Floor);
    if (e === ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor) {
      this.SetToggleState(1);
    } else {
      this.SetToggleState(0);
    }
  }
  BindOnClickToggle(e) {
    this.IDo = e;
  }
  SetToggleState(e) {
    this.GetExtendToggle(0).SetToggleState(e);
    if (e === 1) {
      this.kqe();
    }
  }
  OnBeforeDestroy() {
    this.IDo = undefined;
  }
}
exports.TowerDetailItem = TowerDetailItem;
//# sourceMappingURL=TowerDetailItem.js.map