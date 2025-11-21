"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const UiModel_1 = require("../../../Ui/UiModel");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ExploreData = undefined;
    this.AreaId = 0;
    this.eTt = () => {
      if (ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(this.AreaId).IsDisableInExplore) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ExplorationForbid_Text");
      } else if (this.ExploreData) {
        UiManager_1.UiManager.OpenView("MapExploreDetailView", {
          AreaId: this.AreaId
        }, (e, r) => {
          if (e) {
            UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(r);
          }
        });
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "ExploreItem Click, ExploreData is null");
      }
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
    this.GetText(2)?.SetRichText(true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  Update(e) {
    this.AreaId = e;
    var r = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e);
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title);
    var i = r?.GetProgress() ?? 0;
    let t = i + "%";
    if (r?.IsReachMaxProgress) {
      t = StringUtils_1.StringUtils.Format("<color=#ffd12f>{0}%</color>", i.toString());
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Text_ExploreRate", t);
    this.ExploreData = r;
    this.GetItem(3).SetUIActive(!r?.IsReachMaxProgress);
    if (!r?.IsReachMaxProgress) {
      i = r?.GetNextStageNeedProgress() ?? 0;
      r = r?.GetStageProgress() ?? 0;
      this.GetText(4).SetText(i + "%");
      this.GetSprite(5).SetFillAmount(r);
      if (e.IsDisableInExplore) {
        this.GetText(2).SetUIActive(false);
      }
    }
  }
  OnBeforeShow() {
    this.K8e();
  }
  OnBeforeHide() {
    this.Ovt();
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot("MapAreaExplore", this.GetItem(6));
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindRedDot("MapAreaExplore");
  }
}
exports.ExploreItem = ExploreItem;
//# sourceMappingURL=ExploreItem.js.map