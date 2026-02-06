"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteListDataMotor = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MotorRouletteMainViewProxy_1 = require("../ViewProxy/MotorRouletteMainViewProxy");
const RouletteDefine_1 = require("./RouletteDefine");
const RouletteListDataBase_1 = require("./RouletteListDataBase");
class RouletteListDataMotor extends RouletteListDataBase_1.RouletteListDataBase {
  constructor() {
    super(...arguments);
    this.WGm = [[[1], 4, 0], [[2], 5, 0], [[3], 6, 0], [[4], 7, 0], [[5], 8, 0], [[6], 9, 0], [[7], 10, 0], [[8], 11, 0]];
    this.RouletteType = 3;
    this.Priority = 0;
    this.KGm = false;
  }
  GetRouletteIdList() {
    return this.RouletteIdListServer;
  }
  GetExtraItemId() {
    return 0;
  }
  GetEquipExploreSkillId() {
    return this.EquipExploreSkillIdServer;
  }
  Init() {}
  Clear() {}
  IsActivate() {
    return this.KGm;
  }
  foi() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 37, "[RouletteMotor] 激活", ["EquipSkillId", this.EquipExploreSkillIdServer]);
    }
    ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(this.EquipExploreSkillIdServer, 0, "摩托轮盘激活");
    ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(this.EquipExploreSkillIdServer);
  }
  poi() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 37, "[RouletteMotor] 取消激活", ["EquipSkillId", this.EquipExploreSkillIdServer]);
    }
    ModelManager_1.ModelManager.RouletteModel.RecoverEquipExploreSkillId();
  }
  IsRouletteReplace() {
    return false;
  }
  IsRouletteOpen() {
    var e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreRouletteTypeById(this.RouletteType);
    return e.UnlockFuncId === 0 || ModelManager_1.ModelManager.FunctionModel.IsOpen(e.UnlockFuncId);
  }
  IsMainRouletteCanOpenView(e) {
    return !!this.IsRouletteOpen() && (!ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(217)?.HasAnyTag(ModelManager_1.ModelManager.RouletteModel.GetExploreRouletteBanTagIds()) && !!ModelManager_1.ModelManager.LevelFuncFlagModel.GetFuncFlagEnable(1) || !(e && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ExploreToolCantOpen"), 1));
  }
  CreateAssemblyGridData() {
    var e = new Map();
    e.set(0, this.efo());
    return e;
  }
  GetRouletteGridId(e, t, r) {
    if (t === 0) {
      return this.GetRouletteIdList().at(e);
    }
  }
  GetRouletteMainViewProxy() {
    return new MotorRouletteMainViewProxy_1.MotorRouletteMainViewProxy();
  }
  GetRouletteDataMap() {
    return this.WGm;
  }
  ChangeRouletteActivateStatus(e) {
    if (this.KGm !== e) {
      if (this.KGm = e) {
        this.foi();
      } else {
        this.poi();
      }
    }
  }
  efo() {
    var e;
    var t;
    var r;
    var o = [];
    for ([e, t] of ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.entries()) {
      if (t.RouletteType.includes(this.RouletteType) && t.CanAssemblyShow) {
        (r = new RouletteDefine_1.AssemblyExploreGridData()).GridType = 0;
        r.IconPath = t.BackGround;
        r.Name = t.Name;
        r.Id = e;
        r.SortId = t.Sort.get(this.RouletteType) ?? 0;
        o.push(r);
      }
    }
    o.sort((e, t) => e.SortId - t.SortId);
    return o;
  }
}
exports.RouletteListDataMotor = RouletteListDataMotor;
//# sourceMappingURL=RouletteListDataMotor.js.map