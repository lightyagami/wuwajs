"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRunCycleItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ROME_ICON_PATH = "/Game/Aki/UI/UIResources/Common/Atlas/SP_ComRomeText_0{0}.SP_ComRomeText_0{1}";
class ActivityRunCycleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.BFe = 0;
    this.bFe = undefined;
    this.qFe = false;
    this.jbe = t => {
      if (t === 1) {
        this.ScrollViewDelegate.SelectGridProxy(this.GridIndex, this.DisplayIndex, true);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickActivityRunChallenge, this);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UITexture]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  TryBindRedDot() {
    if (!this.qFe) {
      this.qFe = true;
      RedDotController_1.RedDotController.BindRedDot("ActivityRun", this.GetItem(10), undefined, this.BFe);
      RedDotController_1.RedDotController.BindRedDot("ActivityRun", this.GetItem(6), undefined, this.BFe);
    }
  }
  OnStart() {
    this.GetExtendToggle(0).SetToggleState(0, false);
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityRun", this.GetItem(10), this.BFe);
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityRun", this.GetItem(6), this.BFe);
    this.GetSprite(7).SetSprite(undefined);
  }
  Og() {
    this.bFe = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(this.BFe);
    this.SetTextureByPath(this.bFe.GetBackgroundTexturePath(), this.GetTexture(11));
    this.mGe();
    this.GFe();
    this.NFe();
  }
  mGe() {
    this.GetText(1).SetText(this.bFe.GetTitle());
  }
  GFe() {
    this.GetSprite(3).SetUIActive(this.bFe.GetIfRewardAllFinished());
    this.GetSprite(8).SetUIActive(this.bFe.GetIfRewardAllFinished());
    this.GetSprite(2).SetUIActive(false);
    var t = (this.GridIndex + 1).toString();
    this.SetSpriteByPath(StringUtils_1.StringUtils.Format(ROME_ICON_PATH, t, t), this.GetSprite(7), false);
  }
  NFe() {
    this.GetItem(9).SetUIActive(!this.bFe.GetIsShow());
    this.GetItem(5).SetUIActive(!this.bFe.GetIsShow());
    this.GetItem(4).SetUIActive(!this.bFe.GetIsShow());
  }
  Refresh(t, e, i) {
    this.BFe = t;
    this.TryBindRedDot();
    this.Og();
  }
  Clear() {}
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t);
    ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId = this.BFe;
    t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.bFe.GetActivityId());
    if (t) {
      t.SetActivityContentIndex(this.GridIndex);
      if (this.bFe.GetIsShow() && this.bFe.GetChallengeNewLocalRedPoint()) {
        this.bFe.SetChallengeLocalRedPointState(false);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectActivityRunChallengeItem);
    }
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
  GetKey(t, e) {
    return this.GridIndex;
  }
}
exports.ActivityRunCycleItem = ActivityRunCycleItem;
//# sourceMappingURL=ActivityRunCycleItem.js.map