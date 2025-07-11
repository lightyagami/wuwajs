"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingTowerRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MowingTowerRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.mll = undefined;
    this.dll = undefined;
    this.H3e = undefined;
    this.bLl = undefined;
    this.SPe = undefined;
    this.JLl = () => {
      var e = new MowingTowerRewardTabItem();
      e.SetClickCallBack(this.gll);
      return e;
    };
    this.ZLl = () => {
      return new MowingTowerRewardItem();
    };
    this.gll = e => {
      this.dll?.SetToggleUnCheck();
      this.dll = e;
      this.Z3e();
    };
    this.Z3e = () => {
      this.H3e?.RefreshByData(this.bLl.GetRewardByLevelId(this.dll?.GetLevelId()), () => {
        var e = this.mll?.GetLayoutItemList();
        if (e) {
          for (const t of e) {
            t.SetRedDotActive(this.bLl.HaveLevelRewardCanTake(t.GetLevelId() ?? 0));
          }
        }
      }, true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIItem]];
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetTitleByTextIdAndArgNew("MowingTowerRewardViewTitle");
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshMowingTowerReward, this.Z3e);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.mll = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.JLl);
    this.H3e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.ZLl);
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ModelManager_1.ModelManager.MowingTowerModel.CurrentSelectActivityId);
    this.bLl = e;
  }
  OnBeforeShow() {
    this.mll?.RefreshByData(this.bLl.GetMowingTowerLevelDetailInfo(), () => {
      var e = this.mll?.GetLayoutItemList();
      if (e) {
        for (const t of e) {
          t.SetRedDotActive(this.bLl.HaveLevelRewardCanTake(t.GetLevelId() ?? 0));
        }
      }
    });
    this.SPe?.PlayLevelSequenceByName("Start");
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshMowingTowerReward, this.Z3e);
  }
}
exports.MowingTowerRewardView = MowingTowerRewardView;
class MowingTowerRewardTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.m_i = undefined;
    this.ClickCallBack = undefined;
    this.kqe = () => {
      this.ClickCallBack?.(this);
    };
  }
  SetClickCallBack(e) {
    this.ClickCallBack = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(e, t, i) {
    this.m_i = e;
    if (i === 0) {
      this.ClickCallBack?.(this);
      this.GetExtendToggle(0).SetToggleState(1);
    } else {
      this.SetToggleUnCheck();
    }
    i = e.GetConfig();
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.RewardName);
      this.SetTextureByPath(i.RewardTexture, this.GetTexture(2));
    }
  }
  SetToggleUnCheck() {
    this.GetExtendToggle(0).SetToggleState(0);
  }
  GetLevelId() {
    return this.m_i?.GetId();
  }
  SetRedDotActive(e) {
    this.GetItem(3)?.SetUIActive(e);
  }
}
class MowingTowerRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.s4e = undefined;
    this.W2e = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.nqe = () => {
      this.$Tt?.ClickFunction?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[4, this.nqe]];
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.W2e);
  }
  Refresh(e, t, i) {
    if ((this.$Tt = e).NameTextArgs) {
      this.GetText(1).SetText(e.NameTextArgs[1] + "/" + e.NameTextArgs[0]);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "BossRushRewardText", e.NameTextArgs[0]);
    }
    this.GetButton(4).RootUIComp.SetUIActive(e.RewardState === 1);
    this.GetItem(5)?.SetUIActive(e.RewardState === 0);
    this.GetItem(6)?.SetUIActive(e.RewardState === 2);
    this.s4e?.RefreshByData(e.RewardList ?? []);
  }
}
//# sourceMappingURL=MowingTowerRewardView.js.map