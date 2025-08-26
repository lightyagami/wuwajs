"use strict";

var __decorate = this && this.__decorate || function (e, t, i, r) {
  var s;
  var n = arguments.length;
  var o = n < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, i, r);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        o = (n < 3 ? s(o) : n > 3 ? s(t, i, o) : s(t, i)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(t, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientTriggerComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralController_1 = require("../../../../LevelGamePlay/LevelGeneralController");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController");
const UPDATE_INTERVAL = 2000;
let ClientTriggerComponent = class ClientTriggerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.vtn = undefined;
    this.Lo = undefined;
    this.HYo = 0;
    this.PAa = false;
    this.wAa = false;
    this.BAa = 0;
    this.bAa = 0;
    this.qAa = undefined;
    this.GAa = undefined;
    this.OAa = undefined;
    this.dwl = false;
    this.Cwl = undefined;
    this.s11 = 0;
    this.a11 = 0;
    this.h11 = undefined;
    this.l11 = undefined;
    this.ClientPrePerformancePreMessageId = BigInt(0);
    this.wS = undefined;
    this._un = undefined;
    this.zcn = (t, i) => {
      if (i?.Valid) {
        let e = false;
        var r;
        if (this.PAa && i.Entity.GetComponent(3)?.IsRoleAndCtrlByMe) {
          e = !this.qAa || !(this.qAa?.length > 0) || SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.qAa);
        }
        if (e = this.wAa && (r = i.Entity.GetComponent(0)) && (r = r.GetBaseInfo()) ? this.kAa(r.Category) : e) {
          if (t) {
            if (this.BAa) {
              this.bAa = e ? this.bAa++ : this.bAa;
              e = this.bAa === this.BAa;
            }
            if (e) {
              this._11(i);
            }
          } else {
            if (this.BAa) {
              this.bAa = e ? this.bAa-- : this.bAa;
              e = this.bAa === this.BAa - 1;
            }
            if (e) {
              this.c11(i);
            }
          }
        }
      }
    };
    this.Znn = e => {
      let t = false;
      var i;
      if (this.qAa && this.qAa?.length > 0) {
        t = SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.qAa);
      }
      if ((t = this.dwl ? !this.Cwl?.MatchRoleOption || SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.Cwl.MatchRoleOption) : t) && (i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity)) {
        if (e) {
          this._11(i);
        } else {
          this.c11(i);
        }
      }
    };
    this.VAa = () => {
      if (this.wS.size === 0) {
        this.HAa();
      } else if (this._un?.IsLocked) {
        this.HAa();
      } else {
        for (var [, e] of this.wS) {
          this.NAa(e);
        }
      }
    };
  }
  get Actions() {
    return (this.dwl ? this.Cwl : this.Lo?.OnTriggerEnter)?.Actions;
  }
  get ExitActions() {
    return (this.dwl ? this.Cwl?.ExitConfig : this.Lo?.OnTriggerExit)?.Actions;
  }
  OnInitData(e) {
    this.EIe = this.Entity.GetComponent(0);
    var t;
    var i;
    var r = this.EIe.GetPbEntityInitData()?.ComponentsData;
    return !!r && !(t = (0, IComponent_1.getComponent)(r, "ClientTriggerComponent"), r = (0, IComponent_1.getComponent)(r, "TriggerComponent"), t || r ? t && r?.ClientPrePerformance ? (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[ClientTriggerComponent] 配置出错！客户端触发器配置和触发器预表现配置同时存在", ["ConfigId", this.HYo]), 1) : ((i = this.Entity.GetComponent(122)) && !i.LogicRange && i.SetLogicRange(300), this.Lo = t, this.HYo = this.EIe.GetPbDataId(), this.wS = new Map(), this.BAa = this.Lo?.TriggerMatch?.EntityMatchCount || 0, this.h11 = this.Lo?.OnTriggerEnter.MaxTriggerTimes, this.l11 = this.Lo?.OnTriggerExit.MaxTriggerTimes, r?.ClientPrePerformance && (this.Cwl = r, this.dwl = true, this.h11 = r?.MaxTriggerTimes, (i = this.EIe.ComponentDataMap.get("hys")) ? this.ClientPrePerformancePreMessageId = MathUtils_1.MathUtils.LongToBigInt(i.hys._Vn) : Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 72, "[ClientTriggerComponent] 触发器客户端预表现的情况下，没有拿到TriggerComponentPb的ContextId")), 0) : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[ClientTriggerComponent] 配置出错！客户端触发器配置和触发器配置都缺失", ["ConfigId", this.HYo]), 1));
  }
  OnStart() {
    this.vtn = this.Entity.GetComponent(86);
    if (!this.vtn) {
      return false;
    }
    if (this.dwl) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Znn);
    } else if (this.Lo) {
      var e = this.Lo.TriggerMatch.EntityMatch;
      this._un = this.Entity.GetComponent(131);
      switch (e.Type) {
        case "AllCharacter":
          this.wAa = true;
          this.PAa = true;
          EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.zcn);
          break;
        case "DynamicEntityMatch":
          this.wAa = true;
          this.GAa = e.MatchEntity;
          EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.zcn);
          break;
        case "Player":
          this.PAa = e.ChangeRoleTrigger || false;
          this.qAa = e.MatchRoleOption;
          if (this.PAa) {
            EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.zcn);
          } else {
            EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Znn);
          }
      }
    }
    return true;
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.zcn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.zcn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Znn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Znn);
    }
    return !(this.Lo = undefined);
  }
  CreateTriggerContext(e, t, i) {
    return LevelGeneralContextDefine_1.TriggerContext.Create(this.Entity.Id, e, undefined, t, i);
  }
  _11(e) {
    if (this.h11 === undefined) {
      this.NAa(e);
    } else if (!(this.s11 >= this.h11)) {
      this.s11++;
      this.NAa(e);
    }
  }
  c11(e) {
    if (this.l11 === undefined) {
      this.FAa(e);
    } else if (!(this.a11 >= this.l11)) {
      this.a11++;
      this.FAa(e);
    }
  }
  jAa(e) {
    return !!e?.Valid && !this._un?.IsLocked && (!this.Lo?.OnTriggerEnter?.Condition || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.Lo.OnTriggerEnter.Condition, undefined, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id)));
  }
  WAa(e) {
    return !!e?.Valid && !this._un?.IsLocked && (!(e = this.Lo?.OnTriggerExit?.Condition) || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(e, undefined, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id)));
  }
  NAa(e) {
    if (e?.Valid && this.Utc(this.Lo?.OnTriggerEnter.OnlineDisableTip ?? false)) {
      if (this.jAa(e)) {
        if (e.Entity.GetComponent(0)?.GetCreatureDataId()) {
          if (this.Actions) {
            LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(this.Actions, this.CreateTriggerContext(e.Id, 1, this.dwl));
            this.wS.delete(e.Id);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("SceneItem", 31, "[ClientTriggerComponent] 没有配置触发行为");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 31, "[ClientTriggerComponent] 找不到target对应的CreatureId");
        }
      } else {
        this.wS.set(e.Id, e);
        this.QAa();
      }
    }
  }
  FAa(e) {
    if (e?.Valid && (this.wS.delete(e.Id), this.Utc(this.Lo?.OnTriggerExit.OnlineDisableTip ?? false)) && this.WAa(e)) {
      if (e.Entity.GetComponent(0)?.GetCreatureDataId()) {
        if (this.ExitActions) {
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(this.ExitActions, this.CreateTriggerContext(e.Id, 2, this.dwl));
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SceneItem", 7, "[ClientTriggerComponent] 没有配置触发行为");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[ClientTriggerComponent] 找不到target对应的CreatureId");
      }
    }
  }
  QAa() {
    this.OAa ||= TimerSystem_1.TimerSystem.Forever(this.VAa, UPDATE_INTERVAL);
  }
  HAa() {
    if (this.OAa) {
      TimerSystem_1.TimerSystem.Remove(this.OAa);
    }
    this.OAa = undefined;
  }
  kAa(e) {
    if (!this.GAa || this.GAa?.length <= 0) {
      return true;
    }
    for (const t of this.GAa) {
      if ((0, IUtil_1.isEntitiyMatch)(t, e)) {
        return true;
      }
    }
    return false;
  }
  Utc(e) {
    return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.EIe.GetEntityOnlineInteractType(), e);
  }
};
ClientTriggerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(252)], ClientTriggerComponent);
exports.ClientTriggerComponent = ClientTriggerComponent; //# sourceMappingURL=ClientTriggerComponent.js.map