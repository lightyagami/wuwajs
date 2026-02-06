"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerSelectRoleView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySmallItemGrid_1 = require("../../../Activity/ActivityContent/UniversalComponents/ActivitySmallItemGrid");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const GuessJokerUtils_1 = require("../GuessJokerUtils");
const GuessJokerHeroSkillItem_1 = require("./Item/GuessJokerHeroSkillItem");
const GuessJokerSelectRoleItem_1 = require("./Item/GuessJokerSelectRoleItem");
class GuessJokerSelectRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PopupCaption = undefined;
    this.tFe = undefined;
    this.bOe = undefined;
    this.wVl = undefined;
    this.ROf = undefined;
    this.c3f = undefined;
    this.Y$f = undefined;
    this.xzf = undefined;
    this.$pt = undefined;
    this.pDg = new Map();
    this.u9g = false;
    this.uyi = () => {
      var e = new GuessJokerSelectRoleItem_1.GuessJokerSelectRoleItem();
      e.BindClickCallBack(this.d3f);
      return e;
    };
    this.rOe = () => new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    this.fjg = e => {
      var i = this.pDg.get(e);
      if (i) {
        i();
        this.pDg.delete(e);
      }
    };
    this.d3f = e => {
      this.BXe(e);
      this.gjg("Switch");
      this.m3f();
    };
    this.Z$f = () => {
      this.xzf?.CloseDetail();
    };
    this.p5t = () => {
      var e;
      var i;
      if (this.ROf) {
        e = this.ROf.Level;
        e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(e);
        if (i = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByRoleId(e.AiRole)) {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShowOnlyGuessJokerNpc(i.NpcId);
        }
        if ((i = e.FirstEnterFlow).length === 3) {
          ControllerHolder_1.ControllerHolder.FlowController.StartFlow(i[0], parseInt(i[1]), parseInt(i[2]));
        }
        this.u9g = true;
        this.CloseMe();
      }
    };
    this.vOg = e => {
      e = e !== 1;
      this.GetItem(19).SetUIActive(e);
      this.GetItem(22).SetUIActive(e);
      this.GetButton(23).RootUIComp.SetUIActive(e);
      this.GetButton(24).RootUIComp.SetUIActive(e);
    };
    this._5e = () => {
      var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelId();
      if (e !== -1) {
        e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(e).AiRole;
        e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByRoleId(e);
        if (e === undefined) {
          this.CloseMe();
          return;
        }
        e = e.NpcId;
        if (e) {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShowOnlyGuessJokerNpc(e);
        }
      } else {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.HideAllGuessJokerNpc();
      }
      UiManager_1.UiManager.ResetToBattleView();
    };
    this.j5c = () => {
      if (this.ROf) {
        const e = this.ROf.Level;
        ControllerHolder_1.ControllerHolder.GuessJokerController.JokerGuessRewardRequest(e, () => {
          this.Q8i(e);
          this.ROf?.RefreshRedDot();
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UISprite], [9, UE.UITexture], [10, UE.UIScrollViewWithScrollbarComponent], [11, UE.UIItem], [12, UE.UISprite], [13, UE.UISprite], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIButtonComponent], [18, UE.UIText], [19, UE.UIItem], [20, UE.UIExtendToggle], [21, UE.UIButtonComponent], [22, UE.UIItem], [23, UE.UIButtonComponent], [24, UE.UIButtonComponent]];
    this.BtnBindInfo = [[14, this.p5t], [17, this.Z$f], [20, this.vOg], [21, this.j5c]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this._5e);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.$pt.BindSequenceCloseEvent(this.fjg);
    this.tFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.uyi);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(10), this.rOe);
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    e.push(this.wVl.CreateThenShowByActorAsync(this.GetItem(15).GetOwner()));
    this.xzf = new GuessJokerHeroSkillItem_1.GuessJokerHeroSkillItem();
    e.push(this.xzf.CreateThenShowByActorAsync(this.GetItem(16).GetOwner()));
    await Promise.all(e);
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelIdList();
    await this.tFe.RefreshByDataAsync(e);
    var i = this.OpenParam;
    var e = this.tFe.GetLayoutItemList();
    let t = undefined;
    for (const r of e) {
      if (r.Level === i) {
        t = r;
        break;
      }
    }
    t = t || e[0];
    this.BXe(t);
  }
  OnBeforeShow() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
  }
  OnBeforeHide() {
    if (this.u9g) {
      this.u9g = false;
    } else {
      UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
    }
  }
  PushCameraHandle(e, i, t) {
    if (this.c3f) {
      UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(this.c3f, i, t);
    }
  }
  PopCameraHandle(e, i, t, r) {
    if (this.c3f) {
      UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(this.c3f, i, t, r);
    }
  }
  BXe(e) {
    var i;
    var t;
    var r;
    if (this.ROf !== e && (this.ROf && this.ROf.OnDeselected(), e.OnSelected(), this.ROf = e, r = this.ROf.Level, (t = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(r)) !== undefined) && (t = t.AiRole, (i = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByRoleId(t)) !== undefined)) {
      this.Z3g(r);
      e.RefreshRedDot();
      t = i.SelectRoleCameraId;
      r = GuessJokerUtils_1.GuessJokerUtils.GetCameraNameByCameraId(t);
      this.c3f = r;
      this.Y$f = GuessJokerUtils_1.GuessJokerUtils.GetCameraSettingNameByCameraId(t);
      this.Q8i(e.Level);
    }
  }
  Z3g(e) {
    var i = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
    if ((i &&= i.GetGuessJokerGameData(e)) && i.Unlock && !i.FirstPass && !(i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GuessJokerUnlockLevelClicked) ?? new Set()).has(e)) {
      i.add(e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GuessJokerUnlockLevelClicked, i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuessJokerRedDotNotify);
    }
  }
  m3f() {
    if (this.Y$f) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GuessJokerCard", 78, "【action】Push Camera：" + this.Y$f);
      }
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(this.Y$f, true, true, "1001");
    }
  }
  Q8i(e) {
    var i = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(e);
    var t = i.AiRole;
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
    this.GetText(3).SetText(t);
    var r = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
    if (r) {
      r = r.GetGuessJokerGameData(e);
      if (r) {
        const n = r.FirstPass;
        var a = r.Unlock;
        var o = r.RewardGet;
        this.GetItem(5).SetUIActive(r.PlayerWin);
        this.GetSprite(12).SetUIActive(!a || !n);
        this.GetSprite(13).SetUIActive(n && o);
        this.GetButton(21).RootUIComp.SetUIActive(n && !o);
        var r = i.AiCardSkill;
        var r = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerSkill(r);
        this.GetText(6).ShowTextNew(n ? r.SkillName : "GuessJoker_SkillNameLockText");
        this.GetText(7).ShowTextNew(n ? r.SkillDesc : "GuessJoker_SkillDescLockText");
        var s = n ? "GuessJoker_RematchConfirmText" : "GuessJoker_ConfirmText";
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), s, t);
        this.SetTextureByPath(r.SkillIconPath, this.GetTexture(9));
        var s = i.PassReward;
        this.SVl(s, o);
        this.GetButton(14).RootUIComp.SetUIActive(a);
        if (!a) {
          this.wVl.SetTextByTextId(i.LockText);
        }
        this.wVl.SetUiActive(!a);
        var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GuessJokerFirstFinishAnim) ?? new Set();
        if (t.has(e)) {
          this.gjg("Unlock", () => {
            this.GetTexture(9).SetUIActive(n);
            this.GetSprite(8).SetUIActive(!n);
          });
          t.delete(e);
          LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GuessJokerFirstFinishAnim, t);
        } else {
          this.GetTexture(9).SetUIActive(n);
          this.GetSprite(8).SetUIActive(!n);
        }
      }
    }
  }
  gjg(e, i) {
    this.$pt?.PlaySequencePurely(e);
    if (i) {
      this.pDg.set(e, i);
    }
  }
  SVl(e, i) {
    if (e === 0) {
      this.bOe.SetActive(false);
    } else {
      var t = [];
      for (const a of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e)) {
        var r = {
          Item: a,
          HasClaimed: i
        };
        t.push(r);
      }
      this.bOe.RefreshByData(t);
      this.bOe.SetActive(t.length > 0);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e[0] === "Role") {
      e = Number(e[1]);
      if (e = this.tFe.GetLayoutItemByIndex(e)?.GuideGetToggleItem()) {
        return [e, e];
      } else {
        return undefined;
      }
    }
  }
}
exports.GuessJokerSelectRoleView = GuessJokerSelectRoleView;
//# sourceMappingURL=GuessJokerSelectRoleView.js.map