"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowSubModel = exports.MOTOR_HORIZONTAL_MOVE_LIMIT = exports.TRACK_HALF_WIDTH = undefined;
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MotorcycleArrowBattleSkillData_1 = require("../../Module/GameMainView/MotorArrow/Data/MotorcycleArrowBattleSkillData");
const MotorcycleArrowCollectionSelectViewModel_1 = require("../../Module/GameMainView/MotorArrow/Data/MotorcycleArrowCollectionSelectViewModel");
const MotorcycleHeadStateManager_1 = require("../../Module/GameMainView/MotorArrow/HeadState/MotorcycleHeadStateManager");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const KscSubModelBase_1 = require("../KscSubModelBase");
const MotorcycleArrowGenerate_1 = require("./MotorcycleArrowGenerate");
exports.TRACK_HALF_WIDTH = 500;
exports.MOTOR_HORIZONTAL_MOVE_LIMIT = 1000;
const ACTIVE_SKILL_ID = 220003;
class MotorcycleArrowSubModel extends KscSubModelBase_1.KscSubModelBase {
  constructor() {
    super(...arguments);
    this.ViewModeCollectionSelect = MotorcycleArrowCollectionSelectViewModel_1.MotorcycleArrowCollectionSelectViewModel.Create(this);
    this.DelayShowCollectionSelectView = 0;
    this.DelayShowCollectionSelectViewTimer = undefined;
    this.SceneSegmentDataDt = new Map();
    this.BulletDataTable = undefined;
    this.LevelConfig = undefined;
    this.PlayerBornPos = Vector_1.Vector.Create(0, 0, 0);
    this.PlayerDirect = Vector_1.Vector.Create(0, 0, 0);
    this.PlayerRight = Vector_1.Vector.Create(0, 0, 0);
    this.PlayerBornRot = Rotator_1.Rotator.Create();
    this.Score = 0;
    this.LevelStartTime = 0;
    this.MotorFightRoundInfo = undefined;
    this.PendingPlayerBuff = [];
    this.MotorArrowDropThreshold = 0;
    this.IsCountDownEnd = false;
    this.IsGameOver = false;
    this.BossIconPathList = [];
    this.Generate = new MotorcycleArrowGenerate_1.MotorcycleArrowGenerate();
    this.PendingMotorFightRefreshNotify = undefined;
    this.SubLevelIndex = 0;
    this.CurrentSubLevelId = 0;
    this.WaveGroupCount = [];
    this.CurrentGroupWaveIndex = 0;
    this.SubLevelConfig = undefined;
    this.InLoopSceneSegment = false;
    this.EndDistance = 0;
    this.IsInBossBattle = false;
    this.BossFightTime = 0;
    this.BossFightStartTime = 0;
    this.BossCreatureDataId = 0;
    this.HeadStateManager = new MotorcycleHeadStateManager_1.MotorcycleHeadStateManager();
    this.MotorPropertyConfigs = new Map();
    this.MotorcycleCreatureDataId = 0;
    this.MotorcycleKscEntityId = 0;
    this.MotorcycleKscEntity = undefined;
    this.MotorHorizontalMoveDistance = 0;
    this.MotorRollRot = 0;
    this.MotorArrowAccelerateTime = 0;
    this.MotorArrowDecelerateTime = 0;
    this.MotorArrowCurSpeed = 0;
    this.AudioEventHandle = 0;
    this.PBg = undefined;
  }
  GetSkillDtPath() {
    return MotorcycleArrowSubModel.SkillDtPath;
  }
  GetEntityDtPath() {
    return MotorcycleArrowSubModel.EntityDtPath;
  }
  SceneSegmentDtPath() {
    return MotorcycleArrowSubModel.SceneSegmentDtPath;
  }
  SetMotorcycleKscEntity(t) {
    this.MotorcycleKscEntity = t;
    this.MotorcycleKscEntityId = t.EntityId_;
  }
  GetMotorcycleArrowBattleSkillData() {
    if (!this.PBg) {
      this.PBg = new MotorcycleArrowBattleSkillData_1.MotorcycleArrowBattleSkillData(ACTIVE_SKILL_ID);
      this.PBg.InitData(InputMappingsDefine_1.actionMappings.载具漂移);
    }
    return this.PBg;
  }
  OnInit() {
    this.HeadStateManager.Init();
    return true;
  }
  OnClear() {
    this.SubLevelIndex = 0;
    this.CurrentGroupWaveIndex = 0;
    this.LevelConfig = undefined;
    this.SceneSegmentDataDt.clear();
    this.Generate.Clear();
    this.HeadStateManager.Clear();
    this.MotorcycleCreatureDataId = 0;
    this.MotorcycleKscEntityId = 0;
    this.MotorcycleKscEntity = undefined;
    this.Score = 0;
    this.LevelStartTime = 0;
    this.MotorFightRoundInfo = undefined;
    this.WaveGroupCount.length = 0;
    this.PendingMotorFightRefreshNotify = undefined;
    this.MotorPropertyConfigs.clear();
    this.MotorHorizontalMoveDistance = 0;
    this.BossFightTime = 0;
    this.IsInBossBattle = false;
    this.InLoopSceneSegment = false;
    this.SubLevelConfig = undefined;
    this.CurrentSubLevelId = 0;
    this.EndDistance = 0;
    this.BossCreatureDataId = 0;
    this.ViewModeCollectionSelect.Clear();
    this.PBg?.Clear();
    this.PBg = undefined;
    this.MotorRollRot = 0;
    this.IsCountDownEnd = false;
    this.IsGameOver = false;
    this.PendingPlayerBuff.length = 0;
    this.BossIconPathList.length = 0;
    this.DelayShowCollectionSelectViewTimer = undefined;
    this.MotorArrowCurSpeed = 0;
    return !(this.AudioEventHandle = 0);
  }
}
(exports.MotorcycleArrowSubModel = MotorcycleArrowSubModel).SceneSegmentDtPath = "/Game/Aki/Data/SimpleCombat/3_1Jianjianjian/Scene/DT_KSCSceneSegment.DT_KSCSceneSegment";
MotorcycleArrowSubModel.SkillDtPath = "/Game/Aki/Data/SimpleCombat/3_1Jianjianjian/Player/DT_KscSkill.DT_KscSkill";
MotorcycleArrowSubModel.EntityDtPath = "/Game/Aki/Data/SimpleCombat/3_1Jianjianjian/Player/DT_KscEntity.DT_KscEntity";
MotorcycleArrowSubModel.BulletDtPath = "/Game/Aki/Data/SimpleCombat/3_1Jianjianjian/DT_KuroBulletData_Jianjianjian.DT_KuroBulletData_Jianjianjian"; //# sourceMappingURL=MotorcycleArrowSubModel.js.map