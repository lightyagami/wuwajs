"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryUtil = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const HonamiSteadyConsumeByCostGroup_1 = require("../../../Core/Define/ConfigQuery/HonamiSteadyConsumeByCostGroup");
const InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const HonamiStoryDefine_1 = require("./HonamiStoryDefine");
class HonamiStoryUtil {
  static CheckEventDataInItemViewport(e, o, r = false) {
    var r = r ? HonamiStoryUtil.GetOffsetVector(e.GetWorldPointInPlane()) : e.GetWorldPointInPlane();
    var e = o.GetUIWorldPosition();
    var n = o.GetWidth();
    var o = o.GetHeight();
    var t = e.X - n / 2;
    var e = e.Z - o / 2;
    return !(r.X < t) && !(r.X > t + n) && !(r.Z < e) && !(r.Z > e + o);
  }
  static IsMobileView() {
    return Info_1.Info.IsMobileInputModel() && !Info_1.Info.IsInGamepad();
  }
  static GetOffsetVector(e) {
    var o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDragOffset();
    e.X += o[0];
    e.Z += o[1];
    return e;
  }
  static FindFirstAvailablePosition(e, o, r, n = new Set()) {
    return this.FindAvailablePosition(e, o, r, true, n);
  }
  static FindAvailablePosition(e, o, r, n, t = new Set()) {
    for (const a of n ? Array.from(e).sort((e, o) => e - o) : Array.from(e)) {
      if (!t.has(a)) {
        if (this.CheckGridPositionValid(a, o.GetBaseGridWidth(false), r)) {
          var i = o.GetGridFillPositionByPosition(a, false);
          if (this.CheckEmptyGridContainPos(e, i, t)) {
            return {
              Position: a,
              IsCross: false
            };
          }
        }
        if (this.CheckGridPositionValid(a, o.GetBaseGridWidth(true), r)) {
          i = o.GetGridFillPositionByPosition(a, true);
          if (this.CheckEmptyGridContainPos(e, i, t)) {
            return {
              Position: a,
              IsCross: true
            };
          }
        }
      }
    }
    return {
      Position: -1,
      IsCross: false
    };
  }
  static CheckGridPositionValid(e, o, r) {
    return !(r < e % r + o);
  }
  static CheckEmptyGridContainPos(e, o, r) {
    for (const n of o) {
      if (!e.has(n) || r.has(n)) {
        return false;
      }
    }
    return true;
  }
  static RemoveEmptyGridPosition(e, o) {
    for (const r of o) {
      e.delete(r);
    }
  }
  static GetHonamiStoryItemSwapInfo(e, o) {
    var r = new Protocol_1.Aki.Protocol.G$d();
    r.Xmd = e.GetIncId();
    r.h5n = 1;
    r.F$d = new Protocol_1.Aki.Protocol.B$d();
    r.F$d.l9_ = e.GetPosition();
    r.F$d.Gmd = e.GetIsCross();
    r.B$d = new Protocol_1.Aki.Protocol.B$d();
    r.B$d.l9_ = o;
    r.B$d.Gmd = e.GetIsDragCross();
    e.SetOldCross(e.GetIsCross());
    return r;
  }
  static GetHonamiStoryItemAddInfo(e, o) {
    var r = new Protocol_1.Aki.Protocol.G$d();
    r.Xmd = e.GetIncId();
    r.h5n = 0;
    r.B$d = new Protocol_1.Aki.Protocol.B$d();
    r.B$d.l9_ = o;
    r.B$d.Gmd = e.GetIsDragCross();
    e.SetOldCross(e.GetIsCross());
    return r;
  }
  static GetHonamiStoryItemRemoveInfo(e) {
    var o = new Protocol_1.Aki.Protocol.G$d();
    o.Xmd = e.GetIncId();
    o.h5n = 2;
    o.F$d = new Protocol_1.Aki.Protocol.B$d();
    o.F$d.l9_ = e.GetPosition();
    o.F$d.Gmd = e.GetIsCross();
    e.SetOldCross(e.GetIsCross());
    return o;
  }
  static GetHonamiStoryItemDataInRange(e) {
    var o = [];
    var r = [];
    ControllerHolder_1.ControllerHolder.WorldController.GetEntitiesInRange(e, 7, o, true, false);
    var n = new Set();
    for (const i of o) {
      var t = i.Entity.CheckGetComponent(209);
      if (!t || !!t.GetClientCanInteraction() || !ModelManager_1.ModelManager.HonamiStoryModel.PickedEntityId.has(i.Entity.Id)) {
        t = i.Entity.GetComponent(0);
        if (!n.has(t) && t && t.HonamiStoryItemInfo) {
          n.add(t);
          if (!ModelManager_1.ModelManager.HonamiStoryModel.CheckItemPlayerAlreadyPick(t.HonamiStoryItemInfo.b9n)) {
            t = ModelManager_1.ModelManager.HonamiStoryModel.CreateHonamiStoryItemData(t.HonamiStoryItemInfo);
            r.push(t);
          }
        }
      }
    }
    return r;
  }
  static CheckIsPluginBoxItem(e) {
    var o = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false);
    if (o) {
      for (const r of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryPluginBoxItemList(o.Id)) {
        if (r.Id === e) {
          return true;
        }
      }
    }
    return false;
  }
  static CheckActivityQuestFinished() {
    for (const o of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetAllActivityConfig()) {
      var e = o.MainQuestId;
      if (!ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e)) {
        return false;
      }
    }
    return true;
  }
  static CheckInActivityQuest() {
    for (const o of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetAllActivityConfig()) {
      var e = o.MainQuestId;
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 2) {
        return true;
      }
    }
    return false;
  }
  static CheckInHonamiStoryDungeon() {
    return !!this.CheckInHonamiStoryMainDungeon() || this.CheckInHonamiStoryAreaDungeon();
  }
  static CheckInHonamiStoryAreaDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon;
    if (e && e.InstSubType === 39) {
      var o = e.Id;
      for (const r of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetAllActivityConfig()) {
        if (r.AreaInstId === o || r.TopTowerInstId === o) {
          return true;
        }
      }
    }
    return false;
  }
  static CheckInHonamiStoryTopTower() {
    var e = ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon;
    if (e && e.InstSubType === 39) {
      var o = e.Id;
      for (const r of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetAllActivityConfig()) {
        if (r.TopTowerInstId === o) {
          return true;
        }
      }
    }
    return false;
  }
  static GetMainLineInstId() {
    var e;
    var o;
    let r = 0;
    for (const n of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetAllActivityConfig()) {
      for ([e, o] of n.MainLineInstIdUnlock) {
        if (!ModelManager_1.ModelManager.FunctionModel?.IsOpen(e)) {
          break;
        }
        r = o;
      }
    }
    return r;
  }
  static CheckInHonamiStoryMainDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon;
    if (e) {
      var o = e.Id;
      for (const r of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetAllActivityConfig()) {
        if (r.MainLineInstId.includes(o)) {
          return true;
        }
      }
    }
    return false;
  }
  static CheckEnterOrExitHonamiStoryDungeon(e) {
    var o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetAllActivityConfig();
    var r = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e);
    for (const n of o) {
      if (n.MainLineInstId.includes(e)) {
        return true;
      }
      if (r && r.InstSubType === 39) {
        return true;
      }
    }
    return false;
  }
  static CheckHonamiQuestOpen() {
    return !!ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false) && this.CheckInHonamiStoryAreaDungeon();
  }
  static GetSteadyConsumeByCostGroup(e) {
    var o = HonamiSteadyConsumeByCostGroup_1.configHonamiSteadyConsumeByCostGroup.GetConfigList(e);
    if (o) {
      var r = ModelManager_1.ModelManager.HonamiStoryModel.DangerLevel;
      for (const n of o) {
        if (n.DangerLevel === r) {
          return n.SteadyConsume;
        }
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("HonamiStory", 93, "根据消耗组获取稳定值 未匹配到危险等级", ["消耗组", e], ["当前危险等级", r]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("HonamiStory", 93, "根据消耗组获取稳定值", ["未配置的消耗组", e]);
    }
    return 0;
  }
  static GetDropQualityInMainQuest() {
    let e = -1;
    for (const o of ConfigManager_1.ConfigManager.HonamiStoryConfig.GetAllActivityConfig()) {
      e = o.MainDropQuality;
    }
    return e;
  }
  static CheckInMainQuest() {
    var e = HonamiStoryDefine_1.HONAMI_MAIN_QUEST_ID;
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 2;
  }
  static GetPriceNumFormat(e) {
    let o = "";
    let r = "";
    let n = 0;
    return o = e < CommonDefine_1.THOUSAND ? "" + e : (e >= CommonDefine_1.THOUSAND && e < CommonDefine_1.MILLION ? (n = CommonDefine_1.THOUSAND, r = "K") : e >= CommonDefine_1.MILLION && e < CommonDefine_1.BILLION ? (n = CommonDefine_1.MILLION, r = "M") : e >= CommonDefine_1.BILLION && e < CommonDefine_1.TRILLION ? (n = CommonDefine_1.BILLION, r = "B") : e > CommonDefine_1.TRILLION && (n = CommonDefine_1.TRILLION, r = "T"), Math.floor(e / n * 10) / 10 + r);
  }
  static CheckRolePowerValid(e, o) {
    return e !== 0 && o !== 0 && (e === o || (e = ModelManager_1.ModelManager.RoleModel?.IsMainRole(e) ?? false, o = ModelManager_1.ModelManager.RoleModel?.IsMainRole(o) ?? false, e && o));
  }
}
exports.HonamiStoryUtil = HonamiStoryUtil;
//# sourceMappingURL=HonamiStoryUtil.js.map