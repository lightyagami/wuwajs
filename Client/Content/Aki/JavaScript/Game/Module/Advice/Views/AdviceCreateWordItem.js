"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceCreateWordItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const AdviceCreateWordBtnItem_1 = require("./AdviceCreateWordBtnItem");
class AdviceCreateWordItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Xy = 0;
    this.J7e = new Array();
    this.z7e = undefined;
    this.Z7e = undefined;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.eHe();
    this.tHe();
    this.iHe();
    this.GetItem(1).SetUIActive(false);
    this.GetText(0).SetUIActive(false);
  }
  eHe() {
    for (let t = 0; t < 2; t++) {
      var e = LguiUtil_1.LguiUtil.CopyItem(this.GetText(0), this.RootItem);
      this.J7e.push(e);
    }
  }
  tHe() {
    var t = this.GetItem(1);
    var t = LguiUtil_1.LguiUtil.CopyItem(t, this.RootItem);
    var t = new AdviceCreateWordBtnItem_1.AdviceCreateWordBtnItem(t);
    this.z7e = t;
    this.z7e.SetType(1);
  }
  iHe() {
    var t = this.GetItem(1);
    var t = LguiUtil_1.LguiUtil.CopyItem(t, this.RootItem);
    var t = new AdviceCreateWordBtnItem_1.AdviceCreateWordBtnItem(t);
    this.Z7e = t;
    this.Z7e.SetType(0);
  }
  SetIndex(t) {
    this.Xy = t;
    this.z7e.SetIndex(t);
    this.Z7e.SetIndex(t);
  }
  RefreshView() {
    this.Z9e();
    this.Y7e();
  }
  Z9e() {
    const e = this.GetItem(2);
    this.J7e.forEach(t => {
      t.SetUIActive(false);
      t.SetUIParent(e);
    });
    this.z7e.GetRootItem().SetUIParent(e);
    this.Z7e.GetRootItem().SetUIParent(e);
    this.z7e.GetRootItem().SetUIActive(false);
    this.Z7e.GetRootItem().SetUIActive(false);
  }
  Y7e() {
    var t = ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.get(this.Xy);
    if (!(t <= 0)) {
      if (this.Xy > 0) {
        this.z7e.GetRootItem().SetUIParent(this.RootItem);
        this.z7e.GetRootItem().SetUIActive(true);
        this.z7e.RefreshView();
      }
      var e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(t).split("{}");
      for (let t = 0; t < e.length; t++) {
        this.J7e[t].SetText(e[t]);
        this.J7e[t].SetUIParent(this.RootItem);
        if (t + 1 < e.length) {
          this.Z7e.GetRootItem().SetUIParent(this.RootItem);
          this.Z7e.GetRootItem().SetUIActive(true);
          this.Z7e.RefreshView();
        }
        this.J7e[t].SetUIActive(true);
      }
    }
  }
}
exports.AdviceCreateWordItem = AdviceCreateWordItem;
//# sourceMappingURL=AdviceCreateWordItem.js.map