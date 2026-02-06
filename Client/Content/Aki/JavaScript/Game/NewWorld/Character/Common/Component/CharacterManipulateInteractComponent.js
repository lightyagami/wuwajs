"use strict";

var CharacterManipulateInteractComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, r) {
  var a;
  var s = arguments.length;
  var n = s < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, r);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (a = t[h]) {
        n = (s < 3 ? a(n) : s > 3 ? a(e, i, n) : a(e, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterManipulateInteractComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const CameraController_1 = require("../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController");
const CharacterBuffIds_1 = require("./Abilities/CharacterBuffIds");
const PROFILE_KEY = "CharacterManipulateInteractComponent_RefreshTarget";
const MANIPULATE_VISION_ID = 1003;
const SPHERE_TRACE_RADIUS = 1;
const ragDollUsableTags = [-1347421268, 1978109078, -798481435, -154105489];
let CharacterManipulateInteractComponent = CharacterManipulateInteractComponent_1 = class CharacterManipulateInteractComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Lie = undefined;
    this.$zo = undefined;
    this.EIe = undefined;
    this.$7r = new Set();
    this.gri = undefined;
    this.bsr = undefined;
    this.Y7r = undefined;
    this.J7r = undefined;
    this.z7r = true;
    this.Z7r = true;
    this.tat = undefined;
    this.iHr = undefined;
    this.Bbn = undefined;
    this.rrn = false;
    this.erl = undefined;
    this.trl = undefined;
    this.a7r = () => {
      var t;
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === MANIPULATE_VISION_ID) {
        if (this.rrn) {
          this.lHr(true, "控物技能切换结束，加上对应的Tag");
        }
      } else if ((t = ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList)[t.length - 1] === MANIPULATE_VISION_ID) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 48, "请求切换控物中忽略目标清除");
        }
      } else {
        this.hHr = undefined;
        this.lHr(false, "切换到其他技能，清除目标，并删除对应的Tag");
      }
    };
    this.oHr = false;
    this.rHr = undefined;
    this.QEl = [];
    this.nHr = undefined;
    this.aHr = (t, e) => {
      if (e) {
        this.nHr = this.Y7r;
        if (this.nHr?.Type === IComponent_1.EExploreSkillInteractType.StatueInteractPoint) {
          this.nHr.StartInteractPullStatue();
        }
      } else {
        this.nHr = undefined;
      }
    };
    this.KEl = () => {
      var t = -1326291748;
      if (ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType === 1 && this.Lie.HasAnyTag(ragDollUsableTags)) {
        this.Lie.AddTag(t);
      } else {
        this.Lie.RemoveTag(t);
      }
    };
  }
  set hHr(t) {
    var e = t !== undefined && this.z7r;
    if (e || ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished) {
      if (!e) {
        this.lHr(e, "目标为空，或目标不合法");
      }
    } else {
      this.rrn = false;
    }
    if (this.Y7r !== t || this.Z7r !== this.z7r) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, t !== undefined && this.z7r, t?.Entity, false);
      this.Y7r?.TryChangeManipulateInteractPointState(0);
      this.Y7r = t;
      this.Z7r = this.z7r;
      this.Y7r?.TryChangeManipulateInteractPointState(this.z7r ? 1 : 2);
      if (t !== undefined && this.z7r) {
        this.lHr(false, "搜索到新的目标，清除掉当前Tag", false);
      }
      if (this.z7r) {
        this.erl = this.trl;
        this.trl = this.Y7r?.MarkTagId;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Temp", 31, "[CharacterManipulateInteractComponent]刷新目标更新Tag", ["MarkTagId", this.trl ? GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(this.trl) : "undefined"], ["PervTagId", this.erl ? GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(this.erl) : "undefined"]);
      }
    }
  }
  get hHr() {
    return this.Y7r;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.Lie = this.Entity.GetComponent(217);
    this.$zo = this.Entity.GetComponent(185);
    this.EIe = this.Entity.GetComponent(0);
    this.gri = CameraController_1.CameraController.FightCamera.GetComponent(5);
    this.tat = CommonParamById_1.configCommonParamById.GetStringConfig("ManipulateInteractEffectPath");
    this.Bbn = ModelManager_1.ModelManager.ManipulateInteractModel;
    this.InitTraceInfo();
    this.dde();
    return true;
  }
  OnEnable() {
    if (this.hHr?.Type !== IComponent_1.EExploreSkillInteractType.RagDollCrushingRock && (this.cHr(), this.hHr === undefined)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, false, undefined, false);
    }
  }
  OnTick(t) {
    if (Global_1.Global.BaseCharacter === this.Hte.Actor) {
      this._Hr(-1726247959, this.Bbn.InRangePoints.size > 0);
      if (this.uHr()) {
        this.cHr();
      } else {
        this.mHr();
      }
    }
  }
  cHr() {
    if (this.Bbn.InRangePoints.size <= 0 || this.oHr) {
      this.rrn = false;
      this.hHr = undefined;
    } else {
      this.$7r.clear();
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, this.Hte.ActorLocation);
      this.z7r = true;
      var i = new Set();
      for (const n of this.Bbn.InRangePoints) {
        if (n.Valid) {
          if (!n.IsLocked && !n.IsForbidden) {
            if (n.CheckCondition()) {
              if (this.x1h(n.MatchRoleOption) && n.TypeSpecialCheck()) {
                this.$7r.add(n);
              }
            } else if (this.hHr === n) {
              this.mHr();
            }
          }
        } else {
          i.add(n);
        }
      }
      for (const h of i) {
        this.Bbn.InRangePoints.delete(h);
      }
      var r;
      var a = this.Hte.ActorLocationProxy;
      let t = -MathUtils_1.MathUtils.MaxFloat;
      let e = undefined;
      for (const o of this.$7r) {
        var s = o.GetLockWeight(a);
        if (s > t) {
          t = s;
          e = o;
        }
      }
      if (e = t === -MathUtils_1.MathUtils.MaxFloat ? undefined : e) {
        if (this.ProjectWorldLocationToScreenPosition(e.Location)) {
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, e.Location.ToUeVectorOld());
          r = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.bsr, PROFILE_KEY);
          if (e.CheckTraceResult(r, this.bsr)) {
            this.z7r = false;
          }
          this.hHr = e;
          if (this.z7r) {
            if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId !== MANIPULATE_VISION_ID) {
              this.rrn = true;
            } else {
              this.lHr(true, "搜索到目标且不需要切换技能，添加Tag");
            }
          } else {
            this.rrn = false;
            if (ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished) {
              this.lHr(false, "搜索到目标，但不合法，删除Tag");
            }
          }
          return;
        }
      }
      this.hHr = undefined;
      this.rrn = false;
      if (ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished) {
        this.lHr(false, "没有搜索到目标且不需要切换技能，删除Tag");
      }
    }
  }
  ProjectWorldLocationToScreenPosition(t) {
    return this.gri.CheckPositionInScreen(t, this.gri.CameraAdjustController.CheckInScreenMinX, this.gri.CameraAdjustController.CheckInScreenMaxX, this.gri.CameraAdjustController.CheckInScreenMinY, this.gri.CameraAdjustController.CheckInScreenMaxY);
  }
  uHr() {
    return Global_1.Global.BaseCharacter === this.Hte.Actor && (CharacterManipulateInteractComponent_1.dHr ? !this.Lie.HasTag(283451623) && !!this.Lie.HasTag(-1898186757) : (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(MANIPULATE_VISION_ID) && (CharacterManipulateInteractComponent_1.dHr = true), false));
  }
  x1h(t) {
    if (!t || t.length <= 0) {
      return !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam;
    } else {
      return SceneTeamController_1.SceneTeamController.IsMatchRoleOption(t);
    }
  }
  mHr() {
    this.hHr = undefined;
    this.rrn = false;
  }
  InitTraceInfo() {
    this.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.bsr.WorldContextObject = this.Hte.Owner;
    this.bsr.bIsSingle = false;
    this.bsr.bIgnoreSelf = true;
    this.bsr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
    this.bsr.Radius = SPHERE_TRACE_RADIUS;
  }
  dde() {
    if (this.Lie?.Valid) {
      this.rHr = this.Lie?.ListenForTagAddOrRemove(-182189170, this.aHr);
      for (const e of ragDollUsableTags) {
        var t = this.Lie.ListenForTagAddOrRemove(e, this.KEl);
        if (t) {
          this.QEl.push(t);
        }
      }
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.KEl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r);
  }
  Cde() {
    if (this.rHr) {
      this.rHr.EndTask();
    }
    for (const t of this.QEl) {
      t.EndTask();
    }
    this.QEl.length = 0;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnUpdateSceneTeam, this.KEl)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.KEl);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r);
    }
  }
  lHr(t, e, i = true) {
    var r;
    if (this.trl || this.erl) {
      r = this.trl ?? this.erl;
      if (t) {
        if (!this.Lie.HasTag(r)) {
          this.Lie.AddTag(r);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Temp", 31, "AddOrRemoveMarkingTag", ["MarkTagId", this.trl ? GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(this.trl) : "undefined"], ["PervTagId", this.erl ? GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(this.erl) : "undefined"], ["Reason", e], ["isAdd", t]);
          }
        }
      } else {
        if (this.Lie.HasTag(r) && (this.Lie.RemoveTag(r), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Temp", 31, "AddOrRemoveMarkingTag", ["MarkTagId", this.trl ? GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(this.trl) : "undefined"], ["PervTagId", this.erl ? GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(this.erl) : "undefined"], ["Reason", e], ["isAdd", t]);
        }
        if (i && this.trl !== undefined && (this.trl = undefined, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Temp", 31, "[CharacterManipulateInteractComponent] AddOrRemoveMarkingTag ClearTagId", ["MarkTagId", this.trl ? GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(this.trl) : "undefined"], ["PervTagId", this.erl ? GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(this.erl) : "undefined"]);
        }
      }
    }
  }
  OnClear() {
    this.Hte = undefined;
    this.Lie = undefined;
    this.Cde();
    return true;
  }
  StartPullGiantInteract() {
    if (!this.jMf(IComponent_1.EExploreSkillInteractType.PullGiant)) {
      return false;
    }
    this.J7r = this.nHr ?? this.Y7r;
    this.oHr = true;
    this.Lie.AddTag(-1408007765);
    this.J7r?.TryChangeManipulateInteractPointState(3);
    var t = this.Hte.CreatureData.GetRoleConfig().RoleBody;
    this.iHr = t === "MaleXL" ? CharacterBuffIds_1.buffId.ManipulateInteractBuffIdMaleX : CharacterBuffIds_1.buffId.ManipulateInteractBuffId;
    this.$zo.AddBuff(this.iHr, {
      InstigatorId: this.EIe.GetCreatureDataId(),
      Level: 1,
      Reason: "[CharacterManipulateInteractComponent]"
    });
    return true;
  }
  EndPullGiantInteract() {
    this.oHr = false;
    this.Lie.RemoveTag(-1408007765);
    this.NQt();
    if (this.iHr) {
      TimerSystem_1.TimerSystem.Delay(() => {
        if (this.$zo && this.iHr) {
          this.$zo.RemoveBuff(this.iHr, -1, "[CharacterManipulateInteractComponent]");
          this.iHr = undefined;
        }
      }, 200);
    }
    this.J7r?.TryChangeManipulateInteractPointState(0);
    this.cuf();
  }
  StartStatueInteract() {
    this.J7r = this.nHr ?? this.Y7r;
    if (!this.jMf(IComponent_1.EExploreSkillInteractType.StatueInteractPoint)) {
      return false;
    }
    this.oHr = true;
    this.J7r?.TryChangeManipulateInteractPointState(3);
    var t = this.Hte.CreatureData.GetRoleConfig().RoleBody;
    this.iHr = t === "MaleXL" ? CharacterBuffIds_1.buffId.ManipulateInteractBuffIdMaleX : CharacterBuffIds_1.buffId.ManipulateInteractBuffId;
    this.$zo.AddBuff(this.iHr, {
      InstigatorId: this.EIe.GetCreatureDataId(),
      Level: 1,
      Reason: "[CharacterManipulateInteractComponent]"
    });
    return true;
  }
  EndStatueInteract() {
    const t = this.J7r;
    TimerSystem_1.TimerSystem.Delay(() => {
      this.oHr = false;
      t?.EndInteractPullStatue();
      if (this.$zo && this.iHr) {
        this.$zo.RemoveBuff(this.iHr, -1, "[CharacterManipulateInteractComponent]");
        this.iHr = undefined;
      }
    }, 200);
    t?.TryChangeManipulateInteractPointState(0);
    t?.MoveToOutlet();
    this.J7r = undefined;
  }
  StartCustomInteract() {
    return !!this.jMf(IComponent_1.EExploreSkillInteractType.Custom) && (this.J7r = this.nHr ?? this.Y7r, this.oHr = true, this.J7r?.TryChangeManipulateInteractPointState(3), true);
  }
  EndCustomInteract() {
    this.oHr = false;
    this.J7r?.TryChangeManipulateInteractPointState(0);
    this.cuf();
  }
  QuantumDiffusionInteract() {
    if (this.jMf(IComponent_1.EExploreSkillInteractType.QuantumDiffusion)) {
      this.J7r = this.nHr ?? this.Y7r;
      this.cuf();
    }
  }
  jMf(t) {
    if (this.Y7r?.Type !== t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 48, "[CheckInteractTarget] 当前选中目标类型不匹配");
      }
      return false;
    } else {
      return !!this.Z7r && !(this.nHr?.Valid || this.Y7r?.Valid ? this.oHr && (Log_1.Log.CheckError() && Log_1.Log.Error("Character", 48, "[CheckInteractTarget] 当前角色已经在交互中"), 1) : (Log_1.Log.CheckError() && Log_1.Log.Error("Character", 48, "[CheckInteractTarget] 当前没有选中任何目标"), 1));
    }
  }
  NQt() {
    var t;
    var e = this.J7r?.Entity.GetComponent(1)?.ActorTransform;
    if (e && (t = this.Hte?.ActorLocation)) {
      e.SetRotation(new UE.Quat(UE.KismetMathLibrary.D_FindLookAtRotation(t, e.GetLocation())));
      EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e, this.tat, "[CharacterManipulateInteractComponent.SpawnEffect]", new EffectContext_1.EffectContext(this.Entity.Id));
    }
  }
  cuf() {
    var t;
    var e = this.J7r?.CreatureDataId;
    if (e !== undefined) {
      if (!(t = this.J7r?.InteractActions) || t.length <= 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SceneItem", 31, "[CharacterManipulateInteractComponent]请求执行的行为组为空", ["PbDataId", this.J7r?.Entity.GetComponent(0)?.GetPbDataId()]);
        }
      } else {
        (t = Protocol_1.Aki.Protocol.Ghf.create()).F4n = MathUtils_1.MathUtils.NumberToLong(e);
        Net_1.Net.Call(23031, t, t => {
          this.J7r = undefined;
          if (t.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Cvs, 28872);
          }
        });
      }
    }
  }
  GetTargetLocation() {
    return this.J7r?.Location ?? this.hHr.Location;
  }
  _Hr(t, e) {
    if (!this.Lie.HasTag(t) && e) {
      this.Lie.AddTag(t);
    } else if (this.Lie.HasTag(t) && !e) {
      this.Lie.RemoveTag(t);
    }
  }
  ClearTarget() {
    this.lHr(false, "切换角色时清除Tag");
    this.Y7r = undefined;
  }
  SetDataFromOldRole(t) {
    t = t.Entity.GetComponent(71);
    this.hHr = t.hHr;
    this.lHr(true, "切换角色时继承目标并加上Tag");
  }
  CheckCurrentTargetCanInteract() {
    var t = this.nHr ?? this.Y7r;
    return !!t?.Valid && t.OnlineTypeCanInteract;
  }
  get GetCurrentTarget() {
    return this.nHr ?? this.Y7r;
  }
};
CharacterManipulateInteractComponent.dHr = false;
CharacterManipulateInteractComponent = CharacterManipulateInteractComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(71)], CharacterManipulateInteractComponent);
exports.CharacterManipulateInteractComponent = CharacterManipulateInteractComponent; //# sourceMappingURL=CharacterManipulateInteractComponent.js.map