"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawMainView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GachaController_1 = require("../GachaController");
const GachaSceneView_1 = require("../GachaUiSceneManager/GachaSceneView");
class DrawMainView extends GachaSceneView_1.GachaSceneView {
  constructor() {
    super(...arguments);
    this.DHt = undefined;
    this.RHt = undefined;
    this.UHt = "";
    this.AHt = undefined;
    this.PHt = undefined;
    this.Xe = 0;
    this.xHt = 0;
    this.wHt = 0;
    this.BHt = 0;
    this.bHt = undefined;
    this.qHt = 0;
    this.GHt = undefined;
    this.NHt = new UE.Vector2D();
    this.OHt = 0;
    this.kHt = false;
    this.SlideCurve = undefined;
    this.FHt = 0;
    this.VHt = 0;
    this.HHt = false;
    this.jHt = false;
    this.WHt = false;
    this.KHt = 0;
    this.QHt = false;
    this.XHt = false;
    this.SPe = undefined;
    this.$Ht = () => {
      this.WHt = true;
      if (this.HHt) {
        this.ShowNextView();
      }
    };
    this.OnDragBeginCallBack = e => {
      this.bHt = e.pointerPosition;
      this.VHt = this.FHt;
      this.QHt = true;
      this.KHt = 0;
      this.SPe.PlayLevelSequenceByName("DrawTipsHide");
      this.XHt = false;
    };
    this.OnDragCallBack = e => {
      this.NHt.X = e.pointerPosition.X;
      this.NHt.Y = e.pointerPosition.Y;
      e = (e.pointerPosition.X - this.bHt.X) / this.OHt;
      this.Xe = this.SlideCurve.GetFloatValue(e + this.VHt);
      this.FHt = MathUtils_1.MathUtils.Clamp(e + this.VHt, 0, 1);
      if (this.Xe > this.xHt) {
        if (this.kHt) {
          return;
        }
        this.kHt = true;
        this.PlayShowSequence();
      }
      e = MathUtils_1.MathUtils.Clamp((this.Xe - this.BHt) / (this.qHt - this.BHt), 0, 1);
      this.PHt?.TSUpdateParameters(this.Xe, e, this.NHt);
    };
    this.OnDragEndCallBack = e => {
      this.QHt = false;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.$Ht]];
  }
  OnAfterOpenUiScene() {
    this.AHt = CameraController_1.CameraController.Model.CurrentCameraActor;
    var e = ModelManager_1.ModelManager.GachaModel.CurGachaResult.length;
    let t = 1;
    ModelManager_1.ModelManager.GachaModel.CurGachaResult.forEach((e, i) => {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.e9n.L8n)?.QualityId ?? 0;
      if (e > t) {
        t = e;
      }
    });
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaEffectConfigByTimesAndQuality(e, t);
    var i = (0, puerts_1.$ref)(0);
    var s = (0, puerts_1.$ref)(0);
    Global_1.Global.CharacterController.GetViewportSize(i, s);
    this.PHt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("GachaBP"), 0);
    var i = (0, puerts_1.$unref)(i);
    var s = (0, puerts_1.$unref)(s);
    CameraController_1.CameraController.SetViewTarget(this.PHt.SceneCameraActor, "OnAfterOpenUi");
    this.PHt["Gacha Result"] = t;
    this.wHt = e.DefaultProcess;
    this.Xe = 0;
    this.BHt = e.ChangeColorProcess;
    this.qHt = e.CompleteChangeColorProcess;
    this.xHt = e.PlaySequenceProcess;
    this.PHt.TSInitParameters(new UE.Vector2D(i, s), i * this.wHt, this.GHt, t);
    ResourceSystem_1.ResourceSystem.LoadAsync(e.SlideCurveAssetPath, UE.CurveFloat, e => {
      this.SlideCurve = e;
      e = this.GetDraggable(0);
      e.OnPointerDragCallBack.Bind(this.OnDragCallBack);
      e.OnPointerBeginDragCallBack.Bind(this.OnDragBeginCallBack);
      e.OnPointerEndDragCallBack.Bind(this.OnDragEndCallBack);
    }, 100, this.MemoryTag);
    GachaController_1.GachaController.PreloadGachaResultResource(e => {
      this.HHt = true;
      if (this.jHt || this.WHt) {
        this.ShowNextView();
      }
    });
  }
  InitLevelSequence() {
    var e = ModelManager_1.ModelManager.GachaModel.CurGachaResult.length;
    let t = 1;
    ModelManager_1.ModelManager.GachaModel.CurGachaResult.forEach((e, i) => {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.e9n.L8n)?.QualityId ?? 0;
      if (e > t) {
        t = e;
      }
    });
    e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaEffectConfigByTimesAndQuality(e, t);
    this.UHt = e.FinalShowSequencePath;
    this.GHt = new UE.LinearColor(e.FinalColor.R, e.FinalColor.G, e.FinalColor.B, e.FinalColor.A);
    ResourceSystem_1.ResourceSystem.LoadAsync(this.UHt, UE.LevelSequence, e => {
      var i;
      if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
        e = e;
        (i = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState = true;
        this.DHt = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined, false);
        this.DHt.PlaybackSettings = i;
        this.DHt.SetSequence(e);
        this.RHt.OnFinished.Add(() => {
          this.jHt = true;
          if (this.HHt) {
            this.ShowNextView();
          }
        });
      }
    }, 100, this.MemoryTag);
  }
  OnStart() {
    this.InitLevelSequence();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = (0, puerts_1.$ref)(0);
    var i = (0, puerts_1.$ref)(0);
    Global_1.Global.CharacterController.GetViewportSize(e, i);
    this.OHt = (0, puerts_1.$unref)(e);
  }
  OnBeforeDestroy() {
    TimerSystem_1.GameplayTimerSystem.Next(() => {
      ActorSystem_1.ActorSystem.Put("DrawMainView.OnBeforeDestroy", this.DHt);
    });
    this.DHt = undefined;
    this.SPe.Clear();
  }
  OnTick(e) {
    if (this.PHt?.SceneCameraActor.IsValid() && ModelManager_1.ModelManager.CameraModel.CurrentCameraActor !== this.PHt.SceneCameraActor && !this.kHt) {
      CameraController_1.CameraController.SetViewTarget(this.PHt.SceneCameraActor, "DrawMainView.OnTick");
    }
    if (!this.QHt && !this.XHt && !this.kHt) {
      this.KHt += e;
      if (this.KHt >= CommonDefine_1.MILLIONSECOND_PER_SECOND * 2) {
        this.SPe.PlayLevelSequenceByName("DrawTipsShow");
        this.XHt = true;
      }
    }
  }
  PlayShowSequence() {
    this.PHt.SetActorHiddenInGame(true);
    this.GetButton(1).RootUIComp?.SetUIActive(true);
    this.GetDraggable(0).GetOwner().GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(false);
    this.DHt?.SequencePlayer.Play();
  }
  ShowNextView() {
    this.RHt?.Stop();
    CameraController_1.CameraController.SetViewTarget(this.AHt, "ShowNextView");
    this.CloseMe();
    UiManager_1.UiManager.OpenView("GachaScanView");
  }
}
exports.DrawMainView = DrawMainView;
//# sourceMappingURL=DrawMainView.js.map