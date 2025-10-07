"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoMainView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const NoCircleAttachView_1 = require("../../../../AutoAttach/NoCircleAttachView");
const QuickRoleSelectView_1 = require("../../../../RoleSelect/QuickRoleSelectView");
const RoleDefine_1 = require("../../../../RoleUi/RoleDefine");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const FightPhotoLevelGroupItem_1 = require("./Item/FightPhotoLevelGroupItem");
const FightPhotoLevelItem_1 = require("./Item/FightPhotoLevelItem");
const FightPhotoRoleItem_1 = require("./Item/FightPhotoRoleItem");
const FightPhotoTaskTargetItem_1 = require("./Item/FightPhotoTaskTargetItem");
const TEAM_MAX_NUMBER = 3;
class FightPhotoMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.D3d = undefined;
    this.Hwl = undefined;
    this.ezd = [];
    this.OQd = false;
    this.hLt = -1;
    this.lqe = undefined;
    this.wVl = undefined;
    this.ELo = undefined;
    this.GLl = undefined;
    this.XRd = undefined;
    this.tFe = undefined;
    this.ILo = (t, i, e) => {
      var h = new FightPhotoLevelGroupItem_1.FightPhotoLevelGroupItem(t);
      h.CreateByActorAsync(t);
      h.OnToggleClickCallback = this.Bco;
      h.OnSelectCallback = this.YRd;
      h.CheckToggleCanClick = this.RHl;
      return h;
    };
    this.Bco = (t, i) => {
      if (!this.ELo.IsVelocityMoveState()) {
        if (i !== undefined) {
          this.ELo.AttachToIndex(t, false);
        }
      }
    };
    this.YRd = (t, i) => {
      var e;
      if (this.hLt !== -1 && this.hLt !== t) {
        e = this.hLt > t ? "PageUp" : "PageDown";
        this.PlaySequence(e);
      }
      this.hLt = t;
      this.ELo.GetCurrentSelectItem().GetRootItem().SetHierarchyIndex(this.ELo.GetDataLength() + 1);
      this.Og(i);
    };
    this.RHl = () => !this.ELo.MovingState();
    this.c71 = () => {
      var t = new FightPhotoLevelItem_1.FightPhotoLevelItem();
      t.OnToggleCallBack = this.zRd;
      return t;
    };
    this.zRd = t => {
      this.PlaySequence("InfoSwitch");
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = t.InstanceId;
      this.GLl.SelectGridProxyByKey(t);
      this.JRd(t);
    };
    this.ZRd = () => {
      return new FightPhotoTaskTargetItem_1.FightPhotoTaskTargetItem();
    };
    this.uyi = () => {
      var t = new FightPhotoRoleItem_1.FightPhotoRoleItem();
      t.OnBtnClickCallback = this.ewd;
      return t;
    };
    this.ewd = t => {
      if (!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView")) {
        var i = [];
        for (const s of this.Hwl.TrialRoleList) {
          var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(s);
          i.push(e);
        }
        for (const r of ModelManager_1.ModelManager.RoleModel.GetRoleList()) {
          if (r.GetRoleId() !== 0) {
            i.push(r);
          }
        }
        var h = new QuickRoleSelectView_1.QuickRoleSelectViewData(48, this.Hwl.GetRoleIdList(), i);
        h.OnConfirm = this.N4t;
        h.CanConfirm = this.Oye;
        h.IsNeedChangeBtnState = true;
        h.YellowTipText = this.GFd();
        UiManager_1.UiManager.OpenView("QuickRoleSelectView", h);
      }
    };
    this.N4t = t => {
      while (t.length < TEAM_MAX_NUMBER) {
        t.push(0);
      }
      this.ezd = t;
      this.tFe.RefreshByData(this.ezd);
    };
    this.Oye = t => {
      if (!(t.length <= 0)) {
        t = t.map(t => {
          if (t > RoleDefine_1.ROBOT_DATA_MIN_ID) {
            return ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t).ParentId;
          } else {
            return t;
          }
        });
        if (new Set(t).size !== t.length) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("SameRole");
        } else {
          if (this.Hwl.IsFinished) {
            return true;
          }
          for (const e of t) {
            var i = this.Hwl.LevelGroupData.TargetRoleId;
            if (e === i) {
              return true;
            }
          }
        }
      }
      return false;
    };
    this.dxl = () => {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ErrorCode_600064_Text");
      } else {
        ModelManager_1.ModelManager.LoadingModel.SetSpecifiedLoadingConfigId(this.Hwl.LoadingId);
        ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.EnterFightPhotoDungeonDirectly(this.CNe.Id, this.Hwl.LevelId, this.Hwl.InstanceId, this.ezd);
      }
    };
    this.U3d = () => {
      this.ELo.GetCurrentSelectItem().RefreshRedDot();
    };
    this.g6e = () => {
      UiManager_1.UiManager.OpenView("FightPhotoRewardView", this.CNe);
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIHorizontalLayout], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIVerticalLayout], [16, UE.UIItem], [17, UE.UIHorizontalLayout], [18, UE.UIItem], [19, UE.UIButtonComponent], [20, UE.UIItem], [21, UE.UIText], [22, UE.UIArtText], [23, UE.UIArtText], [24, UE.UIArtText], [25, UE.UIArtText], [26, UE.UIItem], [27, UE.UIText], [28, UE.UITexture]];
    this.BtnBindInfo = [[19, this.dxl], [8, this.g6e]];
  }
  async OnBeforeStartAsync() {
    this.CNe = this.OpenParam;
    var t = [];
    var i = this.GetItem(0);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    t.push(this.lqe.CreateThenShowByActorAsync(i.GetOwner()));
    this.lqe.SetTitle(this.CNe.GetTitle());
    this.lqe.SetCloseCallBack(this.AMo);
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    t.push(this.wVl.CreateThenShowByActorAsync(this.GetItem(26).GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    var t = this.GetItem(5);
    var i = this.GetItem(6);
    this.ELo = new NoCircleAttachView_1.NoCircleAttachView(t.GetOwner());
    this.ELo.SetIfNeedFakeItem(true);
    this.ELo.CreateItems(this.GetItem(7).GetOwner(), 0, this.ILo, 1);
    this.ELo?.SetControllerItem(i);
    this.GetItem(7).SetUIActive(false);
    this.GLl = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(12), this.c71);
    this.XRd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(15), this.ZRd);
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(17), this.uyi);
    var t = this.CNe.GetLevelGroupDataList();
    var i = this.CNe.GetSelectLevelGroupDataIndex();
    this.ELo.ReloadView(t.length, t, i);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshFightPhotoLevelRedDot, this.U3d);
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.SplashScreenController.FinishCurTask();
    this.CNe.IsNeedShowFightPhotoMainView = false;
    var t = this.CNe.GetFinishedTaskNum();
    var i = this.CNe.GetTotalTaskNum();
    this.GetText(21)?.SetText(t + "/" + i);
    var e = Math.floor(t / 10);
    this.GetArtText(22)?.SetText(e.toString());
    var e = t % 10;
    this.GetArtText(23)?.SetText(e.toString());
    var t = Math.floor(i / 10);
    this.GetArtText(24)?.SetText(t.toString());
    var e = i % 10;
    this.GetArtText(25)?.SetText(e.toString());
    this.GetItem(20)?.SetUIActive(this.CNe.IsTaskHasRedDot());
  }
  OnAfterShow() {
    if (this.CNe.IsNeedShowTip) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("FightPhotoUnlockNewLevel");
      this.CNe.IsNeedShowTip = false;
    }
  }
  OnTick(t) {
    var i;
    if (this.D3d) {
      if (this.D3d.IsUnLock) {
        if (!this.OQd) {
          this.Og(this.D3d);
        }
      } else {
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FightPhotoUnlockTime") ?? "{0}后解锁";
        i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.D3d.UnlockTime, i) ?? "";
        this.GetText(27)?.SetText(i);
      }
    }
  }
  Og(i) {
    this.GetItem(10)?.SetUIActive(!i.IsUnLock);
    this.GetItem(11)?.SetUIActive(i.IsUnLock);
    this.GetText(9)?.SetUIActive(i.IsUnLock);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.TargetRoleName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), i.TargetRoleName);
    if (this.D3d) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.D3d.TargetRoleName);
    }
    this.D3d = i;
    this.OQd = i.IsUnLock;
    this.GLl.DeselectCurrentGridProxy();
    this.GLl.RefreshByData(i.LevelDataList, () => {
      let t = this.CNe.GetCurrentLevelData(false);
      if (t) {
        this.CNe.SetCurrentLevelId(0);
      } else {
        t = i.FirstUnFinishedLevelData;
      }
      this.GLl.SelectGridProxyByKey(t);
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = t.InstanceId;
      this.JRd(t);
    });
  }
  JRd(t) {
    if (this.Hwl) {
      this.SetTextureByPath(this.Hwl.RoleBigTexture, this.GetTexture(28));
      this.SetTextureByPath(this.Hwl.RoleBigTexture, this.GetTexture(3));
    }
    this.Hwl = t;
    this.SetTextureByPath(t.RoleBigTexture, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.Name);
    this.XRd.RefreshByData(t.TaskTargetText, () => {
      for (const t of this.XRd.GetLayoutItemList()) {
        t.SetIsFinished(this.Hwl.IsFinished);
      }
    });
    this.ezd = t.GetRoleIdListIncludeZero();
    this.tFe.RefreshByData(this.ezd);
    this.GetButton(19)?.RootUIComp.SetUIActive(t.IsUnLock);
    this.wVl?.SetUiActive(t.LevelGroupData.IsUnLock && !t.IsUnLock);
    if (!t.IsUnLock) {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.PreLevelName);
      this.wVl?.SetTextByTextId("PrefabTextItem_28127837_Text", t);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshFightPhotoLevelRedDot, this.U3d);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = 0;
  }
  GFd() {
    var t;
    if (this.Hwl.IsFinished) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FightPhotoCanSelectAnyRole") ?? "";
    } else {
      t = this.Hwl.LevelGroupData.TargetRoleName;
      return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FightPhotoSelectTip") ?? "需要选择共鸣者{0}", MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? "");
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t[0] === "Difficult" && (t = this.GLl?.GetItemByIndex(1))) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.FightPhotoMainView = FightPhotoMainView;
//# sourceMappingURL=FightPhotoMainView.js.map