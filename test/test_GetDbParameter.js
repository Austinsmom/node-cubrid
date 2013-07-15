exports['test_GetDbParameter'] = function (test) {
	var CUBRID = require('../'),
			client = require('./testSetup/test_Setup').createDefaultCUBRIDDemodbConnection(),
			Helpers = CUBRID.Helpers,
			CAS = require('../src' + (process.env.CODE_COV ? '-cov' : '') + '/constants/CASConstants');

	function errorHandler(err) {
		throw err.message;
	}

	test.expect(1);
  Helpers.logInfo(module.filename.toString() + ' started...');

  client.connect(function (err) {
    if (err) {
      errorHandler(err);
    } else {
      Helpers.logInfo('Connected OK.');

      client.setDatabaseParameter(CAS.CCIDbParam.CCI_PARAM_ISOLATION_LEVEL,
        CAS.CUBRIDIsolationLevel.TRAN_REP_CLASS_COMMIT_INSTANCE, function (err) {
          if (err) {
            errorHandler(err);
          } else {
            client.getDatabaseParameter(CAS.CCIDbParam.CCI_PARAM_ISOLATION_LEVEL, function (err, value) {
              if (err) {
                errorHandler(err);
              } else {
                test.ok(value === CAS.CUBRIDIsolationLevel.TRAN_REP_CLASS_COMMIT_INSTANCE);
                client.close(function (err) {
                  if (err) {
                    errorHandler(err);
                  } else {
                    Helpers.logInfo('Connection closed.');
                    Helpers.logInfo('Test passed.');
                    test.done();
                  }
                });
              }
            });
          }
        });
    }
  });
};
