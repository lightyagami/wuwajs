"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerfSight = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController");
const Info_1 = require("../Common/Info");
const DEBUG_LOG = false;
const APP_ID_LOCAL = "688476493";
const APP_ID_GLOBAL = "424155224";
class PerfSight {
  static Initialize() {
    var e;
    if (this.IsEnable) {
      if (DEBUG_LOG) {
        UE.PerfSightHelper.EnableDebugMode();
      }
      e = BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea") !== "CN";
      if (Info_1.Info.IsPcOrGamepadPlatform()) {
        if (e) {
          UE.PerfSightHelper.SetPCServerURL("pc.perfsight.wetest.net");
        } else {
          UE.PerfSightHelper.SetPCServerURL("pc.perfsight.qq.com");
        }
      }
      if (e) {
        UE.PerfSightHelper.InitContext(APP_ID_GLOBAL);
      } else {
        UE.PerfSightHelper.InitContext(APP_ID_LOCAL);
      }
      cpp_1.FKuroPerfSightHelper.SetFlameGraphQueueSize(20480);
      cpp_1.FKuroPerfSightHelper.SetFlameGraphDropThresholds(Info_1.Info.IsPlayInEditor ? 100000 : 50000);
      if (!Info_1.Info.IsPlayInEditor && !Info_1.Info.IsPs5Platform()) {
        cpp_1.FKuroPerfSightHelper.RegisterOnFrameBegin("FrameTime");
        cpp_1.FKuroPerfSightHelper.RegisterTickGroupEvent();
      }
    }
    return true;
  }
  static SetPcAppVersion(e) {
    UE.PerfSightHelper.SetPCAppVersion(e);
  }
  static SetVersionIden(e) {
    UE.PerfSightHelper.SetVersionIden(e);
  }
  static PostEvent(e, t) {
    UE.PerfSightHelper.PostEvent(e, t);
  }
  static MarkLevelLoad(e, t) {
    UE.PerfSightHelper.MarkLevelLoad(e, t);
  }
  static MarkLevelFin() {
    UE.PerfSightHelper.MarkLevelFin();
  }
  static MarkLevelLoadCompleted() {
    UE.PerfSightHelper.MarkLevelLoadCompleted();
  }
  static SetUserId(e) {
    UE.PerfSightHelper.SetUserId(e);
  }
  static PostNetworkLatency(e, t, r) {
    UE.PerfSightHelper.PostNetworkLatency(e, t, r);
  }
}
(exports.PerfSight = PerfSight).IsEnable = true;
//# sourceMappingURL=PerfSight.js.map