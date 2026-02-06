"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteAssemblyViewProxy = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteComponentAssembly_1 = require("../RouletteComponent/RouletteComponentAssembly");
class RouletteAssemblyViewProxy {
  constructor() {
    this.sFm = new Map();
    this.View = undefined;
    this.OpenParam = undefined;
    this.TypeList = [];
    this.RouletteListDataMap = new Map();
    this.CurrentRouletteType = 0;
    this.AssemblyGridDataMap = new Map();
    this.CurrentRouletteListSaveData = undefined;
  }
  get CurrentRouletteDataList() {
    return ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(this.CurrentRouletteType);
  }
  RegisterView(t) {
    this.View = t;
  }
  async OnBeforeStartAsync() {
    this.TypeList = this.aFm();
    this.CurrentRouletteType = this.OpenParam.RouletteType ?? this.TypeList[0];
    if (!this.TypeList.includes(this.CurrentRouletteType)) {
      this.CurrentRouletteType = this.TypeList[0];
    }
    for (const e of this.TypeList) {
      var t = new RouletteComponentAssembly_1.RouletteComponentAssembly();
      t.RegisterViewProxy(this);
      t.SetRootActor(this.View.RouletteUiItem.GetOwner(), true);
      this.sFm.set(e, t);
    }
  }
  Start() {}
  BeforeShow() {}
  OnRouletteTypeSwitch(t) {
    this.CurrentRouletteType = t;
    this.AssemblyGridDataMap = this.CurrentRouletteDataList.CreateAssemblyGridData();
    for (var [e, s] of this.sFm.entries()) {
      if (e !== this.CurrentRouletteType) {
        s.DeactivateGridToggleChangeEvent();
      }
    }
    this.CurrentRouletteListSaveData = this.CurrentRouletteDataList.GetRouletteListSaveData();
  }
  GetRouletteComponent() {
    return this.sFm.get(this.CurrentRouletteType);
  }
  GetRouletteDataMap() {
    return this.CurrentRouletteDataList.GetRouletteDataMap();
  }
  GetRouletteGridId(t, e) {
    return this.CurrentRouletteDataList.GetRouletteGridId(t, e, false);
  }
  Destroy() {
    for (const t of this.sFm.values()) {
      t.Destroy();
    }
    this.sFm.clear();
  }
  CanOpenView() {
    return this.aFm().length > 0;
  }
  aFm() {
    var t;
    var e;
    var s;
    var o = [];
    for ([t, e] of ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.entries()) {
      if (e.IsRouletteOpen()) {
        if (!!(s = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreRouletteTypeById(t)).ShowInPad || Info_1.Info.OperationType !== 1) {
          o.push({
            Type: t,
            SortId: s.SortId
          });
        }
      }
    }
    o.sort((t, e) => t.SortId - e.SortId);
    return o.map(t => t.Type);
  }
}
exports.RouletteAssemblyViewProxy = RouletteAssemblyViewProxy;
//# sourceMappingURL=RouletteAssemblyViewProxy.js.map