"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksMenuOrnamentItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class DrinksMenuOrnamentItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Id = 0;
    this.IsSelectOnCb = undefined;
    this.OnToggleStateChangeFunction = undefined;
    this.Yai = t => {
      if (t === 1 && this.OnToggleStateChangeFunction) {
        this.OnToggleStateChangeFunction(this.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText]];
  }
  OnStart() {
    this.GetExtendToggle(0).OnStateChange.Add(this.Yai);
  }
  OnSelected(t) {
    if (this.IsSelectOnCb && this.Id !== 0) {
      this.Oei(this.IsSelectOnCb(this.Id));
    }
  }
  Refresh(t, i, e) {
    this.Id = t;
    var s = ConfigManager_1.ConfigManager.DrinksConfig.GetOrnament(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), s.Name);
    this.SetTextureByPath(s.Icon, this.GetTexture(1));
    if (this.IsSelectOnCb) {
      this.Oei(this.IsSelectOnCb(t));
    }
  }
  Oei(t, i = false) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0, i);
  }
}
exports.DrinksMenuOrnamentItem = DrinksMenuOrnamentItem;
//# sourceMappingURL=DrinksMenuOrnamentItem.js.map