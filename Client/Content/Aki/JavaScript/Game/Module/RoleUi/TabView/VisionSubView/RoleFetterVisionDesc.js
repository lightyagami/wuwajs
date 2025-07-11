"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFetterVisionDesc = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
class RoleFetterVisionDesc extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.ACo = undefined;
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem]];
  }
  Refresh(e) {
    this.ACo.SetActive(e.length > 0);
    this.ACo.Update(e);
  }
  OnBeforeDestroy() {
    this.ACo.Destroy();
  }
}
exports.RoleFetterVisionDesc = RoleFetterVisionDesc;
class RoleVisionDescScroller extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.ZHe = undefined;
    this.Y6i = (e, s, t) => {
      s = new RoleVisionFetterDescScrollerItem(s);
      s.Update(e);
      return {
        Key: t,
        Value: s
      };
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem]];
  }
  OnStart() {
    this.ZHe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.Y6i);
  }
  Update(e) {
    this.ZHe.RefreshByData(e);
  }
  OnBeforeDestroy() {
    this.ZHe.ClearChildren();
  }
}
class RoleVisionFetterDescScrollerItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Update(e) {
    this.GetText(0).ShowTextNew(e.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.EffectDescription, ...e.EffectDescriptionParam);
  }
}
//# sourceMappingURL=RoleFetterVisionDesc.js.map