"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterModel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Lru_1 = require("../../../Core/Container/Lru");
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Net_1 = require("../../../Core/Net/Net");
const ObjectSystem_1 = require("../../../Core/Object/ObjectSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../Module/Abilities/FormationAttributeController");
const FormationDataController_1 = require("../../Module/Abilities/FormationDataController");
const EntityHandle_1 = require("./EntityHandle");
const WorldEntity_1 = require("./WorldEntity");
const ENTITY_LRU_CAPACITY = 300;
const aEntityLocation = Vector_1.Vector.Create();
const bEntityLocation = Vector_1.Vector.Create();
const SELF_CENTERED_SKILL_ID = 210027;
class CharacterModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.nK = new Array();
    this.V1u = new Array();
    this.j1u = new Array();
    this.Vbu = new Array();
    this.H1u = new Array();
    this.AwakeQueue = new PriorityQueue_1.PriorityQueue((e, t) => {
      var i = t[0].Priority;
      var r = e[0].Priority;
      if (i !== r) {
        return i - r;
      } else {
        i = e[0].Valid ? e[0].Entity.GetComponent(0) : undefined;
        r = t[0].Valid ? t[0].Entity.GetComponent(0) : undefined;
        if (i && r) {
          e = i.GetLocation();
          aEntityLocation.X = e.X;
          aEntityLocation.Y = e.Y;
          aEntityLocation.Z = e.Z;
          t = r.GetLocation();
          bEntityLocation.X = t.X;
          bEntityLocation.Y = t.Y;
          bEntityLocation.Z = t.Z;
          i = ModelManager_1.ModelManager.GameModeModel.RoleLocation;
          return Vector_1.Vector.DistSquared(i, aEntityLocation) - Vector_1.Vector.DistSquared(i, bEntityLocation);
        } else {
          return 0;
        }
      }
    });
    this.fKo = new Map();
    this.TestSoarOn = false;
    this.EntityPool = new Lru_1.Lru(ENTITY_LRU_CAPACITY, e => new WorldEntity_1.WorldEntity(0, 0), undefined);
    this.Ryu = 0;
    this.ZLc = 1;
    this.V8c = 1;
    this.j8c = e => {
      if (this.ZLc !== 1) {
        this.jku();
      }
    };
    this.dLe = () => {
      if (this.ZLc !== 1) {
        this.jku();
      }
    };
    this.Acu = e => {
      if (e.PlotLevel !== "LevelD" && e.PlotLevel !== "Prompt") {
        this.ExitAllSelfCenteredMode();
      }
    };
    this.JMu = () => {
      this.ExitAllSelfCenteredMode();
    };
    this.ZMu = () => {
      this.ExitAllSelfCenteredMode();
    };
    this.imc = e => {
      if (e && this.EnabledSelfCentered) {
        this.ExitAllSelfCenteredMode();
      }
    };
    this.grn = (e, t) => {
      if (this.Ryu === 5) {
        this.ExitSkillSelfCenteredMode();
      }
    };
  }
  get EnabledSelfCentered() {
    return this.Ryu !== 0 || this.ZLc !== 1;
  }
  get SelfCenteredMode() {
    return this.Ryu;
  }
  get SelfCenteredTimeDilation() {
    return this.ZLc;
  }
  get InverseSelfCenteredTimeDilation() {
    return this.V8c;
  }
  OnInit() {
    this.nK.length = 0;
    this.H1u.push(5);
    this.H1u.push(3);
    this.H1u.push(2);
    this.H1u.push(1);
    this.H1u.push(4);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInitRole, this.j8c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.Acu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DoLeaveLevel, this.JMu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BackLoginView, this.ZMu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetGamePaused, this.imc);
    return true;
  }
  OnClear() {
    this.ClearData();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInitRole, this.j8c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.Acu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DoLeaveLevel, this.JMu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BackLoginView, this.ZMu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetGamePaused, this.imc);
    return true;
  }
  OnLeaveLevel() {
    this.ClearData();
    return true;
  }
  CreateHandle(e) {
    for (var t = e.Index; this.nK.length <= t;) {
      this.nK.push(undefined);
    }
    e = new EntityHandle_1.EntityHandle(e);
    return this.nK[t] = e;
  }
  ClearHandle(e) {
    this.nK[e.Index] = undefined;
  }
  PushAwakeHandler(e, t, i) {
    t = [e, t, i];
    this.AwakeQueue.Push(t);
    this.fKo.set(e, t);
  }
  PopAwakeHandler() {
    var e;
    if (!this.AwakeQueue.Empty) {
      e = this.AwakeQueue.Pop();
      this.fKo.delete(e[0]);
      return e;
    }
  }
  ClearData() {
    this.AwakeQueue.Clear();
    this.fKo.clear();
  }
  GetHandle(e) {
    var t;
    if (e) {
      t = e >>> ObjectSystem_1.ObjectSystem.VersionDigit;
      if ((t = this.nK[t])?.Id === e) {
        return t;
      } else {
        return undefined;
      }
    }
  }
  GetHandleByEntity(e) {
    var t;
    if (e && (t = this.nK[e.Index])?.Id === e.Id) {
      return t;
    } else {
      return undefined;
    }
  }
  IsValid(e) {
    var t = e >>> ObjectSystem_1.ObjectSystem.VersionDigit;
    return this.nK[t]?.Id === e;
  }
  SortItem(e) {
    e = this.fKo.get(e);
    if (e) {
      this.AwakeQueue.Update(e);
    }
  }
  EnterSelfCenteredMode(e, t, i = -1) {
    this.EnableSelfCenteredMode(e, t, i);
    this.SwitchSelfCenteredMode(this.GetNextSelfCenteredMode());
  }
  ExitSkillSelfCenteredMode() {
    var e = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(39);
    if (e?.Valid) {
      e.BeginSkill(SELF_CENTERED_SKILL_ID);
    }
    ControllerHolder_1.ControllerHolder.CharacterController.ExitSelfCenteredMode(5);
  }
  ExitSelfCenteredMode(e) {
    this.DisableSelfCenteredMode(e);
    this.SwitchSelfCenteredMode(this.GetNextSelfCenteredMode());
  }
  ExitAllSelfCenteredMode() {
    var e;
    if (this.IsSelfCenteredModeEnabled(5) && (e = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(39))?.Valid) {
      e.BeginSkill(SELF_CENTERED_SKILL_ID);
    }
    for (const t of this.H1u) {
      this.V1u[t] = false;
      this.j1u[t] = 1;
      this.Vbu[t] = 0;
    }
    this.SwitchSelfCenteredMode(this.GetNextSelfCenteredMode());
  }
  IsSelfCenteredModeEnabled(e) {
    return this.V1u[e];
  }
  EnableSelfCenteredMode(e, t, i = -1) {
    if (t <= MathUtils_1.MathUtils.SmallNumber) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "Error SelfCentered TimeDilation.", ["mode", e], ["TimeDilation", t]);
      }
    } else {
      this.V1u[e] = true;
      this.j1u[e] = t;
      this.Vbu[e] = i;
    }
  }
  DisableSelfCenteredMode(e) {
    this.V1u[e] = false;
    this.j1u[e] = 1;
    this.Vbu[e] = 0;
  }
  GetNextSelfCenteredMode() {
    for (const e of this.H1u) {
      if (this.V1u[e]) {
        return e;
      }
    }
    return 0;
  }
  W1u(e) {
    if (this.V1u[e]) {
      return this.j1u[e];
    } else {
      return 1;
    }
  }
  jbu(e) {
    if (this.V1u[e]) {
      return this.Vbu[e];
    } else {
      return 0;
    }
  }
  SwitchSelfCenteredMode(e) {
    var t;
    var i = this.W1u(e);
    return (this.Ryu !== e || !MathUtils_1.MathUtils.IsNearlyEqual(this.ZLc, i)) && !(t = this.Ryu, this.Ryu = e, this.ZLc = i, this.V8c = 1 / i, UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.GameInstance, i), Time_1.Time.SetInverseSelfCenteredTimeDilation(this.V8c), Time_1.Time.SetFlowTimeDilation(this.V8c), ControllerHolder_1.ControllerHolder.FormationDataController.SetTimeDilation(this.InverseSelfCenteredTimeDilation), UE.LGUIManagerActor.GetSequencerManager(GlobalData_1.GlobalData.World)?.SetGlobalPlayRate(this.InverseSelfCenteredTimeDilation), UE.LTweenActor.GetLTweenInstance(GlobalData_1.GlobalData.World)?.SetGlobalPlayRate(this.InverseSelfCenteredTimeDilation), MathUtils_1.MathUtils.IsNearlyEqual(this.ZLc, 1) ? (AudioSystem_1.AudioSystem.SetState("level_2_5_time_slow", "none"), this.ITu(false), TimerSystem_1.TimerSystem.Next(() => {
      if (MathUtils_1.MathUtils.IsNearlyEqual(this.ZLc, 1)) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.TargetFPS -1");
      } else {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.TargetFPS 1200");
      }
    })) : (AudioSystem_1.AudioSystem.SetState("level_2_5_time_slow", "enable"), this.ITu(true), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.TargetFPS 1200")), this.jku(), Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 57, "SelfCentered Change.", ["timeDilation", i], ["SelfCenteredMode", this.Ryu]), t !== 5 && this.Ryu === 5 ? this.USu() : t === 5 && this.DSu(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.Ryu, i), (t = Protocol_1.Aki.Protocol.O0u.create()).A6n = i, t.o5n = i !== 1, t.n5n = this.jbu(e) * TimeUtil_1.TimeUtil.InverseMillisecond, Net_1.Net.Send(25003, t), 0);
  }
  USu() {
    FormationAttributeController_1.FormationAttributeController.AddThresholdListener(12, this.grn, 0, 0, "Strength.RoleStrengthComponent");
    FormationDataController_1.FormationDataController.AddPlayerTag(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), 1250079979);
  }
  DSu() {
    FormationAttributeController_1.FormationAttributeController.RemoveThresholdListener(12, this.grn);
    FormationDataController_1.FormationDataController.RemovePlayerTag(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), 1250079979);
  }
  ITu(t) {
    for (let e = 0; e < 16; e++) {
      EffectSystem_1.EffectSystem.SetAdditionTimeScaleEnable(e, t);
    }
  }
  jku() {
    var e;
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true)) {
      if (t?.Valid && (e = t.Entity.GetComponent(285))?.Valid) {
        e.SetSelfCenterTimeDilation(this.InverseSelfCenteredTimeDilation);
      }
    }
  }
}
exports.CharacterModel = CharacterModel;
//# sourceMappingURL=CharacterModel.js.map