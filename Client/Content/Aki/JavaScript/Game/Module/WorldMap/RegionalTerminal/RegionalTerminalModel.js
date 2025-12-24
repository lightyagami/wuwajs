"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MapUtil_1 = require("../../Map/MapUtil");
const RegionalTerminalActivityData_1 = require("./Data/RegionalTerminalActivityData");
const RegionalTerminalFunctionData_1 = require("./Data/RegionalTerminalFunctionData");
const RegionalTerminalDefine_1 = require("./RegionalTerminalDefine");
class RegionalTerminalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.GroupDataMap = new Map();
    this.GameplayDataMap = new Map();
    this.AXm = new Map();
    this.DXm = {
      [0]: RegionalTerminalActivityData_1.RegionalTerminalActivityData,
      1: RegionalTerminalFunctionData_1.RegionalTerminalFunctionData
    };
    this.UXm = [];
    this.zBf = new Map();
    this.ekf = undefined;
    this.SortGameplayData = (e, i) => {
      var t = this.IsGameplayPin(e.Id);
      if (t !== this.IsGameplayPin(i.Id) || (t = !e.GetLockState()) != !i.GetLockState()) {
        if (t) {
          return -1;
        } else {
          return 1;
        }
      } else if (e.SortId !== i.SortId) {
        return i.SortId - e.SortId;
      } else {
        return i.Id - e.Id;
      }
    };
  }
  OnInit() {
    for (const a of ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAllAreaTerminal()) {
      var i = this.xXm(a);
      let e = this.GroupDataMap.get(a.GroupId);
      if (!e) {
        var t = ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalGroup(a.GroupId);
        if (!t) {
          continue;
        }
        (e = new RegionalTerminalDefine_1.RegionalTerminalGroupData()).GroupId = a.GroupId;
        e.SortId = t.SortId;
        this.GroupDataMap.set(a.GroupId, e);
      }
      e.GameplayDataList.push(i);
    }
    return true;
  }
  OnClear() {
    this.GroupDataMap.clear();
    this.GameplayDataMap.clear();
    return true;
  }
  xXm(e) {
    var i = new this.DXm[e.GamePlayType]();
    i.Id = e.Id;
    i.GameplayId = e.GamePlayId;
    i.SortId = e.SortId;
    i.GroupId = e.GroupId;
    this.GameplayDataMap.set(e.Id, i);
    for (const a of e.Area) {
      var t = this.AXm.get(a) ?? [];
      t.push(e.Id);
      this.AXm.set(a, t);
    }
    return i;
  }
  GetGameplayDataList(e, i, t = true) {
    var a = new Set();
    var n = new Set();
    if (t) {
      for (const o of this.GetPinnedGameplayIds()) {
        a.add(o);
      }
    }
    if (i) {
      for (const s of ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalByCountryId(i)) {
        a.add(s.Id);
      }
    }
    for (const l of e) {
      for (const g of this.AXm.get(l) ?? []) {
        a.add(g);
      }
    }
    for (const f of a) {
      var r = this.GameplayDataMap.get(f);
      if (r && r.GetShowState()) {
        n.add(r);
      }
    }
    return Array.from(n).sort(this.SortGameplayData);
  }
  CheckGameplayAreaAvailable(e) {
    let i = ModelManager_1.ModelManager.AreaModel.AreaInfo;
    if (!i) {
      var t = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
      if (!(i = t ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t) : i)) {
        return false;
      }
    }
    const a = ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalByGameplayId(e);
    if (a) {
      t = i.CountryId;
      if (t) {
        for (const a of ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalByCountryId(t)) {
          if (a.Id === e) {
            return true;
          }
        }
      }
      for (const n of ModelManager_1.ModelManager.AreaModel.GetAllAreaIdInheritable(i)) {
        if ((this.AXm.get(n) ?? []).includes(e)) {
          return true;
        }
      }
    }
    return false;
  }
  InitGameplayPin(e) {
    this.UXm = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 37, "[RegionalTerminal] 初始化终端信息", ["PinnedIdList", e]);
    }
  }
  UpdateGameplayPin(e, i) {
    var t = this.UXm.indexOf(e);
    if (i) {
      if (t === -1) {
        this.UXm.push(e);
      }
    } else if (t !== -1) {
      this.UXm.splice(t, 1);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, e, i);
  }
  IsGameplayPin(e) {
    return this.UXm.includes(e);
  }
  GetPinnedGameplayIds() {
    return this.UXm;
  }
  StartPinCdTimer() {
    this.ClearPinCdTimer();
    this.ekf = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.ClearPinCdTimer();
    }, RegionalTerminalDefine_1.PIN_CD_TIME);
  }
  ClearPinCdTimer() {
    if (this.ekf && TimerSystem_1.GameplayTimerSystem.Has(this.ekf)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.ekf);
    }
    this.ekf = undefined;
  }
  get IsInPinCd() {
    return this.ekf !== undefined;
  }
  get BarFoldState() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RegionalTerminalBarFoldState, false) ?? false;
  }
  set BarFoldState(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RegionalTerminalBarFoldState, e);
  }
  UpdateFuncIdConditionFinishedState(e, i) {
    this.zBf.set(e, i);
  }
  GetFuncIdConditionFinishedState(e, i) {
    return this.zBf.get(e)?.includes(i) ?? false;
  }
}
exports.RegionalTerminalModel = RegionalTerminalModel;
//# sourceMappingURL=RegionalTerminalModel.js.map