"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCollectBadgeTabView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  PhantomArenaController_1 = require("../../PhantomArenaController"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  CollectBadgeGroupItem_1 = require("./CollectBadgeGroupItem"),
  CollectBadgeSkillItem_1 = require("./CollectBadgeSkillItem"),
  CollectRewardItem_1 = require("./CollectRewardItem"),
  CollectRewardPopup_1 = require("./CollectRewardPopup");
class PhantomArenaCollectBadgeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), this.XZ1 = 0, this.Gpo = void 0, this.jlo = void 0, this.H3e = void 0, this.S2t = void 0, this.YZ1 = void 0, this.rOe = () => {
      var e = new CollectRewardItem_1.CollectRewardItem;
      return e.RewardType = 0, e.CallbackClickReward = this.hoc, e
    }, this.zZ1 = () => {
      var e = new CollectBadgeGroupItem_1.CollectBadgeGroupItem;
      return e.CallbackClickBadge = this.qZ1, e.CallbackCanChange = this.GZ1, e
    }, this.JZ1 = () => {
      return new CollectBadgeSkillItem_1.CollectBadgeSkillItem
    }, this.Jau = () => {
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectBadgeGroupDataList()?.[0]?.BadgeIdList[0],
        t = this.YZ1.GetScrollItemByIndex(0);
      this.XZ1 = e, (this.Gpo = t).SetSelectByIndex(0), this.nOe()
    }, this.hoc = (e, t) => {
      2 === ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardStateById(e) ? this.hOe() : (e = {
        RewardLists: ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardPopupTupleData(e),
        MountItem: t,
        PosBias: new UE.Vector(0, 30, 0)
      }, this.S2t.Refresh(e))
    }, this.Jtu = () => {
      this.jqe()
    }, this.qZ1 = (e, t) => {
      this.Gpo && this.XZ1 !== e && this.Gpo.SetDeselect(), this.XZ1 = e, this.Gpo = t, this.Gpo.SetSelect(this.XZ1), Log_1.Log.CheckDebug() && Log_1.Log.Debug("PhantomArena", 75, "当前选中徽章，" + e), this.nOe()
    }, this.GZ1 = (e, t) => !0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UISprite],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIScrollViewWithScrollbarComponent],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UISprite],
      [8, UE.UIVerticalLayout],
      [9, UE.UIVerticalLayout],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText]
    ]
  }
  async OnBeforeStartAsync() {
    this.S2t = new CollectRewardPopup_1.CollectRewardPopup, await this.S2t.CreateByResourceIdAsync("UiItem_SoundRemnantArenaRewardPopup", this.RootItem)
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.rOe), this.YZ1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.zZ1), this.jlo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(8), this.JZ1)
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate, this.Jtu)
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate, this.Jtu)
  }
  OnBeforeShow() {
    this.ZZ1(), this.jqe()
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start")
  }
  ZZ1() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectBadgeGroupDataList();
    this.YZ1.RefreshByData(e, this.Jau)
  }
  nOe() {
    if (!(this.XZ1 <= 0)) {
      var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeGroupIdById(this.XZ1),
        i = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeSkillByGroupId(t),
        i = (this.jlo.RefreshByData(i), ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(this.XZ1)),
        r = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.Name), ModelManager_1.ModelManager.PhantomArenaModel.IsBadgeUnlock(this.XZ1));
      this.GetItem(12).SetUIActive(!r), this.GetItem(11).SetUIActive(r);
      let e = i.Desc;
      r || (e = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(i.ConditionGroup).HintText), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e);
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeCollectCountByGroupId(t), t = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), PhantomArenaDefine_1.COLLECT_BADGE_GROUP_TITLE, t.Now, t.Need), this.GetSprite(7));
      t.SetChangeColor(!r, t.changeColor), this.SetSpriteByPath(i.ShowIcon, t, !1)
    }
  }
  jqe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardConfigList(),
      e = (this.H3e.RefreshByData(e), ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeUnlockCount()),
      e = (this.GetArtText(0).SetText(e.toString()), ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardProgress());
    this.GetSprite(1).SetFillAmount(e)
  }
  hOe() {
    var e = [];
    for (const t of ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardConfigList()) 2 === ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardStateById(t) && e.push(t);
    e.length <= 0 || PhantomArenaController_1.PhantomArenaController.BadgeRewardRequest(e)
  }
}
exports.PhantomArenaCollectBadgeTabView = PhantomArenaCollectBadgeTabView;
//# sourceMappingURL=PhantomArenaCollectBadgeTabView.js.map