"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSelectView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueGainEntry_1 = require("../Define/RogueGainEntry");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RogueSelectResult_1 = require("../Define/RogueSelectResult");
const RoguelikeController_1 = require("../RoguelikeController");
const CommonSelectItem_1 = require("./CommonSelectItem");
const ElementPanel_1 = require("./ElementPanel");
const PhantomInfoPanel_1 = require("./PhantomInfoPanel");
const RogueSelectBaseView_1 = require("./RogueSelectBaseView");
const TopPanel_1 = require("./TopPanel");
class CommonSelectView extends RogueSelectBaseView_1.RogueSelectBaseView {
  constructor() {
    super(...arguments);
    this.RoguelikeChooseData = undefined;
    this.TopPanel = undefined;
    this.ElementPanel = undefined;
    this.PhantomInfoPanel = undefined;
    this.ButtonItem = undefined;
    this.RefreshButtonItem = undefined;
    this.CommonSelectItemLayout = undefined;
    this.CurSelectItem = undefined;
    this.LastRefreshTime = 0;
    this.IsFirstOpen = true;
    this.m8t = () => {
      var e = this.Jao();
      if (e) {
        ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = e.RogueGainEntry;
        RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(1);
      }
    };
    this.zao = () => {
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      if (!(e - this.LastRefreshTime < 1) || this.LastRefreshTime === 0) {
        this.LastRefreshTime = e;
        RoguelikeController_1.RoguelikeController.RoguelikeRefreshGainRequest(this.RoguelikeChooseData.Index);
      }
    };
    this.CreateCommonSelectItem = () => {
      var e = new CommonSelectItem_1.CommonSelectItem();
      e.SetClickCallBack(this.RefreshPreview);
      return e;
    };
    this.RoguelikeChooseDataResult = (e, i, t, s, o) => {
      if (t && s === this.RoguelikeChooseData?.Index) {
        t = this.Jao();
        if (t) {
          var h = new RogueSelectResult_1.RogueSelectResult(e, i, t.RogueGainEntry);
          var s = o.tqs.length > 0;
          if (s) {
            h.IsShowCommon = true;
            for (const r of o.tqs) {
              h.ExtraRogueGainEntry = new RogueGainEntry_1.RogueGainEntry(r);
              break;
            }
          }
          if (h.GetNewUnlockAffixEntry().size <= 0 && !s) {
            UiManager_1.UiManager.CloseView(this.Info.Name);
          } else {
            UiManager_1.UiManager.OpenView("CommonSelectResultView", h, () => {
              this.CloseMe();
            });
          }
        }
      }
    };
    this.OnDescModelChange = () => {
      this.CommonSelectItemLayout.GetLayoutItemList().forEach(e => {
        e.RefreshPanel();
      });
      this.RefreshPreview(this.CurSelectItem);
    };
    this.RoguelikeRefreshGain = e => {
      ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = undefined;
      e = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(e);
      this.RoguelikeChooseData = e;
      this.bl();
    };
    this.RefreshPreview = (e = undefined) => {
      if (e) {
        this.CurSelectItem = e.IsSelect() ? e : undefined;
        this.ButtonItem.SetEnableClick(e.IsSelect());
        e = e?.RogueGainEntry;
        this.PhantomInfoPanel.RefreshPhantomEntryItemRefreshPreview(e?.ElementDict);
        this.ElementPanel.Refresh(e);
      } else {
        this.ButtonItem.SetEnableClick(false);
        this.PhantomInfoPanel.RefreshPhantomEntryItemRefreshPreview();
        this.ElementPanel.Refresh();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UITexture], [8, UE.UIText]];
  }
  Jao() {
    for (const e of this.CommonSelectItemLayout.GetLayoutItemList()) {
      if (e.IsSelect()) {
        return e;
      }
    }
  }
  async OnBeforeStartAsync() {
    this.PhantomInfoPanel = new PhantomInfoPanel_1.PhantomInfoPanel();
    await this.PhantomInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.ElementPanel = new ElementPanel_1.ElementPanel();
    await this.ElementPanel.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.TopPanel = new TopPanel_1.TopPanel();
    await this.TopPanel.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = undefined;
    this.RoguelikeChooseData = this.OpenParam;
    this.TopPanel.CloseCallback = this.CloseMySelf;
    this.PhantomInfoPanel.Update(ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry);
    this.ButtonItem = new ButtonItem_1.ButtonItem(this.GetButton(5).GetRootComponent());
    this.ButtonItem.SetFunction(this.m8t);
    this.RefreshButtonItem = new ButtonItem_1.ButtonItem(this.GetButton(6).GetRootComponent());
    this.RefreshButtonItem.SetFunction(this.zao);
    this.CommonSelectItemLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.CreateCommonSelectItem);
    this.TopPanel?.RefreshCurrency([RoguelikeDefine_1.INSIDE_CURRENCY_ID]);
    this.bl();
  }
  OnBeforeShow() {
    if (this.IsFirstOpen) {
      this.IsFirstOpen = false;
    } else {
      this.TopPanel?.RefreshTabBtn();
      this.OnDescModelChange();
    }
  }
  OnBeforeDestroy() {
    this.TopPanel.Destroy();
    this.ElementPanel.Destroy();
    this.PhantomInfoPanel.Destroy();
  }
  bl() {
    this.RefreshPhantomSelectItemList();
    this.RefreshTopPanel();
    this.RefreshElementPanel();
    this.RefreshPhantomInfoPanel();
    this.RefreshPreview(this.CurSelectItem);
    this.RefreshBtnText();
    this.RefreshRefreshBtnText();
  }
  RefreshPhantomSelectItemList() {
    this.CommonSelectItemLayout.RefreshByData(this.RoguelikeChooseData.RogueGainEntryList ?? [], () => {
      this.CommonSelectItemLayout?.GetUiAnimController()?.Play();
    });
  }
  RefreshTopPanel() {
    let e = false;
    for (const i of this.RoguelikeChooseData.RogueGainEntryList) {
      if (ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(i.ConfigId)?.PerkType === 5) {
        e = true;
        break;
      }
    }
    if (e) {
      this.TopPanel.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_9_TEXT);
      this.TopPanel.RefreshSelectTipsText(RoguelikeDefine_1.ROGUELIKEVIEW_10_TEXT, false, ModelManager_1.ModelManager.SceneTeamModel.GetTeamLength() - 1);
    } else {
      this.TopPanel.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_11_TEXT);
      this.TopPanel.RefreshSelectTipsText(RoguelikeDefine_1.ROGUELIKEVIEW_12_TEXT);
    }
  }
  RefreshElementPanel() {
    this.ElementPanel.Refresh();
  }
  RefreshPhantomInfoPanel() {
    this.PhantomInfoPanel.Refresh();
  }
  RefreshBtnText() {
    this.ButtonItem.SetShowText(RoguelikeDefine_1.ROGUELIKEVIEW_13_TEXT);
  }
  RefreshRefreshBtnText() {
    var e;
    var i;
    var t = this.RoguelikeChooseData.UseTime;
    var s = this.RoguelikeChooseData.MaxTime;
    this.RefreshButtonItem.SetActive(s > 0);
    var t = s - t;
    if (t <= 0) {
      this.RefreshButtonItem.SetLocalTextNew("RoguelikeView_29_Text", t, s);
    } else {
      this.RefreshButtonItem.SetLocalTextNew("RoguelikeView_28_Text", t, s);
    }
    var s = this.RoguelikeChooseData.CostCurrency;
    if (s.length > 0) {
      s = s[0];
      i = (e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(s.s5n) >= s.m9n) ? "RogueSpecialRefreshCost" : "RogueSpecialRefreshCost_Not";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i, s.m9n);
      this.RefreshButtonItem.SetEnableClick(t > 0 && e);
      i = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(s.s5n);
      this.SetTextureByPath(i.IconSmall, this.GetTexture(7));
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length === 2 || isNaN(Number(i[0]))) {
      let e = undefined;
      if (i[1] === "Attribute") {
        e = this.PhantomInfoPanel?.GetAttributeItem(Number(i[0]));
      } else if (i[1] === "Cost") {
        e = this.TopPanel?.GetCostItemByIndex(Number(i[0]));
      }
      if (e) {
        return [e, e];
      } else {
        return undefined;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", i]);
    }
  }
}
exports.CommonSelectView = CommonSelectView;
//# sourceMappingURL=CommonSelectView.js.map