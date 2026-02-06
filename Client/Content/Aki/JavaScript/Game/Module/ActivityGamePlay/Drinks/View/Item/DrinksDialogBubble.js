"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksDialogBubble = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class DrinksDialogBubble extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.EventHandle = 0;
    this.LevelSequence = undefined;
    this.vxe = () => {
      this.SetUiActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnStart() {
    this.LevelSequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequence.BindSequenceCloseEvent(this.vxe);
    var e = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
    this.SetRoleIcon("", this.GetTexture(0), e);
    this.SetUiActive(false);
  }
  ActivateBubble(e, i) {
    this.SetUiActive(true);
    this.LevelSequence?.PlayOrReplaySequenceByName("Start");
    this.GetItem(2)?.SetUIActive(i);
    i = ConfigManager_1.ConfigManager.DrinksConfig.GetDialog(e);
    this.GetText(1)?.ShowTextNew(e);
    if (this.EventHandle !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.EventHandle, 0);
    }
    this.EventHandle = AudioSystem_1.AudioSystem.PostEvent(i.AudioEvent);
  }
  DeactivateBubble(e = 0) {
    if (this.EventHandle !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.EventHandle, 0);
    }
    this.EventHandle = 0;
    if (this.IsUiActiveInHierarchy()) {
      if (this.LevelSequence.IsPlayingSequence("Start")) {
        this.LevelSequence?.StopSequenceByKey("Start");
      }
      this.SetUiActive(false);
    }
  }
}
exports.DrinksDialogBubble = DrinksDialogBubble;
//# sourceMappingURL=DrinksDialogBubble.js.map