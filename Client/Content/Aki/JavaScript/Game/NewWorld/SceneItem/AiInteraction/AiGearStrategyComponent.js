"use strict";

var AiGearStrategyComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, r) {
  var n;
  var o = arguments.length;
  var s = o < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, i, r);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        s = (o < 3 ? n(s) : o > 3 ? n(t, i, s) : n(t, i)) || s;
      }
    }
  }
  if (o > 3 && s) {
    Object.defineProperty(t, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiGearStrategyComponent = undefined;
const UE = require("ue");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
let AiGearStrategyComponent = AiGearStrategyComponent_1 = class AiGearStrategyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.R5a = "";
    this.U5a = undefined;
    this.lK_ = undefined;
    this.A5a = undefined;
    this.D5a = 0;
    this._K_ = undefined;
    this.cK_ = 0;
  }
  OnInitData(e) {
    var t = e.GetParam(AiGearStrategyComponent_1)[0];
    if (t) {
      this.lK_ = t.StrategyType.Type;
      switch (t.StrategyType.Type) {
        case IComponent_1.EAiGearStrategy.RenjuStrategy:
          var i = t.StrategyType.Chessboard;
          if (!i) {
            return false;
          }
          this.D5a = i;
          this.R5a = t.StrategyType.CommonConfig;
          this.U5a = t.StrategyType.Condition;
          break;
        case IComponent_1.EAiGearStrategy.RaceStrategy:
          this.cK_ = t.StrategyType.SplineEntityId;
          if (!this.cK_) {
            return false;
          }
          this.R5a = t.StrategyType.CommonConfig;
          this.U5a = t.StrategyType.Condition;
          break;
        default:
          return false;
      }
    }
    return true;
  }
  OnStart() {
    return true;
  }
  OnActivate() {
    switch (this.lK_) {
      case IComponent_1.EAiGearStrategy.RenjuStrategy:
        var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.D5a);
        if (e?.IsInit) {
          this.x5a(e);
        }
        break;
      case IComponent_1.EAiGearStrategy.RaceStrategy:
        this.uK_(this.cK_);
    }
  }
  x5a(e) {
    this.A5a = EntitySystem_1.EntitySystem.GetComponent(e.Id, 146);
    if (this.A5a) {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.R5a, UE.BP_AIGearStrategy_C, e => {
        this.A5a?.RegisterAiInfo(e);
      });
    }
  }
  uK_(e) {
    this._K_ = this.Entity.GetComponent(307);
    if (this._K_) {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.R5a, UE.BP_AIRaceStrategy_C, e => {
        this._K_?.RegisterAiInfo(e, this.cK_);
      });
    }
  }
  CheckAiCondition() {
    return !this.U5a || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.U5a, undefined, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id));
  }
  OnTick(e) {
    switch (this.lK_) {
      case IComponent_1.EAiGearStrategy.RenjuStrategy:
        if (this.D5a !== 0 && !this.A5a) {
          var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.D5a);
          if (!t?.Valid || !t.Entity || !t.IsInit) {
            return;
          }
          this.x5a(t);
        }
        this.A5a?.RefreshAiEnable(this.CheckAiCondition());
        break;
      case IComponent_1.EAiGearStrategy.RaceStrategy:
        if (!this._K_) {
          this.uK_(this.cK_);
        }
        this._K_?.RefreshAiEnable(this.CheckAiCondition());
    }
  }
};
AiGearStrategyComponent = AiGearStrategyComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(282)], AiGearStrategyComponent);
exports.AiGearStrategyComponent = AiGearStrategyComponent; //# sourceMappingURL=AiGearStrategyComponent.js.map