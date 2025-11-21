"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var n;
  var h = arguments.length;
  var r = h < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (n = t[o]) {
        r = (h < 3 ? n(r) : h > 3 ? n(i, e, r) : n(i, e)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(i, e, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnInteractNewComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const Global_1 = require("../../../Global");
const LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InteractionModel_1 = require("../../../Module/Interaction/InteractionModel");
const InteractConfirmController_1 = require("../../../Module/Interaction/SecondConfirm/InteractConfirmController");
const TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils");
const PlotController_1 = require("../../../Module/Plot/PlotController");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../../Ui/UiManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const PawnChairController_1 = require("../Controllers/PawnChairController");
const PawnInteractController_1 = require("../Controllers/PawnInteractController");
const PawnInteractBaseComponent_1 = require("./PawnInteractBaseComponent");
const MAX_WAIT_NPC_TURN_TIME = 2500;
const MAX_WAIT_PLAYER_STAND_TIME = 1000;
const AUTO_COLLECT_TAG = 487076426;
let PawnInteractNewComponent = class PawnInteractNewComponent extends PawnInteractBaseComponent_1.PawnInteractBaseComponent {
  constructor() {
    super(...arguments);
    this.can = true;
    this.man = false;
    this.dan = "Npc";
    this.Can = undefined;
    this.gan = undefined;
    this.fan = undefined;
    this.van = undefined;
    this.vzi = undefined;
    this.Man = undefined;
    this.fie = undefined;
    this.Qsn = undefined;
    this.Ean = false;
    this.San = false;
    this.yan = false;
    this.Ian = false;
    this.vir = Vector_1.Vector.Create();
    this.eOi = false;
    this.H4r = undefined;
    this.Tan = undefined;
    this.rzr = undefined;
    this.Lan = undefined;
    this.Dan = false;
    this.Ran = undefined;
    this.CanRestartAi = true;
    this.$Ua = false;
    this.Oc1 = undefined;
    this.eOu = (t, i, e, s, n, h) => {
      this.gan.SetOffsetOptionInteractRange(t, i, e, s, n, h);
    };
    this.xie = (t, i) => {
      this.Uan();
    };
    this.zYe = () => {
      this.vzi?.OnChangeModeFinish();
    };
    this.Jsn = () => {
      this.Aan();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 36, "进入感知范围，开启交互Tick", ["EntityId", this.Entity.Id]);
      }
      this.eOi = true;
    };
    this.vzr = () => {
      if (ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity === this.Entity.Id) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Interaction", 36, "离开交互锁定实体的感知范围时不关闭Tick");
        }
      } else {
        this.CloseInteract("离开感知范围");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Interaction", 36, "离开感知范围，关闭交互Tick", ["EntityId", this.Entity.Id]);
        }
        this.eOi = false;
      }
    };
    this.Pan = false;
    this.xan = () => {
      if (this.vzi && this.vzi.HasInteractOptions()) {
        this.Aan();
      } else {
        this.wan("没有可交互内容");
        this.Pan = true;
      }
    };
    this.Ban = undefined;
    this.ban = false;
    this.qan = false;
    this.Gan = false;
    this.Nan = false;
    this.Oan = undefined;
    this.B6a = undefined;
    this.kan = () => {
      if (this.Gan) {
        this.Gan = false;
        this.qan = true;
        this.Fan();
        this.Van();
      } else {
        this.b6a();
        ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning = false;
      }
    };
    this.Van = () => {
      var t = this.H4r.Entity;
      var i = MathUtils_1.MathUtils.CommonTempVector;
      this.Can.ActorLocationProxy.Subtraction(this.H4r.ActorLocationProxy, i);
      i.Normalize();
      this.H4r.SetInputFacing(i, true);
      t.GetComponent(62).SetActive(false);
      i = MathUtils_1.MathUtils.CommonTempVector;
      this.Can.ActorLocationProxy.Subtraction(this.H4r.ActorLocationProxy, i);
      t = i.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg;
      i = ((t = Math.abs(this.H4r.ActorRotationProxy.Yaw - t)) > 180 ? 360 - t : t) / 300 * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      this.qan = true;
      if (i > TimerSystem_1.MIN_TIME) {
        TimerSystem_1.TimerSystem.Delay(this.Han, i);
      } else {
        this.Han();
      }
    };
    this.Fan = () => {
      if (this.fie === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
        this.Nan = true;
        var t;
        var i = this.vzi.IsTurnAround;
        if (i) {
          t = this.Entity.GetComponent(191);
          if (this.vzi.IsWaitTurnComplete || this.jan) {
            if (t.OnPlayerInteractStart(i, true, this.Wan)) {
              this.Oan = TimerSystem_1.TimerSystem.Delay(this.Wan, MAX_WAIT_NPC_TURN_TIME);
            } else {
              this.Wan();
            }
          } else {
            t.OnPlayerInteractStart(i, false, undefined);
            this.Wan();
          }
        } else {
          this.Wan();
        }
      }
    };
    this.jan = false;
    this.Kan = false;
    this.Qan = () => {
      if (this.Kan && (this.Kan = false, ModelManager_1.ModelManager.PlotModel.IsInInteraction)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TriggerPlotInteraction, this.GetInteractController());
      }
    };
    this.Wan = () => {
      if (this.Nan) {
        this.Nan = false;
        if (!this.qan) {
          this.Xan();
        }
      }
    };
    this.Han = () => {
      this.b6a();
      this.qan = false;
      if (!this.Nan) {
        this.Xan();
      }
    };
    this.$an = () => {
      var t;
      if (this.jan && (this.qan || this.Nan || this.B6a)) {
        this.jan = false;
        ControllerHolder_1.ControllerHolder.PlotController.OpenPlotView("PlotView");
        t = this.GetInteractController().GetCameraOffsetConfig();
        CameraController_1.CameraController.EnterDialogueMode(this.GetInteractController().GetInteractPoint(), false, t?.CenterOffsetPercent, t?.OffsetZ);
      } else {
        this.jan = false;
      }
    };
    this.Yan = i => {
      if (this.ban) {
        this.vzi.RecordInteraction();
        ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(false, this.Entity.Id);
        ModelManager_1.ModelManager.InteractionModel.InteractingEntity = this.Entity.Id;
        if (this.Ran) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Interaction", 36, "[执行交互]自动触发交互", ["EntityId", this.Entity.Id]);
          }
          this.vzi.SecondConfirmHandle = TsInteractionUtils_1.TsInteractionUtils.HandleInteractionSecondConfirm(this.Ran, this.vzi, this.atm);
        } else {
          let t = undefined;
          t = i > -1 ? this.vzi.GetOptionByInstanceId(i) : this.vzi.GetInteractiveOption();
          i = this.vzi.Options;
          if ((t && this.Jan(t) || i.length === 1 && this.Jan(i[0]) || i.length !== 1) && ModelManager_1.ModelManager.PlotModel.IsInPlot && !ModelManager_1.ModelManager.PlotModel?.IsInHighLevelPlot()) {
            ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("交互前打断当前D级剧情", false);
            ControllerHolder_1.ControllerHolder.PlotController.CloseAllUi();
          }
          if (t?.DoIntactType === "Direct") {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Interaction", 36, "[执行交互]直接交互", ["EntityId", this.Entity.Id]);
            }
            this.vzi.SecondConfirmHandle = TsInteractionUtils_1.TsInteractionUtils.HandleInteractionSecondConfirm(t, this.vzi, this.atm);
          } else if (i.length !== 1 || i[0].TidContent) {
            this.vzi.HandlePreInterativeLogic();
            this.zan();
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Interaction", 36, "[执行交互]默认直接交互", ["EntityId", this.Entity.Id]);
            }
            this.vzi.SecondConfirmHandle = TsInteractionUtils_1.TsInteractionUtils.HandleInteractionSecondConfirm(i[0], this.vzi, this.atm);
          }
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Interaction", 36, "[执行交互]已经因为其他原因退出交互", ["EntityId", this.Entity.Id]);
        }
        this.Zan();
      }
    };
    this.Zan = () => {
      if (this.ban) {
        this.ban = false;
        InputDistributeController_1.InputDistributeController.RefreshInputTag();
        TimerSystem_1.TimerSystem.Next(() => {
          this.ehn();
        });
      }
      if (ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId === this.Entity.Id && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInteractActionEnd, this.fan.GetPbDataId()), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Interaction", 36, "交互行为结束", ["EntityId", this.Entity.Id]);
      }
    };
    this.thn = false;
    this.ihn = false;
    this.ohn = true;
    this.atm = (t, i, e) => {
      if (t === this.vzi.SecondConfirmHandle && InteractConfirmController_1.InteractConfirmController.CheckHandleValid(t) && i) {
        TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(e, this.vzi);
      } else {
        this.Zan();
      }
      this.vzi.SecondConfirmHandle = 0;
    };
  }
  get InteractRange() {
    return this.vzi?.InteractRange;
  }
  get OwenActor() {
    if (this.Can) {
      return this.Can.Owner;
    }
  }
  get CanInteraction() {
    return this.can && !this.man;
  }
  GetClientCanInteraction() {
    return this.can;
  }
  SetInteractionState(t, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "客户端设置是否可交互", ["CanInteraction", t], ["EntityId", this.Entity.Id], ["Reason", i]);
    }
    i = this.can !== t;
    this.can = t;
    if (ModelManager_1.ModelManager.InteractionModel) {
      this.ehn();
      if (ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId === this.Entity.Id && i) {
        InputDistributeController_1.InputDistributeController.RefreshInputTag();
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Interaction", 36, "[SetInteractionState]InteractionModel不存在", ["EntityId", this.Entity.Id]);
    }
  }
  SetServerLockInteract(t, i) {
    this.man = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "服务器设置是否可交互", ["CanInteraction", !t], ["CreatureId", this.fan?.GetCreatureDataId()], ["EntityId", this.Entity?.Id], ["PbDataId", this.fan?.GetPbDataId()], ["Reason", i]);
    }
    if (ModelManager_1.ModelManager.InteractionModel) {
      this.ehn();
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Interaction", 36, "[SetServerLockInteract]InteractionModel不存在", ["EntityId", this.Entity.Id]);
    }
  }
  OnStart() {
    this.gan = this.Entity.GetComponent(123);
    this.fan = this.Entity.GetComponent(0);
    this.rzr = this.Entity.GetComponent(125);
    var t = this.fan?.GetPbEntityInitData();
    if (t && GravityUtils_1.GravityUtils.IsEntityGravityLimitGravity(t)) {
      this.Oc1 = GravityUtils_1.GravityUtils.GetGravityDirectByEntityData(t);
    }
    this.Can = this.Entity.GetComponent(1);
    if (this.Can.Owner.IsA(UE.BP_BaseNPC_C.StaticClass())) {
      this.Lan = this.Can.Owner;
    }
    var t = this.Can.CreatureData;
    if (t.GetPbEntityInitData()) {
      this.fie = t.GetEntityType();
      this.Qsn = t.GetEntityOnlineInteractType();
      this.vzi = new PawnInteractController_1.PawnInteractController(this);
      this.vzi.OnInteractActionEnd = this.Zan;
      this.vzi.OnInteractionUpdate = this.xan;
      this.gan.SetInteractRange(this.vzi.InteractRange, this.vzi.InteractExitRange, this.vzi.LocationOffset);
      this.vir.FromUeVector(this.Can.ActorForwardProxy);
      this.rhn(t);
      this.Uan();
      this.tOu();
      this.Ore();
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 7, "[PawnInteractComponent.OnStart] 交互组件初始化", ["CreatureGenID:", t.GetOwnerId()], ["PbDataId:", t.GetPbDataId()], ["InitInteractionRange:", this.InteractRange]);
      }
      return false;
    }
  }
  rhn(t) {
    var i = t.GetPbModelConfig();
    if (i?.EntityType) {
      this.dan = i.EntityType;
    }
    if (this.dan === "Chair") {
      this.Man = new PawnChairController_1.PawnChairController(t);
    }
    this.$Ua = t.GetBaseInfo()?.Category?.CollectType === "Botany";
  }
  tOu() {
    this.vzi?.InitOptionWithOffset(this.eOu);
  }
  GetSubEntityInteractLogicController() {
    var t = this.Entity.GetComponent(0).GetPbModelConfig();
    if (t?.EntityType) {
      this.dan = t.EntityType;
    }
    if (this.dan === "Chair") {
      return this.Man;
    }
  }
  IsCollection() {
    return this.dan === "Collect";
  }
  IsAnimationItem() {
    return this.dan === "Animal";
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartFlow, this.$an);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotInteractViewOpen, this.Qan);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.EnterLogicRange, this.Jsn);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractPlotEnd, this.Zan);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartFlow, this.$an);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotInteractViewOpen, this.Qan);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.EnterLogicRange, this.Jsn);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractPlotEnd, this.Zan);
  }
  AfterUnlockInteractionEntity() {
    if (!this.rzr?.IsInLogicRange && this.eOi) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Interaction", 36, "离开交互锁定状态时，不在感知范围内");
      }
      this.vzr();
    }
  }
  OnDisable() {
    this.CloseInteract("OnDisable");
  }
  OnEnd() {
    if (this.Gan || this.qan || this.Nan) {
      ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning = false;
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
    this.b6a();
    if (ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity === this.Entity.Id) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 36, "当交互锁定的实体销毁时，提前解锁", ["EntityId", this.Entity.Id]);
      }
      ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity = undefined;
    }
    if (ModelManager_1.ModelManager.InteractionModel.InteractingEntity === this.Entity.Id) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Interaction", 36, "当前实体交互中销毁", ["EntityId", this.Entity.Id]);
      }
      ModelManager_1.ModelManager.InteractionModel.InteractingEntity = undefined;
    }
    this.can = true;
    this.kre();
    this.CloseInteract("OnEnd");
    this.vzi?.Dispose();
    this.vzi = undefined;
    this.Man?.Dispose();
    return !(this.Man = undefined);
  }
  Uan() {
    if (Global_1.Global.BaseCharacter) {
      this.H4r = Global_1.Global.BaseCharacter.CharacterActorComponent;
      this.van = this.H4r.Entity.GetComponent(29);
      if (this.B6a) {
        this.Gan = false;
        this.Han();
      }
      this.Tan = this.van.Entity.GetComponent(209);
      this.Dan = this.H4r.CreatureData.GetPlayerId() === ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
    }
  }
  nhn() {
    if (this.IsMatchRoleOption()) {
      if (this.ahn()) {
        if (this.hhn()) {
          if (this.lhn()) {
            this.shn("[默认前置交互条件]自身被锁定");
            return false;
          } else if (this.IsInPlayerInteractiveRange()) {
            if (this.IsMatchRoleGravityDirect()) {
              if (this.HasLimitSitTag()) {
                return !!this.Can && !this.Can.HasMesh() || this.fie !== Protocol_1.Aki.Protocol.kks.Proto_Npc && !!this.San || !this._hn || !(this.shn("[默认前置交互条件]NPC处于被控状态 " + this.ban), 1);
              } else {
                this.shn("[默认前置交互条件]含有不允许坐下Tag");
                return false;
              }
            } else {
              this.shn("[默认前置交互条件]重力方向不匹配");
              return false;
            }
          } else {
            this.shn("[默认前置交互条件]不在交互范围中");
            return false;
          }
        } else {
          this.shn("[默认前置交互条件]自身状态异常");
          return false;
        }
      } else {
        this.shn("[默认前置交互条件]角色状态异常");
        return false;
      }
    } else {
      this.shn("[默认前置交互条件]角色类型判断");
      return false;
    }
  }
  ahn() {
    return !!this.Tan && !(this.Tan.HasTag(1008164187) ? (this.shn("[默认前置交互条件]角色状态异常_濒死"), 1) : this.Tan.HasTag(191377386) ? (this.shn("[默认前置交互条件]角色状态异常_溺水"), 1) : this.Tan.HasTag(1733479717) ? (this.shn("[默认前置交互条件]角色状态异常_大招"), 1) : this.Tan.HasTag(-1266260958) ? (this.shn("[默认前置交互条件]角色状态异常_退出载具中"), 1) : this.vzi.IsPlayerTurnAround && (!this.Tan.HasTag(-1898186757) || this.Tan.HasTag(-1371021686) && !this.Tan.HasTag(-1800191060)) ? (this.shn("[默认前置交互条件]角色状态异常_转身"), 1) : this.Tan.HasTag(2099884761) ? (this.shn("[默认前置交互条件]角色状态异常_禁止交互"), 1) : this.Tan.HasTag(-1462942050) && (this.shn("[默认前置交互条件]角色状态异常_幻象变身中"), 1));
  }
  hhn() {
    var t = this.Entity.GetComponent(137);
    if (t?.Valid) {
      return t.IsInteractState;
    }
    if (this.fie === Protocol_1.Aki.Protocol.kks.Proto_Animal || this.fie === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
      t = this.Entity.GetComponent(209);
      if (t?.Valid && t.HasTag(1008164187)) {
        return false;
      }
    } else if (this.fie === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
      t = this.Entity.GetComponent(191)?.GetCurrentState();
      if (t === 0 || t === 9) {
        return false;
      }
    } else if (this.fie === Protocol_1.Aki.Protocol.kks.HI_) {
      t = this.Entity.GetComponent(209);
      if (t?.Valid && t.HasTag(786205849)) {
        return false;
      }
    }
    return true;
  }
  lhn() {
    var t = this.Entity.GetComponent(134);
    return !!t?.Valid && t.IsLocked;
  }
  chn() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return true;
    }
    if (this.Ban === undefined) {
      var t = this.fan.GetPbDataId();
      if (t === 14000056 || t === 2000026) {
        return true;
      }
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId, t);
      if (t && t?.Type === "LevelPlay") {
        this.Ban = t.LevelPlayId;
      } else {
        this.Ban = -1;
      }
    }
    if (this.Ban > -1) {
      let t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(this.Ban);
      if (!(t = t || ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()) || !t.IsBelongPlayer) {
        return false;
      }
    }
    return this.Qsn !== 2 && (this.Qsn !== 0 || !!this.H4r && !!this.Dan) || (LevelGamePlayController_1.LevelGamePlayController.ShowFakeErrorCodeTips(), false);
  }
  IsPawnInteractive() {
    return !!this.CanInteraction && !!this.hhn() && !this._hn && !!this.vzi.GetInteractiveOption();
  }
  mhn() {
    var t;
    var i;
    var e;
    if (this.CanInteraction) {
      if (this.ban) {
        this.shn("IsExecutingInteract is true");
        return false;
      } else if (t = this.vzi.GetInteractiveOption()) {
        i = this.thn;
        e = t?.CustomOptionType;
        this.thn = e === 1 || e === 3;
        if (i !== this.thn && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExecutionOptionChange, this.thn, this.Entity.Id, e), !this.ihn) && this.thn) {
          this.ihn = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, true, this.Entity.Id, e);
        }
        if (t !== this.vzi.CurrentInteractOption) {
          this.ApplyInteractConfig(t);
        }
        return true;
      } else {
        this.shn("没有找到可以交互的选项");
        return false;
      }
    } else {
      this.shn("CanInteraction is false");
      return false;
    }
  }
  InteractPawn(t = -1, i) {
    var e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "[执行交互]调用执行交互", ["EntityId", this.Entity.Id]);
    }
    if (ModelManager_1.ModelManager.InteractionModel) {
      if (this.Ean) {
        if (ControllerHolder_1.ControllerHolder.PlotController.IsEnableInteract()) {
          if (ModelManager_1.ModelManager.InteractionModel.IsHideInteractHint) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Interaction", 36, "[执行交互]全局隐藏交互开启", ["EntityId", this.Entity.Id]);
            }
            return false;
          } else {
            return !!this.Can && (ModelManager_1.ModelManager.InteractionModel?.CanAutoPickUp(this.Entity) || (e = this.H4r?.Entity.GetComponent(62)) && e.InterruptAutoMoving("交互打断"), !TsInteractionUtils_1.TsInteractionUtils.CheckTeleportInterceptByOption(t, this.vzi)) && (this.dhn(t, i), true);
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Interaction", 36, "[执行交互]剧情状态不允许交互", ["EntityId", this.Entity.Id]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Interaction", 36, "[执行交互]当前不可交互", ["EntityId", this.Entity.Id]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Interaction", 36, "[执行交互]InteractionModel不存在", ["EntityId", this.Entity.Id]);
      }
      return false;
    }
  }
  InteractOption(t = 0) {
    return !!ModelManager_1.ModelManager.PlotModel.IsInInteraction && ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity?.Id === this.Entity?.Id && !!this.GetInteractController() && (this.GetInteractController().InteractOption(t), true);
  }
  CloseInteract(t = undefined) {
    this.wan(t);
  }
  ApplyInteractConfig(t) {
    if (t) {
      this.vzi.ChangeInteractOption(t);
    }
  }
  GetIsExecutingInteract() {
    return this.ban;
  }
  b6a() {
    if (this.B6a) {
      if (this.B6a.Entity) {
        this.B6a.Entity.GetComponent(62)?.SetActive(true);
        this.B6a.ForceExitStateStop = false;
        this.B6a.CanMoveFromInput = true;
      }
      this.B6a = undefined;
    }
  }
  dhn(t = -1, i) {
    if (ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity !== this.Entity.Id) {
      if (t > 0 && t <= this.vzi.Options.length) {
        var e = this.vzi.Options[t - 1];
        if (!e.ConditionCheck) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Interaction", 36, "执行交互时条件不满足", ["EntityId", this.Entity.Id]);
          }
          if (e.LockTips?.TidHintText) {
            e = new StringBuilder_1.StringBuilder(InteractionModel_1.LOCK_TEXTURE_PREFIX, PublicUtil_1.PublicUtil.GetConfigTextByKey(e.LockTips.TidHintText));
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(e.ToString());
          }
          return;
        }
      }
      if (!this.Ean) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Interaction", 36, "执行交互时不可交互", ["EntityId", this.Entity.Id]);
        }
        return;
      }
      if (!this.nhn() || !this.chn()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Interaction", 36, "执行交互时不满足条件", ["EntityId", this.Entity.Id]);
        }
        return;
      }
    }
    this.Ran = i;
    this.ban = true;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "执行交互", ["EntityId", this.Entity.Id]);
    }
    e = ModelManager_1.ModelManager.InteractionModel;
    e.SetInteractTarget(this.Entity.Id);
    i = this.fan.GetCreatureDataId();
    e.SetInterctCreatureDataId(i);
    ModelManager_1.ModelManager.ShopModel.InteractTarget = this.Entity.Id;
    const s = this.H4r.Entity;
    i = s.GetComponent(209);
    if (this.vzi.IsPlayerTurnAround && i?.HasTag(-1898186757)) {
      this.H4r.ClearInput();
      e.IsInteractionTurning = true;
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      this.Gan = true;
      const s = this.H4r.Entity;
      i = s.GetComponent(181);
      if (i) {
        i.MontageManager.StopMontage({
          Method: 0,
          BlendOutTime: 0
        });
        i.MainAnimInstance.Montage_Stop(0);
        i.ConsumeRootMotion();
      }
      EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, 1);
      this.b6a();
      e = s.GetComponent(45);
      if (e) {
        (this.B6a = e).ForceExitStateStop = true;
        e.CanMoveFromInput = false;
      }
      this.H4r.SetActorVelocity(Vector_1.Vector.ZeroVectorProxy);
      TimerSystem_1.TimerSystem.Delay(this.kan, MAX_WAIT_PLAYER_STAND_TIME);
    } else {
      this.qan = true;
      this.Fan();
      this.Han();
    }
    this.CanRestartAi = false;
    if (this.fie === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
      this.Chn(t);
    }
    this.Yan(t);
    this.XUa();
  }
  Xan() {
    ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning = false;
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    if (ModelManager_1.ModelManager.PlotModel.IsInInteraction) {
      if (UiManager_1.UiManager.IsViewShow("PlotView")) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TriggerPlotInteraction, this.GetInteractController());
      } else {
        this.Kan = true;
      }
    }
    this.jan = false;
    if (this.Oan) {
      TimerSystem_1.TimerSystem.Remove(this.Oan);
      this.Oan = undefined;
    }
  }
  Chn(i) {
    this.jan = false;
    if (!this.Ran) {
      let t = undefined;
      if ((t = i > -1 ? this.vzi.GetOptionByInstanceId(i) : this.vzi.GetInteractiveOption())?.DoIntactType === "Direct") {
        this.jan = this.ghn(t);
      } else if ((i = this.vzi.Options).length === 1 && !i[0].TidContent) {
        this.jan = this.ghn(i[0]);
      }
    }
  }
  IsOnlyCollectOption() {
    let t = this.vzi.GetInteractiveOption();
    if ((t = (t = (t = t?.DoIntactType !== "Direct" ? undefined : t) || (i = this.vzi.Options).length !== 1 || i[0].TidContent ? t : i[0]) || this.vzi.GetOptionByInstanceId(0)) && t.OptionType === 0) {
      var i = t.Type;
      if (i && i.Actions && i.Actions.length === 1) {
        if (i.Actions[0].Name === "Collect") {
          return true;
        }
      }
    }
    return false;
  }
  ExecuteInteractFromVision(i) {
    if (this.CanInteraction) {
      let t = this.vzi.GetInteractiveOption();
      var e;
      if (t?.DoIntactType === "Direct") {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Interaction", 36, "[执行交互]幻象直接交互", ["EntityId", this.Entity.Id]);
        }
        TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(t, this.vzi, i);
      } else {
        if ((e = this.vzi.Options).length === 1 && !e[0].TidContent) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Interaction", 36, "[执行交互]幻象默认直接交互", ["EntityId", this.Entity.Id]);
          }
          TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(e[0], this.vzi, i);
        }
        if ((t = t || this.vzi.GetOptionByInstanceId(0))?.DoIntactType === "Direct") {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Interaction", 36, "[执行交互]保底幻象直接交互", ["EntityId", this.Entity.Id]);
          }
          TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(t, this.vzi, i);
        }
      }
    }
  }
  Jan(t) {
    t = t.Type;
    return !!t && !!t.Flow;
  }
  ghn(t) {
    t = t.Type;
    if (!t || !t.Flow) {
      return false;
    }
    t = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(t.Flow.FlowListName, t.Flow.FlowId, t.Flow.StateId);
    if (t && t.length > 0) {
      t = t[0];
      if (t.Name === "SetPlotMode") {
        t = t.Params;
        if (t.Mode !== "LevelC" || t.UseFlowCamera === false) {
          return false;
        }
      }
    }
    return true;
  }
  SimpleInteract() {
    var t = this.vzi.GetOptionByInstanceId(0);
    TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(t, this.vzi);
  }
  ehn() {
    if (this.CanInteraction && (this.fie !== Protocol_1.Aki.Protocol.kks.Proto_Npc || !this.GetInteractController()?.IsTurnRecoveryImmediately && this.yan || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Interaction", 36, "交互结束立即转回", ["EntityId", this.Entity.Id]), this.Entity.GetComponent(191)?.OnPlayerInteractEnd()), ModelManager_1.ModelManager.InteractionModel.InteractingEntity === this.Entity.Id)) {
      ModelManager_1.ModelManager.InteractionModel.InteractingEntity = undefined;
    }
  }
  fhn() {
    if (!this.Ean) {
      return false;
    }
    if (!this.Can) {
      return false;
    }
    if (this._hn) {
      return false;
    }
    this.San = true;
    var i = this.vzi.GetAutoTriggerOption();
    if (i ?? this.YUa()) {
      if (!this.gan.IsInInteractRange) {
        return false;
      }
      this.InteractPawn(-1, i);
    } else {
      let t = this.IsInSectorRange();
      t = t && !this.van.GetSitDownState();
      i = this.vzi.GetInteractiveOption()?.CustomOptionType;
      if (i === 1 || i === 3) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, true, this.Entity.Id, i);
        this.ihn = true;
      }
      t = t && this.vzi.UpdateDirectOptions(this.Entity.DistanceWithCamera, false, this.gan.IsInInteractRange);
      ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(t, this.Entity.Id, this.vzi.InteractEntity);
    }
    return true;
  }
  wan(t) {
    if (ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId === this.Entity.Id) {
      ModelManager_1.ModelManager.InteractionModel.SetInteractTarget(undefined);
    }
    if (this.Can && (this.Ean = false, this.ban && (this.ban = false, InputDistributeController_1.InputDistributeController.RefreshInputTag()), t && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Interaction", 36, "结束交互", ["EntityId", this.Entity.Id], ["原因", t]), this.vzi.ClearDirectOptions(), ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(false, this.Entity.Id), PlotController_1.PlotController.EndInteractionByInteractController(this.GetInteractController()), this.CanRestartAi = true, this.thn)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, false, this.Entity.Id, undefined);
      this.ihn = false;
      this.thn = false;
    }
  }
  ForceUpdate() {
    this.Sbo();
    this.Aan();
  }
  shn(t) {
    if ((this.ohn || ModelManager_1.ModelManager.LevelGeneralModel.InteractionDebug) && (this.ohn = false, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Interaction", 36, "Update提前返回", ["reason", t], ["entity", this.fan?.GetPbDataId()]);
    }
  }
  OnTick(t) {
    if (this.eOi) {
      if (this.Gan && this.Tan?.HasTag(248240472)) {
        this.kan();
      }
      this.Aan();
    }
  }
  Aan() {
    if (ModelManager_1.ModelManager.InteractionModel.IsHideInteractHint) {
      this.shn("全局隐藏交互开启");
    } else if (ModelManager_1.ModelManager.PlotModel.IsInInteraction && UiManager_1.UiManager.IsViewShow("PlotView")) {
      this.shn("交互二级界面已打开");
    } else if (this.fan?.IsConcealed) {
      this.shn("实体隐藏将不可交互");
    } else if (PlotController_1.PlotController.IsEnableInteract()) {
      if (this.rzr) {
        if (!this.H4r) {
          this.Uan();
        }
        if (this.gan) {
          if (this.Pan || this.vzi && this.vzi.HasInteractOptions()) {
            if (this.ban) {
              this.shn("当前正在执行交互");
            } else {
              var t = ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity === this.Entity.Id;
              if (this.gan.IsInInteractRange || t || this.gan.InAnyOptionWithOffsetRange) {
                if (!this.nhn() && !t) {
                  if (!this.Ian && this.yan) {
                    this.Ian = true;
                    this.wan("不满足默认前置交互条件");
                  }
                  return;
                }
                if (!this.yan || !!this.Ian) {
                  this.yan = true;
                  this.San = false;
                  this.Ean = this.mhn();
                  if (ModelManager_1.ModelManager.LevelGeneralModel.InteractionDebug && Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("Interaction", 7, "[PawnInteractComponent.UpdateInteractComponent] 交互组件更新：初次进入交互范围", ["IsInteractable:", this.Ean], ["InteractionRange:", this.InteractRange]);
                  }
                  this.fhn();
                }
                this.Ian = false;
                if (this.yan && (this.Ean = this.mhn(), this.phn(t), !this.Ean) && this.thn) {
                  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, false, this.Entity.Id, undefined);
                  this.ihn = false;
                  this.thn = false;
                }
                if (this.Ean) {
                  this.ohn = true;
                }
              } else {
                this.ohn = true;
                if (this.yan && (this.yan = false, this.wan("离开交互范围"), this.fie === Protocol_1.Aki.Protocol.kks.Proto_Npc) && this.CanInteraction) {
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("Interaction", 36, "退出交互范围转身", ["EntityId", this.Entity.Id]);
                  }
                  this.Entity.GetComponent(191)?.OnPlayerInteractEnd();
                }
                this.Zan();
              }
              if (this.Pan && !this.gan.IsInInteractRange) {
                this.Pan = false;
              }
            }
          } else {
            this.shn("当前没有可交互的内容");
          }
        } else {
          this.shn("感知组件为空");
        }
      } else {
        this.shn("感知信息组件为空");
      }
    } else {
      this.shn("剧情控制器不允许交互");
    }
  }
  phn(i) {
    if (this.Can) {
      if (this.Can.Entity?.IsInit) {
        if (this._hn) {
          this.shn("NPC处于被控状态");
        } else if (this.Ean) {
          var t = this.vzi.GetAutoTriggerOption();
          if (t ?? this.YUa()) {
            this.vzi.UpdateDirectOptions(this.Entity.DistanceWithCamera, true, this.gan.IsInInteractRange);
            if (this.gan.IsInInteractRange) {
              this.InteractPawn(-1, t);
            }
          } else if (this.vzi.GetInteractiveOption()?.DoIntactType !== "Auto") {
            let t = this.IsInSectorRange();
            t = t && !this.van.GetSitDownState() && this.vzi.UpdateDirectOptions(this.Entity.DistanceWithCamera, true, this.gan.IsInInteractRange || i);
            ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(t, this.Entity.Id, this.vzi.InteractEntity);
          }
        } else {
          ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(false, this.Entity.Id);
        }
      } else {
        this.shn("OwnerActor 未初始化");
      }
    } else {
      this.shn("OwnerActor 为空");
    }
  }
  IsInSectorRange() {
    return this.vzi.IsInSectorRange();
  }
  IsInPlayerInteractiveRange() {
    return this.vzi.IsInPlayerInteractiveRange();
  }
  IsMatchRoleGravityDirect() {
    return !this.Oc1 || !this.H4r?.MoveComp || (this.H4r.MoveComp.IsStandardGravity ? this.Oc1.Equals(Vector_1.Vector.DownVectorProxy) : this.Oc1.Equals(this.H4r.ActorGravityDirectProxy));
  }
  HasLimitSitTag() {
    var t = this.vzi.GetInteractiveOption();
    if (t && t.DoIntactType === "Direct" && this.Tan?.HasTag(1453459227) && !StringUtils_1.StringUtils.IsEmpty(t.TidContent) && !t.Disabled && t.OptionType === 0) {
      t = t.Type;
      if (!t.Actions) {
        return true;
      }
      for (const e of t.Actions) {
        if (e.Name === "LeisureInteract") {
          var i = e.Params;
          if (i && i.Option.Type === IAction_1.ELeisureInteract.SitDown || i.Option.Type === IAction_1.ELeisureInteract.SitOnGround) {
            return false;
          }
        }
      }
    }
    return true;
  }
  HasSitDownAction() {
    var t = this.vzi.GetInteractiveOption();
    if (t && t.DoIntactType === "Direct" && !StringUtils_1.StringUtils.IsEmpty(t.TidContent) && !t.Disabled && t.OptionType === 0) {
      t = t.Type;
      if (!t.Actions) {
        return false;
      }
      for (const e of t.Actions) {
        if (e.Name === "LeisureInteract") {
          var i = e.Params;
          if (i && i.Option.Type === IAction_1.ELeisureInteract.SitDown || i.Option.Type === IAction_1.ELeisureInteract.SitOnGround) {
            return true;
          }
        }
      }
    }
    return false;
  }
  IsMatchRoleOption() {
    return this.vzi.IsMatchRoleOption();
  }
  GetInteractPoint() {
    return this.vzi?.GetInteractPoint();
  }
  Sbo() {
    this.Ean = false;
    this.San = false;
  }
  zan() {
    if (PlotController_1.PlotController.TriggerInteraction(!this.qan && !this.Gan)) {
      ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(false, this.Entity.Id);
    } else {
      this.Zan();
    }
  }
  UpdateInteractRange() {
    if (this.vzi && this.gan) {
      this.gan.SetInteractRange(this.vzi.InteractRange, this.vzi.InteractExitRange, this.vzi.LocationOffset);
    }
  }
  get _hn() {
    return !!this.Lan && !this.ban && (this.Lan.IsBeingImpacted || this.Lan.IsBeingAttacked);
  }
  GetInteractController() {
    return this.vzi;
  }
  get DebugTimerRunning() {
    return this.eOi;
  }
  get DebugInteractOpened() {
    return this.CanInteraction;
  }
  YUa() {
    return !!this.$Ua && (this.Tan?.HasTag(AUTO_COLLECT_TAG) ?? false);
  }
  XUa() {
    var t;
    var i;
    if (this.YUa()) {
      if ((t = this.van?.Entity.GetComponent(17))?.Valid && this.OwenActor?.IsValid()) {
        (i = new UE.GameplayEventData()).Target = this.OwenActor;
        t.SendGameplayEventToActor(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(AUTO_COLLECT_TAG), i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 7, "自动采集错误", ["EntityID", this.Entity.Id]);
      }
    }
  }
};
PawnInteractNewComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(201)], PawnInteractNewComponent);
exports.PawnInteractNewComponent = PawnInteractNewComponent; //# sourceMappingURL=PawnInteractNewComponent.js.map