"use strict";

var CreatureDataComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, o) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        n = (r < 3 ? s(n) : r > 3 ? s(i, e, n) : s(i, e)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(i, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatureDataComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MonsterBattleConfById_1 = require("../../../../../Core/Define/ConfigQuery/MonsterBattleConfById");
const MotorFrameById_1 = require("../../../../../Core/Define/ConfigQuery/MotorFrameById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AdviceData_1 = require("../../../../Module/Advice/AdviceData");
const CreatureGroupController_1 = require("../../../../World/Controller/CreatureGroupController");
const BlackboardMap_1 = require("../../../../World/Define/BlackboardMap");
const CreateEntityData_1 = require("../../CreateEntityData");
const PROFILE_IK_GROUND_TRACE = "CreatureDataComponent_IkGround";
const PROFILE_WATER_TRACE = "CreatureDataComponent_Water";
const IK_GROUND_TRACE_HEIGHT = 400;
const IK_GROUND_TRACE_RADIUS = 300;
const WATER_TRACE_HEIGHT = 200;
let CreatureDataComponent = CreatureDataComponent_1 = class CreatureDataComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Wpo = 0;
    this.j8 = 0;
    this.Ehh = 0;
    this.dFe = 0;
    this.fie = Protocol_1.Aki.Protocol.kks.Proto_Monster;
    this.QQr = 0;
    this.XQr = Protocol_1.Aki.Protocol.rLs.Proto_OldEntity;
    this.E0 = 0;
    this.$Qr = undefined;
    this.zZa = false;
    this.JZa = undefined;
    this.irl = undefined;
    this.rrl = undefined;
    this.nGl = 0;
    this.BIl = 0;
    this.mNc = 0;
    this.fNc = 0;
    this.YQr = 0;
    this.JQr = 0;
    this.zQr = 0;
    this.ZQr = 0;
    this.eXr = undefined;
    this.Yre = undefined;
    this.tXr = new Array();
    this.mQt = new Set();
    this.yne = false;
    this.n8g = false;
    this.ActorVisible = false;
    this.iXr = false;
    this.LivingStatus = undefined;
    this.oXr = 0;
    this.EntityCommonTags = new Set();
    this.RelationId = 0;
    this.PbRelationMatchCfgIndex = -1;
    this.ControllerId = 0;
    this.PbDynAttachEntityConfigId = 0;
    this.PbDynAttachEntityActorKey = "";
    this.PbDynAttachRefActorKey = "";
    this.PbDynAttachRelPos = Vector_1.Vector.Create();
    this.PbDynAttachRelRot = Rotator_1.Rotator.Create();
    this.IsShowingHandFx = false;
    this.AutonomousId = 0;
    this.nxl = 0;
    this.OccupiedGridInfo = new Map();
    this.DynamicGridInfo = [];
    this.BoardCanMove = true;
    this.rXr = 0;
    this.nXr = undefined;
    this.sXr = "";
    this.aXr = 0;
    this.qne = undefined;
    this.hXr = undefined;
    this.lXr = 0;
    this.PIl = undefined;
    this._Xr = undefined;
    this.ou = false;
    this.uXr = undefined;
    this.PbInRangeEntityCreatureDataIds = undefined;
    this.PbInRangePlayerIds = undefined;
    this.PbSceneItemAttributeIds = undefined;
    this.PbPullingFoundationEntityId = undefined;
    this.PbSceneAiEnabled = false;
    this.PbPatrolInfoPb = undefined;
    this.PbAnimalInitialPartIds = undefined;
    this.PbCombinePartInfoList = undefined;
    this.PbCombineTargetServerId = undefined;
    this.PbHookLockPointDisabled = false;
    this.PbHackingEntities = [];
    this.PbHackedByEntities = undefined;
    this.PbGravityFlipDirection = undefined;
    this.PbMoveSplineId = 0;
    this.PbMoveSplineConfig = undefined;
    this.PbMoveSplineSceneItemRuntimeData = undefined;
    this.PbMoveToPointConfig = undefined;
    this.ZS1 = 1;
    this.eM1 = 0;
    this.SpawnedEntityInfos = [];
    this.TemplateSpawnerType = Protocol_1.Aki.Protocol.TS1.Proto_TemplateDefault;
    this.HoldHandTargetEntityId = 0;
    this.HoldHandType = 0;
    this.HoldHandIsFollow = false;
    this.HonamiStoryItemInfo = undefined;
    this.HonamiStoryLevel = 0;
    this.RbBlockInfo = undefined;
    this.RbFloorInfo = undefined;
    this.RbItemInfo = undefined;
    this.PlayerFollowersInfo = undefined;
    this.FollowerInfo = undefined;
    this.MotorOutlookInfo = undefined;
    this.ExhibitionItemId = 0;
    this.FurnitureSlotId = 0;
    this.FurnitureId = 0;
    this.HuluSkinId = 0;
    this.wDe = 0;
    this.vH = 0;
    this.mXr = false;
    this.dXr = undefined;
    this.d7a = undefined;
    this.CXr = false;
    this.gXr = "";
    this.ger = undefined;
    this.AUf = 0n;
    this.fXr = 0;
    this.pXr = undefined;
    this.vXr = false;
    this.MXr = undefined;
    this.EXr = undefined;
    this.SXr = undefined;
    this.t4r = undefined;
    this.ComponentDataMap = new Map();
    this.GIc = [];
    this.yXr = false;
    this.Dne = false;
    this.IXr = undefined;
    this.IsConcealed = false;
    this.IsPreAwakeEntity = false;
    this.SummonType = Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeDefault;
    this.SummonCfgId = 0;
    this.TXr = undefined;
    this.sd1 = false;
    this.LXr = 0;
    this.NJm = new Array();
    this.RXr = new Array();
    this.ehm = 0;
    this.UXr = new Array();
    this.xRn = new Map();
    this.ComponentsKey = 0n;
    this.xm1 = undefined;
    this.Um1 = undefined;
    this.Dm1 = undefined;
    this.TrapAuxiliaryConfigIds = undefined;
    this.ad1 = () => {
      var t = ModelManager_1.ModelManager.TraceElementModel.GetTraceTypeElement(UE.TraceSphereElement.StaticClass(), QueryTypeDefine_1.KuroTraceTypeQuery.IkGround, GlobalData_1.GlobalData.World);
      t.Radius = IK_GROUND_TRACE_RADIUS;
      var i = this.GetPbLocation();
      ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation.DeepCopy(i);
      ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation.DeepCopy(i);
      MathUtils_1.MathUtils.CommonTempVector.DeepCopy(this.PIl);
      MathUtils_1.MathUtils.CommonTempVector.Normalize();
      MathUtils_1.MathUtils.CommonTempVector.MultiplyEqual(IK_GROUND_TRACE_HEIGHT);
      ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector);
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation);
      if (TraceElementCommon_1.TraceElementCommon.SphereTrace(t, PROFILE_IK_GROUND_TRACE)) {
        i = t.HitResult;
        if (i?.bBlockingHit) {
          TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i, 0, MathUtils_1.MathUtils.CommonTempVector);
          return MathUtils_1.MathUtils.CommonTempVector.ToUeVector();
        }
      }
    };
    this.hd1 = () => {
      var t = ModelManager_1.ModelManager.TraceElementModel.GetTraceTypeElement(UE.TraceLineElement.StaticClass(), QueryTypeDefine_1.KuroTraceTypeQuery.Water, GlobalData_1.GlobalData.World);
      var i = this.GetPbLocation();
      ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation.DeepCopy(i);
      ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation.DeepCopy(i);
      MathUtils_1.MathUtils.CommonTempVector.DeepCopy(this.PIl);
      MathUtils_1.MathUtils.CommonTempVector.Normalize();
      MathUtils_1.MathUtils.CommonTempVector.MultiplyEqual(WATER_TRACE_HEIGHT);
      ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation.SubtractionEqual(MathUtils_1.MathUtils.CommonTempVector);
      ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector);
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation);
      if (TraceElementCommon_1.TraceElementCommon.LineTrace(t, PROFILE_WATER_TRACE)) {
        i = t.HitResult;
        if (i?.bBlockingHit) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(i, 0, MathUtils_1.MathUtils.CommonTempVector);
          return MathUtils_1.MathUtils.CommonTempVector.ToUeVector();
        }
      }
    };
    this.AXr = -1n;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveCreatureDataComponentCache, this.E0);
    return true;
  }
  OnInitData(t) {
    var i;
    var e = t;
    var o = e.ComponentsKey;
    if (e instanceof CreateEntityData_1.CreateEntityData) {
      e = e.EntityData;
      this.E0 = this.Entity.Id;
      this.ComponentsKey = o;
      o = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity);
      i = t.CreatureDataId;
      this.SetCreatureDataId(i);
      o.CreatureDataId = i;
      o.PbDataId = e.v9n;
      this.SetPrefabId(e.LEs);
      this.SetOwnerIncId(MathUtils_1.MathUtils.LongToNumber(e.JE_));
      this.SetEntityConfigType(e.ZHn);
      o.ConfigType = e.ZHn;
      this.SetComponentKey(t.ComponentsKey);
      o.EntityType = e.zHn;
      this.dXr = t.PbEntityInitData;
      this.d7a = t.TemplateData;
      this.gXr = t.PbModelConfigId ?? "";
      this.IsConcealed = t.IsConcealed;
      this.SetPbDataByProtocol(e);
      this.Yre = new BlackboardMap_1.BlackboardMap();
      this.IsConcealed = t.IsConcealed;
      this.nTa();
      if (i = this.Entity?.EntityData?.GetCreatureDataComponent()) {
        i.EntityType = this.fie;
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[CreatureDataComponent.OnCreate] createEntityData无效。");
      }
      return false;
    }
  }
  get ModelBlueprintPath() {
    return this.sXr;
  }
  SetServerCamp(t) {
    this._Xr = t;
  }
  get CanGetReward() {
    var t;
    return !(this.ZS1 <= 0) && (t = Date.now() * 0.001, this.eM1 < t);
  }
  get IsPosAbnormal() {
    return this.mXr;
  }
  SetPosAbnormal(t) {
    this.mXr = t;
  }
  get EntityPbModelConfigId() {
    return this.gXr;
  }
  get MotorContextId() {
    return this.AUf;
  }
  get LiftFloor() {
    return this.fXr;
  }
  get IsPlotPlayerOwned() {
    return !!this.pXr && this.pXr === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  }
  ClearPlotPlayerInfo() {
    this.pXr = undefined;
    this.vXr = false;
  }
  GetSummonRandomEntityId(t) {
    if (t > this.GIc.length) {
      return 0;
    } else {
      return this.GIc[t];
    }
  }
  SetSummonRandomInfo(t) {
    this.GIc = t;
  }
  get IsConcomitantEntity() {
    return [Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom].includes(this.SummonType);
  }
  get VisionControlCreatureDataId() {
    return this.LXr;
  }
  set VisionControlCreatureDataId(t) {
    this.LXr = t;
  }
  get VisionServerEntityIds() {
    return this.NJm;
  }
  set VisionServerEntityIds(t) {
    this.NJm = t;
  }
  get CustomServerEntityIds() {
    return this.RXr;
  }
  get BossRushCreatureDataId() {
    return this.ehm;
  }
  get SummonEntityIds() {
    return this.UXr;
  }
  set SummonEntityIds(t) {
    this.UXr = t;
  }
  get ServerStartLocation() {
    return this.TXr;
  }
  GetEntityVar(t) {
    return this.xRn.get(t);
  }
  SetEntityConditionalName(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Entity", 26, "实体名称改变", ["id", this.wDe], ["name", t]);
    }
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      this.xm1 = undefined;
    } else {
      this.xm1 = t;
    }
  }
  SetEntityEntityConditionSecondName(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Entity", 26, "实体称号改变", ["id", this.wDe], ["name", t]);
    }
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      this.Um1 = undefined;
    } else {
      this.Um1 = t;
    }
  }
  SetEntityEntityConditionFunctionPath(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Entity", 26, "实体图标改变", ["id", this.wDe], ["name", t]);
    }
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      this.Dm1 = undefined;
    } else {
      this.Dm1 = t;
    }
  }
  SetMovementByProtocol(t) {
    if (this.eXr === undefined) {
      this.eXr = Protocol_1.Aki.Protocol.C8n.create();
    }
    this.eXr.f8n = t.f8n;
    this.eXr.KWn = t.KWn;
    this.eXr.P5n = t.P5n;
    this.eXr.g8n = t.g8n;
    this.eXr.QWn = t.QWn;
    this.eXr.XWn = t.XWn;
    this.eXr.KVn = t.KVn;
  }
  SetCreatureDataId(t) {
    this.Wpo = t;
  }
  GetCreatureDataId() {
    return this.Wpo;
  }
  GetPlayerId() {
    return this.j8;
  }
  SetPlayerId(t) {
    this.j8 = t;
  }
  GetOwnerId() {
    return MathUtils_1.MathUtils.LongToBigInt(MathUtils_1.MathUtils.NumberToLong(this.Ehh));
  }
  GetOwnerIncId() {
    return this.Ehh;
  }
  SetOwnerIncId(t) {
    this.Ehh = t;
  }
  GetRoleId() {
    return this.dFe;
  }
  SetRoleId(t) {
    this.dFe = t;
  }
  GetTrackingIsEnable() {
    return this.CXr;
  }
  GetEntityCamp() {
    if (this._Xr !== undefined) {
      return this._Xr;
    }
    if (this.GetPbEntityInitData()) {
      var t = this.GetBaseInfo()?.Camp;
      if (t !== undefined) {
        return t;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 28, "[清理CDT_EntityConfig]该实体没有对应的Pb表信息Camp", ["CreatureDataId", this.GetCreatureDataId()], ["TidName", this.GetEntityTidName()], ["PbDataId", this.GetPbDataId()]);
    }
    return 0;
  }
  GetRoleConfig() {
    this.$Qr ||= ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    return this.$Qr;
  }
  GetAutoRoleConfig() {
    this.JZa ||= ConfigManager_1.ConfigManager.RoleConfig.GetAutoRoleConfig(this.dFe);
    return this.JZa;
  }
  GetSkinModelId() {
    return this.nGl;
  }
  GetSkinId() {
    return this.BIl;
  }
  GetParaglidingSkinId() {
    return this.mNc;
  }
  SetParaglidingSkinId(t) {
    this.mNc = t;
  }
  GetSoarWingSkinId() {
    return this.fNc;
  }
  SetSoarWingSkinId(t) {
    this.fNc = t;
  }
  GetEntityType() {
    return this.fie;
  }
  IsRole() {
    return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Player;
  }
  IsAutoRole() {
    return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Player && this.zZa;
  }
  IsPlayer() {
    return this.fie === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity;
  }
  IsMonster() {
    return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Monster;
  }
  IsNpc() {
    return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Npc;
  }
  IsVision() {
    return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Vision;
  }
  IsSceneItem() {
    return this.fie === Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
  }
  IsAnimal() {
    return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Animal;
  }
  IsCustom() {
    return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Custom;
  }
  IsCharacter() {
    return this.IsRole() || this.IsMonster() || this.IsNpc() || this.IsVision() || this.IsAnimal();
  }
  IsVehicle() {
    return this.fie === Protocol_1.Aki.Protocol.kks.HI_;
  }
  GetSubEntityType() {
    return this.QQr;
  }
  SetEntityType(t) {
    this.fie = t;
  }
  SetSubEntityType(t) {
    this.QQr = t;
  }
  GetEntityConfigType() {
    return this.XQr;
  }
  SetEntityConfigType(t) {
    this.XQr = t;
  }
  GetLife() {
    return 0;
  }
  GetMaxLife() {
    return 0;
  }
  GetHardnessModeId() {
    return this.YQr;
  }
  SetAiWeaponId(t) {
    this.oXr = t;
  }
  GetAiWeaponId() {
    return this.oXr;
  }
  SetDurabilityValue(t) {
    this.aXr = t;
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, t);
  }
  GetDurabilityValue() {
    return this.aXr;
  }
  SetHardnessModeId(t) {
    this.YQr = t;
  }
  PXr(t) {
    this.MXr = new AdviceData_1.AdviceEntityData();
    this.MXr.Phrase(t);
  }
  GetAdviceInfo() {
    return this.MXr;
  }
  SetSummonerId(t) {
    this.JQr = t;
  }
  GetSummonerId() {
    return this.JQr;
  }
  SetSummonerPlayerId(t) {
    this.zQr = t;
  }
  GetSummonerPlayerId() {
    return this.zQr;
  }
  SetSummonsVersion(t) {
    this.ZQr = t;
  }
  GetSummonsVersion() {
    return this.ZQr;
  }
  GetMovementInfo() {
    return this.eXr;
  }
  SetMovementInfo(t) {
    this.eXr = t;
  }
  GetPbLocation() {
    var t;
    var i;
    var e;
    if (this.eXr?.P5n) {
      t = (e = this.eXr.P5n).X || 0;
      i = e.Y || 0;
      e = e.Z || 0;
      return new UE.VectorDouble(t, i, e);
    } else {
      return Vector_1.Vector.ZeroVectorDouble;
    }
  }
  GetLocation() {
    if (this.sd1) {
      var t = this.D_GetLocationIsSnap();
      if (t) {
        return t;
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Entity", 72, "寻找实体最近吸附的合法位置失败", ["MovementInfo", this.eXr], ["InitData", this.dXr]);
      }
    }
    return this.GetPbLocation();
  }
  D_GetLocationIsSnap() {
    for (const i of [this.ad1, this.hd1]) {
      var t = i();
      if (t) {
        return t;
      }
    }
  }
  SetLocation(t) {
    this.eXr ||= Protocol_1.Aki.Protocol.C8n.create();
    this.eXr.P5n ||= Protocol_1.Aki.Protocol.Gks.create();
    this.eXr.P5n.X = t.X ?? 0;
    this.eXr.P5n.Y = t.Y ?? 0;
    this.eXr.P5n.Z = t.Z ?? 0;
    t = this.eXr.P5n;
    this.TXr = Vector_1.Vector.Create(t.X, t.Y, t.Z);
  }
  GetRotation() {
    var t;
    var i;
    var e;
    if (this.eXr?.g8n) {
      t = (e = this.eXr.g8n).Pitch || 0;
      i = e.Yaw || 0;
      e = e.Roll || 0;
      return new UE.Rotator(t, i, e);
    } else {
      return new UE.Rotator(0, 0, 0);
    }
  }
  SetRotation(t) {
    this.eXr ||= Protocol_1.Aki.Protocol.C8n.create();
    this.eXr.g8n ||= Protocol_1.Aki.Protocol.D2s.create();
    this.eXr.g8n.Pitch = t.Pitch;
    this.eXr.g8n.Roll = t.Roll;
    this.eXr.g8n.Yaw = t.Yaw;
  }
  D_GetTransform() {
    var t = this.GetLocation();
    var i = this.GetRotation();
    return UE.KismetMathLibrary.MakeTransformDouble(t, i, Vector_1.Vector.OneVector);
  }
  GetBlackboard() {
    return this.Yre;
  }
  SetBlackboardsByProtocol(t) {
    if (t !== undefined) {
      for (const i of t) {
        this.SetBlackboardByProtocol(i);
      }
    }
  }
  SetBlackboardByProtocol(t) {
    if (t !== undefined && (t = BlackboardMap_1.BlackboardParam.CreateByProtocol(t))) {
      this.Yre.SetValue(t.GetKey(), t);
    }
  }
  SetBlackboardsByConfig(t) {
    if (t !== undefined) {
      for (const e of t) {
        var i = BlackboardMap_1.BlackboardParam.CreateByConfig(e);
        if (i) {
          this.Yre.SetValue(i.GetKey(), i);
        }
      }
    }
  }
  GetBlackboardByKey(t) {
    return this.Yre.GetValue(t);
  }
  SetBlackboard(t, i) {
    if (i !== undefined) {
      this.Yre.SetValue(t, i);
    }
  }
  RemoveBlackboard(t) {
    return this.Yre.RemoveValue(t);
  }
  GetPublicTags() {
    return this.tXr;
  }
  SetPublicTags(t) {
    this.tXr.length = 0;
    for (const i of t) {
      this.AddPublicTags(i);
      if (!this.mQt.has(i)) {
        this.mQt.add(i);
      }
    }
  }
  AddPublicTags(t) {
    if (!this.ContainsPublicTag(t) && !(this.tXr.push(t), this.mQt.has(t))) {
      this.mQt.add(t);
    }
  }
  RemovePublicTag(i) {
    for (let t = 0; t < this.tXr.length; ++t) {
      if (this.tXr[t] === i) {
        this.tXr.splice(t, 1);
        this.mQt.delete(i);
        return true;
      }
    }
    return false;
  }
  ClearPublicTags() {
    this.tXr.length = 0;
  }
  ContainsPublicTag(t) {
    for (const i of this.tXr) {
      if (i === t) {
        return true;
      }
    }
    return false;
  }
  ContainsTag(t) {
    return this.mQt.has(t);
  }
  GetVisible() {
    return (!this.pXr || !this.vXr) && this.yne;
  }
  SetVisible(t) {
    if (this.yne = t) {
      this.n8g = false;
    }
  }
  IsDisableByServer() {
    return this.n8g;
  }
  GetComponentKey() {
    return this.AXr;
  }
  SetComponentKey(t) {
    this.AXr = t;
  }
  GetIsStaticInit() {
    return this.iXr;
  }
  SetWeaponSkinId(t) {
    this.nxl = t;
  }
  GetWeaponSkinId() {
    return this.nxl;
  }
  SetIsStaticInit(t) {
    this.iXr = t;
  }
  SetEntityCommonTags(t) {
    this.EntityCommonTags.clear();
    for (const i of t) {
      this.EntityCommonTags.add(i);
    }
  }
  UpdateEntityCommonTags(t) {
    if (t.length !== 0) {
      for (const i of t) {
        if (this.EntityCommonTags.has(i.m5n)) {
          if (!i.lWn) {
            this.EntityCommonTags.delete(i.m5n);
          }
        } else if (i.lWn) {
          this.EntityCommonTags.add(i.m5n);
        }
      }
    }
  }
  SetModelConfig(t) {
    var i;
    if (this.rXr !== t) {
      this.rXr = t;
      if (i = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, t.toString())) {
        this.nXr = i;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "模型配置不存在", ["ModelConfigId", t]);
      }
    }
  }
  GetModelId() {
    if (this.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      if (this.zZa) {
        var t = this.GetAutoRoleConfig();
        if (t) {
          return t.ModelId;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 48, "Ai角色缺少配置", ["CreatureDataId", this.GetCreatureDataId()], ["RoleId", this.dFe]);
        }
      }
      var t = this.GetRoleConfig();
      var i = this.GetSkinModelId();
      if (i > 0) {
        return i;
      } else if (t) {
        return t.MeshId;
      } else {
        return 0;
      }
    }
    if (this.GetSkinModelId() > 0) {
      return this.GetSkinModelId();
    } else if (i = this.GetPbModelConfig()) {
      return i.ModelId;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 28, "[清理CDT_EntityConfig]该实体没有对应的Pb表信息", ["CreatureDataId", this.GetCreatureDataId()], ["TidName", this.GetEntityTidName()], ["PbDataId", this.GetPbDataId()]);
      }
      return 0;
    }
  }
  GetModelConfig() {
    if (!this.nXr) {
      let t = undefined;
      if (t = this.dXr ? (0, IComponent_1.getComponent)(this.dXr.ComponentsData, "ModelComponent") : t) {
        this.xXr(t.ModelType);
      } else {
        this.nXr = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, this.GetModelId().toString());
      }
    }
    return this.nXr;
  }
  xXr(t) {
    switch (t.Type) {
      case "LevelPrefab":
        this.nXr = new UE.SModelConfig();
        this.sXr = IComponent_1.levelPrefabBpPathConfig[t.BlueprintPath];
        this.nXr.场景交互物 = new UE.SoftObjectPath(FNameUtil_1.FNameUtil.GetDynamicFName(t.PrefabPath), "");
        for (const o of t.PrefabStateList) {
          this.nXr.场景交互物状态列表.Add(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(o.LevelTag), o.SceneInteractionState);
        }
        for (const s of t.EffectStateList) {
          this.nXr.场景交互物特效列表.Add(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(s.LevelTag), s.SceneInteractionEffectState);
        }
        if (t.NameOffsetZ) {
          this.nXr.名字Z偏移 = t.NameOffsetZ;
        }
        break;
      case "ModelId":
        if (this.nGl !== 0) {
          this.SetModelConfig(this.nGl);
        } else {
          this.SetModelConfig(t.ModelId);
        }
        break;
      case "Npc":
        this.nXr = new UE.SModelConfig();
        this.sXr = t.BlueprintPath;
        var i = UE.KismetSystemLibrary.MakeSoftClassPath(t.BlueprintPath);
        var i = UE.KismetSystemLibrary.Conv_SoftClassPathToSoftClassRef(i);
        this.nXr.蓝图 = i;
        var i = UE.KismetSystemLibrary.MakeSoftClassPath(t.Abp);
        var i = UE.KismetSystemLibrary.Conv_SoftClassPathToSoftClassRef(i);
        this.nXr.动画蓝图 = i;
        if (t.NpcModel) {
          switch (t.NpcModel.Type) {
            case "Da":
              var e = UE.KismetSystemLibrary.MakeSoftClassPath(t.NpcModel.Da);
              this.nXr.DA = e;
              break;
            case "Mesh":
              e = UE.KismetSystemLibrary.MakeSoftObjectPath(t.NpcModel.Mesh);
              e = UE.KismetSystemLibrary.Conv_SoftObjPathToSoftObjRef(e);
              this.nXr.网格体 = e;
          }
        }
        if (t.BattleSockets) {
          for (const r of t.BattleSockets) {
            this.nXr.BattleSockets.Add(r);
          }
        }
        if (t.NormalSockets) {
          for (const n of t.NormalSockets) {
            this.nXr.NormalSockets.Add(n);
          }
        }
        if (t.BodyType) {
          this.nXr.体型类型 = t.BodyType;
        }
        if (t.LookingUpAngle) {
          this.nXr.注释时的抬升角度 = t.LookingUpAngle;
        }
        if (t.NameZaxisOffset) {
          this.nXr.名字Z偏移 = t.NameZaxisOffset;
        }
        break;
      case "Animal":
        this.nXr = new UE.SModelConfig();
        this.sXr = t.BlueprintPath;
        i = UE.KismetSystemLibrary.MakeSoftClassPath(t.BlueprintPath);
        i = UE.KismetSystemLibrary.Conv_SoftClassPathToSoftClassRef(i);
        this.nXr.蓝图 = i;
        i = UE.KismetSystemLibrary.MakeSoftClassPath(t.Abp);
        i = UE.KismetSystemLibrary.Conv_SoftClassPathToSoftClassRef(i);
        this.nXr.动画蓝图 = i;
        if (t.AnimalModel && t.AnimalModel.Type === "Mesh") {
          i = UE.KismetSystemLibrary.MakeSoftObjectPath(t.AnimalModel.Mesh);
          i = UE.KismetSystemLibrary.Conv_SoftObjPathToSoftObjRef(i);
          this.nXr.网格体 = i;
        }
    }
  }
  GetEntityPropertyConfig() {
    if (this.t4r) {
      return this.t4r;
    }
    let t = "";
    if (this.fie === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      i = this.GetRoleConfig();
      t = i.EntityProperty.toString();
    } else if ((i = this.GetBaseInfo())?.EntityPropertyId) {
      t = i.EntityPropertyId.toString();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 28, "[清理CDT_EntityConfig]该实体没有对应的Pb表信息EntityPropertyId", ["CreatureDataId", this.GetCreatureDataId()], ["TidName", this.GetEntityTidName()], ["PbDataId", this.GetPbDataId()]);
    }
    var i = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(1, t);
    if (i) {
      this.t4r = i;
      return this.t4r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 3, "[CreatureController.LoadActorByTypeAndId] 不存在实体配置表。", ["roleName", t]);
    }
  }
  GetRemoveState() {
    return this.ou;
  }
  SetRemoveState(t) {
    this.ou = t;
  }
  SetInitLocation(t) {
    this.qne = t;
  }
  GetInitLocation() {
    return this.qne;
  }
  GetInitGravityDirection() {
    return this.PIl;
  }
  GetInitLinearVelocity() {
    return this.hXr;
  }
  GetInitCharacterState() {
    return this.lXr;
  }
  Reset() {
    this.ClearPublicTags();
    this.mQt.clear();
    this.SetHardnessModeId(0);
    this.SetPlayerId(0);
    this.SetVisible(false);
    this.Yre.Clear();
    this.fie = Protocol_1.Aki.Protocol.kks.Proto_Player;
    this.nXr = undefined;
  }
  GetPbDataId() {
    return this.wDe;
  }
  SetPrefabId(t) {
    this.vH = t;
  }
  GetPrefabId() {
    return this.vH;
  }
  GetMonsterMatchType() {
    if (this.dXr) {
      var t = this.GetBaseInfo();
      if (t) {
        return t.Category.MonsterMatchType;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[CreatureData.GetMonsterMatchType] 实体的BaseInfoComponent空。", ["PbDataId", this.wDe]);
      }
    }
  }
  SetPbDataByProtocol(t) {
    var i = t;
    this.wDe = i.v9n;
    this.vH = i.LEs;
    this.mXr = i.iys;
    this.SetOwnerIncId(MathUtils_1.MathUtils.LongToNumber(i.JE_));
    if (this.XQr === Protocol_1.Aki.Protocol.rLs.Proto_Character) {
      this.SetRoleId(t.v9n);
    } else if (this.XQr !== Protocol_1.Aki.Protocol.rLs.Proto_OldEntity) {
      if (!this.dXr) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "[CreatureDataComponent.SetPbDataByProtocol] PbEntityInitData数据为空。", ["EntityConfigType", this.XQr], ["PbDataId", this.wDe]);
        }
        return false;
      }
      if (!this.dXr.ComponentsData) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "[CreatureDataComponent.SetPbDataByProtocol] ComponentsData", ["EntityConfigType", this.XQr], ["PbDataId", this.wDe]);
        }
        return false;
      }
      var e = this.GetBaseInfo();
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "[CreatureData.SetPbDataByProtocol] 实体的BaseInfoComponent空。", ["EntityConfigType", this.XQr], ["PbDataId", this.wDe]);
        }
        return false;
      }
      if (e.Category?.EntityPlotBindingType) {
        this.AddPublicTags(e.Category.EntityPlotBindingType);
      }
    }
    this.SetEntityType(i.zHn);
    this.SetSubEntityType(i.oys);
    this.SetPlayerId(i.W5n);
    this.yne = i.rVn;
    this.n8g = i.MVg;
    this.LivingStatus = i.JEs;
    this.PIl = i.ZE_;
    e = i.l8n;
    this.SetLocation(e);
    this.sd1 = i.gu1;
    this.SetRotation(i._8n);
    this.SetDurabilityValue(i.ZEs);
    this.qne = t.YEs;
    this.hXr = t.tys;
    this.lXr = t.eys;
    if (typeof t.nys == "number") {
      this._Xr = t.nys;
    }
    this.wXr(i.zEs);
    this.dNg(i);
    if (i.rCc > 0) {
      this.mNc = i.rCc;
    }
    if (i.iCc > 0) {
      this.fNc = i.iCc;
    }
    this.ActorVisible = i.oVn;
    return true;
  }
  dNg(t) {
    var i;
    if (t.eI_ > 0) {
      i = ModelManager_1.ModelManager.RoleSkinModel?.GetRoleSkinData(t.eI_);
      this.nGl = i?.GetRoleMeshId() ?? 0;
      this.BIl = t.eI_;
    } else if (this.GetEntityType() === Protocol_1.Aki.Protocol.kks.HI_) {
      if (this.GetBaseInfo()?.Category.VehicleType === "Motorcycle" && this.MotorOutlookInfo?.Ivg && (i = MotorFrameById_1.configMotorFrameById.GetConfig(this.MotorOutlookInfo.Ivg), this.nGl = i?.ModelId ?? 0, this.BIl = this.MotorOutlookInfo.Ivg, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Vehicle", 6, "Motor Outlook Frame Equipped", ["SkinId", this.BIl], ["SkinModelId", this.nGl]);
      }
    } else {
      this.nGl = 0;
      this.BIl = 0;
    }
  }
  wXr(t) {
    this.ComponentDataMap.clear();
    for (const C of t) {
      var i = C.C3s;
      this.ComponentDataMap.set(i, C);
      switch (i) {
        case "sys":
          this.SetHardnessModeId(C.sys.$Wn);
          break;
        case "ays":
          this.SetEntityCommonTags(C.ays.lIs);
          break;
        case "dys":
          this.SetBlackboardsByProtocol(C.dys.pIs);
          break;
        case "pys":
          this.CXr = C.pys.yIs;
          break;
        case "lys":
          this.SetSummonerId(MathUtils_1.MathUtils.LongToNumber(C.lys.YWn));
          this.SetSummonerPlayerId(C.lys.W5n);
          this.SummonType = C.lys.h5n;
          this.SummonCfgId = C.lys.dIs;
          break;
        case "yys":
          this.PXr(C.yys);
          break;
        case "Iys":
          this.fXr = C.Iys.P5n ?? 1;
          break;
        case "Rys":
          this.RelationId = C.Rys.bIs;
          this.PbRelationMatchCfgIndex = C.Rys.BIs - 1;
          this.ControllerId = MathUtils_1.MathUtils.LongToNumber(C.Rys.xIs);
          this.IsShowingHandFx = C.Rys.q5n;
          break;
        case "Yys":
          this.AutonomousId = MathUtils_1.MathUtils.LongToNumber(C.Yys.wIs);
          break;
        case "Dys":
          this.NJm.length = 0;
          for (const c of C.Dys.wzm) {
            this.NJm.push(MathUtils_1.MathUtils.LongToNumber(c));
          }
          this.RXr.length = 0;
          for (const m of C.Dys.OIs) {
            this.RXr.push(MathUtils_1.MathUtils.LongToNumber(m));
          }
          this.VisionControlCreatureDataId = MathUtils_1.MathUtils.LongToNumber(C.Dys.kIs);
          this.ehm = MathUtils_1.MathUtils.LongToNumber(C.Dys.Vnm);
          break;
        case "wys":
          for (const P of C.wys.FIs) {
            this.OccupiedGridInfo.set(P.iLs, P);
          }
          for (const p of C.wys.VIs) {
            this.DynamicGridInfo.push(p);
          }
          this.BoardCanMove = C.wys.gI_;
          break;
        case "Nys":
          this.PbInRangeEntityCreatureDataIds = C.Nys.rIs.flatMap(t => MathUtils_1.MathUtils.LongToNumber(t));
          this.PbInRangePlayerIds = C.Nys.iIs;
          break;
        case "$ys":
          var e = C.$ys;
          this.PbDynAttachEntityConfigId = e.qIs;
          this.PbDynAttachEntityActorKey = e.GIs;
          this.PbDynAttachRefActorKey = e._6n;
          this.PbDynAttachRelPos.Set(e.o6n?.X ?? 0, e.o6n?.Y ?? 0, e.o6n?.Z ?? 0);
          break;
        case "Hys":
          e = C.Hys?.hEs;
          if (e) {
            this.sQt(e);
          }
          break;
        case "oI_":
          this.zZa = C.oI_?.fI_ ?? false;
          break;
        case "lI_":
          var o = C.lI_;
          this.nxl = o.yI_;
          break;
        case "sI_":
          o = C.sI_;
          this.PbSceneItemAttributeIds = o.II_;
          break;
        case "aI_":
          var s = C.aI_;
          this.PbPullingFoundationEntityId = s.bIs;
          break;
        case "cI_":
          s = C.cI_;
          this.PbSceneAiEnabled = s.tWn;
          this.PbPatrolInfoPb = s.tVn?.RI_;
          break;
        case "uI_":
          var r = C.uI_;
          this.PbAnimalInitialPartIds = r.PI_;
          break;
        case "_I_":
          r = C._I_;
          this.PbCombinePartInfoList = r.SI_;
          this.PbCombineTargetServerId = MathUtils_1.MathUtils.LongToNumber(r.TVn);
          break;
        case "mI_":
          var n = C.mI_;
          this.PbHookLockPointDisabled = n.UI_;
          break;
        case "Tx_":
          n = C.Tx_;
          this.PbHackingEntities = n.PSs;
          break;
        case "N7_":
          var h = C.N7_;
          this.PbHackedByEntities = MathUtils_1.MathUtils.LongToNumber(h.V7_);
          break;
        case "TY_":
          h = C.TY_;
          this.PbGravityFlipDirection = h.RY_;
          break;
        case "pAc":
          var a = C.pAc;
          this.PbMoveSplineId = a.dTs;
          this.PbMoveSplineConfig = a.vAc;
          this.PbMoveSplineSceneItemRuntimeData = a.yAc;
          break;
        case "Fp1":
          this.UpdateRewardState(C.Fp1);
          break;
        case "Av1":
          a = C.Av1;
          this.SpawnedEntityInfos = a.Pv1;
          this.TemplateSpawnerType = a.MS1;
          break;
        case "WVu":
          var _ = C.WVu;
          this.TrapAuxiliaryConfigIds = _.KVu?.GNc;
          break;
        case "uUd":
          _ = C.uUd;
          this.HuluSkinId = _.cUd;
          break;
        case "t7u":
          var l = C.t7u;
          this.HoldHandType = l.i7u;
          this.HoldHandTargetEntityId = MathUtils_1.MathUtils.LongToNumber(l.TVn);
          this.HoldHandIsFollow = l.o7u;
          break;
        case "Ojd":
          l = C.Ojd;
          this.PbMoveToPointConfig = l?.V41;
          break;
        case "Q$d":
          var u = C.Q$d;
          this.HonamiStoryItemInfo = u.x$d;
          break;
        case "K$d":
          this.HonamiStoryLevel = C.K$d.F6n;
          break;
        case "kSm":
          this.RbBlockInfo = C.kSm;
          break;
        case "qSm":
          this.RbFloorInfo = C.qSm;
          break;
        case "OSm":
          this.RbItemInfo = C.OSm;
          break;
        case "nI_":
          this.PlayerFollowersInfo = C.nI_;
          break;
        case "o8m":
          this.FollowerInfo = C.o8m;
          break;
        case "mAf":
          u = C.mAf;
          this.AUf = u ? MathUtils_1.MathUtils.LongToBigInt(u.fAf) : 0n;
          break;
        case "Mpf":
          this.MotorOutlookInfo = C.Mpf;
          break;
        case "t_g":
          this.ExhibitionItemId = C.t_g.L8n;
          break;
        case "tI_":
          this.SummonCfgId = C.tI_.UKn;
          break;
        case "hPg":
          var d = C.hPg;
          if (d) {
            this.FurnitureId = d.lPg;
            this.FurnitureSlotId = d.T4d;
          }
      }
    }
  }
  GetPbEntityInitData() {
    return this.dXr;
  }
  GetPbModelConfig() {
    if (this.gXr && this.gXr.length !== 0) {
      this.ger ||= ModelManager_1.ModelManager.CreatureModel.GetEntityModel(this.gXr);
      return this.ger;
    }
  }
  UpdateRewardState(t) {
    if (t) {
      this.ZS1 = t.Np1;
      this.eM1 = MathUtils_1.MathUtils.LongToNumber(t.Vp1);
    }
  }
  GetLoading() {
    return this.Dne;
  }
  SetLoading(t) {
    this.Dne = t;
  }
  GetPreloadFinished() {
    return this.yXr;
  }
  SetPreloadFinished(t) {
    this.yXr = t;
  }
  GetEntityCommonTags() {
    return this.EntityCommonTags;
  }
  SetLivingStatus(t) {
    this.LivingStatus = t;
  }
  GetLivingStatus() {
    return this.LivingStatus;
  }
  SetEnterComponent(t) {
    this.IXr = t;
  }
  GetEntityEnterComponentState() {
    return this.IXr;
  }
  GetBaseInfo() {
    return this.EXr || (this.dXr ? (this.EXr = (0, IComponent_1.getComponent)(this.dXr.ComponentsData, "BaseInfoComponent"), this.EXr) : undefined);
  }
  GetEntityTidName() {
    return this.xm1 || this.GetBaseInfo()?.TidName;
  }
  GetEntitySecondName() {
    return this.Um1;
  }
  GetEntityFunctionIcon() {
    return this.Dm1;
  }
  GetMonsterComponent() {
    if (this.dXr) {
      return (0, IComponent_1.getComponent)(this.dXr.ComponentsData, "MonsterComponent");
    }
  }
  GetAttributeComponent() {
    if (this.dXr) {
      return (0, IComponent_1.getComponent)(this.dXr.ComponentsData, "AttributeComponent");
    }
  }
  GetVisionComponent() {
    if (this.dXr) {
      return (0, IComponent_1.getComponent)(this.dXr.ComponentsData, "VisionComponent");
    }
  }
  GetEntityOnlineInteractType() {
    if (this.GetPbEntityInitData()) {
      var t = this.GetBaseInfo()?.OnlineInteractType;
      if (t !== undefined) {
        return t;
      }
    }
    return 1;
  }
  GetEntityTimeScaleModifyStrategy() {
    if (this.GetPbEntityInitData()) {
      var t = this.GetBaseInfo()?.TimeScaleModifyStrategy;
      if (t !== undefined) {
        return t;
      }
    }
    return 0;
  }
  GetFightInterConfig() {
    return this.SXr || (this.dXr ? (this.SXr = (0, IComponent_1.getComponent)(this.dXr.ComponentsData, "FightInteractComponent"), this.SXr) : undefined);
  }
  GetModelComponent() {
    if (this.dXr) {
      return (0, IComponent_1.getComponent)(this.dXr.ComponentsData, "ModelComponent");
    }
  }
  RequestPosAbnormal() {
    this.mXr = true;
    var t = Protocol_1.Aki.Protocol.kes.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(this.Wpo);
    t.JWn = true;
    Net_1.Net.Call(27581, t, () => {});
  }
  IsRealMonster() {
    var t = this.fie === Protocol_1.Aki.Protocol.kks.Proto_Monster;
    var i = this.GetMonsterComponent() === undefined;
    var e = this.GetMonsterComponent()?.FightConfigId === 0;
    return t && !i && !e;
  }
  IsCharacterMonster() {
    var t;
    if (this.irl === undefined && (this.irl = false, this.IsAutoRole() || this.IsMonster() && (t = this.GetMonsterComponent()?.FightConfigId) && (t = MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(t)) && t.RoleMappingId > 0)) {
      this.irl = true;
    }
    return this.irl;
  }
  IsSummonByCharacterMonster() {
    var t;
    if (this.rrl === undefined && (this.rrl = false, this.IsMonster() && (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.GetSummonerId()))?.Valid && (t = t.Entity.GetComponent(0))?.Valid && t.IsCharacterMonster())) {
      this.rrl = true;
    }
    return this.rrl;
  }
  IsLowFrequencyUpdateStrategy() {
    return this.EXr?.EntityUpdateStrategy === 1;
  }
  IsHighFrequencyUpdateStrategy() {
    return this.EXr?.EntityUpdateStrategy === 2;
  }
  GetAwakedEntities() {
    if (!this.uXr) {
      this.uXr = [];
      if (this.dXr && this.dXr.Children && this.dXr.Children.length > 0) {
        this.dXr.Children.forEach(t => {
          if (this.BXr(t)) {
            this.uXr.push(this.bXr(t));
          }
        });
      }
    }
    return this.uXr;
  }
  bXr(t) {
    var i;
    if (CreatureDataComponent_1.qXr.has(t)) {
      return CreatureDataComponent_1.qXr.get(t);
    } else {
      i = t.split("_");
      i = parseInt(i[2]);
      CreatureDataComponent_1.qXr.set(t, i);
      return i;
    }
  }
  BXr(t) {
    return t.split("_")[0] === "e";
  }
  sQt(t) {
    for (const e of Object.keys(t)) {
      var i = t[e];
      this.xRn.set(e, i);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.EntityVarUpdate, e, i);
    }
  }
  UpdateVar(t, i) {
    this.xRn.set(t, i);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.EntityVarUpdate, t, i);
  }
  nTa() {
    this.CustomServerEntityIds.forEach(t => {
      CreatureGroupController_1.CreatureGroupController.AddBindEntity(t, this.Wpo);
    });
    for (const t of this.VisionServerEntityIds) {
      CreatureGroupController_1.CreatureGroupController.AddBindEntity(t, this.Wpo);
    }
    if (this.VisionControlCreatureDataId) {
      CreatureGroupController_1.CreatureGroupController.AddBindEntity(this.VisionControlCreatureDataId, this.Wpo);
    }
    if (this.JQr) {
      CreatureGroupController_1.CreatureGroupController.AddBindEntity(this.Wpo, this.JQr);
    }
    if (this.PbCombinePartInfoList) {
      this.PbCombinePartInfoList.forEach(t => {
        CreatureGroupController_1.CreatureGroupController.AddBindEntity(this.Wpo, MathUtils_1.MathUtils.LongToNumber(t.Tql));
      });
    }
  }
  GetTemplateId() {
    return this.d7a?.Id ?? 0;
  }
};
CreatureDataComponent.qXr = new Map();
CreatureDataComponent = CreatureDataComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(0)], CreatureDataComponent);
exports.CreatureDataComponent = CreatureDataComponent; //# sourceMappingURL=CreatureDataComponent.js.map