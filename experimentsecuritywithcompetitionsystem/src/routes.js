// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');
const validationFn = require('./middlewares/validationFn');
const passwordValidation = require('./middlewares/passwordValidation');
const validateXSS = require ('./middlewares/validateXSS')

// Match URL's with controllers
exports.appRoute = router => {

    router.post('/api/user/login', authController.processLogin, validationFn.validateUserid);
    router.post('/api/user/register',validationFn.validateRegister, authController.processRegister );
    router.post('/api/user/process-submission', checkUserFn.getClientUserId,validateXSS.checkForMalCode, userController.processDesignSubmission);
    router.put('/api/user/', userController.processUpdateOneUser);
    router.put('/api/user/design/', userController.processUpdateOneDesign);
    router.post('/api/user/processInvitation/',checkUserFn.getClientUserId,validateXSS.checkForMalCode, userController.processSendInvitation);

    router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetSubmissionData);
    router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetUserData, validationFn.validateRegister);
    router.get('/api/user/process-search-user-design/:pagenumber/:search?', userController.processGetSubmissionsbyEmail);
    router.get('/api/user/:recordId', userController.processGetOneUserData);
    router.get('/api/user/design/:fileId', userController.processGetOneDesignData);
    
    

};