"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LogReportDefine_1 = require("../../../Module/LogReport/LogReportDefine");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LogController_1 = require("../../../World/Controller/LogController");
class RoleDevController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(29211, RoleDevController.RoleUpdateDevelopTargetNotify);
    Net_1.Net.Register(20450, RoleDevController.RoleDevelopConfigUpdateNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29211);
    Net_1.Net.UnRegister(20450);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, RoleDevController.xkt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, RoleDevController.xkt);
  }
  static async RequestRoleDevelopConfigAndOpenView(e) {
    await ControllerHolder_1.ControllerHolder.HandBookController.RoleIllustratedInfoRequest();
    RoleDevController.RequestRoleDevelopConfig(() => {
      RoleDevController.OpenRoleDevelopView(e);
    });
  }
  static OpenRoleDevelopView(e) {
    UiManager_1.UiManager.OpenView("RoleDevRootView", e);
  }
  static RequestRoleDevelopConfig(r) {
    var e = Protocol_1.Aki.Protocol.imd.create();
    e.K7n = ModelManager_1.ModelManager.RoleDevModel.Version;
    Net_1.Net.Call(16852, e, e => {
      var o;
      if (e) {
        if (o = e.Pb_) {
          ModelManager_1.ModelManager.RoleDevModel.UpdateRoleDevConfig(o);
          r?.();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RoleDev", 97, "RoleDevelopConfig Proto_Configs为空", ["response", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RoleDev", 88, "RoleDevelopConfig请求无响应", ["response", e]);
      }
    });
  }
  static RequestRecordRoleMarkOperation(e) {
    Net_1.Net.Call(19710, Protocol_1.Aki.Protocol.IFd.create({
      Q6n: e
    }), e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19710);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RoleDev", 88, "RoleUpdateDevelopTarget请求无响应", ["response", e]);
      }
    });
  }
  static UKd(o, r, t) {
    try {
      var e = RoleDevController.xKd(o);
      var l = new LogReportDefine_1.RoleDevLogEvent();
      l.i_role_id = o;
      l.i_role_type = e;
      l.i_main_page = r;
      l.i_sub_page = t;
      return l;
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("RoleDev", 88, "构建角色培养日志数据失败", e, ["roleId", o], ["mainPage", r], ["subPage", t]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RoleDev", 88, "构建角色培养日志数据失败", ["roleId", o], ["mainPage", r], ["subPage", t], ["error", String(e)]);
      }
    }
  }
  static xKd(o) {
    try {
      if (ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o)) {
        return 1;
      } else {
        return 0;
      }
    } catch (e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RoleDev", 88, "获取角色类型失败", ["roleId", o], ["error", String(e)]);
      }
      return 0;
    }
  }
  static LogRoleDevPageClick(e, o) {
    e = RoleDevController.UKd(e, o, -1);
    if (e) {
      LogController_1.LogController.LogRoleDevPush(e);
    }
  }
  static LogRoleDevSubPageClick(e, o, r) {
    e = RoleDevController.UKd(e, o, r);
    if (e) {
      LogController_1.LogController.LogRoleDevPush(e);
    }
  }
}
(exports.RoleDevController = RoleDevController).xkt = () => {
  RoleDevController.RequestRoleDevelopConfig();
};
RoleDevController.RoleUpdateDevelopTargetNotify = e => {
  e = e.Q6n;
  if (ModelManager_1.ModelManager.RoleDevModel) {
    ModelManager_1.ModelManager.RoleDevModel.UpdateDevTargetRoleId(e);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleDevTargetRoleIdChange);
};
RoleDevController.RoleDevelopConfigUpdateNotify = e => {
  e = e.Pb_;
  if (e) {
    ModelManager_1.ModelManager.RoleDevModel.UpdateRoleDevConfig(e);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("RoleDev", 97, "RoleDevelopConfigUpdateNotify Proto_Configs为空");
  }
}; //# sourceMappingURL=RoleDevController.js.map