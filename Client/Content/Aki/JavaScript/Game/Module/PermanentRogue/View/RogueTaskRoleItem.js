"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueTaskRoleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class RogueTaskRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, s) {
    super();
    this.RoleId = 0;
    this.IsLock = true;
    this.LevelSequencePlayer = undefined;
    this.RoleId = e;
    this.IsLock = s;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(1)?.SetUIActive(this.IsLock);
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId);
    this.SetTextureByPath(e.FormationRoleCard, this.GetTexture(0));
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer = undefined;
  }
  SetCharUnlock() {
    if (this.IsLock) {
      this.IsLock = false;
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Unlock");
    }
  }
}
exports.RogueTaskRoleItem = RogueTaskRoleItem;
//# sourceMappingURL=RogueTaskRoleItem.js.map