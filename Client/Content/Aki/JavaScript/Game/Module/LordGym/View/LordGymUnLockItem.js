"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymUnLockItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class LordGymUnLockItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.bPe = undefined;
    this.JTt = e => {
      if (e === "Start") {
        this.bPe.PlayLevelSequenceByName("Close");
      }
      if (e === "Close") {
        this.SetActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.bPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.bPe.BindSequenceCloseEvent(this.JTt);
  }
  RefreshLord(e) {
    e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "LordGymUnLock", e.GymTitle);
    this.bPe.PlayLevelSequenceByName("Start");
  }
}
exports.LordGymUnLockItem = LordGymUnLockItem;
//# sourceMappingURL=LordGymUnLockItem.js.map