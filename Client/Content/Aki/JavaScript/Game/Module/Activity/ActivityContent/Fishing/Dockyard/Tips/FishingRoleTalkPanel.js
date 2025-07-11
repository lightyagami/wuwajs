"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingRoleTalkPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class FishingRoleTalkPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetRoleHead(e) {
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    this.SetRoleIcon(i.RoleHeadIconCircle, this.GetTexture(0), e);
  }
  SetTxtInfo(e, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, i);
  }
  PlayAnim(e, i) {
    var r = new CustomPromise_1.CustomPromise();
    this.LevelSequencePlayer.PlaySequenceAsync(e, r).then(() => {
      i?.();
    });
  }
}
exports.FishingRoleTalkPanel = FishingRoleTalkPanel;
//# sourceMappingURL=FishingRoleTalkPanel.js.map