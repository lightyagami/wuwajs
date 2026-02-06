"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../Module/Abilities/FormationAttributeController");
const SkillCdController_1 = require("../../Module/Battle/SkillCdController");
const BulletUtil_1 = require("../../NewWorld/Bullet/BulletUtil");
const CombatLog_1 = require("../../Utils/CombatLog");
const TIME_STOP_DISTANCE = 20000;
class TimeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharBornFinished, this.NYs);
    return true;
  }
  static OnTick(e) {}
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharBornFinished, this.NYs);
    if (this.FBe !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.FBe);
      this.FBe = undefined;
    }
    this.Qhh.clear();
    return true;
  }
  static AddLock(e, t) {
    if (this.Qhh.has(e)) {
      CombatLog_1.CombatLog.Error("Skill", e, "同一实体重复添加时停，将不被处理");
      return false;
    } else {
      this.Qhh.set(e, {
        StopMove: t
      });
      EntitySystem_1.EntitySystem.Get(e)?.GetComponent(133)?.AddDelayLock("ANS AbsoluteTimeStop Role");
      this.Khh();
      return true;
    }
  }
  static RemoveLock(e) {
    return !!this.Qhh.delete(e) && (EntitySystem_1.EntitySystem.Get(e)?.GetComponent(133)?.RemoveDelayLock("ANS AbsoluteTimeStop Role"), this.Khh(), true);
  }
  static Khh() {
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      this.Qhh.clear();
    }
    var e = new Array();
    for (const i of this.Qhh.keys()) {
      var t = EntitySystem_1.EntitySystem.Get(i);
      if (!t || !t?.Valid) {
        e.push(i);
      }
    }
    for (const o of e) {
      this.Qhh.delete(o);
    }
    var r = this.Qhh.size > 0;
    if (this.$hh !== r || !!r) {
      this.$hh = r;
      if (this.$hh) {
        this.Xhh();
      } else {
        this.Yhh();
      }
    }
  }
  static Xhh() {
    let e = true;
    for (const r of this.Qhh.values()) {
      if (!r.StopMove) {
        e = false;
        break;
      }
    }
    var t = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(TIME_STOP_DISTANCE, 248, t, true, true);
    for (const i of t) {
      if (i.IsInit) {
        if (this.Qhh.has(i.Id)) {
          this.zhh(i);
        } else {
          {
            let e = i;
            let t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(e.Entity?.GetComponent(0)?.GetSummonerId() ?? -1);
            let r = false;
            while (t && t !== e) {
              if (this.Qhh.has(t.Id)) {
                r = true;
                break;
              }
              e = t;
              t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t.Entity?.GetComponent(0)?.GetSummonerId() ?? -1);
            }
            if (r) {
              this.zhh(i);
              continue;
            }
          }
          this.Jhh(i, e);
        }
      }
    }
  }
  static Yhh() {
    for (const e of [...this.Zll]) {
      if (e.Valid) {
        this.zhh(e);
      }
    }
  }
  static Jhh(e, t) {
    this.Zll.add(e);
    e.Entity?.GetComponent(133)?.AddPauseLock("ANS AbsoluteTimeStop monster");
    var r = e.Entity?.GetComponent(48);
    if (t) {
      r?.AddPauseLock("ANS AbsoluteTimeStop monster");
    } else {
      r?.RemovePauseLock("ANS AbsoluteTimeStop monster");
    }
    BulletUtil_1.BulletUtil.FrozenCharacterBullet(e.Id);
  }
  static zhh(e) {
    this.Zll.delete(e);
    e.Entity?.GetComponent(133)?.RemovePauseLock("ANS AbsoluteTimeStop monster");
    e.Entity?.GetComponent(48)?.RemovePauseLock("ANS AbsoluteTimeStop monster");
    BulletUtil_1.BulletUtil.UnFrozenCharacterBullet(e.Id);
  }
  static AddTimeStopRequestLock(e) {
    if (this.VXf.has(e)) {
      CombatLog_1.CombatLog.Error("Skill", e, "同一实体重复添加副本时停请求，将不被处理");
      return false;
    } else {
      this.VXf.add(e);
      if (this.VXf.size === 1) {
        this.HXf();
      }
      return true;
    }
  }
  static RemoveTimeStopRequestLock(e) {
    return !!this.VXf.delete(e) && (this.VXf.size === 0 && this.jXf(), true);
  }
  static HXf() {
    Time_1.Time.SetFlowTimeDilation(0);
    for (const e of ModelManager_1.ModelManager.CreatureModel?.GetAllEntities() ?? []) {
      if (e.IsInit) {
        e.Entity?.GetComponent(185)?.AddPauseLock("ANS AbsoluteTimeStop");
        this.$Xf.add(e);
      }
    }
    FormationAttributeController_1.FormationAttributeController.AddPauseLock("ANS AbsoluteTimeStop");
    SkillCdController_1.SkillCdController.Pause(0, true);
  }
  static jXf() {
    Time_1.Time.SetFlowTimeDilation(ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
    for (const e of this.$Xf) {
      e.Entity?.GetComponent(185)?.RemovePauseLock("ANS AbsoluteTimeStop");
    }
    this.$Xf.clear();
    FormationAttributeController_1.FormationAttributeController.RemovePauseLock("ANS AbsoluteTimeStop");
    SkillCdController_1.SkillCdController.Pause(0, false);
  }
}
exports.TimeController = TimeController;
(_a = TimeController).vP_ = 0;
TimeController.VBe = 0;
TimeController.FBe = undefined;
TimeController.nye = () => {
  _a.FBe ||= TimerSystem_1.TimerSystem.Forever(_a.TimeCheckRequest, 3000);
};
TimeController.TimeCheck = (e, t, r, i, o) => {
  var l = _a.vP_;
  var s = _a.VBe;
  _a.vP_ = o - Time_1.Time.FlowTime;
  _a.VBe = Number(r) - Time_1.Time.WorldTime;
  Time_1.Time.SyncTime(t, i, _a.vP_, _a.VBe);
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncTime, t, i, _a.vP_, _a.VBe);
  if ((_a.VBe - s > 3000 || _a.vP_ - l > 3000) && Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("Battle", 35, "对时通知", ["clientTime", e], ["serverTime", t], ["serverStopTime", r], ["PredictedServerCombatTimeOffset", _a.vP_], ["PredictedServerStopTimeOffset", _a.VBe]);
  }
};
TimeController.TimeCheckNotify = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.D6n);
  var r = MathUtils_1.MathUtils.LongToNumber(e.pGs);
  var i = MathUtils_1.MathUtils.LongToNumber(e.SGs);
  var o = MathUtils_1.MathUtils.LongToNumber(e.QL_);
  var e = MathUtils_1.MathUtils.LongToNumber(e.MGs);
  _a.TimeCheck(t, r, i, o, e);
};
TimeController.TimeCheckRequest = () => {
  var e;
  if (Net_1.Net.IsServerConnected()) {
    (e = Protocol_1.Aki.Protocol.WCs.create()).D6n = Time_1.Time.WorldTime;
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      e.A6n = Time_1.Time.TimeDilation * UE.GameplayStatics.GetGlobalTimeDilation(GlobalData_1.GlobalData.World);
    } else {
      e.A6n = Time_1.Time.TimeDilation;
    }
    e.U6n = Time_1.Time.FlowTimeDilation;
    Net_1.Net.Call(20186, e, e => {
      var t;
      var r;
      var i;
      var o;
      if (e) {
        t = MathUtils_1.MathUtils.LongToNumber(e.D6n);
        r = MathUtils_1.MathUtils.LongToNumber(e.pGs);
        i = MathUtils_1.MathUtils.LongToNumber(e.SGs);
        o = MathUtils_1.MathUtils.LongToNumber(e.QL_);
        e = MathUtils_1.MathUtils.LongToNumber(e.MGs);
        _a.TimeCheck(t, r, i, o, e);
      }
    });
  }
};
TimeController.Qhh = new Map();
TimeController.Zll = new Set();
TimeController.$hh = false;
TimeController.NYs = e => {
  if (_a.$hh && (e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e))?.Valid) {
    _a.Jhh(e, true);
  }
};
TimeController.$Xf = new Set();
TimeController.VXf = new Set(); //# sourceMappingURL=TimeController.js.map