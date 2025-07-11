"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalChapterResultOrInitPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem");
const ButtonSpriteItem_1 = require("../../Common/Button/ButtonSpriteItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CiacconaGalDefine_1 = require("../CiacconaGalDefine");
class CiacconaGalChapterSubEndingItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Sxc = undefined;
    this.FKa = () => {
      var t;
      var e = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataBySubEndingId(this.Pe.Id);
      if (e) {
        t = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id;
        ControllerHolder_1.ControllerHolder.CiacconaGalController.RequestGetSubEndingReward(t, e.Id, this.Pe.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    this.Sxc = new ButtonSpriteItem_1.ButtonSpriteItem();
    await this.Sxc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.Sxc.SetFunction(this.FKa);
  }
  Refresh(t, e, i) {
    this.Pe = t;
    this.GetSprite(1).SetUIActive(this.Pe.IsFinished);
    this.GetSprite(5).SetUIActive(this.Pe.IsRewarded);
    this.Sxc.SetActive(this.Pe.IsFinished && !this.Pe.IsRewarded);
    let n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningLockBg");
    let s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_PlotReasoningFinishMain");
    if (this.Pe.IsFinished) {
      if (this.Pe.Type === 1) {
        n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningFinishMainBg");
        s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_PlotReasoningFinishMain");
      } else if (this.Pe.Type === 2) {
        n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningFinishBranchBg");
        s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_PlotReasoningFinishBranch");
      }
    } else {
      n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningLockBg");
    }
    this.SetTextureByPath(n, this.GetTexture(0));
    this.SetSpriteByPath(s, this.GetSprite(1), false);
    this.GetText(2)?.SetUIActive(this.Pe.IsFinished);
    this.GetText(3)?.SetUIActive(this.Pe.IsFinished);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.Pe.Title);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe.Desc);
  }
}
class CiacconaGalChapterResultOrInitPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super();
    this.vxc = t;
    this.Mke = e;
    this.m8t = undefined;
    this.Mxc = undefined;
    this.Exc = () => {
      return new CiacconaGalChapterSubEndingItem();
    };
    this.cVc = () => {
      this.Ixc();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    this.Mxc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.Exc);
    this.tkt();
    this.Ixc();
    this.zao();
    if (this.vxc.IsFinished) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaChapterRestart);
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaChapterFirstStart);
    }
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaChapterDataUpdate, this.cVc);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaChapterDataUpdate, this.cVc);
  }
  tkt() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.vxc.Title);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.vxc.Desc);
  }
  Ixc() {
    this.GetVerticalLayout(2).SetActive(this.vxc.IsFinished);
    if (this.vxc.IsFinished) {
      var t = [];
      for (const i of this.vxc.SubEndingIds) {
        var e = ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(i);
        if (e) {
          t.push(e);
        }
      }
      this.Mxc.RefreshByData(t);
    }
  }
  zao() {
    this.m8t = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(4));
    if (this.vxc.IsFinished) {
      this.m8t.RefreshTextNew(CiacconaGalDefine_1.TEXT_CIACCONA_BTN_CHAPTER_RESTART);
    } else {
      this.m8t.RefreshTextNew(CiacconaGalDefine_1.TEXT_CIACCONA_BTN_CHAPTER_INIT);
    }
    this.m8t.BindCallback(this.Mke);
  }
}
exports.CiacconaGalChapterResultOrInitPanel = CiacconaGalChapterResultOrInitPanel;
//# sourceMappingURL=CiacconaGalChapterResultOrInitPanel.js.map