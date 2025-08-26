"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCollectBadgeTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const CollectBadgeGroupItem_1 = require("./CollectBadgeGroupItem");
const CollectBadgeSkillItem_1 = require("./CollectBadgeSkillItem");
const CollectRewardItem_1 = require("./CollectRewardItem");
const CollectRewardPopup_1 = require("./CollectRewardPopup");
class PhantomArenaCollectBadgeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.gtu = 0;
    this.Gpo = undefined;
    this.jlo = undefined;
    this.H3e = undefined;
    this.S2t = undefined;
    this.Ctu = undefined;
    this.rOe = () => {
      var e = new CollectRewardItem_1.CollectRewardItem();
      e.RewardType = 0;
      e.CallbackClickReward = this.hoc;
      return e;
    };
    this.ptu = () => {
      var e = new CollectBadgeGroupItem_1.CollectBadgeGroupItem();
      e.CallbackClickBadge = this.ntu;
      e.CallbackCanChange = this.stu;
      return e;
    };
    this.vtu = () => {
      return new CollectBadgeSkillItem_1.CollectBadgeSkillItem();
    };
    this.cfu = () => {
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectBadgeGroupDataList()?.[0]?.BadgeIdList[0];
      var t = this.Ctu.GetScrollItemByIndex(0);
      this.gtu = e;
      (this.Gpo = t).SetSelectByIndex(0);
      this.nOe();
    };
    this.hoc = (e, t) => {
      if (ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardStateById(e) === 2) {
        this.hOe();
      } else {
        e = {
          RewardLists: ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardPopupTupleData(e),
          MountItem: t,
          PosBias: new UE.Vector(0, 30, 0)
        };
        this.S2t.Refresh(e);
      }
    };
    this.Fnu = () => {
      this.jqe();
    };
    this.ntu = (e, t) => {
      if (this.Gpo && this.gtu !== e) {
        this.Gpo.SetDeselect();
      }
      this.gtu = e;
      this.Gpo = t;
      this.Gpo.SetSelect(this.gtu);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PhantomArena", 75, "当前选中徽章，" + e);
      }
      this.nOe();
    };
    this.stu = (e, t) => true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UISprite], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIItem], [6, UE.UIText], [7, UE.UISprite], [8, UE.UIVerticalLayout], [9, UE.UIVerticalLayout], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.S2t = new CollectRewardPopup_1.CollectRewardPopup();
    await this.S2t.CreateByResourceIdAsync("UiItem_SoundRemnantArenaRewardPopup", this.RootItem);
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.rOe);
    this.Ctu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.ptu);
    this.jlo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(8), this.vtu);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate, this.Fnu);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate, this.Fnu);
  }
  OnBeforeShow() {
    this.ytu();
    this.jqe();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start");
  }
  ytu() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectBadgeGroupDataList();
    this.Ctu.RefreshByData(e, this.cfu);
  }
  nOe() {
    if (!(this.gtu <= 0)) {
      var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeGroupIdById(this.gtu);
      var i = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeSkillByGroupId(t);
      this.jlo.RefreshByData(i);
      var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(this.gtu);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.Name);
      var r = ModelManager_1.ModelManager.PhantomArenaModel.IsBadgeUnlock(this.gtu);
      this.GetItem(12).SetUIActive(!r);
      this.GetItem(11).SetUIActive(r);
      let e = i.Desc;
      if (!r) {
        e = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(i.ConditionGroup).HintText;
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e);
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeCollectCountByGroupId(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), PhantomArenaDefine_1.COLLECT_BADGE_GROUP_TITLE, t.Now, t.Need);
      t = this.GetSprite(7);
      t.SetChangeColor(!r, t.changeColor);
      this.SetSpriteByPath(i.ShowIcon, t, false);
    }
  }
  jqe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardConfigList();
    this.H3e.RefreshByData(e);
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeUnlockCount();
    this.GetArtText(0).SetText(e.toString());
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardProgress();
    this.GetSprite(1).SetFillAmount(e);
  }
  hOe() {
    var e = [];
    for (const t of ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardConfigList()) {
      if (ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardStateById(t) === 2) {
        e.push(t);
      }
    }
    if (!(e.length <= 0)) {
      PhantomArenaController_1.PhantomArenaController.BadgeRewardRequest(e);
    }
  }
}
exports.PhantomArenaCollectBadgeTabView = PhantomArenaCollectBadgeTabView;
//# sourceMappingURL=PhantomArenaCollectBadgeTabView.js.map