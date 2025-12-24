"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanoramicPointView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TrackDefine_1 = require("../../Module/Track/TrackDefine");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../Ui/UiLayer");
const InputMultiKeyItem_1 = require("../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const CENTER_Y = 62.5;
const center = Vector2D_1.Vector2D.Create(0, CENTER_Y);
class PanoramicPointView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OVm = undefined;
    this.Qtt = undefined;
    this.ScreenPositionRef = (0, puerts_1.$ref)(undefined);
    this.Hea = undefined;
    this.zLe = Vector_1.Vector.Create();
    this.ScreenPosition = Vector2D_1.Vector2D.Create();
    this.ICt = Vector2D_1.Vector2D.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.y$e = 0;
    this.I$e = 0;
    this.TCt = false;
    this.A$e = Vector2D_1.Vector2D.Create(1, -1);
    this.v9a = 0;
    this.Id = -1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([2, UE.UIItem]);
    }
  }
  OnStart() {
    var t = UiLayer_1.UiLayer.UiRootItem;
    this.y$e = Math.min(TrackDefine_1.MAX_A, ((t?.GetWidth() ?? 0) - TrackDefine_1.MARGIN_A) / 2);
    this.I$e = Math.min(TrackDefine_1.MAX_B, ((t?.GetHeight() ?? 0) - TrackDefine_1.MARGIN_B) / 2);
    this.RootItem?.SetUIActive(true);
    this.OVm = this.GetItem(1);
    this.OVm.SetUIActive(false);
    this.Qtt?.SetUiActive(false);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.ICt.Reset();
    this.ScreenPosition.Reset();
    this.RootItem.ResetRelativeTransform();
    this.RootItem.SetAnchorOffset(new UE.Vector2D(0, 0));
    if (!Info_1.Info.IsInTouch()) {
      this.RootItem.GetParentAsUIItem()?.SetUIRelativeRotation(new UE.Rotator(0, 0, 0));
    }
    this.v9a = 0;
  }
  async OnBeforeStartAsync() {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem();
      if (t = this.GetItem(2)) {
        await this.Qtt?.CreateByActorAsync(t.GetOwner());
      }
      this.Qtt?.RefreshByActionOrAxis({
        ActionOrAxisName: "锁定目标"
      });
      this.Qtt?.Show();
    }
  }
  OnAfterShow() {}
  DestroySelf(t) {
    this.Hea?.StopCurrentSequence();
    if (t) {
      t();
    }
  }
  Update() {
    var t;
    var e = Global_1.Global.CharacterController;
    var i = this.zLe.ToUeVector();
    var s = UE.GameplayStatics.D_ProjectWorldToScreen(e, i, this.ScreenPositionRef);
    if (!s) {
      (i = (t = ModelManager_1.ModelManager.CameraModel.CameraTransform).InverseTransformPositionNoScale(i)).X = -i.X;
      t = t.TransformPositionNoScale(i);
      UE.GameplayStatics.D_ProjectWorldToScreen(e, t, this.ScreenPositionRef);
    }
    var i = (0, puerts_1.$unref)(this.ScreenPositionRef);
    this.ScreenPosition.Set(i.X, i.Y);
    if (!this.ICt.Equals(this.ScreenPosition, 1)) {
      this.ICt.DeepCopy(this.ScreenPosition);
      e = ModelManager_1.ModelManager.BattleUiModel;
      this.ScreenPosition.MultiplyEqual(e.ScreenPositionScale).AdditionEqual(e.ScreenPositionOffset).MultiplyEqual(this.A$e);
      this.TCt = this.ClampToEllipse(this.ScreenPosition, s);
      t = this.ScreenPosition.AdditionEqual(center);
      this.RootItem.SetAnchorOffset(t.ToUeVector2D());
      if (this.TCt) {
        if (!this.RootItem.bIsUIActive) {
          this.RootItem.SetUIActive(true);
        }
        this.OVm.SetUIActive(false);
      } else {
        if (ControllerHolder_1.ControllerHolder.PanoramicController.IsInFight()) {
          if (this.RootItem.bIsUIActive) {
            this.RootItem.SetUIActive(false);
          }
        } else if (!this.RootItem.bIsUIActive) {
          this.RootItem.SetUIActive(true);
        }
        this.cie.Reset();
        this.cie.Yaw = Math.atan2(this.ScreenPosition.Y, this.ScreenPosition.X) * TrackDefine_1.RAD_2_DEG;
        this.OVm.SetUIRelativeRotation(this.cie.ToUeRotator());
        this.OVm.SetUIActive(true);
      }
    }
  }
  SetTargetPos(t) {
    this.zLe.X = t?.X ?? 0;
    this.zLe.Y = t?.Y ?? 0;
    this.zLe.Z = t?.Z ?? 0;
  }
  ClampToEllipse(t, e) {
    var i = t.X;
    var s = t.Y;
    var r = this.y$e;
    var h = this.I$e;
    return !!e && !!(i * i / (r * r) + s * s / (h * h) <= 1) || (e = r * h / Math.sqrt(h * h * i * i + r * r * s * s), t.MultiplyEqual(e), false);
  }
  ChangePointType(t) {
    if (this.v9a === t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Panoramic", 45, "[环视]ChangePointType 相等的Type 不执行变化", ["type", t]);
      }
      if (!Info_1.Info.IsInTouch()) {
        if (this.v9a === 1) {
          if (!this.Qtt?.GetActive()) {
            this.Qtt?.SetUiActive(true);
          }
        } else if (this.Qtt?.GetActive()) {
          this.Qtt?.SetUiActive(false);
        }
      }
    } else {
      switch (t) {
        case 0:
          switch (this.v9a) {
            case 0:
              break;
            case 1:
              this.Hea?.StopCurrentSequence();
              this.Hea?.PlayLevelSequenceByName("AtoB");
              break;
            case 2:
              this.Hea?.StopCurrentSequence();
              this.Hea?.PlayLevelSequenceByName("DtoB");
          }
          break;
        case 1:
          switch (this.v9a) {
            case 0:
              this.Hea?.StopCurrentSequence();
              this.Hea?.PlayLevelSequenceByName("BtoA");
              break;
            case 1:
              break;
            case 2:
              this.Hea?.StopCurrentSequence();
              this.Hea?.PlayLevelSequenceByName("DtoA");
          }
          break;
        case 2:
          switch (this.v9a) {
            case 0:
              this.Hea?.StopCurrentSequence();
              this.Hea?.PlayLevelSequenceByName("BtoD");
              break;
            case 1:
              this.Hea?.StopCurrentSequence();
              this.Hea?.PlayLevelSequenceByName("AtoD");
          }
      }
      this.v9a = t;
      if (!Info_1.Info.IsInTouch()) {
        if (this.v9a === 1) {
          this.Qtt?.SetUiActive(true);
        } else {
          this.Qtt?.SetUiActive(false);
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Panoramic", 45, "[环视]ChangePointType 现在的Type是", ["type", t]);
      }
    }
  }
}
exports.PanoramicPointView = PanoramicPointView;
//# sourceMappingURL=PanoramicPointView.js.map