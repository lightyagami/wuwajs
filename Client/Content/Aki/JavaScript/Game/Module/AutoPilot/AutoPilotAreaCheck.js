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
          const n = new BinItem_1.BinItem();
          n.MapId = i;
          n.InitCallback = () => {
            if (n && n.BinSet && n.TestPoints) {
              let e = this.$we.get(i);
              if (!e) {
                e = new Set();
                this.$we.set(i, e);
              }
              e.add(n);
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("AutoPilot", 87, "BinMap添加边界", ["Path", r]);
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("AutoPilot", 87, "BinMap添加边界出错", ["Path", r]);
            }
          };
          n.Init(r);
        }
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AutoPilot", 87, "AutoPilotAreas为空");
    }
  }
  BinTest(e, o) {
    o = this.$we.get(o);
    if (o) {
      for (const t of o) {
        if (t.BinTest(e)) {
          return true;
        }
      }
    }
    return false;
  }
  Clear() {
    this.$we.clear();
  }
}
exports.AutoPilotAreaCheck = AutoPilotAreaCheck;
//# sourceMappingURL=AutoPilotAreaCheck.js.map