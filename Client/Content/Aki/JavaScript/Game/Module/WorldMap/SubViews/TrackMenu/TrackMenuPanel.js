"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackMenuPanel = undefined;
const UE = require("ue");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const TrackMenuItem_1 = require("./TrackMenuItem");
class TrackMenuPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments);
    this.VNl = undefined;
    this.d5a = [];
  }
  GetResourceId() {
    return "UiItem_MapHandleNav";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.Close]];
  }
  OnStart() {
    this.GetItem(1).SetUIActive(false);
  }
  HNl(t) {
    var i = this.d5a.length;
    if (t !== i) {
      if (i < t) {
        for (let e = i; e < t; ++e) {
          var r = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(1), this.GetVerticalLayout(0).RootUIComp);
          this.d5a.push(r);
        }
      } else {
        for (let e = t; e < i; ++e) {
          this.d5a[e].SetUIActive(false);
        }
      }
    }
  }
  OnShowWorldMapSecondaryUi(e) {
    this.HNl(e.length);
    this.VNl = [];
    e.forEach((e, t) => {
      var i = new TrackMenuItem_1.TrackMenuItem();
      this.VNl.push(i);
      i.Init(this.d5a[t], e);
    });
  }
  OnCloseWorldMapSecondaryUi() {
    this.d5a.splice(0, this.VNl.length);
    this.VNl.forEach(e => {
      e.Destroy();
    });
    this.VNl = [];
  }
  OnBeforeDestroy() {
    this.VNl = [];
  }
  GetNeedBgItem() {
    return false;
  }
}
exports.TrackMenuPanel = TrackMenuPanel;
//# sourceMappingURL=TrackMenuPanel.js.map