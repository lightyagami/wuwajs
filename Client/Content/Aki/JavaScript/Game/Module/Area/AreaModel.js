"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine");
const MapUtil_1 = require("../Map/MapUtil");
class AreaModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.UWe = undefined;
    this.AWe = "";
    this.PWe = new Map();
    this.xWe = new Map();
    this.wWe = new Map();
    this.BWe = 0;
    this.Dtc = new Set();
  }
  OnInit() {
    this.SetAreaInfo(1);
    this.BWe = CommonParamById_1.configCommonParamById.GetIntConfig("AreaTipsShowCd");
    return true;
  }
  OnClear() {
    this.xWe.clear();
    this.PWe.clear();
    this.wWe.clear();
    this.Dtc.clear();
    return true;
  }
  get AreaName() {
    if (this.UWe) {
      return ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(this.UWe.Title);
    }
  }
  get AreaHintName() {
    if (this.UWe) {
      if (this.AWe) {
        return ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(this.AWe);
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Area", 7, "[区域.xlsx]当前需要显示的区域提示没有配置对应文本", ["区域id", this.UWe.AreaId]);
      }
    }
  }
  get AreaInfo() {
    return this.UWe;
  }
  get AllAreas() {
    return this.PWe;
  }
  GetCurrentAreaId(e) {
    return this.GetAreaId(this.AreaInfo, e);
  }
  GetAreaId(e, r) {
    if (r === undefined) {
      return e.AreaId;
    }
    var t = ConfigManager_1.ConfigManager.AreaConfig;
    let i = e.AreaId;
    let a = t.GetAreaInfo(i);
    while (a && a.Level !== r) {
      i = a.Father;
      a = t.GetAreaInfo(i);
    }
    return i;
  }
  SetAreaInfo(e) {
    if (e !== 0) {
      if (this.UWe && this.UWe.Level === ExploreProgressDefine_1.AREA_LEVEL) {
        ModelManager_1.ModelManager.MapModel.LastHighLevelArea = this.UWe.AreaId;
      }
      this.UWe = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e);
      ModelManager_1.ModelManager.PlayerInfoModel?.SetNumberPropById(6, e);
    }
  }
  SetAreaName(e, r = false) {
    var t;
    var i = this.UWe?.AreaId;
    this.SetAreaInfo(e);
    if (this.UWe.Tips && (this.AWe = this.UWe.Title, (t = this.wWe.get(e)) === undefined || r || Time_1.Time.PlayerTime - t > this.BWe)) {
      if (UiManager_1.UiManager.IsViewOpen("AreaView")) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateAreaView);
      } else {
        UiManager_1.UiManager.OpenView("AreaView");
      }
      this.wWe.set(e, Time_1.Time.PlayerTime);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeArea, i, e);
  }
  AddArea(e, r) {
    if (!this.PWe.has(e)) {
      if (this.Dtc.has(e)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Area", 72, "传送时应该完成流送的Volume加载完成并触发BeginPlay", ["CurAreaId", this.UWe?.AreaId], ["BlockedAreaId", e], ["StreamingBlockedAreas", this.Dtc]);
        }
        this.Dtc.delete(e);
      }
      this.PWe.set(e, r);
    }
  }
  AddWatchArea(e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Area", 72, "传送时应该完成流送的Volume实际上没有加载出来", ["CurAreaId", this.UWe?.AreaId], ["BlockedAreaId", e], ["StreamingBlockedAreas", this.Dtc]);
    }
    this.Dtc.add(e);
  }
  GetArea(e) {
    return this.PWe.get(e);
  }
  RemoveArea(e) {
    this.PWe.delete(e);
    if (this.Dtc.has(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Area", 72, "传送时应该完成流送的Volume触发了EndPlay", ["CurAreaId", this.UWe?.AreaId], ["BlockedAreaId", e], ["StreamingBlockedAreas", this.Dtc]);
      }
      this.Dtc.delete(e);
    }
  }
  GetAreaState(e) {
    return this.xWe.get(e);
  }
  ToggleAreaState(e, r) {
    var t = this.PWe.get(e);
    if (this.xWe.get(e) !== r) {
      this.xWe.set(e, r);
      t?.ToggleArea(r);
    }
  }
  InitAreaStates(e) {
    for (const r of e) {
      this.xWe.set(r.p6n, r.Y4n);
    }
    e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(6);
    if (e) {
      this.SetAreaInfo(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeArea, undefined, e);
    }
  }
  GetAreaCountryId() {
    if (this.UWe) {
      if (this.UWe.CountryId !== 0) {
        return this.UWe.CountryId;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Area", 10, "[区域.xlsx]当前区域没有配置所属国家id", ["区域id", this.UWe.AreaId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Area", 10, "区域数据为空");
    }
  }
  GetAreaDangerLevel() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    let t = 0;
    e.forEach((e, r) => {
      if (t < e.GetLevelData().GetLevel()) {
        t = e.GetLevelData().GetLevel();
      }
    });
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("HighDangerLevelOffset");
    var r = CommonParamById_1.configCommonParamById.GetIntConfig("MidDangerLevelOffset");
    var i = this.UWe.WorldMonsterLevelMax.get(ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
    if (i) {
      i = t - i;
      if (i < r && e <= i) {
        return 1;
      }
      if (i < e) {
        return 0;
      }
    }
    return 2;
  }
  GetAreaDangerText(e) {
    switch (e) {
      case 0:
        return ConfigManager_1.ConfigManager.TextConfig.GetTextById("AreaHighDangerText");
      case 1:
        return ConfigManager_1.ConfigManager.TextConfig.GetTextById("AreaHighMidText");
      default:
        return "";
    }
  }
  IsExistRecommendPlayPoint() {
    return this.GetCurrentExploreAreaData()?.IsShowRecommendPlayPoint() ?? false;
  }
  GetCurrentExploreAreaData() {
    var e = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
    return ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e);
  }
}
exports.AreaModel = AreaModel;
//# sourceMappingURL=AreaModel.js.map