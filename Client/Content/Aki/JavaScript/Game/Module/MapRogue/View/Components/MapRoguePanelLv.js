"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRoguePanelLv = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LEVEL_CHANGE_SEQ_EVENT = "LevelChange";
class MapRoguePanelLv extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.HP1 = 0;
    this.LevelSequencePlayer = undefined;
    this.CheckCanOpenMenu = undefined;
    this.$An = e => {
      if (e === LEVEL_CHANGE_SEQ_EVENT) {
        this.$P1();
      }
    };
    this.hFc = () => {
      if (!this.CheckCanOpenMenu || !!this.CheckCanOpenMenu()) {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueMenuView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.hFc]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  $P1() {
    this.GetArtText(0).SetText(this.HP1 >= 10 ? this.HP1.toString() : "0" + this.HP1);
  }
  SetLv(e, t = false) {
    if (this.HP1 !== e) {
      this.HP1 = e;
      if (t) {
        e = "LevelUp";
        if (this.LevelSequencePlayer.GetCurrentSequence() === e) {
          this.LevelSequencePlayer.ReplaySequenceByKey(e);
        } else {
          this.LevelSequencePlayer.PlayLevelSequenceByName(e);
        }
      } else {
        this.$P1();
      }
    }
  }
  SetButtonActive(e) {
    this.GetButton(1).SetSelfInteractive(e);
  }
}
exports.MapRoguePanelLv = MapRoguePanelLv;
//# sourceMappingURL=MapRoguePanelLv.js.map