"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayReportController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class LevelPlayReportController extends UiControllerBase_1.UiControllerBase {
  static async RequestSimpleTrackReportAsync() {
    var e = Protocol_1.Aki.Protocol.Lp_.create();
    var e = await Net_1.Net.CallAsync(28838, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24231);
      } else {
        ModelManager_1.ModelManager.LevelPlayReportModel.UpdateSimpleReportMsg(e.Gb_);
      }
    }
  }
  static async CheckAndRequestLevelPlayVarAsync(e, o) {
    if (!ModelManager_1.ModelManager.LevelPlayReportModel.HasRequestDetail(e, o)) {
      await LevelPlayReportController.RequestLevelPlayVarAsync(e, o);
    }
  }
  static async RequestLevelPlayVarAsync(e, o) {
    var t = Protocol_1.Aki.Protocol.Gp_.create();
    t.r6n = e;
    t._ps = o;
    var t = await Net_1.Net.CallAsync(25811, t);
    if (t) {
      ModelManager_1.ModelManager.LevelPlayReportModel.SetRequestDetailFlag(e, o);
      if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 18883);
      } else {
        ModelManager_1.ModelManager.LevelPlayReportModel.UpdateDetailReportMsg(e, o, t.hEs);
      }
    }
  }
  static async RequestPlayPointStateAsync(e, o) {
    var t = Protocol_1.Aki.Protocol.y0_.create();
    t.xNl = e;
    t.r6n = o;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, "LevelPlayReportController.RequestPlayPointStateAsync");
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, "y0_", ["", t]);
    }
    var o = await Net_1.Net.CallAsync(17512, t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, "S0_", ["", o]);
    }
    if (o) {
      if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 24679);
      } else {
        ModelManager_1.ModelManager.ExploreProgressModel.UpdatePlayPointState(e, o.qb_);
      }
    }
  }
  static async RequestSingleLevelPlayStateListAsync(e, o) {
    var t = new Protocol_1.Aki.Protocol.xR_();
    t.r6n = e;
    t.Uxs = [o];
    await this.RequestLevelPlayStateListAsync([t]);
  }
  static async RequestLevelPlayStateListAsync(e) {
    var o = Protocol_1.Aki.Protocol.Av_.create();
    o._Wl = e;
    var o = await Net_1.Net.CallAsync(22235, o);
    if (o) {
      if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlayReport", 63, "请求玩法点状态返回失败:", ["ErrorCode:", o.Q4n]);
        }
      } else {
        ModelManager_1.ModelManager.LevelPlayReportModel.UpdateLevelPlayStateMsg(e, o.kb_);
      }
    }
  }
}
exports.LevelPlayReportController = LevelPlayReportController;
//# sourceMappingURL=LevelPlayReportController.js.map