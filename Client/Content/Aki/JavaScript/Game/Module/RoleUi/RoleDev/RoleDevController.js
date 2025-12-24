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
    Net_1.Net.Register(24769, RoleDevController.RoleUpdateDevelopTargetNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24769);
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
  static RequestRoleDevelopConfig(t) {
    Net_1.Net.Call(17287, Protocol_1.Aki.Protocol.imd.create({}), e => {
      if (e) {
        const r = TimeUtil_1.TimeUtil.InverseMillisecond;
        var o = {
          DevPropsList: (e.omd ?? []).map(e => ({
            Id: e.s5n,
            ProspectBeginTime: Number(MathUtils_1.MathUtils.LongToBigInt(e.nmd)) / r,
            ProspectEndTime: Number(MathUtils_1.MathUtils.LongToBigInt(e.smd)) / r
          }))
        };
        if (ModelManager_1.ModelManager.RoleDevModel) {
          ModelManager_1.ModelManager.RoleDevModel.InitRoleDevelopConfigData(o);
          ModelManager_1.ModelManager.RoleDevModel.UpdateDevTargetRoleId(e.RFd ?? 0);
        }
        t?.();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RoleDev", 88, "RoleDevelopConfig请求无响应", ["response", e]);
      }
    });
  }
  static RequestRecordRoleMarkOperation(e) {
    Net_1.Net.Call(24408, Protocol_1.Aki.Protocol.IFd.create({
      Q6n: e
    }), e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24408);
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
}; //# sourceMappingURL=RoleDevController.js.map