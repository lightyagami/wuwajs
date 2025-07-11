"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionRunner = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletConstant_1 = require("../BulletConstant");
const BulletActionCenter_1 = require("./BulletActionCenter");
class BulletActionRunner {
  constructor() {
    this.AVo = new BulletActionCenter_1.BulletActionCenter();
    this.ac = 0;
    this.PVo = [];
    this.xVo = [];
    this.wVo = undefined;
  }
  Init() {
    this.AVo.Init();
  }
  Clear() {
    this.AVo.Clear();
  }
  GetActionCenter() {
    return this.AVo;
  }
  Pause() {
    if (this.ac !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Temp", 17, "当前不是空闲状态，不允许暂停");
      }
    } else {
      this.ac = 1;
    }
  }
  Resume() {
    if (this.ac !== 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Temp", 17, "当前不是暂停状态");
      }
    } else {
      this.ac = 0;
    }
  }
  Run(t = 0, e = false) {
    if (this.ac !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "当前不是空闲状态，不允许切换到运行状态");
      }
    } else {
      BulletActionRunner.BVo.Start();
      this.ac = 2;
      var o = ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap();
      if (t > 0) {
        this.PVo.length = 0;
        this.xVo.length = 0;
        for (const i of o.values()) {
          var r = i.GetBulletInfo();
          this.PVo.push(r);
        }
      }
      this.bVo(t, e);
      this.PVo.length = 0;
      while (this.xVo.length > 0) {
        var l = this.PVo;
        this.PVo = this.xVo;
        this.xVo = l;
        this.bVo(0);
        this.PVo.length = 0;
      }
      BulletActionRunner.BVo.Stop();
      this.ac = 3;
      ModelManager_1.ModelManager.BulletModel.ClearDestroyedBullets();
      this.ac = 0;
    }
  }
  bVo(t = 0, e = false) {
    let o = 0;
    var r = this.AVo;
    for (const s of this.PVo) {
      if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
        o = cpp_1.KuroTime.GetMilliseconds64();
      }
      try {
        this.wVo = s;
        if (t > 0) {
          var l = s.PersistentActionList;
          if (e) {
            for (const u of l) {
              u.AfterTick(t);
            }
          } else {
            for (const a of l) {
              a.Tick(t);
            }
          }
          for (let t = l.length - 1; t >= 0; t--) {
            var i = l[t];
            if (i.IsFinish) {
              l.splice(t, 1);
              r.RecycleBulletAction(i);
            }
          }
        }
        while (s.ActionInfoList.length > 0 || s.NextActionInfoList.length > 0) {
          for (const c of s.ActionInfoList) {
            var n = r.CreateBulletAction(c.Type);
            if (BulletConstant_1.BulletConstant.OpenActionStat) {
              BulletActionRunner.qVo[c.Type]?.Start();
              n.Execute(s, c);
              BulletActionRunner.qVo[c.Type]?.Stop();
            } else {
              n.Execute(s, c);
            }
            if (n.IsInPool || n.IsFinish) {
              r.RecycleBulletAction(n);
            } else {
              s.PersistentActionList.push(n);
            }
          }
          s.SwapActionInfoList();
        }
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Bullet", 17, "Run BulletAction Error", t, ["BulletEntityId", s.BulletEntityId], ["BulletRowName", s.BulletRowName], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "Run BulletAction Error", ["BulletEntityId", s.BulletEntityId], ["BulletRowName", s.BulletRowName], ["error", t]);
        }
      }
      if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
        PerformanceController_1.PerformanceController.CollectTickPerformanceInfo("Bullet", false, cpp_1.KuroTime.GetMilliseconds64() - o, 1, s.BornFrameCount);
      }
    }
    this.wVo = undefined;
  }
  AddAction(t, e) {
    switch (this.ac) {
      case 0:
        t.ActionInfoList.push(e);
        this.PVo.push(t);
        this.Run();
        break;
      case 1:
        t.ActionInfoList.push(e);
        break;
      case 2:
        t.NextActionInfoList.push(e);
        if (t !== this.wVo) {
          this.xVo.push(t);
        }
        break;
      case 3:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "清理子弹数据期间不允许有新的行为进来，请检查代码逻辑");
        }
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "当前状态异常");
        }
    }
  }
  IsRunning() {
    return this.ac === 2;
  }
  static InitStat() {
    if (BulletConstant_1.BulletConstant.OpenActionStat && !(this.qVo.length > 0)) {
      for (let t = 0; t < 19; t++) {
        if (t === 6) {
          this.qVo.push(Stats_1.Stat.Create("BulletActionInitCollision"));
        } else if (t === 3) {
          this.qVo.push(Stats_1.Stat.Create("BulletActionInitMove"));
        } else if (t === 7) {
          this.qVo.push(Stats_1.Stat.Create("BulletActionUpdateEffect"));
        } else if (t === 13) {
          this.qVo.push(Stats_1.Stat.Create("BulletActionDestroyBullet"));
        } else if (t === 11) {
          this.qVo.push(Stats_1.Stat.Create("BulletActionSummonBullet"));
        } else if (BulletConstant_1.BulletConstant.OpenAllActionStat) {
          this.qVo.push(Stats_1.Stat.CreateNoFlameGraph("BulletAction" + t));
        } else {
          this.qVo.push(undefined);
        }
      }
    }
  }
}
(exports.BulletActionRunner = BulletActionRunner).BVo = Stats_1.Stat.Create("BulletActionRunner");
BulletActionRunner.qVo = new Array(); //# sourceMappingURL=BulletActionRunner.js.map