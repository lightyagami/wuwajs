"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessTipsShopView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem");
const TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem");
const GlobalData_1 = require("../../../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../../../../Util/LguiUtil");
const CharacterItemWithAdd_1 = require("../Common/Character/CharacterItemWithAdd");
const CharacterListModule_1 = require("../Common/Character/CharacterListModule");
const BusinessShopRoleItem_1 = require("./BusinessShopRoleItem");
const SHOP_TWEEN_TIME = 1;
const VALUE_TIME = 0.5;
const SHOPPING_TIME = 2000;
class BusinessTipsShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CharacterListModule = undefined;
    this.HelperRoleItem = undefined;
    this.PlayerRoleItem = undefined;
    this.RoleIdList = [];
    this.e2e = [];
    this.ExpTweener = undefined;
    this.Delegate = undefined;
    this.ValueDelegate = undefined;
    this.TimeHandle = undefined;
    this.k1a = false;
    this.OAn = i => {
      for (const t of this.CharacterListModule.GetItemList()) {
        t.RefreshProgressAdd(i);
        if (i === 1) {
          t.RefreshProgress(i);
          t.SetLightProgressWidth();
        }
      }
    };
    this.Mke = () => {
      this.CloseMe();
    };
    this.t2e = () => {
      if (this.RemoveTimerHandle()) {
        this.r2e();
      }
    };
    this.i2e = () => new CharacterItemWithAdd_1.CharacterItemWithAdd();
    this.q1a = () => {
      this.Jpa();
      this.zpa();
    };
    this.$pa = i => {
      for (const t of this.CharacterListModule.GetItemList()) {
        t.RefreshCurrentValue(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem], [11, UE.UIItem], [10, UE.UIItem], [12, UE.UIButtonComponent]];
    this.BtnBindInfo = [[7, this.Mke], [12, this.t2e]];
  }
  async PAr() {
    this.CharacterListModule = new CharacterListModule_1.CharacterListModule(this.i2e);
    await this.CharacterListModule.CreateByActorAsync(this.GetItem(1).GetOwner());
    var i = this.OpenParam;
    this.e2e = i.LastData.GetCharacterDataList();
    await this.CharacterListModule.RefreshByDataAsync(this.e2e);
    var t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(i.RoleId);
    i.LastData.SetCharacterDataByEditTeamData(t);
  }
  get N1a() {
    return this.OpenParam.IsMoreSuccessful;
  }
  async H1a() {
    var i = this.OpenParam;
    this.HelperRoleItem = new BusinessShopRoleItem_1.BusinessShopRoleItem();
    this.HelperRoleItem.Refresh(i.RoleId);
    await this.HelperRoleItem.CreateThenShowByActorAsync(this.GetItem(11).GetOwner());
    await this.HelperRoleItem.RefreshAsync();
    this.HelperRoleItem.SwitchRoleSpineAnim("working", 0.1);
  }
  async F1a() {
    this.PlayerRoleItem = new BusinessShopRoleItem_1.BusinessShopRoleItem();
    var i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPlayerRoleId();
    this.PlayerRoleItem.Refresh(i);
    await this.PlayerRoleItem.CreateThenShowByActorAsync(this.GetItem(10).GetOwner());
    await this.PlayerRoleItem.RefreshAsync();
    this.PlayerRoleItem.SwitchRoleSpineAnim("working", 0.1);
  }
  j1a() {
    var i = this.OpenParam;
    var t = i.RoleId;
    var t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(t);
    this.k1a = t.Level > i.LastData.Level;
    (this.k1a ? (this.GetText(5)?.SetText(i.LastData.Level.toString()), this.GetText(6)) : this.GetText(3))?.SetText(t.Level.toString());
  }
  async mJs() {
    await Promise.all([this.H1a(), this.F1a()]);
  }
  async OnBeforeStartAsync() {
    this.GetItem(2)?.SetUIActive(false);
    this.GetItem(4)?.SetUIActive(false);
    this.GetButton(7)?.RootUIComp.SetUIActive(false);
    this.GetItem(8)?.SetUIActive(false);
    this.GetItem(9)?.SetUIActive(false);
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn);
    this.ValueDelegate = (0, puerts_1.toManualReleaseDelegate)(this.$pa);
    this.j1a();
    await Promise.all([this.PAr(), this.mJs()]);
    AudioSystem_1.AudioSystem.PostEvent("play_ui_zuiyuejie_loading");
  }
  OnBeforeShow() {
    this.GetItem(9)?.SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Moonfiesta_PartnerTip5");
    this.TimeHandle = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.TimeHandle = undefined;
      this.r2e();
    }, SHOPPING_TIME);
  }
  OnBeforeDestroy() {
    if (this.Delegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.OAn);
      this.Delegate = undefined;
    }
    if (this.ValueDelegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.$pa);
      this.ValueDelegate = undefined;
    }
    this.gzi();
  }
  r2e() {
    (this.k1a ? (this.UiViewSequence?.PlaySequencePurely("Success"), this.GetItem(4)) : (this.UiViewSequence?.PlaySequencePurely("Fail"), this.GetItem(2)))?.SetUIActive(true);
    if (this.N1a) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Moonfiesta_TravelGreatSuccess");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Moonfiesta_PartnerTip4");
    }
    var i = this.OpenParam;
    this.CharacterListModule?.SetActive(true);
    this.qAn();
    this.GetButton(7)?.RootUIComp.SetUIActive(true);
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetTrainRoleDialogByIdAndType(i.RoleId, i.TrainType);
    this.HelperRoleItem?.ShowDialog(i.Dialog);
    this.HelperRoleItem?.SwitchRoleSpineAnim("happy", 0);
    this.PlayerRoleItem?.SwitchRoleSpineAnim("happy", 0);
    AudioSystem_1.AudioSystem.ExecuteAction("play_ui_zuiyuejie_loading", 0);
    this.Ypa();
  }
  RemoveTimerHandle() {
    return !!this.TimeHandle && !(TimerSystem_1.GameplayTimerSystem.Remove(this.TimeHandle), this.TimeHandle = undefined);
  }
  qAn() {
    for (const i of this.CharacterListModule.GetItemList()) {
      i.RefreshAddText();
    }
  }
  gzi() {
    if (this.ExpTweener) {
      this.ExpTweener.Kill();
      this.ExpTweener = undefined;
    }
  }
  Ypa() {
    for (const i of this.CharacterListModule.GetItemList()) {
      i.SetLightProgressWidth();
      i.PlayAddAction();
      i.RefreshAddText();
    }
    this.ExpTweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, 0, 1, SHOP_TWEEN_TIME);
    this.ExpTweener?.OnCompleteCallBack.Bind(this.q1a);
    AudioSystem_1.AudioSystem.PostEvent("play_ui_zhuiyuejie_favorability");
  }
  Jpa() {
    for (const i of this.CharacterListModule.GetItemList()) {
      i.PlayEndAction();
    }
  }
  zpa() {
    this.ExpTweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.ValueDelegate, 0, 1, VALUE_TIME);
  }
}
exports.BusinessTipsShopView = BusinessTipsShopView;
//# sourceMappingURL=BusinessTipsShopView.js.map