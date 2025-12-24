"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowController = undefined;
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const Net_1 = require("../../Core/Net/Net");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const LevelFlowResourceManager_1 = require("./LevelFlowResourceManager");
class LevelFlowController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.Mdm);
    return true;
  }
  static InitTaskTreeInfo(e, o) {
    ModelManager_1.ModelManager.LevelFlowModel.InitTaskTreeInfo(e, o);
  }
  static StartLevelFlow(e = 0) {
    ModelManager_1.ModelManager.LevelFlowModel.InitTiTanLevelFlowInfo();
    ModelManager_1.ModelManager.LevelFlowModel.StartLevelFlow(e);
  }
  static ResetLevelFlow(e = false) {
    ModelManager_1.ModelManager.LevelFlowModel.ResetLevelFlow(e);
  }
  static OnTick(e) {
    ModelManager_1.ModelManager.LevelFlowModel.OnTick(e);
    LevelFlowResourceManager_1.LevelFlowResourceManager.OnTick(e);
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.Mdm);
    return true;
  }
  static LevelFlowTeleportRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.sHm.create();
    r.d9n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    r.C9n = MathUtils_1.MathUtils.BigIntToLong(ModelManager_1.ModelManager.LevelFlowModel.TreeIncId);
    r.b5n = ModelManager_1.ModelManager.LevelFlowModel.TreeNodeId;
    r.dTs = e;
    Net_1.Net.Call(26466, r, e => {
      if (e) {
        if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 29141);
          o(false);
        } else {
          o(true);
        }
      } else {
        o(false);
      }
    });
  }
  static LevelFlowAddBuffRequest(e) {
    var o;
    if (!ModelManager_1.ModelManager.LevelFlowModel.IsEnd && !!(o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(ModelManager_1.ModelManager.LevelFlowModel.TreeIncId)) && !!(o = o.GetBlackBoard()) && !o.ContainTag(6) && !o.ContainTag(9) && !o.ContainTag(10)) {
      (o = Protocol_1.Aki.Protocol.fRf.create()).d9n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      o.C9n = MathUtils_1.MathUtils.BigIntToLong(ModelManager_1.ModelManager.LevelFlowModel.TreeIncId);
      o.b5n = ModelManager_1.ModelManager.LevelFlowModel.TreeNodeId;
      o.$As = e;
      Net_1.Net.Call(29936, o, e => {
        if (e && e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 16179);
        }
      });
    }
  }
  static LevelFlowRemoveBuffRequest(e) {
    var o;
    if (!ModelManager_1.ModelManager.LevelFlowModel.IsEnd && !!(o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(ModelManager_1.ModelManager.LevelFlowModel.TreeIncId)) && !!(o = o.GetBlackBoard()) && !o.ContainTag(6) && !o.ContainTag(9) && !o.ContainTag(10)) {
      (o = Protocol_1.Aki.Protocol.RZf.create()).d9n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      o.C9n = MathUtils_1.MathUtils.BigIntToLong(ModelManager_1.ModelManager.LevelFlowModel.TreeIncId);
      o.b5n = ModelManager_1.ModelManager.LevelFlowModel.TreeNodeId;
      o.$As = e;
      Net_1.Net.Call(20090, o, e => {
        if (e && e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 16781);
        }
      });
    }
  }
}
(exports.LevelFlowController = LevelFlowController).Mdm = () => {
  LevelFlowResourceManager_1.LevelFlowResourceManager.OnTimeDilationChange();
};
//# sourceMappingURL=LevelFlowController.js.map