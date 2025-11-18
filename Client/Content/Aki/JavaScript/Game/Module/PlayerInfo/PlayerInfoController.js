"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerInfoController = undefined;
const ue_1 = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const PerfSight_1 = require("../../../Core/PerfSight/PerfSight");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const LoginController_1 = require("../Login/LoginController");
const WorldLevelController_1 = require("../WorldLevel/WorldLevelController");
class PlayerInfoController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19211, PlayerInfoController.dXi);
    Net_1.Net.Register(28064, PlayerInfoController.CXi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19211);
    Net_1.Net.UnRegister(28064);
  }
  static gXi() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9);
    if (e !== undefined) {
      if (e === LoginDefine_1.ELoginSex.Boy) {
        AudioSystem_1.AudioSystem.SetState("player_rover_gender", "male");
      } else {
        AudioSystem_1.AudioSystem.SetState("player_rover_gender", "female");
      }
    }
  }
}
(exports.PlayerInfoController = PlayerInfoController).dXi = e => {
  if (e !== undefined) {
    WorldLevelController_1.WorldLevelController.OnBasicInfoNotify(e.GSs);
    var r = ModelManager_1.ModelManager.PlayerInfoModel;
    if (r !== undefined) {
      r.SetId(e.s5n);
      LogAnalyzer_1.LogAnalyzer.SetPlayerId(e.s5n);
      var o = new Map();
      var a = new Map();
      for (const n of e.GSs) {
        if (n.HSs === Protocol_1.Aki.Protocol.TNs.Proto_Int32) {
          o.set(n.Z4n, n.jSs);
        } else {
          a.set(n.Z4n, n.j8n);
        }
      }
      r.SetNumberProp(o);
      r.SetStringProp(a);
      r.RandomSeed = e.lHn;
      ModelManager_1.ModelManager.MingSuModel.UpdateDragonPoolInfoMap(e.kSs);
      ModelManager_1.ModelManager.PersonalModel.SetRoleShowList(e.MSs);
      ModelManager_1.ModelManager.PersonalModel.SetCurCardId(e.NSs);
      ModelManager_1.ModelManager.PersonalModel.SetBirthday(e.ZVn);
      ModelManager_1.ModelManager.PersonalModel.SetBirthdayDisplay(e.VSs);
      ModelManager_1.ModelManager.PersonalModel.SetCardUnlockList(e.FSs);
      ModelManager_1.ModelManager.PersonalModel.SetName(ModelManager_1.ModelManager.FunctionModel.GetPlayerName());
      ModelManager_1.ModelManager.PersonalModel.SetPlayerId(ModelManager_1.ModelManager.PlayerInfoModel.GetId());
      ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(e.Zha, e.ela);
      var r = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
      ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(r);
      PlayerInfoController.gXi();
      LoginController_1.LoginController.SetIfFirstTimeLogin();
      if (CloudGameManager_1.CloudGameManager.IsCloudGame && (ue_1.KuroStaticLibrary.SetThreadAffinity("GameThread", 65535, 65280), ue_1.KuroStaticLibrary.SetThreadAffinity("RenderThread", 65535, 65520), ue_1.KuroStaticLibrary.SetThreadAffinity("RHIThread", 65535, 65520), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Game", 24, "IsCloudGame affinity set");
      }
      if (Info_1.Info.PlatformType === 2 && e.s5n % 10 == 1) {
        if (((r = ue_1.KuroStaticLibrary.GetDeviceCPU()).includes("SM8475") || r.includes("SM8550") || r.includes("SM8650")) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Game", 24, "Disable affinity set", ["cpu", r]), ue_1.KuroStaticLibrary.SetThreadAffinity("GameThread", 65535, 65535), ue_1.KuroStaticLibrary.SetThreadAffinity("RenderThread", 65535, 65535), ue_1.KuroStaticLibrary.SetThreadAffinity("RHIThread", 65535, 65535), PerfSight_1.PerfSight.IsEnable)) {
          PerfSight_1.PerfSight.PostEvent(500, "0");
        }
      } else if (PerfSight_1.PerfSight.IsEnable) {
        PerfSight_1.PerfSight.PostEvent(500, "1");
      }
      ModelManager_1.ModelManager.PayShopModel.BusinessCompliance = e.uzd;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetPlayerBasicInfo);
    }
  }
};
PlayerInfoController.CXi = e => {
  if (e !== undefined) {
    WorldLevelController_1.WorldLevelController.OnPlayerAttrNotify(e.GSs);
    var r = ModelManager_1.ModelManager.PlayerInfoModel;
    if (r !== undefined) {
      var o = new Map();
      var a = new Map();
      for (const n of e.GSs) {
        if (n.HSs === Protocol_1.Aki.Protocol.TNs.Proto_Int32) {
          o.set(n.Z4n, n.jSs);
        } else {
          a.set(n.Z4n, n.j8n);
        }
      }
      ModelManager_1.ModelManager.PlayerInfoModel.UpdatePlayerAttributeNumberInfo(o);
      ModelManager_1.ModelManager.PlayerInfoModel.UpdatePlayerAttributeStringInfo(a);
    }
  }
}; //# sourceMappingURL=PlayerInfoController.js.map