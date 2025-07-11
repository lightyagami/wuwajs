"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageSequenceHandle = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
class DamageSequenceHandle {
  constructor() {
    this.b2t = undefined;
    this.$pt = undefined;
    this.n8 = "";
    this.GPe = UE.NewArray(UE.Actor);
  }
  Initialize(e) {
    this.n8 = e;
  }
  Destroy() {
    if (this.b2t) {
      const e = this.b2t;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("DamageSequenceHandle.Destroy", e);
      });
      this.b2t = undefined;
      this.$pt = undefined;
    }
  }
  Reset() {
    this.Stop();
    this.ResetSequenceBinding();
    this.$pt.OnFinished.Clear();
  }
  Play() {
    if (this.$pt?.IsValid()) {
      this.$pt.Play();
    }
  }
  Stop() {
    if (this.$pt?.IsValid() && this.$pt.IsPlaying()) {
      this.$pt.Stop();
    }
  }
  SetSequenceBindingByTag(e, t) {
    if (this.b2t?.IsValid() && t) {
      this.GPe.Empty();
      this.GPe.Add(t);
      t = FNameUtil_1.FNameUtil.GetDynamicFName(e);
      this.b2t.SetBindingByTag(t, this.GPe, false);
    }
  }
  AddSequenceBindingByTag(e, t) {
    if (this.b2t?.IsValid() && t) {
      e = FNameUtil_1.FNameUtil.GetDynamicFName(e);
      this.b2t.AddBindingByTag(e, t);
    }
  }
  ResetSequenceBinding() {
    if (this.b2t?.IsValid()) {
      this.b2t.ResetBindings();
    }
  }
  AddOnFinished(e) {
    if (this.$pt?.IsValid()) {
      this.$pt.OnFinished.Add(e);
    }
  }
  SpawnSequence(t = undefined) {
    if (!StringUtils_1.StringUtils.IsEmpty(this.n8)) {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.n8, UE.LevelSequence, e => {
        if (ObjectUtils_1.ObjectUtils.IsValid(e) && (this.b2t = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined, false), this.b2t.SetSequence(e), this.$pt = this.b2t.SequencePlayer, t)) {
          t(this);
        }
      });
    }
  }
  GetPath() {
    return this.n8;
  }
}
exports.DamageSequenceHandle = DamageSequenceHandle;
//# sourceMappingURL=DamageSequenceHandle.js.map