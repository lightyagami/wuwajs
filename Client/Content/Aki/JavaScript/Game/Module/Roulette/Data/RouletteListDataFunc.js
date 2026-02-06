"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteListDataFunc = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteMainViewProxy_1 = require("../ViewProxy/RouletteMainViewProxy");
const RouletteDefine_1 = require("./RouletteDefine");
const RouletteListDataBase_1 = require("./RouletteListDataBase");
class RouletteListDataFunc extends RouletteListDataBase_1.RouletteListDataBase {
  constructor() {
    super(...arguments);
    this.jGm = [[[1], 4, 1], [[2], 5, 1], [[3], 6, 1], [[4], 7, 1], [[5], 8, 1], [[6], 9, 1], [[7], 10, 1], [[8], 11, 1]];
    this.Priority = 100;
    this.Bcc = undefined;
    this.kcc = [];
    this.Kbm = new Map();
    this.qGm = [];
    this.RouletteType = 1;
    this.nye = () => {
      var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      var t = this.Kbm.get(e) !== undefined;
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || t) {
        if (t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) {
          this.HGm(e, t.InstSubType);
        }
      } else {
        this.$Gm();
      }
    };
  }
  GetRouletteIdList() {
    if (this.IsRouletteReplace()) {
      return this.qGm;
    } else {
      return this.RouletteIdListServer;
    }
  }
  GetExtraItemId() {
    return 0;
  }
  GetEquipExploreSkillId() {
    return 0;
  }
  IsActivate() {
    return true;
  }
  Init() {
    this.Gcc();
    this.OnAddEvents();
  }
  Clear() {
    this.OnRemoveEvents();
  }
  IsRouletteReplace() {
    return !!this.Bcc;
  }
  IsRouletteOpen() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10056);
  }
  IsMainRouletteCanOpenView(e) {
    return ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
  }
  CreateAssemblyGridData() {
    var e = new Map();
    e.set(1, this.ifo());
    return e;
  }
  GetRouletteGridId(e, t, i) {
    if (t === 1) {
      return (i ? this.GetRouletteIdList() : this.RouletteIdListServer).at(e);
    }
  }
  GetRouletteMainViewProxy() {
    return new RouletteMainViewProxy_1.RouletteMainViewProxy();
  }
  GetRouletteDataMap() {
    return this.jGm;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
  }
  Gcc() {
    this.kcc.length = 0;
    this.Kbm.clear();
    for (const e of ConfigManager_1.ConfigManager.RouletteConfig.GetAllFuncReplaceConfig()) {
      if (e.InstIdList.length > 0) {
        for (const t of e.InstIdList) {
          this.Kbm.set(t, e.Id);
        }
      } else if (e.InstSubType !== 0) {
        this.kcc.push(e.InstSubType);
      }
    }
  }
  HGm(e, t) {
    let i = undefined;
    let n = 0;
    e = this.Kbm.get(e);
    if (e) {
      i = ConfigManager_1.ConfigManager.RouletteConfig.GetFuncReplaceConfigById(e);
      n = e;
    } else if (this.kcc.includes(t)) {
      i = ConfigManager_1.ConfigManager.RouletteConfig.GetFuncReplaceConfig(t);
      n = i?.Id ?? 0;
    }
    if (n !== 0 && i) {
      if (this.Bcc !== n) {
        this.Bcc = n;
        if (i.FuncMenuIdList.length !== RouletteDefine_1.ROULETTE_FUNCTION_IN_USE) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Phantom", 37, "[FunctionRoulette] 替换配置功能轮盘Id数量错误", ["ReplaceId", n]);
          }
        } else {
          this.qGm.length = 0;
          this.qGm.push(...i.FuncMenuIdList);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Phantom", 37, "[FunctionRoulette] 功能轮盘进入替换模式", ["ReplaceId", this.Bcc]);
          }
        }
      }
    } else {
      this.$Gm();
    }
  }
  $Gm() {
    if (this.Bcc) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "[FunctionRoulette] 功能轮盘退出替换模式", ["LastReplaceId", this.Bcc]);
      }
      this.Bcc = undefined;
    }
  }
  ifo() {
    var e;
    var t;
    var i;
    var n = [];
    for ([e, t] of ModelManager_1.ModelManager.RouletteModel.UnlockFunctionDataMap.entries()) {
      if (t.ShowInAssembly) {
        (i = new RouletteDefine_1.AssemblyFunctionGridData()).GridType = 1;
        i.IconPath = t.FuncMenuIconPath;
        i.Name = t.FuncName;
        i.Id = e;
        i.SortId = t.FuncMenuSequence;
        n.push(i);
      }
    }
    n.sort((e, t) => e.SortId - t.SortId);
    return n;
  }
}
exports.RouletteListDataFunc = RouletteListDataFunc;
//# sourceMappingURL=RouletteListDataFunc.js.map