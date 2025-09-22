"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainRoleController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController");
const EditFormationController_1 = require("../EditFormation/EditFormationController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class MainRoleController extends UiControllerBase_1.UiControllerBase {
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("RoleGenderChangeView", MainRoleController.iVe, "MainRoleController.CanOpenView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("RoleGenderChangeView", MainRoleController.iVe);
  }
  static IsCanChangeRole(r) {
    var o = ModelManager_1.ModelManager.RoleModel.GetCanChangeRoleIdList();
    var t = o.length;
    for (let e = 0; e < t; e++) {
      if (o[e] === r) {
        return true;
      }
    }
    return false;
  }
  static IsMainRole(e) {
    return !!ModelManager_1.ModelManager.RoleModel.IsMainRole(e);
  }
  static SendRoleSexChangeRequest(e) {
    var r = Protocol_1.Aki.Protocol.Lus.create();
    r.v7n = e;
    Net_1.Net.Call(25064, r, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.WorldLevelModel.Sex = e.v7n;
          this.U1o();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleChangeEnd);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18824);
        }
      }
    });
  }
  static SendRoleElementChangeRequest(e) {
    var r = Protocol_1.Aki.Protocol.Dus.create();
    r.wHn = e;
    Net_1.Net.Call(28911, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29017);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleChangeEnd);
          this.U1o();
        }
      }
    });
  }
  static U1o() {
    EditFormationController_1.EditFormationController.RefreshMainRoleInfo();
    EditBattleTeamController_1.EditBattleTeamController.RefreshMainRoleInfo();
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16547, e => {
      var r = e.Mxs;
      var e = e.J6n;
      ModelManager_1.ModelManager.PhantomBattleModel.DeleteBattleData(r);
      ModelManager_1.ModelManager.RoleModel.RoleChange(r, e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Role", 43, "角色转换成功: ", ["sourceRoleId", r], ["roleInfo!.Proto_RoleId", e.Q6n]);
      }
    });
    Net_1.Net.Register(17080, e => {
      if (e) {
        ModelManager_1.ModelManager.RoleModel.UpdateCanChangeRoleIdList(e.Sxs);
        ModelManager_1.ModelManager.MainRoleModel.UpdateCanChangeSexTime(Number(MathUtils_1.MathUtils.LongToBigInt(e.Db_)));
      }
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16547);
    Net_1.Net.UnRegister(17080);
  }
}
(exports.MainRoleController = MainRoleController).iVe = e => {
  var r = Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(206)?.HasTag(1996802261);
  var o = ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
  if (r) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(ConfigManager_1.ConfigManager.TextConfig.GetTextById("CanNotTransferInFight"));
    return false;
  } else if (o) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(ConfigManager_1.ConfigManager.TextConfig.GetTextById("CanNotTransferInInstance"));
    return false;
  } else {
    r = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3).GetDownLoadProgress()[3];
    o = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4).GetDownLoadProgress()[3];
    if (r > 0 || o > 0) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DownLoadTips_WaitDownDone");
      return false;
    } else {
      r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? 3 : 4;
      return VideoResUpdate_1.VideoResUpdate.GetVideoResSize(r) === VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(r) || (UiManager_1.UiManager.OpenView("ResDownLoadView"), false);
    }
  }
};
//# sourceMappingURL=MainRoleController.js.map