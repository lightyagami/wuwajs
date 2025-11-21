"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBuffSelectView = exports.RoleBuffSelectItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RogueSelectResult_1 = require("../Define/RogueSelectResult");
const RoguelikeController_1 = require("../RoguelikeController");
const RogueSelectBaseView_1 = require("./RogueSelectBaseView");
const TopPanel_1 = require("./TopPanel");
class RoleBuffSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.RogueGainEntry = undefined;
    this.vho = undefined;
    this.Mho = e => {
      this.vho?.();
    };
  }
  Refresh(e, t, i) {
    this.Update(e);
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0);
  }
  Update(e) {
    this.RogueGainEntry = e;
    this.PKt();
  }
  SetToggleStateChangeCallback(e) {
    this.vho = e;
  }
  IsSelect() {
    return this.GetExtendToggle(0).GetToggleState() === 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Mho]];
  }
  PKt() {
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterBuffConfig(this.RogueGainEntry.ConfigId);
    if (e) {
      if (ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel() === 0) {
        this.GetText(1).ShowTextNew(e.AffixDescSimple);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.AffixDesc, ...e.AffixDescParam);
      }
      this.GetText(3).ShowTextNew(e.AffixTitle);
      this.SetSpriteByPath(e.AffixIcon, this.GetSprite(2), false);
      this.GetItem(4).SetUIActive(this.RogueGainEntry.IsNew);
    }
  }
}
exports.RoleBuffSelectItem = RoleBuffSelectItem;
class RoleBuffSelectView extends RogueSelectBaseView_1.RogueSelectBaseView {
  constructor() {
    super(...arguments);
    this.ulo = undefined;
    this.clo = undefined;
    this.ButtonItem = undefined;
    this.RoleBuffSelectLayout = undefined;
    this.m8t = () => {
      var e;
      if (this.ulo.RogueGainEntryList.length <= 0) {
        (e = new Protocol_1.Aki.Protocol.c_s()).RHn = this.ulo?.Index ?? 0;
        e.AHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount;
        Net_1.Net.Call(26444, e, () => {
          UiManager_1.UiManager.CloseView(this.Info.Name, this.ulo?.CallBack);
        });
      } else if (e = this.GetRoleBuffSelectItem()) {
        ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = e.RogueGainEntry;
        RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(3);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Roguelike", 8, "当前没有选中的角色Buff");
      }
    };
    this.RefreshBtnEnableClick = () => {
      var e;
      if (this.ulo.RogueGainEntryList?.length <= 0) {
        this.ButtonItem.SetEnableClick(true);
      } else {
        e = this.GetRoleBuffSelectItem();
        this.ButtonItem.SetEnableClick(e !== undefined);
      }
    };
    this.Tlo = () => {
      var e = new RoleBuffSelectItem();
      e.SetToggleStateChangeCallback(this.RefreshBtnEnableClick);
      return e;
    };
    this.OnDescModelChange = () => {
      this.PKt();
    };
    this.RoguelikeChooseDataResult = (e, t, i, s) => {
      if (i && s === this.ulo?.Index) {
        i = this.GetRoleBuffSelectItem();
        (s = new RogueSelectResult_1.RogueSelectResult(e, t, i?.RogueGainEntry)).CallBack = this.ulo.CallBack;
        UiManager_1.UiManager.CloseAndOpenView(this.Info.Name, "RogueRoleSelectResultView", s);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UITexture]];
  }
  GetRoleBuffSelectItem() {
    for (const e of this.RoleBuffSelectLayout.GetLayoutItemList()) {
      if (e.IsSelect()) {
        return e;
      }
    }
  }
  async OnBeforeStartAsync() {
    this.clo = new TopPanel_1.TopPanel();
    this.AddChild(this.clo);
    await this.clo.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    var t = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry;
    if (t) {
      t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterConfig(t.ConfigId);
      let e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.RoleId).RolePortrait;
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.RoleId).GetRoleSkinId();
      if (t !== -1) {
        t = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(t);
        e = t.RolePortrait;
      }
      this.SetTextureByPath(e, this.GetTexture(1));
      this.SetTextureByPath(e, this.GetTexture(5));
    }
  }
  OnStart() {
    ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = undefined;
    this.ulo = this.OpenParam;
    this.clo.CloseCallback = this.CloseMySelf;
    this.ButtonItem = new ButtonItem_1.ButtonItem(this.GetButton(4).GetRootComponent());
    this.ButtonItem.SetFunction(this.m8t);
    this.RoleBuffSelectLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.Tlo);
  }
  OnBeforeDestroy() {
    this.clo.Destroy();
  }
  OnBeforeShow() {
    this.PKt();
  }
  PKt() {
    this.Llo();
    this.Dlo();
    this.RefreshBtnText();
    this.RefreshBtnEnableClick();
  }
  Llo() {
    this.clo.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_7_TEXT);
    this.clo.RefreshSelectTipsText(RoguelikeDefine_1.ROGUELIKEVIEW_8_TEXT, true);
  }
  Dlo() {
    this.RoleBuffSelectLayout.RefreshByData(this.ulo.RogueGainEntryList ?? []);
  }
  RefreshBtnText() {
    this.ButtonItem.SetShowText(RoguelikeDefine_1.ROGUELIKEVIEW_15_TEXT);
  }
}
exports.RoleBuffSelectView = RoleBuffSelectView;
//# sourceMappingURL=RoleBuffSelectView.js.map