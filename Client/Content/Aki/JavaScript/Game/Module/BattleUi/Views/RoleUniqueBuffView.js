"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleUniqueBuffView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView");
const BuffItem_1 = require("./BuffItem");
const BuffItemContainer_1 = require("./BuffItemContainer");
const TopBuffBuLing_1 = require("./TopBuff/TopBuffBuLing");
const TopBuffYouHu_1 = require("./TopBuff/TopBuffYouHu");
const roleClassMap = new Map([[1106, TopBuffYouHu_1.TopBuffYouHu], [1307, TopBuffBuLing_1.TopBuffBuLing]]);
class RoleUniqueBuffView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.mkn = new BuffItemContainer_1.BuffItemContainer();
    this.S4u = undefined;
    this.E0 = undefined;
    this.Edt = undefined;
    this.Sdt = new Map();
    this.FXa = new Set();
    this.kpe = () => {
      this.jgd();
      this.Hgd();
    };
  }
  OnStart() {
    super.OnStart();
    this.InitChildType(37);
    this.E4u();
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("RoleUniqueBuffItemCount");
    this.mkn.Init(this.RootItem, e, false, true, true, this.S4u.GetRootItem());
    this.Ore();
  }
  OnBeforeDestroy() {
    this.Refresh(undefined);
    this.I4u();
    this.Edt = undefined;
    for (const e of this.Sdt.values()) {
      e.Destroy();
    }
  }
  Reset() {
    this.kre();
    super.Reset();
  }
  E4u() {
    this.S4u = new BuffItem_1.BuffItem(this.RootItem);
    this.S4u.ActivateExceedTip();
  }
  I4u() {
    if (this.S4u) {
      this.S4u.DestroyCompatible();
      this.S4u = undefined;
    }
  }
  Refresh(e) {
    this.E0 = e?.EntityHandle?.Id ?? 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "开始切换角色特殊buff条", ["entityId", this.E0]);
    }
    if (e) {
      this.mkn.RefreshBuff(e?.EntityHandle);
      this.$gd(e);
    } else {
      this.mkn.ClearAll();
    }
    this.Hgd();
  }
  Tick(e) {
    this.mkn.Tick(e);
    for (const t of this.Sdt.values()) {
      t.Tick(e);
    }
  }
  AddBuff(e, t) {
    this.mkn.AddBuffByCue(e, t, true);
  }
  RemoveBuff(e, t) {
    this.mkn.RemoveBuffByCue(e, t, true);
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
  jgd() {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
      var e = t.EntityHandle?.Id;
      if (e &&= ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e)) {
        this.$gd(e);
      }
    }
  }
  async $gd(e) {
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
  Hgd() {
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
exports.RoleUniqueBuffView = RoleUniqueBuffView;
//# sourceMappingURL=RoleUniqueBuffView.js.map