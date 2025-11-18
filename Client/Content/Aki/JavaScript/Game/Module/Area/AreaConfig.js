"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const AreaAll_1 = require("../../../Core/Define/ConfigQuery/AreaAll");
const AreaAtmosphereInfoById_1 = require("../../../Core/Define/ConfigQuery/AreaAtmosphereInfoById");
const AreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaByAreaId");
const AreaByCountryAndLevel_1 = require("../../../Core/Define/ConfigQuery/AreaByCountryAndLevel");
const AreaReportByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaReportByAreaId");
const AreaReportByAreaIdAndStage_1 = require("../../../Core/Define/ConfigQuery/AreaReportByAreaIdAndStage");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine");
const AreaByLevel_1 = require("../../../Core/Define/ConfigQuery/AreaByLevel");
class AreaConfig extends ConfigBase_1.ConfigBase {
  GetAreaLocalName(e) {
    let r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return r = r || "";
  }
  GetParentAreaId(e) {
    e = AreaByAreaId_1.configAreaByAreaId.GetConfigList(e);
    if (e !== undefined && e.length > 0) {
      return e[0].Father;
    } else {
      return 0;
    }
  }
  GetAreaInfo(e) {
    e = AreaByAreaId_1.configAreaByAreaId.GetConfigList(e);
    if (e !== undefined && e.length > 0) {
      return e[0];
    }
  }
  GetAllAreaInfo() {
    return AreaAll_1.configAreaAll.GetConfigList();
  }
  GetAreaAtmosphereInfo(e) {
    return AreaAtmosphereInfoById_1.configAreaAtmosphereInfoById.GetConfig(e);
  }
  GetAreaConfigByCountryAndLevel(e, r) {
    return AreaByCountryAndLevel_1.configAreaByCountryAndLevel.GetConfigList(e, r);
  }
  GetAreaConfigByLevel(e) {
    return AreaByLevel_1.configAreaByLevel.GetConfigList(e);
  }
  GetLevelOneAreaId(o) {
    var a = this.GetAreaInfo(o);
    if (!a || a.Level < ExploreProgressDefine_1.AREA_LEVEL) {
      return 0;
    }
    let n = a.Level;
    let t = n === ExploreProgressDefine_1.AREA_LEVEL ? o : 0;
    if (n > ExploreProgressDefine_1.AREA_LEVEL) {
      let e = a.Father;
      let r = 50;
      while (n > ExploreProgressDefine_1.AREA_LEVEL && r > 0) {
        var A = this.GetAreaInfo(e);
        if (!A) {
          break;
        }
        if ((e = A.Father) === o) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Area", 63, "区域配置->获取所属一级区域出现闭环，请联系策划检查配置", ["parentAreaId", e], ["areaId", o], ["level", n], ["ret", t]);
          }
          break;
        }
        n = A.Level;
        t = A.Level === ExploreProgressDefine_1.AREA_LEVEL ? A.AreaId : 0;
        --r;
      }
      if (r <= 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Area", 63, "区域配置->获取所属一级区域次数超过上限，请联系策划检查配置", ["parentAreaId", e], ["areaId", o], ["level", n], ["ret", t]);
      }
      if (n > ExploreProgressDefine_1.AREA_LEVEL && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Area", 63, "区域配置->获取所属一级区域,查找失败>请联系策划检查配置", ["areaId", o], ["level", n], ["ret", t]);
      }
    }
    return t;
  }
  GetStoryList(e) {
    return AreaReportByAreaId_1.configAreaReportByAreaId.GetConfigList(e);
  }
  GetStoryConfigByAreaIdAndStage(e, r) {
    return AreaReportByAreaIdAndStage_1.configAreaReportByAreaIdAndStage.GetConfig(e, r);
  }
}
exports.AreaConfig = AreaConfig;
//# sourceMappingURL=AreaConfig.js.map