"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CipherKey = undefined;
const UE = require("ue");
const CircleAttachView_1 = require("../../Module/AutoAttach/CircleAttachView");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const CipherCircleAttachItem_1 = require("./CipherCircleAttachItem");
const INITGP = 0;
const LEN = 10;
class CipherKey extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.yye = undefined;
    this.Iye = undefined;
    this.Tye = undefined;
    this.Lye = undefined;
    this.Dye = undefined;
    this.Rye = 0;
    this.Uye = (t, i, e) => {
      t = new CipherCircleAttachItem_1.CipherCircleAttachItem(t);
      t.InitData(this.KeyIndex, this.Dye);
      this.Lye.push(t);
      return t;
    };
    this.KeyIndex = i;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.Tye = new Array();
    for (let t = 0; t < 10; t++) {
      this.Tye.push(t);
    }
    this.Lye = new Array();
    this.Dye = t => {
      this.Aye(t);
    };
    this.Iye?.Clear();
    this.Iye = undefined;
    this.Iye = new CircleAttachView_1.CircleAttachView(this.GetItem(0).GetOwner());
    this.Iye.SetAudioEvent("ui_cipher_picker_tick");
    this.Iye.CreateItems(this.GetItem(1).GetOwner(), INITGP, this.Uye, 1);
    this.GetItem(1).SetUIActive(false);
    this.Iye.ReloadView(LEN, this.Tye);
    this.Iye.AttachToIndex(0);
    this.AddEvent();
  }
  OnBeforeDestroy() {
    this.RemoveEvent();
    this.Iye.Clear();
  }
  AddEvent() {}
  RemoveEvent() {}
  InitKey(t) {
    this.yye = t;
  }
  Aye(t) {
    this.Rye = t;
    if (this.yye) {
      this.yye(this.KeyIndex, t);
    }
  }
  HandleConfirm(t) {
    for (const i of this.Lye) {
      if (i.GetNumber() === this.Rye) {
        i.HandleConfirm(t);
        return;
      }
    }
  }
  HandleRest() {
    this.Iye.ReloadView(LEN, this.Tye);
    this.Iye.AttachToIndex(0);
  }
}
exports.CipherKey = CipherKey;
//# sourceMappingURL=CipherKey.js.map