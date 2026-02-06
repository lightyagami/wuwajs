"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportMisc = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ReconnectDefine_1 = require("../ReConnect/ReconnectDefine");
class TeleportMisc {
  static SendTeleportTransferRequest(e) {
    if (!this.ShowTeleportConfirmBox(() => {
      this.t4_(e, () => {
        ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo();
      });
    })) {
      this.t4_(e);
    }
  }
  static t4_(e, o) {
    ModelManager_1.ModelManager.LoadingModel.TargetTeleportId = e;
    e = Protocol_1.Aki.Protocol.mCs.create({
      s5n: e
    });
    Net_1.Net.Call(18171, e, e => {
      if (GlobalData_1.GlobalData.World && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerIsTeleportCanNotDoTeleport) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneBlockSplitNotBlock) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22728);
          }
        } else {
          o?.();
        }
      }
    });
  }
  static ShowTeleportConfirmBox(e = () => {}) {
    var o = ModelManager_1.ModelManager.InstanceDungeonModel.GetCurrentDungeonTelExitConfirmId();
    return o !== undefined && o > 0 && ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o)).FunctionMap.set(2, () => {
      e();
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o), true);
  }
  static SendTeleportTransferRequestByEntityId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetInstEntityTeleportConfigById(e);
    e = Protocol_1.Aki.Protocol.qwm.create({
      r6n: e.InstId,
      A5n: e.EntityConfigId
    });
    Net_1.Net.Call(20257, e, e => {
      if (GlobalData_1.GlobalData.World && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerIsTeleportCanNotDoTeleport && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27886);
      }
    });
  }
  static BackToGameIfTargetPositionInvalid(e, o) {
    var r = ModelManager_1.ModelManager.GameModeModel.MapId;
    var [t, l] = ControllerHolder_1.ControllerHolder.ResourceManagerController.IsBlockResourceDownloaded(r, e);
    return (!t || !!l) && !((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(405)).FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.InvalidTeleportPosition);
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(t), (l = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetMapBlockFromPosition(r, e)) >= 0 && ControllerHolder_1.ControllerHolder.ResourceManagerController.PushCurBlock([l], "传送保底,回到登陆界面"), Log_1.Log.CheckError() && Log_1.Log.Error("Teleport", 60, "传送: 目标位置所在区块资源未下载, 回到登录界面", ["mapId", r], ["position", e], ["reason", o]), 0);
  }
}
exports.TeleportMisc = TeleportMisc;
//# sourceMappingURL=TeleportMisc.js.map