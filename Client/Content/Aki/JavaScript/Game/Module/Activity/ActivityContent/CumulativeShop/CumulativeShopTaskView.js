"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CumulativeShopTaskView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const CumulativeShopController_1 = require("./CumulativeShopController");
const CumulativeShopTaskItem_1 = require("./CumulativeShopTaskItem");
class CumulativeShopTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Ny1 = undefined;
    this.Vy1 = undefined;
    this.jy1 = undefined;
    this.lqe = undefined;
    this.Hy1 = 0;
    this.C5e = () => {
      var e = new CumulativeShopTaskTabItem();
      e.OnClickBack = this.$y1;
      return e;
    };
    this.ou_ = () => {
      return new CumulativeShopTaskItem_1.CumulativeShopTaskItem();
    };
    this.$y1 = (e, t) => {
      this.jy1?.SetToggleState(0);
      this.jy1 = t;
      this.Hy1 = e;
      t = CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData().GetTabTaskList(e);
      this.Vy1.RefreshByData(t ?? []);
      this.Vy1.GetUiAnimController()?.Play();
    };
    this.Wy1 = () => {
      var e = CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData().GetTabTaskList(this.Hy1);
      this.Vy1.RefreshByData(e ?? []);
      this.Vy1.GetUiAnimController()?.Play();
    };
    this.NT1 = () => {
      const r = Array.from(CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData().TaskTabMap.keys());
      r.sort((e, t) => e - t);
      this.Ny1.RefreshByData(r, () => {
        var t = CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData();
        let i = false;
        for (let e = 0; e < r.length; e++) {
          var s = r[e];
          if (t.GetTaskTabRedDot(s)) {
            this.Ny1.SelectGridProxy(e);
            if (this.Hy1 - 1 === e) {
              this.Wy1();
            }
            i = true;
            break;
          }
        }
        if (!i) {
          this.Ny1.SelectGridProxy(Math.max(this.Hy1 - 1, 0), true);
          this.Wy1();
        }
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(e.GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
  }
  OnStart() {
    this.Ny1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.C5e);
    this.Vy1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.ou_);
    this.lqe.SetTitleLocalText("Activity_105100001_QuestList_Desc");
  }
  OnBeforeShow() {
    CumulativeShopController_1.CumulativeShopController.ConsumptiveActivityInfoRequest();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CumulativeShopTaskRefresh, this.Wy1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CumulativeShopTaskViewDataRefresh, this.NT1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CumulativeShopTaskRefresh, this.Wy1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CumulativeShopTaskViewDataRefresh, this.NT1);
  }
}
exports.CumulativeShopTaskView = CumulativeShopTaskView;
class CumulativeShopTaskTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnClickBack = undefined;
    this.TabIndex = 0;
    this.hHe = e => {
      if (e === 1) {
        this.OnClickBack(this.TabIndex, this.GetExtendToggle(1));
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UIItem], [5, UE.UIText]];
    this.BtnBindInfo = [[1, this.hHe]];
  }
  Refresh(e, t, i) {
    this.TabIndex = e;
    e = ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskTabConfig(this.TabIndex);
    this.SetSpriteByPath(e.SpriteIcon, this.GetSprite(0), false, undefined, () => {
      this.GetSprite(0).GetOwner().GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass()).SetAllStateSprite(this.GetSprite(0).GetSprite());
    });
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Title);
    RedDotController_1.RedDotController.BindRedDot("CumulativeShopTaskTabRedDot", this.GetItem(2), undefined, this.TabIndex);
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("CumulativeShopTaskTabRedDot", this.GetItem(2));
  }
  OnSelected(e) {
    this.GetExtendToggle(1).SetToggleState(1, true);
  }
}
//# sourceMappingURL=CumulativeShopTaskView.js.map