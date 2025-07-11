"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonItemCountPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("./LevelSequencePlayer");
const MAX_DIGIT = 4;
const MAX_NUMBER = "9999";
const KEYCOUNT = 9;
class CommonItemCountPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.fTt = "";
    this.pTt = undefined;
    this.vTt = undefined;
    this.SPe = undefined;
    this.Tct = t => {
      if (t === "Close") {
        this.SetActive(false);
      }
    };
    this.m2e = () => {
      this.PlayCloseSequence();
    };
    this.Mke = () => {
      this.vTt?.(parseInt(this.t6));
      this.PlayCloseSequence();
    };
    this.MTt = () => {
      this.t6 = this.t6.substr(0, this.t6.length - 1);
    };
  }
  get t6() {
    return this.fTt;
  }
  set t6(t) {
    this.fTt = t;
    this.GetText(0).SetText(this.fTt);
    this.GetInteractionGroup(4).SetInteractable(this.fTt.length > 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIInteractionGroup], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIText]];
    this.BtnBindInfo = [[1, this.m2e], [3, this.Mke], [2, this.MTt]];
  }
  OnStart() {
    this.pTt = [];
    for (let t = 0; t <= KEYCOUNT; t++) {
      var e = this.GetButton(5 + t);
      this.pTt.push(e);
    }
    for (let t = 0; t <= KEYCOUNT; t++) {
      this.pTt[t].OnClickCallBack.Bind(() => {
        if (this.t6.length < MAX_DIGIT) {
          this.t6 += t;
        } else {
          this.t6 = MAX_NUMBER;
        }
      });
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.Tct);
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
    for (const t of this.pTt) {
      t.OnClickCallBack.Unbind();
    }
  }
  UpdateView(t) {
    this.t6 = t.toString();
    this.RootItem.SetUIActive(true);
    this.RootItem.SetAsLastHierarchy();
  }
  SetTitleText(t) {
    this.GetText(15).SetText(t);
  }
  PlayStartSequence(t) {
    this.SetActive(true);
    this.SPe.PlayLevelSequenceByName("Start");
    this.UpdateView(t);
  }
  PlayCloseSequence() {
    this.SPe.PlayLevelSequenceByName("Close");
  }
  SetConfirmFunction(t) {
    this.vTt = t;
  }
}
exports.CommonItemCountPanel = CommonItemCountPanel;
//# sourceMappingURL=CommonCountPanel.js.map