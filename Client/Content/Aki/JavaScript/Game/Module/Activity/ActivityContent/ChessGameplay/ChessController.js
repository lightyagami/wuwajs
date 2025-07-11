"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChessController = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
class ChessController extends ControllerBase_1.ControllerBase {
  static async InitChessGameAsync(e, o, r, a = 0) {
    ModelManager_1.ModelManager.ChessModel.ClearAll();
    var t = [];
    for (const M of o) {
      t.push(M.CreatureDataId);
    }
    const s = new CustomPromise_1.CustomPromise();
    WaitEntityTask_1.WaitEntityTask.Create("InitChessGame", t, () => {
      s.SetResult();
    });
    await s.Promise;
    ModelManager_1.ModelManager.ChessModel.UpdateChessMode(a);
    for (const i of e) {
      ModelManager_1.ModelManager.ChessModel.AddChessboardPoint(i.Id, i.Location, i.Rotation, i.SortIndex);
    }
    for (const l of o) {
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntity(l.CreatureDataId);
      if (n?.IsInit) {
        ModelManager_1.ModelManager.ChessModel.AddChessItem(l.Id, n);
        ChessController.TeleportItemToPoint(l.Id, l.InitPointId);
      }
    }
    ModelManager_1.ModelManager.ChessModel.UpdateTerminalPoint(r);
  }
  static async MoveItemToPointAsync(e, o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Chess", 48, "ChessItemMove Begin", ["ItemId", e], ["TargetPointId", o]);
    }
    var r;
    var a = ModelManager_1.ModelManager.ChessModel.GetChessItem(e);
    var t = ModelManager_1.ModelManager.ChessModel.GetChessboardPoint(o);
    if (a && t) {
      a.GetCurrentPoint()?.ItemLeave(a);
      r = t.GetMoveLocationAndRotator();
      await a.MoveAsync(r[0], r[1]);
      t.ItemEnter(a);
      ChessController.eOc();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Chess", 48, "ChessItemMove End", ["ItemId", e], ["TargetPointId", o]);
    }
  }
  static async ChessItemPerformAsync(e, o) {
    e = ModelManager_1.ModelManager.ChessModel.GetChessItem(e);
    if (e) {
      await e.PerformAsync(o);
    }
  }
  static TeleportItemToPoint(e, o) {
    var r;
    var e = ModelManager_1.ModelManager.ChessModel.GetChessItem(e);
    var o = ModelManager_1.ModelManager.ChessModel.GetChessboardPoint(o);
    if (e && o) {
      e.GetCurrentPoint()?.ItemLeave(e);
      r = o.GetMoveLocationAndRotator();
      e.Teleport(r[0], r[1]);
      o.ItemEnter(e);
      ChessController.eOc();
    }
  }
  static ChangeItemToMaxPriorityInPoint(e) {
    e = ModelManager_1.ModelManager.ChessModel.GetChessItem(e);
    e?.GetCurrentPoint()?.ChangeItemToMaxPriority(e);
    ChessController.eOc();
  }
  static eOc() {
    ModelManager_1.ModelManager.ChessModel.CacheRankingItemIdList = undefined;
  }
  static GetRankingItemIdList() {
    var e = ModelManager_1.ModelManager.ChessModel.CacheRankingItemIdList;
    if (e) {
      return e;
    }
    e = ModelManager_1.ModelManager.ChessModel.GetTerminalPoint();
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Chess", 48, "未设置终点，无法比较优先级");
      }
      return ModelManager_1.ModelManager.ChessModel.GetChessItemIdList();
    }
    const t = e.GetSortIndex();
    e = ModelManager_1.ModelManager.ChessModel.GetChessItemIdList((e, o) => {
      var r = e.GetReachTerminalTimes();
      var a = o.GetReachTerminalTimes();
      if (r !== a) {
        return a - r;
      } else {
        a = e.GetCurrentPoint();
        r = o.GetCurrentPoint();
        if (a && r) {
          if (a.GetId() === r.GetId()) {
            return a.ComparePriority(e, o);
          } else {
            e = t - a.GetSortIndex();
            o = t - r.GetSortIndex();
            if (e == 0) {
              return 1;
            } else if (o == 0) {
              return -1;
            } else if (e * o > 0) {
              return e - o;
            } else {
              return o - e;
            }
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Chess", 48, "棋子所在点位不存在");
          }
          return 0;
        }
      }
    });
    return ModelManager_1.ModelManager.ChessModel.CacheRankingItemIdList = e;
  }
}
exports.ChessController = ChessController;
//# sourceMappingURL=ChessController.js.map