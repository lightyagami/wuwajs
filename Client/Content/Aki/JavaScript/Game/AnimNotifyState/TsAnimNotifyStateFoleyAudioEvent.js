"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const AudioSystem_1 = require("../../Core/Audio/AudioSystem");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const DEFAULT_FADE_DURATION = 500;
class FoleyEventHandle {
  constructor(t, e) {
    this.Id = 0;
    this.EventName = "";
    this.Id = t;
    this.EventName = e;
  }
}
class TsAnimNotifyStateFoleyAudioEvent extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Variant = 0;
    this.FadeDuration = DEFAULT_FADE_DURATION;
    this.FadeCurve = 4;
    this.InitVariables = false;
    this.HandleMap = undefined;
  }
  Constructor() {
    this.InitVariables = false;
    this.HandleMap = undefined;
  }
  K2_NotifyBegin(t, e, s) {
    if (!this.InitVariables) {
      this.InitVariables = true;
      this.HandleMap = new Map();
    }
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    if (t.GetEntityNoBlueprint()?.GetComponent(217)?.HasTag(1654452863)) {
      return false;
    }
    var i = t.CharacterActorComponent;
    var t = t.GetEntityNoBlueprint()?.GetComponent(201);
    if (!i || !t) {
      return false;
    }
    t.ChangeFoleyVariant(this.Variant);
    var r = t?.GetAkComponent();
    var t = t.Config?.FoleyEvent;
    if (r && t) {
      r = AudioSystem_1.AudioSystem.PostEvent(t, r);
      this.HandleMap.set(i.Entity.Id, new FoleyEventHandle(r, t));
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    var s;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.CharacterActorComponent) && ((s = this.HandleMap?.get(t.Entity.Id)) && (AudioSystem_1.AudioSystem.ExecuteAction(s.Id, 0, {
      TransitionDuration: this.FadeDuration,
      TransitionFadeCurve: this.FadeCurve
    }), this.HandleMap.delete(t.Entity.Id)), true);
  }
}
exports.default = TsAnimNotifyStateFoleyAudioEvent;
//# sourceMappingURL=TsAnimNotifyStateFoleyAudioEvent.js.map