"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleVisibleChildView = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const VisibleStateUtil_1 = require("../../VisibleStateUtil");
const BattleChildView_1 = require("./BattleChildView");
class BattleVisibleChildView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.ChildViewData = undefined;
    this.ChildType = 0;
    this.BaseVisible = false;
    this.IsEnable = false;
    this.InnerVisibleState = 0;
    this.iJe = () => {
      this.oJe();
    };
  }
  InitChildType(i = 0) {
    this.ChildType = i;
    if (this.ChildType === 37) {
      this.BaseVisible = true;
      this.InnerVisibleState = 1;
    } else {
      this.ChildViewData = ModelManager_1.ModelManager.BattleUiModel.ChildViewData;
      this.BaseVisible = this.ChildViewData.GetChildVisible(i);
      this.InnerVisibleState = 1;
      this.ChildViewData.AddCallback(i, this.iJe);
    }
  }
  ShowBattleVisibleChildView(i = false) {
    this.IsEnable = true;
    this.rJe(0, true);
    var t = this.GetVisible();
    if (!!t || !i) {
      this.SetActive(t);
    }
    if (t) {
      this.SetActive(true);
      this.OnShowBattleChildView();
    }
  }
  HideBattleVisibleChildView() {
    this.IsEnable = false;
    var i = this.GetVisible();
    this.rJe(0, false);
    this.SetActive(this.GetVisible());
    if (i) {
      this.OnHideBattleChildView();
    }
  }
  Reset() {
    this.rJe(0, false);
    if (this.ChildViewData) {
      this.ChildViewData.RemoveCallback(this.ChildType, this.iJe);
      this.ChildViewData = undefined;
    }
    super.Reset();
  }
  ClearChildViewData() {
    if (this.ChildViewData) {
      this.ChildViewData.RemoveCallback(this.ChildType, this.iJe);
      this.ChildViewData = undefined;
    }
  }
  SetActive(i) {
    if (this.GetVisible() !== i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "战斗子界面不要直接调用SetActive, 请调用SetVisible");
      }
    } else {
      super.SetActive(i);
    }
  }
  oJe() {
    var i = this.GetVisible();
    this.BaseVisible = this.ChildViewData.GetChildVisible(this.ChildType);
    this.nJe(i);
  }
  SetVisible(i, t) {
    var e = this.GetVisible();
    this.rJe(i, t);
    this.nJe(e);
  }
  nJe(i) {
    if (this.IsEnable && i !== (i = this.GetVisible())) {
      this.SetActive(i);
      if (i) {
        this.OnShowBattleChildView();
      } else {
        this.OnHideBattleChildView();
      }
    }
  }
  rJe(i, t) {
    this.InnerVisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.InnerVisibleState, t, i);
  }
  GetVisible() {
    return this.BaseVisible && this.InnerVisibleState === 0;
  }
  OnShowBattleChildView() {}
  OnHideBattleChildView() {}
}
exports.BattleVisibleChildView = BattleVisibleChildView;
//# sourceMappingURL=BattleVisibleChildView.js.map