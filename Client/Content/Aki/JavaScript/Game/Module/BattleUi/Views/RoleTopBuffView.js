"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTopBuffView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView");
const TopBuffYouHu_1 = require("./TopBuff/TopBuffYouHu");
const roleClassMap = new Map([[1106, TopBuffYouHu_1.TopBuffYouHu]]);
class RoleTopBuffView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.E0 = undefined;
    this.Edt = undefined;
    this.Sdt = new Map();
    this.FXa = new Set();
    this.kpe = () => {
      this.ydt();
      this.Idt();
    };
  }
  OnStart() {
    this.InitChildType(37);
    this.Ore();
  }
  OnBeforeDestroy() {
    this.Edt = undefined;
    for (const e of this.Sdt.values()) {
      e.Destroy();
    }
  }
  Reset() {
    this.kre();
    super.Reset();
  }
  Tick(e) {
    for (const t of this.Sdt.values()) {
      t.Tick(e);
    }
  }
  OnChangeRole(e) {
    this.E0 = e?.EntityHandle?.Id ?? 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "开始切换角色特殊buff条", ["entityId", this.E0]);
    }
    if (e) {
      this.Tdt(e);
    }
    this.Idt();
  }
  OnRemoveEntity(e) {
    var t = this.Sdt.get(e);
    if (t) {
      t.Destroy();
      this.Sdt.delete(e);
      if (this.Edt === t) {
        this.Edt = undefined;
      }
    } else {
      this.FXa.delete(e);
    }
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.kpe);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.kpe);
  }
  ydt() {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
      var e = t.EntityHandle?.Id;
      if (e &&= ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e)) {
        this.Tdt(e);
      }
    }
  }
  async Tdt(e) {
    var t;
    var i = e.EntityHandle?.Id;
    if (!!i && !this.Sdt.has(i) && !this.FXa.has(i)) {
      if ((t = e.CreatureRoleId) && (t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t), t = roleClassMap.get(t))) {
        t = new t();
        this.Sdt.set(i, t);
        await t.InitAsync(this.RootItem, e);
      } else {
        this.FXa.add(i);
      }
    }
  }
  Idt() {
    for (var [e, t] of this.Sdt) {
      if (e === this.E0) {
        t.SetVisible(true);
        this.Edt = t;
      } else {
        t.SetVisible(false);
      }
    }
  }
}
exports.RoleTopBuffView = RoleTopBuffView;
//# sourceMappingURL=RoleTopBuffView.js.map