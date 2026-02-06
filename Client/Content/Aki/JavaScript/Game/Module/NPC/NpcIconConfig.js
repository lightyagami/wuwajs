"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcIconConfig = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const NpcHeadInfoById_1 = require("../../../Core/Define/ConfigQuery/NpcHeadInfoById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const NpcIconDefine_1 = require("./NpcIconDefine");
class NpcIconConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.pGi = new Map();
    this.ult = undefined;
    this.vGi = undefined;
    this.MGi = "";
    this.EGi = 0;
    this.SGi = 0;
    this.yGi = 0;
    this.IGi = 0;
    this.TGi = 0;
    this.LGi = 0;
    this.qJ1 = 0;
    this.kOg = 0;
    this.qOg = 0;
  }
  get NpcIconHeadInfoLimitMinDistanceSquared() {
    return this.yGi;
  }
  get NpcIconHeadInfoLimitMaxDistanceSquared() {
    return this.TGi;
  }
  OnInit() {
    this.GetNpcIconHeadInfoLimitMinDistance();
    this.GetNpcIconHeadInfoLimitMaxDistance();
    return true;
  }
  GetHeadStateScaleValue(e) {
    this.ult ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(NpcIconDefine_1.HEADSTATE_SCALE_CURVE_PATH, UE.CurveFloat);
    if (this.ult) {
      return this.ult.GetFloatValue(e);
    } else {
      return 1;
    }
  }
  GetDialogScaleValue(e) {
    this.vGi ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(NpcIconDefine_1.DIALOG_SCALE_CURVE_PATH, UE.CurveFloat);
    if (this.vGi) {
      return this.vGi.GetFloatValue(e);
    } else {
      return 1;
    }
  }
  GetNpcIconSocketName() {
    this.MGi ||= CommonParamById_1.configCommonParamById.GetStringConfig("npcicon_socketname");
    return this.MGi;
  }
  GetNpcIconLocationOffsetZ() {
    this.EGi ||= CommonParamById_1.configCommonParamById.GetIntConfig("npcicon_location_offsetz");
    return this.EGi;
  }
  GetNpcIconHeadInfoLimitMinDistance() {
    if (!this.SGi) {
      this.SGi = CommonParamById_1.configCommonParamById.GetIntConfig("npc_headinfo_limit_min_distance");
      this.yGi = this.SGi * this.SGi;
    }
    return this.SGi;
  }
  GetNpcIconHeadInfoLimitMaxDistance() {
    if (!this.IGi) {
      this.IGi = CommonParamById_1.configCommonParamById.GetIntConfig("npc_headinfo_limit_max_distance");
      this.TGi = this.IGi * this.IGi;
    }
    return this.IGi;
  }
  GetNpcIconHeadInfoNameLimitDistance() {
    this.LGi ||= CommonParamById_1.configCommonParamById.GetIntConfig("npc_headinfo_name_limit_distance");
    return this.LGi;
  }
  GetNpcHeadInfo(e) {
    var i = NpcHeadInfoById_1.configNpcHeadInfoById.GetConfig(e);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 10, "查找不到对应的NPC头顶信息数据，检查一下NPC头顶信息表格", ["ID", e]);
      }
    }
    return i;
  }
  GetPlayerInfoIconLocationOffsetZ() {
    this.qJ1 ||= CommonParamById_1.configCommonParamById.GetIntConfig("OnlinePlayerNameZOffset");
    return this.qJ1;
  }
  GetPlayerInfoNameLimitDistance() {
    var e;
    if (!this.kOg) {
      e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("OnlineTeammateDistanceThreshold");
      this.kOg = e[0] * 100;
      this.qOg = e[1] * 100;
    }
    return this.kOg;
  }
  GetPlayerInfoIconLimitDistance() {
    var e;
    if (!this.qOg) {
      e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("OnlineTeammateDistanceThreshold");
      this.kOg = e[0] * 100;
      this.qOg = e[1] * 100;
    }
    return this.qOg;
  }
  OnClear() {
    this.pGi.clear();
    this.MGi = undefined;
    this.EGi = undefined;
    this.SGi = undefined;
    this.IGi = undefined;
    this.LGi = undefined;
    this.ult = undefined;
    return !(this.vGi = undefined);
  }
}
exports.NpcIconConfig = NpcIconConfig;
//# sourceMappingURL=NpcIconConfig.js.map