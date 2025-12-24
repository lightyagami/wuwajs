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
const RenderUtil_1 = require("../../Render/Utils/RenderUtil");
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
    this.Tuu = new Array();
    this.buu = new Array();
    this.hRu = new Array();
    this.Ruu = new Array();
    this.uBf = undefined;
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
    this.SEu = 0;
    this.ZLc = 1;
    this.V8c = 1;
    this.j8c = e => {
      if (this.ZLc !== 1) {
        this.w2u();
      }
    };
    this.dLe = () => {
      if (this.ZLc !== 1) {
        this.w2u();
      }
    };
    this.ddu = e => {
      if (e.PlotLevel !== "LevelD" && e.PlotLevel !== "Prompt") {
        this.ExitAllSelfCenteredMode();
      }
    };
    this.ZMu = () => {
      this.ExitAllSelfCenteredMode();
    };
    this.eEu = () => {
      this.ExitAllSelfCenteredMode();
    };
    this.imc = e => {
      if (e && this.EnabledSelfCentered) {
        this.ExitAllSelfCenteredMode();
      }
    };
    this.FQe = e => {
      if (e === "PhantomExploreView" || e === "ChatView" || e === "ShopView") {
        this.ExitAllSelfCenteredMode();
      }
    };
    this.grn = (e, t) => {
      if (this.SEu === 5) {
        this.ExitSkillSelfCenteredMode();
      }
    };
  }
  get ExtraEntitiesToEnterSelfCenteredState() {
    return this.uBf;
  }
  AddExtraEntityToEnterSelfCenteredState(e) {
    if (e) {
      this.uBf ||= new Set();
      this.uBf.add(e);
    }
  }
  ClearExtraEntitiesToEnterSelfCenteredState() {
    this.uBf?.clear();
  }
  get EnabledSelfCentered() {
    return this.SEu !== 0 || this.ZLc !== 1;
  }
  get SelfCenteredMode() {
    return this.SEu;
  }
  get SelfCenteredTimeDilation() {
    return this.ZLc;
  }
  get InverseSelfCenteredTimeDilation() {
    return this.V8c;
  }
  OnInit() {
    this.nK.length = 0;
    this.Ruu.push(5);
    this.Ruu.push(3);
    this.Ruu.push(2);
    this.Ruu.push(1);
    this.Ruu.push(4);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInitRole, this.j8c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.ddu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DoLeaveLevel, this.ZMu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BackLoginView, this.eEu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetGamePaused, this.imc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    return true;
  }
  OnClear() {
    this.ClearData();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInitRole, this.j8c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.ddu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DoLeaveLevel, this.ZMu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BackLoginView, this.eEu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetGamePaused, this.imc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    return true;
  }
  OnLeaveLevel() {
    this.ClearData();
    return true;
  }
  OnChangeMode() {
    this.ExitAllSelfCenteredMode();
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
    var e = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(40);
    if (e?.Valid) {
      e.BeginSkillAsync(SELF_CENTERED_SKILL_ID);
    }
    ControllerHolder_1.ControllerHolder.CharacterController.ExitSelfCenteredMode(5);
  }
  ExitSelfCenteredMode(e) {
    this.DisableSelfCenteredMode(e);
    this.SwitchSelfCenteredMode(this.GetNextSelfCenteredMode());
  }
  ExitAllSelfCenteredMode() {
    var e;
    if (this.IsSelfCenteredModeEnabled(5) && (e = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(40))?.Valid) {
      e.BeginSkillAsync(SELF_CENTERED_SKILL_ID);
    }
    for (const t of this.Ruu) {
      this.Tuu[t] = false;
      this.buu[t] = 1;
      this.hRu[t] = 0;
    }
    this.SwitchSelfCenteredMode(this.GetNextSelfCenteredMode());
  }
  IsSelfCenteredModeEnabled(e) {
    return this.Tuu[e];
  }
  EnableSelfCenteredMode(e, t, i = -1) {
    if (t <= MathUtils_1.MathUtils.SmallNumber) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "Error SelfCentered TimeDilation.", ["mode", e], ["TimeDilation", t]);
      }
    } else {
      this.Tuu[e] = true;
      this.buu[e] = t;
      this.hRu[e] = i;
    }
  }
  DisableSelfCenteredMode(e) {
    this.Tuu[e] = false;
    this.buu[e] = 1;
    this.hRu[e] = 0;
  }
  GetNextSelfCenteredMode() {
    for (const e of this.Ruu) {
      if (this.Tuu[e]) {
        return e;
      }
    }
    return 0;
  }
  wuu(e) {
    if (this.Tuu[e]) {
      return this.buu[e];
    } else {
      return 1;
    }
  }
  lRu(e) {
    if (this.Tuu[e]) {
      return this.hRu[e];
    } else {
      return 0;
    }
  }
  SwitchSelfCenteredMode(e) {
    var t;
    var i = this.wuu(e);
    return (this.SEu !== e || !MathUtils_1.MathUtils.IsNearlyEqual(this.ZLc, i)) && !(t = this.SEu, this.SEu = e, this.ZLc = i, this.V8c = 1 / i, UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.GameInstance, i), Time_1.Time.SetInverseSelfCenteredTimeDilation(this.V8c), Time_1.Time.SetFlowTimeDilation(this.V8c), ControllerHolder_1.ControllerHolder.FormationDataController.SetTimeDilation(this.InverseSelfCenteredTimeDilation), UE.LGUIManagerActor.GetSequencerManager(GlobalData_1.GlobalData.World)?.SetGlobalPlayRate(this.InverseSelfCenteredTimeDilation), UE.LTweenActor.GetLTweenInstance(GlobalData_1.GlobalData.World)?.SetGlobalPlayRate(this.InverseSelfCenteredTimeDilation), MathUtils_1.MathUtils.IsNearlyEqual(this.ZLc, 1) ? (AudioSystem_1.AudioSystem.SetState("level_2_5_time_slow", "none"), AudioSystem_1.AudioSystem.PostEvent("disable_monster_effect_2_5_time_slow"), this.HTu(false), TimerSystem_1.TimerSystem.Next(() => {
      if (MathUtils_1.MathUtils.IsNearlyEqual(this.ZLc, 1)) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.TargetFPS -1");
      } else {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.TargetFPS 1200");
      }
    }), EffectSystem_1.EffectSystem.EnableNiagaraDownSampling(), RenderUtil_1.RenderUtil.UnsetNeedRenderKuroToonDepth()) : (AudioSystem_1.AudioSystem.SetState("level_2_5_time_slow", "enable"), AudioSystem_1.AudioSystem.PostEvent("enable_monster_effect_2_5_time_slow"), this.HTu(true), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.TargetFPS 1200"), EffectSystem_1.EffectSystem.DisableNiagaraDownSampling(), RenderUtil_1.RenderUtil.SetNeedRenderKuroToonDepth()), this.w2u(), this.cBf(), Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 57, "SelfCentered Change.", ["timeDilation", i], ["SelfCenteredMode", this.SEu]), t !== 5 && this.SEu === 5 ? this.yTu() : t === 5 && this.STu(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.SEu, i), (t = Protocol_1.Aki.Protocol.kpu.create()).A6n = i, t.o5n = i !== 1, t.n5n = this.lRu(e) * TimeUtil_1.TimeUtil.InverseMillisecond, Net_1.Net.Send(24043, t), 0);
  }
  yTu() {
    FormationAttributeController_1.FormationAttributeController.AddThresholdListener(12, this.grn, 0, 0, "Strength.RoleStrengthComponent");
    FormationDataController_1.FormationDataController.AddPlayerTag(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), 1250079979);
  }
  STu() {
    FormationAttributeController_1.FormationAttributeController.RemoveThresholdListener(12, this.grn);
    FormationDataController_1.FormationDataController.RemovePlayerTag(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), 1250079979);
  }
  HTu(t) {
    for (let e = 0; e < 17; e++) {
      EffectSystem_1.EffectSystem.SetAdditionTimeScaleEnable(e, t);
    }
  }
  static dBf(e, t) {
    if (t?.Valid && (t = t.Entity.GetComponent(312))?.Valid) {
      t.SetSelfCenterTimeDilation(e);
    }
  }
  w2u() {
    ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true).forEach(CharacterModel.dBf.bind(CharacterModel, this.InverseSelfCenteredTimeDilation));
  }
  cBf() {
    this.uBf?.forEach(CharacterModel.dBf.bind(CharacterModel, this.InverseSelfCenteredTimeDilation));
  }
}
exports.CharacterModel = CharacterModel;
//# sourceMappingURL=CharacterModel.js.map