"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillUtils = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Time_1 = require("../../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const GlobalData_1 = require("../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
const CharacterUtils_1 = require("../../../CharacterUtils");
const skillAbsoluteTimeStopSet = new Set();
const skillTimeStopRequestSet = new Set();
class SkillUtils {
  static GetSkillRotateDirect(t, o, l) {
    l.Reset();
    if (t?.Valid && o) {
      var e = t.Entity.GetComponent(1);
      if (e?.Valid) {
        var i = t.Entity.GetComponent(39);
        if (i?.Valid) {
          var r = e.ActorLocationProxy;
          switch (o.Type) {
            case 0:
              if (i.SkillTarget) {
                a = i.SkillTarget.Entity.CheckGetComponent(1);
                a = i.GetCurrentSkillRotateTargetDirect(a, r);
                l.DeepCopy(a);
              }
              break;
            case 1:
              var a = o.Target;
              SkillUtils.Lz.DeepCopy(a);
              SkillUtils.Lz.SubtractionEqual(r);
              l.DeepCopy(SkillUtils.Lz);
              break;
            case 2:
              a = o.Target;
              l.DeepCopy(a);
              break;
            case 3:
            case 6:
              {
                let e = undefined;
                if (!(e = o.Type === 3 ? BlackboardController_1.BlackboardController.GetEntityIdByEntity(t.Entity.Id, o.Target) : BlackboardController_1.BlackboardController.GetIntValueByEntity(t.Entity.Id, o.Target))) {
                  break;
                }
                a = EntitySystem_1.EntitySystem.Get(e)?.CheckGetComponent(1);
                if (!a?.Valid) {
                  break;
                }
                SkillUtils.Lz.DeepCopy(a.ActorLocationProxy);
                SkillUtils.Lz.SubtractionEqual(r);
                l.DeepCopy(SkillUtils.Lz);
                break;
              }
            case 4:
              a = BlackboardController_1.BlackboardController.GetVectorValueByEntity(t.Entity.Id, o.Target);
              if (a) {
                SkillUtils.Lz.DeepCopy(a);
                SkillUtils.Lz.SubtractionEqual(r);
                l.DeepCopy(SkillUtils.Lz);
              }
              break;
            case 5:
              a = BlackboardController_1.BlackboardController.GetVectorValueByEntity(t.Entity.Id, o.Target);
              if (a) {
                l.DeepCopy(a);
              }
              break;
            case 7:
              l.DeepCopy(e.ActorForwardProxy);
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
  static GetTargetSocketTransform(e, t, o, l, i = 0) {
    var r = e.GetComponent(3);
    var a = r?.Actor;
    if (a?.IsValid() && t) {
      a = a.Mesh;
      t = FNameUtil_1.FNameUtil.GetDynamicFName(t);
      if (a?.DoesSocketExist(t)) {
        return a.D_GetSocketTransform(t, o);
      }
    }
    if (i === 2) {
      return e.GetComponent(1)?.ActorTransform;
    } else if (i === 1) {
      return r?.ActorTransform;
    } else {
      return undefined;
    }
  }
  static oId(e) {
    if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  static nId(e) {
    if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  static BeginAbsoluteTimeStop(e, t, o) {
    var l;
    var i;
    var r;
    if (!ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      if ((l = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid && (i = l.Entity, CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(l))) {
        if (!!(r = i.GetComponent(0))?.IsRole() || !!r?.IsAutoRole()) {
          if (skillAbsoluteTimeStopSet.has(e)) {
            CombatLog_1.CombatLog.Error("Skill", i, "重复调用动画和子弹冻结功能，将不做处理");
          } else {
            this.oId(l);
            skillAbsoluteTimeStopSet.add(e);
            CombatLog_1.CombatLog.Info("Skill", i, "开启大招时停");
            ControllerHolder_1.ControllerHolder.TimeController.AddLock(e, o);
            (r = Protocol_1.Aki.Protocol.Qe_.create()).o5n = true;
            r.n5n = t * TimeUtil_1.TimeUtil.InverseMillisecond;
            CombatMessage_1.CombatNet.Send(25343, i, r);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbsoluteTimeStop, true, t);
            EventSystem_1.EventSystem.EmitWithTarget(i, EventDefine_1.EEventName.OnAbsoluteTimeStop, true, t);
          }
        } else {
          CombatLog_1.CombatLog.Error("Skill", i, "只有角色才能使用动画和子弹冻结功能");
        }
      }
    }
  }
  static EndAbsoluteTimeStop(e) {
    var t;
    if (!ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      if (skillAbsoluteTimeStopSet.has(e) && (skillAbsoluteTimeStopSet.delete(e), ControllerHolder_1.ControllerHolder.TimeController.RemoveLock(e), (e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid)) {
        t = e.Entity;
        CombatLog_1.CombatLog.Info("Skill", t, "结束大招时停");
        this.nId(e);
        (e = Protocol_1.Aki.Protocol.Qe_.create()).o5n = false;
        e.n5n = 0;
        CombatMessage_1.CombatNet.Send(25343, t, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbsoluteTimeStop, false, 0);
        EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnAbsoluteTimeStop, false, 0);
      }
    }
  }
  static BeginTimeStopRequest(e, t) {
    var o = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    if (o?.Valid) {
      var l = o.Entity;
      if (!ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
        if (Time_1.Time.FlowTimeDilation === 0) {
          CombatLog_1.CombatLog.Error("Skill", l, "重复进入副本时停，将不做处理");
        } else if (CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(o)) {
          if (skillTimeStopRequestSet.has(e)) {
            CombatLog_1.CombatLog.Error("Skill", l, "重复调用时停请求，将不做处理");
          } else {
            skillTimeStopRequestSet.add(e);
            this.oId(o);
            CombatLog_1.CombatLog.Info("Skill", l, "开启副本时停");
            Time_1.Time.SetFlowTimeDilation(0);
            for (const i of ModelManager_1.ModelManager.CreatureModel?.GetAllEntities() ?? []) {
              if (i.IsInit) {
                i.Entity?.GetComponent(175)?.AddPauseLock("ANS AbsoluteTimeStop");
                ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet.add(i);
              }
            }
            ControllerHolder_1.ControllerHolder.FormationAttributeController.AddPauseLock("ANS AbsoluteTimeStop");
            ControllerHolder_1.ControllerHolder.SkillCdController.Pause(0, true);
            e = Protocol_1.Aki.Protocol.Fe_.create();
            e.o5n = true;
            e.n5n = t * TimeUtil_1.TimeUtil.InverseMillisecond;
            CombatMessage_1.CombatNet.Send(24961, l, e);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTimeStopRequest, true, t);
            EventSystem_1.EventSystem.EmitWithTarget(l, EventDefine_1.EEventName.OnTimeStopRequest, true, t);
          }
        }
      }
    }
  }
  static EndTimeStopRequest(e) {
    if (!ModelManager_1.ModelManager.GameModeModel?.IsMulti && skillTimeStopRequestSet.has(e)) {
      skillTimeStopRequestSet.delete(e);
      Time_1.Time.SetFlowTimeDilation(ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      for (const o of ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet) {
        o.Entity?.GetComponent(175)?.RemovePauseLock("ANS AbsoluteTimeStop");
      }
      ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet.clear();
      ControllerHolder_1.ControllerHolder.FormationAttributeController.RemovePauseLock("ANS AbsoluteTimeStop");
      ControllerHolder_1.ControllerHolder.SkillCdController.Pause(0, false);
      var t;
      var e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
      if (e?.Valid) {
        t = e.Entity;
        CombatLog_1.CombatLog.Info("Skill", t, "结束副本时停");
        this.nId(e);
        (e = Protocol_1.Aki.Protocol.Fe_.create()).o5n = false;
        e.n5n = 0;
        CombatMessage_1.CombatNet.Send(24961, t, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTimeStopRequest, false, 0);
        EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnTimeStopRequest, false, 0);
      }
    }
  }
  static IsTsActor(e) {
    e = e?.Entity?.GetComponent(0)?.GetEntityType();
    return e === Protocol_1.Aki.Protocol.kks.Proto_Player || e === Protocol_1.Aki.Protocol.kks.Proto_Npc || e === Protocol_1.Aki.Protocol.kks.Proto_Monster || e === Protocol_1.Aki.Protocol.kks.Proto_Vision;
  }
  static Log(e, t, o, l, ...i) {
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      var r = o.GetComponent(22);
      if (r?.Valid) {
        switch (t) {
          case 0:
            r.AddSkillLogString(l, ...i);
            break;
          case 1:
            r.AddSkillBehaviorLogString(l, ...i);
            break;
          default:
            CombatLog_1.CombatLog.Error("Skill", o, "未知技能日志类型", ["skillLogType", t]);
            return;
        }
      }
    }
    switch (e) {
      case 0:
        CombatLog_1.CombatLog.Info("Skill", o, l, ...i);
        break;
      case 1:
        break;
      case 2:
        CombatLog_1.CombatLog.Warn("Skill", o, l, ...i);
        break;
      case 3:
        CombatLog_1.CombatLog.Error("Skill", o, l, ...i);
    }
  }
}
(exports.SkillUtils = SkillUtils).Lz = Vector_1.Vector.Create();
SkillUtils.uoe = undefined;
SkillUtils.zpe = (e, t) => {
  SkillUtils.EndAbsoluteTimeStop(t.Id);
  SkillUtils.EndTimeStopRequest(t.Id);
}; //# sourceMappingURL=SkillUtils.js.map