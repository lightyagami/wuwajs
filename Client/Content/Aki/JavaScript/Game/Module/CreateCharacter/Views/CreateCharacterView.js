"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCharacterView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const TextInputComponent_1 = require("../../Common/InputView/View/TextInputComponent");
const LoginDefine_1 = require("../../Login/Data/LoginDefine");
const LoginController_1 = require("../../Login/LoginController");
const UiLoginSceneManager_1 = require("../../UiComponent/UiLoginSceneManager");
class CreateCharacterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.okt = undefined;
    this.rkt = false;
    this.nkt = [];
    this.skt = [];
    this.akt = undefined;
    this.hkt = () => {
      this.lkt(LoginDefine_1.ELoginSex.Boy);
    };
    this._kt = () => {
      this.lkt(LoginDefine_1.ELoginSex.Girl);
    };
    this.ukt = () => {
      this.akt.SetActive(false);
    };
    this.ckt = () => {
      this.mkt();
    };
    this.dkt = async e => {
      this.GetItem(3).SetUIActive(false);
      ModelManager_1.ModelManager.LoginModel.SetPlayerSex(this.okt);
      ModelManager_1.ModelManager.LoginModel.SetPlayerName(e);
      return LoginController_1.LoginController.CreateCharacterRequest();
    };
    this.Ckt = e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 10, "创角界面请求创角成功");
        }
        ModelManager_1.ModelManager.LoginModel.CreateLoginPromise();
        LoginController_1.LoginController.HandleLoginGame(false, e).then(e => {
          LoginController_1.LoginController.DisConnect(e);
          if (e) {
            this.gkt();
            this.GetItem(3).SetUIActive(false);
            UiLoginSceneManager_1.UiLoginSceneManager.PlayRoleMontage(this.nkt[this.okt], 17);
            UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(this.fkt(), () => {
              ModelManager_1.ModelManager.RecommendQualityModel.CheckOpenRecommendQuality();
            });
          } else {
            LoginController_1.LoginController.CreateCharacterViewToLoginView();
          }
        });
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 10, "创角界面请求创角失败");
        }
        this.akt.ClearText();
        this.GetItem(3).SetUIActive(true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[1, this.hkt], [2, this._kt]];
  }
  lkt(e) {
    var i;
    if (this.okt !== e) {
      i = this.okt;
      this.okt = e;
      this.GetItem(3).SetUIActive(false);
      this.GetItem(4).SetUIActive(false);
      if (this.rkt) {
        this.gkt();
        UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(this.pkt(), () => {
          this.vkt();
        });
        this.skt[i].RemoveRoleChooseRenderingMaterial();
      } else {
        UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(this.Mkt(), () => {
          this.vkt();
        });
      }
      this.skt[e].SetRoleChooseRenderingMaterial();
    }
  }
  pkt() {
    if (this.okt === LoginDefine_1.ELoginSex.Boy) {
      return "LevelSequence_SwitchMale";
    } else {
      return "LevelSequence_SwitchFemale";
    }
  }
  Mkt() {
    if (this.okt === LoginDefine_1.ELoginSex.Boy) {
      return "LevelSequence_SelectMale";
    } else {
      return "LevelSequence_SelectFemale";
    }
  }
  vkt() {
    this.rkt = true;
    this.GetItem(3)?.SetUIActive(true);
    this.GetButton(1).RootUIComp.SetUIActive(this.okt !== LoginDefine_1.ELoginSex.Boy);
    this.GetButton(2).RootUIComp.SetUIActive(this.okt !== LoginDefine_1.ELoginSex.Girl);
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent("hide", this.ukt);
    this.nkt = ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles();
    this.Ekt();
    this.Skt();
    this.gkt(false);
    this.GetItem(3).SetUIActive(true);
    this.GetItem(4).SetUIActive(true);
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.LoginModel.FinishLoginPromise();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateRoleShowInputName, this.ckt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateRoleShowInputName, this.ckt);
  }
  Ekt() {
    var e = {
      ConfirmFunc: this.dkt,
      ResultFunc: this.Ckt,
      InputText: "",
      IsCheckNone: true
    };
    this.akt = new TextInputComponent_1.TextInputComponent(this.GetItem(0), e);
  }
  Skt() {
    var e = new GenderButton(this.GetButton(2), this.nkt[LoginDefine_1.ELoginSex.Girl]);
    e.BindFunction();
    this.skt.push(e);
    var e = new GenderButton(this.GetButton(1), this.nkt[LoginDefine_1.ELoginSex.Boy]);
    e.BindFunction();
    this.skt.push(e);
  }
  OnBeforeDestroy() {
    for (const e of this.skt) {
      e.RemoveRoleChooseRenderingMaterial();
      e.UnbindFunction();
    }
    this.akt.Destroy();
  }
  mkt() {
    this.UiViewSequence.PlaySequence("show");
    this.akt.SetActive(true);
  }
  gkt(e = true) {
    if (e) {
      this.UiViewSequence.PlaySequence("hide", true);
    } else {
      this.akt.SetActive(false);
    }
  }
  fkt() {
    if (this.okt === LoginDefine_1.ELoginSex.Boy) {
      return "LevelSequence_MaleTurnHead";
    } else {
      return "LevelSequence_FemaleTurnHead";
    }
  }
}
exports.CreateCharacterView = CreateCharacterView;
class GenderButton {
  constructor(e, i) {
    this.ykt = undefined;
    this.Ikt = undefined;
    this.Tkt = undefined;
    this.Lkt = undefined;
    this.e0t = undefined;
    this.dFe = undefined;
    this.Dkt = () => {
      this.RemoveRoleRenderingMaterial();
      this.ykt = UiLoginSceneManager_1.UiLoginSceneManager.SetRoleRenderingMaterial(this.dFe, "CreateCharacterMaterialController");
      this.Ikt = UiLoginSceneManager_1.UiLoginSceneManager.SetHuluRenderingMaterial(this.dFe, "CreateCharacterMaterialController");
    };
    this.RemoveRoleRenderingMaterial = () => {
      if (this.ykt !== undefined) {
        UiLoginSceneManager_1.UiLoginSceneManager.RemoveRoleRenderingMaterialWithEnding(this.dFe, this.ykt);
        this.ykt = undefined;
      }
      if (this.Ikt !== undefined) {
        UiLoginSceneManager_1.UiLoginSceneManager.RemoveHuluRenderingMaterialWithEnding(this.dFe, this.Ikt);
        this.Ikt = undefined;
      }
    };
    this.e0t = e;
    this.dFe = i;
  }
  BindFunction() {
    if (!Info_1.Info.IsInTouch()) {
      this.e0t.OnPointEnterCallBack.Bind(this.Dkt);
      this.e0t.OnPointExitCallBack.Bind(this.RemoveRoleRenderingMaterial);
    }
  }
  SetRoleChooseRenderingMaterial() {
    this.RemoveRoleChooseRenderingMaterial();
    this.Tkt = UiLoginSceneManager_1.UiLoginSceneManager.SetRoleRenderingMaterial(this.dFe, "ChooseCharacterMaterialController");
    this.Lkt = UiLoginSceneManager_1.UiLoginSceneManager.SetHuluRenderingMaterial(this.dFe, "ChooseCharacterMaterialController");
  }
  RemoveRoleChooseRenderingMaterial() {
    if (this.Tkt !== undefined) {
      UiLoginSceneManager_1.UiLoginSceneManager.RemoveRoleRenderingMaterialWithEnding(this.dFe, this.Tkt);
      this.Tkt = undefined;
    }
    if (this.Lkt !== undefined) {
      UiLoginSceneManager_1.UiLoginSceneManager.RemoveHuluRenderingMaterialWithEnding(this.dFe, this.Lkt);
      this.Lkt = undefined;
    }
  }
  UnbindFunction() {
    this.e0t.OnPointEnterCallBack.Unbind();
    this.e0t.OnPointExitCallBack.Unbind();
  }
}
//# sourceMappingURL=CreateCharacterView.js.map