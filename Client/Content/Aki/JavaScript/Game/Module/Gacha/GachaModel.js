"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaModel = exports.GachaContentInfo = exports.GachaResult = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiModelResourcesManager_1 = require("../UiComponent/UiModelResourcesManager");
const GachaController_1 = require("./GachaController");
const GachaDefine_1 = require("./GachaDefine");
const ProtoGachaInfo_1 = require("./ProtoGachaInfo");
class GachaResult {
  constructor() {
    this.e9n = undefined;
    this.a9n = [];
    this.IsNew = true;
    this.h9n = [];
    this.l9n = undefined;
  }
}
exports.GachaResult = GachaResult;
class GachaContentInfo {
  constructor() {
    this.title = "";
    this.explain = "";
    this.detail = "";
  }
}
exports.GachaContentInfo = GachaContentInfo;
class GachaModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsCacheShowNewNotify = false;
    this.MWt = undefined;
    this.EWt = 0;
    this.SWt = undefined;
    this.yWt = undefined;
    this.IWt = undefined;
    this.TWt = true;
    this.LWt = "";
    this.DWt = undefined;
    this.RWt = [];
    this.UWt = new Map();
    this.AWt = [];
  }
  static IsLimit(e) {
    return e.BeginTime !== 0 || e.EndTime !== 0;
  }
  static IsValid(e) {
    var o;
    return !GachaModel.IsLimit(e) || (o = TimeUtil_1.TimeUtil.GetServerTime()) >= e.BeginTime && (o < e.EndTime || e.EndTime === 0);
  }
  GetCachedGachaInfo() {
    return this.DWt.shift();
  }
  CacheGachaInfo(e) {
    this.DWt.push(e);
  }
  set RecordId(e) {
    this.LWt = e;
  }
  get RecordId() {
    return this.LWt;
  }
  get CanCloseView() {
    return this.TWt;
  }
  set CanCloseView(e) {
    this.TWt = e;
  }
  get TodayResultCount() {
    return this.EWt;
  }
  set TodayResultCount(e) {
    this.EWt = e;
  }
  get GachaInfoArray() {
    return this.MWt;
  }
  get CurGachaResult() {
    return this.SWt;
  }
  set CurGachaResult(e) {
    this.SWt = e;
    var o = new Map();
    for (const s of this.SWt) {
      var t = s?.e9n?.L8n;
      var r = s?.e9n?.n9n;
      o.set(t, (o.get(t) ?? 0) + r);
    }
    for (const n of this.SWt) {
      var a = n?.e9n?.L8n;
      var i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(a);
      if (i) {
        n.IsNew = GachaController_1.GachaController.IsNewRole(i.Id);
      } else if ((i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GachaWeaponRecord) ?? []).includes(a)) {
        n.IsNew = false;
      } else {
        n.IsNew = true;
        i.push(a);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GachaWeaponRecord, i);
      }
    }
  }
  GetGachaInfoByResourceId(e) {
    for (const o of this.MWt) {
      if (o.ResourcesId === e) {
        return o;
      }
    }
  }
  OnInit() {
    this.DWt = [];
    return true;
  }
  OnClear() {
    this.CanCloseView = true;
    this.MWt = undefined;
    this.SWt = undefined;
    this.yWt = undefined;
    this.IWt = undefined;
    this.DWt.length = 0;
    return !(this.DWt = undefined);
  }
  InitGachaInfoMap(e) {
    this.MWt = [];
    for (const o of e) {
      this.MWt.push(new ProtoGachaInfo_1.ProtoGachaInfo(o));
    }
    this.MWt.sort((e, o) => e.Sort - o.Sort);
  }
  CheckGachaValid(e) {
    return GachaModel.IsValid(e);
  }
  CheckGachaValidByGachaId(e) {
    e = this.GetGachaInfo(e);
    return !!e && this.CheckGachaValid(e);
  }
  GetValidGachaList() {
    var e;
    var o = [];
    for (const t of ModelManager_1.ModelManager.GachaModel.GachaInfoArray) {
      if (ModelManager_1.ModelManager.GachaModel.CheckGachaValid(t) && (e = (e = t.UsePoolId) > 0 ? t.GetPoolInfo(e) : t.GetFirstValidPool())) {
        o.push(new GachaDefine_1.GachaPoolData(t, e));
      }
    }
    return o;
  }
  CheckCountIsEnough(e, o) {
    if (e.DailyLimitTimes > 0 && e.TodayTimes + o > e.DailyLimitTimes) {
      return [false, 69];
    } else if (e.TotalLimitTimes > 0 && e.TotalTimes + o > e.TotalLimitTimes) {
      return [false, 129];
    } else if (this.EWt >= 0 && o > this.EWt) {
      return [false, 130];
    } else {
      return [true, undefined];
    }
  }
  IsTotalTimesZero(e) {
    return e.TotalLimitTimes > 0 && e.TotalTimes >= e.TotalLimitTimes;
  }
  GetGachaInfo(e) {
    for (const o of this.GachaInfoArray) {
      if (o.Id === e) {
        return o;
      }
    }
  }
  RecordGachaInfo(e) {
    return !this.IWt.has(e.Id) && (this.IWt.add(e.Id), this.yWt.push(e.Id), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GachaPoolOpenRecord, this.yWt), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenGachaChanged), true);
  }
  InitGachaPoolOpenRecord() {
    this.yWt = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GachaPoolOpenRecord) ?? [];
    this.IWt = new Set();
    for (const e of this.yWt) {
      this.IWt.add(e);
    }
  }
  UpdateCount(e, o) {
    this.EWt -= o;
    for (const t of this.GachaInfoArray) {
      if (t.Id === e) {
        t.TodayTimes += o;
        t.TotalTimes += o;
        break;
      }
    }
  }
  CheckNewGachaPool() {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Gacha", 8, "当前打开过的卡池", ["GachaPoolOpenRecord", this.yWt]);
    }
    if (this.GachaInfoArray) {
      for (const e of this.GachaInfoArray) {
        if (!this.IWt.has(e.Id)) {
          return true;
        }
      }
    }
    return false;
  }
  CheckNewGachaPoolById(e) {
    return !this.IWt.has(e);
  }
  async PreloadGachaSequence(e) {
    var o = [];
    for (const t of e) {
      o.push(this.PreloadGachaSequenceOne(t));
    }
    await Promise.all(o);
  }
  GetLoadedSequence(e) {
    return this.UWt.get(e);
  }
  async PreloadGachaSequenceOne(e) {
    var o = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
    const t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(o.ShowSequence);
    const r = new CustomPromise_1.CustomPromise();
    o = ResourceSystem_1.ResourceSystem.LoadAsync(t.SequencePath, UE.LevelSequence, e => {
      this.UWt.set(t.SequencePath, e);
      UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, true);
      r.SetResult(true);
    }, 100, "Ui.GachaUi");
    this.RWt.push(o);
    await r.Promise;
    o = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e);
    const a = new CustomPromise_1.CustomPromise();
    if (o === 2) {
      o = UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(e);
      e = UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(o, () => {
        a.SetResult(true);
      });
      this.AWt.push(e);
      await a.Promise;
    }
  }
  ReleaseLoadGachaSequence() {
    for (const e of this.RWt) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
    }
    for (const o of this.AWt) {
      UiModelResourcesManager_1.UiModelResourcesManager.CancelUiModelResourceLoad(o);
    }
    this.UWt.forEach(e => {
      UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, false);
    });
    this.UWt.clear();
  }
  IsRolePool(e) {
    return e === 1 || e === 4 || e === 2 || e === 7 || e === 6 || e === 9;
  }
  GetGachaQuality(e) {
    let o = 0;
    switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e)) {
      case 1:
        o = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e).QualityId;
        break;
      case 2:
        o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e).QualityId;
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Gacha", 43, "抽卡获得物品的类型错误，必须是角色或武器", ["itemId", e]);
        }
    }
    return o;
  }
  GetGachaRecordUrlPrefix() {
    return BaseConfigController_1.BaseConfigController.GetGachaUrl().GachaRecord;
  }
  GetServerArea() {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
      return "global";
    } else {
      return "cn";
    }
  }
}
exports.GachaModel = GachaModel;
//# sourceMappingURL=GachaModel.js.map