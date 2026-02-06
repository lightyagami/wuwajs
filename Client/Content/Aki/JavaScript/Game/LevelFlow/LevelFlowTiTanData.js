"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowTiTanData = undefined;
const IAction_1 = require("../../UniverseEditor/Interface/IAction");
const Global_1 = require("../Global");
const ModelManager_1 = require("../Manager/ModelManager");
const LevelFlowAddBuffAction_1 = require("./Action/LevelFlowAddBuffAction");
const LevelFlowAddCueAction_1 = require("./Action/LevelFlowAddCueAction");
const LevelFlowCameraLookAtPosition_1 = require("./Action/LevelFlowCameraLookAtPosition");
const LevelFlowDeadEyeMode_1 = require("./Action/LevelFlowDeadEyeMode");
const LevelFlowEnableHookMark_1 = require("./Action/LevelFlowEnableHookMark");
const LevelFlowEnterMovieMode_1 = require("./Action/LevelFlowEnterMovieMode");
const LevelFlowEnterVehicleNpc_1 = require("./Action/LevelFlowEnterVehicleNpc");
const LevelFlowExecClientBattleAction_1 = require("./Action/LevelFlowExecClientBattleAction");
const LevelFlowExitMoveWithSpline_1 = require("./Action/LevelFlowExitMoveWithSpline");
const LevelFlowFadeInScreen_1 = require("./Action/LevelFlowFadeInScreen");
const LevelFlowFadeOutScreen_1 = require("./Action/LevelFlowFadeOutScreen");
const LevelFlowFloaterUseSkillAction_1 = require("./Action/LevelFlowFloaterUseSkillAction");
const LevelFlowFollowShooterReloadConfig_1 = require("./Action/LevelFlowFollowShooterReloadConfig");
const LevelFlowModifyTargetTag_1 = require("./Action/LevelFlowModifyTargetTag");
const LevelFlowMotorRailTransitionAction_1 = require("./Action/LevelFlowMotorRailTransitionAction");
const LevelFlowMoveWithSpline_1 = require("./Action/LevelFlowMoveWithSpline");
const LevelFlowOperationRestrictionAction_1 = require("./Action/LevelFlowOperationRestrictionAction");
const LevelFlowParallelAction_1 = require("./Action/LevelFlowParallelAction");
const LevelFlowPLayLevelSequence_1 = require("./Action/LevelFlowPLayLevelSequence");
const LevelFlowPlayPlot_1 = require("./Action/LevelFlowPlayPlot");
const LevelFlowPostAudioEvent_1 = require("./Action/LevelFlowPostAudioEvent");
const LevelFlowPreload_1 = require("./Action/LevelFlowPreload");
const LevelFlowQteAction_1 = require("./Action/LevelFlowQteAction");
const LevelFlowReleaseLevelSequence_1 = require("./Action/LevelFlowReleaseLevelSequence");
const LevelFlowRemoveBuffAction_1 = require("./Action/LevelFlowRemoveBuffAction");
const LevelFlowRemoveCueAction_1 = require("./Action/LevelFlowRemoveCueAction");
const LevelFlowResetMotorSpeed_1 = require("./Action/LevelFlowResetMotorSpeed");
const LevelFlowSequenceAction_1 = require("./Action/LevelFlowSequenceAction");
const LevelFlowSetClientEntityVisible_1 = require("./Action/LevelFlowSetClientEntityVisible");
const LevelFlowSetTimeDilation_1 = require("./Action/LevelFlowSetTimeDilation");
const LevelFlowSpawnDestructibleActor_1 = require("./Action/LevelFlowSpawnDestructibleActor");
const LevelFlowSwitchDataLayers_1 = require("./Action/LevelFlowSwitchDataLayers");
const LevelFlowTeleportAction_1 = require("./Action/LevelFlowTeleportAction");
const LevelFlowUseSkillAction_1 = require("./Action/LevelFlowUseSkillAction");
const LevelFlowVehicleForceStopPathLineMove_1 = require("./Action/LevelFlowVehicleForceStopPathLineMove");
const LevelFlowVehicleMoveWithPathLine_1 = require("./Action/LevelFlowVehicleMoveWithPathLine");
const LevelFlowWaitLoadingDone_1 = require("./Action/LevelFlowWaitLoadingDone");
const LevelFlowWaitPlotEnd_1 = require("./Action/LevelFlowWaitPlotEnd");
const LevelFlowWaitQteStart_1 = require("./Action/LevelFlowWaitQteStart");
const LevelFlowWaitSkillEnd_1 = require("./Action/LevelFlowWaitSkillEnd");
const LevelFlowWaitSplineMoveAction_1 = require("./Action/LevelFlowWaitSplineMoveAction");
const LevelFlowWaitTeleportEnd_1 = require("./Action/LevelFlowWaitTeleportEnd");
const LevelFlowWaitTimeAction_1 = require("./Action/LevelFlowWaitTimeAction");
const LevelFlowNode_1 = require("./Node/LevelFlowNode");
const LevelFlowData_1 = require("./Section/LevelFlowData");
const LevelFlowSection_1 = require("./Section/LevelFlowSection");
const cameraLookAtParam1 = {
  Pos: {
    X: 301980.875,
    Y: -619950.687,
    Z: 23157.529
  },
  FadeInTime: 1.5,
  StayTime: 1.5,
  FadeOutTime: 0.3,
  LockCamera: true
};
const cameraLookAtParam2 = {
  Pos: {
    X: 307895.09375,
    Y: -635732.5625,
    Z: 25132.84375
  },
  FadeInTime: 1.5,
  StayTime: 2,
  FadeOutTime: 0.5,
  LockCamera: true
};
const cameraLookAtParam3 = {
  Pos: {
    X: 300985.8125,
    Y: -656275.3125,
    Z: 32615
  },
  FadeInTime: 1.5,
  StayTime: 2,
  FadeOutTime: 0.3,
  LockCamera: true
};
const cameraLookAtParam4 = {
  Pos: {
    X: 256901.75,
    Y: -656384.8125,
    Z: 56099.011719
  },
  FadeInTime: 1,
  StayTime: 2,
  FadeOutTime: 0.3,
  LockCamera: true
};
const cameraLookAtParam5 = {
  Pos: {
    X: 252670.125,
    Y: -660398.6875,
    Z: 55644.839844
  },
  FadeInTime: 1.5,
  StayTime: 0.5,
  FadeOutTime: 0.3,
  LockCamera: true
};
const cameraLookAtParam6 = {
  Pos: {
    X: 252670.125,
    Y: -660398.6875,
    Z: 55644.839844
  },
  FadeInTime: 1.5,
  StayTime: 0.5,
  FadeOutTime: 0.3,
  LockCamera: true
};
const cameraLookAtParam7 = {
  Pos: {
    X: 242521.890625,
    Y: -710218.0625,
    Z: 90375.992188
  },
  FadeInTime: 1,
  StayTime: 0.3,
  FadeOutTime: 0.3,
  LockCamera: true,
  BanInput: true,
  HideUi: true
};
const cameraLookAtParam8 = {
  Pos: {
    X: 249233.984375,
    Y: -699254.4375,
    Z: 77474.765625
  },
  FadeInTime: 0.5,
  StayTime: 0.3,
  FadeOutTime: 0.3,
  LockCamera: true
};
const cameraLookAtParam9 = {
  Pos: {
    X: 330346.21875,
    Y: -494219.59375,
    Z: 18735.507812
  },
  FadeInTime: 1,
  StayTime: 0.3,
  FadeOutTime: 0.3,
  LockCamera: true
};
const SEQUENCE_PATH_1 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_01.LS_Env_seq_01";
const SEQUENCE_PATH_2 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_02.LS_Env_seq_02";
const SEQUENCE_PATH_3 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_03.LS_Env_seq_03";
const SEQUENCE_PATH_4 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_04.LS_Env_seq_04";
const SEQUENCE_PATH_5 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_05.LS_Env_seq_05";
const SEQUENCE_PATH_6 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_06.LS_Env_seq_06";
const SEQUENCE_PATH_7 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_07.LS_Env_seq_07";
const SEQUENCE_PATH_8 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_08.LS_Env_seq_08";
const SEQUENCE_PATH_9 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_09.LS_Env_seq_09";
const SEQUENCE_PATH_10 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_10.LS_Env_seq_10";
const SEQUENCE_PATH_11 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_11.LS_Env_seq_11";
const SEQUENCE_PATH_13 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_13.LS_Env_seq_13";
const SEQUENCE_PATH_15 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_15.LS_Env_seq_15";
const SEQUENCE_PATH_16 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_16.LS_Env_seq_16";
const SEQUENCE_PATH_17 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_17.LS_Env_seq_17";
const SEQUENCE_PATH_18 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_18.LS_Env_seq_18";
const SEQUENCE_PATH_19 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_19.LS_Env_seq_19";
const SEQUENCE_PATH_22 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_22.LS_Env_seq_22";
const SEQUENCE_PATH_23 = "/Game/Aki/Sequence/Level/3_0/Luxinzhuiluo/LS_Env_seq_23.LS_Env_seq_23";
const FLOW_LIST_NAME = "剧情_3_0_拉海洛主线_下半_1";
const FOLLOWER_RELOAD_CONFIG_PATH = "/Game/Aki/Data/Fight/FollowShooter/DA_Floater_Drone_Luxin.DA_Floater_Drone_Luxin";
const FOLLOWER_WICK_CONFIG_PATH = "/Game/Aki/Data/Fight/FollowShooter/DA_Floater_Drone_Wick.DA_Floater_Drone_Wick";
const DEAD_EYE_START_AUDIO = "play_sfx_motorcycle_dead_eye_slow_motion_start";
const fadeInScreenParam = {
  Ease: {
    Duration: 0.5,
    Type: IAction_1.EEaseType.Linear
  },
  ScreenType: IAction_1.EFadeInScreenShowType.Black
};
const fadeOutScreenParam = {
  Ease: {
    Duration: 0.5,
    Type: IAction_1.EEaseType.Linear
  }
};
const deadEyeModeParams = {
  FollowShooterConfig: {
    DeadeyeShooterDa: "/Game/Aki/Data/Fight/FollowShooter/DeadEye/DA_DeadEye_luxin.DA_DeadEye_luxin"
  },
  FocusPositions: [{
    X: 298120.84375,
    Y: -661810.5,
    Z: 34890.566406
  }, {
    X: 305734.34375,
    Y: -663636.125,
    Z: 40420.519531
  }, {
    X: 312826.09375,
    Y: -662803.6875,
    Z: 33626.492188
  }],
  FocusRadius: 60000,
  TimeScale: 0.01,
  FadeOutConfig: {
    TransitionTime: 0.3
  },
  EnergyConfig: {
    MaxEnergy: 60,
    BulletConsumption: 20,
    TimeConsumption: 1
  },
  DefaultLookAt: {
    LookAtPosition: {
      X: 307080,
      Y: -660870,
      Z: 39290
    },
    SubLensTag: -1308974630,
    TransitionTime: 0.3
  }
};
const VEHICLE_PB_DATA_ID = 961700002;
const vehicleSprintCueIdList = [7200000012, 7200000013, 7200000014, 7200000015, 7200000018, 7200000021, 7200000022, 7200000023, 7200000024, 7200000025, 7200000026, 7200000027];
class LevelFlowTiTanData extends LevelFlowData_1.LevelFlowData {
  constructor() {
    super(...arguments);
    this.oTf = () => new LevelFlowSection_1.LevelFlowSection([new LevelFlowNode_1.LevelFlowNode(undefined, [new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowWaitLoadingDone_1.LevelFlowWaitLoadingDone(), new LevelFlowFadeInScreen_1.LevelFlowFadeInScreen().Init(fadeInScreenParam), new LevelFlowTeleportAction_1.LevelFlowTeleportAction().Init(188000055), new LevelFlowWaitTeleportEnd_1.LevelFlowWaitTeleportEnd(), new LevelFlowEnterVehicleNpc_1.LevelFlowEnterVehicleNpc().Init({
      Target: VEHICLE_PB_DATA_ID,
      Seat: 0
    }), new LevelFlowSwitchDataLayers_1.LevelFlowSwitchDataLayers().Init(this.eWf([700061], []))])])], []);
    this.nTf = () => {
      var e = this.wpm();
      var l = this.Lpm();
      return new LevelFlowSection_1.LevelFlowSection([new LevelFlowNode_1.LevelFlowNode(undefined, [new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowAddBuffAction_1.LevelFlowAddBuffAction().Init(e, [640025050]), new LevelFlowOperationRestrictionAction_1.LevelFlowOperationRestrictionAction().Init(this.$bm(true, true)), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["关卡.Common.镜头.炉心跑酷专用", "角色.Common.载具驾驶.摩托.护盾.免疫受击", "角色.Common.载具驾驶.摩托.炉心跑酷主界面按钮", "角色.Common.载具驾驶.摩托.功能开关.禁用摩托HUD界面", "功能.功能制作.隐藏按钮功能.隐藏瞄准按键", "功能.功能制作.隐藏按钮功能.隐藏锁定目标按键"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, true, ["载具.摩托.炉心跑酷"]), new LevelFlowAddCueAction_1.LevelFlowAddCueAction().Init(e, [7000000003]), new LevelFlowAddCueAction_1.LevelFlowAddCueAction().Init(l, vehicleSprintCueIdList), this.CVf(SEQUENCE_PATH_1), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(2), new LevelFlowFadeOutScreen_1.LevelFlowFadeOutScreen().Init(fadeOutScreenParam), this.Mnm(SEQUENCE_PATH_11), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000055, 800, 20, 5600)), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(1500), new LevelFlowPlayPlot_1.LevelFlowPlayPlot().Init(FLOW_LIST_NAME, 10, 2), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 0.11), this.Mnm(SEQUENCE_PATH_1), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 1.8), new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100010101), this.CVf(SEQUENCE_PATH_2), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(100010101, l), new LevelFlowFollowShooterReloadConfig_1.LevelFlowFollowShooterReloadConfig().Init(FOLLOWER_RELOAD_CONFIG_PATH), new LevelFlowOperationRestrictionAction_1.LevelFlowOperationRestrictionAction().Init(this.$bm(true)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 3), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000055)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000055, 600)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 5), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000055)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000055, 500)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 6.7), this.Mnm(SEQUENCE_PATH_2), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000055)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000055, 400)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 7), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900073, new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 10001001), new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 10001001)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 7.2), new LevelFlowOperationRestrictionAction_1.LevelFlowOperationRestrictionAction().Init(this.$bm(false)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 7.5), this.Mnm(SEQUENCE_PATH_3), this.Mnm(SEQUENCE_PATH_4), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 7.7), new LevelFlowOperationRestrictionAction_1.LevelFlowOperationRestrictionAction().Init(this.$bm(true)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 8.3), this.Mnm(SEQUENCE_PATH_4, "C"), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000055)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000055, 350)), new LevelFlowOperationRestrictionAction_1.LevelFlowOperationRestrictionAction().Init(this.$bm(false)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 8.6), this.Mnm(SEQUENCE_PATH_22), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000055)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000055, 200)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 8.9), this.Mnm(SEQUENCE_PATH_23), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 9.4), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000055)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000055, 150)), new LevelFlowSetClientEntityVisible_1.LevelFlowSetClientEntityVisible().Init({
        EntityIds: [188000072],
        Visible: false
      })])]), new LevelFlowNode_1.LevelFlowNode(undefined, [new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 0.2), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([1, 2, 3], false, l), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 1.5), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([4, 5, 6], false, l), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 4.8), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([8, 9, 10], false, l), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 7.05), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([7, 20, 21], false, l), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 8.1), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([14], false, l), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 9.3), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([17, 18], false, l)])]), new LevelFlowNode_1.LevelFlowNode(undefined, [new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 10), this.CVf(SEQUENCE_PATH_6), this.CVf(SEQUENCE_PATH_19), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 10.5), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000055)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000055, 100)), new LevelFlowOperationRestrictionAction_1.LevelFlowOperationRestrictionAction().Init(this.$bm(true)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 10.7), new LevelFlowCameraLookAtPosition_1.LevelFlowCameraLookAtPosition().Init(cameraLookAtParam9, true), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000055)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000055, 5)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 11.2), this.tWf(SEQUENCE_PATH_19), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 11.3), this.Mnm(SEQUENCE_PATH_5), this.Mnm(SEQUENCE_PATH_6), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 11.5), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000055)), new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100011017), new LevelFlowMoveWithSpline_1.LevelFlowMoveWithSpline().Init(this.Inm(188700012, true, false, false), false), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188700012, 1.95), new LevelFlowSetClientEntityVisible_1.LevelFlowSetClientEntityVisible().Init({
        EntityIds: [188000072],
        Visible: true
      }), new LevelFlowParallelAction_1.LevelFlowParallelAction().Init([new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowWaitQteStart_1.LevelFlowWaitQteStart(), new LevelFlowSetTimeDilation_1.LevelFlowSetTimeDilation().Init(l, 0.02)]), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900070, new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowExitMoveWithSpline_1.LevelFlowExitMoveWithSpline().Init(l), new LevelFlowSetTimeDilation_1.LevelFlowSetTimeDilation().Init(l, 1), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(1500), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000072)), this.Mnm(SEQUENCE_PATH_19, "B", "instant"), this.Mnm(SEQUENCE_PATH_19, "C")]), new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowExitMoveWithSpline_1.LevelFlowExitMoveWithSpline().Init(l), new LevelFlowSetTimeDilation_1.LevelFlowSetTimeDilation().Init(l, 1), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(1500), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000072)), this.Mnm(SEQUENCE_PATH_19, "B", "instant"), this.Mnm(SEQUENCE_PATH_19, "C")]))]), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(10001027, l), new LevelFlowParallelAction_1.LevelFlowParallelAction().Init([new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(1.14), new LevelFlowPostAudioEvent_1.LevelFlowPostAudioEvent().Init("play_interact_seq_luxin_qte02")]), new LevelFlowMoveWithSpline_1.LevelFlowMoveWithSpline().Init(this.Inm(188000017, true, false, false), false)]), this.Mnm(SEQUENCE_PATH_6, "B", "instant"), this.Mnm(SEQUENCE_PATH_6, "C"), new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100011015), new LevelFlowMoveWithSpline_1.LevelFlowMoveWithSpline().Init(this.Inm(188000054, false, true, true), false), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(2500), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000056, 200)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000056, 0.15), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000056)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000056, 800)), new LevelFlowPlayPlot_1.LevelFlowPlayPlot().Init(FLOW_LIST_NAME, 10, 6), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000056, 0.25), new LevelFlowFloaterUseSkillAction_1.LevelFlowFloaterUseSkillAction().Init(1003), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["关卡.Common.镜头.炉心跑酷专用.加速"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, true, ["载具.摩托.炉心跑酷.二档", "角色.Common.载具驾驶.摩托.功能开关.喷射摩托隐藏钩锁特效"]), new LevelFlowEnableHookMark_1.LevelFlowEnableHookMark().Init(false), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000056, 0.9), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000056)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000056, 50, 0)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000056, 0.95), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900074, new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000056)), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188700013))]), new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000056)), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188700013))])), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["关卡.Common.镜头.炉心跑酷专用.越崖推背镜头"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["关卡.Common.镜头.炉心跑酷专用.加速"]), new LevelFlowAddCueAction_1.LevelFlowAddCueAction().Init(-1, [7000300009, 7000300010, 7000300011, 7000300012], true), new LevelFlowAddCueAction_1.LevelFlowAddCueAction().Init(e, [640025031]), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(1), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["关卡.Common.镜头.炉心跑酷专用.越崖推背镜头"]), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(10001027, l), new LevelFlowRemoveCueAction_1.LevelFlowRemoveCueAction().Init(-1, [7000300009, 7000300010, 7000300011, 7000300012], true), new LevelFlowRemoveCueAction_1.LevelFlowRemoveCueAction().Init(e, [640025031]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["载具.摩托.炉心跑酷.浮游炮技能结束"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["载具.摩托.炉心跑酷.浮游炮技能结束"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, false, ["载具.摩托.炉心跑酷.二档"]), this.CVf(SEQUENCE_PATH_18), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(2)])]), new LevelFlowNode_1.LevelFlowNode(undefined, [new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 7), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_1), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 8.6), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_2), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000055, 9), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_3), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000056, 0.5), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_4), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_5), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_19), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_22), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_23)])])], [new LevelFlowNode_1.LevelFlowNode(undefined, [new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowFadeInScreen_1.LevelFlowFadeInScreen().Init(fadeInScreenParam), new LevelFlowOperationRestrictionAction_1.LevelFlowOperationRestrictionAction().Init(this.tHf()), new LevelFlowRemoveBuffAction_1.LevelFlowRemoveBuffAction().Init(e, [640025050]), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000055)), new LevelFlowExitMoveWithSpline_1.LevelFlowExitMoveWithSpline().Init(l), new LevelFlowRemoveCueAction_1.LevelFlowRemoveCueAction().Init(e, [7000000003]), new LevelFlowRemoveCueAction_1.LevelFlowRemoveCueAction().Init(l, vehicleSprintCueIdList), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_1), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_2), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_3), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_4), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_5), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_6), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_19), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_22), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_23), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([1, 2, 3, 4, 5, 6, 7, 9, 10, 16, 17, 18, 20, 21], true, l), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["关卡.Common.镜头.炉心跑酷专用.加速"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, false, ["载具.摩托.炉心跑酷.二档", "角色.Common.载具驾驶.摩托.功能开关.喷射摩托隐藏钩锁特效"]), new LevelFlowAddBuffAction_1.LevelFlowAddBuffAction().Init(e, [600020011]), new LevelFlowEnableHookMark_1.LevelFlowEnableHookMark().Init(true), new LevelFlowTeleportAction_1.LevelFlowTeleportAction().Init(188000055), new LevelFlowWaitTeleportEnd_1.LevelFlowWaitTeleportEnd()])])]);
    };
    this.sTf = () => {
      var e = this.wpm();
      var l = this.Lpm();
      return new LevelFlowSection_1.LevelFlowSection([new LevelFlowNode_1.LevelFlowNode(undefined, [new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_6), new LevelFlowFadeOutScreen_1.LevelFlowFadeOutScreen().Init(fadeOutScreenParam), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["关卡.Common.镜头.炉心跑酷专用", "角色.Common.载具驾驶.摩托.护盾.免疫受击"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, true, ["载具.摩托.炉心跑酷", "角色.Common.载具驾驶.摩托.功能开关.喷射摩托隐藏钩锁特效"]), new LevelFlowEnableHookMark_1.LevelFlowEnableHookMark().Init(false), new LevelFlowOperationRestrictionAction_1.LevelFlowOperationRestrictionAction().Init(this.$bm(true)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000057, 300)), this.CVf(SEQUENCE_PATH_7), this.CVf(SEQUENCE_PATH_17), this.Mnm(SEQUENCE_PATH_11), new LevelFlowPreload_1.LevelFlowPreload().Init(this.g6f(10, 8)), new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100010101), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(100010101, l), new LevelFlowFollowShooterReloadConfig_1.LevelFlowFollowShooterReloadConfig().Init(FOLLOWER_RELOAD_CONFIG_PATH), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["角色.Common.载具驾驶.摩托.滑铲镜头"]), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000057, 0.01), new LevelFlowPlayPlot_1.LevelFlowPlayPlot().Init(FLOW_LIST_NAME, 10, 5), this.Mnm(SEQUENCE_PATH_18), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000057, 0.705), this.Mnm(SEQUENCE_PATH_7), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000057)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000057, 200)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000057, 0.95), this.Mnm(SEQUENCE_PATH_17), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000057)), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000057, 100)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000057, 1.25), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900071, new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100011013), new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100011013)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000057, 1.75), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, true, ["载具.摩托.炉心跑酷.结束滑铲"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, false, ["载具.摩托.炉心跑酷.结束滑铲"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["角色.Common.载具驾驶.摩托.滑铲镜头"]), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000057, 1.9), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000057)), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900072, new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100011011), new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100011011)), new LevelFlowMoveWithSpline_1.LevelFlowMoveWithSpline().Init(this.Inm(961700003, true, true, false), false), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000073, 100)), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_17), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000073, 0.1), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["关卡.Common.镜头.炉心跑酷专用"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["关卡.Common.镜头.炉心跑酷专用.子镜头1"]), this.Mnm(SEQUENCE_PATH_15), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000073, 1.5), this.Mnm(SEQUENCE_PATH_8), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000073, 1.6), new LevelFlowCameraLookAtPosition_1.LevelFlowCameraLookAtPosition().Init(cameraLookAtParam1, true), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000073, 1.8), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000073)), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(0.3), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900075, new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowFloaterUseSkillAction_1.LevelFlowFloaterUseSkillAction().Init(1003), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000018)), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(10001027, l)]), new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowFloaterUseSkillAction_1.LevelFlowFloaterUseSkillAction().Init(1003), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000018)), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(10001027, l)])), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["载具.摩托.炉心跑酷.浮游炮技能结束"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["载具.摩托.炉心跑酷.浮游炮技能结束"]), new LevelFlowMotorRailTransitionAction_1.LevelFlowMotorRailTransitionAction().Init(l, 188000074), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(0), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(0.01), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(1500), this.CVf(SEQUENCE_PATH_9), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000074, 100)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000074, 0.1), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["关卡.Common.镜头.炉心跑酷专用.子镜头2"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["关卡.Common.镜头.炉心跑酷专用.子镜头1"]), this.Mnm(SEQUENCE_PATH_16), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000074, 2.1), new LevelFlowParallelAction_1.LevelFlowParallelAction().Init([new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([this.Mnm(SEQUENCE_PATH_9, "C"), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(0.3), this.Mnm(SEQUENCE_PATH_7, "C")]), new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000074, 2.3), new LevelFlowCameraLookAtPosition_1.LevelFlowCameraLookAtPosition().Init(cameraLookAtParam2, true), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000074, 2.82), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000074)), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900075, new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowFloaterUseSkillAction_1.LevelFlowFloaterUseSkillAction().Init(1003), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000019)), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(10001027, l)]), new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowFloaterUseSkillAction_1.LevelFlowFloaterUseSkillAction().Init(1003), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000019)), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(10001027, l)]))])]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["载具.摩托.炉心跑酷.浮游炮技能结束"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["载具.摩托.炉心跑酷.浮游炮技能结束"]), new LevelFlowMotorRailTransitionAction_1.LevelFlowMotorRailTransitionAction().Init(l, 188000075), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_8), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(0), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(0.01), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(1500), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000075, 100)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000075, 0.01), this.Mnm(SEQUENCE_PATH_10), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([33, 34], false, l), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000075, 0.1), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["关卡.Common.镜头.炉心跑酷专用.子镜头3"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["关卡.Common.镜头.炉心跑酷专用.子镜头2"]), new LevelFlowPlayPlot_1.LevelFlowPlayPlot().Init(FLOW_LIST_NAME, 10, 4), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000075, 2.2), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900073, new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100011017), new LevelFlowMoveWithSpline_1.LevelFlowMoveWithSpline().Init(this.Inm(188700001, false, false, false), true), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188700001, 1), new LevelFlowPostAudioEvent_1.LevelFlowPostAudioEvent().Init(DEAD_EYE_START_AUDIO), new LevelFlowDeadEyeMode_1.LevelFlowDeadEyeMode().Init(deadEyeModeParams), new LevelFlowPlayPlot_1.LevelFlowPlayPlot().Init(FLOW_LIST_NAME, 10, 10)]), new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100011017), new LevelFlowMoveWithSpline_1.LevelFlowMoveWithSpline().Init(this.Inm(188700001, false, false, false), true), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188700001, 1), new LevelFlowDeadEyeMode_1.LevelFlowDeadEyeMode().Init(deadEyeModeParams)])), this.Mnm(SEQUENCE_PATH_18, "C"), this.Mnm(SEQUENCE_PATH_9, "D"), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188700001, 2.9), new LevelFlowExitMoveWithSpline_1.LevelFlowExitMoveWithSpline().Init(l), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, false, ["角色.Common.载具驾驶.摩托.功能开关.喷射摩托隐藏钩锁特效"]), new LevelFlowSetClientEntityVisible_1.LevelFlowSetClientEntityVisible().Init({
        EntityIds: [188000030],
        Visible: true
      }), new LevelFlowCameraLookAtPosition_1.LevelFlowCameraLookAtPosition().Init(cameraLookAtParam3, true), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(0.3), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000075)), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900076, new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000030)), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000030))), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(10001027, l), new LevelFlowCameraLookAtPosition_1.LevelFlowCameraLookAtPosition().Init(cameraLookAtParam6, true), new LevelFlowMoveWithSpline_1.LevelFlowMoveWithSpline().Init(this.Inm(188700002, true, false, false), false), new LevelFlowSetClientEntityVisible_1.LevelFlowSetClientEntityVisible().Init({
        EntityIds: [188000031],
        Visible: true
      }), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000031)), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(10001027, l), new LevelFlowMoveWithSpline_1.LevelFlowMoveWithSpline().Init(this.Inm(188700003, true, false, false), false), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900073, undefined, undefined), new LevelFlowFloaterUseSkillAction_1.LevelFlowFloaterUseSkillAction().Init(1003), new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100010011), new LevelFlowMoveWithSpline_1.LevelFlowMoveWithSpline().Init(this.Inm(188700018, false, false, false), true), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188700018, 0.25), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([19], false, l), this.Mnm(SEQUENCE_PATH_11, "D"), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188700018, 0.8), new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100011012), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188700018, 1.95), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["载具.摩托.炉心跑酷.浮游炮技能结束"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["载具.摩托.炉心跑酷.浮游炮技能结束"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, true, ["角色.Common.载具驾驶.摩托.功能开关.喷射摩托隐藏钩锁特效"]), new LevelFlowExitMoveWithSpline_1.LevelFlowExitMoveWithSpline().Init(l), new LevelFlowUseSkillAction_1.LevelFlowUseSkillAction().Init(l, 100011013), new LevelFlowMoveWithSpline_1.LevelFlowMoveWithSpline().Init(this.Inm(188700027, true, false, false), true), new LevelFlowCameraLookAtPosition_1.LevelFlowCameraLookAtPosition().Init(cameraLookAtParam7, true), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188700027, 1.9), new LevelFlowExitMoveWithSpline_1.LevelFlowExitMoveWithSpline().Init(l), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, true, ["载具.摩托.炉心跑酷.结束滑铲"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, false, ["载具.摩托.炉心跑酷.结束滑铲"]), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(0), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000076, 100)), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(0.01), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(1500), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000076, 1), new LevelFlowAddCueAction_1.LevelFlowAddCueAction().Init(e, [640025031]), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000076, 1.5), new LevelFlowPlayPlot_1.LevelFlowPlayPlot().Init(FLOW_LIST_NAME, 10, 7), new LevelFlowFollowShooterReloadConfig_1.LevelFlowFollowShooterReloadConfig().Init(FOLLOWER_WICK_CONFIG_PATH), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["角色.Common.载具驾驶.摩托.浮游炮二档"]), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000076, 1.9), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000076, 2.7), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_9), new LevelFlowCameraLookAtPosition_1.LevelFlowCameraLookAtPosition().Init(cameraLookAtParam4, true), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(0.3), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000076)), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900075, new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000040)), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(188000040))), new LevelFlowFloaterUseSkillAction_1.LevelFlowFloaterUseSkillAction().Init(1003), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(10001027, l), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["载具.摩托.炉心跑酷.浮游炮技能结束"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["载具.摩托.炉心跑酷.浮游炮技能结束"]), new LevelFlowMotorRailTransitionAction_1.LevelFlowMotorRailTransitionAction().Init(l, 188000077), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000077, 100)), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["关卡.Common.镜头.炉心跑酷专用.子镜头4"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["关卡.Common.镜头.炉心跑酷专用.子镜头3"]), this.Mnm(SEQUENCE_PATH_11, "E"), new LevelFlowCameraLookAtPosition_1.LevelFlowCameraLookAtPosition().Init(cameraLookAtParam8, true), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000077, 2.4), this.Mnm(SEQUENCE_PATH_13), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000077, 3.8), new LevelFlowCameraLookAtPosition_1.LevelFlowCameraLookAtPosition().Init(cameraLookAtParam5, true), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(0.3), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000077)), new LevelFlowQteAction_1.LevelFlowQteAction().Init(900075, undefined, undefined), new LevelFlowFloaterUseSkillAction_1.LevelFlowFloaterUseSkillAction().Init(1003), new LevelFlowExecClientBattleAction_1.LevelFlowExecClientBattleAction().Init(this.ZXm(961700000)), new LevelFlowWaitSkillEnd_1.LevelFlowWaitSkillEnd().Init(10001027, l), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, true, ["载具.摩托.炉心跑酷.浮游炮技能结束", "关卡.Common.镜头.炉心跑酷专用.子镜头5"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["载具.摩托.炉心跑酷.浮游炮技能结束", "关卡.Common.镜头.炉心跑酷专用.子镜头4"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, false, ["角色.Common.载具驾驶.摩托.功能开关.喷射摩托隐藏钩锁特效"]), new LevelFlowMotorRailTransitionAction_1.LevelFlowMotorRailTransitionAction().Init(l, 188000078), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(0), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.S1m(188000078, 5)), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(0.01), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(1500), this.Mnm(SEQUENCE_PATH_11, "F"), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000078, 0.8), new LevelFlowEnterMovieMode_1.LevelFlowEnterMovieMode().Init(this.Ovg()), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000078, 1.7), new LevelFlowVehicleMoveWithPathLine_1.LevelFlowVehicleMoveWithPathLine().Init(this.M1m(188000078)), new LevelFlowWaitSplineMoveAction_1.LevelFlowWaitSplineMoveAction().Init(l, 188000078, 1.8), new LevelFlowPlayPlot_1.LevelFlowPlayPlot().Init(FLOW_LIST_NAME, 10, 8), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(1), new LevelFlowResetMotorSpeed_1.LevelFlowResetMotorSpeed().Init(0), new LevelFlowWaitPlotEnd_1.LevelFlowWaitPlotEnd().Init(FLOW_LIST_NAME, 10, 8)])])], [new LevelFlowNode_1.LevelFlowNode(undefined, [new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowFadeInScreen_1.LevelFlowFadeInScreen().Init(fadeInScreenParam), new LevelFlowOperationRestrictionAction_1.LevelFlowOperationRestrictionAction().Init(this.tHf()), new LevelFlowVehicleForceStopPathLineMove_1.LevelFlowVehicleForceStopPathLineMove().Init("Current"), new LevelFlowRemoveBuffAction_1.LevelFlowRemoveBuffAction().Init(e, [640025050]), new LevelFlowTeleportAction_1.LevelFlowTeleportAction().Init(188000057), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["关卡.Common.镜头.炉心跑酷专用.子镜头1", "关卡.Common.镜头.炉心跑酷专用.子镜头2", "关卡.Common.镜头.炉心跑酷专用.子镜头3", "关卡.Common.镜头.炉心跑酷专用.子镜头4", "关卡.Common.镜头.炉心跑酷专用.子镜头5", "角色.Common.载具驾驶.摩托.浮游炮二档"]), new LevelFlowRemoveCueAction_1.LevelFlowRemoveCueAction().Init(e, [7000000003, 640025031]), new LevelFlowRemoveCueAction_1.LevelFlowRemoveCueAction().Init(l, vehicleSprintCueIdList), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([22, 23, 24, 25, 26], true, l), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_7), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_8), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_9), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_10), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_11), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_13), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_15), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_16), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_17), new LevelFlowReleaseLevelSequence_1.LevelFlowReleaseLevelSequence().Init(SEQUENCE_PATH_18), new LevelFlowSpawnDestructibleActor_1.LevelFlowSpawnDestructibleActor().Init([19], true, l), new LevelFlowAddBuffAction_1.LevelFlowAddBuffAction().Init(e, [600020011]), new LevelFlowWaitTeleportEnd_1.LevelFlowWaitTeleportEnd()])])]);
    };
    this.N2f = () => {
      var e = this.wpm();
      var l = this.Lpm();
      return new LevelFlowSection_1.LevelFlowSection([new LevelFlowNode_1.LevelFlowNode(undefined, [new LevelFlowSequenceAction_1.LevelFlowSequenceAction().Init([new LevelFlowVehicleForceStopPathLineMove_1.LevelFlowVehicleForceStopPathLineMove().Init("Current"), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(l, false, ["载具.摩托.炉心跑酷", "角色.Common.载具驾驶.摩托.功能开关.喷射摩托隐藏钩锁特效"]), new LevelFlowModifyTargetTag_1.LevelFlowModifyTargetTag().Init(e, false, ["关卡.Common.镜头.炉心跑酷专用", "关卡.Common.镜头.炉心跑酷专用.加速", "载具.摩托.炉心跑酷.浮游炮技能结束", "角色.Common.载具驾驶.摩托.炉心跑酷主界面按钮", "角色.Common.载具驾驶.摩托.护盾.免疫受击", "角色.Common.载具驾驶.摩托.功能开关.禁用摩托HUD界面", "关卡.Common.镜头.炉心跑酷专用.子镜头1", "关卡.Common.镜头.炉心跑酷专用.子镜头2", "关卡.Common.镜头.炉心跑酷专用.子镜头3", "关卡.Common.镜头.炉心跑酷专用.子镜头4", "关卡.Common.镜头.炉心跑酷专用.子镜头5", "角色.Common.载具驾驶.摩托.浮游炮二档"]), new LevelFlowOperationRestrictionAction_1.LevelFlowOperationRestrictionAction().Init(this.tHf()), new LevelFlowRemoveBuffAction_1.LevelFlowRemoveBuffAction().Init(e, [640025050]), new LevelFlowEnableHookMark_1.LevelFlowEnableHookMark().Init(true), new LevelFlowSwitchDataLayers_1.LevelFlowSwitchDataLayers().Init(this.eWf([], [700061])), new LevelFlowRemoveCueAction_1.LevelFlowRemoveCueAction().Init(e, [7000000003, 640025031]), new LevelFlowRemoveCueAction_1.LevelFlowRemoveCueAction().Init(l, vehicleSprintCueIdList), new LevelFlowWaitTimeAction_1.LevelFlowWaitTimeAction().Init(2)])])], []);
    };
  }
  Init() {
    this.Register(this.oTf);
    this.Register(this.nTf);
    this.Register(this.sTf);
    this.Register(this.N2f);
  }
  Mnm(e, l = "B", o = "direct") {
    return new LevelFlowPLayLevelSequence_1.LevelFlowPlayLevelSequence().Init({
      LevelSequencePath: e,
      Mark: l,
      IsEnableCenterOffset: true,
      PlayMode: o,
      KeepUI: true
    });
  }
  tWf(e, l = "B", o = "direct") {
    return new LevelFlowPLayLevelSequence_1.LevelFlowPlayLevelSequence().Init({
      LevelSequencePath: e,
      Mark: l,
      IsEnableCenterOffset: true,
      PlayMode: o,
      KeepUI: true,
      Intro: {
        Type: 0,
        Duration: 0.3
      },
      Outro: {
        Type: 0,
        Duration: 0.5
      }
    });
  }
  CVf(e) {
    return new LevelFlowPLayLevelSequence_1.LevelFlowPlayLevelSequence().Init({
      LevelSequencePath: e,
      Mark: "A",
      PlayMode: "instant"
    });
  }
  wpm() {
    return Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.Id;
  }
  Lpm() {
    var e = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(242);
    if (e && e.VehicleEntity) {
      return e.VehicleEntity.Id;
    } else {
      return ModelManager_1.ModelManager.CreatureModel.GetEntityIdByPbDataId(VEHICLE_PB_DATA_ID);
    }
  }
  Inm(e, l, o, i) {
    return {
      MoveTarget: {
        Type: "Entity",
        EntityId: this.Lpm()
      },
      SplineEntityId: e,
      IsForceToFirstPoint: i,
      IsLookDir: o,
      IsFollowStrictly: l
    };
  }
  $bm(e = false, l = false) {
    return {
      Type: IAction_1.EPlayerOperationType.DisableModule,
      MoveOption: {
        Type: IAction_1.EMoveOperationType.Disable,
        Forward: true,
        Back: false,
        Left: true,
        Right: true,
        ForbidSprint: true
      },
      SkillOption: {
        Type: IAction_1.ESkillOperationType.DisableSection,
        DisplayMode: IAction_1.EDisplayModeInSkillOp.Disable,
        DisableSkillWheel: true,
        DisableBattleSkill: {
          IsDisablePhantomSkill: true,
          IsDisableCharacterSectionalSkill: {
            IsDisableCharacterSectionalSkill: true,
            DisableSkill1: e,
            DisableUltimateSkill: true,
            DisableSwitchRole1: true,
            DisableSwitchRole2: true,
            DisableSwitchRole3: true,
            DisableDodge: true,
            DisableLock: true,
            DisableAim: true,
            DisableJump: true,
            DisableAttack: l
          }
        },
        DisableExploreSkill: {
          ExploreSkillList: [IAction_1.EExploreSkillType.Hook, IAction_1.EExploreSkillType.MotorcycleCruise, IAction_1.EExploreSkillType.MotorcycleHook]
        }
      },
      UiOption: {
        Type: IAction_1.EUiOperationType.EnableSectionalUi,
        ShowQuestTrack: true,
        ShowScreenEffect: true,
        ShowOther: true
      },
      SceneInteractionOption: {
        Type: IAction_1.ESceneInteractionOperationType.Disable
      }
    };
  }
  tHf(e = 0) {
    return {
      Type: IAction_1.EPlayerOperationType.EnableAll
    };
  }
  S1m(e, l, o = 15, i = 2000) {
    return {
      TargetVehicle: {
        Type: "Appointed",
        VehicleId: this.Lpm()
      },
      SplineEntityId: e,
      ControlType: {
        Type: "EnterPathMoving",
        ControlParams: {
          ForwardSpeed: 2500,
          ForwardAcceleration: 2000,
          DisableSprint: true
        },
        Pattern: {
          Type: "MotorcycleTrack",
          MaxOffsetDistance: l,
          IsOneWay: true,
          LongitudinalAngleLimit: 60,
          ForwardAngleLimit: o,
          LayerVerticalLimit: 2000,
          CorrectionPredictionDistance: i,
          InputCorrectionBaseAngle: 90,
          InputCorrectionCurve: "/Game/Aki/Data/Fight/Curves/CV_MotorcycleInputCorrectionCurve_2.CV_MotorcycleInputCorrectionCurve_2",
          AccelerationCorrectionCurve: "/Game/Aki/Data/Fight/Curves/CV_MotorcycleAccelerationCorrectionCurve.CV_MotorcycleAccelerationCorrectionCurve"
        }
      }
    };
  }
  M1m(e) {
    return {
      TargetVehicle: {
        Type: "Current"
      },
      SplineEntityId: e,
      ControlType: {
        Type: "ExitPathMoving"
      }
    };
  }
  ZXm(e) {
    return {
      ClientBattleOption: {
        Type: "TriggerHookPointSkill",
        HookEntityId: e
      }
    };
  }
  g6f(e, l) {
    return {
      PreloadObjectType: {
        Type: "PreloadFlows",
        FlowData: {
          FlowListName: FLOW_LIST_NAME,
          FlowId: e,
          StateId: l
        }
      }
    };
  }
  eWf(e, l) {
    return {
      LoadDataLayers: e,
      UnloadDataLayers: l
    };
  }
  Ovg() {
    return {
      BorderAnimDuration: 2,
      AutoExitInFlow: true
    };
  }
}
exports.LevelFlowTiTanData = LevelFlowTiTanData;
//# sourceMappingURL=LevelFlowTiTanData.js.map