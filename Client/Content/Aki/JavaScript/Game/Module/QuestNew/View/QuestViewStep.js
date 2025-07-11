"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestViewStep = undefined;
const ue_1 = require("ue");
const StepBaseItem_1 = require("../../BattleUi/Views/MissionView/TreeStep/StepBaseItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const QuestViewChildStep_1 = require("./QuestViewChildStep");
class QuestViewStep extends StepBaseItem_1.StepBaseItem {
  constructor() {
    super(...arguments);
    this.Qct = [];
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, ue_1.UIItem]);
    this.ComponentRegisterInfos.push([3, ue_1.UIItem]);
    this.ComponentRegisterInfos.push([4, ue_1.UIItem]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.GetItem(3)?.SetUIActive(true);
    this.GetItem(4)?.SetUIActive(true);
    var t = this.GetItem(2);
    var e = new QuestViewChildStep_1.QuestViewChildStep(0, 0);
    await e.CreateThenShowByActorAsync(t.GetOwner(), 1);
    await e.HideAsync();
    this.Qct.push(e);
  }
  OnBeforeDestroy() {}
  async Update(e) {
    if (e) {
      this.SetActive(true);
      await this.Refresh(e, e.MainStepInfo);
      let t = await this.Xct();
      if (!this.DescribeTextVisible && t === 1) {
        if (e = this.Qct.find(t => t.GetActive())) {
          this.CopyStepInfo(e);
          e.SetActive(false);
          t = 0;
        }
      }
      this.GetItem(3)?.SetUIActive(this.DescribeTextVisible);
      this.GetItem(4)?.SetUIActive(this.DescribeTextVisible || t > 0);
    } else {
      this.SetActive(false);
    }
  }
  async Xct() {
    var i;
    var s = this.GetItem(2);
    if (!s) {
      return 0;
    }
    const r = this.ShowData;
    if (!r || !r.SubStepInfos) {
      this.Qct.forEach(t => {
        t.SetActive(false);
      });
      return 0;
    }
    let h = s.GetHierarchyIndex();
    const a = [];
    for (let e = 0; e < r.SubStepInfos.length; e++) {
      let t = undefined;
      if (this.Qct.length > e) {
        t = this.Qct[e];
      } else {
        (i = LguiUtil_1.LguiUtil.CopyItem(s, s.GetParentAsUIItem())).SetHierarchyIndex(++h);
        t = new QuestViewChildStep_1.QuestViewChildStep(0, e);
        a.push(t.CreateThenShowByActorAsync(i.GetOwner(), 1));
        this.Qct.push(t);
      }
    }
    await Promise.all(a);
    a.length = 0;
    r.SubStepInfos.forEach((t, e) => {
      a.push(this.Qct[e].Refresh(r, t));
    });
    await Promise.all(a);
    let u = 0;
    this.Qct.forEach((t, e) => {
      e = e < r.SubStepInfos.length && t.IsDescribeTextVisible;
      t.SetActive(e);
      if (e) {
        u++;
      }
    });
    return u;
  }
}
exports.QuestViewStep = QuestViewStep;
//# sourceMappingURL=QuestViewStep.js.map