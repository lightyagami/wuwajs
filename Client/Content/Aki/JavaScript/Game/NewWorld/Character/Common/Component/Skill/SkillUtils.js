"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillUtils = undefined;
const UE = require("ue");
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
  static GetSkillRotateDirect(t, l, i) {
    i.Reset();
    if (t?.Valid && l) {
      var e = t.Entity.GetComponent(1);
      if (e?.Valid) {
        var o = t.Entity.GetComponent(39);
        if (o?.Valid) {
          var r = e.ActorLocationProxy;
          switch (l.Type) {
            case 0:
              if (o.SkillTarget) {
                s = o.SkillTarget.Entity.CheckGetComponent(1);
                s = o.GetCurrentSkillRotateTargetDirect(s, r);
                i.DeepCopy(s);
              }
              break;
            case 1:
              var s = l.Target;
              SkillUtils.Lz.DeepCopy(s);
              SkillUtils.Lz.SubtractionEqual(r);
              i.DeepCopy(SkillUtils.Lz);
              break;
            case 2:
              s = l.Target;
              i.DeepCopy(s);
              break;
            case 3:
            case 6:
              {
                let e = undefined;
                if (!(e = l.Type === 3 ? BlackboardController_1.BlackboardController.GetEntityIdByEntity(t.Entity.Id, l.Target) : BlackboardController_1.BlackboardController.GetIntValueByEntity(t.Entity.Id, l.Target))) {
                  break;
                }
                s = EntitySystem_1.EntitySystem.Get(e)?.CheckGetComponent(1);
                if (!s?.Valid) {
                  break;
                }
                SkillUtils.Lz.DeepCopy(s.ActorLocationProxy);
                SkillUtils.Lz.SubtractionEqual(r);
                i.DeepCopy(SkillUtils.Lz);
                break;
              }
            case 4:
              s = BlackboardController_1.BlackboardController.GetVectorValueByEntity(t.Entity.Id, l.Target);
              if (s) {
                SkillUtils.Lz.DeepCopy(s);
                SkillUtils.Lz.SubtractionEqual(r);
                i.DeepCopy(SkillUtils.Lz);
              }
              break;
            case 5:
              s = BlackboardController_1.BlackboardController.GetVectorValueByEntity(t.Entity.Id, l.Target);
              if (s) {
                i.DeepCopy(s);
              }
              break;
            case 7:
              i.DeepCopy(e.ActorForwardProxy);
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
  static GetTargetSocketTransform(e, t, l, i, o = 0) {
    var r = e.GetComponent(3);
    var s = r?.Actor;
    if (s?.IsValid() && t) {
      s = s.Mesh;
      t = FNameUtil_1.FNameUtil.GetDynamicFName(t);
      if (s?.DoesSocketExist(t)) {
        return s.D_GetSocketTransform(t, l);
      }
    }
    if (o === 2) {
      return e.GetComponent(1)?.ActorTransform;
    } else if (o === 1) {
      return r?.ActorTransform;
    } else {
      return undefined;
    }
  }
  static Acd(e) {
    if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  static Dcd(e) {
    if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  static BeginAbsoluteTimeStop(e, t, l) {
    var i;
    var o;
    var r;
    if (!ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      if ((i = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid && (o = i.Entity, CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(i))) {
        if (!!(r = o.GetComponent(0))?.IsRole() || !!r?.IsAutoRole()) {
          if (skillAbsoluteTimeStopSet.has(e)) {
            CombatLog_1.CombatLog.Error("Skill", o, "重复调用动画和子弹冻结功能，将不做处理");
          } else {
            this.Acd(i);
            skillAbsoluteTimeStopSet.add(e);
            CombatLog_1.CombatLog.Info("Skill", o, "开启大招时停");
            ControllerHolder_1.ControllerHolder.TimeController.AddLock(e, l);
            (r = Protocol_1.Aki.Protocol.Qe_.create()).o5n = true;
            r.n5n = t * TimeUtil_1.TimeUtil.InverseMillisecond;
            CombatMessage_1.CombatNet.Send(23681, o, r);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbsoluteTimeStop, true, t);
            EventSystem_1.EventSystem.EmitWithTarget(o, EventDefine_1.EEventName.OnAbsoluteTimeStop, true, t);
          }
        } else {
          CombatLog_1.CombatLog.Error("Skill", o, "只有角色才能使用动画和子弹冻结功能");
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
        this.Dcd(e);
        (e = Protocol_1.Aki.Protocol.Qe_.create()).o5n = false;
        e.n5n = 0;
        CombatMessage_1.CombatNet.Send(23681, t, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbsoluteTimeStop, false, 0);
        EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnAbsoluteTimeStop, false, 0);
      }
    }
  }
  static BeginTimeStopRequest(e, t) {
    var l = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    if (l?.Valid) {
      var i = l.Entity;
      if (!ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
        if (Time_1.Time.FlowTimeDilation === 0) {
          CombatLog_1.CombatLog.Error("Skill", i, "重复进入副本时停，将不做处理");
        } else if (CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(l)) {
          if (skillTimeStopRequestSet.has(e)) {
            CombatLog_1.CombatLog.Error("Skill", i, "重复调用时停请求，将不做处理");
          } else {
            skillTimeStopRequestSet.add(e);
            this.Acd(l);
            CombatLog_1.CombatLog.Info("Skill", i, "开启副本时停");
            Time_1.Time.SetFlowTimeDilation(0);
            for (const o of ModelManager_1.ModelManager.CreatureModel?.GetAllEntities() ?? []) {
              if (o.IsInit) {
                o.Entity?.GetComponent(175)?.AddPauseLock("ANS AbsoluteTimeStop");
                ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet.add(o);
              }
            }
            ControllerHolder_1.ControllerHolder.FormationAttributeController.AddPauseLock("ANS AbsoluteTimeStop");
            ControllerHolder_1.ControllerHolder.SkillCdController.Pause(0, true);
            e = Protocol_1.Aki.Protocol.Fe_.create();
            e.o5n = true;
            e.n5n = t * TimeUtil_1.TimeUtil.InverseMillisecond;
            CombatMessage_1.CombatNet.Send(27986, i, e);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTimeStopRequest, true, t);
            EventSystem_1.EventSystem.EmitWithTarget(i, EventDefine_1.EEventName.OnTimeStopRequest, true, t);
          }
        }
      }
    }
  }
  static EndTimeStopRequest(e) {
    if (!ModelManager_1.ModelManager.GameModeModel?.IsMulti && skillTimeStopRequestSet.has(e)) {
      skillTimeStopRequestSet.delete(e);
      Time_1.Time.SetFlowTimeDilation(ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      for (const l of ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet) {
        l.Entity?.GetComponent(175)?.RemovePauseLock("ANS AbsoluteTimeStop");
      }
      ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet.clear();
      ControllerHolder_1.ControllerHolder.FormationAttributeController.RemovePauseLock("ANS AbsoluteTimeStop");
      ControllerHolder_1.ControllerHolder.SkillCdController.Pause(0, false);
      var t;
      var e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
      if (e?.Valid) {
        t = e.Entity;
        CombatLog_1.CombatLog.Info("Skill", t, "结束副本时停");
        this.Dcd(e);
        (e = Protocol_1.Aki.Protocol.Fe_.create()).o5n = false;
        e.n5n = 0;
        CombatMessage_1.CombatNet.Send(27986, t, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTimeStopRequest, false, 0);
        EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnTimeStopRequest, false, 0);
      }
    }
  }
}
(exports.SkillUtils = SkillUtils).Lz = Vector_1.Vector.Create();
SkillUtils.uoe = undefined;
SkillUtils.zpe = (e, t) => {
  SkillUtils.EndAbsoluteTimeStop(t.Id);
  SkillUtils.EndTimeStopRequest(t.Id);
}; //# sourceMappingURL=SkillUtils.js.map