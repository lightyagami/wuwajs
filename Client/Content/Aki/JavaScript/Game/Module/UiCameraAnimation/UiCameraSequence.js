"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraSequence = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CameraController_1 = require("../../Camera/CameraController");
const GlobalData_1 = require("../../GlobalData");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const BlackScreenView_1 = require("./View/BlackScreenView");
const BLACK_TEXTURE_TAG = new UE.FName("BlackTexture");
const UI_CAMERA = new UE.FName("UiCamera");
const FIGHT_CAMERA = new UE.FName("FightCamera");
class UiCameraSequence {
  constructor() {
    this.b2t = undefined;
    this.PUo = undefined;
    this.xUo = undefined;
    this.wUo = [];
    this.BUo = false;
    this.bUo = undefined;
    this.qUo = undefined;
    this.FUo = () => {
      this.VUo();
    };
  }
  InitializeUiCameraSequence(e) {
    this.b2t = this.jUo(e);
    this.b2t.bOverrideInstanceData = false;
    this.PUo = this.b2t.DefaultInstanceData;
    this.OUo(this.b2t);
  }
  PlayUiCameraSequence(e = 1, i = false, t = true) {
    if (this.b2t) {
      this.BUo = t;
      (t = this.b2t.SequencePlayer).SetPlayRate(e);
      t.OnFinished.Add(this.FUo);
      if (i) {
        t.PlayReverse();
      } else {
        t.Play();
      }
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
  DestroyUiCameraSequence(e = true) {
    this.WUo();
    this.KUo();
    if (e) {
      this.DestroyBlackScreenView();
    }
    this.wUo.length = 0;
    this.bUo = undefined;
    this.qUo = undefined;
  }
  VUo() {
    for (const e of this.wUo) {
      e(this);
    }
    this.DestroyUiCameraSequence(this.BUo);
  }
  WUo() {
    if (this.b2t) {
      this.b2t.SequencePlayer.Stop();
    }
  }
  KUo() {
    if (this.b2t) {
      this.b2t.SetShouldLatentDestroy(true);
      this.b2t = undefined;
    }
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
    var e = (0, puerts_1.$unref)(i);
    return e;
  }
  OUo(i) {
    i.ResetBindings();
    var e;
    var t = i.GetSequence();
    if (t.HasBindingTag(BLACK_TEXTURE_TAG, true)) {
      this.QUo().then(e => {
        e = e.GetBlackScreenTextureActor();
        i.AddBindingByTag(BLACK_TEXTURE_TAG, e);
      }, () => {});
    }
    if (t.HasBindingTag(UI_CAMERA, true)) {
      e = CameraController_1.CameraController.WidgetCamera.GetComponent(12).CineCamera;
      i.AddBindingByTag(UI_CAMERA, e);
    }
    if (t.HasBindingTag(FIGHT_CAMERA, true)) {
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
exports.UiCameraSequence = UiCameraSequence;
//# sourceMappingURL=UiCameraSequence.js.map