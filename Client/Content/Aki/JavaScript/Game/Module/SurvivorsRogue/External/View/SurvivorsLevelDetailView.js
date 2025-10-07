"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsLevelDetailView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const SurvivorsRogueCardDataFactory_1 = require("../../Card/SurvivorsRogueCardDataFactory");
const bgTexturePath = ["UiTexture_SurvivorsLevelDetailBg1", "UiTexture_SurvivorsLevelDetailBg2", "UiTexture_SurvivorsLevelDetailBg3"];
class SurvivorsLevelDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.rkd = -1;
    this.O5d = false;
    this.okd = undefined;
    this.nkd = undefined;
    this.SPe = undefined;
    this.skd = undefined;
    this.akd = undefined;
    this.hkd = undefined;
    this.Tkd = undefined;
    this.Jhi = undefined;
    this.eli = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.bkd = () => {
      return new WeaponItemComponent();
    };
    this.Pkc = () => {
      UiManager_1.UiManager.OpenView("SurvivorsTeamEditView");
    };
    this.ukd = e => {
      if (this.O5d) {
        if (e === 1) {
          if (this.ckd()) {
            this.dkd(true);
          } else {
            const i = this.GetExtendToggle(15);
            i?.SetToggleStateForce(0, false, false, true);
            e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(376);
            e.FunctionMap.set(2, () => {
              i?.SetToggleStateForce(1);
              this.dkd(true);
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
          }
        } else {
          this.dkd(false);
        }
      } else {
        this.GetExtendToggle(15)?.SetToggleStateForce(0, false, false, true);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Survivors_EndlessDisableTips");
      }
    };
    this.I5t = () => {
      this.CloseMe();
    };
    this.w_o = e => {
      if (e === "Switch1") {
        this.okd?.SetUIActive(false);
      } else if (e === "Switch2") {
        this.GetItem(3)?.SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIText], [14, UE.UIText], [15, UE.UIExtendToggle], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIText], [21, UE.UIItem], [22, UE.UIScrollViewWithScrollbarComponent], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UITexture], [28, UE.UITexture], [29, UE.UIScrollViewWithScrollbarComponent], [30, UE.UIText], [31, UE.UIItem], [32, UE.UIItem]];
    this.BtnBindInfo = [[15, this.ukd]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.hkd = new RoleItemComponent();
    e.push(this.hkd.CreateThenShowByActorAsync(this.GetItem(21).GetOwner()));
    this.skd = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(undefined);
    e.push(this.skd.CreateThenShowByActorAsync(this.GetItem(19).GetOwner()));
    this.akd = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.akd.CreateThenShowByActorAsync(this.GetItem(25).GetOwner()));
    this.Tkd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(22), this.bkd);
    this.Jhi = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(29), this.eli);
    await Promise.all(e);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo;
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(e.LevelId);
    this.rkd = e.LevelId;
    this.khd();
    this.mkd(i.Name);
    this.gkd(i.Diff);
    this.J7d(i.InitRoles, i.InitWeapons);
    this.skd?.FunctionButton?.SetFunction(this.Pkc);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.w_o);
    this._9d();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  gkd(r) {
    [[0, 5], [1, 7], [2, 9]].forEach((e, i) => {
      var t = this.GetItem(e[0]);
      var e = this.GetItem(e[1]);
      if (i === r) {
        this.okd = t;
        this.nkd = e;
      }
      t?.SetUIActive(i === r);
      e?.SetUIActive(i === r);
    });
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(bgTexturePath[r]);
    this.SetTextureShowUntilLoaded(e, this.GetTexture(28));
  }
  khd() {
    this.akd?.SetCloseCallBack(this.I5t);
    this.akd?.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.OpenRogueHelp();
    });
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.LocalConfig;
    if (e) {
      this.akd?.SetTitleLocalText(e.Title);
    }
  }
  dkd(e) {
    var i;
    var t;
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(this.rkd);
    if (r) {
      ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.SaveCacheState(3, this.rkd, 0, e ? 1 : 0);
      t = ((i = ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo).IsEndless = e) ? 1 : 0;
      this.Ckd(r.InstDesc.get(t));
      this.pkd(r.TargetDesc.get(t), i.LevelId, e);
      this.vkd(e);
      this.ykd(e);
      this.Skd(e);
      this.RefreshRewardByDropPackage(r.RewardId[t], ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetCurrentLevelInfoByLevelId(i.LevelId).Info.CM_);
    }
  }
  Skd(e) {
    (e ? this.GetItem(3) : this.okd)?.SetUIActive(true);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayLevelSequenceByName(e ? "Switch1" : "Switch2");
  }
  mkd(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
  }
  q5d(e) {
    this.O5d = e;
    this.GetTexture(27)?.SetUIActive(!e);
    this.GetItem(32)?.SetUIActive(e);
  }
  J7d(e, i) {
    e = this.Jat(e);
    this.Tkd?.RefreshByData(i);
    e = e || i.length > 0;
    this.GetItem(31)?.SetUIActive(e);
  }
  Jat(e) {
    for (const i of e) {
      if (ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.IsRoleIdCanShow(i)) {
        this.hkd?.SetUiActive(true);
        this.hkd?.Refresh(i);
        return true;
      }
    }
    this.hkd?.SetUiActive(false);
    return false;
  }
  RefreshRewardByDropPackage(e, i) {
    e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e);
    this.Jhi.RefreshByData(e, () => {
      this.Jhi?.GetScrollItemList().forEach(e => {
        e.SetReceivedVisible(i);
      });
    });
  }
  _9d() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo;
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(e.LevelId);
    if (i.EndlessMode) {
      t = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetLevelUnlockState(e.LevelId, true);
      this.q5d(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueLevelDetailViewEndlessToggleRefresh, t);
    } else {
      this.GetExtendToggle(15)?.RootUIComp.SetUIActive(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueLevelDetailViewEndlessToggleRefresh, false);
    }
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.IsEndlessMode(e.LevelId);
    this.GetExtendToggle(15)?.SetToggleStateForce(t ? 1 : 0, false, false, true);
    this.dkd(t);
    if (i.Diff >= 2 || t) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_xingcunzhe_leveldetail_open_difficult");
    } else {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_xingcunzhe_leveldetail_open_normal");
    }
  }
  Ckd(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), e);
  }
  pkd(e, i, t) {
    var r = [];
    var s = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetCurrentLevelInfoByLevelId(i);
    if (t) {
      r.push(s.Info.qLd.toString());
    } else {
      t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetMaxWaveNumByLevelId(i);
      r.push(s.Info.AEs.toString());
      r.push(t.toString());
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), e, ...r);
  }
  vkd(e) {
    var i = this.GetText(16);
    if (i) {
      i.SetChangeColor(e, i.changeColor);
    }
  }
  ykd(e) {
    this.nkd?.SetUIActive(!e);
    this.GetItem(11)?.SetUIActive(e);
  }
  ckd() {
    return ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.SaveCacheState(4, 0);
  }
}
exports.SurvivorsLevelDetailView = SurvivorsLevelDetailView;
class RoleItemComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Mkd = -1;
    this.Ekd = () => {
      var e = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralCharacter(this.Mkd);
      UiManager_1.UiManager.OpenView("SurvivorsCardTips", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.Ekd]];
  }
  OnStart() {}
  Refresh(e) {
    this.Mkd = e;
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e).TrialRoleId;
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var i = e.RoleHeadIconCircle;
    this.SetTextureShowUntilLoaded(i, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Name);
  }
}
class WeaponItemComponent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Ikd = -1;
    this.nqe = () => {
      var e = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralWeapon(this.Ikd);
      UiManager_1.UiManager.OpenView("SurvivorsCardTips", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UITexture], [3, UE.UISprite]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  Refresh(e, i, t) {
    this.Ikd = e;
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e);
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponDefaultEvolve(e);
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetQualityConfig(e.Quality);
    this.SetTextureByPath(r.Icon, this.GetTexture(2));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r.Name);
    this.GetSprite(3).SetColor(UE.Color.FromHex(e.WeaponColor));
  }
}
//# sourceMappingURL=SurvivorsLevelDetailView.js.map