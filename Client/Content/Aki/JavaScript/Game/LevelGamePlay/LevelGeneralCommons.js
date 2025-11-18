"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGeneralCommons = undefined;
const Log_1 = require("../../Core/Common/Log");
const ConditionGroupById_1 = require("../../Core/Define/ConfigQuery/ConditionGroupById");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../UniverseEditor/Interface/IAction");
const IComponent_1 = require("../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
class LevelGeneralCommons {
  static Init() {
    this.IUe = new Array();
    this.TUe = new Array();
  }
  static Clear() {
    this.IUe.length = 0;
    this.TUe.length = 0;
  }
  static AddPublicTag(e, t) {
    this.IUe.splice(0, this.IUe.length);
    this.IUe.push(e);
    ControllerHolder_1.ControllerHolder.CreatureController.AddPublicTags(t.GetEntityId(), this.IUe);
  }
  static RemovePublicTag(e, t) {
    this.IUe.splice(0, this.IUe.length);
    this.IUe.push(e);
    ControllerHolder_1.ControllerHolder.CreatureController.RemovePublicTags(t.GetEntityId(), this.IUe);
  }
  static FindTargetWithTag(e) {
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(e, this.TUe);
    if (this.TUe && this.TUe.length) {
      return ControllerHolder_1.ControllerHolder.CharacterController.GetActor(this.TUe[0]);
    }
  }
  static FindTargetsWithTag(e, t) {
    t.length = 0;
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(e, this.TUe);
    if (this.TUe && this.TUe.length) {
      for (const a of this.TUe) {
        if (ControllerHolder_1.ControllerHolder.CharacterController.GetActor(a)) {
          t.push(ControllerHolder_1.ControllerHolder.CharacterController.GetActor(a));
        }
      }
    }
  }
  static UpdateEntityTag(e, t, a) {
    var o;
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    if (r) {
      if (!(r = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(r))) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 7, "[ControllerHolder.LevelGeneralController.UpdateEntityTag] 无法找到对应表现Actor 修改tag", ["EntityId", e], ["Tag", t]);
        }
      }
      o = FNameUtil_1.FNameUtil.GetDynamicFName(t);
      if (a) {
        r.Tags.Add(o);
        this.AddPublicTag(t, r);
      } else if ((a = r.Tags.FindIndex(o)) !== -1) {
        r.Tags.RemoveAt(a);
        this.RemovePublicTag(t, r);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Level", 7, "[ControllerHolder.LevelGeneralController.UpdateEntityTag] 无法找到对应entity 修改tag", ["EntityId", e], ["Tag", t]);
    }
  }
  static GetConditionGroupHintText(e) {
    e = ConditionGroupById_1.configConditionGroupById.GetConfig(e);
    if (e) {
      return e.HintText;
    }
  }
  static PrechangeStateTag(e, t, a) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Entity", 31, "尝试通过ChangePerformanceTag方法更改服务器Tag", ["原因", a]);
    }
    a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (a) {
      if (a.IsInit) {
        this.LUe(e, a, t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 31, "[ChangePerformanceTag] 对应的Entity并未初始化完成", ["pbDataId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[ChangePerformanceTag] 找不到对应的Entity", ["pbDataId", e]);
    }
  }
  static LUe(e, t, a) {
    var o = t?.Entity?.GetComponent(200);
    if (o) {
      var r = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(a);
      if (o.HasTag(a)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Level", 39, "[ChangePerformanceTag] 已经拥有该状态Tag, 无需再切状态", ["TagName", r], ["pbDataId", e]);
        }
      } else {
        var n = t.Entity.GetComponent(0)?.GetPbEntityInitData();
        var i = (0, IComponent_1.getComponent)(n.ComponentsData, "EntityStateComponent");
        if ((0, IAction_1.isStateTypeContainsState)(i.Type, r)) {
          for (const g of (0, IAction_1.getStatesByType)(i.Type)) {
            var l = (0, IAction_1.getEntityStateTag)(i.Type, g);
            var l = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(l);
            o.RemoveServerTagByIdLocal(l, "ChangePerformanceTag");
          }
          o.AddServerTagByIdLocal(a, "ChangePerformanceTag");
          EventSystem_1.EventSystem.EmitWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, a);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 31, "[ChangePerformanceTag] 传入的Tag与Entity设定的状态类型不匹配", ["configComp", i.Type], ["TagName", r], ["pbDataId", e]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[ChangePerformanceTag] 找不到对应的LevelTagComponent", ["pbDataId", e]);
    }
  }
  static ChangeToDestroyState(e) {
    var t;
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (e && e.IsInit) {
      t = e.Entity.GetComponent(200);
      if ((e = e.Entity.GetComponent(137))?.StateTagId) {
        t?.RemoveServerTagByIdLocal(e?.StateTagId, "ChangeToDestroyState");
      }
      t?.AddServerTagByIdLocal(-1278190765, "ChangeToDestroyState");
    }
  }
  static RollbackDestroyState(e, t) {
    var a;
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (e && e.IsInit) {
      a = e.Entity.GetComponent(200);
      if (e.Entity.GetComponent(137)?.StateTagId) {
        a?.RemoveServerTagByIdLocal(-1278190765, "RollbackDestroyState");
      }
      a?.AddServerTagByIdLocal(t, "RollbackDestroyState");
    }
  }
}
(exports.LevelGeneralCommons = LevelGeneralCommons).IUe = undefined;
LevelGeneralCommons.TUe = undefined; //# sourceMappingURL=LevelGeneralCommons.js.map