"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorBrochureDetailView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const BlackScreenController_1 = require("../../../../BlackScreen/BlackScreenController");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const HelpController_1 = require("../../../../Help/HelpController");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const SpringManorController_1 = require("../SpringManorController");
const SpringManorBrochureDetailPointItem_1 = require("./Item/SpringManorBrochureDetailPointItem");
class SpringManorBrochureDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.NGt = undefined;
    this.Yyg = undefined;
    this.vef = false;
    this.zyg = 0;
    this.Jyg = [];
    this.LOe = 0;
    this.$9g = false;
    this.$pt = undefined;
    this.CIf = (e, t) => {
      if (t === "Sequence_Switch_Left" || t === "Sequence_Switch_Right") {
        this.Yyg?.SelectGridProxy(this.zyg);
        this.Zyg();
      }
    };
    this.Gyg = () => {
      this.Zyg();
    };
    this.W2e = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = () => this.vef;
      return e;
    };
    this.Lot = () => {
      return new SpringManorBrochureDetailPointItem_1.SpringManorBrochureDetailPointItem();
    };
    this.D3e = () => {
      var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe).GetHelpId();
      HelpController_1.HelpController.OpenHelpById(e);
    };
    this.YDo = () => {
      var e = this.eSg;
      var t = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetBookItemDataById(e);
      if (t && t.sug === Protocol_1.Aki.Protocol.sug.Proto_BookItemUnlock) {
        SpringManorController_1.SpringManorController.RequestBrochureReward(this.LOe, 2, e);
      }
    };
    this.tSg = () => {
      if (!(this.zyg <= 0)) {
        this.$pt.PlayLevelSequenceByName("Switch_Left", false);
        this.zyg--;
        this.iSg();
      }
    };
    this.rSg = () => {
      if (!(this.zyg >= this.Jyg.length - 1)) {
        this.$pt.PlayLevelSequenceByName("Switch_Right", false);
        this.zyg++;
        this.iSg();
      }
    };
    this.r3d = () => {
      var e = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(this.eSg);
      if (e && e.TeleportEntityId > 0) {
        this.L3g(this.eSg);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIHorizontalLayout], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIItem]];
    this.BtnBindInfo = [[12, this.rSg], [13, this.tSg], [11, this.r3d], [14, this.YDo]];
  }
  OnStart() {
    this.RootActor?.OnSequencePlayEvent.Bind(this.CIf);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.NGt = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.W2e);
    var e = this.GetHorizontalLayout(5);
    this.Yyg = new GenericLayout_1.GenericLayout(e, this.Lot);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.LOe = e?.ActivityId ?? 0;
    this.zyg = e?.StartIndex ?? 0;
    this.$9g = e?.IsHideReward ?? false;
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe);
    this.lqe?.SetTitle(e?.GetTitle());
    this.lqe?.SetHelpCallBack(this.D3e);
    this.oSg();
    this.Zyg();
    this.iSg();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBrochureBookItemStateUpdate, this.Gyg);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBrochureBookItemStateUpdate, this.Gyg);
  }
  get eSg() {
    var e = this.zyg;
    if (e < 0 || e >= this.Jyg.length) {
      return 0;
    } else {
      return this.Jyg[e];
    }
  }
  oSg() {
    this.Jyg.length = 0;
    var e = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(this.LOe, 2);
    if (e) {
      for (const t of e.BookItemIds) {
        if (ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(t)) {
          this.Jyg.push(t);
        }
      }
      this.Yyg?.RefreshByData(e.BookItemIds, () => {
        this.Yyg?.SelectGridProxy(this.zyg);
      });
    }
  }
  Zyg() {
    var e = this.eSg;
    this.Wyg(e);
    var e = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(this.LOe, 2);
    if (e) {
      this.Yyg?.RefreshByData(e.BookItemIds, () => {
        this.Yyg?.SelectGridProxy(this.zyg);
      });
    }
  }
  Wyg(t) {
    var i = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(t);
    if (i) {
      let e = Protocol_1.Aki.Protocol.sug.Proto_BookItemRewarded;
      if (!this.$9g) {
        t = ModelManager_1.ModelManager.SpringManorModel.ActivityData?.GetBookItemDataById(t);
        if (!t) {
          return;
        }
        e = t.sug;
      }
      var t = e === Protocol_1.Aki.Protocol.sug.Proto_BookItemLock;
      var r = e === Protocol_1.Aki.Protocol.sug.Proto_BookItemRewarded;
      var s = e === Protocol_1.Aki.Protocol.sug.Proto_BookItemUnlock;
      this.GetItem(2)?.SetUIActive(t);
      if (t) {
        this.SetTextureByPath(i.ScreenIconPath, this.GetTexture(1));
        this.GetText(3)?.ShowTextNew(i.GuideText);
        n = StringUtils_1.StringUtils.IsBlank(i.DescriptionTitle) ? i.GuideTitle : i.DescriptionTitle;
        this.GetText(4)?.ShowTextNew(n);
      } else {
        this.GetText(3)?.ShowTextNew(i.DescriptionText);
        this.SetTextureByPath(i.ScreenIconDonePath, this.GetTexture(1));
        this.GetText(4)?.ShowTextNew(i.DescriptionTitle);
      }
      var n = ConfigManager_1.ConfigManager.SpringManorConfig?.GetRewardItem(i.DroptId);
      this.SetRewardItems(n, r);
      this.GetButton(11)?.RootUIComp.SetUIActive(t);
      this.GetButton(14)?.RootUIComp.SetUIActive(s);
      this.GetItem(15)?.SetUIActive(r);
    }
  }
  SetRewardItems(e, t) {
    this.vef = t;
    t = !this.$9g && !!e && !!(e.length > 0);
    this.NGt?.SetActive(t);
    if (t) {
      this.NGt?.RefreshByData(e);
    }
    this.GetItem(7)?.SetUIActive(t);
  }
  iSg() {
    var e = this.zyg;
    this.GetButton(12)?.RootUIComp?.SetUIActive(e < this.Jyg.length - 1);
    this.GetButton(13)?.RootUIComp?.SetUIActive(e > 0);
  }
  async L3g(e) {
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("None", "SpringManorBrochureDetailView");
    await ModelManager_1.ModelManager.SpringManorModel?.TeleportPlayerToEntity(e);
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "SpringManorBrochureDetailView");
    UiManager_1.UiManager.ResetToBattleView();
  }
}
exports.SpringManorBrochureDetailView = SpringManorBrochureDetailView;
//# sourceMappingURL=SpringManorBrochureDetailView.js.map