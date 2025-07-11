"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const InstanceDungeonAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonAll");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ServerLimitById_1 = require("../../../Core/Define/ConfigQuery/ServerLimitById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LoginConfig extends ConfigBase_1.ConfigBase {
  GetAllInstanceDungeon() {
    return InstanceDungeonAll_1.configInstanceDungeonAll.GetConfigList();
  }
  GetInstanceDungeonNameById(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetLoginFailResetTime() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("login_fail_reset_time");
    if (e === 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Login", 8, "登录失败次数重置参数错误", ["loginFailResetTime", e]);
    }
    return e;
  }
  GetLoginFailParam(n) {
    var o = CommonParamById_1.configCommonParamById.GetStringConfig("login_fail_params");
    var r = o.split(/[,|]/g);
    if (r.length === 0 || r.length % 2 != 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 8, "登录失败重试参数错误, 请检查个数", ["params", o]);
      }
      return 0;
    }
    let i = 0;
    for (let e = 0; e < r.length; e += 2) {
      var t = Number(r[e]);
      var a = Number(r[e + 1]);
      if (isNaN(t) || t <= 0 || isNaN(a) || a <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Login", 8, "登录失败重试参数错误, ", ["params", o]);
        }
        return 0;
      }
      if (t <= n) {
        i = a;
      }
    }
    return i;
  }
  GetDefaultSingleMapId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("default_single_map_id");
  }
  GetDefaultMultiMapId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("default_multi_map_id");
  }
  GetSdkReloginTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("sdk_relogin_time");
  }
  GetDevLoginServerIp() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("dev_sdk_loginserver_ip");
  }
  GetMainlineLoginServerIp() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("mainline_sdk_loginserver_ip");
  }
  GetLoginViewNoExitButtonPackageIdList() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("LoginViewNoShowExitButtonPackageIdList").split(",");
  }
  GetLoginViewNoAccountButtonPackageIdList() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("LoginViewNoAccountButtonPackageIdList").split(",");
  }
  GetServerLimitConfig(e) {
    return ServerLimitById_1.configServerLimitById.GetConfig(e);
  }
}
exports.LoginConfig = LoginConfig;
//# sourceMappingURL=LoginConfig.js.map