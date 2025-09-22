"use strict";

var CharacterLockOnComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var r = arguments.length;
  var o = r < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, e, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        o = (r < 3 ? h(o) : r > 3 ? h(i, e, o) : h(i, e)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(i, e, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLockOnComponent = exports.LockOnInfo = exports.ShowTargetInfo = exports.lockOnEnhancedTags = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const CameraController_1 = require("../../../../../Camera/CameraController");
const CameraUtility_1 = require("../../../../../Camera/CameraUtility");
const FightCameraLogicComponent_1 = require("../../../../../Camera/FightCameraLogicComponent");
const TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../../../GameSettings/GameSettingsManager");
const Global_1 = require("../../../../../Global");
const GlobalData_1 = require("../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const ColorUtils_1 = require("../../../../../Utils/ColorUtils");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const CampUtils_1 = require("../../Blueprint/Utils/CampUtils");
const CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const SkillUtils_1 = require("../Skill/SkillUtils");
const LockOnDebug_1 = require("./LockOnDebug");
const LockOnUtils_1 = require("./LockOnUtils");
const PROFILE_KEY = "CharacterLockOnComponent_IsBlock";
const DELAY_TIME = 1000;
const CHECK_COUNT = 3;
const RESET_FOCUS_TIME = 0.6;
const RESET_TARGETS_ISLOCK_TIME = 10000;
const DEFAULT_LOCKON_CONFIG_ID = 0;
const LOCK_DIR_COMPENSATE_REASON = "角色强锁补偿buff";
exports.lockOnEnhancedTags = [-336338240, -164894127];
class ShowTargetInfo {
  constructor() {
    this.ShowTarget = undefined;
    this.SocketName = "";
    this.LastSetTime = -0;
  }
}
exports.ShowTargetInfo = ShowTargetInfo;
class LockOnInfo {
  constructor(t, i = "") {
    this.EntityHandle = undefined;
    this.SocketName = "";
    this.EntityHandle = t;
    this.SocketName = i;
  }
  Copy(t) {
    this.EntityHandle = t.EntityHandle;
    this.SocketName = t.SocketName;
  }
  Equal(t) {
    return this.EntityHandle?.Id === t.EntityHandle?.Id && this.SocketName === t.SocketName;
  }
  Different(t) {
    return this.EntityHandle !== t.EntityHandle || this.SocketName !== t.SocketName && !!t.SocketName && !!this.SocketName;
  }
}
exports.LockOnInfo = LockOnInfo;
class CustomizedLockedQueue {
  constructor() {
    this.YYo = [];
  }
  Has(i) {
    return !!i && this.YYo.some(t => t.Equal(i));
  }
  Push(t) {
    if (t && !this.Has(t)) {
      this.YYo.push(t);
    }
  }
  Pop() {
    return this.YYo.shift();
  }
  Clear() {
    this.YYo.length = 0;
  }
}
let CharacterLockOnComponent = CharacterLockOnComponent_1 = class CharacterLockOnComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hfa = Stats_1.Stat.Create("CharacterLockOnComponent.DetectAlternativeTargets");
    this.jfa = Stats_1.Stat.Create("CharacterLockOnComponent.DetectAlternativeTargets.CheckBase");
    this.Wfa = Stats_1.Stat.Create("CharacterLockOnComponent.DetectAlternativeTargets.CheckDistance");
    this.Qfa = Stats_1.Stat.Create("CharacterLockOnComponent.DetectAlternativeTargets.FinalSetting");
    this.Kfa = Stats_1.Stat.Create("CharacterLockOnComponent.CannotBeDetected");
    this.Xfa = Stats_1.Stat.Create("CharacterLockOnComponent.IsBlock");
    this.Yfa = Stats_1.Stat.Create("CharacterLockOnComponent.IsBlock.RayEndLocation");
    this.Jfa = Stats_1.Stat.Create("CharacterLockOnComponent.IsBlock.TraceDetectBlock");
    this.zfa = Stats_1.Stat.Create("CharacterLockOnComponent.FindTheBest");
    this.Zfa = Stats_1.Stat.Create("CharacterLockOnComponent.FindTheBest.Direction");
    this.eva = Stats_1.Stat.Create("CharacterLockOnComponent.FindTheBest.Calculation");
    this.tva = Stats_1.Stat.Create("CharacterLockOnComponent.GetSkillBoneLocation");
    this.SSa = Stats_1.Stat.Create("CharacterLockOnComponent.StatTickMoveDir");
    this.ESa = Stats_1.Stat.Create("CharacterLockOnComponent.StatTickCurrentInfo");
    this.ySa = Stats_1.Stat.Create("CharacterLockOnComponent.StatCheck");
    this.ISa = Stats_1.Stat.Create("CharacterLockOnComponent.StatLockOnDebugTick");
    this.Hte = undefined;
    this.J8l = undefined;
    this.GXr = undefined;
    this.s3u = undefined;
    this.a3u = undefined;
    this.NXr = undefined;
    this.OXr = "";
    this.L01 = undefined;
    this.Es1 = [];
    this.FXr = undefined;
    this.VXr = 0;
    this.Xte = undefined;
    this.HBr = undefined;
    this.RSo = undefined;
    this.m1t = undefined;
    this.HXr = undefined;
    this.jXr = undefined;
    this.WXr = undefined;
    this.KXr = false;
    this.dHo = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.Dz = Quat_1.Quat.Create();
    this.CTn = Vector2D_1.Vector2D.Create();
    this.QXr = Vector_1.Vector.Create();
    this.XXr = Vector_1.Vector.Create();
    this.$Xr = 0;
    this.YXr = 0;
    this.JXr = false;
    this.zXr = 0;
    this.uoe = undefined;
    this.ZXr = t => {
      if (this.GXr?.EntityHandle?.Id === t) {
        this.AUn();
      }
    };
    this.zpe = (t, i) => {
      if (this.GXr?.EntityHandle === i) {
        this.AUn();
      }
    };
    this.eTa = new Set();
    this.I3r = t => {
      t = t.GetComponent(32);
      this.KXr = t.KXr;
      this.Es1 = t.Es1.slice();
      this.i$r(t.GXr);
      this.L01 = t.L01;
      this.SetShowTarget(t.ShowTarget, t.ShowTargetSocket);
    };
    this.Zpe = t => {
      var i = this.IsCompensateLockDirection();
      if (t) {
        if (i) {
          this.ExitLockDirection();
          this.i01();
          this.EnterLockDirection();
        }
      } else {
        this.r01();
      }
    };
    this.a$r = (t, i) => {
      var e;
      if (i) {
        if (this.e$r) {
          this.FXr = this.GXr;
        }
      } else {
        i = this.FXr?.EntityHandle?.Entity;
        if (this.FXr && i?.Valid && (i = i.GetComponent(3))?.Valid && (e = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent)?.CheckPositionInScreen(i.ActorLocationProxy, e.CameraAdjustController.CheckInScreenMinX, e.CameraAdjustController.CheckInScreenMaxX, e.CameraAdjustController.CheckInScreenMinY, e.CameraAdjustController.CheckInScreenMaxY)) {
          if (this.e$r) {
            this.i$r(this.FXr);
            this.SetShowTarget(this.GXr.EntityHandle, this.GXr.SocketName);
            CharacterLockOnComponent_1.h$r.Push(this.GXr);
          } else {
            this.EnterLockDirection();
          }
          this.FXr = undefined;
        }
      }
    };
    this.l$r = false;
    this.W5r = Vector_1.Vector.Create();
    this._$r = Vector_1.Vector.Create();
    this.u$r = false;
    this.CCa = undefined;
  }
  get h3u() {
    return this.s3u || this.Hte.ActorLocationProxy;
  }
  get l3u() {
    return this.a3u || this.Hte.ActorForwardProxy;
  }
  i$r(t) {
    var i = this.GXr;
    this.GXr = t;
    if (i?.EntityHandle !== t?.EntityHandle || i?.SocketName !== t?.SocketName) {
      if (i && i.EntityHandle && EventSystem_1.EventSystem.HasWithTarget(i.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
        EventSystem_1.EventSystem.RemoveWithTarget(i.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
      if (this.GXr && this.GXr.EntityHandle && !EventSystem_1.EventSystem.HasWithTarget(this.GXr.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
        EventSystem_1.EventSystem.AddWithTarget(this.GXr.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
    }
  }
  GetCurrentTarget() {
    return this.GXr?.EntityHandle;
  }
  GetCurrentTargetSocketName() {
    return this.GXr?.SocketName ?? "";
  }
  GetTargetInfo() {
    this.WXr.ShowTarget = this.ShowTarget;
    this.WXr.SocketName = this.ShowTargetSocket;
    this.WXr.LastSetTime = this.VXr;
    return this.WXr;
  }
  get ShowTarget() {
    return this.NXr;
  }
  get ShowTargetSocket() {
    return this.OXr;
  }
  SetShowTarget(t, i = "") {
    if (t) {
      if (!this.Xte?.HasTag(2130437044)) {
        this.Xte?.AddTag(2130437044);
      }
    } else {
      this.Xte?.RemoveTag(2130437044);
    }
    this.VXr = Time_1.Time.WorldTime;
    var e = t?.Entity?.GetComponent(3);
    if (this.ShowTarget !== t || this.ShowTargetSocket !== i) {
      if (t === undefined) {
        this.NXr = undefined;
        this.OXr = "";
        GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(undefined);
        return false;
      }
      this.NXr = t;
      this.OXr = i;
      if (e) {
        GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(e.Actor);
      }
    }
    return true;
  }
  c$r(t, i = "") {
    var e;
    var s;
    return !this.e$r && !this.Xte.HasTag(2066208190) && (t?.Valid && t.Entity.Active ? (e = t.Entity.GetComponent(3)) ? i ? !!(s = e.LockOnParts.get(i)) && !!s.SoftLockValid && this.SetShowTarget(t, i) : !e.LockOnParts.size && this.SetShowTarget(t, i) : this.SetShowTarget(t, i) : this.SetShowTarget(undefined));
  }
  static get Dependencies() {
    return [176];
  }
  AUn() {
    if (this.KXr) {
      this.ForceLookAt(undefined, false);
    } else if (this.e$r) {
      this.t$r(true);
    } else {
      this.i$r(undefined);
      this.SetShowTarget(undefined);
    }
  }
  rva(t) {
    this.eTa.clear();
    CharacterLockOnComponent_1.EnhancedEntityIds.forEach(t => {
      var i = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t);
      if (i) {
        this.eTa.add(i);
      } else {
        CharacterLockOnComponent_1.EnhancedEntityIds.delete(t);
      }
    });
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(this.h3u, t, 255, this.eTa, false);
    return this.eTa;
  }
  OnInitData() {
    this.WXr = new ShowTargetInfo();
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.J8l = this.Entity.GetComponent(0);
    this.SetLockOnConfig(this.J8l.GetRoleConfig()?.LockOnDefaultId ?? 0, this.J8l.GetRoleConfig()?.LockOnLookOnId ?? 0);
    this.Xte = this.Entity.GetComponent(206);
    this.HBr = this.Entity.GetComponent(176);
    this.RSo = this.Entity.GetComponent(62);
    this.m1t = this.Entity.GetComponent(175);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.ZXr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    this.Xte.ListenForTagAddOrRemove(483118073, this.a$r);
    this.koe();
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.ZXr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    this.i$r(undefined);
    return true;
  }
  OnDisable(t) {
    this.Xte?.RemoveTag(2130437044);
  }
  koe() {
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = this.Hte.Actor;
    this.uoe.bIsSingle = true;
    this.uoe.bIgnoreSelf = true;
    this.uoe.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    if (this.JXr) {
      this.uoe.DrawTime = 5;
      this.uoe.SetDrawDebugTrace(2);
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.uoe, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.uoe, ColorUtils_1.ColorUtils.LinearRed);
    }
  }
  SetLockOnConfig(t, i) {
    if (t !== 0) {
      this.HXr = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(t);
    }
    if (i !== 0) {
      this.jXr = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(i);
    }
  }
  OnTick(t) {
    this.SSa.Start();
    this.m$r();
    this.SSa.Stop();
    this.ESa.Start();
    this.sra();
    this.ESa.Stop();
    this.ySa.Start();
    this.Ii(t);
    this.ySa.Stop();
    this.C$r(t);
    this.g$r();
    this.ISa.Start();
    LockOnDebug_1.LockOnDebug.Tick(this.Entity);
    this.ISa.Stop();
  }
  Ii(t) {
    if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(this.GXr?.EntityHandle)) {
      if (this.e$r || this.KXr) {
        this.YXr += t;
        if (!(this.YXr < DELAY_TIME)) {
          this.YXr = 0;
          t = Global_1.Global.CharacterCameraManager.D_K2_GetActorLocation();
          if (this.A4r(this.GXr, t)) {
            this.$Xr++;
            if (this.$Xr >= CHECK_COUNT) {
              this.ara();
              this.$Xr = 0;
            }
          } else {
            this.$Xr = 0;
          }
        }
      }
    } else {
      this.ara();
    }
  }
  ara() {
    this.i$r(undefined);
    this.SetShowTarget(undefined);
    this.ExitLockDirection();
    this.ForceLookAt(undefined, false);
  }
  C$r(t) {
    if (this.e$r) {
      this.zXr += t;
      if (!(this.zXr < RESET_TARGETS_ISLOCK_TIME)) {
        this.zXr = 0;
        CharacterLockOnComponent_1.h$r.Clear();
        CharacterLockOnComponent_1.h$r.Push(this.GXr);
      }
    }
  }
  _3u(t) {
    if (t !== "" && (t = (t = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(this.Entity.Id, t)) && EntitySystem_1.EntitySystem.GetComponent(t, 3))) {
      this.s3u = t.ActorLocationProxy;
      this.a3u = t.ActorForwardProxy;
    }
  }
  Emn() {
    if (this.s3u) {
      this.s3u = undefined;
      this.a3u = undefined;
    }
  }
  DetectSoftLockTarget({
    LockOnConfigId: i = DEFAULT_LOCKON_CONFIG_ID,
    SkillTargetPriority: e = 8,
    ShowTarget: s = false,
    GlobalTarget: h = false,
    BlackboardKey: r = ""
  }, t = true) {
    if (h) {
      h = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.GetComponent(32);
      this.i$r(h?.GXr);
    } else if (!this.e$r && !this.KXr) {
      this._3u(r);
      if (t) {
        let t = this.HXr;
        if (t = DEFAULT_LOCKON_CONFIG_ID !== i ? ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(i) : t) {
          h = this.DetectAlternativeTargets(t, false);
          r = this.FindTheBest(this.M$r(h, false), e, false, t.ToleranceAngle);
          this.CFu(r, s);
        }
      } else if (!this.GXr) {
        this.DetectSoftLockTarget({});
      }
      this.Emn();
    }
  }
  CFu(t, i) {
    this.i$r(t);
    if (t?.EntityHandle?.Valid) {
      LockOnDebug_1.LockOnDebug.SetDebugArrow(t);
    }
    if (i) {
      this.c$r(this.GetCurrentTarget(), this.GetCurrentTargetSocketName());
    }
  }
  FindTheBest(t, i, e, s) {
    this.zfa.Start();
    this.Zfa.Start();
    if (i === 8) {
      switch (GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.SkillLockEnemyMode)) {
        case 0:
          i = 0;
          break;
        case 1:
          i = 4;
          break;
        case 2:
          i = 3;
      }
    }
    let h = undefined;
    let r = false;
    switch (i) {
      case 0:
      case 5:
        r = !this.u$r && !this.s3u;
        this.u$r = false;
        h = this.W5r.IsNearlyZero() ? this.E$r() : this.W5r;
        break;
      case 1:
      case 7:
        h = this.l3u;
        break;
      case 2:
        h = this.E$r();
        r = true;
        break;
      case 3:
        break;
      case 4:
      case 6:
        h = this.E$r();
    }
    this.Zfa.Stop();
    var o = [5, 7, 6].includes(i);
    var n = CommonParamById_1.configCommonParamById.GetIntConfig("LockOnOffset");
    let a = undefined;
    let c = Number.MAX_VALUE;
    let _ = undefined;
    let C = Number.MAX_VALUE;
    for (const u of t) {
      this.eva.Start();
      switch (this.S$r(u, e, r)) {
        case 0:
          this.eva.Stop();
          continue;
        case 1:
          break;
        case 2:
          LockOnDebug_1.LockOnDebug.SetDebugString(u, 0, 0, this.W5r, h);
          this.eva.Stop();
          this.zfa.Stop();
          return u;
      }
      this.ova(u.EntityHandle, u.SocketName, this.dHo);
      var l = this.h3u;
      var m = Vector_1.Vector.Dist(l, this.dHo);
      let t = 0;
      if (h) {
        this.Tz.DeepCopy(h);
        this.Tz.Normalize();
        this.Tz.Multiply(o ? 0 : n, this.Tz);
        l.Subtraction(this.Tz, this.Tz);
        this.dHo.Subtraction(this.Tz, this.dHo);
        t = this.y$r(h, this.dHo);
      }
      if (t < s) {
        if (!a || m < c) {
          a = u;
          c = m;
        }
      } else if (!o) {
        if (!_ || m < C) {
          _ = u;
          C = m;
        }
      }
      LockOnDebug_1.LockOnDebug.SetDebugString(u, t, m, this.W5r, h);
      this.eva.Stop();
    }
    this.zfa.Stop();
    return a || _;
  }
  S$r(i, t, e) {
    if (t && CharacterLockOnComponent_1.h$r.Has(i) || this.Es1.some(t => !t.Different(i))) {
      return 0;
    } else if (e && LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(this.GXr?.EntityHandle) && this.GXr?.Equal(i)) {
      return 2;
    } else {
      return 1;
    }
  }
  E$r() {
    var t = Vector_1.Vector.Create();
    CameraController_1.CameraController.CameraRotator.Quaternion().RotateVector(Vector_1.Vector.ForwardVectorProxy, t);
    return t;
  }
  y$r(t, i, e = false) {
    return Math.acos(e ? t.DotProduct(i) / Math.sqrt(t.SizeSquared() * i.SizeSquared()) : t.CosineAngle2D(i)) * MathUtils_1.MathUtils.RadToDeg;
  }
  ForceLookAt(i, t) {
    if (t) {
      if (!LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(i?.EntityHandle)) {
        CombatLog_1.CombatLog.Error("LockOn", this.Entity, "无效的看向目标！");
        return;
      }
      if (this.KXr && !i?.Different(this.GXr)) {
        CombatLog_1.CombatLog.Error("LockOn", this.Entity, "重复进入看向状态！");
        return;
      }
      if (this.Es1.some(t => !t.Different(i))) {
        CombatLog_1.CombatLog.Error("LockOn", this.Entity, "忽略锁定期间不能进入看向状态！");
        return;
      }
    }
    this.KXr;
    if (t) {
      this.KXr = true;
      if (this.e$r) {
        if (!i?.Different(this.GXr)) {
          return;
        }
      } else {
        this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection);
      }
      this.i$r(i);
      this.SetShowTarget(i?.EntityHandle, i?.SocketName);
    } else if (this.KXr && !i?.Different(this.GXr)) {
      this.KXr = false;
      if (!this.e$r) {
        this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection);
      }
    }
    this.KXr;
  }
  ForceIgnore(i, t) {
    if (t) {
      if (this.Es1.some(t => !t.Different(i))) {
        CombatLog_1.CombatLog.Error("LockOn", this.Entity, "重复进入忽略锁定状态！");
        return;
      }
      if (this.KXr && !this.GXr?.Different(i)) {
        CombatLog_1.CombatLog.Error("LockOn", this.Entity, "看向状态期间不能忽略锁定！");
        return;
      }
    }
    if (t) {
      this.Es1.push(i);
      if (this.GXr && !i.Different(this.GXr)) {
        if (this.e$r) {
          this.L01 = this.GXr;
        }
        this.i$r(undefined);
        this.SetShowTarget(undefined);
        this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection);
      }
    } else {
      if (this.Es1.some(t => !t.Different(i))) {
        this.Es1 = this.Es1.filter(t => t.Different(i));
      }
      if (this.L01 && !this.L01.Different(i)) {
        if (!this.e$r && LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(i.EntityHandle)) {
          this.i$r(this.L01);
          this.SetShowTarget(this.L01.EntityHandle, this.L01.SocketName);
          CharacterLockOnComponent_1.h$r.Push(this.L01);
          this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection);
        }
        this.L01 = undefined;
      }
    }
  }
  EnterLockDirection() {
    if (!this.KXr) {
      if (this.e$r) {
        return;
      }
      if (this.Xte.HasTag(428837378)) {
        return;
      }
      if (this.Xte.HasTag(2066208190)) {
        return;
      }
      if (CameraController_1.CameraController.FightCamera.LogicComponent.IsDisableResetFocus) {
        return;
      }
      this.t$r(true);
      if (!this.GXr) {
        this.ResetFocus();
        return;
      }
      this.$Xr = 0;
    }
    CharacterLockOnComponent_1.h$r.Push(this.GXr);
    this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection);
  }
  ExitLockDirection() {
    if (this.e$r) {
      if (this.KXr) {
        this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection);
      } else {
        this.SetShowTarget(undefined);
        CharacterLockOnComponent_1.h$r.Clear();
        this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection);
      }
    }
  }
  ResetFocus() {
    if (!CameraController_1.CameraController.FightCamera.LogicComponent.IsDisableResetFocus && !!ModelManager_1.ModelManager.CameraModel.IsEnableResetFocus && !this.KXr && !this.e$r) {
      CameraController_1.CameraController.FightCamera.LogicComponent.ResetCameraInput();
      CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(CameraUtility_1.CameraUtility.GetCameraDefaultFocusRotator(), RESET_FOCUS_TIME);
    }
  }
  ResetPitch(t = RESET_FOCUS_TIME, i = undefined, e = true, s = 0) {
    var h = CommonParamById_1.configCommonParamById.GetFloatConfig("InitialCameraPitch");
    var r = this.Gue;
    CameraUtility_1.CameraUtility.SetPitchInGravity(CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation, h, r);
    CameraController_1.CameraController.FightCamera.LogicComponent.ResetCameraInput();
    CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(r, t, i, e, s);
  }
  sra() {
    var t;
    if (!this.KXr) {
      if (this.Xte.HasTag(2066208190)) {
        this.ara();
      } else if (this.GXr?.EntityHandle?.Valid && this.jXr) {
        if (this.e$r) {
          t = this.dHo;
          this.ova(this.GXr.EntityHandle, this.GXr.SocketName, t);
          if (this.L$r(this.GXr.EntityHandle) || this.D$r(this.jXr, this.GXr.EntityHandle, t)) {
            this.ExitLockDirection();
          }
        } else if (this.R$r(this.GXr.EntityHandle) || this.D$r(this.jXr, this.GXr.EntityHandle, this.GXr.EntityHandle.Entity.GetComponent(1).ActorLocationProxy)) {
          this.i$r(undefined);
          this.SetShowTarget(undefined);
        }
      }
    }
  }
  ova(t, i, e) {
    this.tva.Start();
    if (t && t.Entity && (t = SkillUtils_1.SkillUtils.GetTargetSocketTransform(t.Entity, i, 0, "索敌", 2))) {
      e.FromUeVector(t.GetLocation());
    } else {
      e.Reset();
    }
    this.tva.Stop();
  }
  LockOnSpecifyTarget(t) {
    var i;
    if (!this.e$r && !this.KXr) {
      if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(t)) {
        (i = new LockOnInfo()).EntityHandle = t;
        this.i$r(i);
        this.SetShowTarget(t);
      }
    }
  }
  A4r(t, i) {
    this.Xfa.Start();
    this.QXr.FromUeVector(i);
    i = t.EntityHandle.Entity.GetComponent(1);
    if (t.SocketName) {
      this.ova(t.EntityHandle, t.SocketName, this.XXr);
    } else {
      this.Yfa.Start();
      this.XXr.DeepCopy(i.ActorLocationProxy);
      if (t = t.EntityHandle.Entity.GetComponent(0)?.GetFightInterConfig()?.LockOffset) {
        t = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0);
        this.XXr.Addition(t, this.XXr);
      }
      this.Yfa.Stop();
    }
    this.Jfa.Start();
    t = this.TraceDetectBlock(this.QXr, this.XXr, i.Owner);
    this.Jfa.Stop();
    this.Xfa.Stop();
    return t;
  }
  TraceDetectBlock(t, i, e) {
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, i);
    return !!TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY) && !!this.uoe.HitResult.bBlockingHit && (t = this.uoe.HitResult.Actors.Get(0), i = ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(t), e !== t) && e !== i;
  }
  r01() {
    if (this.e$r) {
      this.m1t?.AddBuff(CharacterBuffIds_1.buffId.HardLockCompensateBuff, {
        InstigatorId: this.m1t?.CreatureDataId,
        Reason: LOCK_DIR_COMPENSATE_REASON
      });
    }
  }
  i01() {
    return !!this.IsCompensateLockDirection() && !!this.m1t && !(this.m1t.RemoveBuff(CharacterBuffIds_1.buffId.HardLockCompensateBuff, -1, LOCK_DIR_COMPENSATE_REASON), 0);
  }
  IsCompensateLockDirection() {
    return this.Xte.HasTag(1320595126);
  }
  t$r(t) {
    if (this.jXr) {
      if (t) {
        CharacterLockOnComponent_1.h$r.Clear();
      }
      for (var i = this.DetectAlternativeTargets(this.jXr, true); i.length && i.every(t => CharacterLockOnComponent_1.h$r.Has(t));) {
        CharacterLockOnComponent_1.h$r.Pop();
      }
      t = this.FindTheBest(this.M$r(i, true), 4, true, this.jXr.ToleranceAngle);
      this.i$r(t);
      if (t) {
        CharacterLockOnComponent_1.h$r.Push(t);
        this.SetShowTarget(t.EntityHandle, t.SocketName);
        this.zXr = 0;
        if (t?.EntityHandle?.Valid) {
          LockOnDebug_1.LockOnDebug.SetDebugArrow(t);
        }
      } else {
        this.SetShowTarget(undefined);
        this.ExitLockDirection();
      }
    }
  }
  DetectAlternativeTargets(i, t) {
    this.Hfa.Start();
    LockOnDebug_1.LockOnDebug.Clear();
    var e = [];
    var s = Global_1.Global.CharacterCameraManager.D_K2_GetActorLocation();
    for (const m of this.rva(Math.max(i.Distance, i.SectorRadius))) {
      this.jfa.Start();
      if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(m)) {
        if (m.Id === this.Entity.Id) {
          this.jfa.Stop();
        } else {
          var h = m.Entity.GetComponent(0)?.GetEntityType();
          var r = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(m);
          if (r?.IsValid()) {
            var o;
            var n = r;
            var r = r instanceof TsBaseCharacter_1.default;
            if (o = SkillUtils_1.SkillUtils.IsTsActor(m)) {
              if (!n || !r) {
                this.jfa.Stop();
                continue;
              }
              if (CampUtils_1.CampUtils.GetCampRelationship(n.Camp, this.Hte.Actor.Camp) !== 2) {
                this.jfa.Stop();
                continue;
              }
            } else {
              if (t) {
                this.jfa.Stop();
                continue;
              }
              if (h !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
                this.jfa.Stop();
                continue;
              }
              r = m.Entity.GetComponent(118)?.LockRange;
              if (!r || r <= 0) {
                this.jfa.Stop();
                continue;
              }
              n = m.Entity.GetComponent(1);
              if (r < Vector_1.Vector.Dist2D(n.ActorLocationProxy, this.h3u)) {
                this.jfa.Stop();
                continue;
              }
            }
            if (t ? this.L$r(m) : this.R$r(m)) {
              this.jfa.Stop();
            } else if (this.Y8l(m)) {
              this.jfa.Stop();
              this.Wfa.Start();
              h = m.Entity.GetComponent(3);
              if ((h?.LockOnParts?.size ?? 0) > 0) {
                let t = false;
                var r = h.LockOnParts.values();
                var a = this.dHo;
                for (const u of r) {
                  this.ova(m, u.BoneNameString, a);
                  if (!(t = this.D$r(i, m, a))) {
                    break;
                  }
                }
                if (t) {
                  this.Wfa.Stop();
                  continue;
                }
              } else if (this.D$r(i, m, m.Entity.GetComponent(1).ActorLocationProxy)) {
                this.Wfa.Stop();
                continue;
              }
              this.Wfa.Stop();
              this.Qfa.Start();
              if (o) {
                n = m.Entity.GetComponent(3);
                if (n?.LockOnParts.size) {
                  var c;
                  var _ = m.Entity.GetComponent(69);
                  var C = m.Entity.GetComponent(40);
                  for ([, c] of n.LockOnParts) {
                    if ((t ? c.HardLockValid : c.SoftLockValid) && (!C || !C.IgnoreSocketName.has(c.BoneNameString))) {
                      if (_ && c.EnablePartName) {
                        var l = _.PartMapByBone.get(c.EnablePartName);
                        if (l && !l.Active) {
                          continue;
                        }
                      }
                      l = new LockOnInfo();
                      l.EntityHandle = m;
                      l.SocketName = c.BoneNameString;
                      if (!this.A4r(l, s)) {
                        LockOnDebug_1.LockOnDebug.Push(l);
                        e.push(l);
                      }
                    }
                  }
                } else {
                  h = new LockOnInfo();
                  h.EntityHandle = m;
                  if (this.A4r(h, s)) {
                    this.Qfa.Stop();
                    continue;
                  }
                  LockOnDebug_1.LockOnDebug.Push(h);
                  e.push(h);
                }
              } else {
                r = new LockOnInfo();
                r.EntityHandle = m;
                if (this.A4r(r, s)) {
                  this.Qfa.Stop();
                  continue;
                }
                LockOnDebug_1.LockOnDebug.Push(r);
                e.push(r);
              }
              this.Qfa.Stop();
            } else {
              this.jfa.Stop();
            }
          } else {
            this.jfa.Stop();
          }
        }
      } else {
        this.jfa.Stop();
      }
    }
    this.Hfa.Stop();
    return e;
  }
  M$r(t, i) {
    var e = t.filter(t => t.EntityHandle?.Entity?.GetComponent(206)?.HasTag(1659143519));
    if (i) {
      if (e.every(t => CharacterLockOnComponent_1.h$r.Has(t))) {
        return t;
      } else {
        return e;
      }
    } else if (e.length) {
      return e;
    } else {
      return t;
    }
  }
  L$r(t) {
    t = t.Entity?.GetComponent(206);
    return !!t?.Valid && (t.HasAnyTag([-1243968098, -620990172]) || this.Xte.HasAnyTag([-620990172, 63495198]));
  }
  R$r(t) {
    t = t.Entity?.GetComponent(206);
    return !!t?.Valid && (t.HasAnyTag([-1243968098, -1092371289]) || this.Xte.HasAnyTag([-1092371289, 63495198]));
  }
  Y8l(t) {
    var i = (t.Entity?.GetComponent(206)).HasTag(-504316709);
    var t = t.Entity?.GetComponent(0);
    return !i || t.GetSummonerId() === this.J8l.GetCreatureDataId();
  }
  D$r(t, i, e) {
    this.Kfa.Start();
    t = !this.U$r(t, this.h3u, e) && !this.A$r(i, e, this.h3u);
    this.Kfa.Stop();
    return t;
  }
  U$r(t, i, e) {
    var s = i.Z - e.Z;
    if (s < -t.UpDistance || s > t.DownDistance) {
      return false;
    }
    if (Vector_1.Vector.DistSquared(i, e) <= t.Distance * t.Distance) {
      return true;
    }
    s = this.Hte.Actor.Controller;
    if (!s) {
      return false;
    }
    s = (s.GetControlRotation().Yaw % 360 + 360) % 360;
    if (Vector_1.Vector.DistSquared(i, e) > t.SectorRadius * t.SectorRadius) {
      return false;
    }
    e.Subtraction(i, this.dHo).Normalize(MathUtils_1.MathUtils.SmallNumber);
    e = Math.atan2(this.dHo.Y, this.dHo.X) * 180 / Math.PI;
    i = Math.abs((360 + e) % 360 - s);
    return (i > 180 ? 360 - i : i) <= t.SectorAngle / 2;
  }
  A$r(t, i, e) {
    var s;
    return !!t.Entity?.GetComponent(206)?.HasAnyTag(exports.lockOnEnhancedTags) && !!(t = t.Entity.GetComponent(3))?.LockOnConfig && !((s = i.Z - e.Z) < -t.LockOnConfig.UpDistance) && !(s > t.LockOnConfig.DownDistance) && !(Vector_1.Vector.DistSquared(i, e) > t.LockOnConfig.Distance * t.LockOnConfig.Distance);
  }
  g$r() {
    var t = this.e$r;
    if (this.l$r !== t) {
      CombatMessage_1.CombatNet.Send(t ? 19841 : 18591, this.Entity, (t ? Protocol_1.Aki.Protocol.Ue_ : Protocol_1.Aki.Protocol.De_).create());
      this.l$r = t;
    }
  }
  RefreshCurrentLockState(t, i = "") {
    var e;
    if (this.GXr?.EntityHandle === t && (t = t?.Entity?.GetComponent(3)) && (e = this.GXr?.SocketName) && e === i && t.LockOnParts.has(e)) {
      if (!(i = t.LockOnParts.get(e)).HardLockValid) {
        this.ExitLockDirection();
      }
      if (!i.SoftLockValid) {
        this.SetShowTarget(undefined);
      }
    }
  }
  get e$r() {
    return this.Xte.HasTag(-1150819426);
  }
  m$r() {
    var t;
    var i;
    if (this.RSo && (t = this.RSo.GetMoveDirectionCache(), [i] = this.RSo.GetCameraInput(), i === 0 && this._$r.Equals(t, MathUtils_1.MathUtils.SmallNumber) || (this._$r.Set(t.X, t.Y, 0), this.W5r.DeepCopy(this.Hte.InputDirectProxy), this._$r?.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) || (this.u$r = true), this.SpeedUpCleanTarget())) {
      this.u$r = true;
    }
  }
  SpeedUpCleanTarget() {
    var t = this.Entity.GetComponent(179);
    return !!t?.Valid && !!(t.Speed > FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD) && !this.Xte.HasTag(-1371021686);
  }
  ResetTarget() {
    if (!this.KXr && this.e$r) {
      this.t$r(false);
    }
  }
  ChangeShowTarget(t, i, e) {
    if (this.KXr || !this.e$r || !this.jXr || !this.GXr) {
      return false;
    }
    var s;
    var h;
    var r;
    var o = this.DetectAlternativeTargets(this.jXr, true);
    var n = this.h3u;
    this.ova(this.GXr.EntityHandle, this.GXr.SocketName, this.dHo);
    this.Tz.DeepCopy(n);
    this.Tz.Z = this.dHo.Z;
    this.dHo.SubtractionEqual(n);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.dHo, Vector_1.Vector.UpVectorProxy, this.Dz);
    this.Dz.Inverse(this.Dz);
    var a = t.SizeSquared();
    let c = undefined;
    let _ = MathUtils_1.MathUtils.LargeNumber;
    for (const C of o) {
      if (!!LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(C.EntityHandle) && !C.Equal(this.GXr) && !(this.ova(C.EntityHandle, C.SocketName, this.dHo), this.dHo.SubtractionEqual(this.Tz), this.Dz.RotateVector(this.dHo, this.dHo), Math.abs(this.dHo.X) < MathUtils_1.MathUtils.SmallNumber && Math.abs(this.dHo.Y) < MathUtils_1.MathUtils.SmallNumber) && !(s = Math.atan2(this.dHo.Y, this.dHo.X) * MathUtils_1.MathUtils.RadToDeg, h = Math.asin(this.dHo.Z / this.dHo.Size()) * MathUtils_1.MathUtils.RadToDeg, this.CTn.X = s, this.CTn.Y = h, (r = this.CTn.DotProduct(t)) < 0)) {
        if ((r = i * (Math.acos(r / Math.sqrt(this.CTn.SizeSquared() * a)) * MathUtils_1.MathUtils.RadToDeg) / 180 + e * Math.sqrt(s * s + h * h)) < _) {
          _ = r;
          c = C;
        }
      }
    }
    return !!c && (this.i$r(c), this.SetShowTarget(c.EntityHandle, c.SocketName), true);
  }
  GetPredictedLockOnTarget() {
    if (this.Xte?.HasTag(-126337119)) {
      return this.CCa;
    }
  }
  SetPredictedLockOnTarget(t) {
    this.CCa = t;
  }
};
CharacterLockOnComponent.h$r = new CustomizedLockedQueue();
CharacterLockOnComponent.EnhancedEntityIds = new Set();
CharacterLockOnComponent = CharacterLockOnComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(32)], CharacterLockOnComponent);
exports.CharacterLockOnComponent = CharacterLockOnComponent; //# sourceMappingURL=CharacterLockOnComponent.js.map