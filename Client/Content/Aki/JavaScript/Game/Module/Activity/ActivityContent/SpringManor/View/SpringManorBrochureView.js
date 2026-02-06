"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorBrochureView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const HelpController_1 = require("../../../../Help/HelpController");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const SpringManorController_1 = require("../SpringManorController");
const SpringManorBrochureItem_1 = require("./Item/SpringManorBrochureItem");
class SpringManorBrochureView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.xyg = undefined;
    this.LOe = 0;
    this.s4g = 0;
    this.$9g = false;
    this.CIf = (e, r) => {
      var i;
      if (r === "Sequence_Content_In") {
        if (i = this.xyg?.GetItemByIndex(this.s4g)) {
          this.GetScrollViewWithScrollbar(1)?.ScrollTo(i, true);
        }
      } else if (r === "Sequence_Brochure_Start_Unlock") {
        this.vVg();
      }
    };
    this.qoc = () => {
      var e = new SpringManorBrochureItem_1.SpringManorBrochureItem();
      e.SetToggleCallBack(this.ClickItem);
      e.SetClickGetButtonCallBack(this.fFg);
      return e;
    };
    this.D3e = () => {
      var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe).GetHelpId();
      HelpController_1.HelpController.OpenHelpById(e);
    };
    this.fFg = e => {
      var r;
      var e = e?.ConfigId ?? 0;
      if (e > 0 && (r = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetBookItemDataById(e)) && r.sug === Protocol_1.Aki.Protocol.sug.Proto_BookItemUnlock) {
        SpringManorController_1.SpringManorController.RequestBrochureReward(this.LOe, 2, e, true);
      }
    };
    this.ClickItem = e => {
      e = {
        ActivityId: this.LOe,
        StartIndex: e?.Index,
        IsHideReward: this.$9g
      };
      UiManager_1.UiManager.OpenView("Spring26BrochureDetailView", e);
    };
    this.Gyg = () => {
      this.Kyg();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText]];
  }
  OnStart() {
    this.RootActor?.OnSequencePlayEvent.Bind(this.CIf);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(4));
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetCloseCallBack(() => {
      UiManager_1.UiManager.ResetToBattleView();
    });
    this.xyg = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.qoc);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.$9g = e?.IsHideReward ?? false;
    this.LOe = e?.ActivityId ?? ModelManager_1.ModelManager.SpringManorModel.ActivityData.Id;
    this.lqe?.SetTitleByTextIdAndArgNew("Brochure_ActivityName");
    this.lqe?.SetHelpCallBack(this.D3e);
    this.Kyg();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBrochureBookItemStateUpdate, this.Gyg);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBrochureBookItemStateUpdate, this.Gyg);
  }
  Kyg() {
    var n = ConfigManager_1.ConfigManager.SpringManorConfig.GetSpringManorBrochureByActivityAndType(this.LOe, 2);
    if (n) {
      var o = [];
      let r = 0;
      let i = -1;
      let t = -1;
      for (let e = 0; e < n.BookItemIds.length; e++) {
        var s;
        var a;
        var h = n.BookItemIds[e];
        if (ConfigManager_1.ConfigManager.SpringManorConfig.GetSpringManorBookItemById(h)) {
          s = new SpringManorBrochureItem_1.BrochureItemData();
          if (this.$9g) {
            s.State = 2;
          } else {
            a = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
            s.State = a.GetBookItemStateById(h);
          }
          if (s.State === 2) {
            r++;
          } else if (i < 0 && s.State === 0) {
            i = e;
          } else if (t < 0 && s.State === 1) {
            t = e;
          }
          s.ConfigId = h;
          s.Index = e;
          o.push(s);
        }
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "Brochure_ProgressStatus", r, n.BookItemIds.length);
      this.s4g = t >= 0 ? t : i >= 0 ? i : 0;
      this.xyg?.RefreshByData(o);
    }
  }
  vVg() {
    this.xyg?.GetScrollItemList().forEach(e => {
      e.CheckPlayUnlockSequence();
    });
  }
}
exports.SpringManorBrochureView = SpringManorBrochureView;
//# sourceMappingURL=SpringManorBrochureView.js.map