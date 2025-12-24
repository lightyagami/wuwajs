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
    this.LevelSequencePlayer = undefined;
    this.LastVisibility = false;
  }
  GetSelectSequenceName() {
    return "xuanzhong";
  }
  GetUnSelectSequenceName() {
    return "Close";
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetActive(e) {
    this.PlaySequenceAndSetActive(e);
  }
  async PlaySequenceAndSetActive(e) {
    if (this.LastVisibility !== e) {
      this.LastVisibility = e;
      if (this.LastVisibility) {
        this.RootItem.SetUIActive(this.LastVisibility);
        await this.LevelSequencePlayer.PlaySequenceAsync(this.GetSelectSequenceName(), new CustomPromise_1.CustomPromise());
      } else {
        await this.LevelSequencePlayer.PlaySequenceAsync(this.GetUnSelectSequenceName(), new CustomPromise_1.CustomPromise());
        this.RootItem.SetUIActive(this.LastVisibility);
      }
    }
    return true;
  }
}
exports.MarkSelectComponent = MarkSelectComponent;
//# sourceMappingURL=MarkSelectComponent.js.map