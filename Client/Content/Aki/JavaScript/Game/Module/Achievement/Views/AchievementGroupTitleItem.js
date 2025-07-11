"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementGroupTitleItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const AchievementController_1 = require("../AchievementController");
const AchievementGridItem_1 = require("./AchievementGridItem");
const AchievementProgressConfirmItem_1 = require("./AchievementProgressConfirmItem");
class AchievementGroupTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Fqe = undefined;
    this.oqe = undefined;
    this.Vqe = undefined;
    this.Fbe = () => {
      this.Hqe(this.Fqe);
    };
    this.nqe = () => {
      AchievementController_1.AchievementController.RequestGetAchievementReward(true, this.Fqe.GetId());
    };
  }
  Initialize(e) {
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UITexture]];
  }
  OnStart() {
    this.oqe = new AchievementGridItem_1.AchievementGridItem();
    this.oqe.Initialize(this.GetItem(1).GetOwner());
    this.oqe.SetActive(false);
    this.Vqe = new AchievementProgressConfirmItem_1.AchievementProgressConfirmItem(this.GetItem(0));
    this.Vqe.SetClickCallback(this.nqe);
    this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAchievementGroupDataNotify, this.Fbe);
  }
  Update(e) {
    this.Fqe = e;
    this.Hqe(e);
  }
  Hqe(e) {
    var t;
    var i;
    var s;
    var r;
    var n;
    if (e) {
      t = this.GetText(3);
      i = this.GetText(5);
      s = this.GetText(6);
      r = e.GetFinishState();
      n = e.GetRewards().length > 0;
      this.GetText(2)?.SetText(e.GetTitle());
      t.SetText(e.GetAchievementGroupProgress());
      t?.SetUIActive(n);
      s?.SetUIActive(n);
      this.SetTextureByPath(e.GetTexture(), this.GetTexture(4));
      this.SetTextureByPath(e.GetBackgroundIcon(), this.GetTexture(7));
      this.Vqe?.SetActive(r === 1 && n);
      this.Vqe?.RefreshRedPoint(e.RedPoint());
      if (!n || r === 1) {
        i?.SetUIActive(false);
      } else if (r === 2) {
        i?.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "CollectActivity_state_recived");
      } else {
        i?.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_Doing_Text");
      }
      this.jqe(e);
    }
  }
  jqe(e) {
    var t;
    var i = e?.GetRewards();
    if (i.length > 0) {
      this.oqe.SetActive(true);
      (t = new AchievementGridItem_1.AchievementGridItemData()).Data = i[0];
      t.GetRewardState = e.GetFinishState() === 2;
      this.oqe.Refresh(t);
    } else {
      this.oqe.SetActive(false);
    }
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAchievementGroupDataNotify, this.Fbe);
  }
}
exports.AchievementGroupTitleItem = AchievementGroupTitleItem;
//# sourceMappingURL=AchievementGroupTitleItem.js.map