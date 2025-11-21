"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMarkProgressItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MapMarkProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DNl = undefined;
    this.d_d = s => {
      this.DNl?.SetProgressCallback(s);
      this.GetText(1).SetText((s / this.DNl.ProgressMax * 100).toFixed(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISliderComponent]];
  }
  Refresh(s) {
    this.DNl = s;
    this.GetText(0).ShowTextNew(s.NameId);
    var t = s.Progress;
    var r = this.GetSlider(2);
    r.SetMinValue(s.ProgressMin, false, false);
    r.SetMaxValue(s.ProgressMax, false, false);
    r.SetValue(t, true);
    r.OnValueChangeCb.Bind(this.d_d);
    this.GetText(1).SetText((t / this.DNl.ProgressMax * 100).toFixed(0));
  }
}
exports.MapMarkProgressItem = MapMarkProgressItem;
//# sourceMappingURL=MapMarkProgressItem.js.map