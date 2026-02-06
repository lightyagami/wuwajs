"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillUtils = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const GlobalData_1 = require("../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
const CharacterUtils_1 = require("../../../CharacterUtils");
class SkillUtils {
  static GetSkillRotateDirect(t, i, e, r) {
    r.Reset();
    if (t?.Valid && i) {
      var l = t.Entity.GetComponent(1);
      if (l?.Valid) {
        var o = t.Entity.GetComponent(42);
        if (o?.Valid) {
          var a;
          var s;
          var _ = l.ActorLocationProxy;
          switch (i.Type) {
            case 0:
              if (o.SkillTarget?.Valid) {
                n = o.SkillTarget.Entity.CheckGetComponent(1);
                n = o.GetCurrentSkillRotateTargetDirect(n, _);
                r.DeepCopy(n);
              }
              break;
            case 1:
              var n = i.Target;
              SkillUtils.Lz.DeepCopy(n);
              SkillUtils.Lz.SubtractionEqual(_);
              r.DeepCopy(SkillUtils.Lz);
              break;
            case 2:
              n = i.Target;
              r.DeepCopy(n);
              break;
            case 3:
            case 6:
              {
                let e = undefined;
                if (!(e = i.Type === 3 ? BlackboardController_1.BlackboardController.GetEntityIdByEntity(t.Entity.Id, i.Target) : BlackboardController_1.BlackboardController.GetIntValueByEntity(t.Entity.Id, i.Target))) {
                  break;
                }
                n = EntitySystem_1.EntitySystem.Get(e)?.CheckGetComponent(1);
                if (!n?.Valid) {
                  break;
                }
                SkillUtils.Lz.DeepCopy(n.ActorLocationProxy);
                SkillUtils.Lz.SubtractionEqual(_);
                r.DeepCopy(SkillUtils.Lz);
                break;
              }
            case 4:
              n = BlackboardController_1.BlackboardController.GetVectorValueByEntity(t.Entity.Id, i.Target);
              if (n) {
                SkillUtils.Lz.DeepCopy(n);
                SkillUtils.Lz.SubtractionEqual(_);
                r.DeepCopy(SkillUtils.Lz);
              }
              break;
            case 5:
              n = BlackboardController_1.BlackboardController.GetVectorValueByEntity(t.Entity.Id, i.Target);
              if (n) {
                r.DeepCopy(n);
              }
              break;
            case 7:
              r.DeepCopy(l.ActorForwardProxy);
          }
          if (e) {
            if (e.IsUseAnsRotateOffset && e.AnsRotateOffset !== 0) {
              MathUtils_1.MathUtils.CommonTempRotator.Set(0, e.AnsRotateOffset, 0);
              GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(l, r);
              GravityUtils_1.GravityUtils.RotateDirectInGravityForActor(l, MathUtils_1.MathUtils.CommonTempRotator, r);
            }
            a = l.ActorForwardProxy;
            s = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityAbsForActor(l, r, a);
            if (e.IsPaused) {
              if (e.ResumeRotateThreshold > 0) {
                if (s < e.ResumeRotateThreshold) {
                  r.DeepCopy(a);
                } else {
                  e.IsPaused = false;
                }
              }
            } else if (e.PauseRotateThreshold > 0 && s < e.PauseRotateThreshold) {
              e.IsPaused = true;
              r.DeepCopy(a);
            }
          }
        }
      }
    }
  }
  static GetStaticLineTrace() {
    if (!this.uoe) {
      this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
      this.uoe.bIsSingle = true;
      this.uoe.bIgnoreSelf = true;
      this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
    }
    this.uoe.WorldContextObject = GlobalData_1.GlobalData.World;
    this.uoe.ClearCacheData();
    return this.uoe;
  }
  static GetTargetSocketTransform(e, t, i, r, l = 0) {
    var o = e.GetComponent(3);
    var a = o?.Actor;
    if (a?.IsValid() && t) {
      a = a.Mesh;
      t = FNameUtil_1.FNameUtil.GetDynamicFName(t);
      if (a?.DoesSocketExist(t)) {
        return a.D_GetSocketTransform(t, i);
      }
    }
    if (l === 2) {
      return e.GetComponent(1)?.ActorTransform;
    } else if (l === 1) {
      return o?.ActorTransform;
    } else {
      return undefined;
    }
  }
  static Pbd(e) {
    if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  static Abd(e) {
    if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  static BeginAbsoluteTimeStop(e, t, i) {
    var r;
    var l;
    var o;
    if (!ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      if ((r = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid && (l = r.Entity, CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(r))) {
        if (!!(o = l.GetComponent(0))?.IsRole() || !!o?.IsAutoRole()) {
          if (ControllerHolder_1.ControllerHolder.TimeController.AddLock(e, i)) {
            CombatLog_1.CombatLog.Info("Skill", l, "开启大招时停");
            this.Pbd(r);
            (o = Protocol_1.Aki.Protocol.Qe_.create()).o5n = true;
            o.n5n = t * TimeUtil_1.TimeUtil.InverseMillisecond;
            CombatMessage_1.CombatNet.Send(26118, l, o);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbsoluteTimeStop, true, t);
            EventSystem_1.EventSystem.EmitWithTarget(l, EventDefine_1.EEventName.OnAbsoluteTimeStop, true, t);
          } else {
            CombatLog_1.CombatLog.Error("Skill", l, "重复调用动画和子弹冻结功能，将不做处理");
          }
        } else {
          CombatLog_1.CombatLog.Error("Skill", l, "只有角色才能使用动画和子弹冻结功能");
        }
      }
    }
  }
  static EndAbsoluteTimeStop(e) {
    var t;
    if (ControllerHolder_1.ControllerHolder.TimeController.RemoveLock(e) && (e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid) {
      t = e.Entity;
      CombatLog_1.CombatLog.Info("Skill", t, "结束大招时停");
      this.Abd(e);
      (e = Protocol_1.Aki.Protocol.Qe_.create()).o5n = false;
      e.n5n = 0;
      CombatMessage_1.CombatNet.Send(26118, t, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbsoluteTimeStop, false, 0);
      EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnAbsoluteTimeStop, false, 0);
    }
  }
  static BeginTimeStopRequest(e, t) {
    var i;
    var r = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    if (r?.Valid) {
      i = r.Entity;
      if (!ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
        if (CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(r)) {
          if (ControllerHolder_1.ControllerHolder.TimeController.AddTimeStopRequestLock(e)) {
            CombatLog_1.CombatLog.Info("Skill", i, "开启副本时停");
            this.Pbd(r);
            (e = Protocol_1.Aki.Protocol.Fe_.create()).o5n = true;
            e.n5n = t * TimeUtil_1.TimeUtil.InverseMillisecond;
            CombatMessage_1.CombatNet.Send(29477, i, e);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTimeStopRequest, true, t);
            EventSystem_1.EventSystem.EmitWithTarget(i, EventDefine_1.EEventName.OnTimeStopRequest, true, t);
          } else {
            CombatLog_1.CombatLog.Error("Skill", i, "重复进入副本时停，将不做处理");
          }
        }
      }
    }
  }
  static EndTimeStopRequest(e) {
    var t;
    if (ControllerHolder_1.ControllerHolder.TimeController.RemoveTimeStopRequestLock(e) && (e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid) {
      t = e.Entity;
      CombatLog_1.CombatLog.Info("Skill", t, "结束副本时停");
      this.Abd(e);
      (e = Protocol_1.Aki.Protocol.Fe_.create()).o5n = false;
      e.n5n = 0;
      CombatMessage_1.CombatNet.Send(29477, t, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTimeStopRequest, false, 0);
      EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnTimeStopRequest, false, 0);
    }
  }
  static IsTsActor(e) {
    e = e?.Entity?.GetComponent(0)?.GetEntityType();
    return e === Protocol_1.Aki.Protocol.kks.Proto_Player || e === Protocol_1.Aki.Protocol.kks.Proto_Npc || e === Protocol_1.Aki.Protocol.kks.Proto_Monster || e === Protocol_1.Aki.Protocol.kks.Proto_Vision;
  }
  static Log(e, t, i, r, ...l) {
    if (Info_1.Info.IsPlayInEditor) {
      var o = i.GetComponent(22);
      if (o?.Valid) {
        switch (t) {
          case 0:
            o.AddSkillLogString(r, ...l);
            break;
          case 1:
            o.AddSkillBehaviorLogString(r, ...l);
            break;
          default:
            CombatLog_1.CombatLog.Error("Skill", i, "未知技能日志类型", ["skillLogType", t]);
            return;
        }
      }
    }
    switch (e) {
      case 0:
        CombatLog_1.CombatLog.Info("Skill", i, r, ...l);
        break;
      case 1:
        break;
      case 2:
        CombatLog_1.CombatLog.Warn("Skill", i, r, ...l);
        break;
      case 3:
        CombatLog_1.CombatLog.Error("Skill", i, r, ...l);
    }
  }
}
(exports.SkillUtils = SkillUtils).Lz = Vector_1.Vector.Create();
SkillUtils.uoe = undefined;
SkillUtils.zpe = (e, t) => {
  SkillUtils.EndAbsoluteTimeStop(t.Id);
  SkillUtils.EndTimeStopRequest(t.Id);
}; //# sourceMappingURL=SkillUtils.js.map