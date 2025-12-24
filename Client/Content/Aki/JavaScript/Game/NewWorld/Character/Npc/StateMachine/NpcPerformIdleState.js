"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformIdleState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const AiAlertById_1 = require("../../../../../Core/Define/ConfigQuery/AiAlertById");
const AiSenseById_1 = require("../../../../../Core/Define/ConfigQuery/AiSenseById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const CharacterActorComponent_1 = require("../../Common/Component/CharacterActorComponent");
const NpcWaitEntityTaskController_1 = require("../Logics/NpcWaitEntityTaskController");
const NpcPerformBaseState_1 = require("./NpcPerformBaseState");
const IDLE_MONTAGE_CD_MIN = 2;
const IDLE_MONTAGE_CD_MAX = 4;
const INITIAL_IDLE_MONTAGE_CD_MIN = 0;
const INITIAL_IDLE_MONTAGE_CD_MAX = 10;
const IMMEDIATE_PLAY_PROBABILITY = 0.1;
const ALERT_TURN_SPEED = 20000;
class NpcStandbyShowInfo {
  constructor(i) {
    this.MontagePath = undefined;
    this.ExpressionId = undefined;
    this.State = undefined;
    this.IsLoop = false;
    this.Time = 0;
    this.MontagePath = i.Montage;
    if (!this.MontagePath && i.RegisteredMontageId) {
      let t = undefined;
      var e = i.RegisteredMontageId;
      t = e.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(e.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(e.MontageId);
      this.MontagePath = t?.ActionMontage;
      this.State = {
        InitStateName: t?.InitState,
        EndStateName: t?.EndState
      };
    }
    this.ExpressionId = i.FaceExpressionId;
    this.IsLoop = !!i;
    this.Time = i.Time ?? 0;
  }
}
class NpcPerformIdleState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments);
    this.ker = false;
    this.Fer = -0;
    this.Ver = -0;
    this.Her = -0;
    this.jer = -0;
    this.Xaa = false;
    this.Wer = false;
    this.Ker = false;
    this.Rga = undefined;
    this.Qer = undefined;
    this.Xer = undefined;
    this.Jer = undefined;
    this.zer = IComponent_1.ENpcStandbyShowFinitelyPlayMode.Randomly;
    this.Zer = 0;
    this.etr = false;
    this.ttr = false;
    this.itr = false;
    this.rtr = undefined;
    this.ntr = undefined;
    this.atr = false;
    this._Ll = undefined;
    this.gqn = undefined;
    this._tr = (t, i) => {
      this.ker = true;
      this.Xaa = false;
      this.Wer = false;
      this.Qer = undefined;
      this.Xer = undefined;
      this.etr = false;
      this.utr();
      this.Owner.Entity.GetComponent(197).AnyIdleLoopMontagePlaying = false;
    };
    this.ctr = false;
    this.mtr = false;
    this.dtr = false;
    this.Ctr = undefined;
    this.ftr = () => {
      this.StateMachine.Switch(2);
    };
    this.ptr = () => {
      var t;
      var i;
      this.vtr();
      this.Owner.Entity.GetComponent(197)?.PauseAi("StalkAlert");
      this.dtr = true;
      if (Global_1.Global.BaseCharacter) {
        t = Global_1.Global.BaseCharacter.CharacterActorComponent;
        i = this.Owner.Entity.GetComponent(3);
        AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(i, t.ActorLocationProxy, ALERT_TURN_SPEED);
      }
    };
    this.Oer = () => {
      this.vtr();
      this.Owner.Entity.GetComponent(197)?.ResumeAi("StalkAlert");
      this.dtr = false;
    };
    this.xei = () => {
      this.vtr();
      this.Owner.Entity?.GetComponent(197)?.ResumeAi("LeaveLogicRange");
      this.dtr = false;
    };
    this.Mtr = () => {
      this.Owner.Entity?.GetComponent(197)?.PauseAi("LeaveLogicRange");
      this.dtr = true;
    };
  }
  get NpcMoveComp() {
    return this.gqn;
  }
  set NpcMoveComp(t) {
    this.gqn = t;
  }
  CanChangeFrom(t) {
    return t !== 9;
  }
  OnCreate(t) {
    super.OnCreate(t);
    if (t?.ShowOnStandby) {
      if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Loop) {
        this.Ker = true;
        this.Rga = new NpcStandbyShowInfo(t.ShowOnStandby);
        if (t.ShowOnStandby?.IgnoreEntityCollision?.EntityIds) {
          this._Ll = new NpcWaitEntityTaskController_1.NpcWaitEntityTaskController(this.Owner.Entity);
          this._Ll.AddTask(t.ShowOnStandby?.IgnoreEntityCollision?.EntityIds, 0);
        }
      } else if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Sit) {
        this.Ker = true;
        this.Rga = new NpcStandbyShowInfo(t.ShowOnStandby);
        this.rtr = t.ShowOnStandby.PosEntityId;
      } else if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Finite) {
        this.Jer = new Array();
        for (const i of t.ShowOnStandby.Montages) {
          this.Jer.push(new NpcStandbyShowInfo(i));
        }
        this.zer = t.ShowOnStandby.PlayMode;
        t = Math.random();
        this.ttr = t < IMMEDIATE_PLAY_PROBABILITY;
      }
    } else {
      this.itr = true;
    }
  }
  StartFromBornState() {
    this.Etr();
    this.Ore();
    if (!this.itr && !(this._Ll?.RunTask(), this.Owner.Entity.GetComponent(197)?.IsInPlot) && !this.dtr && !this.gqn?.IsMoving) {
      if (this.Ker) {
        this.Itr(true);
      } else {
        this.Fer = this.ttr ? 0 : MathUtils_1.MathUtils.GetRandomRange(INITIAL_IDLE_MONTAGE_CD_MIN, INITIAL_IDLE_MONTAGE_CD_MAX);
        this.Ver = Time_1.Time.WorldTimeSeconds;
      }
    }
  }
  OnEnter(t) {
    if (t === 0) {
      this.StartFromBornState();
    } else {
      (t = this.Owner.Entity.GetComponent(197))?.ResumeAi("NpcPerformIdleState");
      this.Ore();
      if (!this.itr && !(this.ker = true, this.utr(), t?.IsInPlot) && !this.dtr && !this.InteractRequestWaiting) {
        if (this.gqn?.IsMoving) {
          this.vtr();
        } else if (this.Ker) {
          this.Itr();
        }
      }
    }
  }
  Ttr() {
    return Time_1.Time.WorldTimeSeconds > this.Her + this.jer;
  }
  OnUpdate(t) {
    if (!this.itr && !(this.XWa(), this.Owner.Entity.GetComponent(197)?.IsInPlot) && !this.dtr && !this.InteractRequestWaiting) {
      if (this.gqn?.IsMoving || this.Ker && this.Xer && this.Xer !== this.Rga.MontagePath) {
        this.vtr();
      } else if (!this.Xaa && !this.Wer) {
        if (this.ker) {
          if (this.Ttr()) {
            this.Itr();
          }
        } else if (this.ttr || Time_1.Time.WorldTimeSeconds > this.Ver + this.Fer) {
          this.Itr(this.ttr);
        }
      }
    }
  }
  OnExit(t) {
    if (t !== 9) {
      this.vtr();
    }
    this.kre();
    this.Owner.Entity.GetComponent(197)?.PauseAi("NpcPerformIdleState");
  }
  OnDestroy() {
    this.YWa();
    this._Ll?.Dispose();
    this._Ll = undefined;
    this.gqn = undefined;
    this.kre();
  }
  XWa() {
    var t;
    var i;
    var e;
    var s;
    var h;
    if (this.rtr && !this.atr && (this.ntr = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.rtr), this.ntr) && (s = this.ntr.Entity.GetComponent(207)?.GetSubEntityInteractLogicController()) && s.IsSceneInteractionLoadCompleted() && (this.atr = true, t = this.Owner.Entity, s.Possess(t), s.IgnoreCollision(), i = (t = t.GetComponent(2)).CreatureData.GetPbDataId(), e = s.GetSitLocation(), s = s.GetForwardDirection(), h = Rotator_1.Rotator.Create(), s.ToOrientationRotator(h), t.SetActorLocationAndRotation(e.ToUeVector(), h.ToUeRotator(), "Npc椅子交互位置修正", false), t instanceof CharacterActorComponent_1.CharacterActorComponent && t.SetInputRotator(h), this.TurnActionController?.UpdateDefaultDirect(s), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("AI", 50, "[HandleLeisureInteract] 修正坐下位置和朝向", ["Location", e], ["Rotation", h], ["chairPbDataId", this.rtr], ["npcPbDataId", i]);
    }
  }
  YWa() {
    var t;
    if (this.rtr && (this.ntr = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.rtr), this.ntr) && (t = this.ntr.Entity.GetComponent(207)?.GetSubEntityInteractLogicController()) && t.IsSceneInteractionLoadCompleted()) {
      t.UnPossess(this.Owner.Entity);
      t.ResetCollision();
    }
  }
  Itr(r = false) {
    if (!this.Xaa && !this.Wer) {
      const n = this.Owner.Entity.GetComponent(197);
      const o = this.Ker ? this.Rga : this.Rtr();
      if (o && o.MontagePath && o.MontagePath !== "" && o.MontagePath !== "Empty") {
        var t = o.MontagePath;
        const a = o.ExpressionId;
        this.Xaa = true;
        if (this.Rga) {
          n.AnyIdleLoopMontagePlaying = true;
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, (t, i) => {
          var e;
          var s;
          var h;
          if (this?.Owner?.Valid) {
            if (!t?.IsValid() || n?.GetCurrentState() !== 1) {
              this.Xaa = false;
              n.AnyIdleLoopMontagePlaying = false;
            } else {
              s = t.SequenceLength;
              e = r ? CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION : undefined;
              s = this.Ker || o.Time === -1 || o.Time > s;
              h = !this.Ker && o.Time > 0 ? o.Time * MathUtils_1.MathUtils.SecondToMillisecond : undefined;
              this.Qer = t;
              this.Xer = i;
              this.Wer = true;
              n.ExpressionController.ChangeFaceForExpression(t, a);
              this.PlayMontage({
                MontageAsset: t,
                AnimStateParam: o.State,
                IsLoop: s,
                Duration: h,
                InSectionToStartMontageAt: e,
                OnEndCallback: this._tr
              });
            }
          }
        });
      }
    }
  }
  vtr(t = false) {
    if ((!!this.Xaa || !!this.Wer) && !this.etr) {
      this.etr = true;
      this.StopMontage({
        Method: t ? 2 : 4,
        Montage: this.Qer
      });
    }
  }
  rKo() {
    if (this.Xaa || this.Wer) {
      this.etr = true;
      this.StopMontage({
        Method: 0,
        BlendOutTime: 0.1,
        Montage: this.Qer
      });
    }
  }
  Utr() {
    this.etr = true;
    this.StopMontage({
      Method: 0,
      BlendOutTime: 0.5,
      Montage: this.Qer
    });
  }
  utr() {
    this.Her = MathUtils_1.MathUtils.GetRandomRange(IDLE_MONTAGE_CD_MIN, IDLE_MONTAGE_CD_MAX);
    this.jer = Time_1.Time.WorldTimeSeconds;
  }
  Rtr() {
    if (this.Jer?.length) {
      switch (this.zer) {
        case IComponent_1.ENpcStandbyShowFinitelyPlayMode.Randomly:
          this.Zer = Math.floor(Math.random() * this.Jer.length);
          break;
        case IComponent_1.ENpcStandbyShowFinitelyPlayMode.Orderly:
          this.Zer = (this.Zer + 1) % this.Jer.length;
      }
      return this.Jer[this.Zer];
    }
  }
  Etr() {
    var t;
    var i;
    var e = this.Owner.Entity.GetComponent(48);
    if (e?.IsEnabled() && ((t = e.AiController?.AiBase?.SubBehaviorConfigs?.get("AiSense")) && (i = this.Owner.Entity.GetComponent(130), t = AiSenseById_1.configAiSenseById.GetConfig(Number(t))) && (t = Math.max(t.SenseDistanceRange.Max, 0), i.SetLogicRange(t), this.ctr = t > 0), i = e.AiController?.AiBase?.SubBehaviorConfigs?.get("AiAlert")) && AiAlertById_1.configAiAlertById.GetConfig(Number(i))) {
      this.mtr = true;
    }
  }
  Ore() {
    this.Ctr = this.Owner.Entity;
    EventSystem_1.EventSystem.AddWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnInteractPlotStart, this.ftr);
    if (this.ctr && this.mtr) {
      EventSystem_1.EventSystem.AddWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnStalkAlert, this.ptr);
      EventSystem_1.EventSystem.AddWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnStalkAlertLifted, this.Oer);
    }
    if (this.ctr && !this.mtr) {
      EventSystem_1.EventSystem.AddWithTarget(this.Owner.Entity, EventDefine_1.EEventName.EnterLogicRange, this.xei);
      EventSystem_1.EventSystem.AddWithTarget(this.Owner.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.Mtr);
      if (!this.Owner.Entity.GetComponent(130)?.IsInLogicRange) {
        this.Mtr();
      }
    }
  }
  kre() {
    if (this.Ctr) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Ctr, EventDefine_1.EEventName.OnInteractPlotStart, this.ftr);
      if (this.ctr && this.mtr) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Ctr, EventDefine_1.EEventName.OnStalkAlert, this.ptr);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Ctr, EventDefine_1.EEventName.OnStalkAlertLifted, this.Oer);
      }
      if (this.ctr) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Ctr, EventDefine_1.EEventName.EnterLogicRange, this.xei);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Ctr, EventDefine_1.EEventName.LeaveLogicRange, this.Mtr);
      }
      this.Ctr = undefined;
    }
  }
  OnPlayerInteractTurnActionStart() {
    this.Owner.Entity.GetComponent(197)?.PauseAi("PlayerInteractTurnAction");
    this.InteractRequestWaiting = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("NPC", 50, "[NpcPerformIdleState.OnPlayerInteractTurnActionStart] 开始执行交互转身", ["PbDataID", this.ConfigId]);
    }
    this.TurnActionController.TurnToInteractTarget();
  }
  OnPlayerInteractTurnActionEnd() {
    var t = this.Owner.Entity.GetComponent(45);
    if (t.MainAnimInstance.IsAnyMontagePlaying() && this.TurnActionController.NeedTurn) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "[NpcPerformIdleState.OnPlayerInteractTurnActionEnd][结束交互转身] 停止播放Montage", ["PbDataID", this.ConfigId], ["IsIdleMontage", this.Xaa], ["CurrentMontage", t?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName()]);
      }
      this.Utr();
    }
    this.TurnActionController.OnTurnToDefaultForwardEndHandle = () => {
      if (this?.Owner?.Valid) {
        this.Owner.Entity.GetComponent(197)?.ResumeAi("PlayerInteractTurnAction");
        this.TurnActionController.NeedTurn = false;
      }
    };
    this.TurnActionController.TurnToDefaultForward();
    this.InteractRequestWaiting = false;
    this.utr();
  }
  OnPlayerAttack() {
    if (!this.dtr) {
      this.rKo();
      this.StateMachine.Switch(3);
    }
  }
  OnMonsterNearby() {
    return !this.dtr && (this.rKo(), this.StateMachine.Switch(7), true);
  }
  OnPlayerImpact() {
    if (!this.dtr) {
      this.rKo();
      this.StateMachine.Switch(4);
    }
  }
}
exports.NpcPerformIdleState = NpcPerformIdleState;
//# sourceMappingURL=NpcPerformIdleState.js.map