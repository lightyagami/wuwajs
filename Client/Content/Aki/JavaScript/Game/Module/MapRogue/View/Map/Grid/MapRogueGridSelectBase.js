"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueGridSelectBase = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class MapRogueGridSelectBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.InteractAnimationPlayer = undefined;
    this.StateAnimationPlayer = undefined;
    this.vIl = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.InteractAnimationPlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.StateAnimationPlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetSelected(e) {
    this.vIl = e;
  }
  SetState(e) {
    this.GetItem(0).SetUIActive(e);
    this.GetItem(1).SetUIActive(!e);
  }
  SetSequenceToStart(e) {
    this.Udd(this.RootItem.GetOwner(), e);
  }
  ResetAllSequence() {
    this.SetSequenceToStart("Float");
    var e = this.InteractAnimationPlayer.GetCurrentSequence();
    if (e) {
      this.Udd(this.RootItem.GetOwner(), e);
      this.InteractAnimationPlayer.StopPlayingSequence();
    }
    this.StateAnimationPlayer.PlayLevelSequenceByName("UnSle");
    this.StateAnimationPlayer.StopSequenceByKey("UnSle", false, true);
  }
  PlaySequence(e, t = false) {
    switch (e) {
      case "Float":
      case "Move":
      case "Pre":
      case "PreUp":
        var s = this.InteractAnimationPlayer.GetCurrentSequence();
        if (s) {
          this.Udd(this.RootItem.GetOwner(), s);
          this.InteractAnimationPlayer.StopPlayingSequence();
        }
        if (this.vIl) {
          return;
        }
        this.InteractAnimationPlayer.PlayLevelSequenceByName(e);
        break;
      case "Sle":
      case "UnSle":
        s = this.StateAnimationPlayer.GetCurrentSequence();
        if (s) {
          if (t && e === s) {
            return;
          }
          this.Udd(this.RootItem.GetOwner(), s);
          this.StateAnimationPlayer.StopPlayingSequence();
        }
        this.StateAnimationPlayer.PlayLevelSequenceByName(e);
    }
  }
  Udd(e, t) {
    e.SequenceJumpToSecondByKey(t, new UE.FrameTime());
  }
}
exports.MapRogueGridSelectBase = MapRogueGridSelectBase;
//# sourceMappingURL=MapRogueGridSelectBase.js.map