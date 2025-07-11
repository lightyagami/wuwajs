"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchSkillItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FloroRanchSkillItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Fr = () => {
      UiManager_1.UiManager.OpenView("FloroRanchSkillView", true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[4, this.Fr]];
  }
  Refresh(e) {
    this.GetTexture(0)?.SetUIActive(e !== 0);
    this.GetSprite(1)?.SetUIActive(e !== 0);
    this.GetSprite(3)?.SetUIActive(e === 0);
    if (e === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "FloroRanchSelectSkill");
    } else {
      e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchSkillData(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
      this.SetTextureByPath(e.Icon, this.GetTexture(0));
      this.RefreshRedDot();
    }
  }
  RefreshRedDot() {
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().IsSkillHasRedDot();
    this.GetItem(5)?.SetUIActive(e);
  }
}
exports.FloroRanchSkillItem = FloroRanchSkillItem;
//# sourceMappingURL=FloroRanchSkillItem.js.map