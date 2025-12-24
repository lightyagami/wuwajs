"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemCollectRewardBtn = exports.HonamiStoryItemCollectView = undefined;
const UE = require("ue");
const DropPackageById_1 = require("../../../../Core/Define/ConfigQuery/DropPackageById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ActivityControllerHolder_1 = require("../../Activity/ActivityControllerHolder");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryItemCollectItem_1 = require("./Items/HonamiStoryItemCollectItem");
class HonamiStoryItemCollectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Wim = undefined;
    this.lqe = undefined;
    this.zsm = undefined;
    this.Jsm = undefined;
    this.s6e = undefined;
    this.Zsm = () => {
      var t = new HonamiStoryItemCollectItem_1.HonamiStoryItemCollectItemView();
      t.OnClickToggleBack = this.jbe;
      t.CanToggleChange = this.Bpt;
      return t;
    };
    this.Og = () => {
      this.Ycm();
      var t = this.Zam();
      this.zsm.GetGenericLayout().DeselectCurrentGridProxy();
      this.zsm.RefreshByData(t);
      this.jbe(0, t[0]);
    };
    this.jbe = (t, e) => {
      this.Jsm = e;
      this.zsm.SelectGridProxy(t);
      this.SetTextureByPath(e.GetConfig.Icon, this.GetTexture(9));
      this.GetTexture(9).SetChangeColor(e.State === 0, this.GetTexture(9).changeColor);
      this.GetItem(8).SetUIActive(e.State === 0);
      if (this.Jsm.State !== 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Jsm.Name);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.Jsm.Desc);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.Jsm.Desc);
      }
      this.GetItem(2).SetUIActive(this.Jsm.State !== 0);
      this.GetText(4).SetUIActive(this.Jsm.State !== 0);
      this.s6e.RefreshView(this.Jsm);
    };
    this.Bpt = t => t !== this.zsm.GetSelectedIndex();
    this.pcr = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HonamiStoryDefine_1.HONAMI_HELP_COLLECT);
    };
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var t;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.lqe.SetHelpCallBack(this.pcr);
    this.lqe.SetCloseCallBack(this.Jvt);
    this.Wim = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    if (this.Wim) {
      this.s6e = new HonamiStoryItemCollectRewardBtn();
      this.zsm = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.Zsm, this.GetExtendToggle(1).GetOwner());
      t = [this.lqe.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()), this.s6e.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())];
      await Promise.all(t);
      if (this.Wim.GetItemCollectionDataList().length > 0) {
        await this.zsm.RefreshByDataAsync(this.Zam(), true);
        this.Ycm();
        this.jbe(0, this.Zam()[0]);
      }
    } else {
      this.CloseMe();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryItemCollectGetReward, this.Og);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryItemCollectGetReward, this.Og);
  }
  Ycm() {
    var t = this.zcm().toString();
    var e = this.Wim.GetItemCollectionDataList().length.toString();
    this.GetText(7).SetText(t + "/" + e);
  }
  zcm() {
    let t = 0;
    for (const e of this.Wim.GetItemCollectionDataList()) {
      if (e.State !== 0) {
        t += 1;
      }
    }
    return t;
  }
  Zam() {
    if (!this.Wim) {
      return [];
    }
    const i = {
      [1]: 1,
      2: 2,
      0: 3
    };
    return [...this.Wim.GetItemCollectionDataList()].sort((t, e) => i[t.State] - i[e.State]);
  }
}
exports.HonamiStoryItemCollectView = HonamiStoryItemCollectView;
class HonamiStoryItemCollectRewardBtn extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Jsm = undefined;
    this.qsi = undefined;
    this.YDo = () => {
      if (this.Jsm !== undefined) {
        switch (this.Jsm.State) {
          case 1:
            ActivityControllerHolder_1.ActivityControllerHolder.HonamiStoryController.SendHonamiStoryItemCollectionRequest([this.Jsm.Id]);
            break;
          case 2:
            return;
          case 0:
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ConditionGroup_12902001_HintText");
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.YDo]];
  }
  async OnBeforeStartAsync() {
    this.qsi = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    await this.qsi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.qsi.SetAllowClickBack(false);
    this.qsi.BindOnExtendToggleClicked(this.YDo);
  }
  RefreshView(t) {
    this.Jsm = t;
    this.GetSprite(2).SetUIActive(this.Jsm.State === 1);
    this.GetItem(1)?.SetUIActive(true);
    var e;
    var i;
    var s = t.DropId;
    for ([e, i] of DropPackageById_1.configDropPackageById.GetConfig(s).DropPreview) {
      var r = [{
        ItemId: e,
        IncId: 0
      }, i];
      this.qsi?.Refresh(r);
      break;
    }
    this.qsi.SetLockBlackVisible(t.State === 0);
    this.qsi.SetRedDotVisible(t.State === 1);
    this.GetItem(3).SetUIActive(t.State === 1);
    this.GetItem(4).SetUIActive(t.State === 1);
    this.qsi.SetReceivedVisible(t.State === 2);
  }
}
exports.HonamiStoryItemCollectRewardBtn = HonamiStoryItemCollectRewardBtn;
//# sourceMappingURL=HonamiStoryItemCollectView.js.map