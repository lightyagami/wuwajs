"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPickRoleChoicePanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const TotalTopUpDefine_1 = require("../../TotalTopUpDefine");
const TotalTopUpPickRoleRewardItem_1 = require("./TotalTopUpPickRoleRewardItem");
const posNodeList = [0, 1, 2, 3];
class TotalTopUpPickRoleChoicePanel extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.avt = e;
    this.vQa = [];
    this.Smm = undefined;
    this.Rxg = e => {
      this.SelectItem(e.Index);
    };
  }
  SetSelectCallback(e) {
    this.Smm = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [];
    for (const e of posNodeList) {
      this.ComponentRegisterInfos.push([e, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t = [];
    for (let e = 0; e < this.avt.length; e++) {
      var o = this.avt[e];
      var i = posNodeList[e];
      if (i === undefined) {
        TotalTopUpDefine_1.TotalTopUpUtil.Error("角色试用奖励位置节点不存在", ["Index", e], ["DataLength", this.avt.length]);
        return;
      }
      o = new TotalTopUpPickRoleRewardItem_1.TotalTopUpPickRoleRewardItem(o);
      o.SetSelectCallback(this.Rxg);
      this.vQa.push(o);
      o = o.CreateByResourceIdAsync("UiItem_TotalTopUpTogRoleTrial", this.GetItem(i));
      t.push(o);
    }
    await Promise.all(t);
    for (const e of this.vQa) {
      e.SetUiActive(true);
    }
  }
  SelectItem(t) {
    for (let e = 0; e < this.vQa.length; e++) {
      var o = this.vQa[e];
      var i = e === t;
      o.SetSelected(i);
    }
    var e;
    if (this.Smm) {
      e = this.avt[t];
      this.Smm(e);
    }
  }
}
exports.TotalTopUpPickRoleChoicePanel = TotalTopUpPickRoleChoicePanel;
//# sourceMappingURL=TotalTopUpPickRoleChoicePanel.js.map