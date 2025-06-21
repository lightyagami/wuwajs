"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRoguePanelLv = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LEVEL_CHANGE_SEQ_EVENT = "LevelChange";
class MapRoguePanelLv extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.gP1 = 0, this.LevelSequencePlayer = void 0, this.CheckCanOpenMenu = void 0, this.$An = e => {
      e === LEVEL_CHANGE_SEQ_EVENT && this.CP1()
    }, this.hFc = () => {
      this.CheckCanOpenMenu && !this.CheckCanOpenMenu() || ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueMenuView()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [1, this.hFc]
    ]
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An)
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An)
  }
  CP1() {
    this.GetArtText(0).SetText(10 <= this.gP1 ? this.gP1.toString() : "0" + this.gP1)
  }
  SetLv(e, t = !1) {
    this.gP1 !== e && (this.gP1 = e, t ? (e = "LevelUp", this.LevelSequencePlayer.GetCurrentSequence() === e ? this.LevelSequencePlayer.ReplaySequenceByKey(e) : this.LevelSequencePlayer.PlayLevelSequenceByName(e)) : this.CP1())
  }
  SetButtonActive(e) {
    this.GetButton(1).SetSelfInteractive(e)
  }
}
exports.MapRoguePanelLv = MapRoguePanelLv;
//# sourceMappingURL=MapRoguePanelLv.js.map