"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AoiController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const MonsterBattleConfById_1 = require("../../../Core/Define/ConfigQuery/MonsterBattleConfById");
const MonsterSizeIdById_1 = require("../../../Core/Define/ConfigQuery/MonsterSizeIdById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class AoiController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(17992, AoiController.Jgr);
    Net_1.Net.Register(19063, AoiController.zgr);
    Net_1.Net.Register(16951, AoiController.Zgr);
    Net_1.Net.Register(21938, AoiController.e0r);
    Net_1.Net.Register(29745, AoiController.t0r);
    Net_1.Net.Register(16817, AoiController.i0r);
    Net_1.Net.Register(24033, AoiController.o0r);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(17992);
    Net_1.Net.UnRegister(19063);
    Net_1.Net.UnRegister(16951);
    Net_1.Net.UnRegister(21938);
    Net_1.Net.UnRegister(29745);
    Net_1.Net.UnRegister(16817);
    Net_1.Net.UnRegister(24033);
    return true;
  }
  static r0r(e, o, r) {
    let t = 0;
    if (r.CallbackCount === 0) {
      r.IsFinished = false;
    } else {
      t = r.UserData;
    }
    if (t >= e.length) {
      r.IsFinished = true;
    } else {
      e = e[t];
      r.UserData = ++t;
      if (e) {
        var l = MathUtils_1.MathUtils.LongToNumber(e.s5n);
        ControllerHolder_1.ControllerHolder.CreatureController.CheckDelayRemove(l, e.ZHn, e.v9n);
        ControllerHolder_1.ControllerHolder.CreatureController.CheckPendingRemove(l, e.ZHn, e.v9n);
        if (ModelManager_1.ModelManager.CreatureModel.RemoveCreaturePendingSet.has(l)) {
          ModelManager_1.ModelManager.CreatureModel.RemoveRemoveCreaturePending(l);
        } else if (ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(l)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("World", 3, "[AoiController.AddEntityPb]更新先行创建实体的信息。", ["CreatureDataId", l]);
          }
          const i = ModelManager_1.ModelManager.CreatureModel.GetEntity(l);
          i.Entity.GetComponent(0).SetPbDataByProtocol(e);
        } else {
          const i = ControllerHolder_1.ControllerHolder.CreatureController.CreateEntity(e, "AOI");
          if (i?.Valid && ModelManager_1.ModelManager.GameModeModel.MapDone) {
            ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(i);
          }
        }
      } else {
        r.IsFinished = true;
      }
    }
  }
  static s0r(e, o, r, t) {
    var o = o * 0.5;
    var l = new UE.VectorDouble(e.iPs + o, e.rPs + o, (e.nPs + e.oPs) * 0.5);
    var o = new UE.VectorDouble(o, o, (e.nPs - e.oPs) * 0.5);
    var e = new UE.Rotator(0, 0, 0);
    var t = t ? new UE.LinearColor(1, 0, 0, 1) : new UE.LinearColor(0, 1, 0, 1);
    var r = r / CommonDefine_1.MILLIONSECOND_PER_SECOND;
    UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.World, l, o, t, e, r, 1);
  }
  static StopDrawDebugVoxel() {
    if (this.a0r !== undefined) {
      if (TimerSystem_1.TimerSystem.Has(this.a0r)) {
        TimerSystem_1.TimerSystem.Remove(this.a0r);
      }
      this.a0r = undefined;
    }
    if (this.h0r !== undefined) {
      if (TimerSystem_1.TimerSystem.Has(this.h0r)) {
        TimerSystem_1.TimerSystem.Remove(this.h0r);
      }
      this.h0r = undefined;
    }
  }
  static AddMonsterSizeTag(e) {
    var o = e.GetComponent(0)?.GetMonsterComponent()?.FightConfigId;
    const r = e.GetComponent(209);
    if (o && r?.Valid && (e = MonsterBattleConfById_1.configMonsterBattleConfById?.GetConfig(o)) && (o = MonsterSizeIdById_1.configMonsterSizeIdById?.GetConfig(e.MonsterSizeId))) {
      o.MonsterSizeTag?.forEach(e => {
        r.AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
      });
    }
  }
}
exports.AoiController = AoiController;
(_a = AoiController).Jgr = e => {
  for (const r of e.PSs) {
    var o = MathUtils_1.MathUtils.LongToNumber(r);
    ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(o, "LeaveAoiNotify", Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce);
  }
};
AoiController.zgr = e => {
  for (const r of e.ZIs) {
    var o = MathUtils_1.MathUtils.LongToNumber(r.F4n);
    ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(o, "RemoveEntityAoiNotify", r.h5n);
  }
};
AoiController.Zgr = e => {
  ModelManager_1.ModelManager.AoiModel.MinCoordinate.X = e.uDs;
  ModelManager_1.ModelManager.AoiModel.MinCoordinate.Y = e.dDs;
  ModelManager_1.ModelManager.AoiModel.MaxCoordinate.X = e.cDs;
  ModelManager_1.ModelManager.AoiModel.MaxCoordinate.Y = e.mDs;
};
AoiController.e0r = (e, o) => {
  AoiController.r0r(e.zIs, e.lWn, o);
};
AoiController.t0r = e => {
  for (const r of e.ZIs) {
    var o = MathUtils_1.MathUtils.LongToNumber(r.F4n);
    ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(o, "EntityRemoveNotify", r.h5n);
  }
};
AoiController.h0r = undefined;
AoiController.a0r = undefined;
AoiController.o0r = e => {
  var o = TimerSystem_1.TimerSystem.Forever(() => {
    _a.s0r(e.ePs, e.zAs, 2000, e.tPs);
  }, 2000);
  if (o) {
    if (_a.a0r !== undefined && TimerSystem_1.TimerSystem.Has(_a.a0r)) {
      TimerSystem_1.TimerSystem.Remove(_a.a0r);
    }
    _a.a0r = o;
  }
};
AoiController.i0r = o => {
  var e = TimerSystem_1.TimerSystem.Forever(() => {
    for (const e of o.ZAs) {
      _a.s0r(e, o.zAs, 2000);
    }
  }, 2000);
  if (e) {
    if (_a.h0r !== undefined && TimerSystem_1.TimerSystem.Has(_a.h0r)) {
      TimerSystem_1.TimerSystem.Remove(_a.h0r);
    }
    _a.h0r = e;
  }
}; //# sourceMappingURL=AoiController.js.map