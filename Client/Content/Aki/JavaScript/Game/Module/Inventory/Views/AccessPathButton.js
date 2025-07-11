"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessPathButton = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AccessPathButton extends UiPanelBase_1.UiPanelBase {
  constructor(t, s) {
    super();
    this.Rmi = () => {
      if (this.Umi) {
        this.Umi(this.Ami);
      }
    };
    this.Ami = s;
    this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIToggleComponent]];
    this.BtnBindInfo = [[6, this.Rmi]];
  }
  OnStart() {
    var t;
    var s;
    var e;
    var i;
    var a;
    var n;
    var r = ConfigManager_1.ConfigManager.InventoryConfig.GetAccessPathConfig(this.Ami);
    if (r && (t = this.GetText(0), s = this.GetText(1), e = this.GetText(2), i = this.GetText(3), a = this.GetText(4), n = this.GetText(5), t) && s && e && i && a && n) {
      r = r.Description;
      t.ShowTextNew(r);
      s.ShowTextNew(r);
      e.ShowTextNew(r);
      i.ShowTextNew(r);
      a.ShowTextNew(r);
      n.ShowTextNew(r);
    }
  }
  OnBeforeDestroy() {
    this.Umi = undefined;
  }
  BindOnGetWayButtonClickedCallback(t) {
    this.Umi = t;
  }
}
exports.AccessPathButton = AccessPathButton;
//# sourceMappingURL=AccessPathButton.js.map