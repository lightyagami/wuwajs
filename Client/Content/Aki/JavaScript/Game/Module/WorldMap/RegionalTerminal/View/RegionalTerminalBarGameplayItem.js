"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalBarGameplayItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RegionalTerminalBarGameplayItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.l4e = undefined;
    this.eBl = 0;
    this.nqe = () => {
      this.Pe.BarFunction();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  Refresh(t, e, i) {
    this.Pe = t;
    var r = ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalByGameplayId(this.Pe.Id);
    var s = this.GetTexture(1);
    s.SetChangeColor(t.GetLockState(), s.changeColor);
    this.SetTextureShowUntilLoaded(r.Icon, s);
    this.K8e();
    this.khf();
  }
  OnBeforeDestroy() {
    this.Ovt();
  }
  khf() {
    this.GetItem(3)?.SetUIActive(ModelManager_1.ModelManager.RegionalTerminalModel.IsGameplayPin(this.Pe.Id));
    this.GetItem(2)?.SetUIActive(this.Pe.GetLockState());
  }
  K8e() {
    this.Ovt();
    this.l4e = this.Pe.GetRedDotName();
    this.eBl = this.Pe.GetRedDotId();
    var t = this.GetItem(4);
    if (this.l4e) {
      RedDotController_1.RedDotController.BindRedDot(this.l4e, t, undefined, this.eBl);
    } else {
      t.SetUIActive(this.Pe.GetRedDotState());
    }
  }
  Ovt() {
    var t;
    if (this.l4e) {
      t = this.GetItem(4);
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, t, this.eBl);
      this.eBl = 0;
      this.l4e = undefined;
    }
  }
}
exports.RegionalTerminalBarGameplayItem = RegionalTerminalBarGameplayItem;
//# sourceMappingURL=RegionalTerminalBarGameplayItem.js.map