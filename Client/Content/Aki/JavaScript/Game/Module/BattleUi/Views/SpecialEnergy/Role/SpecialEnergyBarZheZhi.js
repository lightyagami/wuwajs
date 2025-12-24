"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarZheZhi = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
const SpecialEnergyBarZheZhiSlotItem_1 = require("./SpecialEnergyBarZheZhiSlotItem");
const SUMMON_NUM = 3;
const extraEnergyEffectParams = [0.1, 0.3, 0.6];
class SpecialEnergyBarZheZhi extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.wca = [];
    this.Bca = 0;
    this.bca = (e, t) => {
      this.qca();
      this.RefreshBarPercent();
    };
  }
  async InitSlotItem(e) {
    var t = new SpecialEnergyBarZheZhiSlotItem_1.SpecialEnergyBarZheZhiSlotItem();
    await t.CreateThenShowByActorAsync(e.GetOwner());
    this.SlotItemList.push(t);
  }
  OnInitData() {
    super.OnInitData();
    var e = this.RoleData?.CreatureDataComponent;
    if (e) {
      var t = e.CustomServerEntityIds;
      for (let e = 0; e < SUMMON_NUM && !(e > t.length - 1); e++) {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t[e]);
        if (r?.IsInit) {
          this.wca.push(r);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 17, "折枝能量条读取伴生物实体时异常", ["creatureDataId", t[e]]);
        }
      }
    }
  }
  AddEvents() {
    super.AddEvents();
    for (const t of this.wca) {
      var e = t.Entity?.GetComponent(215);
      if (e &&= e.ListenForTagAddOrRemove(-1285044114, this.bca)) {
        this.TagTaskList.push(e);
      }
    }
  }
  qca() {
    this.Bca = 0;
    for (const e of this.wca) {
      if (e.Entity?.GetComponent(215)?.HasTag(-1285044114)) {
        this.Bca++;
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "【能量条】折枝飞鹤数量更新", ["", this.Bca]);
    }
  }
  OnStart() {
    for (let e = 0; e < this.SlotItemList.length; e++) {
      this.SlotItemList[e].SetEffectItemNiagaraParam("Color_Offset", extraEnergyEffectParams[e]);
    }
    this.qca();
    super.OnStart();
  }
  RefreshBarPercent(e = false) {
    var t = this.PercentMachine.GetCurPercent();
    var r = this.GetKeyEnable();
    for (let e = 0; e < this.SlotItemList.length; e++) {
      var a = this.SlotItemList[e];
      if (e < this.Bca) {
        a.UpdatePercent(0, false, true);
        a.SetEffectItemVisible(true);
      } else {
        a.UpdatePercent(t * this.SlotNum - (e - this.Bca), r, true);
        a.SetEffectItemVisible(false);
      }
    }
    this.KeyItem?.RefreshKeyEnable(r, e);
  }
}
exports.SpecialEnergyBarZheZhi = SpecialEnergyBarZheZhi;
//# sourceMappingURL=SpecialEnergyBarZheZhi.js.map