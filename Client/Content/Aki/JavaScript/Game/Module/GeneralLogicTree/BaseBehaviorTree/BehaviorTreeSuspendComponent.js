"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorTreeSuspendComponent = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil");
class BehaviorTreeSuspendComponent {
  constructor(e, t) {
    this.$mt = BigInt(0);
    this.Yre = undefined;
    this._Qt = undefined;
    this.Wjs = 0;
    this.Yre = t;
    this._Qt = [];
    this.$mt = e;
  }
  GetSuspendType() {
    if (this.Wjs) {
      if ((this.Wjs & 2) == 2) {
        return 2;
      } else if ((this.Wjs & 1) == 1) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  GetSuspendText() {
    if (this.Yre.IsSuspend()) {
      let e = undefined;
      switch (this.GetSuspendType()) {
        case 1:
          if (this._Qt && this._Qt.length > 0) {
            e = this.cQt(this._Qt[0]);
          }
          break;
        case 2:
          e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("SuspendByOnline");
      }
      return e;
    }
  }
  GetOccupations() {
    return this._Qt;
  }
  cQt(e) {
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("QuestResourcesIsOccupied");
    var i = UE.NewArray(UE.BuiltinString);
    var s = ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationResourceName(e.ResourceName);
    var e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeName(e.TreeIncId);
    i.Add(s);
    i.Add(e);
    return UE.KuroStaticLibrary.KuroFormatText(t, i);
  }
  UpdateOccupations(e, t, i) {
    if ((this.Wjs = t) === 0) {
      this.ClearOccupations();
    } else {
      this.Yre.RemoveTag(9);
      this._Qt.splice(0, this._Qt.length);
      for (const n of i) {
        var s = MathUtils_1.MathUtils.LongToBigInt(n.w5n);
        var s = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(s);
        let e = "";
        if (s) {
          s = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(s.BtType, s.TreeConfigId);
          e = s.Name;
        }
        this._Qt.push({
          ResourceName: n.qEs,
          QuestName: e,
          TreeIncId: MathUtils_1.MathUtils.LongToBigInt(n.w5n)
        });
      }
      this.Yre.AddTag(9);
      t = this.GetSuspendType();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.$mt, e, t);
      EventSystem_1.EventSystem.EmitWithTarget(this.Yre, EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.$mt, e, t);
    }
  }
  ClearOccupations() {
    this._Qt.splice(0, this._Qt.length);
    this.Yre.RemoveTag(9);
    this.Yre.RemoveTag(10);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend, this.$mt);
    EventSystem_1.EventSystem.EmitWithTarget(this.Yre, EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend, this.$mt);
  }
}
exports.BehaviorTreeSuspendComponent = BehaviorTreeSuspendComponent;
//# sourceMappingURL=BehaviorTreeSuspendComponent.js.map