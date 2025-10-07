"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CipherController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class CipherController extends UiControllerBase_1.UiControllerBase {
  static OpenCipherView(e) {
    if (!UiManager_1.UiManager.IsViewShow("CipherView")) {
      ModelManager_1.ModelManager.CipherModel.InitCipherConfig(e);
      UiManager_1.UiManager.OpenView("CipherView");
    }
  }
  static RequestCipherComplete() {
    var e = Protocol_1.Aki.Protocol.wJn.create();
    e.a5n = ModelManager_1.ModelManager.CipherModel.GetCipherConfigId();
    e.h5n = Protocol_1.Aki.Protocol.h3s.Proto_Cipher;
    Net_1.Net.Call(25221, e, e => {});
  }
}
exports.CipherController = CipherController;
//# sourceMappingURL=CipherController.js.map