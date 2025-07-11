"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionAssembleScrollItem = exports.VisionAssembleScrollItemData = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const VisionAssembleItem_1 = require("./VisionAssembleItem");
class VisionAssembleScrollItemData {
  constructor() {
    this.GroupIndex = 0;
    this.ClickCallback = () => {};
    this.CurrentSelectState = false;
    this.VisionEquipGroupData = undefined;
    this.CheckIfCanSelect = () => true;
  }
}
exports.VisionAssembleScrollItemData = VisionAssembleScrollItemData;
class VisionAssembleScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.sl_ = [];
    this.$8i = undefined;
    this.al_ = undefined;
    this.A5e = () => !this.$8i.CurrentSelectState && this.$8i.CheckIfCanSelect();
    this.kqe = () => {
      if (this.$8i) {
        this.$8i.ClickCallback(this.$8i.VisionEquipGroupData);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIExtendToggle]];
    this.BtnBindInfo = [[9, this.kqe]];
  }
  async sGe() {
    if (this.al_ !== undefined) {
      await this.al_.Promise;
    } else {
      this.al_ = new CustomPromise_1.CustomPromise();
      var t = [];
      for (let s = 0; s < 5; s++) {
        var i = new VisionAssembleItem_1.VisionAssembleItem();
        this.sl_.push(i);
        t.push(i.CreateByActorAsync(this.GetItem(2 + s).GetOwner()));
      }
      await Promise.all(t);
      this.al_.SetResult(true);
    }
    return true;
  }
  Refresh(s, t, i) {
    this.GetExtendToggle(9).CanExecuteChange.Unbind();
    var e = (this.$8i = s).VisionEquipGroupData;
    let r = (e ? e?.GetIndex() + 1 : i + 1).toString();
    if (r.length < 2) {
      r = "0" + r;
    }
    if (e) {
      this.GetItem(0).SetUIActive(false);
      this.GetExtendToggle(9).RootUIComp.SetUIActive(true);
      this.GetText(7).SetText(r);
      i = e.GetName();
      this.GetText(8).SetText(i);
      e = s.CurrentSelectState ? 1 : 0;
      this.GetExtendToggle(9).SetToggleState(e, false);
      this.GetExtendToggle(9).CanExecuteChange.Bind(this.A5e);
      this.hl_(s);
    } else {
      this.GetItem(0).SetUIActive(true);
      this.GetExtendToggle(9).RootUIComp.SetUIActive(false);
      this.GetText(1).SetText(r);
    }
  }
  Clear() {
    this.uz_();
  }
  async hl_(s) {
    await this.sGe();
    for (const e of this.sl_) {
      e.SetActive(true);
      e.Reset();
    }
    s = s.VisionEquipGroupData;
    if (s) {
      var t = s.GetVisionUniqueIdList();
      var i = t.length;
      for (let s = 0; s < i; s++) {
        if (ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t[s])) {
          this.sl_[s].Update(t[s]);
        }
      }
    }
  }
  uz_() {
    var s = this.GetExtendToggle(9);
    s.SetToggleStateForce(0, false);
    var t = s.StateSwitchAnimations.Get(1);
    if (t !== undefined) {
      t = t.Animation.LevelSequence;
      s.GetOwner().SequenceJumpToEnd(t);
    }
  }
}
exports.VisionAssembleScrollItem = VisionAssembleScrollItem;
//# sourceMappingURL=VisionAssembleScrollItem.js.map