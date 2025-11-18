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
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
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
    } else {
      this.Qhh.set(e, {
        StopMove: t
      });
    }
    EntitySystem_1.EntitySystem.Get(e)?.GetComponent(126)?.AddDelayLock("ANS AbsoluteTimeStop Role");
    this.Khh();
  }
  static RemoveLock(e) {
    this.Qhh.delete(e);
    EntitySystem_1.EntitySystem.Get(e)?.GetComponent(126)?.RemoveDelayLock("ANS AbsoluteTimeStop Role");
    this.Khh();
  }
  static Khh() {
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      this.Qhh.clear();
    }
    var e = new Array();
    for (const r of this.Qhh.keys()) {
      var t = EntitySystem_1.EntitySystem.Get(r);
      if (!t || !t?.Valid) {
        e.push(r);
      }
    }
    for (const o of e) {
      this.Qhh.delete(o);
    }
    var i = this.Qhh.size > 0;
    if (this.$hh !== i || !!i) {
      this.$hh = i;
      if (this.$hh) {
        this.Xhh();
      } else {
        this.Yhh();
      }
    }
  }
  static Xhh() {
    let e = true;
    for (const i of this.Qhh.values()) {
      if (!i.StopMove) {
        e = false;
        break;
      }
    }
    var t = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(TIME_STOP_DISTANCE, 248, t, true, true);
    for (const r of t) {
      if (r.IsInit) {
        if (this.Qhh.has(r.Id)) {
          this.zhh(r);
        } else {
          {
            let e = r;
            let t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(e.Entity?.GetComponent(0)?.GetSummonerId() ?? -1);
            let i = false;
            while (t && t !== e) {
              if (this.Qhh.has(t.Id)) {
                i = true;
                break;
              }
              e = t;
              t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t.Entity?.GetComponent(0)?.GetSummonerId() ?? -1);
            }
            if (i) {
              this.zhh(r);
              continue;
            }
          }
          this.Jhh(r, e);
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
    e.Entity?.GetComponent(126)?.AddPauseLock("ANS AbsoluteTimeStop monster");
    var i = e.Entity?.GetComponent(45);
    if (t) {
      i?.AddPauseLock("ANS AbsoluteTimeStop monster");
    } else {
      i?.RemovePauseLock("ANS AbsoluteTimeStop monster");
    }
    BulletUtil_1.BulletUtil.FrozenCharacterBullet(e.Id);
  }
  static zhh(e) {
    this.Zll.delete(e);
    e.Entity?.GetComponent(126)?.RemovePauseLock("ANS AbsoluteTimeStop monster");
    e.Entity?.GetComponent(45)?.RemovePauseLock("ANS AbsoluteTimeStop monster");
    BulletUtil_1.BulletUtil.UnFrozenCharacterBullet(e.Id);
  }
}
exports.TimeController = TimeController;
(_a = TimeController).vP_ = 0;
TimeController.VBe = 0;
TimeController.FBe = undefined;
TimeController.nye = () => {
  _a.FBe ||= TimerSystem_1.TimerSystem.Forever(_a.TimeCheckRequest, 3000);
};
TimeController.TimeCheck = (e, t, i, r, o) => {
  var s = _a.vP_;
  var l = _a.VBe;
  _a.vP_ = o - Time_1.Time.FlowTime;
  _a.VBe = Number(i) - Time_1.Time.WorldTime;
  Time_1.Time.SyncTime(t, r, _a.vP_, _a.VBe);
  if ((_a.VBe - l > 3000 || _a.vP_ - s > 3000) && Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("Battle", 35, "对时通知", ["clientTime", e], ["serverTime", t], ["serverStopTime", i], ["PredictedServerCombatTimeOffset", _a.vP_], ["PredictedServerStopTimeOffset", _a.VBe]);
  }
};
TimeController.TimeCheckNotify = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.D6n);
  var i = MathUtils_1.MathUtils.LongToNumber(e.pGs);
  var r = MathUtils_1.MathUtils.LongToNumber(e.SGs);
  var o = MathUtils_1.MathUtils.LongToNumber(e.QL_);
  var e = MathUtils_1.MathUtils.LongToNumber(e.MGs);
  _a.TimeCheck(t, i, r, o, e);
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
    Net_1.Net.Call(21575, e, e => {
      var t;
      var i;
      var r;
      var o;
      if (e) {
        t = MathUtils_1.MathUtils.LongToNumber(e.D6n);
        i = MathUtils_1.MathUtils.LongToNumber(e.pGs);
        r = MathUtils_1.MathUtils.LongToNumber(e.SGs);
        o = MathUtils_1.MathUtils.LongToNumber(e.QL_);
        e = MathUtils_1.MathUtils.LongToNumber(e.MGs);
        _a.TimeCheck(t, i, r, o, e);
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
TimeController.TimeStopBuffEntitySet = new Set(); //# sourceMappingURL=TimeController.js.map