"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeTrackControlPoint = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const SHOW = "Show";
const HIDE = "Hide";
class TimeTrackControlPoint extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, s) {
    super();
    this.Index = t;
    this.hwe = Rotator_1.Rotator.Create(0, s, 0);
    this.CreateThenShowByActor(e.GetOwner());
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(true);
    this.GetItem(3).SetUIActive(false);
    if (this.hwe) {
      this.GetItem(0)?.SetUIRelativeRotation(this.hwe.ToUeRotator());
    }
    this.AddEvent();
  }
  HandleDisplay(e) {}
  OnBeforeDestroy() {
    this.hwe = undefined;
    this.SequencePlayer?.Clear();
    this.SequencePlayer = undefined;
    this.RemoveEvent();
    super.Destroy();
  }
  AddEvent() {}
  RemoveEvent() {}
  UpdateState(e) {
    if (e) {
      this.GetItem(2).SetUIActive(true);
      this.GetItem(3).SetUIActive(false);
    } else {
      this.GetItem(2).SetUIActive(false);
      this.GetItem(3).SetUIActive(true);
    }
  }
  ToggleSelected(e) {
    if (this.SequencePlayer) {
      this.SequencePlayer.StopCurrentSequence(false, true);
      if (e) {
        this.SequencePlayer.PlaySequencePurely(SHOW);
      } else {
        this.SequencePlayer.PlaySequencePurely(HIDE);
      }
    }
  }
}
exports.TimeTrackControlPoint = TimeTrackControlPoint;
//# sourceMappingURL=TimeTrackControlPoint.js.map