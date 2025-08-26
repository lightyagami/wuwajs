"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionSpotView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const CENTER_Y = 62.5;
const center = Vector2D_1.Vector2D.Create(0, CENTER_Y);
class InteractionSpotView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RootActorRotation = undefined;
    this.p21 = undefined;
    this.v21 = undefined;
    this.Wai = false;
    this.I21 = false;
    this.T21 = false;
    this.Tmu = false;
    this.Hea = undefined;
    this.MF1 = undefined;
    this.EF1 = false;
    this.IF1 = false;
    this.TF1 = undefined;
    this.bF1 = undefined;
    this.uj1 = undefined;
    this.yB = Vector_1.Vector.Create();
    this.ScreenPosition = Vector2D_1.Vector2D.Create();
    this.ICt = Vector2D_1.Vector2D.Create();
    this._ii = false;
    this.$xt = t => {
      if (this.IF1 && this.TF1 === t) {
        this.Destroy(this.bF1);
      } else if (this.EF1) {
        this.EF1 = false;
        if (t === "NorOut") {
          this.Hea?.PlayLevelSequenceByName("Select");
        } else if (t === "Start" || t === "UnSelect") {
          this.Hea?.PlayLevelSequenceByName("Loop");
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.RootItem?.SetUIActive(true);
    this.RootActorRotation = this.RootActor.K2_GetActorRotation();
    this.p21 = this.GetItem(0);
    this.v21 = this.GetItem(1);
    this.p21.SetUIActive(true);
    this.v21.SetUIActive(false);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Hea.BindSequenceCloseEvent(this.$xt);
  }
  OnAfterShow() {
    this.b21();
  }
  DestroySelf(t) {
    this.IF1 = true;
    this.Hea?.StopCurrentSequence();
    if (this.MF1) {
      this.TF1 = "SetOut";
      this.Hea?.PlayLevelSequenceByName("SetOut");
    } else if (this.MF1 === false) {
      this.TF1 = "NorOut";
      this.Hea?.PlayLevelSequenceByName("NorOut");
    }
    this.bF1 = t;
  }
  Update() {
    var t;
    var i;
    var s;
    if (this.uj1 && this._ii) {
      t = Global_1.Global.CharacterController;
      i = this.uj1.D_GetTransform().TransformPositionNoScale(this.yB.ToUeVector());
      s = (0, puerts_1.$ref)(undefined);
      UE.GameplayStatics.D_ProjectWorldToScreen(t, i, s);
      t = (0, puerts_1.$unref)(s);
      this.ScreenPosition.Set(t.X, t.Y);
      if (!this.ICt.Equals(this.ScreenPosition, 1)) {
        this.ICt.DeepCopy(this.ScreenPosition);
        i = Vector2D_1.Vector2D.Create(t.X, t.Y);
        s = ModelManager_1.ModelManager.BattleUiModel;
        i.MultiplyEqual(s.ScreenPositionScale).AdditionEqual(s.ScreenPositionOffset).MultiplyEqual(Vector2D_1.Vector2D.Create(1, -1)).AdditionEqual(center);
        this.RootItem.SetAnchorOffset(i.ToUeVector2D());
      }
    }
  }
  SetOwnerActor(t) {
    this.uj1 = t;
  }
  SetRootItemState(t) {
    this._ii = t;
    this.RootItem?.SetUIActive(t);
  }
  SetIsSelect(t) {
    this.Wai = t;
    this.b21();
  }
  SetIsInEntityInteractRange(t) {
    this.I21 = t;
    this.b21();
  }
  SetIsTracking(t) {
    this.T21 = t;
    this.b21();
  }
  SetIsObstruct(t) {
    this.Tmu = t;
    this.b21();
  }
  SetOffset(t) {
    this.yB.DeepCopy(t);
  }
  b21() {
    var t = this.Wai && this.I21;
    if (this.T21) {
      this.p21.SetUIActive(false);
      this.v21.SetUIActive(true);
    } else {
      this.p21.SetUIActive(true);
      this.v21.SetUIActive(false);
    }
    if (this.MF1 !== t) {
      this.RF1(t);
      this.MF1 = t;
    }
    this.p21.SetAlpha(this.Tmu ? 0.3 : 1);
    this.v21.SetAlpha(this.Tmu ? 0.3 : 1);
  }
  RF1(t) {
    this.EF1 = false;
    this.Hea?.StopCurrentSequence();
    if (this.MF1 === undefined) {
      if (t) {
        this.Hea?.PlayLevelSequenceByName("Select");
      } else {
        this.Hea?.PlayLevelSequenceByName("Start");
        this.EF1 = this.T21;
      }
    } else if (this.MF1) {
      if (this.MF1) {
        this.EF1 = this.T21;
        this.Hea?.PlayLevelSequenceByName("UnSelect");
      }
    } else {
      this.Hea?.PlayLevelSequenceByName("Select");
    }
  }
}
exports.InteractionSpotView = InteractionSpotView;
//# sourceMappingURL=InteractionSpotView.js.map