var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
};

exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
};

var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  } else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  if (code && arg1) {
    payload = arg1;
  } else if (arg1) {
    payload = arg1;
  }

  if (!code) {
    code = 200; // Если код ответа не предоставлен, по умолчанию используется 200
  }
  
  // Используем методы ответа Express для установки статуса и отправки JSON
  if (typeof payload === 'object') {
    // Если payload содержит только сообщение об ошибке, преобразуем его в формат { error: message }
    if (payload.message && !payload.error) {
      payload = { error: payload.message };
    }
  }
  
  response.status(code).json(payload); // Используем response из Express
};
