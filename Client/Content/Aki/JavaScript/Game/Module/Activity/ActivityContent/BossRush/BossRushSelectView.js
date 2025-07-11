"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const DifficultUnlockTipView_1 = require("../../../InstanceDungeon/DifficultUnlockTipView");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class BossRushSelectView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.pyn = undefined;
    this.vVt = undefined;
    this.SPe = undefined;
    this.I2i = () => {
      return new BossRushMainViewScrollItem();
    };
    this.lRo = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RequestChangeBossRushView, "BossRushRewardView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.lRo]];
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId);
    this.pyn = e;
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.I2i);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Eyn();
  }
  K8e() {
    var e = this.GetItem(4);
    RedDotController_1.RedDotController.BindRedDot("BossRushReward", e, undefined, this.pyn?.Id);
  }
  Ovt() {
    var e = this.GetItem(4);
    RedDotController_1.RedDotController.UnBindGivenUi("BossRushReward", e);
  }
  Esi() {
    if (this.vVt) {
      this.vVt.RefreshByData(this.pyn.GetBossRushLevelDetailInfo());
    }
  }
  OnBeforeShow() {
    this.ROn();
    this.Esi();
    this.hDn();
    this.K8e();
  }
  ROn() {
    let e = "Start";
    if (ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation) {
      e = "ShowView";
    }
    this.SPe?.PlaySequencePurely(e);
    ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = false;
  }
  OnBeforeHide() {
    this.Ovt();
  }
  hDn() {
    this.GetText(1).SetText(this.pyn.GetFullScore().toString());
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length === 1 && !isNaN(Number(e[0]))) {
      e = Number(e[0]);
      if (e = this.vVt.UnsafeGetGridProxy(e).GetButtonItem()) {
        return [e, e];
      } else {
        return undefined;
      }
    }
  }
  Eyn() {
    var e;
    if (this.pyn.GetNewUnlockState()) {
      this.pyn.CacheNewUnlock();
      (e = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text = "BossRushUnlockTips";
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", e);
    }
  }
}
exports.BossRushSelectView = BossRushSelectView;
class BossRushMainViewScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.nqe = () => {
      var e;
      if (this.$8i?.GetUnLockState()) {
        (e = ModelManager_1.ModelManager.BossRushModel.GetBossRushTeamInfoByActivityId(ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId)).Clear();
        e.SetCurrentSelectLevel(this.$8i);
        ModelManager_1.ModelManager.BossRushModel.CurrentSelectLevelDetailData = this.$8i;
        ModelManager_1.ModelManager.BossRushModel.CurrentTeamInfo = ModelManager_1.ModelManager.BossRushModel.CurrentSelectLevelDetailData.ConvertToTeamInfo();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RequestChangeBossRushView, "BossRushLevelDetailView");
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BossRushLevelLock");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [2, UE.UIItem], [1, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UITexture], [7, UE.UIItem]];
    this.BtnBindInfo = [[5, this.nqe]];
  }
  Refresh(e, i, t) {
    this.$8i = e;
    this.wke(e);
    this.l3e(e);
    this.vyn(e);
    this.Myn(e);
  }
  Myn(e) {
    this.SetTextureByPath(e.GetMonsterTexturePath(), this.GetTexture(0));
    var i = this.GetTexture(6);
    i.SetUIActive(!e.GetUnLockState());
    this.SetTextureByPath(e.GetMonsterTexturePath(), i);
  }
  wke(e) {
    e = e.GetUnLockState();
    this.GetItem(1).SetUIActive(e);
    this.GetItem(2).SetUIActive(!e);
  }
  l3e(e) {
    var i;
    var t;
    if (e.GetUnLockState()) {
      i = (e = e.GetScore()) > 0;
      (t = this.GetText(3)).SetUIActive(i);
      t.SetText(e.toString());
      this.GetItem(7).SetUIActive(!i);
    }
  }
  vyn(e) {
    if (!e.GetUnLockState()) {
      this.GetText(4).SetText(e.GetUnlockTimeText());
    }
  }
  GetButtonItem() {
    return this.GetButton(5)?.RootUIComp;
  }
}
//# sourceMappingURL=BossRushSelectView.js.map