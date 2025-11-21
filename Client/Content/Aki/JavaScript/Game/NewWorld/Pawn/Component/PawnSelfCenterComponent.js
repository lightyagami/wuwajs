"use strict";

var __decorate = this && this.__decorate || function (e, t, n, i) {
  var o;
  var r = arguments.length;
  var s = r < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, i);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (o = e[h]) {
        s = (r < 3 ? o(s) : r > 3 ? o(t, n, s) : o(t, n)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnSelfCenterComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
let PawnSelfCenterComponent = class PawnSelfCenterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.CreatureDataComp = undefined;
    this.TimeScaleComp = undefined;
    this.SeparatelyHandleSelfCenteredMode = false;
    this.FinalTimeDilationInSelfCenteredMode = 1;
    this.ExtraTimeDilationInSelfCenteredModeInternal = 1;
    this.ForeverTimeScaleIdInSelfCenteredMode = 0;
    this.MEu = (e, t) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Pawn", 39, "OnSwitchSelfCenterTimeDilation", ["EntityId", this.Entity.Id], ["SelfCenterMode", e], ["TimeDilation", t]);
      }
      this.TimeScaleComp?.SetTimeScaleTicking(true, "[PawnSelfCenterComponent] OnSwitchSelfCenteredMode, 开启TimeScaleComponent的Tick");
      if (this.SeparatelyHandleSelfCenteredMode) {
        if (this.ForeverTimeScaleIdInSelfCenteredMode > 0) {
          this.TimeScaleComp?.RemoveForeverTimeScale(this.ForeverTimeScaleIdInSelfCenteredMode);
          this.ForeverTimeScaleIdInSelfCenteredMode = 0;
        }
        if (ModelManager_1.ModelManager.CharacterModel.EnabledSelfCentered) {
          this.ExtraTimeDilationInSelfCenteredModeInternal = this.FinalTimeDilationInSelfCenteredMode / t;
          this.ForeverTimeScaleIdInSelfCenteredMode = this.TimeScaleComp?.SetForeverTimeScale(14, this.ExtraTimeDilationInSelfCenteredModeInternal) ?? 0;
        } else {
          this.ExtraTimeDilationInSelfCenteredModeInternal = 1;
        }
      }
    };
  }
  get ExtraTimeDilationInSelfCenteredMode() {
    if (this.SeparatelyHandleSelfCenteredMode) {
      return this.ExtraTimeDilationInSelfCenteredModeInternal;
    } else {
      return 1;
    }
  }
  OnInitData() {
    this.CreatureDataComp = this.Entity.GetComponent(0);
    var e = this.CreatureDataComp.GetPbEntityInitData()?.ComponentsData;
    return !!e && (e = (0, IComponent_1.getComponent)(e, "BaseInfoComponent"), this.SeparatelyHandleSelfCenteredMode = !!e?.TimeScaleConfig?.IgnoreGlobalTimeScale, true);
  }
  OnStart() {
    this.TimeScaleComp = this.Entity.GetComponent(126);
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.MEu)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.MEu);
    }
    var e = ModelManager_1.ModelManager.CharacterModel;
    if (e?.EnabledSelfCentered) {
      this.MEu(e.SelfCenteredMode, e.SelfCenteredTimeDilation);
    }
    return true;
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.MEu)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.MEu);
    }
    return true;
  }
};
PawnSelfCenterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(292)], PawnSelfCenterComponent);
exports.PawnSelfCenterComponent = PawnSelfCenterComponent; //# sourceMappingURL=PawnSelfCenterComponent.js.map