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
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine");
const MapUtil_1 = require("../Map/MapUtil");
const DEFAULT_AREA_ID = 1;
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
    this.s8g = true;
  }
  OnInit() {
    this.SetAreaInfo(DEFAULT_AREA_ID);
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
  SetEnableAreaNamePrompt(e) {
    this.s8g = !e;
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
    let a = e.AreaId;
    let i = t.GetAreaInfo(a);
    while (i && i.Level !== r) {
      a = i.Father;
      i = t.GetAreaInfo(a);
    }
    return a;
  }
  GetAllAreaIdInheritable(e) {
    var r = [];
    r.push(e.AreaId);
    var t = ConfigManager_1.ConfigManager.AreaConfig;
    let a = e.Father;
    let i = a === 0 ? undefined : t.GetAreaInfo(a);
    while (a !== 0 && i) {
      r.push(a);
      var n = i.Father;
      if (a === n || n === 0) {
        break;
      }
      a = n;
      i = t.GetAreaInfo(a);
    }
    return r;
  }
  GetAllAreaIdInheritableById(t) {
    var a = [];
    var i = ConfigManager_1.ConfigManager.AreaConfig;
    var n = i.GetAreaInfo(t);
    if (n) {
      a.push(t);
      let e = n.Father;
      let r = e === 0 ? undefined : i.GetAreaInfo(e);
      while (e !== 0 && r) {
        a.push(e);
        var o = r.Father;
        if (e === o || o === 0) {
          break;
        }
        e = o;
        r = i.GetAreaInfo(e);
      }
    }
    return a;
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
    var a = this.UWe?.AreaId;
    this.SetAreaInfo(e);
    if (this.UWe.Tips && (this.AWe = this.UWe.Title, t = this.wWe.get(e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Temp", 31, "地区弹窗", ["Time", t], ["TimerIgnore", r], ["EnableAreaNamePrompt", this.s8g]), t === undefined || r || Time_1.Time.PlayerTime - t > this.BWe) && this.s8g) {
      if (UiManager_1.UiManager.IsViewOpen("AreaView")) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateAreaView);
      } else {
        UiManager_1.UiManager.OpenView("AreaView");
      }
      this.wWe.set(e, Time_1.Time.PlayerTime);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeArea, a, e);
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
  InitAreaStates(e, r) {
    this.xWe.clear();
    if (e) {
      for (const t of e) {
        this.xWe.set(t.AreaId, t.IsInitActived);
      }
    }
    for (const a of r) {
      this.xWe.set(a.p6n, a.Y4n);
    }
  }
  InitArea(e) {
    var r = ConfigManager_1.ConfigManager.AreaConfig?.GetAllAreaInfo() ?? [];
    this.InitAreaStates(r, e);
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(6);
    if (r) {
      ControllerHolder_1.ControllerHolder.AreaController.EnterAreaRequest(DEFAULT_AREA_ID, r, false, "AreaModel.InitArea");
    }
  }
  GetAreaStates() {
    return this.xWe;
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
    var a = this.UWe.WorldMonsterLevelMax.get(ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
    if (a) {
      a = t - a;
      if (a < r && e <= a) {
        return 1;
      }
      if (a < e) {
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
  GetDebugString() {
    let e = "";
    let r = this.AreaInfo?.AreaId;
    for (e = `${e += `当前区域:${r}
`}	关联区块:${this.AreaInfo?.AreaName}
`; r = r && ConfigManager_1.ConfigManager.AreaConfig?.GetParentAreaId(r);) {
      e = `${e += `父级区域:${r}
`}	关联区块:${ConfigManager_1.ConfigManager.AreaConfig?.GetAreaInfo(r)?.AreaName}
`;
    }
    return e;
  }
}
exports.AreaModel = AreaModel;
//# sourceMappingURL=AreaModel.js.map