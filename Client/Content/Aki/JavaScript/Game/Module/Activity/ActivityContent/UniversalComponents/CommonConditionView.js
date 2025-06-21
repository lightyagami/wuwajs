"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CommonConditionView = void 0;
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class CommonConditionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.ConditionGroupData = void 0, this.ConditionLayout = void 0, this.TextIdMap = new Map([
      ["FinishAllConditionOpen", "TaskNotOpen_Tips01"],
      ["FinishAnyConditionOpen", "TaskNotOpen_Tips02"],
      ["FinishAllConditionPreOpen", "TaskNotPreOpen_Tips01"],
      ["FinishAnyConditionPreOpen", "TaskNotPreOpen_Tips02"]
    ]), this.n8a = () => new ActivityConditionItem
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem]
    ]
  }
  OnStart() {
    this.ConditionGroupData = this.OpenParam, this.CreateConditionLayout()
  }
  OnBeforeShow() {
    var i;
    this.ConditionGroupData && (i = this.ConditionGroupData.DataList, this.ConditionLayout?.RefreshByData(i), this.a8a())
  }
  CreateConditionLayout() {
    var i = this.GetLoopScrollViewComponent(2),
      t = this.GetItem(3);
    this.ConditionLayout = new LoopScrollView_1.LoopScrollView(i, t.GetOwner(), this.n8a)
  }
  a8a() {
    var t = this.ConditionGroupData;
    if (t) {
      var e = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(t.ConditionGroupId);
      let i = "";
      i = t.IsPreOpen ? e?.Relation ? this.TextIdMap.get("FinishAnyConditionPreOpen") : this.TextIdMap.get("FinishAllConditionPreOpen") : e?.Relation ? this.TextIdMap.get("FinishAnyConditionOpen") : this.TextIdMap.get("FinishAllConditionOpen");
      e = t.TitleId ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.TitleId) : "";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i, e)
    }
  }
}
exports.CommonConditionView = CommonConditionView;
class ActivityConditionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this.$3e = () => {
      this.Pe?.AccessId && SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.AccessId)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [5, this.$3e],
      [8, this.$3e]
    ]
  }
  Refresh(i, t, e) {
    var s = (this.Pe = i).IsFinished,
      n = 7 === i.AccessType,
      r = 16 === i.AccessType,
      o = 0 === i.AccessId,
      h = this.GetText(4);
    StringUtils_1.StringUtils.IsEmpty(i.ConditionTextId) ? h.SetText("") : h.ShowTextNew(i.ConditionTextId), h.SetChangeColor(s, h.changeColor), this.GetItem(0).SetUIActive(s), this.GetItem(1).SetUIActive(!s && n), this.GetItem(2).SetUIActive(!s && !n), this.GetItem(3).SetUIActive(!s), this.GetItem(6).SetUIActive(s), this.GetItem(7).SetUIActive(!s && o), this.GetButton(5).RootUIComp.SetUIActive(!s && !o && !r), this.GetButton(8).RootUIComp.SetUIActive(!s && !o && r)
  }
}
//# sourceMappingURL=CommonConditionView.js.map