"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleDamageView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
class PhantomArenaBattleDamageView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIArtText], [2, UE.UIArtText]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.GetArtText(0)?.SetText(e.toString());
    this.GetArtText(1)?.SetText(e.toString());
    this.GetArtText(2)?.SetText(e.toString());
  }
}
exports.PhantomArenaBattleDamageView = PhantomArenaBattleDamageView;
//# sourceMappingURL=PhantomArenaBattleDamageView.js.map