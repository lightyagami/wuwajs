"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowServerNotifyCenter = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const LevelGeneralContextUtil_1 = require("../../../LevelGamePlay/LevelGeneralContextUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const FlowController_1 = require("./FlowController");
class FlowServerNotifyCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
  OnDestroy() {}
  HandleFlowStartNotify(e) {
    var o = MathUtils_1.MathUtils.LongToNumber(e._Hn);
    var r = LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(e.cvs);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "服务器下发剧情", ["Type", r?.Type], ["FlowIncID", o], ["isAsync", e.MUs], ["isSkip", e.cHn]);
    }
    if (e.cvs?.fvs === Protocol_1.Aki.Protocol.TOs.Proto_GmPlayFlow) {
      ModelManager_1.ModelManager.PlotModel.PlotConfig.IsGmPlayPlotOnce = true;
    }
    let l = undefined;
    if (e.BYs) {
      if (e.qYs) {
        l = Vector_1.Vector.Create(e.qYs.X, e.qYs.Y, e.qYs.Z);
      } else {
        FlowController_1.FlowController.LogError("未配置剧情坐标点", ["incId", o]);
      }
    }
    ControllerHolder_1.ControllerHolder.FlowController.StartFlow(e.v5n, e.M5n, e.S5n, r, o, true, e.MUs, e.cHn, l);
  }
  HandleFlowEndNotify(e) {
    e = MathUtils_1.MathUtils.LongToNumber(e._Hn);
    ControllerHolder_1.ControllerHolder.FlowController.FinishFlow("服务器剧情通知打断剧情", e, true);
  }
  HandleFlowSkipBlackScreenNotify(e) {
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 45, "服务器跳过剧情，检查是否有黑幕", ["FlowListName", e.v5n], ["FlowId", e.M5n], ["StateId", e.S5n], ["FadeOutScreen", e.EUs]);
      }
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0);
    }
  }
}
exports.FlowServerNotifyCenter = FlowServerNotifyCenter;
//# sourceMappingURL=FlowServerNotifyCenter.js.map