"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var n = arguments.length;
  var r = n < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, s);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (o = e[h]) {
        r = (n < 3 ? o(r) : n > 3 ? o(t, i, r) : o(t, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleHuluLightSequenceComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleHuluLightSequenceComponent = class UiRoleHuluLightSequenceComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.SPe = undefined;
    this.b2t = undefined;
    this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    this.Twr = e => {
      if (!e) {
        this.StopLightSequence();
      }
    };
  }
  OnInit() {
    this.n$t = this.Owner.CheckGetComponent(1);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelVisibleChange, this.Twr);
  }
  fBr() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("LevelSequence_HuluLight");
    this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, e => {
      var t;
      if (ObjectUtils_1.ObjectUtils.IsValid(e) && ((t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState = true, t.bPauseAtEnd = true, this.b2t = ActorSystem_1.ActorSystem.Spawn(UE.LevelSequenceActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined), this.b2t.PlaybackSettings = t, this.b2t.SetSequence(e), this.SPe = this.b2t.SequencePlayer, this.SPe)) {
        this.PlayLightSequence();
      }
    }, 100, "Ui.UiSceneModel");
  }
  PlayLightSequence() {
    var e;
    var t;
    if (this.SPe) {
      this.b2t.bOverrideInstanceData = true;
      e = this.b2t.DefaultInstanceData;
      t = this.n$t.MainMeshComponent.D_GetSocketTransform(CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME);
      t = new UE.TransformDouble(t.GetLocation());
      t = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(t);
      e.TransformOrigin = t;
      this.SPe.Play();
    } else if (this.hJ === ResourceSystem_1.ResourceSystem.InvalidId) {
      this.fBr();
    }
  }
  StopLightSequence() {
    if (this.SPe) {
      this.SPe.Stop();
    } else if (this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ);
      this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelVisibleChange, this.Twr);
    this.StopLightSequence();
    const e = this.b2t;
    TimerSystem_1.GameplayTimerSystem.Next(() => {
      ActorSystem_1.ActorSystem.Put("UiRoleHuluLightSequenceComponent.OnEnd", e);
    });
    this.SPe = undefined;
    this.b2t = undefined;
  }
};
UiRoleHuluLightSequenceComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(20)], UiRoleHuluLightSequenceComponent);
exports.UiRoleHuluLightSequenceComponent = UiRoleHuluLightSequenceComponent; //# sourceMappingURL=UiRoleHuluLightSequenceComponent.js.map