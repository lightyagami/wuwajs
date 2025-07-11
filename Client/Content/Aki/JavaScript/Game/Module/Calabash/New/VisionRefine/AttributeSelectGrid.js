"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeSelectGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class AttributeSelectGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.v1c = undefined;
    this.OnClickToggleCallBack = undefined;
    this.kqe = () => {
      this.OnClickToggleCallBack?.(this.v1c, this.GridIndex);
    };
    this.Lke = () => !!this.v1c && !this.v1c.IsDisable;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UITexture], [3, UE.UIItem]];
    this.BtnBindInfo = [[1, this.kqe]];
  }
  OnStart() {
    this.GetItem(3).SetUIActive(false);
    this.GetExtendToggle(1).CanExecuteChange.Unbind();
    this.GetExtendToggle(1).SetToggleState(2);
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.Lke);
  }
  Refresh(t, i, s) {
    this.v1c = t;
    var e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t.PropIndexId);
    this.GetText(0).ShowTextNew(e.Name);
    var r = this.GetTexture(2);
    this.SetTextureShowUntilLoaded(e.Icon, r);
    r.SetChangeColor(true, r.changeColor);
    this.GetItem(3).SetUIActive(t.IsRecommend);
    var e = i ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(e);
  }
  OnSelected(t) {
    this.GetExtendToggle(1).SetToggleState(1, false);
  }
  OnDeselected(t) {
    this.GetExtendToggle(1).SetToggleState(0, false);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).CanExecuteChange.Unbind();
  }
}
exports.AttributeSelectGrid = AttributeSelectGrid;
//# sourceMappingURL=AttributeSelectGrid.js.map