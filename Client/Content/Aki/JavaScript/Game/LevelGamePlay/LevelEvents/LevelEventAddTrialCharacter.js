"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventAddTrialCharacter = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleDefine_1 = require("../../Module/RoleUi/RoleDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddTrialCharacter extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.vLe = false;
    this.MLe = undefined;
    this.RMd = undefined;
    this.wMd = 0;
    this.LMd = undefined;
    this.PMd = undefined;
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 48, "[AddTrialEvent] 开始");
    }
    this.vLe = e.AutoChange ?? false;
    this.MLe = [];
    var r = e.CharacterGroupNew;
    if (r) {
      for (const i of r) {
        this.MLe.push(i.CharacterId);
      }
    } else {
      for (const o of e.CharacterGroup) {
        this.MLe.push(o);
      }
    }
    r = this.MLe.length;
    if (r <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 48, "[AddTrialEvent] 无试用角色id，完成");
      }
      this.AMd(false);
    } else {
      this.LMd = e.EnterRangeEntities;
      if (e = e.ActiveRange) {
        this.RMd = Vector_1.Vector.Create();
        this.RMd.FromConfigVector(e.CheckPoint);
        this.wMd = e.CheckEnterRange;
      } else {
        this.RMd = undefined;
        this.wMd = 0;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 48, "[AddTrialEvent] 开始等待");
      }
      this.PMd = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Event", 48, "[AddTrialEvent] 等待超时");
        }
        this.PMd = undefined;
        this.AMd(false);
      }, GlobalData_1.GlobalData.IsPlayInEditor ? 300000 : r * 10000, undefined, "WaitAddTrialCharacter");
    }
  }
  OnTick(e) {
    if (this.PMd) {
      if (this.DMd()) {
        if (ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady) {
          this.AMd(true);
        }
      } else if (this.xMd()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Event", 48, "[AddTrialEvent] 当前角色不在试用范围内");
        }
        this.AMd(false);
      }
    }
  }
  xMd() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (!e) {
      return false;
    }
    var t = this.RMd;
    var r = this.wMd;
    if (t && this.wMd > 0) {
      const o = e.GetComponent(3).ActorLocationProxy;
      return Vector_1.Vector.DistSquared2D(o, t) > r * r;
    }
    if (!this.LMd) {
      return false;
    }
    let i = 0;
    const o = e.GetComponent(3).ActorLocationProxy;
    var n = [];
    for (const s of this.LMd) {
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
      if (a) {
        if (!a.IsInit) {
          return false;
        }
        n.push(a.Entity);
      } else if (this.UMd(o, s)) {
        i++;
      }
    }
    if (i !== this.LMd.length) {
      for (const l of n) {
        if (l.GetComponent(89)?.IsOverlappingPlayer()) {
          return false;
        }
      }
    }
    return true;
  }
  DMd() {
    if (this.MLe && !(this.MLe.length <= 0)) {
      for (const e of this.MLe) {
        if (!this.tPr(e)) {
          return false;
        }
      }
    }
    return true;
  }
  UMd(e, t) {
    var r;
    var i;
    var o;
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    return !!t && !!(r = t.Transform) && !!(t = (0, IComponent_1.getComponent)(t.ComponentsData, "BaseInfoComponent")) && (i = IComponent_1.aoiXyLayerValues[t.AoiLayer], t = IComponent_1.aoizLayerValues[t.AoiZRadius], (o = Vector_1.Vector.Create()).FromConfigVector(r.Pos), Vector_1.Vector.DistSquared2D(o, e) > i * i || t > 0 && Math.abs(o.Z - e.Z) > t);
  }
  tPr(e) {
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
      var t = r.GetConfigId;
      if (!(t <= RoleDefine_1.ROBOT_DATA_MIN_ID)) {
        t = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t);
        if (t && t.GroupId === e) {
          return r;
        }
      }
    }
  }
  AMd(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 48, "[AddTrialEvent] 编队等待结束");
    }
    if (e && this.vLe && this.MLe && (e = this.tPr(this.MLe[0])) && !e.IsControl()) {
      ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(e.GetCreatureDataId());
    }
    this.PMd?.Remove();
    this.PMd = undefined;
    this.FinishExecute(true);
  }
}
exports.LevelEventAddTrialCharacter = LevelEventAddTrialCharacter;
//# sourceMappingURL=LevelEventAddTrialCharacter.js.map