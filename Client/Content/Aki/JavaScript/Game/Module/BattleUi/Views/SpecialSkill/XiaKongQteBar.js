"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XiaKongQteBar = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class XiaKongQteBar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.lat = undefined;
    this.hBa = undefined;
    this.Lrt = true;
    this.kwc = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture]];
  }
  Init(i) {
    this.lat = i;
    this.lat.SetEnable(this.kwc);
  }
  Refresh(i) {
    this.hBa = i;
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetTexture(1).SetFillAmount(1);
    this.GetTexture(1).SetUIActive(false);
    this.kwc = false;
  }
  OnBeforeDestroy() {
    if (this.SPe) {
      this.SPe?.Clear();
      this.SPe = undefined;
    }
  }
  Tick(i) {
    var e;
    if (this.hBa) {
      if (this.hBa.GetNextEndCircleIndex() >= this.hBa.GetNextGenCircleIndex()) {
        this.ehr(false);
      } else {
        this.ehr(true);
        if ((e = this.hBa.GetNextEndCircleAttrValue() / this.hBa.GetMinAttrValue()) >= 1) {
          this.qwc(true);
        } else {
          this.GetTexture(0)?.SetFillAmount((e - 0.5) / 0.5);
          this.qwc(false);
        }
      }
    }
  }
  ehr(i) {
    if (this.Lrt !== i) {
      this.Lrt = i;
      this.SetActive(i);
      this.lat?.SetActive(i);
    }
  }
  qwc(i) {
    if (this.kwc !== i) {
      this.kwc = i;
      this.GetTexture(1).SetUIActive(i);
      this.lat?.SetEnable(i);
      if (i) {
        this.SPe?.PlayLevelSequenceByName("Full");
      } else {
        this.SPe?.PlayLevelSequenceByName("Use");
      }
    }
  }
}
exports.XiaKongQteBar = XiaKongQteBar;
//# sourceMappingURL=XiaKongQteBar.js.map