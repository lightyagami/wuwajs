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
const RegionalTerminalActivityData_1 = require("./Data/RegionalTerminalActivityData");
const RegionalTerminalFunctionData_1 = require("./Data/RegionalTerminalFunctionData");
const RegionalTerminalDefine_1 = require("./RegionalTerminalDefine");
class RegionalTerminalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.GroupDataMap = new Map();
    this.GameplayDataMap = new Map();
    this.O1g = new Map();
    this.G1g = 0;
    this.F1g = new Map();
    this.N1g = false;
    this.Qvg = new Set();
    this.eJm = {
      [0]: RegionalTerminalActivityData_1.RegionalTerminalActivityData,
      1: RegionalTerminalFunctionData_1.RegionalTerminalFunctionData
    };
    this.tJm = [];
    this.NNf = new Map();
    this.$Nf = undefined;
    this.SortGameplayData = (e, t) => {
      var i = this.IsGameplayPin(e.Id);
      if (i !== this.IsGameplayPin(t.Id) || (i = !e.GetLockState()) != !t.GetLockState()) {
        if (i) {
          return -1;
        } else {
          return 1;
        }
      } else if (e.SortId !== t.SortId) {
        return t.SortId - e.SortId;
      } else {
        return t.Id - e.Id;
      }
    };
  }
  get CurrentAreaMapGroupId() {
    return this.G1g;
  }
  set CurrentAreaMapGroupId(e) {
    if (this.G1g !== (this.G1g = e)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 37, "[RegionalTerminal] CurrentAreaMapGroupIdChanged", ["CurrentAreaMapGroupId", e]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AreaMapGroupIdChanged);
    }
  }
  get CurrentUnlockAreaMapGroupId() {
    if (this.Qvg.has(this.G1g)) {
      return this.G1g;
    } else {
      return 0;
    }
  }
  OnInit() {
    for (const r of ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAllAreaTerminal()) {
      var t = this.iJm(r);
      let e = this.GroupDataMap.get(r.GroupId);
      if (!e) {
        var i = ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalGroup(r.GroupId);
        if (!i) {
          continue;
        }
        (e = new RegionalTerminalDefine_1.RegionalTerminalGroupData()).GroupId = r.GroupId;
        e.SortId = i.SortId;
        this.GroupDataMap.set(r.GroupId, e);
      }
      e.GameplayDataList.push(t);
    }
    return true;
  }
  OnClear() {
    this.GroupDataMap.clear();
    this.GameplayDataMap.clear();
    this.F1g.clear();
    return !(this.N1g = false);
  }
  iJm(e) {
    var t = new this.eJm[e.GamePlayType]();
    t.Id = e.Id;
    t.GameplayId = e.GamePlayId;
    t.SortId = e.SortId;
    t.GroupId = e.GroupId;
    this.GameplayDataMap.set(e.Id, t);
    for (const r of e.AreaMapGroup) {
      var i = this.O1g.get(r) ?? [];
      i.push(e.Id);
      this.O1g.set(r, i);
    }
    return t;
  }
  GetGameplayDataList(e = true) {
    var t = new Set();
    var i = new Set();
    if (e) {
      for (const n of this.GetPinnedGameplayIds()) {
        t.add(n);
      }
    }
    for (const a of this.O1g.get(this.CurrentUnlockAreaMapGroupId) ?? []) {
      t.add(a);
    }
    for (const o of t) {
      var r = this.GameplayDataMap.get(o);
      if (r && r.GetShowState()) {
        i.add(r);
      }
    }
    return Array.from(i).sort(this.SortGameplayData);
  }
  GetAreaMapGroupIdByInstanceId(e) {
    if (!this.N1g) {
      for (const t of ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAllAreaMapGroup()) {
        for (const e of t.InstanceDungeon) {
          this.F1g.set(e, t.Id);
        }
      }
      this.N1g = true;
    }
    return this.F1g.get(e);
  }
  SetUnlockAreaMapGroupId(e) {
    this.Qvg.add(e);
  }
  InitGameplayPin(e) {
    this.tJm = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 37, "[RegionalTerminal] 初始化终端信息", ["PinnedIdList", e]);
    }
  }
  UpdateGameplayPin(e, t) {
    var i = this.tJm.indexOf(e);
    if (t) {
      if (i === -1) {
        this.tJm.push(e);
      }
    } else if (i !== -1) {
      this.tJm.splice(i, 1);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, e, t);
  }
  IsGameplayPin(e) {
    return this.tJm.includes(e);
  }
  GetPinnedGameplayIds() {
    return this.tJm;
  }
  StartPinCdTimer() {
    this.ClearPinCdTimer();
    this.$Nf = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.ClearPinCdTimer();
    }, RegionalTerminalDefine_1.PIN_CD_TIME);
  }
  ClearPinCdTimer() {
    if (this.$Nf && TimerSystem_1.GameplayTimerSystem.Has(this.$Nf)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.$Nf);
    }
    this.$Nf = undefined;
  }
  get IsInPinCd() {
    return this.$Nf !== undefined;
  }
  get BarFoldState() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RegionalTerminalBarFoldState, false) ?? false;
  }
  set BarFoldState(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RegionalTerminalBarFoldState, e);
  }
  UpdateFuncIdConditionFinishedState(e, t) {
    this.NNf.set(e, t);
  }
  GetFuncIdConditionFinishedState(e, t) {
    return this.NNf.get(e)?.includes(t) ?? false;
  }
}
exports.RegionalTerminalModel = RegionalTerminalModel;
//# sourceMappingURL=RegionalTerminalModel.js.map