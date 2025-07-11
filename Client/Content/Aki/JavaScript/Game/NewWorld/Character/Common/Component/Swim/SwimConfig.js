"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwimConfig = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const SwimBuffById_1 = require("../../../../../../Core/Define/ConfigQuery/SwimBuffById");
const SwimById_1 = require("../../../../../../Core/Define/ConfigQuery/SwimById");
const ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase");
const NORMAL_SWIM_CONFIG_ID = 0;
const NO_INPUT_CONFIG_ID = 1;
const FAST_SWIM_CONFIG_ID = 3;
class SwimConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.UZo = undefined;
    this.AZo = undefined;
    this.PZo = undefined;
    this.xZo = undefined;
  }
  OnInit() {
    this.UZo = new Map();
    this.AZo = 0;
    this.PZo = 0;
    this.xZo = 0;
    this.InitSwimBuffConfig();
    return true;
  }
  OnClear() {
    this.UZo = undefined;
    this.AZo = undefined;
    this.PZo = undefined;
    return !(this.xZo = undefined);
  }
  GetSwimConfigByRoleBodyId(i) {
    var e = this.UZo.get(i);
    return e || ((e = SwimById_1.configSwimById.GetConfig(i)) || Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 57, "以下身高没有配置游泳", ["RoleBody", i]), this.UZo.set(i, e), e);
  }
  GetSwimBuffId(i, e) {
    if (i) {
      if (e) {
        return this.PZo;
      } else {
        return this.AZo;
      }
    } else {
      return this.xZo;
    }
  }
  InitSwimBuffConfig() {
    var i = SwimBuffById_1.configSwimBuffById.GetConfig(NORMAL_SWIM_CONFIG_ID);
    if (i) {
      this.AZo = i.BuffId;
      if (i = SwimBuffById_1.configSwimBuffById.GetConfig(NO_INPUT_CONFIG_ID)) {
        this.xZo = i.BuffId;
        if (i = SwimBuffById_1.configSwimBuffById.GetConfig(FAST_SWIM_CONFIG_ID)) {
          this.PZo = i.BuffId;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Movement", 57, "游泳Buff表没有配置Id为3的基础配置");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 57, "游泳Buff表没有配置Id为1的基础配置");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 57, "游泳Buff表没有配置Id为0的基础配置");
    }
  }
}
exports.SwimConfig = SwimConfig;
//# sourceMappingURL=SwimConfig.js.map