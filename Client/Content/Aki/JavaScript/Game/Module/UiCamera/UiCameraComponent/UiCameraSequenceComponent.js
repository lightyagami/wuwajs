"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraSequenceComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const CameraController_1 = require("../../../Camera/CameraController");
const GlobalData_1 = require("../../../GlobalData");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const BlackScreenView_1 = require("../../UiCameraAnimation/View/BlackScreenView");
const UiCameraComponent_1 = require("./UiCameraComponent");
const BLACK_TEXTURE_TAG = new UE.FName("BlackTexture");
const UI_CAMERA = new UE.FName("UiCamera");
const FIGHT_CAMERA = new UE.FName("FightCamera");
class UiCameraSequenceComponent extends UiCameraComponent_1.UiCameraComponent {
  constructor() {
    super(...arguments);
    this.b2t = undefined;
    this.PUo = undefined;
    this.xUo = undefined;
    this.wUo = [];
    this.BUo = false;
    this.bUo = undefined;
    this.qUo = undefined;
    this.Fbi = 0;
    this.GUo = undefined;
    this.NUo = () => {
      this.GUo.SetResult();
    };
    this.kUo = () => {
      this.GUo.SetResult();
    };
    this.FUo = () => {
      this.VUo();
    };
    this.HUo = () => {
      if (this.BUo) {
        this.DestroyBlackScreenView();
      }
    };
  }
  OnDestroy() {
    this.DestroyUiCameraSequence();
  }
  PlayUiCameraSequence(e, i = 1, t = false, s = true, r) {
    this.b2t = this.jUo(e);
    if (this.b2t) {
      this.b2t.bOverrideInstanceData = false;
      this.PUo = this.b2t.DefaultInstanceData;
      this.b2t.SetTickableWhenPaused(true);
      this.SetTransformOriginActor(r);
      this.OUo(this.b2t);
      this.BUo = s;
      (e = this.b2t.SequencePlayer).SetPlayRate(i);
      e.OnFinished.Add(this.FUo);
      e.OnStop.Add(this.HUo);
      e.OnPlay.Add(this.NUo);
      e.OnPlayReverse.Add(this.kUo);
      if (t) {
        e.PlayReverse();
      } else {
        e.Play();
      }
    }
  }
  async LoadAndPlayUiCameraSequence(e, i, t, s) {
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(e)) {
      this.WUo(true, 1);
      this.GUo = new CustomPromise_1.CustomPromise();
      this.Fbi = ResourceSystem_1.ResourceSystem.LoadAsync(e.ToAssetPathName(), UE.LevelSequence, e => {
        this.PlayUiCameraSequence(e, i, t, true, s);
      });
      return this.GUo.Promise;
    }
  }
  Pause() {
    var e;
    if (this.b2t?.IsValid() && (e = this.b2t.SequencePlayer)?.IsValid()) {
      e.Pause();
    }
  }
  Continue() {
    var e;
    if (this.b2t?.IsValid() && (e = this.b2t.SequencePlayer)?.IsValid() && e.IsPaused()) {
      e.Play();
    }
  }
  DestroyUiCameraSequence(e = true, i = 0) {
    this.WUo(e, i);
    this.KUo();
  }
  VUo() {
    for (const e of this.wUo) {
      e();
    }
    this.DestroyUiCameraSequence(this.BUo);
  }
  WUo(e = true, i = 0) {
    var t;
    if (this.b2t) {
      t = this.b2t.SequencePlayer;
      if (i !== 0) {
        t.PlaybackSettings.bRestoreState = i === 2;
      }
      t.Stop();
    }
    if (e) {
      this.DestroyBlackScreenView();
    }
    if (this.Fbi !== 0) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Fbi);
      this.Fbi = 0;
    }
  }
  KUo() {
    this.b2t?.SetShouldLatentDestroy(true);
    this.b2t = undefined;
    this.wUo.length = 0;
    this.bUo = undefined;
    this.qUo = undefined;
  }
  ExecuteUiCameraSequenceEvent(e) {
    if (this.bUo && this.qUo === e) {
      this.bUo();
    }
  }
  SetTransformOrigin(e) {
    if (this.PUo) {
      this.b2t.bOverrideInstanceData = true;
      e = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(e);
      this.PUo.TransformOrigin = e;
    }
  }
  SetTransformOriginActor(e) {
    if (this.PUo) {
      this.b2t.bOverrideInstanceData = true;
      this.PUo.TransformOriginActor = e;
    }
  }
  AddUiCameraSequenceEvent(e, i) {
    this.qUo = e;
    this.bUo = i;
  }
  AddUiCameraSequenceFinishedCallback(e) {
    if (e) {
      this.wUo.push(e);
    }
  }
  jUo(e) {
    var i = (0, puerts_1.$ref)(undefined);
    UE.LevelSequencePlayer.CreateLevelSequencePlayer(GlobalData_1.GlobalData.World, e, new UE.MovieSceneSequencePlaybackSettings(), i);
    var i = (0, puerts_1.$unref)(i);
    i.SetSequence(e);
    return i;
  }
  OUo(i) {
    i.ResetBindings();
    var e = i.GetSequence();
    if (e.HasBindingTag(BLACK_TEXTURE_TAG, true)) {
      this.QUo().then(e => {
        e = e.GetBlackScreenTextureActor();
        i.AddBindingByTag(BLACK_TEXTURE_TAG, e);
      }, () => {});
    }
    if (e.HasBindingTag(UI_CAMERA, true)) {
      i.AddBindingByTag(UI_CAMERA, this.CameraActor);
    }
    if (e.HasBindingTag(FIGHT_CAMERA, true)) {
      e = CameraController_1.CameraController.FightCamera.GetComponent(4).CameraActor;
      i.AddBindingByTag(FIGHT_CAMERA, e);
    }
  }
  async QUo() {
    var e;
    if (!this.xUo) {
      e = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop);
      this.xUo = new BlackScreenView_1.BlackScreenView();
      await this.xUo.CreateThenShowByResourceIdAsync("UiView_BlackScreen_Prefab", e);
    }
    return this.xUo;
  }
  DestroyBlackScreenView() {
    if (this.xUo) {
      this.xUo.Destroy();
      this.xUo = undefined;
    }
  }
}
exports.UiCameraSequenceComponent = UiCameraSequenceComponent;
//# sourceMappingURL=UiCameraSequenceComponent.js.map