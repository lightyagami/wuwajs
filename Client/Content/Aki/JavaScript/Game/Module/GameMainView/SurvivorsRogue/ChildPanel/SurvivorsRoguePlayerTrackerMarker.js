"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRoguePlayerTrackerMarker = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MARKER_TRACE_SOCKET = new UE.FName("Root");
class SurvivorsRoguePlayerTrackerMarker extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.SequencePlayer = undefined;
    this.ScreenPositionRef = (0, puerts_1.$ref)(undefined);
    this.ScreenPosition = undefined;
    this.LastScreenPosition = undefined;
    this.PointTransport = Vector2D_1.Vector2D.Create(1, -1);
    this.Offset = Vector_1.Vector.Create(0, 0, 0);
    this.CharacterActorComponent = undefined;
    this.TickEnabled = false;
    this.ScreenPosition = Vector2D_1.Vector2D.Create();
    this.LastScreenPosition = Vector2D_1.Vector2D.Create();
  }
  get Umt() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (!this.CharacterActorComponent) {
      this.CharacterActorComponent = e?.Entity.GetComponent(3);
      this.Offset = this.CharacterActorComponent ? Vector_1.Vector.Create(0, 0, this.CharacterActorComponent.HalfHeight * 2 + 60) : Vector_1.Vector.Create(0, 0, 0);
    }
    if (this.CharacterActorComponent) {
      var e = Vector_1.Vector.Create();
      var r = Vector_1.Vector.Create();
      if (this.CharacterActorComponent.Actor instanceof TsBaseCharacter_1.default) {
        let t = false;
        var i = this.CharacterActorComponent.Actor.Mesh.GetAllSocketNames();
        var s = i.Num();
        for (let e = 0; e < s; e++) {
          if (i.Get(e).op_Equality(MARKER_TRACE_SOCKET)) {
            t = true;
            break;
          }
        }
        if (t) {
          r.FromUeVector(this.CharacterActorComponent.Actor.Mesh.D_GetSocketLocation(MARKER_TRACE_SOCKET));
          r.Addition(this.Offset, e);
        } else {
          r.FromUeVector(this.CharacterActorComponent.Actor.Mesh.D_K2_GetComponentLocation());
        }
      } else {
        r.FromUeVector(this.CharacterActorComponent.Actor.D_K2_GetActorLocation());
      }
      return e.ToUeVector();
    }
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  OnBeforeShow() {
    this.TickEnabled = true;
  }
  OnBeforeHide() {
    this.TickEnabled = false;
  }
  ShowTips() {
    this.Show();
    if (this.SequencePlayer.IsPlayingSequence("Close")) {
      this.SequencePlayer.StopSequenceByKey("Close");
    }
    this.SequencePlayer.PlayOrReplaySequenceByName("Start");
  }
  HideTips() {
    if (this.IsShowOrShowing) {
      if (this.SequencePlayer.IsPlayingSequence("Start")) {
        this.SequencePlayer.StopSequenceByKey("Start");
      } else if (this.SequencePlayer.IsPlayingSequence("Close")) {
        return;
      }
      this.SequencePlayer.PlayOrReplaySequenceByName("Close");
    }
  }
  OnTick(e) {
    var t;
    if (this.TickEnabled && Global_1.Global.CharacterController && (t = this.Umt)) {
      UE.GameplayStatics.D_ProjectWorldToScreen(Global_1.Global.CharacterController, t, this.ScreenPositionRef);
      t = (0, puerts_1.$unref)(this.ScreenPositionRef);
      this.ScreenPosition.Set(t.X, t.Y);
      if (!this.LastScreenPosition.Equals(this.ScreenPosition, 1)) {
        this.LastScreenPosition.DeepCopy(this.ScreenPosition);
        t = ModelManager_1.ModelManager.BattleUiModel;
        this.ScreenPosition.MultiplyEqual(t.ScreenPositionScale).AdditionEqual(t.ScreenPositionOffset).MultiplyEqual(this.PointTransport);
        this.RootItem.SetAnchorOffset(this.ScreenPosition.ToUeVector2D());
      }
    }
  }
}
exports.SurvivorsRoguePlayerTrackerMarker = SurvivorsRoguePlayerTrackerMarker;
//# sourceMappingURL=SurvivorsRoguePlayerTrackerMarker.js.map