"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFunPlayTabItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ROME_ICON_PATH = "/Game/Aki/UI/UIResources/Common/Atlas/SP_ComRomeText_0{0}.SP_ComRomeText_0{1}";
class ActivityFunPlayTabItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.yuu = undefined;
    this.qFe = false;
    this.jbe = t => {
      if (t === 1) {
        this.ScrollViewDelegate.SelectGridProxy(this.GridIndex, this.DisplayIndex, true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UITexture]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  TryBindRedDot() {
    if (!this.qFe && this.yuu) {
      this.qFe = true;
      RedDotController_1.RedDotController.BindRedDot("ActivityFunPlay", this.GetItem(10), undefined, this.yuu.GetChallengeId());
      RedDotController_1.RedDotController.BindRedDot("ActivityFunPlay", this.GetItem(6), undefined, this.yuu.GetChallengeId());
    }
  }
  OnStart() {
    this.GetExtendToggle(0).SetToggleState(0, false);
  }
  OnBeforeDestroy() {
    if (this.yuu) {
      RedDotController_1.RedDotController.UnBindGivenUi("ActivityFunPlay", this.GetItem(10), this.yuu.GetChallengeId());
      RedDotController_1.RedDotController.UnBindGivenUi("ActivityFunPlay", this.GetItem(6), this.yuu.GetChallengeId());
    }
  }
  Og() {
    this.WNe();
    this.mGe();
    this.GFe();
    this.NFe();
  }
  WNe() {
    if (this.yuu) {
      this.SetTextureByPath(this.yuu.GetBackgroundTexturePath(), this.GetTexture(11));
    }
  }
  mGe() {
    if (this.yuu) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.yuu.GetTabTitle());
    }
  }
  GFe() {
    var t;
    if (this.yuu) {
      t = this.yuu.CheckRewardStatus(Protocol_1.Aki.Protocol.Qju.Proto_FunPlayRewarded);
      this.GetSprite(3).SetUIActive(t);
      this.GetSprite(8).SetUIActive(t);
      this.GetSprite(2).SetUIActive(false);
      t = (this.GridIndex + 1).toString();
      this.SetSpriteByPath(StringUtils_1.StringUtils.Format(ROME_ICON_PATH, t, t), this.GetSprite(7), false);
    }
  }
  NFe() {
    if (this.yuu) {
      this.GetItem(9).SetUIActive(!this.yuu.GetIsUnlock());
      this.GetItem(5).SetUIActive(!this.yuu.GetIsUnlock());
      this.GetItem(4).SetUIActive(!this.yuu.GetIsUnlock());
    }
  }
  Refresh(t, e, i) {
    this.yuu = t;
    this.TryBindRedDot();
    this.Og();
  }
  Clear() {}
  OnSelected(t) {
    if (this.yuu) {
      this.GetExtendToggle(0).SetToggleState(1, t);
      ModelManager_1.ModelManager.ActivityFunPlayModel.SetCurrentChallengeData(this.yuu.GetChallengeId());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectActivityFunPlayChallengeItem);
      this.yuu.RefreshUnlockRedDot();
    }
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
  GetKey(t, e) {
    return this.GridIndex;
  }
}
exports.ActivityFunPlayTabItem = ActivityFunPlayTabItem;
//# sourceMappingURL=ActivityFunPlayTabItem.js.map