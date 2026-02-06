"use strict";

var SceneItemSunSpiritLauncherComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, n) {
  var r;
  var S = arguments.length;
  var a = S < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, i, n);
  } else {
    for (var u = e.length - 1; u >= 0; u--) {
      if (r = e[u]) {
        a = (S < 3 ? r(a) : S > 3 ? r(t, i, a) : r(t, i)) || a;
      }
    }
  }
  if (S > 3 && a) {
    Object.defineProperty(t, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemSunSpiritLauncherComponent = undefined;
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const SunSpiritFlyingToGearState_1 = require("../../LevelGamePlay/SunSpirit/SunSpiritState/SunSpiritFlyingToGearState");
const SunSpiritFlyingToPlayerState_1 = require("../../LevelGamePlay/SunSpirit/SunSpiritState/SunSpiritFlyingToPlayerState");
const SunSpiritOccupiedByGearState_1 = require("../../LevelGamePlay/SunSpirit/SunSpiritState/SunSpiritOccupiedByGearState");
const SunSpiritOccupiedByPlayerState_1 = require("../../LevelGamePlay/SunSpirit/SunSpiritState/SunSpiritOccupiedByPlayerState");
const ModelManager_1 = require("../../Manager/ModelManager");
let SceneItemSunSpiritLauncherComponent = SceneItemSunSpiritLauncherComponent_1 = class SceneItemSunSpiritLauncherComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.tCf = undefined;
    this.Hte = undefined;
  }
  OnInitData(e) {
    this.tCf = e.GetParam(SceneItemSunSpiritLauncherComponent_1)[0];
    return true;
  }
  OnInit() {
    this.Hte = this.Entity.GetComponent(214);
    return true;
  }
  GetHintViewLocation(e) {
    var t;
    return !!this.Hte && ((t = this.Hte.GetReferenceActor("HintViewAnchor")) ? e.FromUeVector(t.D_K2_GetActorLocation()) : e.DeepCopy(this.Hte.ActorLocationProxy), true);
  }
  GetCanBeWatchSelect() {
    return (!this.Hte || !!this.Hte?.GetIsSceneInteractionLoadCompleted()) && !!this.GetTargetGear();
  }
  GetNumOfNeededSunSpirit() {
    return this.tCf?.NeedsCount ?? 0;
  }
  GetTargetGear() {
    if (this.tCf?.SunSpiritGearId) {
      var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.tCf.SunSpiritGearId);
      if (e?.Valid) {
        return e.Entity?.GetComponent(336);
      }
    }
  }
  CheckIsSunSpiritOccupiedByTargetGear(e) {
    e = e.GetSunSpiritState();
    return e instanceof SunSpiritOccupiedByGearState_1.SunSpiritOccupiedByGearState && e.GearConfigId === this.tCf?.SunSpiritGearId;
  }
  CheckIsSunSpiritFlyingFromPlayerToTargetGear(e) {
    e = e.GetSunSpiritState();
    return e instanceof SunSpiritFlyingToGearState_1.SunSpiritFlyingToGearState && e.GearConfigId === this.tCf?.SunSpiritGearId;
  }
  CheckIsSunSpiritOccupiedByPlayer(e) {
    return e.GetSunSpiritState() instanceof SunSpiritOccupiedByPlayerState_1.SunSpiritOccupiedByPlayerState;
  }
  CheckIsSunSpiritFlyingFromTargetGearToPlayer(e) {
    e = e.GetSunSpiritState();
    return e instanceof SunSpiritFlyingToPlayerState_1.SunSpiritFlyingToPlayerState && e.GearConfigId === this.tCf?.SunSpiritGearId;
  }
  GetNumOfSunSpiritRelatedToLauncher(t, i, n, r) {
    return ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritNumByPlayerIdAndAreaId(ModelManager_1.ModelManager.CreatureModel?.GetPlayerId(), this.tCf?.AreaId, true, e => t && this.CheckIsSunSpiritOccupiedByTargetGear(e) || i && this.CheckIsSunSpiritOccupiedByPlayer(e) || n && this.CheckIsSunSpiritFlyingFromPlayerToTargetGear(e) || r && this.CheckIsSunSpiritFlyingFromTargetGearToPlayer(e)) ?? 0;
  }
};
SceneItemSunSpiritLauncherComponent = SceneItemSunSpiritLauncherComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(337)], SceneItemSunSpiritLauncherComponent);
exports.SceneItemSunSpiritLauncherComponent = SceneItemSunSpiritLauncherComponent; //# sourceMappingURL=SceneItemSunSpiritLauncherComponent.js.map