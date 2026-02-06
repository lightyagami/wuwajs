"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindSunSpiritModel = exports.FindSunSpiritLevelConfig = exports.FindSunSpiritLevelPlay = exports.FindSunSpiritModifier = exports.FindSunSpiritGrid = exports.FindSunSpiritEndTarget = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ILevelPlay_1 = require("../../../UniverseEditor/Interface/ILevelPlay");
class FindSunSpiritEndTarget {
  constructor() {
    this.TargetLocation = Vector_1.Vector.Create();
    this.TargetRotator = Rotator_1.Rotator.Create();
  }
}
exports.FindSunSpiritEndTarget = FindSunSpiritEndTarget;
class FindSunSpiritGrid {
  constructor() {
    this.Type = ILevelPlay_1.EFindSunSpiritGridType.Empty;
    this.IsBlock = false;
    this.IsMutable = false;
  }
}
exports.FindSunSpiritGrid = FindSunSpiritGrid;
class FindSunSpiritModifier {
  constructor() {
    this.GridIndex = 0;
    this.GridX = 0;
    this.GridY = 0;
    this.ModifyIndexSet = new Set();
  }
}
exports.FindSunSpiritModifier = FindSunSpiritModifier;
class FindSunSpiritLevelPlay {
  constructor() {
    this.CurrentStep = 0;
    this.SelectedModifierIndex = 0;
    this.GridList = [];
    this.SunSpiritIndexSet = new Set();
    this.SunSpiritNum = 0;
  }
}
exports.FindSunSpiritLevelPlay = FindSunSpiritLevelPlay;
class FindSunSpiritLevelConfig {
  constructor() {
    this.CurrentLevelId = 0;
    this.GridList = undefined;
    this.LevelWidth = 0;
    this.LevelHeight = 0;
    this.SunSpiritStartGridIndices = [];
    this.SunSpiritEndIndex = -1;
    this.MaxJumpHeight = 1;
    this.MaxDropHeight = -1;
    this.MaxStep = -1;
    this.ModifierList = [];
  }
}
exports.FindSunSpiritLevelConfig = FindSunSpiritLevelConfig;
class FindSunSpiritModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentCameraActor = undefined;
    this.GlobalConfig = undefined;
    this.Config = undefined;
    this.LevelPosition = undefined;
    this.LevelRotator = undefined;
    this.LevelQuat = undefined;
    this.LevelEndTargetList = undefined;
    this.ResetTimes = 0;
    this.FailResetDelayTime = 0;
    this.IsGameFinish = false;
    this.GameFinishResult = false;
    this.OnFindSunSpiritFinish = undefined;
    this.UploadInfo = undefined;
    this.LevelConfig = undefined;
    this.IsGameplayReady = false;
    this.LevelPlay = undefined;
    this.PerformManager = undefined;
    this.IsTriggerCooldown = false;
    this.TriggerCooldownTime = 0;
    this.TriggerCooldownTimer = undefined;
  }
}
exports.FindSunSpiritModel = FindSunSpiritModel;
//# sourceMappingURL=FindSunSpiritModel.js.map