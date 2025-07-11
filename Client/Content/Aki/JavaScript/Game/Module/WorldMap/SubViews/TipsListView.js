"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonCostTip = exports.TipsListView = undefined;
const UE = require("ue");
const UiComponentsAction_1 = require("../../../Ui/Base/UiComponentsAction");
const GenericLayoutAdd_1 = require("../../Util/GenericLayoutAdd");
class TipsListView {
  constructor() {
    this.U2o = undefined;
    this.OnInstanceRefresh = (t, e, i, s) => {
      var n = new InstanceDungeonCostTip();
      n.SetRootActor(e.GetOwner(), true);
      return {
        Key: t,
        Value: n
      };
    };
  }
  Initialize(t) {
    this.U2o = new GenericLayoutAdd_1.GenericLayoutAdd(t, this.OnInstanceRefresh);
  }
  AddItemByKey(t) {
    var e = this.U2o.GetLayoutItemByKey(t);
    if (!e) {
      this.U2o.AddItemToLayout([t]);
      (e = this.U2o.GetLayoutItemByKey(t)).SetStarVisible(false);
      e.SetIconVisible(false);
      e.SetLeftText("");
      e.SetRightText("");
    }
    return e;
  }
  Clear() {
    this.U2o.ClearChildren();
  }
}
exports.TipsListView = TipsListView;
class InstanceDungeonCostTip extends UiComponentsAction_1.UiComponentsAction {
  constructor() {
    super(...arguments);
    this.gFo = undefined;
    this.fFo = () => {
      this.gFo?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UITexture], [4, UE.UISprite]];
    this.BtnBindInfo = [[2, this.fFo]];
  }
  SetClickHelpFunc(t) {
    this.gFo = t;
  }
  SetLeftText(t) {
    this.GetText(0).SetText(t);
  }
  SetRightText(t) {
    this.GetText(1).SetText(t);
  }
  SetHelpButtonVisible(t) {
    this.GetButton(2).RootUIComp.SetUIActive(t);
  }
  SetIconVisible(t) {
    this.GetTexture(3).SetUIActive(t);
  }
  SetStarVisible(t) {
    this.GetSprite(4).SetUIActive(t);
  }
  SetIconByPath(t) {
    this.GetTexture(3).SetUIActive(true);
    this.SetTextureByPath(t, this.GetTexture(3));
  }
  SetIconByItemId(t) {
    this.GetTexture(3).SetUIActive(true);
    this.SetItemIcon(this.GetTexture(3), t);
  }
}
exports.InstanceDungeonCostTip = InstanceDungeonCostTip;
//# sourceMappingURL=TipsListView.js.map