const {Router} = require('express');
const ApiService=require('../../controller/user-controller');

const router = Router();
const apiService = new ApiService();

router.get('/', apiService.getUserList);
router.delete('/:id',apiService.deleteUser);
router.post('/',apiService.createUser);
router.get('/:id',apiService.getUser);
router.put('/:id',apiService.updateUser);


module.exports = router;