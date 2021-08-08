// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');
const validatexss = require('./middlewares/testForXss');
const validateFn = require('./middlewares/validateFn');
// Match URL's with controllers
exports.appRoute = router => {

    router.post('/api/user/login', authController.processLogin);
    router.post('/api/user/register', authController.processRegister);
    router.post('/api/user/process-submission',checkUserFnSolution.checkForValidUserRoleUser, validatexss.checkForMalCode, checkUserFn.getClientUserId, userController.processDesignSubmission);
    router.put('/api/user/',checkUserFnSolution.checkForValidUserRoleUser, userController.processUpdateOneUser);
    router.put('/api/user/design/',checkUserFnSolution.checkForValidUserRoleUser, userController.processUpdateOneDesign);
    router.post('/api/user/processInvitation/',checkUserFnSolution.checkForValidUserRoleUser, userController.processSendInvitation,validatexss.checkForMalCode );

    router.get('/api/user/process-search-design/:pagenumber/:search?',checkUserFnSolution.checkForValidUserRoleUser,  userController.processGetSubmissionData);
    router.get('/api/user/process-search-user/:pagenumber/:search?',checkUserFnSolution.checkForValidUserRoleUser,  userController.processGetUserData);
    router.get('/api/user/process-search-user-design/:pagenumber/:search?',checkUserFnSolution.checkForValidUserRoleUser, userController.processGetSubmissionsbyEmail);
    router.get('/api/user/:recordId', userController.processGetOneUserData);
    router.get('/api/user/design/:fileId', userController.processGetOneDesignData);

    

};