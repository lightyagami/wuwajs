"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingBuffOverview = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const MowingBuffGridGroup_1 = require("./MowingBuffGridGroup");
const MowingBuffIntroduce_1 = require("./MowingBuffIntroduce");
class MowingBuffOverview extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.u9a = undefined;
    this.c9a = undefined;
    this.ujr = undefined;
    this.m9a = () => new MowingBuffGridGroup_1.MowingBuffGridGroup();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.d9a();
    this.C9a();
    this.g9a();
    this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
  }
  async d9a() {
    var e = new MowingBuffIntroduce_1.MowingBuffIntroduce();
    await e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.u9a = e;
  }
  C9a() {
    this.GetItem(2).SetUIActive(false);
  }
  g9a() {
    this.c9a = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.m9a, undefined, true);
  }
  async RefreshByCustomDataAsync(e) {
    if ((this.Pe = e) === undefined) {
      this.GetItem(1)?.SetUIActive(true);
      this.GetItem(5)?.SetUIActive(false);
      this.u9a.SetUiActive(false);
    } else {
      this.GetItem(1)?.SetUIActive(false);
      this.GetItem(5)?.SetUIActive(true);
      this.u9a.SetUiActive(true);
      this.u9a.RefreshByCustomData(e.IntroduceData);
      await this.c9a.RefreshByDataAsync(e.BuffGroupData);
    }
  }
  async PlayStartSequenceAsync() {
    await this.ujr.LitePlayAsync("Start", true);
  }
  PlayUnlockSequenceAsync() {
    if (this.Pe) {
      for (const e of this.c9a.GetLayoutItemList()) {
        for (const i of e.GetBuffGridItemLayout().GetLayoutItemList()) {
          if (i.CheckNeedPlayUnlockSequence()) {
            i.PlayUnlockEffect();
          }
        }
      }
    }
  }
}
exports.MowingBuffOverview = MowingBuffOverview;
//# sourceMappingURL=MowingBuffOverview.js.map