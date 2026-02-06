"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalOptionView = undefined;
const UE = require("ue");
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const PersonalTipsById_1 = require("../../../../Core/Define/ConfigQuery/PersonalTipsById");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PlayerHeadItem_1 = require("../../Common/PlayerHeadItem");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PersonalOptionItem_1 = require("./PersonalOptionItem");
class PersonalOptionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.H8t = undefined;
    this.g8t = undefined;
    this.gLt = undefined;
    this.J8t = (e, t, i) => {
      t = new PersonalOptionItem_1.PersonalOptionItem(t);
      t.Refresh(e, false, i);
      return {
        Key: i,
        Value: t
      };
    };
    this.mHt = () => {
      this.RefreshOptions();
    };
    this.lHt = () => {
      this.Kbe();
    };
    this.XAt = () => {
      this.K7e();
    };
    this.$At = () => {
      this.r9t();
    };
    this.Gac = () => {
      this.gLt?.Refresh(ModelManager_1.ModelManager.PersonalModel.GetDressedPlayerTitleId(), ModelManager_1.ModelManager.PersonalModel.GetDressedPlayerTitleLevel(), ModelManager_1.ModelManager.PersonalModel.GetSex());
    };
    this.uHt = () => {
      this.cHt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIGridLayout], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UITexture], [16, UE.UIItem], [17, UE.UITexture]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBirthChange, this.mHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHeadIconChange, this.lHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNameChange, this.XAt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignChange, this.$At);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerTitleChange, this.Gac);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCardChange, this.uHt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBirthChange, this.mHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHeadIconChange, this.lHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNameChange, this.XAt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignChange, this.$At);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerTitleChange, this.Gac);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCardChange, this.uHt);
  }
  async OnBeforeStartAsync() {
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem();
    await this.gLt.CreateThenShowByActorAsync(this.GetItem(14).GetOwner());
    this.gLt.Refresh(ModelManager_1.ModelManager.PersonalModel.GetDressedPlayerTitleId(), ModelManager_1.ModelManager.PersonalModel.GetDressedPlayerTitleLevel(), ModelManager_1.ModelManager.PersonalModel.GetSex());
  }
  OnStart() {
    this.g8t = new PlayerHeadItem_1.PlayerHeadItem(this.GetItem(0).GetOwner());
    this.RefreshOptions();
    this.K7e();
    this.r9t();
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
    if (e) {
      this.GetText(5).SetText(String(e));
    }
    this.Kbe();
    this.Nxa();
    this.GetText(4).SetText("");
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "SetPersonalData");
    this.cHt();
  }
  OnAfterShow() {}
  Kbe() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetHeadIconId();
    this.g8t.RefreshByRoleId(e);
  }
  Nxa() {
    var e;
    var t;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId();
      e = ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyOnlineId();
      t = t !== "";
      this.GetItem(12)?.SetUIActive(t);
      this.GetTexture(15)?.SetUIActive(t);
      this.GetItem(16)?.SetUIActive(!t);
      if (t) {
        this.GetText(13)?.SetText(e);
      }
    } else {
      this.GetItem(12)?.SetUIActive(false);
      this.GetTexture(15)?.SetUIActive(false);
      this.GetItem(16)?.SetUIActive(false);
    }
  }
  K7e() {
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    if (e) {
      this.GetText(2).SetText(e);
    }
  }
  r9t() {
    var e = ModelManager_1.ModelManager.PersonalModel.GetSignature();
    var t = this.GetText(11);
    if (e && e !== "") {
      t.SetText(e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(t, "EmptySign");
    }
  }
  cHt() {
    var e = ModelManager_1.ModelManager.PersonalModel.GetCurCardId();
    if (e &&= BackgroundCardById_1.configBackgroundCardById.GetConfig(e)) {
      this.SetTextureByPath(e.FunctionViewCardPath, this.GetTexture(17));
    }
  }
  RefreshOptions() {
    var e = [];
    e.push(6);
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10061)) {
      e.push(7);
    }
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10082)) {
      e.push(14);
    }
    e.push(8);
    e.push(9);
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10140)) {
      e.push(16);
    }
    e.push(10);
    if (!Platform_1.Platform.IsPs5Platform()) {
      e.push(11);
    }
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10060)) {
      e.push(15);
    }
    this.H8t ||= new GenericLayoutNew_1.GenericLayoutNew(this.GetGridLayout(9), this.J8t);
    this.H8t.ClearChildren();
    e.sort((e, t) => {
      e = PersonalTipsById_1.configPersonalTipsById.GetConfig(e);
      t = PersonalTipsById_1.configPersonalTipsById.GetConfig(t);
      return e.Sort - t.Sort;
    });
    this.H8t.RebuildLayoutByDataNew(e);
  }
  OnBeforeDestroy() {
    if (this.H8t) {
      this.H8t.ClearChildren();
      this.H8t = undefined;
    }
    if (this.gLt) {
      this.gLt.Destroy();
      this.gLt = undefined;
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t.length !== 0) {
      let e = 3;
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10061)) {
        ++e;
      }
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10082)) {
        ++e;
      }
      t = this.H8t.GetGrid(e);
      if (t) {
        return [t, t];
      } else {
        return undefined;
      }
    }
  }
}
exports.PersonalOptionView = PersonalOptionView;
//# sourceMappingURL=PersonalOptionView.js.map