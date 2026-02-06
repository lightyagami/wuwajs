"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorAlbumView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const HelpController_1 = require("../../../../Help/HelpController");
const InfoDisplayController_1 = require("../../../../InfoDisplay/InfoDisplayController");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const SpringManorController_1 = require("../SpringManorController");
const SpringManorAlbumConfirmItem_1 = require("./Item/SpringManorAlbumConfirmItem");
const SpringManorAlbumTabItem_1 = require("./Item/SpringManorAlbumTabItem");
const SpringManorAlbumTaskItem_1 = require("./Item/SpringManorAlbumTaskItem");
class SpringManorAlbumView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Dyg = undefined;
    this.Uyg = undefined;
    this.xyg = undefined;
    this.Byg = undefined;
    this.s4e = undefined;
    this.c01 = undefined;
    this.kyg = 2;
    this.LOe = 0;
    this.vef = false;
    this.qyg = 0;
    this.r7g = 0;
    this.Oyg = new Map();
    this.$pt = undefined;
    this.Xva = undefined;
    this.Xbg = undefined;
    this.Ybg = "";
    this.Jbg = "";
    this.CIf = (t, i) => {
      var e;
      if (i === "Sequence_Switch_Top") {
        this.jFi(this.kyg, true);
      } else if (i === "Sequence_Switch_List") {
        if (e = this.jyg()) {
          this.Wyg(e);
        }
      } else if (i === "List_Sequence_In") {
        this.Xva?.Play("Start");
      } else if ((i === "Sequence_Start_Unlock" || i === "Sequence_Switch_Top_Unlock" || i === "Sequence_Switch_List_Unlock") && (this.CheckPlayUnlockSequence(), e = this.jyg())) {
        this.Wyg(e);
      }
    };
    this.Gyg = () => {
      if (this.Oyg.has(this.kyg)) {
        for (const i of this.Oyg.get(this.kyg)) {
          var t = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
          i.State = t?.GetBookItemStateById(i.ConfigId);
        }
      }
      this.jFi(this.kyg, false);
      this.Fyg(this.Dyg, 0);
      this.Fyg(this.Uyg, 1);
    };
    this.qoc = () => {
      var t = new SpringManorAlbumTaskItem_1.SpringManorAlbumTaskItem();
      t.SetToggleCallBack(this.ClickTaskItem);
      return t;
    };
    this.D3e = () => {
      var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe).GetHelpId();
      HelpController_1.HelpController.OpenHelpById(t);
    };
    this.Nyg = () => {
      var t = (this.qyg = 0) !== this.kyg;
      this.kyg = 0;
      if (t) {
        this.$pt.PlayLevelSequenceByName("Switch_Top");
      }
    };
    this.Vyg = () => {
      this.qyg = 0;
      var t = this.kyg !== 1;
      this.kyg = 1;
      if (t) {
        this.$pt.PlayLevelSequenceByName("Switch_Top");
      }
    };
    this.Hyg = () => {
      if (this.Xbg && this.Xbg.length > 0) {
        ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(this.Xbg);
        InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView();
      }
    };
    this.$yg = () => {
      var t;
      var i;
      var e = this.jyg();
      if (e) {
        if (e.State === 1) {
          SpringManorController_1.SpringManorController.RequestBrochureReward(this.LOe, this.kyg, e.ConfigId);
        } else if (i = ConfigManager_1.ConfigManager.SpringManorConfig.GetSpringManorBookItemById(e.ConfigId)) {
          t = ModelManager_1.ModelManager.SpringManorModel.IsQuestTracking(i.ConditionGroup);
          if (!((i = ConfigManager_1.ConfigManager.SpringManorConfig.GetConditionGroupQuestId(i.ConditionGroup)) <= 0)) {
            ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.RequestTrackQuest(i, !t);
            if (t) {
              e.IsFollowing = !t;
              this.jFi(this.kyg, false);
            } else {
              UiManager_1.UiManager.ResetToBattleView();
            }
          }
        }
      }
    };
    this.ClickTaskItem = (t, i) => {
      if (t) {
        this.qyg = i;
        this.xyg?.SelectGridProxy(i);
      }
      t = this.xyg?.GetScrollItemByIndex(i);
      if (t) {
        this.c01?.ScrollTo(t.GetRootItem(), true);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(t.GetRootItem(), true);
      }
      this.$pt.PlayLevelSequenceByName("Switch_List");
    };
    this.Rbe = (t, i) => {
      if (t.IsFollowing || i.IsFollowing) {
        if (t.IsFollowing) {
          return -1;
        } else {
          return 1;
        }
      } else if (t.State === i.State) {
        return t.ConfigId - i.ConfigId;
      } else {
        return this.Qyg(i.State) - this.Qyg(t.State);
      }
    };
    this.W2e = () => {
      var t = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      t.ShowReceivedCallBack = () => this.vef;
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIExtendToggle], [2, UE.UIExtendToggle], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIVerticalLayout], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIButtonComponent], [9, UE.UITexture], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIScrollViewWithScrollbarComponent], [15, UE.UIHorizontalLayout], [16, UE.UIItem], [17, UE.UITexture]];
    this.BtnBindInfo = [[1, this.Nyg], [2, this.Vyg], [8, this.Hyg], [11, this.$yg]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.Dyg = new SpringManorAlbumTabItem_1.SpringManorAlbumTabItem();
    var i = this.GetExtendToggle(1).GetOwner();
    t.push(this.Dyg.CreateThenShowByActorAsync(i));
    this.Uyg = new SpringManorAlbumTabItem_1.SpringManorAlbumTabItem();
    var i = this.GetExtendToggle(2).GetOwner();
    t.push(this.Uyg.CreateThenShowByActorAsync(i));
    this.Byg = new SpringManorAlbumConfirmItem_1.SpringManorAlbumConfirmItem();
    var i = this.GetButton(11).GetOwner();
    t.push(this.Byg.CreateThenShowByActorAsync(i));
    await Promise.all(t);
    this.RootActor?.OnSequencePlayEvent.Bind(this.CIf);
  }
  OnStart() {
    this.Ybg = CommonParamById_1.configCommonParamById.GetStringConfig("Spring26CharacterLockTexPath") ?? "";
    this.Jbg = CommonParamById_1.configCommonParamById.GetStringConfig("Spring26EasterEggLockTexPath") ?? "";
    this.Xva = this.GetVerticalLayout(4).GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetCloseCallBack(() => {
      UiManager_1.UiManager.ResetToBattleView();
    });
    this.xyg = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.qoc);
    this.c01 = this.GetScrollViewWithScrollbar(3);
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(15), this.W2e);
  }
  OnBeforeShow() {
    this.LOe = ModelManager_1.ModelManager.SpringManorModel.ActivityData?.Id;
    this.lqe?.SetTitleByTextIdAndArgNew("PictureAlbum_ActivityName");
    this.lqe?.SetHelpCallBack(this.D3e);
    this.fPg(0);
    this.fPg(1);
    this.C5e(this.Dyg, 0);
    this.C5e(this.Uyg, 1);
    this.o7g();
    this.jFi(this.kyg, true);
  }
  o7g() {
    this.qyg = 0;
    this.r7g = 0;
    var t = this.OpenParam;
    this.kyg = t?.OpenTab ?? 0;
    var t = ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController.LatestUnlockBookItemId;
    if (t > 0) {
      var i = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureById(ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController.LatestUnlockBrochureId);
      if (i) {
        this.kyg = i?.Type;
        this.r7g = t;
        return;
      }
    }
    for (const r of this.Oyg) {
      var e = r[1];
      if (e) {
        e = e?.find(t => t.State === 1);
        if (e) {
          this.r7g = e.ConfigId;
          this.kyg = r[0];
          return;
        }
      }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBrochureBookItemStateUpdate, this.Gyg);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBrochureBookItemStateUpdate, this.Gyg);
  }
  C5e(t, i) {
    if (t) {
      this.Fyg(t, i);
    }
  }
  jFi(t, i) {
    this?.Dyg?.SetSelected(t === 0);
    this?.Uyg?.SetSelected(t === 1);
    this.Kyg(i);
    t = this.jyg();
    if (t) {
      this.Wyg(t);
    }
  }
  Fyg(e, r) {
    if (e) {
      var s = ConfigManager_1.ConfigManager.SpringManorConfig.GetSpringManorBrochureByActivityAndType(this.LOe, r)?.BookItemIds.length ?? 0;
      let t = 0;
      let i = false;
      if (this.Oyg.has(r)) {
        for (const h of this.Oyg.get(r)) {
          if (h.State === 2) {
            t++;
          } else if (h.State === 1) {
            i = true;
          }
        }
      }
      e.SetRedDotActive(i);
      e.InitProgress(t, s);
    }
  }
  jyg() {
    if (this.Oyg.has(this.kyg)) {
      var t = this.Oyg.get(this.kyg);
      if (t && t?.length > 0 && this.qyg >= 0) {
        return t[this.qyg];
      }
    }
  }
  fPg(t) {
    if (!this.Oyg.has(t)) {
      var i = ConfigManager_1.ConfigManager.SpringManorConfig.GetSpringManorBrochureByActivityAndType(this.LOe, t);
      if (i) {
        var e = [];
        var r = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
        for (const o of i.BookItemIds) {
          var s;
          var h = ConfigManager_1.ConfigManager.SpringManorConfig.GetSpringManorBookItemById(o);
          if (h) {
            (s = new SpringManorAlbumTaskItem_1.AlbumTaskData()).ConfigId = o;
            s.IsFollowing = ModelManager_1.ModelManager.SpringManorModel.IsQuestTracking(h.ConditionGroup);
            h = ConfigManager_1.ConfigManager.SpringManorConfig.GetConditionGroupQuestId(h.ConditionGroup);
            s.IsMainQuest = h > 0 && ModelManager_1.ModelManager.SpringManorModel.IsMainQuest(h);
            s.State = r.GetBookItemStateById(o);
            e.push(s);
          }
        }
        this.Oyg.set(t, e);
      }
    }
  }
  Kyg(i) {
    var t;
    var e;
    if (this.Oyg.has(this.kyg) && (t = this.Oyg.get(this.kyg), i && t?.sort(this.Rbe), this.r7g > 0 && (e = t?.findIndex(t => t.ConfigId === this.r7g) ?? 0, this.qyg = e >= 0 ? e : 0, this.r7g = 0), t)) {
      this.xyg?.RefreshByData(t, () => {
        var t;
        this.xyg?.SelectGridProxy(this.qyg);
        if (i && (this.Xva?.Play("Start"), t = this.xyg?.GetScrollItemByIndex(this.qyg))) {
          this.c01?.ScrollTo(t.GetRootItem(), true);
          ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(t.GetRootItem(), true);
        }
      }, true);
    }
  }
  Qyg(t) {
    switch (t) {
      case 0:
        return 2;
      case 1:
        return 3;
      case 2:
        return 1;
      default:
        return 0;
    }
  }
  Wyg(t) {
    this.Xbg = undefined;
    let i = t.State;
    if (t.State === 1 && this.m9g(t.ConfigId)) {
      i = 0;
    }
    this.GHg(t.ConfigId, t.State);
    if (this.kyg === 0) {
      this.zbg(t, i);
    } else {
      this.Zbg(t, i);
    }
  }
  Zbg(t, i) {
    var e = i === 0;
    var i = e || i === 1;
    this.GetTexture(7)?.SetUIActive(false);
    this.GetButton(8)?.RootUIComp?.SetUIActive(!e);
    this.GetItem(6)?.SetUIActive(i);
    this.GetTexture(9)?.SetUIActive(true);
    var i = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(t.ConfigId);
    if (i) {
      this.Xbg = e ? this.Jbg : i.PohtoPath;
      this.SetTextureByPath(this.Jbg, this.GetTexture(17));
      this.SetTextureByPath(this.Xbg ?? "", this.GetTexture(9));
    }
  }
  zbg(t, i) {
    var e;
    var r;
    var i = i === 0;
    this.GetButton(8)?.RootUIComp?.SetUIActive(!i);
    this.GetItem(6)?.SetUIActive(true);
    this.GetTexture(9)?.SetUIActive(!i);
    var t = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(t.ConfigId);
    if (t) {
      e = i && !StringUtils_1.StringUtils.IsBlank(t.IllustrationPath);
      this.GetTexture(7)?.SetUIActive(e);
      r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? t.PohtoPath : t.GirlPohtoPath;
      this.Xbg = i ? undefined : r;
      if (e) {
        this.SetTextureByPath(t.IllustrationPath, this.GetTexture(7));
      }
      this.SetTextureByPath(i ? this.Ybg : r, this.GetTexture(9));
      this.SetTextureByPath(this.Ybg, this.GetTexture(17));
    }
  }
  GHg(t, i) {
    var e = i === 0;
    var r = i === 1;
    var s = i === 2;
    this.GetItem(12)?.SetUIActive(s);
    var t = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(t);
    if (t) {
      this.Byg?.SetState(i, t.ConditionGroup);
      this.GetText(10)?.ShowTextNew(e ? t.GuideText : t.DescriptionText);
      i = ConfigManager_1.ConfigManager.SpringManorConfig.GetRewardItem(t.DroptId);
      this.SetRewardItems(i, s);
    }
    if (this.kyg === 0) {
      this.GetButton(11).RootUIComp?.SetUIActive(e || r);
      this.GetItem(13)?.SetUIActive(false);
    } else {
      this.GetButton(11).RootUIComp?.SetUIActive(r);
      this.GetItem(13)?.SetUIActive(e);
    }
  }
  SetRewardItems(t, i) {
    this.vef = i;
    i = t && t.length > 0;
    this.s4e?.SetActive(i);
    if (i) {
      this.s4e?.RefreshByData(t);
    }
  }
  m9g(t) {
    var i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SpringManorBrochureUnlockSequencePlayed);
    return !i || !i.has(t);
  }
  CheckPlayUnlockSequence() {
    var t;
    var i = this.jyg();
    if (i && i.State === 1) {
      i = i.ConfigId;
      if (!(t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SpringManorBrochureUnlockSequencePlayed) ?? new Set())?.has(i)) {
        t.add(i);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SpringManorBrochureUnlockSequencePlayed, t);
        this.$pt?.PlayLevelSequenceByName("Unlock", true);
      }
    }
  }
}
exports.SpringManorAlbumView = SpringManorAlbumView;
//# sourceMappingURL=SpringManorAlbumView.js.map