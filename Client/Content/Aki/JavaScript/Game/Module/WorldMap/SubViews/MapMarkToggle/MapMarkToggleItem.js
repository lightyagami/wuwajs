"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMarkToggleItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MapMarkToggleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DNl = undefined;
    this.Cke = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 69, this.constructor.name, ["IsChecked", t === 1]);
      }
      this.DNl?.SetToggleStateCallback?.(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.Cke]];
  }
  Refresh(t) {
    this.DNl = t;
    this.GetExtendToggle(0).SetToggleState(t.GetToggleResultCallback());
    this.GetText(1).ShowTextNew(t.NameId);
  }
}
exports.MapMarkToggleItem = MapMarkToggleItem;
//# sourceMappingURL=MapMarkToggleItem.js.map