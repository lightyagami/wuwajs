"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class BossRushRewardView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.mll = undefined;
    this.dll = undefined;
    this.H3e = undefined;
    this.pyn = undefined;
    this.SPe = undefined;
    this.Cll = () => {
      var e = new BossRushRewardTabItem();
      e.SetClickCallBack(this.gll);
      return e;
    };
    this.pll = () => {
      return new BossRushRewardItem();
    };
    this.gll = e => {
      this.dll?.SetToggleUnCheck();
      this.dll = e;
      this.Z3e();
    };
    this.Z3e = () => {
      var e = [];
      for (const s of this.pyn.GetTabRewardData(this.dll?.GetTab()?.TabId ?? 0)) {
        var t = new RewardContentData();
        t.RewardData = s;
        e.push(t);
      }
      this.H3e?.RefreshByData(e, undefined, true);
      var i = this.mll?.GetLayoutItemList();
      if (i) {
        for (const r of i) {
          r.RefreshRedDot();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIVerticalLayout], [3, UE.UIItem]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BossRefreshBossRushReward, this.Z3e);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BossRefreshBossRushReward, this.Z3e);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.mll = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.Cll);
    this.H3e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.pll);
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId);
    this.pyn = e;
  }
  OnBeforeShow() {
    this.AB_();
    this.SPe?.PlayLevelSequenceByName("Start");
  }
  AB_() {
    this.mll?.RefreshByData(this.pyn.GetBossRushAllTabData());
  }
  OnBeforeDestroy() {}
}
exports.BossRushRewardView = BossRushRewardView;
class BossRushRewardTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.PB_ = undefined;
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
    this.PB_ = e;
    if (i === 0) {
      this.ClickCallBack?.(this);
      this.GetExtendToggle(0).SetToggleState(1);
    } else {
      this.SetToggleUnCheck();
    }
    i = e;
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.TabTitle);
      this.SetTextureByPath(i.Texture, this.GetTexture(2));
      this.RefreshRedDot();
    }
  }
  RefreshRedDot() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.PB_.ActivityId).GetTabRedDotState(this.PB_.TabId);
    this.SetRedDotActive(e);
  }
  SetToggleUnCheck() {
    this.GetExtendToggle(0).SetToggleState(0);
  }
  GetTab() {
    return this.PB_;
  }
  SetRedDotActive(e) {
    this.GetItem(3)?.SetUIActive(e);
  }
}
class RewardContentData {
  constructor() {
    this.RewardData = undefined;
  }
}
class BossRushRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.s4e = undefined;
    this.W2e = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.nqe = () => {
      this.$Tt?.RewardData?.ClickFunction?.();
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
    e = (this.$Tt = e).RewardData;
    if (e.NameTextArgs) {
      this.GetText(1).SetText(e.NameTextArgs[0] + "/" + e.NameTextArgs[1]);
      this.GetText(0).SetText(e.NameText ?? "");
    }
    this.GetButton(4).RootUIComp.SetUIActive(e.RewardState === 1);
    this.GetItem(5)?.SetUIActive(e.RewardState === 0);
    this.GetItem(6)?.SetUIActive(e.RewardState === 2);
    this.s4e?.RefreshByData(e.RewardList ?? []);
  }
}
//# sourceMappingURL=BossRushRewardView.js.map