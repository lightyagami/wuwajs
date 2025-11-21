"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueMaterial = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const GameplayCueMagnitude_1 = require("./GameplayCueMagnitude");
class GameplayCueMaterial extends GameplayCueMagnitude_1.GameplayCueMagnitude {
  constructor() {
    super(...arguments);
    this.rKt = -1;
    this.aYo = 0;
    this.Mgc = undefined;
    this.$rd = false;
    this.hYo = e => {
      if (e === this.rKt && this.EndCallback && !this.$rd) {
        this.EAl();
        e = this.EndCallback;
        this.EndCallback = undefined;
        e();
      }
    };
  }
  OnInit() {
    super.OnInit();
    this.Mgc = undefined;
  }
  OnTick(e) {
    super.OnTick(e);
  }
  OnCreate() {
    ResourceSystem_1.ResourceSystem.LoadAsync(this.GetPath(), UE.Object, e => {
      if (this.IsActive) {
        this.BeginCallback?.();
        this.Mgc = e;
        this.Wrd();
        this.I$o();
        super.OnCreate();
      }
    });
  }
  OnDestroy() {
    this.Mgc = undefined;
    super.OnDestroy();
    this.Qrd();
    this.hYo(this.rKt);
  }
  Qrd() {
    switch (this.aYo) {
      case 1:
        this.ActorInternal.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(this.rKt);
        break;
      case 2:
        this.ActorInternal.CharRenderingComponent.RemoveMaterialControllerDataGroupWithEnding(this.rKt);
    }
  }
  OnSetMagnitude(e) {
    this.ActorInternal.CharRenderingComponent.SetEffectProgress(e, this.rKt);
  }
  OnChangeRole(e) {
    this.$rd = true;
    if (this.Mgc && this.rKt !== -1) {
      this.Qrd();
      this.rKt = -1;
    }
    this.$rd = false;
    super.OnChangeRole(e);
    this.Wrd();
  }
  Wrd() {
    if (this.ActorInternal?.IsValid() && this.Mgc !== undefined) {
      var e = this.Mgc;
      switch (this.lYo(e)) {
        case 1:
          this.aYo = 1;
          this.rKt = this.ActorInternal.CharRenderingComponent.AddMaterialControllerData(e);
          break;
        case 2:
          this.aYo = 2;
          this.rKt = this.ActorInternal.CharRenderingComponent.AddMaterialControllerDataGroup(e);
          break;
        case 0:
          this.aYo = 0;
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 28, "附加材质类型错误:", ["Buff特效Id", this.CueConfig.Id], ["材质路径", this.CueConfig.Path]);
          }
      }
    }
  }
  lYo(e) {
    if (e instanceof UE.PD_CharacterControllerData_C) {
      return 1;
    } else if (e instanceof UE.PD_CharacterControllerDataGroup_C) {
      return 2;
    } else {
      return 0;
    }
  }
  I$o() {
    if (this.EndCallback && !this.IsInstant) {
      switch (this.aYo) {
        case 1:
          EventSystem_1.EventSystem.AddWithTarget(this.ActorInternal.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.hYo);
          break;
        case 2:
          EventSystem_1.EventSystem.AddWithTarget(this.ActorInternal.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.hYo);
      }
    }
  }
  EAl() {
    switch (this.aYo) {
      case 1:
        if (EventSystem_1.EventSystem.HasWithTarget(this.ActorInternal.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.hYo)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.ActorInternal.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.hYo);
        }
        break;
      case 2:
        if (EventSystem_1.EventSystem.HasWithTarget(this.ActorInternal.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.hYo)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.ActorInternal.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.hYo);
        }
    }
  }
}
exports.GameplayCueMaterial = GameplayCueMaterial;
//# sourceMappingURL=GameplayCueMaterial.js.map