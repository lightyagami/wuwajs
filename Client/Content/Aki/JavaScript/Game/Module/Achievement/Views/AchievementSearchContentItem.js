"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementSearchContentItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const AchievementController_1 = require("../AchievementController");
const AchievementProgressConfirmItem_1 = require("./AchievementProgressConfirmItem");
const AchievementProgressItem_1 = require("./AchievementProgressItem");
const AchievementStarItem_1 = require("./AchievementStarItem");
const AchievementGridItem_1 = require("./AchievementGridItem");
class AchievementSearchContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.tqe = undefined;
    this.iqe = undefined;
    this.hGe = undefined;
    this.oqe = undefined;
    this.lGe = undefined;
    this.wqe = undefined;
    this.rqe = e => {
      if (!ModelManager_1.ModelManager.AchievementModel.AchievementSearchState) {
        if (e === this.iqe?.GetId() && (this.iqe?.IfSingleAchievement() || !this.iqe?.IfSingleAchievement() && this.iqe.GetNextLink() === 0)) {
          this.Pqe();
          this.Nqe();
          this.aqe();
          this._Ge();
          this.jqe();
          this.uGe();
          this.cGe();
        }
      }
    };
    this.nqe = () => {
      AchievementController_1.AchievementController.RequestGetAchievementReward(false, this.iqe.GetId());
    };
    this.wqe = e;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  GetItemSize(e) {
    var t = this.GetRootItem();
    e.Set(t.GetWidth(), t.GetHeight());
    return e.ToUeVector2D(true);
  }
  ClearItem() {
    this.Destroy();
  }
  GetUsingItem() {
    return this.GetRootItem().GetOwner();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    this.hGe = new AchievementProgressItem_1.AchievementProgressItem(this.GetItem(6));
    this.hGe.SetActive(true);
    this.oqe = new AchievementGridItem_1.AchievementGridItem();
    this.oqe.Initialize(this.GetItem(1).GetOwner());
    this.lGe = new AchievementProgressConfirmItem_1.AchievementProgressConfirmItem(this.GetItem(0));
    this.lGe.SetClickCallback(this.nqe);
    this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAchievementDataWithIdNotify, this.rqe);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAchievementDataWithIdNotify, this.rqe);
  }
  Update(e) {
    this.iqe = e.AchievementData;
    this.mGe();
    this.Pqe();
    this.Nqe();
    this.aqe();
    this._Ge();
    this.jqe();
    this.uGe();
    this.cGe();
  }
  mGe() {
    if (ModelManager_1.ModelManager.AchievementModel.AchievementSearchState) {
      this.GetText(2).SetText(this.iqe.GetReplaceTitle(ModelManager_1.ModelManager.AchievementModel.CurrentSearchText));
    } else {
      this.GetText(2).SetText(this.iqe.GetTitle());
    }
  }
  Pqe() {
    if (ModelManager_1.ModelManager.AchievementModel.AchievementSearchState) {
      this.GetText(4).SetText(this.iqe.GetReplaceDesc(ModelManager_1.ModelManager.AchievementModel.CurrentSearchText));
    } else {
      this.GetText(4).SetText(this.iqe.GetDesc());
    }
  }
  Nqe() {
    var e = this.iqe.GetCurrentProgress();
    var t = this.iqe.GetMaxProgress();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "CollectProgress", e, t);
  }
  aqe() {
    if (this.tqe !== undefined) {
      this.tqe.Destroy();
      this.tqe = undefined;
    }
    var e = this.iqe.IfSingleAchievement() ? this.iqe.GetAchievementShowStar() : AchievementSearchContentItem.hqe;
    this.tqe = new AchievementStarItem_1.AchievementStarItem(e, this.iqe, this.GetItem(5));
  }
  _Ge() {
    this.lGe.RefreshRedPoint(this.iqe.RedPoint());
  }
  uGe() {
    this.lGe.SetActive(this.iqe.GetFinishState() === 1);
  }
  cGe() {
    this.hGe.RefreshState(this.iqe);
  }
  jqe() {
    var e = this.iqe.GetRewards();
    if (e.length > 0) {
      this.sqe(e[0]);
    }
  }
  sqe(e) {
    var t = new AchievementGridItem_1.AchievementGridItemData();
    t.Data = e;
    t.GetRewardState = this.iqe.GetFinishState() === 2;
    this.oqe.Refresh(t);
  }
  OnBeforeDestroy() {
    if (this.tqe) {
      this.tqe.Destroy();
      this.tqe = undefined;
    }
    this.RemoveEventListener();
  }
}
(exports.AchievementSearchContentItem = AchievementSearchContentItem).hqe = 3;
//# sourceMappingURL=AchievementSearchContentItem.js.map