"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonConditionFilterComponent = undefined;
const UE = require("ue");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiNavigationView_1 = require("../../UiNavigation/UiNavigationView");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LevelSequencePlayer_1 = require("../LevelSequencePlayer");
const CommonConditionFilterItem_1 = require("./CommonConditionFilterItem");
class CommonConditionFilterComponent extends UiNavigationView_1.UiNavigationView {
  constructor(i, e) {
    super();
    this.ConditionFunction = e;
    this.Layout = undefined;
    this.LevelSequencePlayer = undefined;
    this.YTt = () => {
      UiLayer_1.UiLayer.SetShowMaskLayer("CommonConditionFilterComponent", true);
      this.LevelSequencePlayer.PlayLevelSequenceByName("hide");
    };
    this.JTt = i => {
      if (i === "hide") {
        this.SetActive(false);
        UiLayer_1.UiLayer.SetShowMaskLayer("CommonConditionFilterComponent", false);
      }
    };
    this.sGe = (i, e, t) => {
      e = new CommonConditionFilterItem_1.CommonConditionFilterItem(e, i);
      e.SetToggleFunction(this.j5e);
      return {
        Key: t,
        Value: e
      };
    };
    this.j5e = (i, e) => {
      this.ResetComponent();
      this.SetActive(false);
      if (this.ConditionFunction) {
        this.ConditionFunction(i, e);
      }
    };
    this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIVerticalLayout]];
    this.BtnBindInfo = [[0, this.YTt]];
  }
  OnStart() {
    this.Layout = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(2), this.sGe);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.JTt);
  }
  RefreshQualityList(i) {
    this.Layout.RebuildLayoutByDataNew(i);
    this.Layout.GetLayoutItemByKey(0).SetToggleState(true);
  }
  ResetComponent() {
    for (const i of this.Layout.GetLayoutItemMap().values()) {
      i.SetToggleState(false, false);
    }
  }
  OnBeforeDestroy() {
    if (this.Layout) {
      this.Layout.ClearChildren();
      this.Layout = undefined;
    }
  }
  UpdateComponent(i) {
    this.SetActive(true);
    for (const e of this.Layout.GetLayoutItemMap().values()) {
      if (e.GetQualityInfo().Id === i) {
        e.SetToggleState(true, false);
      }
    }
    this.LevelSequencePlayer.PlayLevelSequenceByName("show");
  }
}
exports.CommonConditionFilterComponent = CommonConditionFilterComponent;
//# sourceMappingURL=CommonConditionFilterComponent.js.map