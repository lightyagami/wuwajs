"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var r = arguments.length;
  var a = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, o);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        a = (r < 3 ? s(a) : r > 3 ? s(e, i, a) : s(e, i)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseHitComponent = exports.OnHitMaterialAction = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Long = require("../../../../../Core/Define/Net/long");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleUiDefine_1 = require("../../../../Module/BattleUi/BattleUiDefine");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const WorldGlobal_1 = require("../../../../World/WorldGlobal");
const BulletTypes_1 = require("../../../Bullet/BulletTypes");
class OnHitMaterialAction {
  constructor(t, e = undefined) {
    this.Z$s = t;
    this.vHr = e;
    this.TDe = undefined;
    this.vJ = 0;
    this.mSa = 0;
    this.eXs = undefined;
    this.tXs = 0;
    this.iXs = 0;
    this.rXs = 0;
    this.oXs = false;
    this.nXs = 0;
    this.PHo = 0;
    this.dSa = undefined;
    this.CSa = undefined;
    this.aXs = false;
    this.FFe = 0;
    this.kC = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 20, "OnHitMaterialAction Loop", ["Delta", t], ["Path", this.eXs], ["ElapsedMs", this.tXs]);
      }
      this.tXs += t * (this.vHr?.CurrentTimeScale ?? 1);
      if (!this.oXs && this.IsDelayFinish()) {
        this.S9e(this.dSa, this.CSa);
      } else if (this.oXs && this.r$t()) {
        this.Stop();
        this.End();
        TimerSystem_1.TimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
    };
  }
  get IsPlaying() {
    return this.oXs;
  }
  get BulletId() {
    return this.nXs;
  }
  get AttackerId() {
    return this.PHo;
  }
  IsDelayFinish() {
    return this.tXs >= this.rXs;
  }
  r$t() {
    return this.tXs > this.iXs + this.rXs;
  }
  ComparePriority(t, e) {
    if (this.aXs) {
      if (this.PHo === e) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 20, "同一个角色新的更优先");
        }
        return true;
      } else {
        return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Id !== this.PHo || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 20, "不同角色，前台角色更优先，如果都不在前台，新的更优先"), false);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 20, "当前没有播放就直接播放");
      }
      return true;
    }
  }
  Start(t, e, i, o, s = undefined) {
    this.aXs = true;
    this.eXs = t;
    this.iXs = CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.rXs = e;
    this.nXs = i;
    this.PHo = o;
    this.oXs = false;
    this.dSa = undefined;
    this.CSa = undefined;
    this.tXs = 0;
    this.FFe++;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 20, "OnHitMaterialAction 行为开始");
    }
    this.gSa(this.FFe, t, s);
    if (!TimerSystem_1.TimerSystem.Has(this.TDe)) {
      this.TDe = TimerSystem_1.TimerSystem.Forever(this.kC, TimerSystem_1.MIN_TIME, 1, undefined, "[OnHitMaterial.Loop]");
    }
  }
  async gSa(t, e, i) {
    var o = new Array(2);
    var s = [];
    s.push(this.fSa(e, o, 0));
    if (i) {
      s.push(this.fSa(i, o, 1));
    }
    await Promise.all(s);
    if (o[0]) {
      if (t !== this.FFe) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 20, "有优先级更高的资源替代了正要播放的材质", ["oldPath", e], ["newPath", this.eXs]);
        }
      } else {
        s = (i = o[0]).LoopTime;
        this.iXs = BattleUiDefine_1.SECOND_TO_MILLISECOND * (s.Start + s.Loop + s.End) + this.tXs - this.rXs;
        t = o[1];
        if (this.IsDelayFinish()) {
          this.S9e(i, t, "OnHitMaterialAction 加载完已经Delay完成, 直接播放");
        } else {
          this.dSa = i;
          this.CSa = t;
        }
      }
    } else {
      this.oXs = false;
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 20, "无法找到材质效果", ["materialDataPath", this.eXs]);
      }
    }
  }
  async fSa(t, i, o) {
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.PD_CharacterControllerData_C, (t, e) => {
      i[o] = t;
      s.SetResult();
    });
    return s.Promise;
  }
  S9e(t, e, i = "OnHitMaterialAction 开始播放") {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 20, i, ["Path", this.eXs], ["Duration", this.iXs], ["Asset is null", t === undefined], ["Asset Part is null", e === undefined]);
    }
    this.oXs = true;
    if (t) {
      this.vJ = this.Z$s.AddMaterialControllerData(t);
    }
    if (e) {
      this.mSa = this.Z$s.AddMaterialControllerData(e);
    }
  }
  Stop(t = false) {
    if (this.vJ) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 20, "OnHitMaterialAction 停止播放", ["Path", this.eXs], ["Force", t], ["Elapsed", this.tXs]);
      }
      this.Z$s.RemoveMaterialControllerData(this.vJ);
    }
    if (this.mSa) {
      this.Z$s.RemoveMaterialControllerData(this.mSa);
    }
    this.vJ = 0;
    this.mSa = 0;
    this.dSa = undefined;
    this.CSa = undefined;
    this.oXs = false;
  }
  End() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 20, "OnHitMaterialAction 行为结束", ["Path", this.eXs], ["Elapsed", this.tXs]);
    }
    this.aXs = false;
  }
}
exports.OnHitMaterialAction = OnHitMaterialAction;
let BaseHitComponent = class BaseHitComponent extends EntityComponent_1.EntityComponent {
  HitRequest(t, e, i, o = 0, s = false, r = false, a = 0, n = undefined, l = false, h = undefined, _ = undefined) {
    var m = Protocol_1.Aki.Protocol.I4s.create();
    var u = this.Entity.GetComponent(0).GetCreatureDataId();
    m.s5n = MathUtils_1.MathUtils.NumberToLong(e);
    m.CVn = MathUtils_1.MathUtils.NumberToLong(u);
    m.Mjn = Long.fromNumber(i.BulletId);
    var e = i.HitPosition;
    m.cWn = {
      X: e.X,
      Y: e.Y,
      Z: e.Z
    };
    m.mWn = {
      Pitch: i.HitEffectRotation.Pitch,
      Yaw: i.HitEffectRotation.Yaw,
      Roll: i.HitEffectRotation.Roll
    };
    m.dWn = {
      X: e.X,
      Y: e.Y,
      Z: e.Z
    };
    m.CWn = o;
    m.gWn = s;
    m.fWn = r;
    m.pWn = a === 1;
    m.vWn = a === 2;
    m.MWn = n;
    var u = i.HitEffect !== undefined;
    m.SWn = u;
    m.EWn = i.HitPart?.toString() ?? "";
    m.yWn = l;
    var e = t.GetBulletInfo();
    m.r5n = e.BulletInitParams.SkillId;
    m.IWn = e.BulletInitParams.Source;
    if (h !== undefined) {
      m.mVn = h;
    }
    var o = Protocol_1.Aki.Protocol.P3n.create();
    o.TWn = m;
    if (e.BulletInitParams.SkillContextId) {
      o.ptc = MathUtils_1.MathUtils.BigIntToLong(e.BulletInitParams.SkillContextId);
    }
    this.lra(o);
    CombatMessage_1.CombatNet.Call(26472, this.Entity, o, t => {
      _?.(t);
    }, t?.GetBulletInfo().ContextId);
  }
  lra(t) {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      t.TWn.Y8n = 0;
      t.TWn.CVn = 0;
      t.TWn.SWn = false;
      t.TWn.cWn = undefined;
      t.TWn.mWn = undefined;
      t.TWn.zDs = false;
      t.TWn.gWn = false;
      t.TWn.fWn = false;
      t.TWn.MWn = undefined;
      t.TWn.yWn = false;
      t.TWn.EWn = "";
      t.TWn.CWn = 0;
    }
  }
  static HitEndRequest(t) {
    var e = Protocol_1.Aki.Protocol.oe_.create();
    CombatMessage_1.CombatNet.Send(27200, t, e);
  }
  static PreHitNotify(t, e) {
    if (e.TWn?.SWn && !e.TWn.gWn && (t = t.GetComponent(55)) && !t.PreSwitchRemoteFightState(e.TWn.mVn)) {
      e.TWn.gWn = true;
      e.TWn.mVn = 0;
    }
    return true;
  }
  static HitNotify(t, e) {
    var i;
    var o;
    var s;
    var r = MathUtils_1.MathUtils.LongToNumber(e.TWn.s5n);
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    if (a?.Valid) {
      a = a.Entity;
      i = e.TWn.Mjn ? MathUtils_1.MathUtils.LongToBigInt(e.TWn.Mjn).toString() : "";
      if (o = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(a, i)) {
        o = new BulletTypes_1.HitInformation(a, t, undefined, 0, undefined, e.TWn.zDs ?? false, undefined, undefined, 0, o, i, o.Base.DamageId, undefined, 0, 0, false);
        if (e.TWn.mWn) {
          o.HitEffectRotation.Set(e.TWn.mWn.Pitch, e.TWn.mWn.Yaw, e.TWn.mWn.Roll);
        }
        if (e.TWn.dWn) {
          o.HitPosition.Set(e.TWn.dWn.X, e.TWn.dWn.Y, e.TWn.dWn.Z);
        }
        if (e.TWn.EWn) {
          o.HitPart = FNameUtil_1.FNameUtil.GetDynamicFName(e.TWn.EWn);
        }
        s = WorldGlobal_1.WorldGlobal.ToUeRotator(e.TWn.MWn);
        (t = t?.GetComponent(60))?.ReceiveOnHit(o, a, e.TWn.SWn ?? false, e.TWn.yWn ?? false, e.TWn.gWn ?? false, e.TWn.fWn ?? false, e.TWn.pWn ?? false, e.TWn.vWn ?? false, s, e.TWn.mVn, e.TWn.CWn);
        t?.BroadcastRemoteEvent(a, e.TWn);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 14, `[ControllerHolder.CreatureController.HitNotify] 子弹数据不存在;${i}。`);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("World", 14, "[ControllerHolder.CreatureController.HitNotify] 攻击者为空，不存在动态实体:" + r);
    }
  }
  ReceiveOnHit(t, e, i, o, s, r, a, n, l, h, _) {}
  BroadcastEvent(t) {
    var e = EntitySystem_1.EntitySystem.Get(t.Attacker.Id);
    var i = EntitySystem_1.EntitySystem.Get(t.BulletEntityId).GetBulletInfo();
    var o = Number(i.BulletInitParams.SkillId);
    var s = i.BulletInitParams.SkillContextId;
    var r = e?.GetComponent(39);
    var s = {
      Attacker: e,
      Target: this.Entity,
      BulletId: t.BulletId,
      HasBeHitAnim: false,
      BeHitAnim: 0,
      VisionCounterAttackId: 0,
      CounterAttackType: 0,
      SkillId: o,
      SkillHitCount: ModelManager_1.ModelManager.CombatMessageModel?.AddSkillHitCount(s),
      BulletHitCount: i.HitNumberAll,
      SkillGenre: r?.GetSkillInfo(o)?.SkillGenre ?? -1,
      BattleFlags: r?.GetSkill(o)?.BattleFlags ?? []
    };
    if (e) {
      SceneTeamController_1.SceneTeamController.EmitEvent(e, EventDefine_1.EEventName.CharHitLocal, t, s);
    }
    SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.CharBeHitLocal, t, s);
  }
  BroadcastRemoteEvent(t, e) {
    var i;
    var o;
    if (t && e && t) {
      i = MathUtils_1.MathUtils.LongToNumber(e.r5n);
      o = t.GetComponent(39);
      e = {
        Attacker: t,
        Target: this.Entity,
        BulletId: MathUtils_1.MathUtils.LongToNumber(e.Mjn),
        HasBeHitAnim: false,
        BeHitAnim: e.CWn ?? 0,
        VisionCounterAttackId: 0,
        CounterAttackType: e.vWn ? 2 : e.pWn ? 1 : 0,
        SkillId: i,
        SkillHitCount: undefined,
        BulletHitCount: undefined,
        SkillGenre: o?.GetSkillInfo(i)?.SkillGenre ?? -1,
        BattleFlags: o?.GetSkill(i)?.BattleFlags ?? []
      };
      SceneTeamController_1.SceneTeamController.EmitEvent(t, EventDefine_1.EEventName.CharHitRemote, e);
      SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.CharBeHitRemote, e);
    }
  }
};
__decorate([CombatMessage_1.CombatNet.Preprocess("TFn")], BaseHitComponent, "PreHitNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("TFn", true)], BaseHitComponent, "HitNotify", null);
BaseHitComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(60)], BaseHitComponent);
exports.BaseHitComponent = BaseHitComponent; //# sourceMappingURL=BaseHitComponent.js.map