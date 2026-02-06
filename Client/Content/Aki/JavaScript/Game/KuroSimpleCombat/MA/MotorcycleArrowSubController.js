"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowSubController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const KSCBuffById_1 = require("../../../Core/Define/ConfigQuery/KSCBuffById");
const MotorFightAttrAll_1 = require("../../../Core/Define/ConfigQuery/MotorFightAttrAll");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputController_1 = require("../../Input/InputController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const DigitalHpHeadState_1 = require("../../Module/GameMainView/MotorArrow/HeadState/DigitalHpHeadState");
const MotorcycleBuffGateHeadState_1 = require("../../Module/GameMainView/MotorArrow/HeadState/MotorcycleBuffGateHeadState");
const MotorcycleDropBuffGateHeadState_1 = require("../../Module/GameMainView/MotorArrow/HeadState/MotorcycleDropBuffGateHeadState");
const UiManager_1 = require("../../Ui/UiManager");
const KscEnv_1 = require("../KscEnv");
const KscLog_1 = require("../KscLog");
const KscSubControllerBase_1 = require("../KscSubControllerBase");
const KscUtil_1 = require("../KscUtil");
const ActivityPlayerHpHandle_1 = require("../SR/ActivityPlayerHpHandle");
const MAInputHandler_1 = require("./MAInput/MAInputHandler");
const MotorcycleArrowEffectManager_1 = require("./MotorcycleArrowEffectManager");
const MotorcycleArrowSubModel_1 = require("./MotorcycleArrowSubModel");
const MOTOR_ENTITY_KEY = 1002;
const MAX_ROT_ANGLE = 18;
const ANGLE_CHANGE_RATE = 50;
const DAMAGE_TEXT_ID = 13;
const CURE_DAMAGE_TEXT_ID = 14;
const MERGE_DAMAGE_DURATION = 0.1;
class MotorcycleArrowSubController extends KscSubControllerBase_1.KscSubControllerBase {
  constructor() {
    super(...arguments);
    this.EffectManager = MotorcycleArrowEffectManager_1.MotorcycleArrowEffectManager.Create(this);
    this.xem = new ActivityPlayerHpHandle_1.ActivityPlayerHpHandle();
    this.TemptTransformDouble = new UE.TransformDouble();
    this.Yhg = e => {
      var t = this.GetModel();
      for (const o of (t.MotorFightRoundInfo = e).AQf) {
        t.ViewModeCollectionSelect.AddItemData(o.DQf);
      }
      t.ViewModeCollectionSelect.SetMaxRefreshCount(e.OPg);
      t.Score = e.SMs;
      t.SubLevelIndex = e.Ysg + 1;
      this.k8g();
      this.EffectManager.AddMonsterBornEffect(e.Qwg);
      this.EnterFirstSubLevel();
    };
    this.OnSceneSegmentFinish = () => {
      var e = this.GetModel();
      if (!e.InLoopSceneSegment) {
        e.InLoopSceneSegment = true;
        this.SetSceneSegmentId(e.SubLevelConfig.SegmentId, -1);
      }
    };
    this.PFf = e => {
      var t;
      if (KscEnv_1.KscEnv.KscWorld) {
        if ((t = this.GetModel()).IsCountDownEnd) {
          this.H_g(e);
        } else {
          t.PendingMotorFightRefreshNotify = e;
        }
      } else {
        KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]不在KSC场景中");
      }
    };
    this.Z4l = () => {
      this.GetModel().IsCountDownEnd = true;
      this.j_g();
    };
    this.xHf = e => {
      var t = this.GetModel();
      if (e.GetComponent(246)?.VehicleType === "Motorcycle") {
        e = e.GetComponent(0)?.GetCreatureDataId();
        if (t.MotorcycleCreatureDataId !== 0) {
          KscLog_1.KscLog.Warn("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]重复的摩托", ["creatureId", e]);
        } else if (e) {
          t.MotorcycleCreatureDataId = e;
          this.CreateVehicleKscEntity();
          this.TryAutoDriver();
        } else {
          KscLog_1.KscLog.Warn("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]摩托没有CreatureDataId");
        }
      }
    };
    this.BHf = () => {
      KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]玩家编队创建完毕");
      this.TryAutoDriver();
    };
    this.InputHandler = undefined;
    this.BlockHandler = undefined;
    this.zhg = e => {
      var t = this.GetModel();
      t.Score = e.SMs;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorArrowScoreUpdate, t.Score);
    };
    this.MotorFightBossDropNotify = e => {
      var t = this.GetModel();
      if (t.DelayShowCollectionSelectViewTimer) {
        t.ViewModeCollectionSelect.PushPendingData(e);
      } else {
        t.ViewModeCollectionSelect.SetCollectionList(e);
        this.t7g();
      }
    };
    this.MotorFightAddCollectionNotify = e => {
      var t = this.GetModel();
      for (const o of e.AQf) {
        t.ViewModeCollectionSelect.AddItemData(o.DQf);
      }
    };
    this.MotorFightRefreshCollectionTimesChangeNotify = e => {
      this.GetModel().ViewModeCollectionSelect.SetMaxRefreshCount(e.OPg);
    };
    this.Jhg = e => {
      this.GetModel().Generate.CreateBuffDropGate(e.vjf, e.pjf, e.TIs, e.GZf);
    };
    this.e1g = e => {
      if (this.IsPlayerInitFinish()) {
        this.EffectManager.AddPlayerBornEffect(e.tE_);
      } else {
        this.GetModel().PendingPlayerBuff.push(...e.tE_);
      }
    };
    this.OnChangedTimeScale = () => {
      if (Time_1.Time.TimeDilation > 0) {
        this.GetModel().DelayShowCollectionSelectViewTimer?.Resume();
      } else {
        this.GetModel().DelayShowCollectionSelectViewTimer?.Pause();
      }
    };
    this.KDg = (t, o) => {
      var r = this.GetModel().Generate;
      var s = r.GetCurGenerateGroup() ?? r.GetLastGenerateGroup();
      if (s) {
        var n = o.Num();
        for (let e = 0; e < n; e++) {
          var i = r.GetSpawnUid();
          var _ = o.Get(e);
          var a = UE.KismetMathLibrary.D_ComposeTransforms(_.EntityTrans, t);
          r.SpawnMonsterByMonsterId(i, _.EntityId, a, s);
        }
      } else {
        KscLog_1.KscLog.Error("Skill", 20, KscEnv_1.KscEnv.KscWorld, "curGroup为空");
      }
    };
    this.nPg = e => {
      this.EffectManager.AddMonsterBornEffect(e.Qwg);
    };
    this.Q5g = (e = false) => {
      const t = this.GetModel();
      if (!t.IsGameOver) {
        t.Generate.StopGenerate();
        t.IsGameOver = true;
        const o = t.KscPlayerCreatureDataId;
        const r = t.MotorcycleCreatureDataId;
        ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.GetComponent(217)?.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName("系统.活动.箭箭剑.boss战斗"));
        KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]关卡结束移除实体");
        const s = () => {
          for (const e of t.GetAllEntityIds()) {
            if (e !== o && e !== r) {
              ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.RemoveEntityByReasonType(e, 0);
            }
          }
        };
        if (e) {
          TimerSystem_1.TimerSystem.Next(() => {
            s();
          });
        } else {
          s();
        }
      }
    };
  }
  CreateModel() {
    this.SubModel = new MotorcycleArrowSubModel_1.MotorcycleArrowSubModel();
  }
  GetModel() {
    return this.SubModel;
  }
  IsTargetMap(e) {
    return e === 44;
  }
  InitEntityAndSkillDt() {
    super.InitEntityAndSkillDt();
    KscUtil_1.KscUtil.LoadDt(KscEnv_1.KscEnv.KscWorld, this.GetModel().SceneSegmentDtPath(), this.GetModel().SceneSegmentDataDt);
  }
  OnInit() {
    Net_1.Net.Register(25476, this.PFf);
    Net_1.Net.Register(22638, this.Yhg);
    Net_1.Net.Register(16785, this.MotorFightBossDropNotify);
    Net_1.Net.Register(24458, this.zhg);
    Net_1.Net.Register(26867, this.Jhg);
    Net_1.Net.Register(20320, this.e1g);
    Net_1.Net.Register(26070, this.nPg);
    Net_1.Net.Register(27674, this.MotorFightAddCollectionNotify);
    Net_1.Net.Register(20144, this.MotorFightRefreshCollectionTimesChangeNotify);
    this.TemptTransformDouble.SetScale3D(Vector_1.Vector.OneVectorDouble);
  }
  OnClear() {
    Net_1.Net.UnRegister(25476);
    Net_1.Net.UnRegister(22638);
    Net_1.Net.UnRegister(16785);
    Net_1.Net.UnRegister(24458);
    Net_1.Net.UnRegister(26867);
    Net_1.Net.UnRegister(20320);
    Net_1.Net.UnRegister(26070);
    Net_1.Net.UnRegister(27674);
    Net_1.Net.UnRegister(20144);
  }
  OnInitMap() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
    var o = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetLevelByInstId(e);
    if (o) {
      var r = this.GetModel();
      r.LevelConfig = o;
      r.MotorArrowDropThreshold = CommonParamById_1.configCommonParamById.GetIntConfig("MotorArrowDropThreshold") ?? 1000;
      r.MotorArrowAccelerateTime = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorArrowAccelerateTime") ?? 0;
      r.MotorArrowDecelerateTime = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorArrowDecelerateTime") ?? 0;
      let t = 0;
      for (let e = r.WaveGroupCount[0] = 0; e < o.SubLevels.length; e++) {
        var s = o.SubLevels[e];
        var s = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetSubLevelByInstId(s);
        t += s?.WaveGroupIds.length ?? 0;
        r.WaveGroupCount[e + 1] = t;
      }
      var n = new UE.DamageConfig();
      n.PcFontSizeScale = 0.6;
      n.MobileFontSizeScale = 0.9;
      n.MaxDamagePerFrame = 1;
      n.AtkDamageId = DAMAGE_TEXT_ID;
      n.CureDamageId = CURE_DAMAGE_TEXT_ID;
      n.EnableCompactNumberFormat = true;
      n.MergeDurationByDamageId.Add(DAMAGE_TEXT_ID, MERGE_DAMAGE_DURATION);
      ControllerHolder_1.ControllerHolder.DamageUiController.SetUeDamageConfig(n, true);
      this.AddListenEvent();
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IncreaseDisableCount();
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]关卡配置为空", ["instanceId", e]);
    }
  }
  OnWorldDone() {
    super.OnWorldDone();
    this.CreateVehicleKscEntity();
    this.nLg();
    var e = this.GetModel();
    e.LevelStartTime = Time_1.Time.WorldTime - (e.MotorFightRoundInfo?.S5g ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    KscEnv_1.KscEnv.KscWorld?.AssignKSCEntitySpawn((0, puerts_1.toManualReleaseDelegate)(this.KDg));
    this.uco();
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("MotorArrowPlayerHurtUICueId") ?? 0;
    var o = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorArrowPlayerHurtUICueIdCD") ?? 0;
    this.xem.Init(0, 0, t, o);
    var t = e.KscPlayerHeadStateData;
    if (t) {
      this.xem.OnPlayerHpChange(t);
    }
    e.DelayShowCollectionSelectView = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorArrowCollectionSelectDelay") ?? 0;
    this.PlayMusic(e.LevelConfig.NormalMusic);
  }
  OnMapLoaded() {
    super.OnMapLoaded();
    this.InitSceneMovement();
    this.PGf();
    this.EnterFirstSubLevel();
    this.TryAddPlayerAndMotorBuff();
    (0, puerts_1.releaseManualReleaseDelegate)(this.KDg);
    this.PreloadBuffDa();
  }
  OnEntityRemoved(e, t) {
    var o = this.GetModel();
    if (!o.IsGameOver) {
      o.Generate.OnEntityRemove(e.CreatureDataId, e.ReasonName, e.Location);
    }
    if (e.CreatureDataId === o.KscPlayerCreatureDataId) {
      this.RequestPlayerDead();
    }
  }
  OnWorldReset() {
    ControllerHolder_1.ControllerHolder.BulletController.StopKuroBulletWorld();
    this.RemoveListenEvent();
    this.RemoveInputHandler();
    this.EffectManager.Clear();
    this.xem.Clear();
    ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.DecreaseDisableCount();
    var e = this.GetModel();
    this.PlayMusic(e.LevelConfig.StopMusic);
  }
  OnTick(e) {
    this.TickBossFight();
    this.GetModel().HeadStateManager.Tick();
    var t = this.GetModel().MotorcycleKscEntityId;
    if (t !== 0) {
      this.Model?.KscEntities.get(t)?.SyncEntityLocation();
    }
  }
  PGf() {
    ControllerHolder_1.ControllerHolder.BulletController.StartKuroBulletWorld();
    var e = ResourceSystem_1.ResourceSystem.Load(MotorcycleArrowSubModel_1.MotorcycleArrowSubModel.BulletDtPath, UE.DataTable);
    if (e?.IsValid()) {
      this.GetModel().BulletDataTable = e;
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "加载子弹DT失败");
    }
    var t = ControllerHolder_1.ControllerHolder.BulletController.KuroBulletWorld;
    if (t && e) {
      t.AddCommonBulletDataTable(e);
    }
  }
  nLg() {
    KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]InitBulletWorldGround");
    var e = ControllerHolder_1.ControllerHolder.BulletController.KuroBulletWorld;
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    if (t?.Valid) {
      t = t.Entity.GetComponent(3).ActorLocation;
      e?.EnableFlatGroundByAbovePoint(t);
    } else {
      KscLog_1.KscLog.Warn("Common", 85, KscEnv_1.KscEnv.KscWorld, "Ksc找不到玩家角色,未设置地面坐标");
    }
  }
  uco() {
    KscEnv_1.KscEnv.KscWorld.AttributeIdsWithMax.Add(211, 210);
    var e = KscEnv_1.KscEnv.KscWorld.AttributeEffectiveDamageType;
    e.Add(20, this.uOg([0, 3]));
    e.Add(17, this.uOg([3]));
  }
  uOg(e) {
    let t = 0;
    for (const o of e) {
      if (!(o >= 32)) {
        t |= 1 << o;
      }
    }
    return t;
  }
  k8g() {
    var e;
    var t = this.GetModel();
    var o = t.BossIconPathList;
    o.length = 0;
    let r = false;
    for (const s of t.MotorFightRoundInfo.eNg) {
      if (r) {
        r = false;
      } else {
        e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBossRefreshById(s);
        e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMonsterConfigById(e.MonsterId);
        o.push(e.TextureIcon);
        if (e.MonsterGroup > 0) {
          r = true;
        }
      }
    }
    if (o.length !== t.LevelConfig.SubLevels.length) {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]bossIconPathList长度与子关卡数不一致", ["bossIconPathList", o], ["SubLevels", t.LevelConfig.SubLevels]);
    }
  }
  OnPlayerEntityCreated() {
    super.OnPlayerEntityCreated();
    var e = this.GetModel();
    if (e.MotorFightRoundInfo.Cjf > 0) {
      e.KscPlayerEntity?.SetAttr(3, e.MotorFightRoundInfo.Cjf);
    }
    this.TryAddPlayerAndMotorBuff();
  }
  IsPlayerInitFinish() {
    var e = this.GetModel();
    return e.KscPlayerEntityId !== 0 && e.MotorcycleKscEntityId !== 0 && e.IsMapLoadOrWorldDone();
  }
  TryAddPlayerAndMotorBuff() {
    var e = this.GetModel();
    if (this.IsPlayerInitFinish()) {
      this.EffectManager.AddPlayerBornEffect(e.MotorFightRoundInfo.tE_);
      this.EffectManager.AddPlayerBornEffect(e.PendingPlayerBuff);
      e.PendingPlayerBuff.length = 0;
    }
  }
  EnterFirstSubLevel() {
    var e = this.GetModel();
    if (e.IsMapLoadOrWorldDone() && e.MotorFightRoundInfo) {
      e = e.MotorFightRoundInfo?.Ysg;
      this.EnterSubLevel(e + 1);
    }
  }
  EnterNextSubLevel() {
    var e = this.GetModel();
    var t = e.SubLevelIndex + 1;
    if (!(t >= e.LevelConfig.SubLevels.length)) {
      this.EnterSubLevel(t);
    }
  }
  EnterSubLevel(e) {
    var t = this.GetModel();
    const o = t.LevelConfig.SubLevels[e];
    KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]进入子关卡", ["currentSubLevelId", o], ["levelIndex", e]);
    var r;
    var s = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetSubLevelByInstId(o);
    if (s) {
      t.SubLevelIndex = e;
      t.CurrentGroupWaveIndex = 0;
      t.EndDistance = 0;
      t.IsInBossBattle = false;
      t.BossCreatureDataId = 0;
      t.CurrentSubLevelId = o;
      t.SubLevelConfig = s;
      t.Generate.Clear();
      t.Generate.EndDistance = s.DistanceToNext;
      this.EffectManager.OnEnterNextSubLevel();
      r = t.PlayerDirect.Multiply(s.BornDistance, MathUtils_1.MathUtils.CommonTempVector);
      t.PlayerBornPos.Addition(r, t.Generate.BornPos);
      KscEnv_1.KscEnv.KscWorld.SetWorldAttr(4, t.LevelConfig.BaseWorldSpeed * s.WorldSpeedMultiply * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND);
      if ((KscEnv_1.KscEnv.KscWorld.SceneMovement.MoveDistance = 0) < s.PreSegmentLength) {
        t.InLoopSceneSegment = false;
        r = Math.ceil(s.PreSegmentLength / t.LevelConfig.SceneSegmentLength);
        this.SetSceneSegmentId(s.PreSegmentId, r);
      } else {
        t.InLoopSceneSegment = true;
        this.SetSceneSegmentId(s.SegmentId, -1);
      }
      (r = Protocol_1.Aki.Protocol.aPf.create()).vjf = e;
      Net_1.Net.Call(24136, r, e => {
        if (e && e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]请求进入子关卡失败", ["Id", o], ["ErrCode", e.G9n]);
        }
      });
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]子关卡配置为空", ["currentSubLevelId", o]);
    }
  }
  InitSceneMovement() {
    var e;
    var t;
    var o = this.GetModel();
    var r = o.LevelConfig;
    var s = KscEnv_1.KscEnv.KscWorld?.SceneMovement;
    if (s) {
      t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r.InstId);
      o.PlayerBornPos.Set(t.BornPosition[0], t.BornPosition[1], t.BornPosition[2]);
      (e = o.PlayerBornRot).Set(t.BornRotation[0], t.BornRotation[2], t.BornRotation[1]);
      e.Quaternion().RotateVector(Vector_1.Vector.ForwardVectorProxy, o.PlayerDirect);
      e.Quaternion().RotateVector(Vector_1.Vector.RightVectorProxy, o.PlayerRight);
      t = MathUtils_1.MathUtils.WrapAngle(e.Yaw + 180);
      o.Generate.SetBornRotation(e.Pitch, t, e.Roll);
      s.SetSegmentRotation(o.Generate.BornRotation.ToUeRotator());
      t = MathUtils_1.MathUtils.CommonTempVector;
      o.PlayerBornPos.Subtraction(o.PlayerDirect.Multiply(r.SceneSegmentLength, t), t);
      s.D_SetMovementTarget(t.ToUeVector());
      s.SceneSegmentLength = r.SceneSegmentLength;
      s.MoveDistance = 0;
      s.OnSceneSegmentFinish?.Bind(this.OnSceneSegmentFinish);
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]场景移动组件为空");
    }
  }
  SetSceneSegmentId(e, t) {
    const o = this.GetModel().SceneSegmentDataDt.get(e)?.[1];
    if (o) {
      KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "开始加载[摩托战斗]场景段", ["assetPath", o], ["generateCount", t]);
      KscUtil_1.KscUtil.AsyncLoadKscAsset({
        Context: KscEnv_1.KscEnv.KscWorld,
        Id: e,
        Path: o,
        Callback: e => {
          KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]场景段资产加载成功", ["assetPath", o]);
          KscEnv_1.KscEnv.KscWorld?.SceneMovement?.SetSceneSegment(e, t);
        },
        FailCallback: e => {
          KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]场景段资产加载失败", ["assetPath", o]);
        },
        KscWorldHandle: KscEnv_1.KscEnv.KscWorldHandle
      });
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]场景段资产路径为空", ["segmentId", e]);
    }
  }
  JOf(e, t, o, r) {
    var s;
    var n = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMotorFightWaveById(t);
    if (n) {
      s = MathUtils_1.MathUtils.GetRandomFloatNumber(n.BornDistance[0], n.BornDistance[1]);
      if (r === 2 && ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBossRefreshById(o)?.BossType === 1) {
        r = 4;
      }
      e.GenerateList.push({
        BornTrack: n.BornTrack,
        BornDistance: s,
        GenerateType: r,
        RefreshId: o,
        BuffGateBornGroup: n.BuffGateBornGroup
      });
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]波次配置不存在", ["waveId", t]);
    }
  }
  AFf(e, t) {
    var o = this.GetModel();
    var r = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMotorFightWaveGroupById(e.fPf);
    if (r) {
      KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]添加波次数据", ["id", e.fPf], ["monster", e.QRs], ["boss", e.gPf], ["BuffGates", e.OZf]);
      var s = o.Generate.GetLastGenerateGroup();
      var n = o.Generate.CreateGenerateGroup();
      for (const i of e.QRs) {
        this.JOf(n, i.AEs, i.TIs, 1);
      }
      for (const _ of e.gPf) {
        this.JOf(n, _.AEs, _.CPf, 2);
      }
      for (const a of e.OZf) {
        this.JOf(n, a.AEs, a.GZf, 3);
      }
      n.GroupStartDistance = s ? s.GroupEndDistance : KscEnv_1.KscEnv.KscWorld.SceneMovement.MoveDistance;
      n.WaveGroupId = e.fPf;
      n.WaveGroupIndex = t;
      n.BossFightTime = r.BossFightTime;
      n.GroupEndDistance = n.GroupStartDistance + r.GroupLength;
      n.GenerateList.sort((e, t) => e.BornDistance - t.BornDistance);
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]波次组配置不存在", ["Id", e.fPf]);
    }
  }
  H_g(e) {
    var t = this.GetModel();
    if (e.vjf !== t.SubLevelIndex) {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]子关卡刷新SubLevelIndex不匹配", ["SubLevelIndex", t.SubLevelIndex], ["proto_SubLevelIndex", e.vjf]);
    } else {
      KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]添加子关卡数据", ["index", e.vjf]);
      for (var [o, r] of e.TGf.entries()) {
        this.AFf(r, o);
      }
      t.EndDistance = t.Generate.GetLastGenerateGroup()?.GetEndDistance() ?? 0;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorArrowSubLevelNotify, t.SubLevelIndex, false);
      t.Generate.StartGenerate();
    }
  }
  j_g() {
    var e = this.GetModel();
    if (e.PendingMotorFightRefreshNotify) {
      this.H_g(e.PendingMotorFightRefreshNotify);
      e.PendingMotorFightRefreshNotify = undefined;
    }
  }
  InitPropertyConfigs() {
    if (this.GetModel()) {
      for (const e of MotorFightAttrAll_1.configMotorFightAttrAll.GetConfigList()) {
        this.GetModel().MotorPropertyConfigs.set(e.Id, e);
      }
    }
  }
  GetAttrsDefault(e) {
    var e = this.GetModel().MotorPropertyConfigs.get(e);
    var t = new Map();
    if (e) {
      t.set(2, e.LifeMax);
      t.set(3, e.Life);
      t.set(13, e.LifeMax);
      t.set(7, e.Atk);
      t.set(4, e.Shield);
      t.set(8, e.Crit);
      t.set(9, e.CritDamage);
      t.set(11, e.AtkChange);
      t.set(12, e.MaxLifeShieldChange);
      t.set(14, e.CritChange);
      t.set(15, e.DamageChange);
      t.set(16, e.DamageReduce);
      t.set(17, e.DamageLifeSteal);
      t.set(36, e.HealedChange);
      t.set(19, e.DamageReduceCollision);
      t.set(18, e.HealBase);
      t.set(190, e.MoveSpeed);
      t.set(20, e.DamageAbsorptionCount);
      t.set(220, e.AttackSpeed);
      t.set(221, e.AttackSpeedChange);
    }
    return t;
  }
  GetOverrideAttrs(e, t) {
    var o;
    var r;
    var s = {};
    var t = this.GetModel().MotorPropertyConfigs.get(t);
    if (t && (e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMotorFightWaveGroupById(e.WaveGroupId), o = this.GetModel().SubLevelConfig, e) && o) {
      e = e.AttrRate;
      o = o.LevelAttrRate;
      s[7] = Math.ceil(t.Atk * e[0] * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND * o[0] * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND);
      r = e[1] * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND * o[1] * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND;
      s[3] = Math.ceil(t.Life * r);
      s[2] = Math.ceil(t.LifeMax * r);
      s[13] = Math.ceil(t.LifeMax * r);
      s[20] = Math.ceil(t.DamageAbsorptionCount * e[2] * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND * o[2] * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND);
    }
    return s;
  }
  AddListenEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVehicleActivate, this.xHf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.BHf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd, this.Z4l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorArrowGameOver, this.Q5g);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.OnChangedTimeScale);
  }
  RemoveListenEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVehicleActivate, this.xHf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.BHf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd, this.Z4l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorArrowGameOver, this.Q5g);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.OnChangedTimeScale);
  }
  CreateVehicleKscEntity() {
    const t = this.GetModel();
    var e;
    if (t.KscInitState !== 3 || t.MotorcycleCreatureDataId === 0) {
      KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]等待创建摩托实体", ["KscInitState", t.KscInitState], ["id", t.MotorcycleCreatureDataId]);
    } else if (e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t.MotorcycleCreatureDataId)?.Entity) {
      KscLog_1.KscLog.Info("Common", 17, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]添加Ksc摩托实体", ["motorcycle", t.MotorcycleCreatureDataId]);
      e = e.GetComponent(1).ActorTransform;
      ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AddEntityDt(t.MotorcycleCreatureDataId, MOTOR_ENTITY_KEY, undefined, e, e => {
        t.SetMotorcycleKscEntity(e);
        this.TryAddPlayerAndMotorBuff();
      });
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]没有找到摩托实体", ["id", t.MotorcycleCreatureDataId]);
    }
  }
  TryAutoDriver() {
    var e;
    var t;
    var o;
    var r;
    var s;
    var n;
    var i = this.GetModel();
    if (i.MotorcycleCreatureDataId !== 0 && ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady) {
      if (t = (e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(i.MotorcycleCreatureDataId)?.Entity)?.GetComponent(246)) {
        if (o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity) {
          r = e.GetComponent(247);
          s = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorFloorToCenter") ?? 0;
          (n = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(i.PlayerBornPos);
          n.Z += s;
          s = new UE.TransformDouble(i.PlayerBornRot.Quaternion().ToUeQuat(), n.ToUeVector(), Vector_1.Vector.OneVectorDouble);
          KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]自动上车");
          r?.SetActorTransform(s, "SummonAndRideMotorcycle", false);
          t?.TryEnterAtOnce(o, 0);
          if (i = e.GetComponent(249)) {
            i.IsSpecialMove = true;
            i.DisableUeMovementTick("摩托箭箭箭");
            i.SetMotorSubState(1);
            i.VehicleMovement.MoveMotorcycle(Vector_1.Vector.ZeroVectorProxy.ToUeVectorOld(), Quat_1.Quat.Identity, false);
          }
          if (n = CommonParamById_1.configCommonParamById.GetStringConfig("MotorArrowEngineAudioEvent")) {
            e?.GetComponent(299)?.SetAudioEventOverride("play_sfx_motor_engine", n);
          }
          this.AddInputHandler();
        } else {
          KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]自动上车失败:玩家实体为空");
        }
      } else {
        KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]自动上车失败:vehiclePerformComp为空");
      }
    }
  }
  AddInputHandler() {
    this.InputHandler ||= new MAInputHandler_1.MotorcycleArrowInputHandler();
    this.BlockHandler ||= new MAInputHandler_1.MotorcycleArrowBlockHandler();
    InputController_1.InputController.AddInputHandler(this.InputHandler);
    InputController_1.InputController.AddInputHandler(this.BlockHandler);
    KscLog_1.KscLog.Info("Input", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]添加输入处理");
    return false;
  }
  RemoveInputHandler() {
    if (this.InputHandler) {
      InputController_1.InputController.RemoveInputHandler(this.InputHandler);
      this.InputHandler = undefined;
    }
    if (this.BlockHandler) {
      InputController_1.InputController.RemoveInputHandler(this.BlockHandler);
      this.BlockHandler = undefined;
    }
    KscLog_1.KscLog.Info("Input", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]移除输入处理");
  }
  jGg(e, t) {
    var o = this.GetModel();
    var t = t > 0 ? MAX_ROT_ANGLE : t < 0 ? -MAX_ROT_ANGLE : 0;
    var e = ANGLE_CHANGE_RATE * e;
    if (o.MotorRollRot < t) {
      o.MotorRollRot = Math.min(o.MotorRollRot + e, t);
    } else if (o.MotorRollRot > t) {
      o.MotorRollRot = Math.max(o.MotorRollRot - e, t);
    }
  }
  UHg(e, t, o) {
    var r;
    var s;
    var n = this.GetModel();
    var e = e === 0 ? 0 : e > 0 ? o : -o;
    let i = n.MotorArrowCurSpeed;
    if (i !== 0 || e !== 0) {
      if ((r = e - i) != 0) {
        s = e === 0 ? n.MotorArrowDecelerateTime : n.MotorArrowAccelerateTime;
        if (i > 0 && e < 0 || i < 0 && e > 0) {
          i = 0;
        }
        o = s > 0 ? o / s * t : Math.abs(r);
        i = r > 0 ? Math.min(i + o, e) : Math.max(i - o, e);
        n.MotorArrowCurSpeed = i;
      }
    }
  }
  MoveRight(e, t) {
    var o;
    var r;
    var s;
    var n;
    var i;
    var _;
    var a = this.GetModel();
    t *= Time_1.Time.TimeDilation;
    if (a.MotorcycleCreatureDataId !== 0 && (o = (s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(a.MotorcycleCreatureDataId)?.Entity).GetComponent(247)) && a.MotorcycleKscEntity && a.MotorcycleKscEntity.IsValid() && (r = a.MotorcycleKscEntity.GetSkillComp()?.AttrSet_?.Attrs_)) {
      r = r.Get(190) ?? 0;
      if (s = s.GetComponent(249)) {
        i = (_ = s.VehicleMovement)?.WheelDisplayInfosObj;
        n = KscEnv_1.KscEnv.KscWorld.GetWorldAttr(4) * (1 + KscEnv_1.KscEnv.KscWorld.GetWorldAttr(5) * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND);
        s.SetForceSpeed(Vector_1.Vector.Create(n, e * r, 0));
        if (i && i.DisplayInfos.Num() >= 2) {
          i.DisplayInfos.Get(0).WheelSpeed = n;
          i.DisplayInfos.Get(1).WheelSpeed = n;
          i.DisplayInfos.Get(0).WheelAccel = 10;
          i.DisplayInfos.Get(1).WheelAccel = 10;
        }
        _?.SetMotorInput(new UE.Vector(0, e, 0), 0, 0, new UE.Vector(0, 0, 0));
      }
      this.jGg(t, e);
      MathUtils_1.MathUtils.CommonTempRotator.Set(0, 0, a.MotorRollRot);
      this.UHg(e, t, r);
      if ((s = t * a.MotorArrowCurSpeed) == 0) {
        o.SetActorRotation(MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator(), "MotorcycleArrow", false);
      } else {
        n = a.MotorHorizontalMoveDistance + s;
        a.MotorHorizontalMoveDistance = MathUtils_1.MathUtils.Clamp(n, -MotorcycleArrowSubModel_1.MOTOR_HORIZONTAL_MOVE_LIMIT, MotorcycleArrowSubModel_1.MOTOR_HORIZONTAL_MOVE_LIMIT);
        i = a.MotorHorizontalMoveDistance - n + s;
        _ = o.ActorLocationProxy;
        e = MathUtils_1.MathUtils.CommonTempVector;
        _.Addition(a.PlayerRight.Multiply(i, MathUtils_1.MathUtils.CommonTempVector2), e);
        this.TemptTransformDouble.SetRotation(MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator().Quaternion());
        this.TemptTransformDouble.SetLocation(e.ToUeVector());
        o.SetActorTransform(this.TemptTransformDouble, "MotorcycleArrow", false);
      }
    }
  }
  ExecSkillAction() {
    var e;
    var t = this.GetModel().GetMotorcycleArrowBattleSkillData();
    if (t.IsEnable() && t.IsVisible() && (t = this.SubModel.KscPlayerEntity)) {
      if (!!(e = t.GetSkillComp()?.Skills_) && !(e.Num() <= 0)) {
        KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]技能释放成功");
        t.TryActiveSKill(0);
      }
    }
  }
  RequestPlayerDead() {
    var e = Protocol_1.Aki.Protocol.M6f.create();
    KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]通知玩家死亡");
    this.Q5g(true);
    Net_1.Net.Call(22875, e, e => {
      if (e && e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]通知玩家死亡失败", ["ErrCode", e.G9n]);
      }
    });
  }
  static RequestEnterInst(e, t, o) {
    var r;
    var s = Protocol_1.Aki.Protocol.dxf.create();
    var n = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetLevelByLevelId(e);
    if (n) {
      if (r = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMotorFightRoleById(o)) {
        s.NId = t;
        s.gG_ = e;
        s.Q6n = o;
        ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.dxf = s;
        ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(n.InstId, [r.TrialRole]);
      } else {
        KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]副本进入请求异常：角色配置为空", ["roleId", o]);
      }
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]副本进入请求异常：关卡配置为空", ["levelId", e]);
    }
  }
  OnBossCreate(e, t, o) {
    this.GetModel().BossCreatureDataId = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorArrowBossCreate, o);
    KscEnv_1.KscEnv.KscWorld?.SetWorldAttr(6, 0);
    this.OnBossFightStart(t);
    ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.GetComponent(217)?.AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName("系统.活动.箭箭剑.boss战斗"));
  }
  OnBossFightStart(e) {
    var t = this.GetModel();
    t.IsInBossBattle = true;
    t.BossFightTime = e;
    t.BossFightStartTime = Time_1.Time.WorldTime;
    this.PlayMusic(t.LevelConfig.BossMusic);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorArrowBossStateChange, t.SubLevelIndex, 2);
  }
  TickBossFight() {
    var e = this.GetModel();
    if (e.IsInBossBattle && e.BossFightTime <= Time_1.Time.WorldTime - e.BossFightStartTime) {
      e.IsInBossBattle = false;
      e.BossFightTime = 0;
      KscEnv_1.KscEnv.KscWorld?.SetWorldAttr(6, 2);
    }
  }
  OnBossRemove() {
    var e = this.GetModel();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorArrowBossRemove);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorArrowBossStateChange, e.SubLevelIndex, 3);
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    this.PlayMusic(e.LevelConfig.NormalMusic);
    t?.Entity?.GetComponent(217)?.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName("系统.活动.箭箭剑.boss战斗"));
  }
  t7g() {
    const e = this.GetModel();
    if (e.IsGameOver) {
      KscLog_1.KscLog.Warn("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]打开藏品选择界面失败:关卡已结束");
    } else if (e.DelayShowCollectionSelectView > 0) {
      e.DelayShowCollectionSelectViewTimer = TimerSystem_1.TimerSystem.Delay(() => {
        e.DelayShowCollectionSelectViewTimer = undefined;
        e.ViewModeCollectionSelect.OnOpenView();
        UiManager_1.UiManager.OpenView("MotorcycleArrowCollectionSelectView", e.ViewModeCollectionSelect);
      }, e.DelayShowCollectionSelectView);
    } else {
      e.ViewModeCollectionSelect.OnOpenView();
      UiManager_1.UiManager.OpenView("MotorcycleArrowCollectionSelectView", e.ViewModeCollectionSelect);
    }
  }
  async RequestCollectionSelect(e, t) {
    var o = Protocol_1.Aki.Protocol.wQf.create();
    o.l8n = t.Pos;
    o.vjf = e.SubLevelIndex;
    o.pjf = e.WaveGroupIndex;
    o.CPf = e.BossId;
    var t = this.GetModel().KscPlayerEntity?.GetSkillComp()?.AttrSet_?.Attrs_;
    o.Cjf = t ? t.Get(3) ?? 0 : 0;
    var e = await Net_1.Net.CallAsync(18543, o);
    return !!e && e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs && !(e = (t = this.GetModel().Generate).WaitCollectionSelect, o = t.GenerateUniqueId(o.vjf, o.pjf, o.CPf), e.has(o) ? e.delete(o) : KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]藏品选择找不到对应的boss", ["recordId", o]), e.size === 0 && t.IsFinish() && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorArrowSave), t.WaitToNextSubLevel || this.EnterNextSubLevel()), 0);
  }
  async RequestCollectionRefresh(e) {
    var t = Protocol_1.Aki.Protocol.Wsg.create();
    t.vjf = e.SubLevelIndex;
    t.pjf = e.WaveGroupIndex;
    t.CPf = e.BossId;
    var e = await Net_1.Net.CallAsync(20465, t);
    return !!e && e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs && !(this.GetModel().ViewModeCollectionSelect.UpdateDrop(e.UQf), 0);
  }
  OnHandleHeadHpInfo(e) {
    var t;
    var o;
    var r = this.GetModel();
    if (e.HeadUiType === 3) {
      t = r.GetEntityCreatureId(e.EntityId);
      o = (t = r.Generate.BuffGateDescInfoMap.get(t))?.IsDropBuffGate ? MotorcycleDropBuffGateHeadState_1.MotorcycleDropBuffGateHeadState : MotorcycleBuffGateHeadState_1.MotorcycleBuffGateHeadState;
      r.HeadStateManager.UpdateHeadState(o, e, t);
    } else if (e.HeadUiType === 5) {
      r.HeadStateManager.UpdateHeadState(DigitalHpHeadState_1.DigitalHpHeadStateHeadState, e);
    } else if (e.HeadUiType === 4) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorArrowBossHpChange, e);
    } else {
      super.OnHandleHeadHpInfo(e);
    }
  }
  OnHandlePlayerHeadHpInfo(e, t) {
    super.OnHandlePlayerHeadHpInfo(e, t);
    this.xem.OnPlayerHpChange(e);
  }
  GetMonsterExtraBuffs() {
    return this.EffectManager.MonsterBuff;
  }
  PlayMusic(e) {
    if (e) {
      this.GetModel().AudioEventHandle = AudioSystem_1.AudioSystem.PostEvent(e);
    }
  }
  PreloadBuffDa() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("MotorArrowPreloadBuff");
    if (e) {
      for (const o of e) {
        var t = KSCBuffById_1.configKSCBuffById.GetConfig(o)?.AssetPath;
        if (!t) {
          return;
        }
        KscUtil_1.KscUtil.AsyncLoadKscAsset({
          Context: KscEnv_1.KscEnv.KscWorld,
          Id: o,
          Path: t,
          NativeContainer: KscEnv_1.KscEnv.KscWorld?.LoadedBuffDa,
          Callback: e => {
            if (ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.WorldInit) {
              KscEnv_1.KscEnv.KscWorld?.BuffData?.AddBuffDA(BigInt(o), e);
            }
          },
          KscWorldHandle: KscEnv_1.KscEnv.KscWorldHandle
        });
      }
    }
  }
}
exports.MotorcycleArrowSubController = MotorcycleArrowSubController;
//# sourceMappingURL=MotorcycleArrowSubController.js.map