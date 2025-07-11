"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkSelectComponent = undefined;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const MarkPanelBase_1 = require("../MarkPanelBase");
class MarkSelectComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.mRi = false;
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetActive(e) {
    this._1a(e);
  }
  async _1a(e) {
    if (this.mRi !== e) {
      this.mRi = e;
      if (this.mRi) {
        this.RootItem.SetUIActive(this.mRi);
        await this.SPe.PlaySequenceAsync("xuanzhong", new CustomPromise_1.CustomPromise());
      } else {
        await this.SPe.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
        this.RootItem.SetUIActive(this.mRi);
      }
    }
    return true;
  }
}
exports.MarkSelectComponent = MarkSelectComponent;
//# sourceMappingURL=MarkSelectComponent.js.map