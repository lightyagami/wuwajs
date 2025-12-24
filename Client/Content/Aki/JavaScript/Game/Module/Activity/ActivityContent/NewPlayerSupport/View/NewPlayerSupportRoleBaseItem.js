"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewPlayerSupportRoleBaseItem = undefined;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class NewPlayerSupportRoleBaseItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.TrialRoleInfo = undefined;
    this.RoleId = 0;
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  async PlayStartSeqAsync() {
    await this.SPe?.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise(), false);
  }
  PlayStartSeq() {
    this.SPe?.PlayOrReplaySequenceByName("Start");
  }
  PlaySwitchSeq() {
    this.SPe?.PlayOrReplaySequenceByName("Switch");
  }
  async PlaySwitchSeqAsync() {
    await this.SPe?.PlaySequenceAsync("Switch", new CustomPromise_1.CustomPromise());
  }
  Update(e) {
    var t = !!this.TrialRoleInfo && this.TrialRoleInfo.GroupId === e.GroupId;
    this.TrialRoleInfo = e;
    if (!t) {
      this.Refresh();
    }
  }
  UpdateByRoleId(e) {
    var t = this.RoleId === e;
    this.RoleId = e;
    if (!t) {
      this.Refresh();
    }
  }
  Refresh() {}
}
exports.NewPlayerSupportRoleBaseItem = NewPlayerSupportRoleBaseItem;
//# sourceMappingURL=NewPlayerSupportRoleBaseItem.js.map