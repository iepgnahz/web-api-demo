const constant = require('../minxin/constant');
const request = require('superagent');
const config = require('config');
const apiService = config.get('back_endApiService');
class ApiServiceController {

    getUserList(req, res, next) {
        request
            .get(`${apiService}`)
            .end((err, resp) => {
                if (err) {
                    return next(err);
                } else {
                    return res.status(constant.httpCode.OK).send(resp.body);
                }
            });
    }

    getUser(req, res, next) {
        const id = req.params.id;
        request
            .get(apiService + `/${id}`)
            .set('Accept', 'application/json')
            .end((err, resp) => {
                if(err){
                    return next(err);
                }

                return res.status(resp.status).send(resp.body);
            });
    }

    updateUser(req, res, next) {
        const id = req.params.id;
        request
            .put(`${apiService}/${id}`)
            .set('Accept', 'application/json')
            .type('application/json')
            .send(req.body)
            .end((err, resp) => {
                if(err){
                    return next(err);
                }
                return res.sendStatus(resp.status);
            })

    }

    createUser(req, res, next) {
        request
            .post(apiService)
            .type('application/json')
            .send(req.body)
            .end((err, resp) => {
                if(err){
                    return next(err);
                }
                return res.status(resp.status).send({uri:`/users/${resp.body.id}`});
            })
    }

    deleteUser(req, res, next) {
        const id = req.params.id;

        request
            .delete(`${apiService}/${id}`)
            .set('Accept', 'application/json')
            .end((err, resp) => {
                if(err){
                    return next(err);
                }
                return res.sendStatus(resp.status);
            })
    }

}

module.exports = ApiServiceController;