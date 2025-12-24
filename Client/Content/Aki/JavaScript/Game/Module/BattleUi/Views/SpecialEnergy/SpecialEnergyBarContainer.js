"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarContainer = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const MotorcycleSpecialEnergyBar_1 = require("./MotorcycleSpecialEnergyBar");
const RoleSpecialEnergyBar_1 = require("./RoleSpecialEnergyBar");
class SpecialEnergyBarContainer extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.Mdt = undefined;
    this.E0 = 0;
    this.Edt = undefined;
    this.Sdt = new Map();
    this.kLf = new MotorcycleSpecialEnergyBar_1.MotorcycleSpecialEnergyBar();
    this.kpe = () => {
      this.ydt();
      this.Idt();
    };
    this.qLf = () => {
      this.Idt();
    };
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(41);
    this.Mdt = e;
    this.E0 = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id ?? 0;
    this.ydt();
    this.kLf.Init(this.RootItem, this.qLf);
    this.Idt();
    this.Ore();
  }
  OnBeforeDestroy() {
    this.Edt = undefined;
    for (const e of this.Sdt.values()) {
      e.Destroy();
    }
    this.kLf.Destroy();
  }
  Reset() {
    this.kre();
    super.Reset();
  }
  Tick(e) {
    for (const i of this.Sdt.values()) {
      i.Tick(e);
    }
    this.kLf?.Tick(e);
  }
  OnChangeRole(e) {
    var i;
    this.E0 = e?.EntityHandle?.Id ?? 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "开始切换特殊能量条", ["entityId", this.E0]);
    }
    if (this.E0) {
      if (ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.IsSpecialEnergyBarEditorModeOpen && (i = this.Sdt.get(this.E0))) {
        i.Destroy();
        this.Sdt.delete(this.E0);
      }
      this.Tdt(e);
    }
    this.Idt();
  }
  OnRemoveEntity(e) {
    var i = this.Sdt.get(e);
    if (i && (i.Destroy(), this.Sdt.delete(e), this.Edt === i)) {
      this.Edt = undefined;
    }
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.kpe);
    this.kLf.AddEvents();
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.kpe);
    this.kLf.RemoveEvents();
  }
  ydt() {
    for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
      var e = i.EntityHandle?.Id;
      if (e &&= ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e)) {
        this.Tdt(e);
      }
    }
  }
  async Tdt(i) {
    var t = i.EntityHandle?.Id;
    if (t && !this.Sdt.has(t)) {
      var s = new RoleSpecialEnergyBar_1.RoleSpecialEnergyBar();
      this.Sdt.set(t, s);
      let e = this.RootItem;
      if (i.IsPhantom()) {
        e = this.Mdt;
      }
      await s.InitAsync(e, i);
    }
  }
  Idt() {
    for (var [e, i] of this.Sdt) {
      if (e !== this.E0 || this.kLf.IsEnable()) {
        i.SetVisible(false);
      } else {
        i.SetVisible(true);
        this.Edt = i;
      }
    }
  }
}
exports.SpecialEnergyBarContainer = SpecialEnergyBarContainer;
//# sourceMappingURL=SpecialEnergyBarContainer.js.map