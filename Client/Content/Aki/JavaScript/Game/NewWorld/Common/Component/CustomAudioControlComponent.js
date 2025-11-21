"use strict";

var CustomAudioControlComponent_1;
var __decorate = this && this.__decorate || function (t, e, o, n) {
  var i;
  var s = arguments.length;
  var r = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, o, n);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (i = t[h]) {
        r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(e, o, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomAudioControlComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PhonographController_1 = require("../../../Module/Phonograph/PhonographController");
let CustomAudioControlComponent = CustomAudioControlComponent_1 = class CustomAudioControlComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ji_ = undefined;
    this.G1n = IComponent_1.EAudioRangeType.AOI;
    this.EIe = undefined;
    this.Hi_ = undefined;
    this.Wi_ = false;
    this.Q1n = t => {
      if (t !== this.Wi_ && (this.Wi_ = t, this.ji_?.Type === "Gramophone")) {
        this.Qi_(t);
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(CustomAudioControlComponent_1)[0];
    this.G1n = t.AudioRangeType;
    this.ji_ = t.AudioControlType;
    this.EIe = this.Entity.GetComponent(0);
    return true;
  }
  OnStart() {
    switch (this.G1n) {
      case IComponent_1.EAudioRangeType.RangeComp:
        if (!this.Entity.GetComponent(86)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 39, "RangeComponent不存在", ["ConfigId", this.EIe?.GetPbDataId()]);
          }
          return false;
        }
        if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Q1n)) {
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Q1n);
        }
        break;
      case IComponent_1.EAudioRangeType.AOI:
        this.Q1n(true);
        break;
      case IComponent_1.EAudioRangeType.SceneActorRefComp:
        this.Hi_ = this.Entity.GetComponent(167);
        if (!this.Hi_) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 39, "SceneItemReferenceComponent不存在", ["ConfigId", this.EIe?.GetPbDataId()]);
          }
          return false;
        }
        this.Hi_.AddOnPlayerOverlapCallback(this.Q1n);
    }
    return true;
  }
  OnEnd() {
    switch (this.G1n) {
      case IComponent_1.EAudioRangeType.RangeComp:
        if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Q1n)) {
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Q1n);
        }
        break;
      case IComponent_1.EAudioRangeType.AOI:
        this.Q1n(false);
        break;
      case IComponent_1.EAudioRangeType.SceneActorRefComp:
        if (this.Hi_) {
          this.Hi_.RemoveOnPlayerOverlapCallback(this.Q1n);
          this.Hi_ = undefined;
        }
        if (this.Wi_) {
          this.Q1n(false);
        }
    }
    return true;
  }
  OnDisable(t) {
    if (this.ji_?.Type === "Gramophone") {
      this.Ki_(t);
    }
  }
  OnEnable() {
    if (this.ji_?.Type === "Gramophone") {
      this.$i_();
    }
  }
  Qi_(t) {
    if (t) {
      PhonographController_1.PhonographController.PlayMusicByEntityId(this.Entity.Id);
    } else {
      PhonographController_1.PhonographController.StopMusicByEntityId(this.Entity.Id);
    }
  }
  Ki_(t) {
    if (this.Wi_) {
      this.Qi_(false);
    }
  }
  $i_() {
    if (this.Wi_) {
      this.Qi_(true);
    }
  }
};
CustomAudioControlComponent = CustomAudioControlComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(136)], CustomAudioControlComponent);
exports.CustomAudioControlComponent = CustomAudioControlComponent; //# sourceMappingURL=CustomAudioControlComponent.js.map