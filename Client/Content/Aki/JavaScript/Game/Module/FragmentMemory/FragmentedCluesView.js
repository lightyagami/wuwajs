"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FragmentedCluesView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
class FragmentedCluesView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.uwn = undefined;
    this.cwn = undefined;
    this.mwn = undefined;
    this.eBo = 0;
    this.dwn = 0;
    this.Cwn = () => {
      this.gwn();
      this.eBo--;
      if (this.eBo < 0) {
        this.eBo = 0;
      }
      this.Og();
    };
    this.fwn = () => {
      this.gwn();
      this.eBo++;
      if (this.eBo > this.dwn - 1) {
        this.eBo = this.dwn - 1;
      }
      this.Og();
    };
    this.pwn = () => new MemoryPageDot();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.Cwn], [5, this.fwn]];
  }
  gwn() {
    this.uwn[this.eBo] = false;
  }
  OnStart() {
    this.mwn = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.pwn);
  }
  OnBeforeShow() {
    this.cwn = this.OpenParam;
    this.uwn = [];
    var i = this.cwn.GetClueContent().length;
    for (let t = 0; t < i; t++) {
      this.uwn?.push(false);
    }
    this.dwn = this.uwn.length;
    this.eBo = 0;
    this.uwn[this.eBo] = true;
    this.Og();
  }
  Og() {
    this.vwn();
    this.Aqe();
    this.P5e();
    this.ufo();
    this.Mwn();
    this.Swn();
  }
  Ewn(t) {
    return this.cwn.GetClueContent()[t].Texture;
  }
  ywn(t) {
    return this.cwn.GetClueContent()[t].Desc;
  }
  P5e() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.cwn.GetClueEntrance().Title);
  }
  ufo() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.ywn(this.eBo));
  }
  Mwn() {
    var t = this.eBo < this.dwn - 1;
    this.GetButton(5)?.SetSelfInteractive(t);
  }
  Swn() {
    var t = this.eBo > 0;
    this.GetButton(4)?.SetSelfInteractive(t);
  }
  Aqe() {
    var t = this.Ewn(this.eBo);
    this.SetTextureByPath(t, this.GetTexture(1));
  }
  vwn() {
    this.uwn[this.eBo] = true;
    this.mwn.RefreshByData(this.uwn);
  }
}
exports.FragmentedCluesView = FragmentedCluesView;
class MemoryPageDot extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  Refresh(t, i, e) {
    this.GetItem(0)?.SetUIActive(t);
  }
}
//# sourceMappingURL=FragmentedCluesView.js.map