"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityDebugUtils = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Global_1 = require("../../../../../Global");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SceneItemActorComponent_1 = require("../../../../SceneItem/SceneItemActorComponent");
const AnimalStateMachineComponent_1 = require("../../../Animal/Component/AnimalStateMachineComponent");
class EntityDebugUtils {
  static GetDebugEntityNameList() {
    if (!this.$Ko) {
      this.$Ko = UE.NewArray(UE.BuiltinString);
      this.YKo = new Map();
      this.JKo = new Map();
    }
    this.zKo();
    return this.$Ko;
  }
  static zKo() {
    this.$Ko.Empty();
    this.YKo.clear();
    this.JKo.clear();
    var t = [];
    var e = Global_1.Global.BaseCharacter.CharacterActorComponent;
    if (ModelManager_1.ModelManager?.GameModeModel?.WorldDone) {
      for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        if (a && a.Entity.Active && a.Entity !== e.Entity) {
          var n = a.Entity.GetComponent(0);
          var r = n?.GetEntityType();
          if (r) {
            switch (r) {
              case Protocol_1.Aki.Protocol.kks.Proto_Npc:
              case Protocol_1.Aki.Protocol.kks.Proto_Monster:
              case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
              case Protocol_1.Aki.Protocol.kks.HI_:
              case Protocol_1.Aki.Protocol.kks.Proto_Custom:
              case Protocol_1.Aki.Protocol.kks.Proto_Animal:
                var i = Vector_1.Vector.Create();
                (ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(a)?.ActorLocationProxy ?? Vector_1.Vector.Create(n.GetLocation())).Subtraction(e.ActorLocationProxy, i);
                var i = i.SizeSquared();
                t.push({
                  Entity: a.Entity,
                  Distance: i
                });
            }
          }
        }
      }
      t.sort((t, e) => t.Distance - e.Distance);
      t.forEach(t => {
        this.ZKo(t.Entity);
      });
    }
  }
  static ZKo(t) {
    var e = t.GetComponent(1);
    var n = t.GetComponent(0);
    var e = `[${n?.GetPbDataId() ?? "?"}] ${e?.Owner?.GetName() ?? "?"}`;
    e += ` (${t.GetComponent(118)?.PawnName ?? n?.GetBaseInfo()?.TidName ?? "无名字"})`;
    this.$Ko.Add(e);
    this.YKo.set(e, t.Id);
    this.JKo.set(t.Id, e);
  }
  static GetSelectedEntityId(t) {
    return t && this.YKo && this.YKo.get(t) || 0;
  }
  static GetDebugBaseInfo(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (!e) {
      return "无";
    }
    var n = e.GetComponent(0);
    if (!n) {
      return "无";
    }
    if (!e?.IsInit) {
      return "实体尚未完成Init";
    }
    var r = e.GetComponent(1);
    var i = e.GetComponent(118);
    var a = e.GameBudgetManagedToken ? cpp_1.FKuroGameBudgetAllocatorInterface.GetGameBudgetDebugString(e.GameBudgetManagedToken) : "Null";
    var o = n.GetOwnerIncId();
    var o = ModelManager_1.ModelManager.CreatureModel?.GetPbDataIdByEntity(ModelManager_1.ModelManager.CreatureModel?.GetEntity(o));
    let s = "Name: " + (i?.PawnName ?? "无名字");
    s = (s = (s = (s = (s = (s = (s += "\t\t") + "TidName: " + (n.GetBaseInfo()?.TidName ?? "无名字") + "\t\t") + "EntityId: " + t + "\t\t") + "PbDataId: " + n.GetPbDataId() + "\t\t") + "CreatureDataId: " + n.GetCreatureDataId() + "\t\t") + "ModelId: " + n.GetModelId() + "\t\t") + "OwnerPbDataId: " + o + "\t\t";
    if (r instanceof SceneItemActorComponent_1.SceneItemActorComponent) {
      s += "SceneInteractActorState: " + r.GetInteractionMainActor()?.GetCurrentState();
    }
    s = `${s = `${s += "\n\n"}GameBudgetToken: ${e.GameBudgetManagedToken}
`}GameBudgetInfo:
${a} 

`;
    var i = e.GetComponent(131);
    if (i) {
      s = `${s}SceneItemAttributeId:
${i.AttributeIdSet}

`;
    }
    s = (s += "EntityTag: \n") + this.GetEntityCommonTagDebugString(t) + "\n\n";
    var o = e.GetComponent(86);
    if (o) {
      s = (s = `${(s = (s = `${(s = (s += `范围组件内实体(客户端)列表: 
`) + this.GetInRangeLocalEntityListDebugString(t)) + "\n\n"}范围组件内Actor(客户端)列表: 
`) + this.GetInRangeActorListDebugString(t)) + "\n\n"}范围组件内实体(服务端)列表: 
`) + this.GetInRangeOnlineEntityListDebugString(t) + "\n\n";
    }
    var a = e.GetComponent(122);
    if (a) {
      s = (s = (s = s + ("进入逻辑范围: " + a.IsInLogicRange) + "\t\t") + "LogicRange: " + a.LogicRange + "\t\t") + "PlayerDistance: " + a.PlayerDist + "\n\n";
    }
    var i = e.GetComponent(131);
    if (i) {
      s = (s = (s += "SceneItem属性:\t\t") + "IsLocked: " + i.IsLocked + "\t\t") + "IsMoving: " + i.IsMoving + "\n\n";
    }
    var o = e.GetComponent(157);
    if (o) {
      s = (s += "SceneItemManipulable属性:\t\t") + "State: " + o.GetState() + "\n\n";
    }
    var t = e.GetComponent(198);
    if (t) {
      s = (s = s + ("启用交互: " + t.DebugInteractOpened) + "\t\t") + "定时器开启: " + t.DebugTimerRunning + "\n\n";
    }
    var a = e.GetComponent(103);
    if (a) {
      s = (s = s + ("启用销毁: " + !!a.DeadActions) + "\t\t") + "耐久: " + n.GetDurabilityValue() + "\n\n";
    }
    var i = e.GetComponent(14);
    if (i) {
      o = i.CurrentState();
      t = AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(o);
      s = `${s}动物状态: ${o}-${AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetStateName(t)}

`;
    }
    var a = n.GetInitLocation();
    if (a) {
      s = `${s}初始位置: [${a.X.toFixed(2)}, ${a.Y.toFixed(2)}, ${a.Z.toFixed(2)}]

`;
    }
    var i = r?.ActorLocationProxy;
    if (i) {
      s = `${s}当前位置: [${i.X.toFixed(2)}, ${i.Y.toFixed(2)}, ${i.Z.toFixed(2)}]

`;
    }
    var o = r?.Owner;
    if (o) {
      t = o?.D_GetVelocity();
      s = (s += `Self Velocity: [${t.X.toFixed(2)}, ${t.Y.toFixed(2)}, ${t.Z.toFixed(2)}]`) + this.eQo(o) + "\n\n";
    }
    var n = e.GetComponent(129);
    if (n) {
      s = (s += `SceneItemMove信息:
`) + n.GetDebugString() + "\n\n";
    }
    var a = e.GetComponent(283);
    if (a) {
      s = (s += `Ai追逐信息:
`) + a.GetDebugString() + "\n\n";
    }
    var i = e.GetComponent(123);
    return s = i ? (s += `TimeScale信息:
`) + i.GetDebugString() + "\n\n" : s;
  }
  static eQo(t, n = 1) {
    let r = "";
    var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
    t.GetAttachedActors(e, true);
    var i = (0, puerts_1.$unref)(e);
    for (let e = 0; e < i.Num(); e++) {
      var a = i.Get(e);
      var o = a.D_GetVelocity();
      r += "\n";
      let t = n;
      while (t-- > 0) {
        r += "\t\t";
      }
      r = (r = `${r += `[${UE.KismetSystemLibrary.GetDisplayName(a)}] Velocity: `}[${o.X}, ${o.Y}, ${o.Z}]`) + this.eQo(a, n + 1);
    }
    return r;
  }
  static GetInteractionDebugInfos(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) {
      return "无";
    }
    let e = "";
    var n = t.GetComponent(122);
    if (n) {
      e += n.GetDebugString();
    }
    var n = t.GetComponent(120);
    if (n) {
      e += n.GetDebugString();
    }
    e += "\n";
    var n = t.GetComponent(198);
    if (n && (t = n.GetInteractController())) {
      return e + t.GetInteractionDebugInfos();
    } else {
      return e;
    }
  }
  static GetEntityCommonTagDebugString(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) {
      return "无";
    }
    let e = t.GetComponent(206)?.GetTagDebugStrings()?.trim();
    return e = e && e.length !== 0 ? e : "无";
  }
  static GetInRangeLocalEntityListDebugString(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (!e) {
      return "无";
    }
    t = e.GetComponent(86)?.GetEntitiesInRangeLocal();
    let n = "";
    if (t?.size) {
      for (var [, r] of t) {
        var i = r.Entity?.GetComponent(1);
        var r = r.Entity?.GetComponent(0);
        var i = `[${r?.GetPbDataId() ?? "?"}] ${i?.Owner?.GetName() ?? "?"}`;
        i += ` (${e.GetComponent(118)?.PawnName ?? r?.GetBaseInfo()?.TidName ?? "无名字"})`;
        n += `${i}
`;
      }
      n = n.trimEnd();
    }
    return n = n && n.length !== 0 ? n : "无";
  }
  static GetInRangeOnlineEntityListDebugString(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (!e) {
      return "无";
    }
    t = e.GetComponent(86)?.GetEntitiesInRangeOnline();
    let n = "";
    if (t?.size) {
      for (var [, r] of t) {
        var i = r.Entity?.GetComponent(1);
        var r = r.Entity?.GetComponent(0);
        var i = `[${r?.GetPbDataId() ?? "?"}] ${i?.Owner?.GetName() ?? "?"}`;
        i += ` (${e.GetComponent(118)?.PawnName ?? r?.GetBaseInfo()?.TidName ?? "无名字"})`;
        n += `${i}
`;
      }
      n = n.trimEnd();
    }
    return n = n && n.length !== 0 ? n : "无";
  }
  static GetInRangeActorListDebugString(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) {
      return "无";
    }
    t = t.GetComponent(86)?.GetActorsInRangeLocal();
    let e = "";
    if (t?.size) {
      for (const n of t) {
        if (n?.IsValid()) {
          e += `${UE.KismetSystemLibrary.GetDisplayName(n)}
`;
        }
      }
      e = e.trimEnd();
    }
    return e = e && e.length !== 0 ? e : "无";
  }
  static GetDebugEntityActor(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      t = t.GetComponent(1);
      if (t) {
        return t.Owner;
      }
    }
  }
  static GetDebugEntityName(t) {
    if (!this.JKo) {
      EntityDebugUtils.GetDebugEntityNameList();
    }
    return this.JKo.get(t);
  }
  static GetEntityPbDataId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t = t && t.GetComponent(0)) {
      return t.GetPbDataId();
    } else {
      return 0;
    }
  }
  static GetEntityTimeScale(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t = t && t.GetComponent(123)) {
      return t.CurrentTimeScale;
    } else {
      return -1;
    }
  }
  static SetEntityTimeScale(t, e) {
    var n;
    var r = EntitySystem_1.EntitySystem.Get(t);
    if (r &&= r.GetComponent(123)) {
      if ((n = this.Hs1.get(t)) !== undefined) {
        r.RemoveTimeScale(n);
        this.Hs1.delete(t);
      }
      n = r.SetTimeScale(Infinity, e, undefined, Infinity, 0);
      this.Hs1.set(t, n);
    }
  }
}
(exports.EntityDebugUtils = EntityDebugUtils).Hs1 = new Map();
//# sourceMappingURL=EntityDebugUtils.js.map