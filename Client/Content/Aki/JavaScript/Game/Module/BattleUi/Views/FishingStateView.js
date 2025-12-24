"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingStateView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView");
const FishingHpItem_1 = require("./FishingHpItem");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
class FishingStateView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.osn = undefined;
    this.x5e = [];
    this.hXe = (t, i, e) => {
      this.bNe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.InitChildType(41);
    this.GetItem(1).SetUIActive(false);
    var t = ModelManager_1.ModelManager.FishingModel.GetShipData();
    this.osn = t.GetEntityHandle()?.Entity?.GetComponent(181);
    this.Ore();
    this.bNe();
  }
  Reset() {
    this.kre();
    this.osn = undefined;
    super.Reset();
  }
  Ore() {
    if (this.osn) {
      this.osn.AddListener(EAttributeId.Proto_Life, this.hXe);
      this.osn.AddListener(EAttributeId.l5n, this.hXe);
    }
  }
  kre() {
    if (this.osn) {
      this.osn.RemoveListener(EAttributeId.Proto_Life, this.hXe);
      this.osn.RemoveListener(EAttributeId.l5n, this.hXe);
    }
  }
  bNe() {
    if (this.osn) {
      var i = this.osn?.GetCurrentValue(EAttributeId.l5n) ?? 0;
      var e = this.osn?.GetCurrentValue(EAttributeId.Proto_Life) ?? 0;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "捕鱼船血量变化", ["curHp", e], ["maxHp", i]);
      }
      for (let t = this.x5e.length; t < i; t++) {
        this.qF_();
      }
      for (let t = 0; t < this.x5e.length; t++) {
        if (t < i) {
          this.x5e[t].SetUiActive(true);
          this.x5e[t].SetHpVisible(t < e);
        } else {
          this.x5e[t].SetUiActive(false);
        }
      }
    }
  }
  qF_() {
    var t = this.GetItem(0);
    var i = this.GetItem(1);
    let e = undefined;
    e = this.x5e.length === 0 ? i.GetOwner() : LguiUtil_1.LguiUtil.DuplicateActor(i.GetOwner(), t);
    i = new FishingHpItem_1.FishingHpItem();
    i.CreateThenShowByActorAsync(e);
    this.x5e.push(i);
  }
}
exports.FishingStateView = FishingStateView;
//# sourceMappingURL=FishingStateView.js.map