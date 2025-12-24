"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaSealItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
class PhantomArenaSealItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.IsInSeal = false;
    this.$xt = e => {
      if (e === "Unlock") {
        this.SetActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.$xt);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  async ShowSeal(e) {
    if (this.IsInSeal) {
      await this.SetSealText(e);
    } else {
      this.IsInSeal = true;
      this.SetActive(true);
      this.GetText(0).SetText(e.toString());
      e = new CustomPromise_1.CustomPromise();
      await this.Sequence.PlaySequenceAsync("Lock", e);
    }
  }
  async HideSeal() {
    var e;
    if (this.IsInSeal) {
      this.IsInSeal = false;
      e = new CustomPromise_1.CustomPromise();
      await this.Sequence.PlaySequenceAsync("Unlock", e);
    }
  }
  async SetSealText(e) {
    this.GetText(0).SetText(e.toString());
    e = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("Switch", e);
  }
  async RefreshSeal(e, s) {
    if (e) {
      await this.ShowSeal(s);
    } else {
      await this.HideSeal();
    }
  }
}
exports.PhantomArenaSealItem = PhantomArenaSealItem;
//# sourceMappingURL=PhantomArenaSealItem.js.map