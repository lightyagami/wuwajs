"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LogReportDefine_1 = require("../../../Module/LogReport/LogReportDefine");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LogController_1 = require("../../../World/Controller/LogController");
class RoleDevController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(17523, RoleDevController.RoleUpdateDevelopTargetNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17523);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, RoleDevController.xkt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, RoleDevController.xkt);
  }
  static RequestRoleDevelopConfigAndOpenView(e) {
    RoleDevController.RequestRoleDevelopConfig(() => {
      RoleDevController.OpenRoleDevelopView(e);
    });
  }
  static OpenRoleDevelopView(e) {
    UiManager_1.UiManager.OpenView("RoleDevRootView", e);
  }
  static RequestRoleDevelopConfig(t) {
    Net_1.Net.Call(15345, Protocol_1.Aki.Protocol.Ydd.create({}), e => {
      if (e) {
        const r = TimeUtil_1.TimeUtil.InverseMillisecond;
        var o = {
          DevPropsList: (e.Jdd ?? []).map(e => ({
            Id: e.s5n,
            ProspectBeginTime: Number(MathUtils_1.MathUtils.LongToBigInt(e.Zdd)) / r,
            ProspectEndTime: Number(MathUtils_1.MathUtils.LongToBigInt(e.emd)) / r
          }))
        };
        if (ModelManager_1.ModelManager.RoleDevModel) {
          ModelManager_1.ModelManager.RoleDevModel.InitRoleDevelopConfigData(o);
          ModelManager_1.ModelManager.RoleDevModel.UpdateDevTargetRoleId(e.eOd ?? 0);
        }
        t?.();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RoleDev", 88, "RoleDevelopConfig请求无响应", ["response", e]);
      }
    });
  }
  static RequestRecordRoleMarkOperation(e) {
    Net_1.Net.Call(29571, Protocol_1.Aki.Protocol.z2d.create({
      Q6n: e
    }), e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29571);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RoleDev", 88, "RoleUpdateDevelopTarget请求无响应", ["response", e]);
      }
    });
  }
  static T6d(o, r, t) {
    try {
      var e = RoleDevController.b6d(o);
      var l = new LogReportDefine_1.RoleDevLogData();
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
  static b6d(o) {
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
    e = RoleDevController.T6d(e, o, -1);
    if (e) {
      LogController_1.LogController.LogRoleDevPush(e);
    }
  }
  static LogRoleDevRoleButtonClick(e, o) {
    e = RoleDevController.T6d(e, o, -1);
    if (e) {
      LogController_1.LogController.LogRoleDevPush(e);
    }
  }
  static LogRoleDevSubPageClick(e, o, r) {
    e = RoleDevController.T6d(e, o, r);
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
}; //# sourceMappingURL=RoleDevController.js.map