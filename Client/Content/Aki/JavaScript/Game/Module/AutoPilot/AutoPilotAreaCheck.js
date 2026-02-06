"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotAreaCheck = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const AreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaByAreaId");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BinItem_1 = require("../../LevelGamePlay/BinTest/BinItem");
class AutoPilotAreaCheck {
  constructor() {
    this.$we = new Map();
  }
  Init() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("AutoPilotAreas");
    if (e && e.length !== 0) {
      for (const t of e) {
        var o = AreaByAreaId_1.configAreaByAreaId.GetConfig(t);
        if (o && !StringUtils_1.StringUtils.IsEmpty(o.EdgeWallName)) {
          const r = o.EdgeWallName + "_C";
          const i = o.MapConfigId;
          const a = new BinItem_1.BinItem();
          a.MapId = i;
          a.InitCallback = () => {
            if (a && a.BinSet && a.TestPoints) {
              let e = this.$we.get(i);
              if (!e) {
                e = new Map();
                this.$we.set(i, e);
              }
              e.set(t, a);
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("AutoPilot", 87, "BinMap添加边界", ["Path", r]);
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("AutoPilot", 87, "BinMap添加边界出错", ["Path", r]);
            }
          };
          a.Init(r);
        }
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AutoPilot", 87, "AutoPilotAreas为空");
    }
  }
  BinTest(e, o) {
    o = this.$we.get(o);
    if (o) {
      for (var [t, r] of o) {
        if (r.BinTest(e)) {
          return t;
        }
      }
    }
    return 0;
  }
  Clear() {
    this.$we.clear();
  }
}
exports.AutoPilotAreaCheck = AutoPilotAreaCheck;
//# sourceMappingURL=AutoPilotAreaCheck.js.map